import { useState, useEffect } from "react";
import { useTheme } from "./theme-provider";
import { Moon, Sun, Menu, X, User, FolderOpen, Cpu, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "About",    href: "#about",    Icon: User },
  { name: "Projects", href: "#projects", Icon: FolderOpen },
  { name: "Skills",   href: "#skills",   Icon: Cpu },
  { name: "Contact",  href: "#contact",  Icon: Mail },
];

export function Navigation() {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
          Alex
          <span className="text-primary group-hover:drop-shadow-[0_0_8px_hsl(var(--primary)/0.8)] transition-all duration-300">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-1 text-sm font-medium">
            {navLinks.map(({ name, href, Icon }) => (
              <li key={name}>
                <a
                  href={href}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 dark:hover:text-primary dark:hover:[&_svg]:drop-shadow-[0_0_6px_hsl(var(--primary)/0.7)] transition-all duration-200 group"
                >
                  <Icon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-all duration-200" />
                  {name}
                </a>
              </li>
            ))}
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
              {navLinks.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    className="flex items-center gap-3 px-8 py-3 text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
