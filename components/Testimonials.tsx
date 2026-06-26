"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "XyvorA completely transformed our brand identity. The new website is stunning and our conversion rate has doubled since launch.",
    name: "Sarah Jenkins",
    title: "CEO, InnovateTech",
    rating: 5,
  },
  {
    quote: "Their team's attention to detail and creative vision is unmatched. The ad campaign they shot for us was our most successful yet.",
    name: "Marcus Chen",
    title: "Marketing Director, Bloom Coffee",
    rating: 5,
  },
  {
    quote: "Fast, professional, and incredibly talented. They took our rough ideas and turned them into a polished, modern brand package.",
    name: "Elena Rodriguez",
    title: "Founder, EcoStyle",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-charcoal-900 relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 md:w-[500px] md:h-[500px] bg-primary/10 rounded-full blur-[80px] md:blur-[100px] -translate-y-1/2 translate-x-1/4 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-primary font-medium tracking-wide uppercase mb-3">Testimonials</h2>
          <h3 className="text-3xl md:text-5xl font-bold">What Our Clients Say</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-panel p-8 rounded-2xl border-white/5 hover:border-primary/30 transition-colors"
            >
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-lg text-gray-300 mb-8 italic">
                &quot;{testimonial.quote}&quot;
              </p>
              <div>
                <div className="font-bold text-white text-lg">{testimonial.name}</div>
                <div className="text-primary text-sm">{testimonial.title}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
