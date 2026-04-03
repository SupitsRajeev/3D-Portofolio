"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useOrb } from "@/context/OrbContext";

interface FloatingOrbProps {
  src?: string;
  alt?: string;
}

export function FloatingOrb({ src = "/profile.jpg", alt = "Profile" }: FloatingOrbProps) {
  const { isExpanded } = useOrb();
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);

  // Animate SVG turbulence baseFrequency to create a liquid-edge wobble
  useEffect(() => {
    if (isExpanded) return;
    let t = 0;
    let frame: number;
    const tick = () => {
      t += 0.007;
      if (turbulenceRef.current) {
        const bf = (0.013 + Math.sin(t) * 0.007).toFixed(4);
        turbulenceRef.current.setAttribute("baseFrequency", bf);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isExpanded]);

  // Subtle mouse parallax follow
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 24);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 24);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [mouseX, mouseY]);

  return (
    <AnimatePresence>
      {!isExpanded && (
        <motion.div
          layoutId="profile-orb"
          key="floating-orb"
          className="fixed bottom-8 right-8 z-50 cursor-pointer select-none group"
          style={{ x: springX, y: springY }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0, transition: { duration: 0.25 } }}
          whileHover={{ scale: 1.1 }}
          onClick={() =>
            document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Go to About section"
          role="button"
        >
          {/* Inline SVG filter – zero-size, purely declarative */}
          <svg
            width="0"
            height="0"
            className="absolute pointer-events-none overflow-hidden"
            aria-hidden="true"
          >
            <defs>
              <filter id="orb-liquid" x="-25%" y="-25%" width="150%" height="150%">
                <feTurbulence
                  ref={turbulenceRef}
                  type="turbulence"
                  baseFrequency="0.013"
                  numOctaves="3"
                  seed="8"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="6"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          {/* Pulsing glow ring */}
          <motion.div
            className="absolute -inset-3 rounded-full bg-primary/25 blur-lg pointer-events-none"
            animate={{ scale: [1, 1.18, 1], opacity: [0.35, 0.65, 0.35] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Circle image with liquid-mask filter */}
          <div style={{ filter: "url(#orb-liquid)" }}>
            <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/60 shadow-[0_0_20px_4px_hsl(var(--primary)/0.3)]">
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-cover object-top"
                draggable={false}
              />
            </div>
          </div>

          {/* Tooltip – visible on hover via Tailwind group-hover */}
          <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 text-[10px] font-mono text-primary bg-card/80 border border-border/50 rounded-full px-2.5 py-0.5 whitespace-nowrap backdrop-blur-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            About Me
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
