import React, { useState, useEffect } from 'react';
import EnterpriseNavbar from './components/EnterpriseNavbar';
import EnterpriseFramesHero from './components/EnterpriseFramesHero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProcessTimeline from './components/ProcessTimeline';
import ContactSection from './components/ContactSection';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeStage, setActiveStage] = useState(0);
  const [renderMode, setRenderMode] = useState<'wireframe' | 'xray' | 'thermal' | 'solid' | 'hologram'>('solid');
  const [focusedServiceId, setFocusedServiceId] = useState<string | null>(null);

  // Scroll tracking & active section detection
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = window.scrollY / docHeight;
      setScrollProgress(progress);

      const sections = ['hero', 'contact', 'about', 'services', 'process'];
      let currentSelection = 'hero';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.38 && rect.bottom >= window.innerHeight * 0.32) {
            currentSelection = section;
          }
        }
      }

      setActiveSection(currentSelection);

      // Subtle stage mapping
      if (currentSelection === 'hero') setActiveStage(0);
      else if (currentSelection === 'about') setActiveStage(1);
      else if (currentSelection === 'services') setActiveStage(2);
      else if (currentSelection === 'process') setActiveStage(3);
      else if (currentSelection === 'contact') setActiveStage(4);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const offset = sectionId === 'hero' ? 0 : 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  const handleSelectStage = (stageIndex: number) => {
    setActiveStage(stageIndex);
  };

  const handleSelectRenderMode = (mode: typeof renderMode, serviceId: string) => {
    setRenderMode(mode);
    setFocusedServiceId(serviceId);
    // Briefly flash the 3D viewer focus
    setTimeout(() => setFocusedServiceId(null), 1600);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#0B111F] selection:bg-[#B87333] selection:text-white font-sans overflow-x-clip antialiased">
      {/* Very subtle site-wide texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025] bg-[radial-gradient(#0B111F_0.5px,transparent_1px)] bg-[length:4px_4px]" />

      <EnterpriseNavbar currentSection={activeSection} onNavigate={handleNavigate} />

      {/* ==================== HERO — FRAME SEQUENCE ==================== */}
      <EnterpriseFramesHero onNavigate={handleNavigate} />

      {/* ==================== CONTACT / ESTIMATOR ==================== */}
      <ContactSection />

      {/* ==================== ABOUT ==================== */}
      <AboutSection />

      {/* ==================== CAPABILITIES ==================== */}
      <ServicesSection 
        onSelectRenderMode={handleSelectRenderMode} 
        focusedServiceId={focusedServiceId} 
      />

      {/* ==================== METHODOLOGY + DIGITAL TWIN ==================== */}
      <ProcessTimeline 
        onSelectStage={handleSelectStage} 
        activeStage={activeStage} 
      />

      {/* ==================== ENTERPRISE FOOTER (Light) ==================== */}
      <footer className="bg-[#F8F7F4] border-t border-[#E6E4DE] text-[#0B111F]/70 pt-12 sm:pt-16 pb-7 sm:pb-9 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 grid sm:grid-cols-2 md:grid-cols-12 gap-y-8 sm:gap-y-12">
          <div className="sm:col-span-2 md:col-span-5">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-7 h-7 rounded bg-[#B87333] flex items-center justify-center text-white text-lg font-bold tracking-[-1.5px]">A</div>
              <div className="font-display text-[#0B111F] tracking-[0.2em] text-xs sm:text-sm">AMBOT365 CONSTRUCTION GROUP</div>
            </div>
            <div className="max-w-xs text-[#0B111F]/60 text-[13px] sm:text-sm">
              A global leader in complex structures, infrastructure, and mission-critical facilities.
            </div>
          </div>

          <div className="md:col-span-3 text-sm space-y-1.5">
            <div className="text-[#0B111F]/40 uppercase tracking-widest text-xs mb-2 sm:mb-3">OFFICES</div>
            <div>Coimbatore</div>
          </div>

          <div className="md:col-span-4 text-sm">
            <div className="text-[#0B111F]/40 uppercase tracking-widest text-xs mb-2 sm:mb-3">CONTACT</div>
            <div className="text-[#0B111F]">+91 97509 45792</div>
            <div>Connect@ambot365.in</div>
            <div className="mt-3 sm:mt-4 text-[11px] sm:text-[12px] text-[#0B111F]/40">For RFPs and confidential briefings, contact our Director of Business Development.</div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 mt-10 sm:mt-16 pt-6 sm:pt-9 border-t border-[#E6E4DE] flex flex-col md:flex-row gap-y-3 sm:gap-y-2 justify-between text-[10px] sm:text-xs tracking-widest text-[#0B111F]/50">
          <div>© {new Date().getFullYear()} AMBOT365 CONSTRUCTION GROUP.</div>
          <div className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-1">
            <span>PRIVACY</span>
            <span>LEGAL</span>
            <span className="hidden sm:inline">MODERN SLAVERY STATEMENT</span>
            <span className="hidden sm:inline">SUSTAINABILITY REPORT 2026</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
