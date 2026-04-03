import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BallState {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  color: string;
}

const BALL_COUNT = 6;
const BOUNDS = 5;

function PhysicsScene() {
  const meshRefs = useRef<(THREE.Mesh | null)[]>([]);

  const balls = useMemo<BallState[]>(() => {
    return Array.from({ length: BALL_COUNT }, (_, i) => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * BOUNDS * 1.5,
        (Math.random() - 0.5) * BOUNDS * 1.5,
        (Math.random() - 0.5) * 2
      ),
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.08,
        (Math.random() - 0.5) * 0.08,
        0
      ),
      color: `hsl(${(i / BALL_COUNT) * 360}, 90%, 60%)`,
    }));
  }, []);

  useFrame((_state, delta) => {
    balls.forEach((ball, i) => {
      ball.velocity.y -= delta * 2; // gravity
      ball.position.addScaledVector(ball.velocity, 1);

      // Boundary collisions with damping
      if (ball.position.x > BOUNDS || ball.position.x < -BOUNDS) {
        ball.velocity.x *= -0.85;
        ball.position.x = Math.sign(ball.position.x) * BOUNDS;
      }
      if (ball.position.y > BOUNDS || ball.position.y < -BOUNDS) {
        ball.velocity.y *= -0.85;
        ball.position.y = Math.sign(ball.position.y) * BOUNDS;
      }

      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.copy(ball.position);
      }
    });
  });

  return (
    <>
      {balls.map((ball, i) => (
        <mesh
          key={i}
          ref={(el) => { meshRefs.current[i] = el; }}
          position={ball.position.toArray()}
        >
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshPhongMaterial
            color={ball.color}
            emissive={ball.color}
            emissiveIntensity={0.3}
            shininess={100}
          />
        </mesh>
      ))}
    </>
  );
}

export function PhysicsBalls() {
  return (
    <Canvas camera={{ position: [0, 0, 14] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1.5} />
      <pointLight position={[-10, -10, 10]} intensity={0.8} color="#8b5cf6" />
      <PhysicsScene />
    </Canvas>
  );
}
