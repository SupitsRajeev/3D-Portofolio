import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero3D } from "./Hero3D";

const socials = [
  { href: "https://github.com",   Icon: Github,   label: "GitHub" },
  { href: "https://linkedin.com", Icon: Linkedin,  label: "LinkedIn" },
  { href: "https://twitter.com",  Icon: Twitter,   label: "Twitter" },
];

export function Hero() {
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
              <span className="text-foreground">Alex Chen</span>
              <span className="text-primary dark:drop-shadow-[0_0_18px_hsl(var(--primary)/0.55)]">.</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground font-light mb-10 max-w-lg leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Full-Stack Developer &amp; Creative Technologist building things for the web that are{" "}
              <span className="text-foreground font-medium">fast, beautiful,</span> and intentional.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-wrap items-center gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button
                size="lg"
                className="h-12 px-8 text-base shadow-lg shadow-primary/20 dark:shadow-primary/35 hover:shadow-primary/40 dark:hover:shadow-[0_0_28px_hsl(var(--primary)/0.5)] hover:-translate-y-0.5 transition-all duration-300"
                asChild
              >
                <a href="#projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="h-12 px-8 text-base border-border/60 bg-background/40 backdrop-blur-sm hover:border-primary/50 dark:hover:border-primary/50 hover:-translate-y-0.5 transition-all duration-300"
                asChild
              >
                <a href="#contact">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Contact Me
                </a>
              </Button>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4 text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {socials.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="p-2 rounded-lg hover:text-primary dark:hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.7)] hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
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
