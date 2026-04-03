"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

function GlowTorus() {
  const outerRef = useRef<Mesh>(null);
  const innerRef = useRef<Mesh>(null);

  useFrame((_state, delta) => {
    if (outerRef.current && innerRef.current) {
      outerRef.current.rotation.x += delta * 0.3;
      outerRef.current.rotation.y += delta * 0.5;
      innerRef.current.rotation.x += delta * 0.3;
      innerRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group>
      {/* Core torus knot */}
      <mesh ref={innerRef} scale={1.5}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshPhongMaterial
          color="#06b6d4"
          emissive="#0891b2"
          emissiveIntensity={0.9}
          shininess={150}
        />
      </mesh>
      {/* Glow layer */}
      <mesh ref={outerRef} scale={1.56}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export function GlowingTorus() {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={2} color="#06b6d4" />
      <pointLight position={[-10, -10, -5]} intensity={1} color="#8b5cf6" />
      <GlowTorus />
    </Canvas>
  );
}
