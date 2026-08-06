"use client";

import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee";

const xyvoraTestimonials = [
  {
    author: {
      name: "Sarah Jenkins",
      handle: "CEO @ InnovateTech",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "XyvorA completely transformed our brand identity. The new Next.js web application is stunning, and our conversion rate has more than doubled since launch.",
  },
  {
    author: {
      name: "Marcus Chen",
      handle: "CMO @ Bloom Coffee",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "Their team's attention to detail and kinetic visual design is unmatched. The 3D motion ad campaign they created for us was our highest performing launch ever.",
  },
  {
    author: {
      name: "Elena Rodriguez",
      handle: "Founder @ EcoStyle",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Fast, professional, and incredibly talented. They took our rough app concept and delivered a polished, pixel-perfect design system in record time.",
  },
  {
    author: {
      name: "David Park",
      handle: "Head of Product @ Apex Capital",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "The financial mobile app design system engineered by XyvorA increased our user retention by 140%. Seamless React Native integration!",
  },
  {
    author: {
      name: "Jessica Vance",
      handle: "Creative Lead @ Lumina Organics",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
    },
    text: "Working with XyvorA feels like having an elite design team in-house. Their spatial UI prototypes blew our stakeholders away.",
  }
];

export default function Testimonials() {
  return (
    <div id="testimonials">
      <TestimonialsSection
        title="Trusted by Ambitious Brands"
        description="See how XyvorA helps startups and industry leaders achieve real growth through high-converting design."
        testimonials={xyvoraTestimonials}
      />
    </div>
  );
}
