"use client";

import React, {
  Suspense,
  useRef,
  useState,
  useMemo,
  useEffect,
  Component,
  type ReactNode,
  type ErrorInfo,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Trail, Sphere, Torus, Octahedron } from "@react-three/drei";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

/* ─── Shared GLSL: 3D Simplex Noise (Stefan Gustavson) ─── */
const GLSL_SNOISE = `
vec3 mod289v3(vec3 x){return x-floor(x*(1./289.))*289.;}
vec4 mod289v4(vec4 x){return x-floor(x*(1./289.))*289.;}
vec4 permute4(vec4 x){return mod289v4(((x*34.)+1.)*x);}
vec4 taylorInvSqrt4(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1./6.,1./3.);
  const vec4 D=vec4(0.,.5,1.,2.);
  vec3 i=floor(v+dot(v,C.yyy));
  vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);
  vec3 l=1.-g;
  vec3 i1=min(g.xyz,l.zxy);
  vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;
  vec3 x2=x0-i2+C.yyy;
  vec3 x3=x0-D.yyy;
  i=mod289v3(i);
  vec4 p=permute4(permute4(permute4(
    i.z+vec4(0.,i1.z,i2.z,1.))
    +i.y+vec4(0.,i1.y,i2.y,1.))
    +i.x+vec4(0.,i1.x,i2.x,1.));
  float n_=.142857142857;
  vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.*floor(p*ns.z*ns.z);
  vec4 x_=floor(j*ns.z);
  vec4 y_=floor(j-7.*x_);
  vec4 x=x_*ns.x+ns.yyyy;
  vec4 y=y_*ns.x+ns.yyyy;
  vec4 h=1.-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);
  vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.+1.;
  vec4 s1=floor(b1)*2.+1.;
  vec4 sh=-step(h,vec4(0.));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
  vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);
  vec3 p1=vec3(a0.zw,h.y);
  vec3 p2=vec3(a1.xy,h.z);
  vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt4(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.);
  m=m*m;
  return 42.*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}
`;

/* ─── Iridescent / holographic shader for the central TorusKnot ─── */
const KNOT_VERT = GLSL_SNOISE + `
uniform float uTime;
varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec2 vUv;
void main(){
  vNormal=normalize(normalMatrix*normal);
  vUv=uv;
  float noise=snoise(position*0.7+uTime*0.22)*0.18;
  vec3 displaced=position+normal*noise;
  vec4 worldPos=modelMatrix*vec4(displaced,1.0);
  vWorldPos=worldPos.xyz;
  gl_Position=projectionMatrix*viewMatrix*worldPos;
}
`;

const KNOT_FRAG = `
uniform float uTime;
uniform vec3 uCameraPos;
varying vec3 vNormal;
varying vec3 vWorldPos;
varying vec2 vUv;
void main(){
  vec3 viewDir=normalize(uCameraPos-vWorldPos);
  float fresnel=pow(1.0-abs(dot(vNormal,viewDir)),2.0);
  float t=uTime*0.35+fresnel*3.14;
  vec3 col=vec3(0.5)+0.5*cos(t+vUv.x*3.0+vec3(0.0,2.094,4.188));
  col=mix(vec3(0.42,0.18,0.92),col,0.55);
  col+=fresnel*vec3(0.55,0.35,1.0)*1.4;
  gl_FragColor=vec4(col,0.96);
}
`;

/* ─── GPU shader particle shaders ─── */
const PARTICLE_VERT = GLSL_SNOISE + `
attribute float aSeed;
attribute vec3 aColor;
uniform float uTime;
varying vec3 vColor;
varying float vAlpha;
void main(){
  float t=uTime*0.10+aSeed*6.2831;
  float nx=snoise(vec3(aSeed*1.31,t*0.4,0.0));
  float ny=snoise(vec3(0.0,aSeed*2.17,t*0.3));
  float nz=snoise(vec3(t*0.2,0.0,aSeed*1.73));
  vec3 pos=position+vec3(nx,ny,nz)*0.7;
  vec4 mvPos=modelViewMatrix*vec4(pos,1.0);
  float dist=length(pos);
  gl_PointSize=max(mix(1.2,2.8,1.0-dist*0.07)*(280.0/-mvPos.z),0.5);
  vColor=aColor;
  vAlpha=0.55+aSeed*0.45;
  gl_Position=projectionMatrix*mvPos;
}
`;

const PARTICLE_FRAG = `
varying vec3 vColor;
varying float vAlpha;
void main(){
  vec2 coord=gl_PointCoord-0.5;
  float r=length(coord);
  if(r>0.5)discard;
  float alpha=smoothstep(0.5,0.05,r)*vAlpha;
  gl_FragColor=vec4(vColor,alpha);
}
`;

/* ─── Central iridescent TorusKnot ─── */
function IridescentKnot() {
  const meshRef = useRef<THREE.Mesh>(null);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: KNOT_VERT,
        fragmentShader: KNOT_FRAG,
        uniforms: {
          uTime: { value: 0 },
          uCameraPos: { value: new THREE.Vector3() },
        },
        side: THREE.DoubleSide,
      }),
    []
  );

  useEffect(() => () => material.dispose(), [material]);

  useFrame((state) => {
    if (!meshRef.current) return;
    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uCameraPos.value.copy(state.camera.position);
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.12;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    const px = state.pointer.x * 0.3;
    const py = state.pointer.y * 0.3;
    meshRef.current.position.x += (px - meshRef.current.position.x) * 0.05;
    meshRef.current.position.y += (py - meshRef.current.position.y) * 0.05;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <torusKnotGeometry args={[1, 0.32, 220, 24, 3, 5]} />
        <primitive object={material} attach="material" />
      </mesh>
    </Float>
  );
}

