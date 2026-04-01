import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
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
    <section id="contact" className="py-24 md:py-32 bg-card/20 relative">
      <div className="container px-6 md:px-12 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 flex items-center justify-center flex-col text-center"
        >
          <div className="mb-4 flex items-center gap-4">
            <div className="h-[1px] w-12 bg-border"></div>
            <h2 className="text-sm font-mono text-primary uppercase tracking-widest">04. What's Next?</h2>
            <div className="h-[1px] w-12 bg-border"></div>
          </div>
          <h3 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Get In Touch</h3>
          <p className="text-muted-foreground max-w-xl">
            Currently open for new opportunities. Whether you have a question, a project idea, 
            or just want to say hi, my inbox is open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_2fr] gap-12 items-start">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="glass-panel p-6 rounded-2xl border border-border/50">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-foreground font-medium mb-1">Email</h4>
                  <a href="mailto:alex.chen@dev.io" className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    alex.chen@dev.io
                  </a>
                </div>
              </div>
            </div>
            
            <div className="glass-panel p-6 rounded-2xl border border-border/50">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-xl text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-foreground font-medium mb-1">Location</h4>
                  <p className="text-muted-foreground text-sm">
                    San Francisco, CA<br/>
                    (Available for remote)
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6 glass-panel p-8 rounded-3xl border border-border/50">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                  <Input id="name" required placeholder="John Doe" className="bg-background/50" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                  <Input id="email" type="email" required placeholder="john@example.com" className="bg-background/50" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                <Input id="subject" required placeholder="Project Inquiry" className="bg-background/50" />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                <Textarea 
                  id="message" 
                  required 
                  placeholder="Tell me about your project..." 
                  className="min-h-[150px] resize-none bg-background/50" 
                />
              </div>
              
              <Button type="submit" size="lg" className="w-full sm:w-auto px-8 h-12" disabled={isSubmitting}>
                {isSubmitting ? (
                  <span className="flex items-center gap-2">Sending...</span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message <Send className="w-4 h-4 ml-1" />
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
