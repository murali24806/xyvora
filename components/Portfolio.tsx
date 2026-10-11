"use client";
import { useState, useEffect } from "react";
import { ProjectShowcase } from "@/components/ui/project-showcase";

const DEFAULT_PROJECTS = [
  {
    name: "FinTech Banking Portal & Mobile App",
    quote:
      "A complete end-to-end digital banking transformation featuring biometric authentication, real-time portfolio analytics, and high-conversion onboarding flows with lightning-fast load times.",
    designation: "Website Designing & App Development",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    link: "https://xyvora.com",
  },
  {
    name: "Aura Cosmetics Brand Identity",
    quote:
      "Comprehensive luxury rebrand encompassing custom golden-ratio logo architecture, bespoke typography, eco-friendly product packaging, and a press-ready 300 DPI collateral system.",
    designation: "Logo Designing & Brand Strategy",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1400&q=80",
    link: "https://xyvora.com",
  },
  {
    name: "HyperMotion 9:16 Viral Ad Campaign",
    quote:
      "High-energy kinetic motion design and commercial video shoots optimized for TikTok and Meta feeds, driving a 3.4x spike in CTR and over 1.2M organic impressions.",
    designation: "Ad Shooting & Motion Ads",
    src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1400&q=80",
    link: "https://xyvora.com",
  },
  {
    name: "SaaS Analytics & Cloud Control Center",
    quote:
      "Enterprise design system and cross-platform dashboard built with Next.js and Tailwind CSS, simplifying multi-tenant data visualization and user management.",
    designation: "UI/UX Design & Web Application",
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
    link: "https://xyvora.com",
  },
  {
    name: "Urban Horizon Key Art & Festival Posters",
    quote:
      "Bold, scroll-stopping graphic designs and outdoor billboard mockups combining contemporary brutalist layout typography with vivid duotone illustration.",
    designation: "Poster Designing & Visual Arts",
    src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=80",
    link: "https://xyvora.com",
  },
];

export default function Portfolio() {
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/portfolio');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            const mapped = data.map((item: { title?: string; name?: string; description?: string; quote?: string; category?: string; designation?: string; imageUrl?: string; src?: string; link?: string }) => ({
              name: item.title || item.name || "Client Showcase",
              quote: item.description || item.quote || "Custom engineered solution delivered by XyvorA.",
              designation: item.category || item.designation || "Creative & Development",
              src: item.imageUrl || item.src || "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=80",
              link: item.link || "https://xyvora.com",
            }));
            setProjects(mapped);
          }
        }
      } catch (err) {
        console.error("Failed to fetch custom portfolio items:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const openInNewTab = (link: string) => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="portfolio" className="py-20 sm:py-24 relative overflow-hidden bg-[#f7f5f0] text-[#1c1917] border-t border-black/5">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <span className="text-[#6366f1] font-semibold text-xs sm:text-sm tracking-widest uppercase mb-2 block">
            Featured Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1c1917] tracking-tight">
            Projects We&apos;ve Brought to Life
          </h2>
          <p className="mt-4 text-[#57534e] text-sm sm:text-base max-w-2xl mx-auto">
            From high-conversion websites and mobile applications to cinema ad shoots and complete brand identities.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20 text-[#78716c] animate-pulse">
            Loading showcase...
          </div>
        ) : (
          <div className="w-full">
            <ProjectShowcase
              testimonials={projects}
              autoplay={true}
              colors={{
                name: "#1c1917",
                position: "#4f46e5",
                testimony: "#44403c",
              }}
              fontSizes={{
                name: "clamp(1.5rem, 2vw, 2.25rem)",
                position: "0.95rem",
                testimony: "clamp(1rem, 1.2vw, 1.15rem)",
              }}
              spacing={{
                top: "4",
                bottom: "4",
                lineHeight: "1.65",
                nameTop: "0",
                nameBottom: "0.25em",
                positionTop: "0",
                positionBottom: "1.25em",
                testimonyTop: "0.5em",
                testimonyBottom: "1.5em",
              }}
              outlineColor="#e7e5e4"
              hoverOutlineColor="#6366f1"
              halomotButtonGradient="linear-gradient(to right, #6366f1, #a855f7)"
              halomotButtonBackground="#1c1917"
              halomotButtonTextColor="#ffffff"
              halomotButtonHoverTextColor="#ffffff"
              halomotButtonOuterBorderRadius="10px"
              halomotButtonInnerBorderRadius="9px"
              buttonInscriptions={{
                previousButton: "Previous",
                nextButton: "Next",
                openWebAppButton: "Explore Project",
              }}
              onItemClick={openInNewTab}
            />
          </div>
        )}
      </div>
    </section>
  );
}
