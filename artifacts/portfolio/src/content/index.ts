import {
  Code, Monitor, Server, Settings, Database, Globe, Terminal, Cpu, Wrench,
  Brain, Layers2, Leaf, Rocket, Star, Zap, Package, Cloud,
  Compass, Layers, Code2, Sparkles, BookOpen, Music,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Color schemes ────────────────────────────────────────────────────────────
// All Tailwind classes must be statically present here so the purger keeps them.
export type ColorScheme = "violet" | "emerald" | "orange" | "cyan" | "rose" | "blue" | "amber";

export const COLOR_SCHEMES: Record<
  ColorScheme,
  { accentFrom: string; accentTo: string; glow: string; skillColor: string; skillBg: string }
> = {
  violet:  { accentFrom: "from-violet-500",  accentTo: "to-purple-600",  glow: "group-hover:shadow-violet-500/20",  skillColor: "text-violet-400",  skillBg: "bg-violet-500/10"  },
  emerald: { accentFrom: "from-emerald-500", accentTo: "to-cyan-500",    glow: "group-hover:shadow-emerald-500/20", skillColor: "text-emerald-400", skillBg: "bg-emerald-500/10" },
  orange:  { accentFrom: "from-orange-500",  accentTo: "to-amber-400",   glow: "group-hover:shadow-orange-500/20",  skillColor: "text-orange-400",  skillBg: "bg-orange-500/10"  },
  cyan:    { accentFrom: "from-cyan-500",    accentTo: "to-blue-600",    glow: "group-hover:shadow-cyan-500/20",    skillColor: "text-cyan-400",    skillBg: "bg-cyan-500/10"    },
  rose:    { accentFrom: "from-rose-500",    accentTo: "to-pink-600",    glow: "group-hover:shadow-rose-500/20",    skillColor: "text-rose-400",    skillBg: "bg-rose-500/10"    },
  blue:    { accentFrom: "from-blue-500",    accentTo: "to-indigo-600",  glow: "group-hover:shadow-blue-500/20",    skillColor: "text-blue-400",    skillBg: "bg-blue-500/10"    },
  amber:   { accentFrom: "from-amber-500",   accentTo: "to-yellow-400",  glow: "group-hover:shadow-amber-500/20",   skillColor: "text-amber-400",   skillBg: "bg-amber-500/10"   },
};

// ─── Icon registries ──────────────────────────────────────────────────────────
export const SKILL_ICONS: Record<string, LucideIcon> = {
  Code, Monitor, Server, Settings, Database, Globe, Terminal, Cpu, Wrench,
  Brain, Layers2, Leaf, Rocket, Star, Zap, Package, Cloud,
  Compass, Layers, Code2, Sparkles, BookOpen, Music,
};

export const PROJECT_ICONS: Record<string, LucideIcon> = {
  Brain, Layers2, Leaf, Rocket, Star, Zap, Package, Cloud, Code2, Globe, Database, Monitor,
};

export const HIGHLIGHT_ICONS: Record<string, LucideIcon> = {
  Compass, Layers, Code2, Sparkles, Wrench, BookOpen, Settings, Zap, Star, Rocket, Globe,
};

// ─── Types ────────────────────────────────────────────────────────────────────
export interface Identity {
  name: string;
  /** Shown in the nav logo (first name only) */
  firstName: string;
  title: string;
  tagline: string;
  availableForWork: boolean;
  email: string;
  location: string;
  availableRemote: boolean;
}

export type SocialPlatform = "GitHub" | "LinkedIn" | "Twitter";

export interface Social {
  platform: SocialPlatform;
  href: string;
}

export interface Project {
  title: string;
  description: string;
  /** Comma-separated list of technologies */
  stack: string[];
  github: string;
  link: string;
  /** Key in PROJECT_ICONS */
  icon: string;
  colorScheme: ColorScheme;
}

export interface SkillGroup {
  category: string;
  /** Key in SKILL_ICONS */
  icon: string;
  items: string[];
  colorScheme: ColorScheme;
}

export interface AboutHighlight {
  /** Key in HIGHLIGHT_ICONS */
  icon: string;
  title: string;
  desc: string;
}

export interface PortfolioContent {
  identity: Identity;
  /** Each string is one bio paragraph */
  bio: string[];
  socials: Social[];
  projects: Project[];
  skills: SkillGroup[];
  aboutHighlights: AboutHighlight[];
}

// ─── Default content ──────────────────────────────────────────────────────────
export const defaultContent: PortfolioContent = {
  identity: {
    name: "Alex Chen",
    firstName: "Alex",
    title: "Full-Stack Developer & Creative Technologist",
    tagline: "I build things for the web that are fast, beautiful, and intentional.",
    availableForWork: true,
    email: "alex.chen@dev.io",
    location: "San Francisco, CA",
    availableRemote: true,
  },
  bio: [
    "I build things for the web that are fast, beautiful, and intentional. With 5+ years of experience spanning React, Node.js, and cloud infrastructure, I love turning complex problems into elegant solutions.",
    "My approach to development is rooted in design thinking. A great user experience isn't just about how it looks — it's about how it feels and functions. The architecture should be as clean as the interface.",
    "When not coding, I'm hiking trails or experimenting with generative art.",
  ],
  socials: [
    { platform: "GitHub",   href: "https://github.com" },
    { platform: "LinkedIn", href: "https://linkedin.com" },
    { platform: "Twitter",  href: "https://twitter.com" },
  ],
  aboutHighlights: [
    { icon: "Layers",   title: "Architecture", desc: "Scalable, maintainable systems built for the long term." },
    { icon: "Compass",  title: "Exploration",  desc: "Always learning, testing new paradigms and tools." },
    { icon: "Code2",    title: "Clean Code",   desc: "Readable, well-structured code is a first-class concern." },
    { icon: "Sparkles", title: "Craft",        desc: "Details matter — from pixel-perfect UI to polished UX." },
  ],
  projects: [
    {
      title: "NeuralCanvas",
      description: "AI-powered generative art platform. A creative tool letting artists generate and iterate on artworks using neural style transfer.",
      stack: ["React", "Python", "TensorFlow", "AWS"],
      link: "#",
      github: "#",
      icon: "Brain",
      colorScheme: "violet",
    },
    {
      title: "FlowDesk",
      description: "Real-time collaborative task management. Built for remote teams who need live syncing and intuitive workflows without visual clutter.",
      stack: ["Next.js", "WebSocket", "PostgreSQL", "Redis"],
      link: "#",
      github: "#",
      icon: "Layers2",
      colorScheme: "emerald",
    },
    {
      title: "EcoTrack",
      description: "Carbon footprint analytics dashboard. Helps individuals and businesses visualize and reduce their environmental impact through interactive data visualization.",
      stack: ["React", "D3.js", "Express", "MongoDB"],
      link: "#",
      github: "#",
      icon: "Leaf",
      colorScheme: "orange",
    },
  ],
  skills: [
    { category: "Languages",      icon: "Code",     items: ["JavaScript", "TypeScript", "Python", "HTML/CSS", "SQL", "GraphQL"], colorScheme: "violet"  },
    { category: "Frontend",       icon: "Monitor",  items: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Three.js", "Redux"],  colorScheme: "cyan"    },
    { category: "Backend",        icon: "Server",   items: ["Node.js", "Express", "PostgreSQL", "MongoDB", "Redis", "REST APIs"],   colorScheme: "emerald" },
    { category: "DevOps & Tools", icon: "Settings", items: ["AWS", "Docker", "Git", "CI/CD", "Vercel", "Figma"],              colorScheme: "orange"  },
  ],
};
