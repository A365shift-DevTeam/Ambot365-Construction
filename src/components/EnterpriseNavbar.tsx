import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { useLenis } from 'lenis/react';

interface EnterpriseNavbarProps {
  currentSection: string;
  onNavigate: (sectionId: string) => void;
}

const navLinks = [
  { name: 'About', id: 'about' },
  { name: 'Capabilities', id: 'services' },
  { name: 'Methodology', id: 'process' },
  { name: 'Contact', id: 'contact' },
];

export default function EnterpriseNavbar({ currentSection, onNavigate }: EnterpriseNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [heroFramesActive, setHeroFramesActive] = useState(true);

  const checkHeroStatus = () => {
    if (typeof window === 'undefined') return;
    const hero = document.getElementById('hero');
    if (!hero) {
      setHeroFramesActive(false);
      return;
    }
    const rect = hero.getBoundingClientRect();
    // Hero frames are actively displayed until the bottom of hero scrolls past the viewport
    const isHeroScrubbing = rect.bottom > window.innerHeight * 0.45 && rect.top <= 0;
    const isAtPageTop = window.scrollY < 20;
    const active = isAtPageTop || isHeroScrubbing;
    setHeroFramesActive((prev) => (prev === active ? prev : active));
  };

  useLenis(checkHeroStatus, [], 0);

  useEffect(() => {
    checkHeroStatus();
    window.addEventListener('scroll', checkHeroStatus, { passive: true });
    window.addEventListener('resize', checkHeroStatus);
    return () => {
      window.removeEventListener('scroll', checkHeroStatus);
      window.removeEventListener('resize', checkHeroStatus);
    };
  }, []);

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  const isTransparent = heroFramesActive;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 h-[var(--nav-height)] ${
          isTransparent
            ? 'bg-transparent border-transparent shadow-none'
            : 'bg-white/92 backdrop-blur-xl border-b border-[#E6E4DE] shadow-xs'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex h-full items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleLinkClick('hero')} 
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-7 h-7 rounded-md overflow-hidden shrink-0">
              <img src="/favicon.png" alt="Ambot365 Logo" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col justify-center -space-y-0.5">
              <div className={`font-display font-semibold tracking-[0.18em] text-xs sm:text-[13px] transition-colors ${
                isTransparent 
                  ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.6)] group-hover:text-[#B87333]' 
                  : 'text-[#0B111F] group-hover:text-[#B87333]'
              }`}>
                AMBOT365
              </div>
              <div className={`text-[8px] sm:text-[9px] tracking-[0.22em] font-medium transition-colors ${
                isTransparent 
                  ? 'text-white/70 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]' 
                  : 'text-[#0B111F]/50'
              }`}>
                CONSTRUCTION
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7 text-xs sm:text-[13px] font-medium tracking-[0.01em]">
            {navLinks.map(link => {
              const isActive = currentSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`transition-colors py-1 ${
                    isActive
                      ? 'text-[#B87333] font-semibold'
                      : isTransparent
                        ? 'text-white/80 hover:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                        : 'text-[#0B111F]/70 hover:text-[#B87333]'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </div>

          {/* Right side CTAs */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => handleLinkClick('contact')}
              className={`hidden md:flex items-center gap-1.5 text-xs font-semibold px-4 h-8 rounded-full border transition-all tracking-wider ${
                isTransparent
                  ? 'border-white/30 text-white hover:bg-white/15 hover:border-white backdrop-blur-xs drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]'
                  : 'border-[#C9C5B8] text-[#0B111F] hover:bg-[#0B111F] hover:text-white'
              }`}
            >
              REQUEST PROPOSAL
            </button>

            <button
              onClick={() => handleLinkClick('contact')}
              className="flex items-center gap-1 bg-[#B87333] hover:bg-[#8B5E3C] active:bg-[#6F4930] transition-colors text-white px-3 sm:px-4 h-8 rounded-full text-xs font-semibold tracking-wider shadow-sm"
            >
              <span className="hidden sm:inline">BEGIN PROJECT</span>
              <span className="sm:hidden">START</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className={`md:hidden p-1.5 rounded-md transition-colors ${
                isTransparent
                  ? 'text-white hover:text-white/80 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)]'
                  : 'text-[#0B111F]/80 hover:text-[#0B111F]'
              }`}
              aria-label="Toggle Navigation"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-[70] bg-[#0B111F]/95 backdrop-blur-2xl md:hidden pt-16 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200">
          <div>
            <div className="flex items-center justify-between py-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded overflow-hidden">
                  <img src="/favicon.png" alt="Ambot365 Logo" className="w-full h-full object-cover" />
                </div>
                <div className="font-display font-semibold tracking-[0.18em] text-white text-xs">AMBOT365</div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="p-1.5 text-white/80 hover:text-white"
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-1 text-base font-medium tracking-tight py-5">
              {navLinks.map((link, idx) => (
                <button
                  key={idx}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left py-3 border-b border-white/5 transition-colors ${
                    currentSection === link.id ? 'text-[#B87333] font-semibold' : 'text-white/85 active:text-[#B87333]'
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>

            <div className="pt-3 flex flex-col gap-2.5">
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-2.5 rounded-full bg-[#B87333] text-white text-xs font-semibold tracking-wider text-center"
              >
                BEGIN PROJECT
              </button>
              <button
                onClick={() => handleLinkClick('contact')}
                className="w-full py-2.5 rounded-full border border-white/20 text-white text-xs font-semibold tracking-wider text-center"
              >
                REQUEST PROPOSAL
              </button>
            </div>
          </div>

          <div className="pt-4 text-[10px] text-white/40 tracking-widest uppercase">
            AMBOT365 CONSTRUCTION GROUP<br />© {new Date().getFullYear()}. ALL RIGHTS RESERVED.
          </div>
        </div>
      )}
    </>
  );
}
