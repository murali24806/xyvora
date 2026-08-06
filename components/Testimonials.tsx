"use client";

import { motion } from "framer-motion";
import { Star, Quote, Sparkles } from "lucide-react";

const testimonials = [
  {
    quote: "XyvorA completely transformed our brand identity. The new web app is stunning and our conversion rate has more than doubled since launch.",
    name: "Sarah Jenkins",
    title: "CEO, InnovateTech",
    rating: 5,
    avatarBg: "bg-gradient-to-br from-indigo-500 to-purple-600",
  },
  {
    quote: "Their team's attention to detail and kinetic visual design is unmatched. The ad campaign they created for us was our highest performing launch.",
    name: "Marcus Chen",
    title: "Marketing Director, Bloom Coffee",
    rating: 5,
    avatarBg: "bg-gradient-to-br from-cyan-500 to-blue-600",
  },
  {
    quote: "Fast, professional, and incredibly talented. They took our rough app concept and delivered a polished, pixel-perfect design system.",
    name: "Elena Rodriguez",
    title: "Founder, EcoStyle",
    rating: 5,
    avatarBg: "bg-gradient-to-br from-purple-500 to-pink-600",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 bg-charcoal-950 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Verified Client Feedback</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Trusted by <span className="text-gradient">Ambitious Brands</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            See how XyvorA helps startups and industry leaders achieve real growth through design.
          </p>
        </div>

        {/* Testimonials Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bento-card p-8 border-white/10 hover:border-purple-500/30 flex flex-col justify-between group"
            >
              <div>
                {/* Rating Stars & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-white/10 group-hover:text-purple-400/30 transition-colors" />
                </div>

                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 italic">
                  &quot;{testimonial.quote}&quot;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-6 border-t border-white/5">
                <div className={`w-10 h-10 rounded-full ${testimonial.avatarBg} text-white font-bold text-sm flex items-center justify-center shadow-md`}>
                  {testimonial.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-white text-sm">{testimonial.name}</h3>
                  <p className="text-xs text-indigo-400">{testimonial.title}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

