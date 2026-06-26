"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layout, Palette, Camera, Video, Image as ImageIcon, Lightbulb, ArrowRight, X } from "lucide-react";

const services = [
  {
    icon: <Layout className="w-8 h-8 text-primary" />,
    title: "Website Designing",
    description: "Custom, responsive websites built to convert visitors into customers. Fast, accessible, and stunning.",
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

  const handleBookSlot = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    setSubmitted(false);
  };

  const closeForm = () => {
    setSelectedService(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", company: "", date: "", time: "" });
      
      setTimeout(() => {
        closeForm();
      }, 2000);
    }, 1500);
  };

  return (
    <section id="services" className="py-24 bg-charcoal-900 relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-primary font-medium tracking-wide uppercase mb-3">Our Services</h2>
          <h3 className="text-3xl md:text-5xl font-bold mb-6">Everything Your Brand Needs to Stand Out</h3>
          <p className="text-gray-400 text-lg">
            We provide an end-to-end suite of creative services to elevate your brand from every angle.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="glass-panel p-8 rounded-2xl group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(109,40,217,0.1)] border-white/5 hover:border-primary/30 flex flex-col"
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
      </div>

      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeForm}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            ></motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-charcoal-800 border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 z-10"
            >
              <button 
                onClick={closeForm}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-2">Book a Slot</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Service: <span className="text-primary font-medium">{selectedService}</span>
              </p>
              
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
                      className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Company (Optional)" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 ml-1 block">Preferred Date</label>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-300 ml-1 block">Preferred Time</label>
                    <select 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full bg-charcoal-900 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
                      required
                    >
                      <option value="" disabled className="text-gray-500">Select a time</option>
                      <option value="morning" className="bg-charcoal-900 text-white">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="afternoon" className="bg-charcoal-900 text-white">Afternoon (1:00 PM - 5:00 PM)</option>
                      <option value="evening" className="bg-charcoal-900 text-white">Evening (6:00 PM - 8:00 PM)</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full mt-2 py-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-[0_0_15px_rgba(109,40,217,0.3)] transition-all disabled:opacity-70"
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
