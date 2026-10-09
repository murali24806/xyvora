"use client";

import { motion } from 'framer-motion'

const INK = '#1f1f1f'
const stats = [
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
  { value: "100+", label: "Designs Created" },
  { value: "99.8%", label: "Client Satisfaction" },
];

export default function Hero() {
  return (
    <section id="home" className="relative w-full h-[100vh] overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover" src="/hero.mp4" autoPlay muted loop playsInline />
      {/* Overlays */}
      <div className="absolute inset-0 bg-black/15" />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.17) 0%, transparent 22%, transparent 60%, rgba(0,0,0,0.25) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.10) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.10) 100%)' }} />
      <div className="absolute top-[-14%] left-1/2 -translate-x-1/2 w-[1000px] h-[720px] pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 30%, rgba(55,48,163,0.05) 0%, transparent 68%)' }} />

      {/* Top-anchored content */}
      <div className="relative z-10 h-full flex flex-col items-center text-center pt-[15vh] px-4 md:px-8">
        {/* Eyebrow */}
        <motion.span
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="inline-flex items-center px-3.5 py-1.5 rounded-full bg-white/35 border border-white/50 mb-5 text-[11px] font-medium text-gray-800"
          style={{ backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
        >
          XyvorA Creative Studio
        </motion.span>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.22, ease: 'easeOut' }}
          style={{ margin: 0, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', lineHeight: 1.08, letterSpacing: '-0.025em', color: INK }}
        >
          Smart Creative Solutions
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.38, ease: 'easeOut' }}
          className="mt-4 max-w-[460px] text-sm md:text-[15px] leading-relaxed font-medium text-gray-800/80 px-2"
        >
          XyvorA is a premier creative freelance studio. We engineer striking visual brand identities, high-converting web apps, and immersive motion design to accelerate your growth.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.52, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 mt-7 w-full sm:w-auto px-6 sm:px-0"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-[9px] text-sm font-semibold text-white no-underline bg-[#1a1a1a] shadow-lg flex justify-center"
            style={{ fontFamily: "'Inter', sans-serif", boxShadow: '0 6px 20px rgba(0,0,0,0.22)' }}
          >
            Estimate Project
          </motion.a>
          <motion.a
            href="#portfolio"
            whileHover={{ scale: 1.04, background: 'rgba(255,255,255,0.85)' }}
            whileTap={{ scale: 0.97 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-6 py-3 rounded-[9px] text-sm font-semibold no-underline bg-white/65 border border-white/70 flex justify-center"
            style={{ color: INK, fontFamily: "'Inter', sans-serif", backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          >
            Explore Portfolio
          </motion.a>
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7, ease: 'easeOut' }}
        className="absolute bottom-0 left-0 right-0 z-10 pb-8 pt-5 px-4 md:px-6 text-center bg-gradient-to-t from-black/40 to-transparent"
      >
        <div className="flex items-center justify-center gap-6 md:gap-12 flex-wrap max-w-[820px] mx-auto">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center"
            >
              <span
                className="text-[16px] md:text-[18px] font-bold tracking-wide text-white/80 transition-colors cursor-default hover:text-white"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
              >
                {stat.value}
              </span>
              <span 
                className="text-[10px] md:text-[11px] tracking-wider uppercase text-white/70 mt-1"
                style={{ textShadow: '0 1px 10px rgba(0,0,0,0.5)' }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
