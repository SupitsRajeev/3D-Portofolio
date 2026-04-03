"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const count = 2000;
    const posArr = new Float32Array(count * 3);
    const colArr = new Float32Array(count * 3);
    const color = new THREE.Color();

    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 0] = (Math.random() - 0.5) * 20;
      posArr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      posArr[i * 3 + 2] = (Math.random() - 0.5) * 20;

      color.setHSL(0.7 + Math.random() * 0.2, 1.0, 0.5 + Math.random() * 0.3);
      colArr[i * 3 + 0] = color.r;
      colArr[i * 3 + 1] = color.g;
      colArr[i * 3 + 2] = color.b;
    }
    return { positions: posArr, colors: colArr };
  }, []);

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x += delta * 0.02;
      pointsRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
      />
    </points>
  );
}

export function ParticleEffect() {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <Particles />
    </Canvas>
  );
}
