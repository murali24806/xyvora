"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { ServicesStack } from "@/components/ui/services-stack";

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
    <div id="services" className="w-full bg-[#0b0f4a] relative">
      <ServicesStack onBook={handleBookSlot} />

      {/* Booking Slot Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeForm}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-slate-900 border border-white/10 rounded-2xl shadow-2xl p-6 md:p-8 z-10 text-white"
            >
              <button 
                onClick={closeForm}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              <h3 className="text-2xl font-bold text-white mb-1">Book a Service Slot</h3>
              <p className="text-gray-400 mb-6 text-sm">
                Service: <span className="text-[#3b81e3] font-semibold">{selectedService}</span>
              </p>
              
              {submitted ? (
                <div className="py-8 text-center">
                  <div className="w-16 h-16 bg-[#3b81e3]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-[#3b81e3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Booking Confirmed!</h4>
                  <p className="text-gray-400 text-sm">Our team will be in touch with you shortly.</p>
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
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3b81e3] focus:ring-1 focus:ring-[#3b81e3] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3b81e3] focus:ring-1 focus:ring-[#3b81e3] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <input 
                      type="tel" 
                      placeholder="Phone Number" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3b81e3] focus:ring-1 focus:ring-[#3b81e3] transition-colors text-sm"
                    />
                  </div>
                  <div>
                    <input 
                      type="text" 
                      placeholder="Company (Optional)" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#3b81e3] focus:ring-1 focus:ring-[#3b81e3] transition-colors text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-300 ml-1 block">Preferred Date</label>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3b81e3] focus:ring-1 focus:ring-[#3b81e3] transition-colors [color-scheme:dark] text-sm"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-gray-300 ml-1 block">Preferred Time</label>
                    <select 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#3b81e3] focus:ring-1 focus:ring-[#3b81e3] transition-colors appearance-none text-sm"
                      required
                    >
                      <option value="" disabled className="text-gray-500">Select a time</option>
                      <option value="morning" className="bg-slate-900 text-white">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="afternoon" className="bg-slate-900 text-white">Afternoon (1:00 PM - 5:00 PM)</option>
                      <option value="evening" className="bg-slate-900 text-white">Evening (6:00 PM - 8:00 PM)</option>
                    </select>
                  </div>
                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full mt-2 py-3.5 rounded-xl bg-[#3b81e3] text-white font-medium hover:bg-[#2b6fcb] transition-all disabled:opacity-70 text-sm cursor-pointer shadow-lg"
                  >
                    {isSubmitting ? "Confirming..." : "Confirm Booking"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

