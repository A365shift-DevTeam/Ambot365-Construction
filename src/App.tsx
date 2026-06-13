import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import EnterpriseNavbar from './components/EnterpriseNavbar';
import EnterpriseFramesHero from './components/EnterpriseFramesHero';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsShowcase from './components/ProjectsShowcase';
import ProcessTimeline from './components/ProcessTimeline';
import ContactSection from './components/ContactSection';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeStage, setActiveStage] = useState(0);
  const [renderMode, setRenderMode] = useState<'wireframe' | 'xray' | 'thermal' | 'solid' | 'hologram'>('solid');
  const [focusedServiceId, setFocusedServiceId] = useState<string | null>(null);
  const [focusedProjectId, setFocusedProjectId] = useState<string | null>(null);

  // Scroll tracking & active section detection
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = window.scrollY / docHeight;
      setScrollProgress(progress);

      const sections = ['hero', 'about', 'services', 'projects', 'process', 'contact'];
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

  const handleFocusProject = (projectId: string | null) => {
    setFocusedProjectId(projectId);
    setTimeout(() => setFocusedProjectId(null), 2400);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#0B111F] selection:bg-[#B87333] selection:text-white font-sans overflow-x-clip antialiased">
      {/* Very subtle site-wide texture */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.025] bg-[radial-gradient(#0B111F_0.5px,transparent_1px)] bg-[length:4px_4px]" />

      <EnterpriseNavbar currentSection={activeSection} onNavigate={handleNavigate} />

      {/* ==================== HERO — FRAME SEQUENCE & CONTENT ==================== */}
      <EnterpriseFramesHero onNavigate={handleNavigate}>
        <div className="bg-[#F8F7F4] pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 md:pb-20 border-b border-[#E6E4DE]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
            <div className="max-w-4xl">
              <div className="inline-flex items-center px-3 sm:px-4 py-1 rounded-full bg-white border border-[#E6E4DE] text-[9px] sm:text-[10px] tracking-[0.2em] text-[#0B111F]/60 font-medium mb-4 sm:mb-6">
                25 YEARS OF PRECISION CONSTRUCTION
              </div>

              <h1 className="display-xl text-[36px] sm:text-[48px] md:text-[58px] lg:text-[76px] leading-[0.92] tracking-[-2px] sm:tracking-[-3px] md:tracking-[-4.2px] text-[#0B111F] mb-5 sm:mb-7">
                Ambot365<br />Construction 
              </h1>

              <p className="max-w-[520px] text-[14px] sm:text-[15.5px] text-[#0B111F]/70 leading-relaxed mb-6 sm:mb-9">
                We deliver complex buildings and infrastructure with exceptional technical rigor, 
                uncompromising safety, and a commitment to enduring quality across 35+ countries.
              </p>

              <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={() => handleNavigate('contact')}
                  className="btn-enterprise btn-enterprise-primary flex items-center justify-center gap-3 px-6 sm:px-8 h-11 sm:h-12 rounded-full text-xs sm:text-sm font-semibold tracking-wider shadow-sm"
                >
                  REQUEST A PROPOSAL
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleNavigate('projects')}
                  className="flex items-center justify-center gap-3 px-5 sm:px-7 h-11 sm:h-12 rounded-full border border-[#C9C5B8] hover:bg-white text-[#0B111F] text-xs sm:text-sm font-semibold tracking-wider transition-all"
                >
                  VIEW LANDMARK PROJECTS
                </button>
              </div>

              <div className="flex flex-wrap gap-x-5 sm:gap-x-8 gap-y-1 mt-8 sm:mt-10 text-[10px] sm:text-[11px] tracking-[0.16em] text-[#0B111F]/50 font-medium">
                <div>35+ COUNTRIES</div>
                <div>480M TALLEST DELIVERED</div>
                <div>ZERO LTI RECORD</div>
              </div>
            </div>
          </div>
        </div>
      </EnterpriseFramesHero>

      {/* ==================== TRUST / CREDENTIAL BAR ==================== */}
      <div className="border-b border-[#E6E4DE] bg-white py-4 sm:py-5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center justify-between gap-x-6 md:gap-x-10 gap-y-2 sm:gap-y-3 text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.22em] text-[#0B111F]/60 font-medium">
            <div className="flex items-center gap-2.5"><span className="text-[#B87333]">●</span> LEED PLATINUM</div>
            <div>ISO 9001 • ISO 45001 • ISO 14001</div>
            <div className="hidden sm:block">ENR TOP 50 GLOBAL CONTRACTORS</div>
            <div>0.00 LTI — 8.4M MAN-HOURS</div>
            <div className="hidden md:block">BREEAM OUTSTANDING • WELL GOLD</div>
          </div>
        </div>
      </div>

      {/* ==================== ABOUT — AUTHORITATIVE ==================== */}
      <AboutSection />

      {/* ==================== CAPABILITIES ==================== */}
      <ServicesSection 
        onSelectRenderMode={handleSelectRenderMode} 
        focusedServiceId={focusedServiceId} 
      />

      {/* ==================== LANDMARK PROJECTS ==================== */}
      <ProjectsShowcase 
        onFocusProject={handleFocusProject} 
        focusedProjectId={focusedProjectId} 
      />

      {/* ==================== METHODOLOGY + DIGITAL TWIN ==================== */}
      <ProcessTimeline 
        onSelectStage={handleSelectStage} 
        activeStage={activeStage} 
      />

      {/* ==================== DIGITAL CAPABILITIES (Light Enterprise) ==================== */}
      <section className="relative py-14 sm:py-16 md:py-20 lg:py-24 bg-white border-t border-[#E6E4DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid lg:grid-cols-12 gap-y-8 md:gap-y-12 gap-x-8 items-end">
            <div className="lg:col-span-5">
              <div className="uppercase tracking-[0.22em] text-[#B87333] text-xs font-medium mb-3 sm:mb-4">TECHNOLOGY</div>
              <h3 className="display-lg text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-none tracking-[-1.5px] sm:tracking-[-2px] md:tracking-[-2.6px] mb-4 sm:mb-6 text-[#0B111F]">Precision through<br />digital mastery.</h3>
            </div>
            <div className="lg:col-span-7 text-base sm:text-lg text-[#0B111F]/70 leading-relaxed max-w-3xl">
              Every project is delivered through a live digital twin. Our teams operate in a fully integrated BIM environment 
              with real-time structural simulation, 4D sequencing, and carbon accounting embedded from concept to commissioning.
            </div>
          </div>

          <div className="mt-10 sm:mt-14 grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 text-sm">
            {[
              { title: "Parametric Design", desc: "Generative structural optimization. 40% material reduction vs conventional design." },
              { title: "4D Construction Simulation", desc: "Sequence, logistics, and crane studies validated before first excavation." },
              { title: "Carbon & Lifecycle", desc: "Whole-building LCA and embodied carbon dashboards aligned to CSRD & SECR." }
            ].map((item, index) => (
              <div key={index} className="enterprise-card p-6 sm:p-8 rounded-2xl bg-[#F8F7F4] border border-[#E6E4DE]">
                <div className="text-[#B87333] font-semibold tracking-tight mb-2 sm:mb-3">{item.title}</div>
                <p className="text-[#0B111F]/70 leading-snug text-[13px] sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CONTACT / ESTIMATOR ==================== */}
      <ContactSection />

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
