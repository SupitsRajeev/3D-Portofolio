import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Twitter, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero3D } from "./Hero3D";

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      {/* Layered nebula background blobs */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute -top-[25%] -left-[15%] w-[65%] h-[65%] rounded-full bg-primary/25 blur-[140px] dark:bg-primary/18 animate-nebula-1" />
        <div className="absolute top-[55%] -right-[15%] w-[55%] h-[55%] rounded-full bg-accent/15 blur-[120px] dark:bg-cyan-500/10 animate-nebula-2" />
        <div className="absolute top-[30%] left-[40%] w-[30%] h-[30%] rounded-full bg-indigo-500/10 blur-[100px] dark:bg-indigo-500/8 animate-nebula-3" />
      </div>

      <Hero3D />

      <div className="container relative z-10 px-6 md:px-12 w-full flex flex-col md:flex-row items-center">
        <div className="w-full md:w-3/5 max-w-3xl flex flex-col items-start text-left">

          {/* Badge */}
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

          {/* Heading */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            I'm Alex Chen<span className="text-primary dark:drop-shadow-[0_0_20px_hsl(var(--primary)/0.5)]">.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-muted-foreground font-light mb-10 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Full-Stack Developer &amp; Creative Technologist building things for the web that are{" "}
            <span className="text-foreground font-normal">fast, beautiful,</span> and intentional.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-wrap items-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="h-12 px-8 text-base shadow-lg shadow-primary/25 dark:shadow-primary/40 hover:shadow-primary/50 dark:hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] transition-all duration-300 hover:-translate-y-0.5"
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
              className="h-12 px-8 text-base border-border/60 bg-background/40 backdrop-blur-sm hover:border-primary/50 dark:hover:border-primary/60 dark:hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)] hover:-translate-y-0.5 transition-all duration-300"
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
            className="flex items-center gap-5 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {[
              { href: "https://github.com", Icon: Github, label: "GitHub" },
              { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
              { href: "https://twitter.com", Icon: Twitter, label: "Twitter" },
            ].map(({ href, Icon, label }) => (
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
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] font-mono">Scroll</span>
        <motion.div
          className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}
