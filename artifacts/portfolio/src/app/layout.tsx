import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  metadataBase: new URL("https://rajeevneupane.dev"),
  title: "Rajeev | Full-Stack Developer & Creative Technologist",
  description:
    "Portfolio of Rajeev Neupane. I build things for the web that are fast, beautiful, and intentional.",
  openGraph: {
    title: "Rajeev | Full-Stack Developer",
    description:
      "Portfolio of Rajeev. I build things for the web that are fast, beautiful, and intentional.",
    type: "website",
    url: "https://rajeevneupane.dev",
    images: [{ url: "/opengraph.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rajeev Neupane | Full-Stack Developer",
    description:
      "Portfolio of Rajeev. I build things for the web that are fast, beautiful, and intentional.",
  },
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          storageKey="portfolio-theme"
          enableSystem={false}
        >
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
