"use client";

import { useEffect, useRef } from "react";

/**
 * Custom glowing cursor — Active Theory signature element.
 * – A small dot that tracks the mouse exactly.
 * – A larger glowing ring that follows with lerp lag.
 * – Scales up over interactive elements (a, button, [data-cursor-hover]).
 * – Hidden on touch devices.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: -200, y: -200 });
  const smooth = useRef({ x: -200, y: -200 });
  const isHovering = useRef(false);
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Make cursor visible and hide the native one
    dot.style.opacity = "1";
    ring.style.opacity = "1";
    document.body.style.cursor = "none";

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as Element | null;
      isHovering.current = !!(
        t?.closest("a, button, [role='button'], [data-cursor-hover]")
      );
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      smooth.current.x = lerp(smooth.current.x, mouse.current.x, 0.1);
      smooth.current.y = lerp(smooth.current.y, mouse.current.y, 0.1);

      // Dot follows exactly
      dot.style.transform = `translate(${mouse.current.x - 4}px, ${mouse.current.y - 4}px)`;

      // Ring lags + scales on hover
      const scale = isHovering.current ? 2.0 : 1;
      ring.style.transform = `translate(${smooth.current.x - 20}px, ${smooth.current.y - 20}px) scale(${scale})`;

      rafId.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId.current);
      document.body.style.cursor = "";
    };
  }, []);

  return (
    <>
      {/* Exact-position dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] w-2 h-2 rounded-full bg-primary opacity-0 will-change-transform"
        aria-hidden="true"
      />
      {/* Lagging glow ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] w-10 h-10 rounded-full border border-primary/60 bg-primary/8 opacity-0 will-change-transform transition-transform duration-150 ease-out"
        aria-hidden="true"
        style={{ filter: "blur(0.5px)" }}
      />
    </>
  );
}
