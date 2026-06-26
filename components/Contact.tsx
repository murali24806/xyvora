"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Send, Mail, Phone, MapPin, Sparkles, CheckCircle2 } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    phone: "", 
    company: "", 
    service: "", 
    date: "", 
    time: "", 
    message: "" 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", company: "", service: "", date: "", time: "", message: "" });
      
      setTimeout(() => setSubmitted(false), 4000);
    }, 1500);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-background">
      {/* Background glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-primary/20 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 md:w-[30rem] md:h-[30rem] bg-purple-600/10 rounded-full blur-[100px] md:blur-[150px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight"
          >
            Let&apos;s Create <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">Magic</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Ready to elevate your brand? Drop us a line and let&apos;s build something extraordinary together.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-8 max-w-6xl mx-auto">
          {/* Left Side: Contact Info */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="lg:col-span-2 flex flex-col justify-between"
          >
            <div>
              <motion.div variants={itemVariants} className="mb-10">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 flex items-center justify-center border border-white/5 mb-6 shadow-[0_0_30px_rgba(109,40,217,0.15)]">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Contact Information</h3>
                <p className="text-gray-400 leading-relaxed">
                  We are available for freelance opportunities, agency partnerships, and ambitious projects worldwide.
                </p>
              </motion.div>

              <div className="space-y-6">
                {[
                  { icon: Mail, title: "Email Us", detail: "hello@xyvora.com", href: "mailto:hello@xyvora.com" },
                  { icon: Phone, title: "Call Us", detail: "+91 86373 73116", href: "tel:+918637373116" },
                  { icon: MapPin, title: "Location", detail: "Sylhet, Bangladesh", href: null },
                ].map((item, index) => (
                  <motion.div key={index} variants={itemVariants} className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-primary/20 group-hover:border-primary/30 transition-colors shrink-0">
                      <item.icon className="w-5 h-5 text-gray-300 group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500 mb-1">{item.title}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-lg font-semibold hover:text-primary transition-colors">
                          {item.detail}
                        </a>
                      ) : (
                        <p className="text-lg font-semibold">{item.detail}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={itemVariants} className="mt-12 p-6 rounded-3xl bg-gradient-to-br from-charcoal-800/80 to-charcoal-900/80 border border-white/5 backdrop-blur-md relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center sm:justify-between gap-4 text-center sm:text-left">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Follow our journey</p>
                  <p className="font-semibold">Connect on Social</p>
                </div>
                <div className="flex gap-3">
                  {['Twitter', 'Instagram', 'Dribbble'].map((social) => (
                    <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors">
                      <span className="sr-only">{social}</span>
                      <MessageCircle className="w-4 h-4 text-gray-300" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <div className="glass-panel p-8 md:p-10 rounded-[2rem] border border-white/10 bg-charcoal-900/50 backdrop-blur-xl relative shadow-2xl">
              {/* Form glowing edge */}
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
              <div className="absolute inset-y-0 -left-px w-px bg-gradient-to-b from-transparent via-primary/20 to-transparent" />

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Full Name</label>
                    <input 
                      type="text" 
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="John Doe"
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all hover:bg-black/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Email Address</label>
                    <input 
                      type="email" 
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@example.com"
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all hover:bg-black/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all hover:bg-black/30"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Company (Optional)</label>
                    <input 
                      type="text" 
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Your Brand"
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all hover:bg-black/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Preferred Date</label>
                    <input 
                      type="date" 
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all hover:bg-black/30 [color-scheme:dark]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-300 ml-1">Preferred Time</label>
                    <select 
                      value={formData.time}
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none hover:bg-black/30"
                      required
                    >
                      <option value="" disabled className="text-gray-500">Select a time</option>
                      <option value="morning" className="bg-charcoal-900 text-white">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="afternoon" className="bg-charcoal-900 text-white">Afternoon (1:00 PM - 5:00 PM)</option>
                      <option value="evening" className="bg-charcoal-900 text-white">Evening (6:00 PM - 8:00 PM)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Service Required</label>
                  <select 
                    value={formData.service}
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none hover:bg-black/30"
                    required
                  >
                    <option value="" disabled className="text-gray-500">Select a service</option>
                    <option value="website" className="bg-charcoal-900 text-white">Website Design</option>
                    <option value="logo" className="bg-charcoal-900 text-white">Logo Design</option>
                    <option value="photo_video" className="bg-charcoal-900 text-white">Ad Shooting</option>
                    <option value="motion" className="bg-charcoal-900 text-white">Motion Ads</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300 ml-1">Project Details</label>
                  <textarea 
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Tell us about your vision, goals, and timeline..."
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-gray-600 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none hover:bg-black/30"
                  />
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={isSubmitting || submitted}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-medium shadow-[0_0_20px_rgba(109,40,217,0.3)] hover:shadow-[0_0_30px_rgba(109,40,217,0.5)] transition-all flex justify-center items-center gap-2 overflow-hidden relative group"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    {isSubmitting ? (
                      <>Processing <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full" /></>
                    ) : submitted ? (
                      <>Sent Successfully <CheckCircle2 className="w-5 h-5 text-green-300" /></>
                    ) : (
                      <>Send Message <Send className="w-4 h-4" /></>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
