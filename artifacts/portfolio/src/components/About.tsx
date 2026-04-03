"use client";

import { motion } from "framer-motion";
import { FloatingShapes3D } from "./FloatingShapes3D";
import { defaultContent } from "@/content";
import { HIGHLIGHT_ICONS } from "@/content";
import { FancyIconBox } from "./FancyIconBox";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function About() {
  const { bio, aboutHighlights, identity } = defaultContent;
  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Subtle glow in dark mode */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full dark:bg-primary/8" />
      </div>

      <div className="container px-6 md:px-12 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-5xl mx-auto"
        >
          {/* Section label */}
          <motion.div variants={itemVariants} className="mb-4 flex items-center gap-4">
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest">01. About Me</h2>
            <div className="h-[1px] w-24 bg-border" />
          </motion.div>

          <div className="grid md:grid-cols-[2fr_1fr] gap-14 items-start">
            {/* Text */}
            <div className="space-y-0">
              <motion.div variants={itemVariants} className="space-y-5 text-lg text-muted-foreground leading-relaxed mb-10">
                {bio.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </motion.div>

              {/* Highlights grid */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {aboutHighlights.map(({ icon, title, desc }) => {
                  const Icon = HIGHLIGHT_ICONS[icon] ?? HIGHLIGHT_ICONS["Star"];
                  return (
                  <motion.div
                    key={title}
                    className="group flex gap-4 p-5 rounded-2xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/40 dark:hover:shadow-[0_0_28px_hsl(var(--primary)/0.1)] transition-all duration-300 cursor-default relative overflow-hidden"
                    whileHover={{ y: -3 }}
                  >
                    {/* Gradient sheen on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
                    <FancyIconBox
                      icon={Icon}
                      variant="highlight"
                      size="md"
                    />
                    <div className="relative z-10">
                      <h3 className="text-foreground font-semibold mb-1 text-sm group-hover:text-primary transition-colors duration-200">{title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                    </div>
                  </motion.div>
                  );
                })}
              </motion.div>
            </div>

            {/* 3D avatar card */}
            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute -inset-3 bg-gradient-to-tr from-primary/30 to-cyan-500/20 opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition duration-500" />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border/60 bg-card">
                <FloatingShapes3D variant="about" className="opacity-90" />
                <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <p className="text-xs font-mono text-muted-foreground/60 tracking-widest uppercase">{identity.name}</p>
                  <p className="text-xs font-mono text-primary/50 tracking-wider">Full-Stack</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
