"use client";

import {
  Suspense,
  useRef,
  useMemo,
  useState,
  useEffect,
  Component,
  type ReactNode,
  type ErrorInfo,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  Octahedron,
  Dodecahedron,
  Icosahedron,
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

interface ShapeProps {
  position: [number, number, number];
  color: string;
  speed: number;
  scale?: number;
  wireframe?: boolean;
}

function FloatingOct({ position, color, speed, scale = 1, wireframe = true }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.7;
    ref.current.rotation.y = state.clock.elapsedTime * speed;
  });
  return (
    <Float speed={speed * 0.8} floatIntensity={0.6} rotationIntensity={0.3}>
      <Octahedron ref={ref} args={[0.3 * scale]} position={position}>
        <meshStandardMaterial color={color} wireframe={wireframe} transparent opacity={0.6} />
      </Octahedron>
    </Float>
  );
}

function FloatingDodec({ position, color, speed, scale = 1 }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.5;
    ref.current.rotation.z = state.clock.elapsedTime * speed * 0.8;
  });
  return (
    <Float speed={speed * 0.6} floatIntensity={0.5} rotationIntensity={0.2}>
      <Dodecahedron ref={ref} args={[0.25 * scale]} position={position}>
        <meshStandardMaterial color={color} wireframe transparent opacity={0.5} />
      </Dodecahedron>
    </Float>
  );
}

function FloatingIcosa({ position, color, speed, scale = 1 }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * speed;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.6;
  });
  return (
    <Float speed={speed * 1.1} floatIntensity={0.8} rotationIntensity={0.4}>
      <Icosahedron ref={ref} args={[0.22 * scale, 0]} position={position}>
        <meshStandardMaterial color={color} wireframe transparent opacity={0.55} />
      </Icosahedron>
    </Float>
  );
}

function FloatingRing({ position, color, speed, scale = 1 }: ShapeProps) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
    ref.current.rotation.z = state.clock.elapsedTime * speed;
  });
  return (
    <Float speed={speed * 0.7} floatIntensity={0.5}>
      <Torus ref={ref} args={[0.2 * scale, 0.05 * scale, 8, 40]} position={position}>
        <meshStandardMaterial color={color} transparent opacity={0.5} />
      </Torus>
    </Float>
  );
}

function MiniParticles({ count = 60 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial color="#a78bfa" size={0.03} sizeAttenuation transparent opacity={0.5} />
    </points>
  );
}

function ShapesScene({ variant }: { variant: "skills" | "about" }) {
  if (variant === "skills") {
    return (
      <>
        <ambientLight intensity={0.4} />
        <pointLight position={[3, 3, 2]} intensity={2} color="#7c3aed" />
        <pointLight position={[-3, -2, 2]} intensity={1.5} color="#22d3ee" />
        <Suspense fallback={null}>
          <MiniParticles count={80} />
          <FloatingOct   position={[-4.5, 1.5, 0]}  color="#a78bfa" speed={0.6} scale={1.4} />
          <FloatingOct   position={[4.2, -1.2, -1]} color="#22d3ee" speed={0.8} scale={1.0} />
          <FloatingDodec position={[-3.0, -2.0, 0]} color="#f472b6" speed={0.5} scale={1.2} />
          <FloatingDodec position={[3.5, 2.0, -1]}  color="#34d399" speed={0.7} scale={0.9} />
          <FloatingIcosa position={[0, 2.8, -1]}    color="#7c3aed" speed={0.9} scale={1.3} />
          <FloatingIcosa position={[-1.5, -2.5, 0]} color="#fbbf24" speed={0.6} scale={1.0} />
          <FloatingRing  position={[2.0, 1.5, 0]}   color="#a78bfa" speed={0.7} scale={1.5} />
          <FloatingRing  position={[-2.5, 0.5, -1]} color="#22d3ee" speed={0.5} scale={1.2} />
        </Suspense>
      </>
    );
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[2, 2, 2]} intensity={3} color="#7c3aed" />
      <pointLight position={[-2, -2, 1]} intensity={2} color="#22d3ee" />
      <Suspense fallback={null}>
        <FloatingOct   position={[0, 0, 0]}       color="#a78bfa" speed={0.5} scale={3} wireframe={false} />
        <FloatingRing  position={[0, 0, 0]}        color="#22d3ee" speed={0.3} scale={5} />
        <FloatingIcosa position={[0.6, 0.6, 0.5]}  color="#f472b6" speed={0.8} scale={1.5} />
        <FloatingIcosa position={[-0.7, -0.5, 0.3]} color="#34d399" speed={1.0} scale={1.2} />
      </Suspense>
    </>
  );
}

/* ─── Error boundary ─── */
class ErrBoundary extends Component<{ children: ReactNode }, { err: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { err: false };
  }
  static getDerivedStateFromError() { return { err: true }; }
  componentDidCatch(_e: Error, _i: ErrorInfo) {}
  render() { return this.state.err ? null : this.props.children; }
}

interface Props {
  variant: "skills" | "about";
  className?: string;
}

export function FloatingShapes3D({ variant, className = "" }: Props) {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);
  useEffect(() => { setWebglSupported(detectWebGL()); }, []);

  if (!webglSupported) return null;

  return (
    <ErrBoundary>
      <div className={`absolute inset-0 pointer-events-none ${className}`}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 60 }}
          gl={{ antialias: false, powerPreference: "high-performance", alpha: true }}
          dpr={[1, 1.2]}
          style={{ background: "transparent" }}
        >
          <ShapesScene variant={variant} />
        </Canvas>
      </div>
    </ErrBoundary>
  );
}
