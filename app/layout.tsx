import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Outfit } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/smooth-scroll-provider";

const jakarta = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-sans",
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.xyvora.co.in'),
  title: "XyvorA | Smart Creative Studio & Freelance Agency",
  description: "XyvorA is a premier creative freelance agency transforming brands with pixel-perfect web apps, brand identity, motion visuals, and high-converting design systems.",
  keywords: ["XyvorA", "smart creative solutions", "freelance agency", "web design", "digital marketing", "creative services", "brand growth", "UI/UX design", "web development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${jakarta.variable} ${outfit.variable} font-sans bg-background text-foreground antialiased selection:bg-primary/40 selection:text-white`}>
        <SmoothScrollProvider>
          {children}
          <GoogleAnalytics gaId="G-6Z2J40B37H" />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

