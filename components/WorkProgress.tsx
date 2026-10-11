"use client";

import React from "react";
import HowItWorks, { Step } from "@/components/ui/how-it-works";

const XYVORA_WORK_STEPS: Step[] = [
  {
    title: "Discovery & Strategy",
    description:
      "We unpack your business objectives, audience persona, and tech stack to define an ambitious yet actionable roadmap.",
    colorTheme: "blue",
  },
  {
    title: "UI/UX & Wireframing",
    description:
      "Design systems, interactive mockups, and golden-ratio brand assets designed to maximize engagement and conversion.",
    colorTheme: "purple",
  },
  {
    title: "Engineering & Motion",
    description:
      "Clean, modern code powered by Next.js, combined with cinematic motion ads and high-converting graphic collaterals.",
    colorTheme: "orange",
  },
  {
    title: "Testing & Quality Control",
    description:
      "Cross-device responsiveness, Core Web Vitals performance tuning, and end-to-end user experience audits.",
    colorTheme: "blue",
  },
  {
    title: "Launch & Growth Scaling",
    description:
      "Seamless production deployment with continuous maintenance, analytics integration, and scalable performance.",
    colorTheme: "purple",
  },
];

export default function WorkProgress() {
  return (
    <section id="work-process" className="relative w-full py-16 sm:py-20 bg-[#f7f5f0] text-[#1c1917] border-t border-black/5 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10 mb-8 sm:mb-12 text-center">
        <span className="text-[#6366f1] font-semibold text-xs sm:text-sm tracking-widest uppercase mb-2 block">
          Our Workflow
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1917] tracking-tight">
          How We Bring Ideas to Life
        </h2>
        <p className="mt-4 text-[#57534e] text-sm sm:text-base max-w-2xl mx-auto">
          A seamless, transparent 5-step development and design process structured for maximum velocity and world-class craft.
        </p>
      </div>

      <HowItWorks features={XYVORA_WORK_STEPS} className="bg-transparent" />
    </section>
  );
}
