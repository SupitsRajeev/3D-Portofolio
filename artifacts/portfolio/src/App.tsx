import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router, Route, Switch } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { ContentProvider } from "@/context/ContentContext";

import { Navigation } from "@/components/Navigation";
import { StarField } from "@/components/StarField";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/Projects";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import AdminPage from "@/pages/admin";
import { ThreeDShowcase } from "@/components/ThreeDShowcase";

// Initialize react-query client
const queryClient = new QueryClient();

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground">
      <StarField />
      <Navigation />
      <main className="flex-grow">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="portfolio-theme">
        <ContentProvider>
          <TooltipProvider>
            <Router>
              <Switch>
                <Route path="/admin" component={AdminPage} />
                <Route component={PortfolioPage} />
              </Switch>
            </Router>
            <Toaster />
          </TooltipProvider>
        </ContentProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
