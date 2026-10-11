"use client";

import { useEffect, useState } from 'react'
import { Close, Logo, Menu } from './icons'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const elem = document.getElementById(targetId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
      setOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-panel py-4" : "bg-gradient-to-b from-black/80 to-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 group">
          <Logo className="w-8 h-8 group-hover:scale-105 transition-transform" />
          <span>XyvorA</span>
          <div className="w-2 h-2 rounded-full bg-gradient-to-tr from-primary to-purple-400 group-hover:scale-150 transition-transform"></div>
        </Link>

      <nav className="nav__pill" aria-label="Primary">
        <ul>
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} onClick={(e) => scrollToSection(e, link.href)}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="nav__actions">
        <a className="btn btn--light nav__cta" href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>Contact Us</a>
        <button
          className="nav__burger"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <Close /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="nav__sheet">
          <ul>
            {links.map((link) => (
              <li key={link.label}>
                <a href={link.href} onClick={(e) => scrollToSection(e, link.href)}>{link.label}</a>
              </li>
            ))}
          </ul>
          <a className="btn btn--flame nav__sheet-cta" href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>
            Contact Us
          </a>
        </div>
      )}
    </header>
  )
}
