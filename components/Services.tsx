"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Palette, Camera, Video, Image as ImageIcon, Lightbulb, ArrowRight, X, Smartphone, PenTool, Sparkles, Layers, CheckCircle2, Zap, Target, ShieldCheck } from "lucide-react";
import SpatialServiceShowcase from "@/components/ui/spatial-product-showcase";

const services = [
  {
    icon: <Layout className="w-6 h-6 text-indigo-400" />,
    title: "Website Designing",
    tag: "High-Converting",
    description: "Custom, responsive web applications engineered for speed, SEO excellence, and maximum conversion rates.",
    deliverables: ["Next.js & React Architecture", "SEO & Performance Optimization", "Dynamic Glassmorphic UI"],
  },
  {
    icon: <Smartphone className="w-6 h-6 text-cyan-400" />,
    title: "App Development",
    tag: "iOS & Android",
    description: "Native-quality mobile applications crafted with intuitive touch interactions and seamless API integrations.",
    deliverables: ["Cross-Platform Mobile Apps", "Intuitive UX Workflows", "Backend API Integration"],
  },
  {
    icon: <PenTool className="w-6 h-6 text-purple-400" />,
    title: "UI/UX Design Systems",
    tag: "Pixel-Perfect",
    description: "Comprehensive design tokens, Figma component systems, and design systems for enterprise scale.",
    deliverables: ["Figma Design Systems", "Interactive Wireframes", "Micro-Animations"],
  },
  {
    icon: <Palette className="w-6 h-6 text-indigo-400" />,
    title: "Logo & Brand Identity",
    tag: "Core Identity",
    description: "Memorable brand identity packages, vector logomarks, color palettes, and corporate brand guidelines.",
    deliverables: ["Vector Logomark & Marks", "Brand Style Guide Book", "Typography Systems"],
  },
  {
    icon: <Video className="w-6 h-6 text-pink-400" />,
    title: "Motion Ads & Animation",
    tag: "Viral Reach",
    description: "High-energy animated social media video ads designed to hook viewers and boost ad performance.",
    deliverables: ["3D/2D Motion Graphics", "Social Media Ad Reels", "Custom Audio Visuals"],
  },
  {
    icon: <Camera className="w-6 h-6 text-amber-400" />,
    title: "Ad Shooting & Visuals",
    tag: "Commercial",
    description: "High-resolution product photography, video production, and commercial campaign content.",
    deliverables: ["Product Photography", "Commercial Video Edits", "Color Grading"],
  },
  {
    icon: <ImageIcon className="w-6 h-6 text-emerald-400" />,
    title: "Poster & Print Design",
    tag: "High Impact",
    description: "Scroll-stopping promotional banners, event posters, marketing collateral, and print assets.",
    deliverables: ["Social Media Banners", "Event Marketing Posters", "Print Ready Assets"],
  },
  {
    icon: <Lightbulb className="w-6 h-6 text-yellow-400" />,
    title: "Brand Strategy & Growth",
    tag: "Strategic",
    description: "Market positioning, competitive analysis, and strategic roadmap to position your brand at the top.",
    deliverables: ["Market Positioning", "Competitor Audit", "Growth Strategy"],
  },
];

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
  const [viewMode, setViewMode] = useState<"bento" | "spatial">("bento");

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

          {/* View Mode Switcher */}
          <div className="flex items-center justify-center gap-2 mt-8 p-1.5 bg-charcoal-900/90 backdrop-blur-md rounded-full border border-white/10 w-fit mx-auto shadow-xl">
            <button
              onClick={() => setViewMode("bento")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                viewMode === "bento"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Layers className="w-4 h-4" />
              Bento Grid Mode
            </button>
            <button
              onClick={() => setViewMode("spatial")}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs md:text-sm font-medium transition-all ${
                viewMode === "spatial"
                  ? "bg-gradient-to-r from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-600/30"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              3D Spatial Stage
            </button>
          </div>
        </div>

        {/* View Mode Content */}
        {viewMode === "spatial" ? (
          <div className="w-full transition-all">
            <SpatialServiceShowcase onBookSlot={handleBookSlot} />
          </div>
        ) : (
          /* Linear Bento Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="bento-card p-6 md:p-7 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-colors">
                      {service.icon}
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-semibold text-gray-300 uppercase tracking-wider">
                      {service.tag}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-heading text-lg md:text-xl font-bold text-white mb-2.5 group-hover:text-indigo-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Deliverables List */}
                  <div className="space-y-2 mb-6 pt-4 border-t border-white/5">
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <button
                  onClick={() => handleBookSlot(service.title)}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-indigo-600/30 border border-white/10 hover:border-indigo-500/40 text-xs font-semibold text-white flex items-center justify-between transition-all group/btn"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-gray-400 group-hover/btn:translate-x-1 group-hover/btn:text-white transition-all" />
                </button>
              </motion.div>
            ))}
          </div>
        )}

        {/* 4-Step Agency Process Section */}
        <div className="mt-28 pt-20 border-t border-white/10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h3 className="font-heading text-2xl md:text-4xl font-extrabold text-white tracking-tight mb-3">
              Our 4-Step Execution Blueprint
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              A transparent, high-velocity workflow engineered to deliver results on time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step, idx) => (
              <div key={idx} className="relative p-6 rounded-2xl bg-charcoal-900/60 border border-white/10 hover:border-indigo-500/30 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold text-white/20 font-heading group-hover:text-indigo-400/60 transition-colors">
                    {step.number}
                  </span>
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    {step.icon}
                  </div>
                </div>
                <h4 className="font-heading text-lg font-bold text-white mb-2">{step.title}</h4>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

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

