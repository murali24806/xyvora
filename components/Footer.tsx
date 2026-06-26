"use client";

import { MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-charcoal-900 pt-16 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <div className="mb-10">
            <div className="text-3xl font-bold tracking-tighter flex items-center justify-center gap-1 group mb-4">
              <span>XyvorA</span>
              <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-primary to-purple-400"></div>
            </div>
            <p className="text-gray-400 max-w-sm mx-auto">
              Smart Creative Solutions. Complete Brand Growth.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-12 md:gap-24 text-left w-full max-w-3xl mx-auto">
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

          <div className="mt-12 flex justify-center gap-4">
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
