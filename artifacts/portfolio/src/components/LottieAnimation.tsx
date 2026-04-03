"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LottieAnimationProps {
  /** URL to a .lottie or .json animation from lottie.host or similar CDN */
  src: string;
  /** Width / height (defaults to 100%) */
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

/**
 * Thin wrapper around @lottiefiles/dotlottie-react.
 * Accepts any public Lottie animation URL (.lottie or .json).
 *
 * Find free animations at https://lottiefiles.com and copy the "Lottie URL"
 * from the share panel (lottie.host/…) then pass it as `src`.
 */
export function LottieAnimation({
  src,
  className,
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  return (
    <DotLottieReact
      src={src}
      loop={loop}
      autoplay={autoplay}
      className={className}
    />
  );
}
