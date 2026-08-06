"use client";

import React, { useState } from "react";
import PhoneMockupBasic from "@/components/ui/phone-mockups-1";
import SocialCards from "@/components/ui/card-fan-carousel";
import { FadeIn } from "@/components/ui/motion-container";
import { Smartphone, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";


const PORTFOLIO_PROJECTS = [
  {
    id: "1",
    title: "FinTech Mobile Platform",
    category: "Web & App",
    categoryKey: "app",
    imgUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    client: "Apex Capital",
    description: "Complete UI/UX redesign and mobile banking application built with Next.js & React Native.",
    results: "+140% User Retention",
  },
  {
    id: "2",
    title: "Eco-Cosmetics Identity",
    category: "Brand Identity",
    categoryKey: "brand",
    imgUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    client: "Lumina Organics",
    description: "Sustainable brand visual identity, custom logomark, eco packaging design, and e-commerce web platform.",
    results: "3.2x Revenue Growth",
  },
  {
    id: "3",
    title: "Urban Streetwear Campaign",
    category: "Motion & Ads",
    categoryKey: "motion",
    imgUrl: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    client: "KINETIC Apparel",
    description: "High-energy 3D motion graphics campaign, Instagram reel ads, and viral promotional posters.",
    results: "1.2M Organic Impressions",
  },
  {
    id: "4",
    title: "Music Festival Digital Experience",
    category: "Web & App",
    categoryKey: "app",
    imgUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    client: "Pulse Audio Fest",
    description: "Live festival lineup app, interactive schedule viewer, and ticket booking integration.",
    results: "45K Active Attendees",
  },
  {
    id: "5",
    title: "Health & Wellness Ecosystem",
    category: "UI/UX",
    categoryKey: "uiux",
    imgUrl: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    client: "Aura Health",
    description: "User-centered mental health dashboard, workout tracking, and biometrics data visualization.",
    results: "4.9★ App Store Rating",
  },
  {
    id: "6",
    title: "Artisanal Cafe Identity & Web",
    category: "Brand Identity",
    categoryKey: "brand",
    imgUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    client: "Roast & Craft",
    description: "Minimalist coffee shop branding, store signage, menu design, and online order web portal.",
    results: "+85% Local Traffic",
  },
];

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<"mockup" | "fan">("mockup");
  const [selectedProject, setSelectedProject] = useState<typeof PORTFOLIO_PROJECTS[0] | null>(null);

  return (
    <section id="portfolio" className="py-24 md:py-32 relative overflow-hidden bg-background">
      {/* Radial Background Light Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <FadeIn direction="up">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Selected Studio Works</span>
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
              Crafting Digital <span className="text-gradient-cyan">Masterpieces</span>
            </h2>
            <p className="text-gray-400 mt-3 text-sm sm:text-base max-w-xl mx-auto">
              Explore our mobile applications, UI/UX systems, brand identity campaigns, and high-converting visual assets.
            </p>

            {/* View Mode Toggle Buttons */}
            <div className="flex items-center justify-center gap-2 mt-8 p-1.5 bg-charcoal-900/90 backdrop-blur-md rounded-full border border-white/10 w-fit mx-auto shadow-xl">
              <Button
                variant={activeTab === "mockup" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("mockup")}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "mockup" ? "shadow-md bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <Smartphone className="h-3.5 w-3.5 mr-1.5" />
                Phone Stage
              </Button>
              <Button
                variant={activeTab === "fan" ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab("fan")}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  activeTab === "fan" ? "shadow-md bg-indigo-600 text-white" : "text-gray-400 hover:text-white"
                }`}
              >
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Brand Fan
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Portfolio Content */}
        <div className="w-full flex justify-center items-center min-h-[500px] mt-4">
          {activeTab === "mockup" && (
            <FadeIn direction="up" className="w-full">
              <PhoneMockupBasic />
            </FadeIn>
          )}

          {activeTab === "fan" && (
            <FadeIn direction="up" className="w-full">
              <div className="flex justify-center w-full min-h-[60vh] items-center">
                <SocialCards cards={PORTFOLIO_PROJECTS.map(p => ({ imgUrl: p.imgUrl, alt: p.title }))} />
              </div>
            </FadeIn>
          )}
        </div>
      </div>

      {/* Project Detail Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/85 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-charcoal-900 border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 border border-white/20 text-gray-300 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative h-72 w-full">
                <img src={selectedProject.imgUrl} alt={selectedProject.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl font-extrabold text-white mt-2">
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              <div className="p-6 md:p-8 space-y-6">
                <div>
                  <h4 className="text-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Project Overview</h4>
                  <p className="text-gray-300 text-sm md:text-base leading-relaxed">{selectedProject.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-white/10">
                  <div>
                    <span className="text-xs text-gray-400 block">Client</span>
                    <span className="text-sm font-bold text-white">{selectedProject.client}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block">Verified Result</span>
                    <span className="text-sm font-bold text-emerald-400">{selectedProject.results}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => {
                      setSelectedProject(null);
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-primary to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all text-center"
                  >
                    Request Similar Project
                  </button>
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="py-3 px-5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-sm font-medium transition-colors"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

