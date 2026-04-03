"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

function AnimatedSphere() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 64, 64]} />
      <meshPhongMaterial
        color="#06b6d4"
        emissive="#0891b2"
        emissiveIntensity={0.5}
        shininess={120}
      />
    </mesh>
  );
}

export function GradientSphere() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#06b6d4" />
      <pointLight position={[-10, -10, 10]} intensity={1} color="#ff006e" />
      <pointLight position={[0, -10, -10]} intensity={0.8} color="#8b5cf6" />
      <AnimatedSphere />
    </Canvas>
  );
}
