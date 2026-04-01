import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const socials = [
  { href: "https://github.com", Icon: Github, label: "GitHub" },
  { href: "https://linkedin.com", Icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", Icon: Twitter, label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="py-10 bg-background border-t border-border/50 relative overflow-hidden">
      {/* Subtle top glow in dark mode */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent dark:via-primary/50" />

      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}{" "}
            <span className="text-foreground font-medium">Alex Chen</span>
          </p>
          <p className="text-xs text-muted-foreground/60 flex items-center gap-1.5">
            Built with React, Vite & Three.js
            <Heart className="w-3 h-3 text-primary/60" />
          </p>
        </div>

        <div className="flex items-center gap-4 text-muted-foreground">
          {socials.map(({ href, Icon, label }) => (
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
        </div>
      </div>
    </footer>
  );
}
