"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export default function CTA() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-background">
      {/* Glow Orbs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-indigo-600/20 via-primary/20 to-cyan-500/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto bento-card p-10 md:p-16 border-white/15 bg-charcoal-900/80 backdrop-blur-2xl shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none group-hover:text-indigo-500/10 transition-colors">
            <Sparkles className="w-32 h-32" />
          </div>

          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Ready to Grow?</span>
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Ready to Build Something <br className="hidden sm:inline" />
            <span className="text-gradient">Extraordinary?</span>
          </h2>
          <p className="text-gray-300 text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Partner with XyvorA to transform your vision into a world-class visual identity and digital ecosystem.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="#contact" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-indigo-600 via-primary to-cyan-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              <span>Estimate Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#services" 
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/15 bg-white/5 text-white font-semibold text-sm hover:bg-white/10 hover:border-white/25 transition-all"
            >
              Explore Capabilities
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