/* ─── GPU shader particle field (15 000 particles) ─── */
function GPUParticleField({ count = 15000 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const { geo, mat } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const palette = [
      new THREE.Color("#a78bfa"),
      new THREE.Color("#22d3ee"),
      new THREE.Color("#f472b6"),
      new THREE.Color("#7c3aed"),
      new THREE.Color("#34d399"),
    ];

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 3 + Math.random() * 6;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
      seeds[i] = Math.random();
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed",    new THREE.BufferAttribute(seeds, 1));
    g.setAttribute("aColor",   new THREE.BufferAttribute(colors, 3));

    const m = new THREE.ShaderMaterial({
      vertexShader: PARTICLE_VERT,
      fragmentShader: PARTICLE_FRAG,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    return { geo: g, mat: m };
  }, [count]);

  useEffect(() => () => { geo.dispose(); mat.dispose(); }, [geo, mat]);

  useFrame((state) => {
    mat.uniforms.uTime.value = state.clock.elapsedTime;
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018;
    }
  });

  return <points ref={pointsRef} geometry={geo} material={mat} />;
}

/* ─── Orbital rings ─── */
function OrbitalRing({
  radius, tilt, speed, color,
}: { radius: number; tilt: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });
  return (
    <Torus ref={ref} args={[radius, 0.012, 12, 100]} rotation={[tilt, 0, 0]}>
      <meshBasicMaterial color={color} transparent opacity={0.5} />
    </Torus>
  );
}

/* ─── Orbiting satellite octahedrons ─── */
function Satellite({
  angle, radius, size, speed, color,
}: { angle: number; radius: number; size: number; speed: number; color: string }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed + angle;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
    ref.current.position.y = Math.sin(t * 1.3) * 0.5;
    ref.current.rotation.x += 0.02;
    ref.current.rotation.y += 0.03;
  });
  return (
    <Octahedron ref={ref} args={[size]}>
      <meshStandardMaterial color={color} wireframe transparent opacity={0.7} />
    </Octahedron>
  );
}

/* ─── Trailing orb ─── */
function TrailingOrb() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2.2;
    ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.7) * 1.4;
    ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.8;
  });
  return (
    <Trail width={0.7} length={8} color="#7c3aed" attenuation={(t) => t * t} target={ref as React.RefObject<THREE.Object3D>}>
      <Sphere ref={ref} args={[0.1, 16, 16]}>
        <meshBasicMaterial color="#c4b5fd" />
      </Sphere>
    </Trail>
  );
}

/* ─── Scroll-driven camera ─── */
function ScrollCamera() {
  const { camera } = useThree();
  const progress = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const trigger = ScrollTrigger.create({
      trigger: "#home",
      start: "top top",
      end: "bottom top",
      onUpdate: (self) => { progress.current = self.progress; },
    });
    return () => trigger.kill();
  }, []);

  useFrame(() => {
    const p = progress.current;
    camera.position.z += (7 + p * 4 - camera.position.z) * 0.04;
    camera.position.y += (-p * 1.8 - camera.position.y) * 0.04;
  });

  return null;
}

/* ─── Full scene ─── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-4, 2, -4]} intensity={4}   color="#7c3aed" distance={14} />
      <pointLight position={[4, -2, 3]}  intensity={3}   color="#22d3ee" distance={12} />
      <pointLight position={[0, 4, -2]}  intensity={2}   color="#f472b6" distance={10} />

      <Suspense fallback={null}>
        <IridescentKnot />
        <OrbitalRing radius={2.0} tilt={Math.PI / 4}    speed={0.4}   color="#7c3aed" />
        <OrbitalRing radius={2.5} tilt={-Math.PI / 6}   speed={-0.25} color="#22d3ee" />
        <OrbitalRing radius={3.0} tilt={Math.PI / 2.5}  speed={0.18}  color="#f472b6" />
        <Satellite angle={0}   radius={2.7} size={0.13} speed={0.55} color="#a78bfa" />
        <Satellite angle={2.1} radius={2.7} size={0.10} speed={0.55} color="#22d3ee" />
        <Satellite angle={4.2} radius={2.7} size={0.11} speed={0.55} color="#f472b6" />
        <Satellite angle={1.0} radius={3.5} size={0.08} speed={0.3}  color="#34d399" />
        <TrailingOrb />
        <GPUParticleField count={15000} />
      </Suspense>

      {/* Cinematic post-processing */}
      <EffectComposer>
        <Bloom
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
          intensity={0.7}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.12} darkness={0.65} />
      </EffectComposer>

      <ScrollCamera />
    </>
  );
}

/* ─── Error boundary ─── */
class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(_e: Error, _i: ErrorInfo) {}
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ─── CSS fallback when WebGL is unavailable ─── */
function StaticFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-64 h-64 opacity-70">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/30 animate-ping"
            style={{
              inset: `${i * 12}%`,
              animationDuration: `${3 + i}s`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/25 blur-2xl" />
        </div>
      </div>
    </div>
  );
}

/* ─── Canvas ─── */
function Hero3DCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 52 }}
        gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}

/* ─── Public export with WebGL guard ─── */
export function Hero3D() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  useEffect(() => { setWebglSupported(detectWebGL()); }, []);
  if (webglSupported === null) return null;
  if (!webglSupported) return <StaticFallback />;
  return (
    <WebGLErrorBoundary fallback={<StaticFallback />}>
      <Hero3DCanvas />
    </WebGLErrorBoundary>
  );
}
