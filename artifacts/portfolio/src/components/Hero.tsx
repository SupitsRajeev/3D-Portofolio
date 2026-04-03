import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { GlowButton } from "./GlowButton";
import { Hero3D } from "./Hero3D";
import { useContent } from "@/context/ContentContext";

const SOCIAL_ICONS = { GitHub: Github, LinkedIn: Linkedin, Twitter };

export function Hero() {
  const { content } = useContent();
  const { identity, socials } = content;
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* Background nebula blobs — stay behind everything */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-[20%] -left-[10%] w-[55%] h-[55%] rounded-full bg-primary/20 dark:bg-primary/15 blur-[140px] animate-nebula-1" />
        <div className="absolute top-[60%] -right-[10%] w-[45%] h-[45%] rounded-full bg-accent/15 dark:bg-cyan-500/10 blur-[120px] animate-nebula-2" />
      </div>

      {/* Two-column layout */}
      <div className="container relative z-10 px-6 md:px-12 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0 py-32 lg:py-0 min-h-[100dvh]">

          {/* ── Left: text content ── */}
          <div className="w-full lg:w-1/2 flex flex-col items-start text-left lg:pr-12">

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 dark:bg-primary/15 text-primary border border-primary/25 text-sm font-mono mb-6 backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                Available for work
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight text-foreground mb-6 leading-[1.05]"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
            >
              I'm{" "}
              <span className="text-foreground">{identity.name}</span>
              <span className="text-primary dark:drop-shadow-[0_0_18px_hsl(var(--primary)/0.55)]">.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground font-light mb-10 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {identity.title} building things for the web that are{" "}
              <span className="text-foreground font-medium">fast, beautiful,</span> and intentional.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <GlowButton href="#projects" className="text-base">
                View My Work
                <ArrowRight className="h-4 w-4" />
              </GlowButton>

              <GlowButton href="#contact" className="text-base">
                <MessageCircle className="h-4 w-4" />
                Contact Me
              </GlowButton>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {socials.map(({ href, platform }) => {
                const Icon = SOCIAL_ICONS[platform as keyof typeof SOCIAL_ICONS];
                if (!Icon) return null;
                return (
                  <a
                    key={platform}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={platform}
                    className="p-2 rounded-lg hover:text-primary dark:hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.7)] hover:-translate-y-0.5 transition-all duration-200"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </motion.div>
          </div>

          {/* ── Right: 3D canvas, fully contained ── */}
          <motion.div
            className="w-full lg:w-1/2 relative h-[420px] md:h-[520px] lg:h-[640px]"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <Hero3D />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-muted-foreground/50 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
        <motion.div
          className="w-[1px] h-10 bg-gradient-to-b from-primary/50 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
