import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface EnterpriseNavbarProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

const navLinks = [
  { name: 'About', id: 'about' },
  { name: 'Capabilities', id: 'services' },
  { name: 'Landmarks', id: 'projects' },
  { name: 'Methodology', id: 'process' },
];

export default function EnterpriseNavbar({ currentSection, onNavigate }: EnterpriseNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  const isHero = currentSection === 'hero';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
          isHero && !scrolled 
            ? 'bg-white/70 backdrop-blur-xl' 
            : 'bg-white/95 backdrop-blur-xl border-b border-[#E6E4DE]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex h-20 items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded bg-[#B87333] flex items-center justify-center">
              <span className="text-white font-bold text-xl tracking-[-1.5px] leading-none mt-0.5">A</span>
            </div>
            <div className="flex flex-col justify-center -space-y-0.5">
              <div className="font-display font-semibold tracking-[0.18em] text-[#0B111F] text-sm group-hover:text-[#B87333] transition-colors">AMBOT365</div>
              <div className="text-[9px] text-[#0B111F]/50 tracking-[0.22em] font-medium">ENGINEERING</div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-9 text-sm font-medium tracking-[0.01em]">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`transition-colors hover:text-[#B87333] ${
                  currentSection === link.id ? 'text-[#B87333]' : 'text-[#0B111F]/70'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Right side CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('contact')}
              className="hidden md:flex items-center gap-2 text-sm font-semibold px-5 h-10 rounded-full border border-[#C9C5B8] hover:bg-[#0B111F] hover:text-white text-[#0B111F] transition-all tracking-widest"
            >
              REQUEST PROPOSAL
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className="flex items-center gap-2 bg-[#B87333] hover:bg-[#8B5E3C] active:bg-[#6F4930] transition-colors text-white px-5 h-10 rounded-full text-sm font-semibold tracking-wider"
            >
              BEGIN PROJECT <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 text-white/80 hover:text-white"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[70] bg-white md:hidden pt-20 px-6">
          <div className="flex flex-col gap-2 text-xl font-medium tracking-tight py-8">
            {[...navLinks, { name: 'Contact', id: 'contact' }].map((link, idx) => (
              <button
                key={idx}
                onClick={() => handleLinkClick(link.id)}
                className="text-left py-5 border-b border-[#E6E4DE] text-[#0B111F] active:text-[#B87333]"
              >
                {link.name}
              </button>
            ))}
          </div>
          <div className="pt-6 text-xs text-[#0B111F]/50 tracking-widest">
            AMBOT365 ENGINEERING GROUP<br />© {new Date().getFullYear()}. ALL RIGHTS RESERVED.
          </div>
        </div>
      )}
    </>
  );
}
