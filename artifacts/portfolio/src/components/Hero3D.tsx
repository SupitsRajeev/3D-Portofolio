import { Suspense, useRef, useState, Component, type ReactNode, type ErrorInfo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Icosahedron, MeshDistortMaterial } from "@react-three/drei";
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

function AnimatedGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.002;
    meshRef.current.rotation.y += 0.003;
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    meshRef.current.rotation.y += 0.05 * (targetX - meshRef.current.rotation.y);
    meshRef.current.rotation.x += 0.05 * (targetY - meshRef.current.rotation.x);
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <Icosahedron
      ref={meshRef}
      args={[1, 2]}
      scale={hovered ? 2.2 : 2}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <MeshDistortMaterial
        color="#7c3aed"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.2}
        metalness={0.8}
        wireframe={true}
        transparent={true}
        opacity={0.8}
      />
    </Icosahedron>
  );
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class WebGLErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(_error: Error, _info: ErrorInfo) {
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

function StaticFallback() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none hidden md:flex items-center">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[80vh] flex items-center justify-center">
        <div className="relative w-72 h-72 opacity-50">
          <div className="absolute inset-0 rounded-full border border-primary/40 animate-ping" style={{ animationDuration: "3s" }} />
          <div className="absolute inset-8 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: "4s", animationDelay: "0.5s" }} />
          <div className="absolute inset-16 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: "5s", animationDelay: "1s" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/20 blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero3DCanvas() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none hidden md:block">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[50vw] h-[80vh] pointer-events-auto">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#22d3ee" />
          <Suspense fallback={null}>
            <AnimatedGeometry />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}

export function Hero3D() {
  const [webglSupported, setWebglSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setWebglSupported(detectWebGL());
  }, []);

  if (webglSupported === null) return null;

  if (!webglSupported) {
    return <StaticFallback />;
  }

  return (
    <WebGLErrorBoundary fallback={<StaticFallback />}>
      <Hero3DCanvas />
    </WebGLErrorBoundary>
  );
}
