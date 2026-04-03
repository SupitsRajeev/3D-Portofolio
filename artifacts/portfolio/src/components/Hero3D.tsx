import {
  Suspense,
  useRef,
  useState,
  Component,
  type ReactNode,
  type ErrorInfo,
  useEffect,
  useMemo,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Icosahedron,
  Box,
  Tetrahedron,
  Octahedron,
  MeshDistortMaterial,
  Float,
  Trail,
  Sphere,
  Torus,
} from "@react-three/drei";
import * as THREE from "three";

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

/* ─── Central torus knot ─── */
function CentralKnot() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * 0.12;
    ref.current.rotation.y = state.clock.elapsedTime * 0.18;
    // Subtle mouse parallax on the knot itself
    const px = state.pointer.x * 0.3;
    const py = state.pointer.y * 0.3;
    ref.current.position.x += (px - ref.current.position.x) * 0.05;
    ref.current.position.y += (py - ref.current.position.y) * 0.05;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.4}>
      <TorusKnot ref={ref} args={[1, 0.32, 200, 24, 3, 5]}>
        <MeshDistortMaterial
          color="#7c3aed"
          distort={0.28}
          speed={2}
          roughness={0}
          metalness={0.9}
          transparent
          opacity={0.95}
          envMapIntensity={2}
        />
      </TorusKnot>
    </Float>
  );
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
      <meshBasicMaterial color={color} transparent opacity={0.55} />
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
      <meshStandardMaterial color={color} wireframe transparent opacity={0.75} />
    </Octahedron>
  );
}

/* ─── Trailing orb ─── */
function TrailingOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2.2;
    ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.7) * 1.4;
    ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.8;
  });
  return (
    <Trail width={0.7} length={8} color="#7c3aed" attenuation={(t) => t * t} target={ref}>
      <Sphere ref={ref} args={[0.1, 16, 16]}>
        <meshBasicMaterial color="#c4b5fd" />
      </Sphere>
    </Trail>
  );
}

/* ─── Particle field ─── */
function ParticleField({ count = 200 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { geo, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
      speeds[i] = 0.2 + Math.random() * 0.5;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geo: g, speeds };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      (posAttr.array as Float32Array)[i * 3 + 1] +=
        Math.sin(state.clock.elapsedTime * speeds[i] + i) * 0.002;
    }
    posAttr.needsUpdate = true;
    ref.current.rotation.y = state.clock.elapsedTime * 0.025;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#a78bfa" size={0.04} sizeAttenuation transparent opacity={0.7} fog={false} />
    </points>
  );
}

/* ─── Full scene ─── */
function Scene() {
  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[-4, 2, -4]} intensity={4}   color="#7c3aed" distance={14} />
      <pointLight position={[4, -2, 3]}  intensity={3}   color="#22d3ee" distance={12} />
      <pointLight position={[0, 4, -2]}  intensity={2}   color="#f472b6" distance={10} />

      <Suspense fallback={null}>
        <CentralKnot />
        <OrbitalRing radius={2.0} tilt={Math.PI / 4}    speed={0.4}   color="#7c3aed" />
        <OrbitalRing radius={2.5} tilt={-Math.PI / 6}   speed={-0.25} color="#22d3ee" />
        <OrbitalRing radius={3.0} tilt={Math.PI / 2.5}  speed={0.18}  color="#f472b6" />
        <Satellite angle={0}   radius={2.7} size={0.13} speed={0.55} color="#a78bfa" />
        <Satellite angle={2.1} radius={2.7} size={0.10} speed={0.55} color="#22d3ee" />
        <Satellite angle={4.2} radius={2.7} size={0.11} speed={0.55} color="#f472b6" />
        <Satellite angle={1.0} radius={3.5} size={0.08} speed={0.3}  color="#34d399" />
        <TrailingOrb />
        <ParticleField count={200} />
      </Suspense>
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

/* ─── Canvas — fills its parent container, NOT full-screen ─── */
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
