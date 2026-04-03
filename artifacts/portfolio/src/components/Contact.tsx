import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { GlowButton } from "@/components/GlowButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useContent } from "@/context/ContentContext";

export function Contact() {
  const { toast } = useToast();
  const { content } = useContent();
  const { identity } = content;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Message sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
      });
      (e.target as HTMLFormElement).reset();
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 md:py-32 bg-card/15 dark:bg-card/8 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/6 dark:bg-primary/8 blur-[130px] rounded-full" />
      </div>

      <div className="container px-6 md:px-12 mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-border" />
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest">04. What's Next?</h2>
            <div className="h-[1px] w-12 bg-border" />
          </div>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
            Get In Touch
          </h3>
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            Currently open for new opportunities. Whether you have a question, a project idea,
            or just want to say hi, my inbox is always open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          {/* Info cards */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {[
              {
                Icon: Mail,
                title: "Email",
                content: (
                  <a href="mailto:alex.chen@dev.io" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {identity.email}
                  </a>
                ),
              },
              {
                Icon: MapPin,
                title: "Location",
                content: (
                  <p className="text-muted-foreground text-sm">
                    {identity.location}<br />
                    {identity.availableRemote && (
                      <span className="text-primary/70">Available for remote</span>
                    )}
                  </p>
                ),
              },
            ].map(({ Icon, title, content }) => (
              <motion.div
                key={title}
                whileHover={{ y: -2 }}
                className="flex items-start gap-4 p-5 rounded-2xl border border-border/60 bg-card/70 dark:bg-card/50 backdrop-blur-sm hover:border-primary/30 dark:hover:shadow-[0_0_20px_hsl(var(--primary)/0.08)] transition-all duration-300"
              >
                <div className="bg-primary/10 dark:bg-primary/15 p-3 rounded-xl text-primary dark:drop-shadow-[0_0_6px_hsl(var(--primary)/0.4)] shrink-0">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-foreground font-semibold mb-1 text-sm">{title}</h4>
                  {content}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-7 sm:p-9 rounded-3xl border border-border/60 bg-card/70 dark:bg-card/50 backdrop-blur-sm dark:hover:shadow-[0_0_40px_hsl(var(--primary)/0.06)] transition-shadow duration-500"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                  <Input
                    id="name"
                    required
                    placeholder="John Doe"
                    className="bg-background/60 dark:bg-background/40 border-border/60 focus:border-primary/60 dark:focus:shadow-[0_0_12px_hsl(var(--primary)/0.2)] transition-shadow"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <Input
                    id="email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="bg-background/60 dark:bg-background/40 border-border/60 focus:border-primary/60 dark:focus:shadow-[0_0_12px_hsl(var(--primary)/0.2)] transition-shadow"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                <Input
                  id="subject"
                  required
                  placeholder="Project Inquiry"
                  className="bg-background/60 dark:bg-background/40 border-border/60 focus:border-primary/60 dark:focus:shadow-[0_0_12px_hsl(var(--primary)/0.2)] transition-shadow"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <Textarea
                  id="message"
                  required
                  placeholder="Tell me about your project..."
                  className="min-h-[140px] resize-none bg-background/60 dark:bg-background/40 border-border/60 focus:border-primary/60 dark:focus:shadow-[0_0_12px_hsl(var(--primary)/0.2)] transition-shadow"
                />
              </div>

              <GlowButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </GlowButton>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
