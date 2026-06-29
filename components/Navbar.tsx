"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { 
    name: "Services", 
    href: "/services",
    dropdown: [
      "Website Designing",
      "App Development",
      "UI/UX Design",
      "Logo Designing",
      "Ad Shooting",
      "Motion Ads",
      "Poster Designing",
      "Brand Strategy"
    ]
  },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-panel py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
          <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
          <span>XyvorA</span>
          <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-primary to-purple-400 group-hover:scale-150 transition-transform"></div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link 
                href={link.href} 
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors flex items-center gap-1"
                onMouseEnter={() => link.dropdown && setServicesOpen(true)}
                onMouseLeave={() => link.dropdown && setServicesOpen(false)}
              >
                {link.name}
                {link.dropdown && <ChevronDown className="w-4 h-4" />}
              </Link>

              {/* Dropdown */}
              {link.dropdown && (
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-charcoal-800 rounded-lg shadow-xl border border-white/10 overflow-hidden"
                      onMouseEnter={() => setServicesOpen(true)}
                      onMouseLeave={() => setServicesOpen(false)}
                    >
                      {link.dropdown.map((item) => (
                        <Link 
                          key={item} 
                          href="/services" 
                          className="block px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                        >
                          {item}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <Link 
            href="/contact" 
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium text-sm hover:shadow-[0_0_15px_rgba(109,40,217,0.5)] transition-all hover:scale-105 inline-block"
          >
            Get a Quote
          </Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-charcoal-900 border-b border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <Link 
                    href={link.href} 
                    className="block text-lg font-medium text-gray-300 hover:text-white"
                    onClick={() => !link.dropdown && setMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <div className="pl-4 mt-2 flex flex-col gap-2 border-l border-white/10">
                      {link.dropdown.map((item) => (
                        <Link 
                          key={item} 
                          href="/services" 
                          className="text-sm text-gray-400 hover:text-white"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link 
                href="/contact" 
                className="mt-4 text-center px-6 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-medium hover:shadow-[0_0_15px_rgba(109,40,217,0.5)]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Get a Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
