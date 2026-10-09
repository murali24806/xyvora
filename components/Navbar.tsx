"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const INK = '#1f1f1f';
const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "portfolio", "testimonials", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="fixed top-[18px] left-0 right-0 z-50 flex justify-center px-4 md:px-5">
      <motion.nav
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative flex items-center justify-between md:justify-start gap-9 px-5 py-2.5 rounded-full bg-white/55 border border-white/65 shadow-md"
        style={{
          backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
          boxShadow: '0 6px 24px rgba(0,0,0,0.12)',
        }}
      >
        <span style={{ fontSize: '17px', fontWeight: 700, color: INK, letterSpacing: '-0.01em' }}>
          XyvorA
        </span>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace("#", "");
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => scrollToSection(e, link.href)}
                style={{ 
                  fontSize: '13px', 
                  fontWeight: isActive ? 600 : 500, 
                  color: isActive ? INK : 'rgba(40,40,40,0.72)', 
                  textDecoration: 'none', 
                  whiteSpace: 'nowrap', 
                  transition: 'color 0.2s ease' 
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = INK }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = isActive ? INK : 'rgba(40,40,40,0.72)' }}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-gray-800 p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        
        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute top-full mt-3 left-0 right-0 p-4 rounded-2xl bg-white/85 border border-white/40 shadow-xl flex flex-col gap-3 md:hidden"
              style={{ backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)' }}
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="px-4 py-2 rounded-xl text-sm transition-colors"
                    style={{
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? INK : 'rgba(40,40,40,0.8)',
                      background: isActive ? 'rgba(0,0,0,0.05)' : 'transparent'
                    }}
                  >
                    {link.name}
                  </a>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

      </motion.nav>
    </div>
  )
}


