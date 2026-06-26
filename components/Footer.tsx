"use client";

import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";

export default function Footer() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
      
      setTimeout(() => setSubmitted(false), 3000);
    }, 1500);
  };

  return (
    <footer id="contact" className="bg-charcoal-900 pt-24 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          {/* Left Column - Contact Form */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Let's Work Together</h2>
            <p className="text-gray-400 mb-8 max-w-md">
              Fill out the form below and our team will get back to you within 24 hours to discuss your project.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Your Name *" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-charcoal-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    placeholder="Your Email *" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-charcoal-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Company / Brand Name" 
                    value={(formData as any).company || ""}
                    onChange={(e) => setFormData({...formData, company: e.target.value} as any)}
                    className="w-full bg-charcoal-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                  />
                </div>
                <div>
                  <select 
                    value={(formData as any).service || ""}
                    onChange={(e) => setFormData({...formData, service: e.target.value} as any)}
                    className="w-full bg-charcoal-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
                  >
                    <option value="" disabled className="text-gray-500">Service Required</option>
                    <option value="website">Website Designing</option>
                    <option value="logo">Logo Designing</option>
                    <option value="photo_video">Ad Shooting</option>
                    <option value="motion">Motion Ads</option>
                    <option value="poster">Poster Designing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <select 
                  value={(formData as any).budget || ""}
                  onChange={(e) => setFormData({...formData, budget: e.target.value} as any)}
                  className="w-full bg-charcoal-800 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors appearance-none"
                >
                  <option value="" disabled className="text-gray-500">Estimated Budget</option>
                  <option value="small">Less than $1,000</option>
                  <option value="medium">$1,000 - $5,000</option>
                  <option value="large">$5,000 - $10,000</option>
                  <option value="enterprise">$10,000+</option>
                </select>
              </div>
              <div>
                <textarea 
                  placeholder="Tell us about your project *" 
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-charcoal-800 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                ></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-[0_0_15px_rgba(109,40,217,0.3)] transition-all flex justify-center items-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : submitted ? (
                  "Message Sent!"
                ) : (
                  <>Send Message <Send className="w-4 h-4" /></>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Footer Links */}
          <div className="flex flex-col md:items-end md:text-right">
            <div className="mb-10">
              <div className="text-3xl font-bold tracking-tighter flex items-center md:justify-end gap-1 group mb-4">
                <span>XyvorA</span>
                <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-primary to-purple-400"></div>
              </div>
              <p className="text-gray-400 max-w-sm ml-auto">
                Smart Creative Solutions. Complete Brand Growth.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12 text-left w-full max-w-md md:ml-auto">
              <div>
                <h4 className="text-white font-bold mb-4">Services</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Website Design</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Logo Design</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Ad Shooting</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Motion Ads</a></li>
                </ul>
              </div>
              <div>
                <h4 className="text-white font-bold mb-4">Company</h4>
                <ul className="space-y-3">
                  <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
                  <li><a href="#portfolio" className="text-gray-400 hover:text-primary transition-colors">Portfolio</a></li>
                  <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors">Contact</a></li>
                  <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Careers</a></li>
                </ul>
              </div>
            </div>

            <div className="mt-12 flex gap-4 md:justify-end">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>&copy; {new Date().getFullYear()} XyvorA Creative Agency. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
