"use client";

import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

const TESTIMONIALS_DATA = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Full Stack Developer & Founder",
    company: "TechFlow",
    content:
      "XyvorA completely transformed our brand and web presence. Their attention to design details, performance speed, and frictionless user flows saved us weeks of engineering time. Worth every single penny!",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Sarah Miller",
    role: "Creative Director",
    company: "DesignHub",
    content:
      "I've worked with many creative agencies, but XyvorA stands out for their relentless precision. The 9:16 motion ads and branding kit they delivered spiked our social conversions immediately.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Michael Chen",
    role: "Product Lead",
    company: "InnovateLabs",
    content:
      "Our team launched our mobile application and landing page in record time thanks to XyvorA. Everything from architecture, UI wireframes, and cinematic visuals was top-tier quality.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 4,
    name: "Elena Rodriguez",
    role: "Head of Marketing",
    company: "EcoStyle",
    content:
      "Fast, proactive, and exceptionally skilled. XyvorA took our raw brand concepts and created an unmistakable identity and press-ready collateral that our customers love.",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
  },
];

const TRUSTED_BRANDS = ["Google", "Microsoft", "Airbnb", "Spotify", "Netflix"];

export default function Testimonials() {
  return (
    <div id="testimonials" className="w-full bg-[#f7f5f0] relative overflow-hidden border-t border-black/5">
      <AnimatedTestimonials
        title="Loved by Founders and Growing Brands"
        subtitle="Don't just take our word for it. Here is how XyvorA elevates businesses with high-converting web apps, branding, and smart creative media."
        badgeText="Client Testimonials"
        testimonials={TESTIMONIALS_DATA}
        trustedCompanies={TRUSTED_BRANDS}
        trustedCompaniesTitle="Trusted by innovators and companies worldwide"
        className="bg-transparent"
      />
    </div>
  );
}
