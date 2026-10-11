"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-[#f7f5f0] border-t border-black/5 text-[#1c1917]">
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto p-10 md:p-16 rounded-3xl border border-black/10 bg-white/90 shadow-2xl backdrop-blur-xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1c1917]">Ready to Elevate Your Brand?</h2>
          <p className="text-lg md:text-xl text-[#57534e] mb-10 max-w-2xl mx-auto leading-relaxed">
            Let&apos;s discuss how we can bring your creative vision to life and build a digital presence that stands out.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium shadow-[0_4px_14px_rgba(99,102,241,0.39)] hover:shadow-[0_6px_20px_rgba(99,102,241,0.5)] transition-all hover:scale-105"
            >
              Get a Free Quote
            </a>
            <a 
              href="#services" 
              className="px-8 py-4 rounded-full border border-black/15 bg-white text-[#1c1917] font-medium hover:bg-black/5 transition-colors"
            >
              Explore Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
