import { motion } from "framer-motion";
import { FloatingShapes3D } from "./FloatingShapes3D";
import { useContent } from "@/context/ContentContext";
import { HIGHLIGHT_ICONS } from "@/content";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

export function About() {
  const { content } = useContent();
  const { bio, aboutHighlights, identity } = content;
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
                    className="flex gap-4 p-4 rounded-xl border border-border/50 bg-card/60 backdrop-blur-sm hover:border-primary/30 dark:hover:shadow-[0_0_20px_hsl(var(--primary)/0.08)] transition-all duration-300 group cursor-default"
                    whileHover={{ y: -2 }}
                  >
                    <div className="mt-0.5 bg-primary/10 dark:bg-primary/15 p-2.5 rounded-lg text-primary shrink-0 group-hover:bg-primary/20 dark:group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)] transition-all duration-300">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold mb-1 text-sm">{title}</h3>
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
