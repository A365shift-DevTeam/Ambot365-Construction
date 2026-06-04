import React, { useState, useEffect } from 'react';
import { Menu, X, Hammer, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ currentSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'About Us', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Projects', id: 'projects' },
    { name: 'Our Process', id: 'process' },
    { name: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  const inHero = currentSection === 'hero';

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 px-4 md:px-8 py-4 ${
        scrolled ? 'pt-3 pb-3' : 'pt-6 pb-4'
      } ${inHero ? 'opacity-0 pointer-events-none -translate-y-3' : 'opacity-100 translate-y-0'}`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-500 flex items-center justify-between px-6 py-3 border ${
          scrolled
            ? 'glass-panel border-zinc-200/80 bg-white/70 shadow-lg translate-y-0 text-zinc-950'
            : 'bg-transparent border-transparent text-zinc-950'
        }`}
      >
        {/* LOGO BRAND */}
        <div
          onClick={() => handleLinkClick('hero')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative flex items-center justify-center w-9 h-9 rounded-lg overflow-hidden shadow-md group-hover:shadow-brand-orange/20 transition-all">
            <img id="logo-icon" src="/favicon.png" alt="Ambot365 Logo" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-sm tracking-[0.18em] uppercase text-zinc-950 group-hover:text-brand-orange transition-colors">
              Ambot365
            </span>
            <span className="font-mono text-[8px] text-zinc-500 tracking-[0.25em] -mt-1 uppercase">
              CONSTRUCTION
            </span>
          </div>
        </div>

        {/* DESKTOP PAGES NAV */}
        <div className="hidden lg:flex items-center gap-1.5 bg-zinc-200/50 p-1 rounded-xl border border-zinc-200/80">
          {navLinks.map((link) => {
            const isActive = currentSection === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-2 font-display text-xs font-medium uppercase tracking-wider rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'bg-brand-orange text-white shadow-md shadow-brand-orange/20 font-semibold'
                    : 'text-zinc-600 hover:text-zinc-900 hover:bg-white/60'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </div>

        {/* CTA INITIATE PROJECT BUTTON */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="flex flex-col items-end font-mono text-[9px] text-zinc-500">
            <span className="text-zinc-700 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" /> +91 987654321
            </span>
            <span>connect@ambot365.in</span>
          </div>

          <button
            id="nav-cta-start-project"
            onClick={() => handleLinkClick('contact')}
            className="relative px-5 py-2.5 rounded-lg bg-white border border-brand-orange/30 hover:border-brand-orange hover:shadow-lg hover:shadow-brand-orange/10 group flex items-center gap-2 transition-all cursor-pointer"
          >
            <span className="font-display text-xs font-semibold uppercase tracking-wider text-brand-orange group-hover:text-amber-600">
              Request Consultation
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 text-brand-orange group-hover:text-amber-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </button>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <div className="flex lg:hidden items-center gap-3">
          <button
            id="nav-cta-start-project-mobile"
            onClick={() => handleLinkClick('contact')}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-brand-orange to-amber-500 font-display text-[10px] font-bold uppercase tracking-wider text-white flex items-center gap-1"
          >
            Inquire
          </button>

          <button
            id="mobile-nav-toggle"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 rounded-lg text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 transition-colors border border-zinc-200"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE COLLAPSIBLE DRAWER MENU */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-white/98 backdrop-blur-xl z-40 transition-all duration-500 lg:hidden flex flex-col justify-between px-6 pt-24 pb-8 ${
          isOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

        <div className="flex flex-col gap-3 relative z-10">
          <div className="h-[1px] bg-zinc-200 mb-2" />
          {navLinks.map((link, idx) => {
            const isActive = currentSection === link.id;
            return (
              <button
                key={link.id}
                id={`mobile-nav-link-${link.id}`}
                onClick={() => handleLinkClick(link.id)}
                className={`w-full py-4 px-3 text-left font-display text-lg tracking-wider uppercase border-b border-zinc-200 flex items-center justify-between ${
                  isActive ? 'text-brand-orange font-bold font-display' : 'text-zinc-600 hover:text-zinc-950'
                }`}
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <span>{link.name}</span>
                <span className="font-mono text-xs text-zinc-400">0{idx + 1}</span>
              </button>
            );
          })}
        </div>

        <div className="relative z-10 flex flex-col gap-4">
          <div className="h-[1px] bg-zinc-200" />
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-zinc-600 font-mono text-[10px]">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <div>
                <p className="text-zinc-950 font-bold leading-none">ISO 9001:2026</p>
                <p className="text-zinc-400 mt-0.5">Safety Compliance</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-zinc-600 font-mono text-[10px]">
              <Cpu className="w-4 h-4 text-brand-orange" />
              <div>
                <p className="text-zinc-950 font-bold leading-none">BIM & LEED Platinum</p>
                <p className="text-zinc-400 mt-0.5">Industry Certified</p>
              </div>
            </div>
          </div>
          <div className="text-center font-mono text-[8px] text-zinc-400 uppercase tracking-widest mt-2">
            © 2026 AMBOT365 CONSTRUCTION GROUP. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </nav>
  );
}
