import { motion } from "framer-motion";
import { ArrowUpRight, Github, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "NeuralCanvas",
    description: "AI-powered generative art platform. A creative tool letting artists generate and iterate on artworks using neural style transfer.",
    stack: ["React", "Python", "TensorFlow", "AWS"],
    link: "#",
    github: "#",
    imagePlaceholder: "NC",
    color: "from-blue-500/20 to-purple-500/20"
  },
  {
    title: "FlowDesk",
    description: "Real-time collaborative task management. Built for remote teams who need live syncing and intuitive workflows without the visual clutter of traditional project management tools.",
    stack: ["Next.js", "WebSocket", "PostgreSQL", "Redis"],
    link: "#",
    github: "#",
    imagePlaceholder: "FD",
    color: "from-emerald-500/20 to-cyan-500/20"
  },
  {
    title: "EcoTrack",
    description: "Carbon footprint analytics dashboard. Helps individuals and businesses visualize and reduce their environmental impact through interactive data visualization.",
    stack: ["React", "D3.js", "Express", "MongoDB"],
    link: "#",
    github: "#",
    imagePlaceholder: "ET",
    color: "from-orange-500/20 to-amber-500/20"
  }
];

export function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section id="projects" className="py-24 md:py-32 bg-card/30 relative">
      <div className="container px-6 md:px-12 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest">02. Selected Work</h2>
          <div className="h-[1px] flex-grow max-w-[200px] bg-border"></div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {projects.map((project, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="group relative flex flex-col justify-between h-full p-6 sm:p-8 rounded-2xl glass-panel hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl -z-10 pointer-events-none" />
              
              <div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-mono font-bold text-lg mb-6 bg-gradient-to-br ${project.color} text-foreground/80`}>
                  {project.imagePlaceholder}
                </div>
                
                <h3 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2 group-hover:text-primary transition-colors">
                  {project.title}
                  <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <ul className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map(tech => (
                    <li key={tech} className="text-xs font-mono text-primary/80 bg-primary/5 px-2 py-1 rounded-md border border-primary/10">
                      {tech}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-3">
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground" asChild>
                    <a href={project.github} aria-label="GitHub Repository" target="_blank" rel="noreferrer">
                      <Github className="w-4 h-4" />
                    </a>
                  </Button>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground" asChild>
                    <a href={project.link} aria-label="Live Demo" target="_blank" rel="noreferrer">
                      <Link2 className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
