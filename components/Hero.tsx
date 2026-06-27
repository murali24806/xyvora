"use client";

import { PixelHero } from "@/components/ui/pixel-perfect-hero";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "100+", label: "Designs Created" },
  { value: "2+", label: "Years Experience" },
];

export default function Hero() {
  return (
    <section id="home" className="relative flex flex-col items-center">
      <div className="w-full">
        <PixelHero
          word1="Smart Creative Solutions For"
          word2="Your Brand"
          description="XyvorA is a premier creative freelance agency. We turn your ideas into striking visuals and high-converting websites that drive real business growth."
          primaryCta="Get a Quote"
          primaryCtaMobile="Quote"
          secondaryCta="View Our Work"
          secondaryCtaMobile="Portfolio"
          onPrimaryClick={() => {
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
          }}
          onSecondaryClick={() => {
            document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
          }}
          githubUrl="#portfolio"
          stats={stats}
        />
      </div>
    </section>
  );
}

