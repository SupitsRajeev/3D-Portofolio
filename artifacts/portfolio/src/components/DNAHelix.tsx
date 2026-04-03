"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function HelixStrand({ color, offset }: { color: string; offset: number }) {
  const lineRef = useRef<THREE.Line>(null);

  const geometry = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < 120; i++) {
      const t = (i / 120) * Math.PI * 8;
      points.push(
        new THREE.Vector3(
          Math.cos(t + offset) * 1.5,
          (i / 120) * 8 - 4,
          Math.sin(t + offset) * 1.5
        )
      );
    }
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    return geo;
  }, [offset]);

  useFrame((_state, delta) => {
    if (lineRef.current) {
      lineRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <primitive
      object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color }))}
      ref={lineRef}
    />
  );
}

function Rungs() {
  const groupRef = useRef<THREE.Group>(null);

  const rungGeometries = useMemo(() => {
    const rungs: { start: THREE.Vector3; end: THREE.Vector3 }[] = [];
    const count = 20;
    for (let i = 0; i < count; i++) {
      const t = (i / count) * Math.PI * 8;
      const y = (i / count) * 8 - 4;
      rungs.push({
        start: new THREE.Vector3(Math.cos(t) * 1.5, y, Math.sin(t) * 1.5),
        end: new THREE.Vector3(Math.cos(t + Math.PI) * 1.5, y, Math.sin(t + Math.PI) * 1.5),
      });
    }
    return rungs;
  }, []);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
  });

  return (
    <group ref={groupRef}>
      {rungGeometries.map((rung, i) => {
        const points = [rung.start, rung.end];
        const geo = new THREE.BufferGeometry().setFromPoints(points);
        const mat = new THREE.LineBasicMaterial({
          color: i % 2 === 0 ? "#f59e0b" : "#10b981",
          transparent: true,
          opacity: 0.6,
        });
        return <primitive key={i} object={new THREE.Line(geo, mat)} />;
      })}
    </group>
  );
}

export function DNAHelix() {
  return (
    <Canvas camera={{ position: [0, 0, 8] }}>
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#ff006e" />
      <HelixStrand color="#ff006e" offset={0} />
      <HelixStrand color="#8b5cf6" offset={Math.PI} />
      <Rungs />
    </Canvas>
  );
}
