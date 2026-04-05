"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  /** Extra delay in seconds before the animation starts */
  delay?: number;
  /** When true, plays immediately on mount without waiting for scroll */
  immediate?: boolean;
}

/**
 * Wraps children in a clip-path reveal animation.
 * On scroll entry (or immediately when `immediate` is true) the content
 * slides up from behind a clip mask — the signature Active Theory reveal.
 */
export function GsapReveal({
  children,
  className = "",
  delay = 0,
  immediate = false,
}: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { clipPath: "inset(0 0 100% 0)", opacity: 0, y: 18 },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          y: 0,
          duration: 0.9,
          delay,
          ease: "power4.out",
          scrollTrigger: immediate
            ? undefined
            : {
                trigger: el,
                start: "top 88%",
                once: true,
              },
        }
      );
    });

    return () => ctx.revert();
  }, [delay, immediate]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * GsapWordReveal
 * Splits a string into individual words. Each word animates in from below
 * its own clip-mask with a stagger — character-level Active Theory feel
 * without needing the paid SplitText plugin.
 * ───────────────────────────────────────────────────────────────────────────── */

interface GsapWordRevealProps {
  text: string;
  className?: string;
  /** Applied to every word's outer overflow-hidden span */
  wordClassName?: string;
  /** Stagger delay between words in seconds */
  stagger?: number;
  /** Initial delay in seconds */
  delay?: number;
  /** When true plays on mount, otherwise plays on scroll entry */
  immediate?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function GsapWordReveal({
  text,
  className = "",
  wordClassName = "",
  stagger = 0.065,
  delay = 0,
  immediate = false,
  as: Tag = "div",
}: GsapWordRevealProps) {
  const containerRef = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    if (!container) return;

    const innerSpans = container.querySelectorAll<HTMLSpanElement>(".gsap-word-inner");
    if (!innerSpans.length) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerSpans,
        { y: "105%", opacity: 0 },
        {
          y: "0%",
          opacity: 1,
          duration: 0.75,
          stagger,
          delay,
          ease: "power3.out",
          scrollTrigger: immediate
            ? undefined
            : {
                trigger: container,
                start: "top 88%",
                once: true,
              },
        }
      );
    });

    return () => ctx.revert();
  }, [text, stagger, delay, immediate]);

  return (
    /* @ts-expect-error — dynamic Tag is valid */
    <Tag ref={containerRef} className={className}>
      {words.map((word, i) => (
        <span
          key={i}
          className={`inline-block overflow-hidden leading-none ${wordClassName}`}
          aria-hidden={i > 0 ? true : undefined}
        >
          <span className="gsap-word-inner inline-block">
            {word}
          </span>
          {i < words.length - 1 ? "\u00a0" : ""}
        </span>
      ))}
    </Tag>
  );
}
