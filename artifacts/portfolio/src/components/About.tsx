import { motion } from "framer-motion";
import { Code2, Compass, Layers } from "lucide-react";

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section id="about" className="py-24 md:py-32 bg-background relative overflow-hidden">
      <div className="container px-6 md:px-12 mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-4xl mx-auto"
        >
          <motion.div variants={itemVariants} className="mb-4 flex items-center gap-4">
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest">01. About Me</h2>
            <div className="h-[1px] w-24 bg-border"></div>
          </motion.div>

          <div className="grid md:grid-cols-[2fr_1fr] gap-12 items-start">
            <motion.div variants={itemVariants} className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I build things for the web that are <span className="text-foreground font-medium">fast, beautiful, and intentional</span>. 
                With 5+ years of experience spanning React, Node.js, and cloud infrastructure, I love turning complex problems into elegant solutions.
              </p>
              <p>
                My approach to development is rooted in design thinking. I believe that a great user experience isn't just about how it looks, 
                but how it feels and functions under the hood. The architecture should be as clean as the interface.
              </p>
              <p>
                When not coding, I'm either hiking trails or experimenting with generative art.
              </p>
              
              <div className="pt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium mb-1">Architecture</h3>
                    <p className="text-sm">Scalable, maintainable systems built for the long term.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-lg text-primary">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-medium mb-1">Exploration</h3>
                    <p className="text-sm">Always learning, testing new paradigms and tools.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-tr from-primary to-accent opacity-20 rounded-2xl blur-lg group-hover:opacity-40 transition duration-500"></div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-border bg-card">
                <div className="absolute inset-0 bg-muted flex items-center justify-center">
                  <Code2 className="w-16 h-16 text-muted-foreground/30" />
                </div>
                {/* Image overlay effect */}
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay transition-opacity group-hover:opacity-0"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
