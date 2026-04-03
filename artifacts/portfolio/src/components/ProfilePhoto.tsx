"use client";

import { motion } from "framer-motion";

interface ProfilePhotoProps {
  src?: string;
  alt?: string;
  size?: number;
}

const DOTS = [
  { angle: 20,  radius: 52, size: 10, delay: 0 },
  { angle: 80,  radius: 56, size: 8,  delay: 0.4 },
  { angle: 150, radius: 50, size: 12, delay: 0.8 },
  { angle: 220, radius: 54, size: 9,  delay: 1.2 },
  { angle: 300, radius: 52, size: 7,  delay: 0.6 },
];

function orbitPosition(angleDeg: number, radiusPct: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    left: `${50 + radiusPct * Math.cos(rad)}%`,
    top:  `${50 + radiusPct * Math.sin(rad)}%`,
  };
}

export function ProfilePhoto({
  src = "/profile.jpg",
  alt = "Rajeev Neupane",
  size = 340,
}: ProfilePhotoProps) {
  return (
    <motion.div
      className="relative flex items-center justify-center select-none"
      style={{ width: size, height: size }}
      initial={{ opacity: 0, scale: 0.88 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
    >
      {/* Outer slow-spin gradient ring */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg, hsl(var(--primary)/0.85), hsl(var(--accent)/0.6), transparent, hsl(var(--primary)/0.85))",
          padding: 3,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
      />

      {/* Inner static ring — covers the conic gap */}
      <div
        className="absolute rounded-full bg-background"
        style={{ inset: 3 }}
      />

      {/* Pulsing glow ring */}
      <motion.div
        className="absolute rounded-full border-2 border-primary/30"
        style={{ inset: -12 }}
        animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.04, 1] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Floating wrapper — gentle up/down bob */}
      <motion.div
        className="absolute rounded-full overflow-hidden"
        style={{ inset: 3 }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        whileHover={{ scale: 1.04 }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover object-top"
          draggable={false}
        />
        {/* Subtle inner vignette overlay */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at 70% 20%, transparent 60%, hsl(var(--background)/0.15) 100%)",
          }}
        />
      </motion.div>

      {/* Orbiting accent dots */}
      {DOTS.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-primary/70 shadow-[0_0_6px_2px_hsl(var(--primary)/0.4)]"
          style={{
            width: dot.size,
            height: dot.size,
            ...orbitPosition(dot.angle, dot.radius),
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale:   [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2.4,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Corner sparkle — top right */}
      <motion.div
        className="absolute -top-3 -right-3 w-6 h-6 text-primary"
        animate={{ rotate: [0, 180, 360], scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" className="opacity-70">
          <path d="M12 2l1.6 6.4L20 10l-6.4 1.6L12 18l-1.6-6.4L4 10l6.4-1.6z" />
        </svg>
      </motion.div>
    </motion.div>
  );
}
