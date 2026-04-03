import { motion } from "framer-motion";
import { ArrowUpRight, Github, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useContent } from "@/context/ContentContext";
import { COLOR_SCHEMES, PROJECT_ICONS } from "@/content";
import { FancyIconBox } from "./FancyIconBox";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function Projects() {
  const { content } = useContent();
  const { projects } = content;
  return (
    <section id="projects" className="py-24 md:py-32 bg-card/20 dark:bg-card/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-primary/5 dark:bg-primary/6 blur-[120px] rounded-full" />
      </div>

      <div className="container px-6 md:px-12 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest">02. Selected Work</h2>
          <div className="h-[1px] flex-grow max-w-[200px] bg-border" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project) => {
            const scheme = COLOR_SCHEMES[project.colorScheme];
            const Icon = PROJECT_ICONS[project.icon] ?? PROJECT_ICONS["Rocket"];
            return (
            <motion.article
              key={project.title}
              variants={itemVariants}
              className={`group relative flex flex-col justify-between h-full p-6 sm:p-8 rounded-2xl bg-card/70 dark:bg-card/60 backdrop-blur-sm border border-border/60 hover:border-primary/40 dark:hover:border-primary/30 shadow-md hover:shadow-2xl ${scheme.glow} dark:hover:shadow-[0_8px_40px_hsl(var(--primary)/0.12)] transition-all duration-400 hover:-translate-y-1`}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Gradient card sheen on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${scheme.accentFrom}/5 ${scheme.accentTo}/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div>
                {/* Project icon */}
                <div className="mb-6">
                  <FancyIconBox
                    icon={Icon}
                    color="text-white"
                    bg={`bg-gradient-to-br ${scheme.accentFrom} ${scheme.accentTo}`}
                    variant="project"
                    size="lg"
                  />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2 group-hover:text-primary transition-colors duration-200">
                  {project.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-200" />
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <ul className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="text-xs font-mono text-primary/80 bg-primary/8 dark:bg-primary/10 px-2.5 py-1 rounded-md border border-primary/15 hover:border-primary/35 hover:bg-primary/15 transition-colors duration-200"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-foreground dark:hover:text-primary dark:hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.6)] transition-all duration-200"
                    asChild
                  >
                    <a href={project.github} aria-label="GitHub Repository" target="_blank" rel="noreferrer">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 text-muted-foreground hover:text-foreground dark:hover:text-primary dark:hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.6)] transition-all duration-200"
                    asChild
                  >
                    <a href={project.link} aria-label="Live Demo" target="_blank" rel="noreferrer">
                      <Link2 className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
