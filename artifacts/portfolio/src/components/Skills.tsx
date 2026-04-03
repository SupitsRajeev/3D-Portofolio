"use client";

import { motion } from "framer-motion";
import { FloatingShapes3D } from "./FloatingShapes3D";
import { defaultContent, COLOR_SCHEMES, SKILL_ICONS } from "@/content";
import { FancyIconBox } from "./FancyIconBox";
import {
  SiJavascript, SiTypescript, SiPython, SiHtml5, SiGraphql,
  SiReact, SiNextdotjs, SiTailwindcss, SiRedux, SiVuedotjs, SiSass, SiVite, SiStorybook,
  SiNodedotjs, SiPostgresql, SiMongodb, SiRedis, SiPrisma, SiMysql,
  SiDocker, SiGit, SiVercel, SiFigma,
  SiKubernetes, SiGithubactions, SiLinux, SiJest, SiNginx,
  SiCypress, SiEslint, SiPrettier,
  SiGo, SiRust, SiGnubash, SiThreedotjs, SiFramer, SiWebpack, SiVitest,
} from "react-icons/si";
import type { IconType } from "react-icons";

const TECH_ICONS_SI: Record<string, IconType> = {
  "JavaScript":             SiJavascript,
  "TypeScript":             SiTypescript,
  "Python":                 SiPython,
  "HTML/CSS":               SiHtml5,
  "GraphQL":                SiGraphql,
  "Go":                     SiGo,
  "Rust":                   SiRust,
  "Bash":                   SiGnubash,
  "React":                  SiReact,
  "Next.js":                SiNextdotjs,
  "Tailwind CSS":           SiTailwindcss,
  "Redux":                  SiRedux,
  "Vue.js":                 SiVuedotjs,
  "SASS/SCSS":              SiSass,
  "Vite":                   SiVite,
  "Storybook":              SiStorybook,
  "Three.js":               SiThreedotjs,
  "Framer Motion":          SiFramer,
  "Webpack":                SiWebpack,
  "Node.js":                SiNodedotjs,
  "PostgreSQL":             SiPostgresql,
  "MongoDB":                SiMongodb,
  "Redis":                  SiRedis,
  "Prisma":                 SiPrisma,
  "MySQL":                  SiMysql,
  "Docker":                 SiDocker,
  "Git":                    SiGit,
  "Vercel":                 SiVercel,
  "Figma":                  SiFigma,
  "Kubernetes":             SiKubernetes,
  "GitHub Actions":         SiGithubactions,
  "Linux":                  SiLinux,
  "Nginx":                  SiNginx,
  "Jest":                   SiJest,
  "Vitest":                 SiVitest,
  "Cypress":                SiCypress,
  "ESLint":                 SiEslint,
  "Prettier":               SiPrettier,
};

export function Skills() {
  const { skills } = defaultContent;
  return (
    <section id="skills" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* 3D floating background */}
      <FloatingShapes3D variant="skills" className="opacity-30 dark:opacity-40" />

      {/* Nebula blobs */}
      <div className="absolute top-1/4 left-0 w-80 h-80 bg-primary/8 dark:bg-primary/12 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-cyan-500/6 dark:bg-cyan-500/10 blur-[110px] rounded-full pointer-events-none" />

      <div className="container px-6 md:px-12 mx-auto max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center gap-4"
        >
          <h2 className="text-sm font-mono text-primary uppercase tracking-widest">03. Technical Arsenal</h2>
          <div className="h-[1px] flex-grow max-w-[200px] bg-border" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 md:gap-14">
          {skills.map((skillGroup, index) => {
            const scheme = COLOR_SCHEMES[skillGroup.colorScheme];
            const Icon = SKILL_ICONS[skillGroup.icon] ?? SKILL_ICONS["Code"];
            return (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="space-y-4 backdrop-blur-sm group/card p-6 rounded-2xl border border-border/40 bg-card/40 hover:border-border/70 hover:bg-card/60 transition-all duration-300"
            >
              {/* Category header */}
              <div className="flex items-center gap-4 mb-6">
                <FancyIconBox
                  icon={Icon}
                  color={scheme.skillColor}
                  bg={scheme.skillBg}
                  variant="skill"
                  size="md"
                  pulse
                />
                <div>
                  <h3 className="text-lg font-semibold text-foreground tracking-tight">{skillGroup.category}</h3>
                  <p className={`text-xs font-mono ${scheme.skillColor} opacity-70 mt-0.5`}>{skillGroup.items.length} technologies</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {skillGroup.items.map((item, i) => {
                  const SiIcon = TECH_ICONS_SI[item];
                  return (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.08 + i * 0.04 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="relative flex items-center gap-1.5 px-4 py-2 bg-card/80 dark:bg-card/60 backdrop-blur-sm border border-border/60 rounded-lg text-sm text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 shadow-sm cursor-default font-medium overflow-hidden group/tag"
                  >
                    {/* Hover shine */}
                    <motion.span
                      className="absolute inset-0 pointer-events-none"
                      initial={{ x: "-100%", opacity: 0 }}
                      whileHover={{ x: "120%", opacity: 1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <span className="block w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12" />
                    </motion.span>
                    {SiIcon && <SiIcon className="relative shrink-0 w-3.5 h-3.5 opacity-70" />}
                    <span className="relative">{item}</span>
                  </motion.div>
                  );
                })}
              </div>
            </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
