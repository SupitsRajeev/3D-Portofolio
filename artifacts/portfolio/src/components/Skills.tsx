import { motion } from "framer-motion";

const skills = [
  {
    category: "Languages",
    items: ["JavaScript", "TypeScript", "Python", "HTML/CSS", "SQL", "GraphQL"]
  },
  {
    category: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js", "Redux"]
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "REST APIs"]
  },
  {
    category: "DevOps & Tools",
    items: ["AWS", "Docker", "Git", "CI/CD", "Vercel", "Figma"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-1/3 h-[600px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container px-6 md:px-12 mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest">03. Technical Arsenal</h2>
          <div className="h-[1px] flex-grow max-w-[200px] bg-border"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="space-y-4"
            >
              <h3 className="text-xl font-medium text-foreground tracking-tight">{skillGroup.category}</h3>
              <div className="flex flex-wrap gap-3">
                {skillGroup.items.map(item => (
                  <div 
                    key={item} 
                    className="px-4 py-2 bg-card border border-border/50 rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors shadow-sm"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
