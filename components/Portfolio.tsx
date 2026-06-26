"use client";

import SocialCards from "@/components/ui/card-fan-carousel";

const DEMO_CARDS = [
  { imgUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "FinTech Platform Rebrand" },
  { imgUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Eco-Friendly Cosmetics" },
  { imgUrl: "https://images.unsplash.com/photo-1555529733-0e670560f7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Urban Streetwear Campaign" },
  { imgUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Music Festival 2024" },
  { imgUrl: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Health & Wellness App" },
  { imgUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Modern Cafe Identity" },
  { imgUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "UI/UX Design System" },
  { imgUrl: "https://images.unsplash.com/photo-1542744094-24638ea0b3b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Digital Marketing Analytics" },
  { imgUrl: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Boutique Packaging Design" },
  { imgUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", alt: "Creative Brand Strategy" },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-primary font-medium tracking-wide uppercase mb-3">Portfolio</h2>
          <h3 className="text-3xl md:text-5xl font-bold">Our Recent Work</h3>
        </div>
        
        <div className="flex justify-center w-full min-h-[70vh] items-center">
          <SocialCards cards={DEMO_CARDS} />
        </div>
      </div>
    </section>
  );
}
