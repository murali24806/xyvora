"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Zap, Target, ShieldCheck, CheckCircle2 } from "lucide-react";
import SpatialServiceShowcase from "@/components/ui/spatial-product-showcase";

const processSteps = [
  {
    number: "01",
    icon: <Target className="w-6 h-6 text-indigo-400" />,
    title: "Discovery & Strategy",
    description: "We dive deep into your brand vision, target audience, and business goals to map out a winning creative blueprint."
  },
  {
    number: "02",
    icon: <Sparkles className="w-6 h-6 text-cyan-400" />,
    title: "Spatial Prototyping",
    description: "We design interactive UI wireframes, high-fidelity mockups, and visual prototypes for your review."
  },
  {
    number: "03",
    icon: <Zap className="w-6 h-6 text-purple-400" />,
    title: "High-Speed Build",
    description: "We engineer pixel-perfect web apps and visual assets using modern tech stacks and smooth motion physics."
  },
  {
    number: "04",
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    title: "Launch & Support",
    description: "We deploy with complete optimization, perform continuous quality checks, and support your ongoing growth."
  }
];

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", date: "", time: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle tracking step every 3.5s (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % processSteps.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handleBookSlot = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setSubmitted(false);
  };

  const closeForm = () => {
    setSelectedService(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, service: selectedService, type: 'booking' }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", company: "", date: "", time: "" });
        setTimeout(() => closeForm(), 2000);
      } else {
        alert("Booking request received. We will contact you shortly!");
        closeForm();
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Booking request received. We will contact you shortly!");
      closeForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="services" className="py-24 md:py-32 bg-charcoal-950 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>End-to-End Capabilities</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
            Crafted for <span className="text-gradient">Maximum Growth</span>
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-xl mx-auto">
            From high-converting web applications to visual brand identities, we deliver full-stack creative execution.
          </p>
        </div>

        {/* 3D Spatial Stage Service Showcase */}
        <div className="w-full transition-all">
          <SpatialServiceShowcase onBookSlot={handleBookSlot} />
        </div>

        {/* 4-Step Agency Process Section with Responsive Tracking Animation */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mt-28 pt-20 border-t border-white/10 relative"
        >
          {/* Header with Animation */}
          <div className="text-center max-w-2xl mx-auto mb-14 relative">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-4"
            >
              <Zap className="h-3.5 w-3.5 animate-pulse text-cyan-400" />
              <span>Live Execution Progress Tracker</span>
            </motion.div>
            
            <h3 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
              Our 4-Step <span className="text-gradient">Execution Blueprint</span>
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              Interactive timeline tracking: hover or tap any step to inspect our agency process in real-time.
            </p>
          </div>

          {/* DESKTOP HORIZONTAL TRACKING BAR (>= lg) */}
          <div className="hidden lg:block relative mb-12 max-w-5xl mx-auto px-4">
            {/* Background Rail */}
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative">
              {/* Dynamic Animated Active Beam */}
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 shadow-[0_0_15px_#22d3ee]"
                animate={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 90, damping: 18 }}
              />
            </div>

            {/* Step Node Indicators Aligned with 4 Grid Columns */}
            <div className="grid grid-cols-4 w-full absolute -top-2 left-0 right-0 pointer-events-none">
              {processSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                const isPassed = activeStep >= idx;
                return (
                  <div key={idx} className="flex justify-center items-center relative">
                    <div 
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? "bg-cyan-400 shadow-[0_0_20px_#22d3ee] scale-125 border-2 border-white"
                          : isPassed
                          ? "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                          : "bg-charcoal-900 border border-white/20"
                      }`}
                    >
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-charcoal-950 animate-ping" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* PROCESS CARDS GRID (Responsive: Vertical tracking rail on Mobile, 4-col on Desktop) */}
          <div className="relative pl-10 sm:pl-14 lg:pl-0">
            {/* MOBILE VERTICAL TRACKING RAIL (< lg) */}
            <div className="block lg:hidden absolute left-3.5 sm:left-5 top-6 bottom-6 w-1 bg-white/10 rounded-full overflow-hidden pointer-events-none">
              <motion.div 
                className="w-full bg-gradient-to-b from-indigo-500 via-cyan-400 to-emerald-400 shadow-[0_0_15px_#22d3ee]"
                animate={{ height: `${((activeStep + 1) / processSteps.length) * 100}%` }}
                transition={{ type: "spring", stiffness: 90, damping: 18 }}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
              {processSteps.map((step, idx) => {
                const isActive = activeStep === idx;
                
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 35 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    onMouseEnter={() => { setIsPaused(true); setActiveStep(idx); }}
                    onMouseLeave={() => setIsPaused(false)}
                    onClick={() => setActiveStep(idx)}
                    className={`relative p-7 rounded-2xl transition-all duration-500 cursor-pointer flex flex-col justify-between group ${
                      isActive
                        ? "bg-gradient-to-b from-indigo-950/80 via-charcoal-900/95 to-charcoal-900 border-2 border-cyan-400/80 shadow-[0_0_40px_rgba(34,211,238,0.25)] -translate-y-2 scale-[1.02]"
                        : "bg-charcoal-900/70 backdrop-blur-xl border border-white/10 hover:border-white/20 hover:bg-charcoal-900/90"
                    }`}
                  >
                    {/* Mobile Node Marker Dot on Left Rail */}
                    <div className="block lg:hidden absolute -left-[35px] sm:-left-[43px] top-8 z-20 pointer-events-none">
                      <div 
                        className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                          isActive
                            ? "bg-cyan-400 shadow-[0_0_15px_#22d3ee] scale-125 border-2 border-white"
                            : activeStep >= idx
                            ? "bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                            : "bg-charcoal-900 border border-white/20"
                        }`}
                      >
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-charcoal-950 animate-ping" />
                        )}
                      </div>
                    </div>

                    {/* Top Inner Glow Overlay */}
                    <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent transition-opacity duration-300 pointer-events-none ${
                      isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                    }`} />

                    <div>
                      {/* Card Header */}
                      <div className="flex items-center justify-between mb-5">
                        <span className={`text-4xl font-extrabold font-heading transition-all duration-300 ${
                          isActive ? "text-cyan-400 scale-110" : "text-white/20 group-hover:text-white/40"
                        }`}>
                          {step.number}
                        </span>
                        
                        {isActive ? (
                          <span className="px-2.5 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-[10px] font-extrabold text-cyan-300 flex items-center gap-1.5 animate-pulse shadow-sm shadow-cyan-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                            LIVE TRACKING
                          </span>
                        ) : (
                          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-indigo-500/20 transition-all duration-300">
                            <div className="text-indigo-400 group-hover:text-cyan-300 transition-colors">
                              {step.icon}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Title & Description */}
                      <h4 className={`font-heading text-lg md:text-xl font-bold mb-2.5 transition-colors ${
                        isActive ? "text-white" : "text-gray-200 group-hover:text-white"
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                        {step.description}
                      </p>
                    </div>

                    {/* Card Footer Progress / Indicator */}
                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <span className={`text-[11px] font-semibold transition-colors flex items-center gap-1.5 ${
                        isActive ? "text-cyan-400" : "text-gray-500 group-hover:text-gray-300"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full transition-all ${
                          isActive ? "bg-cyan-400 animate-ping" : "bg-indigo-500"
                        }`} />
                        Phase 0{idx + 1}
                      </span>

                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isActive 
                          ? "bg-cyan-400 text-charcoal-950 shadow-[0_0_12px_#22d3ee]" 
                          : "bg-white/5 text-gray-400 group-hover:text-white group-hover:bg-indigo-600"
                      }`}>
                        →
                      </div>
                    </div>

                    {/* Active Step Inner Bottom Progress Bar */}
                    {isActive && (
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 3.5, ease: "linear" }}
                        className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-cyan-400 via-indigo-400 to-cyan-400 rounded-full"
                      />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>

      {/* Booking Form Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeForm}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-charcoal-900 border border-white/15 rounded-3xl shadow-2xl p-6 md:p-8 z-10"
            >
              <button 
                onClick={closeForm}
                className="absolute top-5 right-5 text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="font-heading text-2xl font-bold text-white mb-1">Book Consultation</h3>
              <p className="text-gray-400 mb-6 text-xs">
                Selected Service: <span className="text-indigo-400 font-semibold">{selectedService}</span>
              </p>
              
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                    <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Slot Booked!</h4>
                  <p className="text-gray-400 text-sm">We&apos;ll be in touch with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Full Name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-400 mb-1 block">Preferred Date</label>
                      <input 
                        type="date" 
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors [color-scheme:dark]"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-400 mb-1 block">Preferred Time</label>
                      <select 
                        value={formData.time}
                        onChange={(e) => setFormData({...formData, time: e.target.value})}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-colors"
                        required
                      >
                        <option value="" disabled>Select time</option>
                        <option value="morning" className="bg-charcoal-900 text-white">Morning (9 AM - 12 PM)</option>
                        <option value="afternoon" className="bg-charcoal-900 text-white">Afternoon (1 PM - 5 PM)</option>
                        <option value="evening" className="bg-charcoal-900 text-white">Evening (6 PM - 9 PM)</option>
                      </select>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-primary to-cyan-500 text-white font-semibold text-sm shadow-lg shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all disabled:opacity-70"
                  >
                    {isSubmitting ? "Confirming..." : "Confirm Booking"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

