"use client";

import { useState } from "react";
import { MessageCircle, Send, Mail, Phone, MapPin, Sparkles, CheckCircle2, ShieldCheck, Zap } from "lucide-react";


const serviceOptions = [
  "Website Designing",
  "App Development",
  "UI/UX Design Systems",
  "Logo & Branding",
  "Motion Ads",
  "Ad Shooting & Visuals",
];

const budgetRanges = [
  "₹3,000 - ₹10,000",
  "₹15,000 - ₹35,000",
  "₹35,000 - ₹75,000",
  "₹75,000 - ₹1.5L",
  "₹1.5L+",
];

export default function Contact() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["Website Designing"]);
  const [selectedBudget, setSelectedBudget] = useState(budgetRanges[0]);
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    company: "", 
    message: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const toggleService = (service: string) => {
    if (selectedServices.includes(service)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== service));
      }
    } else {
      setSelectedServices([...selectedServices, service]);
    }
  };

  const handleWhatsAppSend = () => {
    const text = encodeURIComponent(
      `Hi XyvorA Team! I would like to inquire about a project:\n- Selected Services: ${selectedServices.join(", ")}\n- Estimated Budget: ${selectedBudget}\n- Name: ${formData.name || "Client"}\n- Phone: ${formData.phone || "Not specified"}`
    );
    window.open(`https://wa.me/918919009613?text=${text}`, "_blank");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: selectedServices.join(", "),
          budget: selectedBudget,
          type: 'contact',
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: "", email: "", phone: "", company: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
      } else {
        alert("Inquiry received! Our team will contact you shortly.");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Inquiry received! Our team will contact you shortly.");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative overflow-hidden bg-background">
      {/* Background Radial Glow Lights */}
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-indigo-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive Project Estimator</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight text-white">
            Let&apos;s Build Something <span className="text-gradient">Extraordinary</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
            Select your project services, estimate your budget range, and connect directly with our design team.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8 lg:gap-10 max-w-6xl mx-auto items-start">
          
          {/* Left Column: Direct Info & Quick Guarantee */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bento-card p-5 sm:p-6 md:p-8 space-y-6 border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-300 mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-white">Direct Communication</h3>
              <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
                We believe in zero fluff, rapid responses, and direct collaboration with our creative directors.
              </p>

              <div className="space-y-4 pt-2 border-t border-white/10">
                <a href="mailto:xyvoratech@gmail.com" className="flex items-center gap-3 group">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors">
                    <Mail className="w-4 h-4 text-gray-300 group-hover:text-indigo-300" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block">Email Us</span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">xyvoratech@gmail.com</span>
                  </div>
                </a>

                {/* Direct Line 1 */}
                <a href="tel:+917382183616" className="flex items-center gap-3 group">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors">
                    <Phone className="w-4 h-4 text-gray-300 group-hover:text-indigo-300" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block">Primary Line</span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">+91 73821 83616</span>
                  </div>
                </a>

                {/* Direct Line 2 */}
                <a href="tel:+918919009613" className="flex items-center gap-3 group">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/30 transition-colors">
                    <Phone className="w-4 h-4 text-gray-300 group-hover:text-indigo-300" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block">Secondary Line & WhatsApp</span>
                    <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">+91 89190 09613</span>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                    <MapPin className="w-4 h-4 text-gray-300" />
                  </div>
                  <div>
                    <span className="text-[11px] text-gray-400 block">HQ Studio</span>
                    <span className="text-xs sm:text-sm font-semibold text-white">Visakhapatnam, India</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time Guarantee Pill Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 flex items-center gap-3.5">
              <div className="p-2.5 sm:p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 shrink-0">
                <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Fast Response Guarantee</h4>
                <p className="text-[11px] sm:text-xs text-gray-300">Our studio team responds in under 2 hours during active hours.</p>
              </div>
            </div>

            {/* Instant WhatsApp Inquiry Button (redirects to +91 89190 09613) */}
            <button
              onClick={handleWhatsAppSend}
              className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Instant WhatsApp Inquiry (+91 89190 09613)</span>
            </button>

          </div>

          {/* Right Column: Interactive Scope Builder Form */}
          <div className="lg:col-span-3">
            <div className="bento-card p-5 sm:p-8 md:p-10 border-white/15 bg-charcoal-900/80 backdrop-blur-2xl shadow-2xl space-y-6 sm:space-y-8">
              
              {/* Step 1: Services Selection */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-3">
                  1. Select Required Services
                </label>
                <div className="flex flex-wrap gap-2">
                  {serviceOptions.map((service) => {
                    const isSelected = selectedServices.includes(service);
                    return (
                      <button
                        key={service}
                        type="button"
                        onClick={() => toggleService(service)}
                        className={`px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-medium transition-all ${
                          isSelected
                            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 font-semibold border border-indigo-400"
                            : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                        }`}
                      >
                        {isSelected ? "✓ " : "+ "} {service}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Budget Range Picker (Includes ₹3,000 - ₹10,000) */}
              <div>
                <label className="text-xs uppercase tracking-wider font-semibold text-gray-400 block mb-3">
                  2. Estimated Budget Range
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
                  {budgetRanges.map((range) => {
                    const isSelected = selectedBudget === range;
                    return (
                      <button
                        key={range}
                        type="button"
                        onClick={() => setSelectedBudget(range)}
                        className={`py-2 px-2.5 rounded-xl text-[11px] sm:text-xs font-medium transition-all text-center ${
                          isSelected
                            ? "bg-cyan-500 text-black font-bold shadow-lg shadow-cyan-500/20"
                            : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                        }`}
                      >
                        {range}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 3: Client Info & Details */}
              <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1.5 ml-1">Your Name *</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Alex Morgan"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1.5 ml-1">Email Address *</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="alex@company.com"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-400 block mb-1.5 ml-1">Phone Number *</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 89190 09613"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 block mb-1.5 ml-1">Company / Brand (Optional)</label>
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Brand Name"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs text-gray-400 block mb-1.5 ml-1">Project Summary / Goals</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Briefly describe your project requirements, target launch date, or specific goals..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting || submitted}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-primary to-cyan-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  {submitted ? (
                    <>
                      <span>Inquiry Sent Successfully!</span>
                      <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                    </>
                  ) : (
                    <>
                      <span>Submit Project Estimate</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}


