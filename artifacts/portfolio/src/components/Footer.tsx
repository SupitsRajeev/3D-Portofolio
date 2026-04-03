import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";
import { useContent } from "@/context/ContentContext";

const SOCIAL_ICONS = { GitHub: Github, LinkedIn: Linkedin, Twitter };

export function Footer() {
  const { content } = useContent();
  const { identity, socials } = content;
  return (
    <footer className="py-10 bg-background border-t border-border/50 relative overflow-hidden">
      {/* Subtle top glow in dark mode */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent dark:via-primary/50" />

      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <span className="text-foreground font-medium">{identity.name}</span>
          </p>
          <p className="text-xs text-muted-foreground/60 flex items-center gap-1.5">
            Built with React, Vite & Three.js
            <Heart className="w-3 h-3 text-primary/60" />
          </p>
        </div>

        <div className="flex items-center gap-3">
          {socials.map(({ href, platform }) => {
            const Icon = SOCIAL_ICONS[platform as keyof typeof SOCIAL_ICONS];
            if (!Icon) return null;
            return (
              <motion.a
                key={platform}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={platform}
                className="relative flex items-center justify-center w-10 h-10 rounded-full border border-border/60 bg-card/60 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/8 transition-colors duration-200 group overflow-hidden"
                whileHover={{ y: -3, scale: 1.1 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Glow pulse on hover */}
                <span className="absolute inset-0 rounded-full bg-primary/0 group-hover:bg-primary/10 group-hover:shadow-[0_0_16px_4px_hsl(var(--primary)/0.25)] transition-all duration-300" />
                <Icon className="h-4 w-4 relative z-10 group-hover:drop-shadow-[0_0_6px_hsl(var(--primary)/0.8)] transition-all duration-200" />
              </motion.a>
            );
          })}
          <a
            href="/admin"
            aria-label="Content Manager"
            className="flex items-center justify-center w-10 h-10 rounded-full border border-border/30 text-muted-foreground/30 hover:text-muted-foreground hover:border-border/60 transition-colors duration-200 text-xs font-mono"
            title="Edit content"
          >
            ✎
          </a>
        </div>
      </div>
    </footer>
  );
}
