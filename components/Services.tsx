"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Palette, Camera, Video, Image as ImageIcon, Lightbulb, ArrowRight, X, Smartphone, PenTool, Sparkles, Layers } from "lucide-react";
import SpatialServiceShowcase from "@/components/ui/spatial-product-showcase";

const services = [
  {
    icon: <Layout className="w-8 h-8 text-primary" />,
    title: "Website Designing",
    description: "Custom, responsive websites built to convert visitors into customers. Fast, accessible, and stunning.",
  },
  {
    icon: <Smartphone className="w-8 h-8 text-primary" />,
    title: "App Development",
    description: "High-performance, intuitive mobile applications for iOS and Android.",
  },
  {
    icon: <PenTool className="w-8 h-8 text-primary" />,
    title: "UI/UX Design",
    description: "User-centered design solutions that enhance engagement and deliver seamless experiences.",
  },
  {
    icon: <Palette className="w-8 h-8 text-primary" />,
    title: "Logo Designing",
    description: "Memorable brand marks that capture your business identity and leave a lasting impression.",
  },
  {
    icon: <Camera className="w-8 h-8 text-primary" />,
    title: "Ad Shooting",
    description: "Professional product & brand photography and videography for your marketing campaigns.",
  },
  {
    icon: <Video className="w-8 h-8 text-primary" />,
    title: "Motion Ads",
    description: "Eye-catching animated video ads optimized for social media and digital platforms.",
  },
  {
    icon: <ImageIcon className="w-8 h-8 text-primary" />,
    title: "Poster Designing",
    description: "Bold, scroll-stopping graphic designs for digital promotion and print marketing.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-primary" />,
    title: "Brand Strategy",
    description: "Comprehensive brand positioning and visual identity systems for long-term growth.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Services() {
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", date: "", time: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [viewMode, setViewMode] = useState<"spatial" | "grid">("spatial");

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
        
        setTimeout(() => {
          closeForm();
        }, 2000);
      } else {
        alert("Failed to book slot. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="services" className="py-20 md:py-28 bg-charcoal-900 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Service Explorer</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold mb-4 text-white tracking-tight">
            Everything Your Brand Needs to Stand Out
          </h2>
          <p className="text-gray-400 text-base md:text-lg">
            We provide an end-to-end suite of creative services to elevate your brand from every angle.
          </p>

          {/* View Toggle */}
          <div className="flex items-center justify-center gap-2 mt-8 p-1.5 bg-neutral-900/90 backdrop-blur-md rounded-full border border-neutral-800 w-fit mx-auto shadow-lg">
            <button
              onClick={() => setViewMode("spatial")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                viewMode === "spatial"
                  ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Spatial Showcase
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-primary to-purple-600 text-white shadow-md"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              All Services Grid
            </button>
          </div>
        </div>

        {/* Spatial Showcase Mode */}
        {viewMode === "spatial" ? (
          <div className="w-full transition-all">
            <SpatialServiceShowcase onBookSlot={handleBookSlot} />
          </div>
        ) : (
          /* Grid View Mode */
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4"
          >
            {services.map((service, index) => (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="glass-panel p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(109,40,217,0.15)] border-white/10 hover:border-primary/40 flex flex-col"
              >
                <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{service.title}</h4>
                <p className="text-gray-400 mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>
                <button 
                  onClick={() => handleBookSlot(service.title)}
                  className="inline-flex items-center text-primary font-medium group-hover:text-purple-400 transition-colors text-left"
                >
                  Book Slot <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
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
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-neutral-900 border border-white/15 rounded-2xl shadow-2xl p-6 md:p-8 z-10"
            >
              <button 
                onClick={closeForm}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-1"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-2">Book a Slot</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Service: <span className="text-primary font-semibold">{selectedService}</span>
              </p>
              
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">
                    <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Booking Confirmed!</h4>
                  <p className="text-gray-400">We&apos;ll be in touch with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Company (Optional)" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 ml-1 block">Preferred Date</label>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 ml-1 block">Preferred Time</label>
                    <select 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full bg-neutral-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
                      required
                    >
                      <option value="" disabled className="text-gray-500">Select a time</option>
                      <option value="morning" className="bg-neutral-900 text-white">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="afternoon" className="bg-neutral-900 text-white">Afternoon (1:00 PM - 5:00 PM)</option>
                      <option value="evening" className="bg-neutral-900 text-white">Evening (6:00 PM - 8:00 PM)</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-[0_0_20px_rgba(109,40,217,0.4)] transition-all disabled:opacity-70"
                  >
                    {isSubmitting ? "Processing..." : "Confirm Booking"}
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
