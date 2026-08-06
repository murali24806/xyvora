"use client";

import { PixelHero } from "@/components/ui/pixel-perfect-hero";

const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "100+", label: "Designs Created" },
  { value: "99.8%", label: "Client Satisfaction" },
];

export default function Hero() {
  return (
    <section id="home" className="relative flex flex-col items-center overflow-hidden">
      {/* Background Decorative Ambient Radial Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/10 to-cyan-500/20 rounded-full blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="w-full relative z-10">
        <PixelHero
          word1="Smart Creative"
          word2="Solutions"
          description="XyvorA is a premier creative freelance studio. We engineer striking visual brand identities, high-converting web apps, and immersive motion design to accelerate your growth."
          primaryCta="Estimate Project"
          primaryCtaMobile="Estimate"
          secondaryCta="Explore Portfolio"
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


