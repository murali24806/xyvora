"use client";

import React, { useState } from "react";
import PhoneMockupBasic from "@/components/ui/phone-mockups-1";
import SocialCards from "@/components/ui/card-fan-carousel";
import { FadeIn } from "@/components/ui/motion-container";
import { Smartphone, Layers, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const DEMO_CARDS = [
  { imgUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "FinTech Platform Rebrand" },
  { imgUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Eco-Friendly Cosmetics" },
  { imgUrl: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Urban Streetwear Campaign" },
  { imgUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Music Festival 2024" },
  { imgUrl: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Health & Wellness App" },
  { imgUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Modern Cafe Identity" },
  { imgUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "UI/UX Design System" },
  { imgUrl: "https://images.unsplash.com/photo-1542744094-24638ea0b3b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Digital Marketing Analytics" },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"mockup" | "fan">("mockup");

  return (
    <section id="portfolio" className="py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Background Decorative Radial Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Interactive Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Our Creative Portfolio
            </h2>
            <p className="text-muted-foreground mt-3 text-sm sm:text-base max-w-xl mx-auto">
              Explore our mobile applications, UI/UX designs, and brand digital experiences crafted with pixel-perfect attention.
            </p>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center justify-center gap-2 mt-8 p-1.5 bg-neutral-900/80 backdrop-blur-md rounded-full border border-neutral-800 w-fit mx-auto shadow-inner">
              <Button
                variant={activeTab === "mockup" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("mockup")}
                className={`rounded-full px-5 py-2 text-xs md:text-sm font-medium transition-all ${
                  activeTab === "mockup" ? "shadow-lg bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Mobile App Showcase
              </Button>
              <Button
                variant={activeTab === "fan" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("fan")}
                className={`rounded-full px-5 py-2 text-xs md:text-sm font-medium transition-all ${
                  activeTab === "fan" ? "shadow-lg bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Layers className="h-4 w-4 mr-2" />
                Brand Gallery
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Portfolio Content */}
        <div className="w-full flex justify-center items-center min-h-[500px]">
          {activeTab === "mockup" ? (
            <FadeIn direction="up" className="w-full">
              <PhoneMockupBasic />
            </FadeIn>
          ) : (
            <FadeIn direction="up" className="w-full">
              <div className="flex justify-center w-full min-h-[60vh] items-center">
                <SocialCards cards={DEMO_CARDS} />
              </div>
            </FadeIn>
          )}
        </div>
      </div>
    </section>
  );
}
