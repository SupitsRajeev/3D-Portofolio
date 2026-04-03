import { Suspense } from "react";
import { FloatingModel } from "./FloatingModel";
import { ParticleEffect } from "./ParticleEffect";
import { GradientSphere } from "./GradientSphere";
import { DNAHelix } from "./DNAHelix";
import { GlowingTorus } from "./GlowingTorus";
import { PhysicsBalls } from "./PhysicsBalls";

interface EffectCardProps {
  title: string;
  description: string;
  borderColor: string;
  children: React.ReactNode;
}

function EffectCard({ title, description, borderColor, children }: EffectCardProps) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <div
        className={`w-full h-72 rounded-xl overflow-hidden border ${borderColor} bg-black/40`}
      >
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              Loading 3D effect…
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </div>
  );
}

export function ThreeDShowcase() {
  return (
    <section id="3d-showcase" className="py-20 bg-gradient-to-b from-background to-black/60">
      <div className="container mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-foreground mb-4">3D Effects Gallery</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A showcase of interactive 3D animations powered by Three.js and React Three Fiber.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <EffectCard
            title="Floating Model"
            description="Rotating 3D cube with OrbitControls — drag to explore."
            borderColor="border-purple-500/40"
          >
            <FloatingModel />
          </EffectCard>

          <EffectCard
            title="Particle System"
            description="2 000+ animated particles with per-vertex color."
            borderColor="border-violet-500/40"
          >
            <ParticleEffect />
          </EffectCard>

          <EffectCard
            title="Gradient Sphere"
            description="Animated sphere with multi-color dynamic lighting."
            borderColor="border-cyan-500/40"
          >
            <GradientSphere />
          </EffectCard>

          <EffectCard
            title="DNA Helix"
            description="Wireframe double-helix with animated rungs."
            borderColor="border-pink-500/40"
          >
            <DNAHelix />
          </EffectCard>

          <EffectCard
            title="Glowing Torus Knot"
            description="Torus knot with emissive glow and dual-layer bloom."
            borderColor="border-cyan-500/40"
          >
            <GlowingTorus />
          </EffectCard>

          <EffectCard
            title="Physics Simulation"
            description="Bouncing balls with gravity and boundary collisions."
            borderColor="border-purple-500/40"
          >
            <PhysicsBalls />
          </EffectCard>
        </div>
      </div>
    </section>
  );
}
