import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { YandexMetrica } from "@/components/YandexMetrica";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${spaceMono.variable}`}
    >
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
        <YandexMetrica />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
