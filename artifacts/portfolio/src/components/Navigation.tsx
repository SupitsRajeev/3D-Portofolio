import { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { Moon, Sun, Menu, X, User, FolderOpen, Cpu, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/context/ContentContext";

const navLinks = [
  { name: "About",    href: "#about",    Icon: User },
  { name: "Projects", href: "#projects", Icon: FolderOpen },
  { name: "Skills",   href: "#skills",   Icon: Cpu },
  { name: "Contact",  href: "#contact",  Icon: Mail },
];

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const { content } = useContent();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track which section is in view for active highlight
  useEffect(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent",
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-border/40 shadow-lg shadow-black/10 py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <a
          href="#home"
          className="text-xl font-bold tracking-tight text-foreground hover:text-primary transition-colors duration-300 group"
          aria-label="Home"
        >
          {content.identity.firstName}
          <span className="text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)] transition-all duration-300">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {navLinks.map(({ name, href, Icon }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <li key={name}>
                  <a
                    href={href}
                    className={cn(
                      "relative flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 group",
                      isActive
                        ? "text-primary bg-primary/8"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {/* Icon badge */}
                    <span
                      className={cn(
                        "flex items-center justify-center w-6 h-6 rounded-md transition-all duration-200",
                        isActive
                          ? "bg-primary/15 text-primary drop-shadow-[0_0_6px_hsl(var(--primary)/0.7)]"
                          : "group-hover:bg-primary/10 group-hover:text-primary group-hover:drop-shadow-[0_0_5px_hsl(var(--primary)/0.5)]"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {name}
                    {/* Active underline */}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute bottom-0.5 left-3 right-3 h-[2px] rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full hover:bg-muted/50 dark:hover:text-primary dark:hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border/50 py-2 shadow-2xl"
          >
            <ul className="flex flex-col py-4">
              {navLinks.map(({ name, href, Icon }) => {
                const isActive = activeSection === href.slice(1);
                return (
                  <li key={name}>
                    <a
                      href={href}
                      className={cn(
                        "flex items-center gap-3 px-8 py-3 transition-colors",
                        isActive
                          ? "text-primary bg-primary/5"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span
                        className={cn(
                          "flex items-center justify-center w-7 h-7 rounded-lg transition-all duration-200",
                          isActive ? "bg-primary/15 text-primary" : "bg-muted/50"
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="font-medium">{name}</span>
                      {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
