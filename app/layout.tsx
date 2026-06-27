import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.xyvora.co.in'),
  title: "XyvorA | Smart Creative Solutions & Freelance Agency",
  description: "XyvorA is a creative services freelance agency providing complete brand growth through smart creative solutions, web design, and digital marketing.",
  keywords: ["XyvorA", "smart creative solutions", "freelance agency", "web design", "digital marketing", "creative services", "brand growth", "UI/UX design", "web development"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-background text-foreground antialiased`}>
        {children}
        <GoogleAnalytics gaId="G-6Z2J40B37H" />
      </body>
    </html>
  );
}
