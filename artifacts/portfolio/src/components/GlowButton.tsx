import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface GlowButtonProps {
  children: ReactNode;
  className?: string;
  /** Renders an <a> when provided; otherwise renders a <button>. */
  href?: string;
  onClick?: React.MouseEventHandler;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export function GlowButton({
  children,
  className,
  href,
  type = "button",
  disabled,
  ...rest
}: GlowButtonProps) {
  const inner = (
    <>
      <span className="glow-btn-blob" aria-hidden="true" />
      <span className="glow-btn-inner">{children}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={cn("glow-btn", className)} {...rest}>
        {inner}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={cn("glow-btn", disabled && "opacity-60 pointer-events-none", className)}
      {...rest}
    >
      {inner}
    </button>
  );
}
