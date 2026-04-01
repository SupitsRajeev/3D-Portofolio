import { useMemo } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  delay: number;
  duration: number;
}

export function StarField() {
  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 140 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.8 + 0.4,
      opacity: Math.random() * 0.55 + 0.15,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2.5,
    }));
  }, []);

  const shootingStars = useMemo(() => {
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      x: 20 + Math.random() * 60,
      y: 5 + Math.random() * 30,
      delay: i * 4 + Math.random() * 3,
    }));
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden dark:block hidden"
      aria-hidden="true"
    >
      {/* Nebula blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-violet-600/8 blur-[120px] animate-nebula-1" />
      <div className="absolute top-1/3 -right-40 w-[450px] h-[450px] rounded-full bg-cyan-500/6 blur-[130px] animate-nebula-2" />
      <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] rounded-full bg-indigo-600/7 blur-[110px] animate-nebula-3" />

      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: "absolute",
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            borderRadius: "50%",
            backgroundColor: "white",
            opacity: star.opacity,
            animationName: "twinkle",
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
            animationDirection: "alternate",
          }}
        />
      ))}

      {/* Shooting stars */}
      {shootingStars.map((s) => (
        <div
          key={s.id}
          style={{
            position: "absolute",
            left: `${s.x}%`,
            top: `${s.y}%`,
            animationName: "shoot",
            animationDuration: "2.5s",
            animationDelay: `${s.delay}s`,
            animationTimingFunction: "ease-in",
            animationIterationCount: "infinite",
          }}
          className="w-[1px] h-20 bg-gradient-to-b from-white/60 to-transparent rotate-[215deg]"
        />
      ))}
    </div>
  );
}
