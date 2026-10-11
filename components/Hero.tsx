"use client";

import { RobotHero } from "@/components/ui/robot-hero";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const wordVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    } 
  },
};

export default function Hero() {
  const handleCtaClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative w-full">
      <RobotHero
        backgroundText="XYVORA"
        navItemsLeft={[
          { label: "Home", href: "#home" },
          { label: "Services", href: "#services" },
          { label: "Portfolio", href: "#portfolio" },
          { label: "About", href: "#about" },
        ]}
        contactText="Contact"
        contactHref="#contact"
        ctaText="Get a Quote"
        onCtaClick={handleCtaClick}
        color="#c4c4c4"
        scale={1.2}
        pantallaColor="#8B5CF6"
        pantallaBrillo={1.5}
        blinkCycle={3.0}
        metalness={0.2}
      >
        <div className="flex flex-col gap-4 sm:gap-6 max-w-2xl z-30 relative pt-10 sm:pt-20 md:pt-0">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.h1 
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tight leading-[1.1]"
            >
              <motion.span variants={wordVariants} className="inline-block mr-3 lg:mr-4">XyvorA</motion.span>
              <span className="block sm:inline">
                <motion.span variants={wordVariants} className="inline-block mr-3 lg:mr-4">
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 bg-[length:200%_auto] block"
                    animate={{ backgroundPosition: ["0% center", "200% center"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    Smart
                  </motion.span>
                </motion.span>
                <motion.span variants={wordVariants} className="inline-block mr-3 lg:mr-4">
                  <motion.span 
                    className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-400 to-purple-600 bg-[length:200%_auto] block"
                    animate={{ backgroundPosition: ["0% center", "200% center"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  >
                    Creative
                  </motion.span>
                </motion.span>
              </span>
              <motion.span variants={wordVariants} className="inline-block">Solutions</motion.span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="text-base sm:text-lg md:text-xl font-medium text-gray-800 leading-relaxed max-w-[90%] sm:max-w-md md:max-w-lg"
          >
            XyvorA is a premier creative freelance agency for your brand. We turn your ideas into striking visuals and high-converting websites that drive real business growth.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 mt-2 sm:mt-4 w-full sm:w-auto pr-4 sm:pr-0"
          >
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
              className="relative inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-b from-purple-600 to-purple-800 px-8 text-sm font-semibold text-white shadow-lg ring-1 ring-purple-500/50 transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-full sm:w-auto"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button 
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })} 
              className="relative inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-black/10 px-8 text-sm font-semibold text-gray-900 shadow-lg ring-1 ring-black/20 backdrop-blur-md transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer w-full sm:w-auto"
            >
              <span>View Our Work</span>
            </button>
          </motion.div>
        </div>
      </RobotHero>
    </section>
  )
}
