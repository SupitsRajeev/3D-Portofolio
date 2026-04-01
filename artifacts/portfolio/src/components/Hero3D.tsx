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
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  TorusKnot,
  MeshDistortMaterial,
  Stars,
  Float,
  Wireframe,
  Trail,
  Sphere,
  Torus,
  Octahedron,
  MeshTransmissionMaterial,
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

/* ─── Central torus knot with iridescent holographic material ─── */
function CentralKnot() {
  const knotRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!knotRef.current) return;
    knotRef.current.rotation.x = state.clock.elapsedTime * 0.12;
    knotRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    const px = state.pointer.x * 0.4;
    const py = state.pointer.y * 0.4;
    knotRef.current.position.x += (px - knotRef.current.position.x) * 0.06;
    knotRef.current.position.y += (py - knotRef.current.position.y) * 0.06;
  });

  return (
    <TorusKnot
      ref={knotRef}
      args={[1, 0.32, 200, 24, 3, 5]}
      scale={hovered ? 1.08 : 1}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color="#7c3aed"
        distort={0.28}
        speed={2}
        roughness={0}
        metalness={0.9}
        transparent
        opacity={0.92}
        envMapIntensity={2}
      />
    </TorusKnot>
  );
}

/* ─── Orbiting wireframe rings ─── */
function OrbitalRing({ radius, tilt, speed, color }: { radius: number; tilt: number; speed: number; color: string }) {
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

/* ─── Floating satellite octahedrons ─── */
function Satellite({ angle, radius, size, speed, color }: {
  angle: number; radius: number; size: number; speed: number; color: string;
}) {
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

/* ─── Particle field — instanced points ─── */
function ParticleField({ count = 280 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, speeds } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 14;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      speeds[i] = 0.2 + Math.random() * 0.6;
    }
    return { positions, speeds };
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < count; i++) {
      posAttr.array[i * 3 + 1] =
        (posAttr.array[i * 3 + 1] as number) + Math.sin(state.clock.elapsedTime * speeds[i] + i) * 0.002;
    }
    posAttr.needsUpdate = true;
    ref.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial
        color="#a78bfa"
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.7}
        fog={false}
      />
    </points>
  );
}

/* ─── Glass orb accent ─── */
function GlassOrb({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7) * 0.25;
    ref.current.rotation.y += 0.01;
  });
  return (
    <Sphere ref={ref} args={[0.28, 32, 32]} position={position}>
      <MeshTransmissionMaterial
        backside
        samples={6}
        thickness={0.5}
        roughness={0}
        transmission={1}
        ior={1.6}
        chromaticAberration={0.06}
        color="#22d3ee"
      />
    </Sphere>
  );
}

/* ─── Camera subtle mouse parallax ─── */
function CameraRig() {
  useFrame((state) => {
    state.camera.position.x += (state.pointer.x * 0.5 - state.camera.position.x) * 0.04;
    state.camera.position.y += (state.pointer.y * 0.3 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ─── Trailing floating sphere ─── */
function TrailingOrb() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2.5;
    ref.current.position.y = Math.cos(state.clock.elapsedTime * 0.7) * 1.5;
    ref.current.position.z = Math.sin(state.clock.elapsedTime * 0.3) * 1;
  });
  return (
    <Trail width={0.8} length={8} color="#7c3aed" attenuation={(t) => t * t} target={ref}>
      <Sphere ref={ref} args={[0.1, 16, 16]}>
        <meshBasicMaterial color="#c4b5fd" />
      </Sphere>
    </Trail>
  );
}

/* ─── Full 3D scene ─── */
function Scene() {
  return (
    <>
      <CameraRig />
      <Stars radius={30} depth={60} count={800} factor={2} saturation={0.8} fade speed={0.5} />
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <pointLight position={[-4, 2, -4]} intensity={3} color="#7c3aed" distance={12} />
      <pointLight position={[4, -2, 3]} intensity={2} color="#22d3ee" distance={10} />
      <pointLight position={[0, 4, -2]} intensity={1.5} color="#f472b6" distance={8} />

      <Suspense fallback={null}>
        {/* Main centerpiece */}
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
          <CentralKnot />
        </Float>

        {/* Orbital rings */}
        <OrbitalRing radius={2.0} tilt={Math.PI / 4}   speed={0.4}  color="#7c3aed" />
        <OrbitalRing radius={2.5} tilt={-Math.PI / 6}  speed={-0.25} color="#22d3ee" />
        <OrbitalRing radius={3.0} tilt={Math.PI / 2.5} speed={0.18} color="#f472b6" />

        {/* Orbiting satellites */}
        <Satellite angle={0}    radius={2.8} size={0.14} speed={0.55} color="#a78bfa" />
        <Satellite angle={2.1}  radius={2.8} size={0.10} speed={0.55} color="#22d3ee" />
        <Satellite angle={4.2}  radius={2.8} size={0.12} speed={0.55} color="#f472b6" />
        <Satellite angle={1.0}  radius={3.6} size={0.08} speed={0.3}  color="#34d399" />
        <Satellite angle={3.5}  radius={3.6} size={0.09} speed={0.3}  color="#fbbf24" />

        {/* Glass orbs */}
        <GlassOrb position={[-2.8, 1.2, 0.5]} />
        <GlassOrb position={[3.0, -1.0, -0.5]} />

        {/* Trailing light orb */}
        <TrailingOrb />

        {/* Background particles */}
        <ParticleField count={260} />
      </Suspense>
    </>
  );
}

/* ─── Error boundary ─── */
interface EBState { hasError: boolean }
class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(): EBState { return { hasError: true }; }
  componentDidCatch(_e: Error, _i: ErrorInfo) {}
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

/* ─── CSS fallback (no WebGL) ─── */
function StaticFallback() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none hidden md:flex items-center justify-end pr-16">
      <div className="relative w-80 h-80 opacity-60">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border border-primary/30 animate-ping"
            style={{
              inset: `${i * 14}%`,
              animationDuration: `${3 + i}s`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-primary/20 blur-3xl" />
        </div>
      </div>
    </div>
  );
}

/* ─── Canvas wrapper ─── */
function Hero3DCanvas() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
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
