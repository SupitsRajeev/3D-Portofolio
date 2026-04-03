import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "skill" | "highlight" | "project" | "nav";
type Size = "sm" | "md" | "lg";

interface FancyIconBoxProps {
  icon: LucideIcon;
  /** Tailwind text colour class e.g. "text-violet-400" */
  color?: string;
  /** Tailwind bg colour class e.g. "bg-violet-500/15" */
  bg?: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** If true, plays an idle pulse glow loop */
  pulse?: boolean;
}

const ICON_SIZE: Record<Size, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

const BOX_SIZE: Record<Size, string> = {
  sm: "w-8 h-8",
  md: "w-11 h-11",
  lg: "w-14 h-14",
};

/**
 * A fancy animated icon container used across Skills, About, Projects and Navigation.
 *
 * Visual features:
 *  - Layered gradient background matching the supplied colour
 *  - Slow-spin outer ring on hover (or always, when `pulse` is true)
 *  - Drop-shadow glow on hover
 *  - Spring scale on hover / tap
 *  - Decorative corner sparkle dot
 */
export function FancyIconBox({
  icon: Icon,
  color = "text-primary",
  bg = "bg-primary/15",
  variant = "skill",
  size = "md",
  className,
  pulse = false,
}: FancyIconBoxProps) {
  /** Derived raw colour value for box-shadow glow from the Tailwind text class. */
  const isHighlight = variant === "highlight";
  const isProject   = variant === "project";

  return (
    <motion.div
      className={cn("relative flex items-center justify-center shrink-0 rounded-xl", BOX_SIZE[size], className)}
      whileHover={{ scale: 1.15, rotate: isHighlight ? 8 : 0 }}
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 380, damping: 18 }}
    >
      {/* ── Spinning gradient outer ring ── */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0"
        style={{
          background: "conic-gradient(from 0deg, currentColor, transparent 60%, currentColor)",
          padding: 1.5,
        }}
        whileHover={{ opacity: 0.8 }}
        animate={pulse ? { rotate: 360 } : {}}
        transition={
          pulse
            ? { duration: 6, repeat: Infinity, ease: "linear" }
            : { duration: 1.8, ease: "linear" }
        }
      />

      {/* ── Soft glow blob behind the box ── */}
      <motion.div
        className={cn("absolute inset-0 rounded-xl blur-md", bg)}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 0.7, scale: 1.3 }}
        transition={{ duration: 0.35 }}
      />

      {/* ── Main icon surface ── */}
      <motion.div
        className={cn(
          "relative z-10 flex items-center justify-center rounded-xl border border-white/10",
          BOX_SIZE[size],
          bg,
        )}
        style={{
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12)",
        }}
        whileHover={{ boxShadow: "0 0 20px 4px currentColor" }}
      >
        {/* Shine sweep overlay */}
        <motion.div
          className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none"
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{ x: "120%", opacity: 1 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
        </motion.div>

        <Icon className={cn(ICON_SIZE[size], color, "drop-shadow-[0_0_5px_currentColor]")} />
      </motion.div>

      {/* ── Corner sparkle dot (project + highlight variants) ── */}
      {(isProject || isHighlight) && (
        <motion.span
          className={cn("absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full border-2 border-background", bg)}
          animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
    </motion.div>
  );
}
