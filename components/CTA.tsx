"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden bg-primary/10">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-600/20 mix-blend-overlay"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto glass-panel p-10 md:p-16 rounded-3xl border-primary/20 bg-black/40 backdrop-blur-xl"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Elevate Your Brand?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Let's discuss how we can bring your creative vision to life and build a digital presence that stands out.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="#contact" 
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-[0_0_20px_rgba(109,40,217,0.5)] transition-all hover:scale-105"
            >
              Get a Free Quote
            </a>
            <a 
              href="#services" 
              className="px-8 py-4 rounded-full border border-white/20 bg-transparent text-white font-medium hover:bg-white/10 transition-colors"
            >
              Explore Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
