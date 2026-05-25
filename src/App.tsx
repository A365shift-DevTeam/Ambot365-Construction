import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsShowcase from './components/ProjectsShowcase';
import ProcessTimeline from './components/ProcessTimeline';
import Testimonials from './components/Testimonials';
import ContactSection from './components/ContactSection';
import HeroBackgroundFrames from './components/HeroBackgroundFrames';

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [activeStage, setActiveStage] = useState(0);
  const [renderMode, setRenderMode] = useState<'wireframe' | 'xray' | 'thermal' | 'solid' | 'hologram'>('solid');
  const [focusedServiceId, setFocusedServiceId] = useState<string | null>(null);
  const [focusedProjectId, setFocusedProjectId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const progress = window.scrollY / docHeight;
      setScrollProgress(progress);

      const sections = ['hero', 'about', 'services', 'projects', 'process', 'testimonials', 'contact'];
      let currentSelection = 'hero';

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
            currentSelection = section;
          }
        }
      }

      setActiveSection(currentSelection);

      if (currentSelection === 'hero') {
        setActiveStage(0);
      } else if (currentSelection === 'about') {
        setActiveStage(1);
      } else if (currentSelection === 'services') {
        setActiveStage(2);
      } else if (currentSelection === 'testimonials') {
        setActiveStage(3);
      } else if (currentSelection === 'contact') {
        setActiveStage(4);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectStage = (stageIndex: number, progressGoal: number) => {
    setActiveStage(stageIndex);
    const targetSection = stageIndex === 0 ? 'hero' : stageIndex === 1 ? 'about' : stageIndex === 2 ? 'services' : stageIndex === 3 ? 'testimonials' : 'contact';
    handleNavigate(targetSection);
  };

  const handleSelectRenderMode = (mode: typeof renderMode, serviceId: string) => {
    setRenderMode(mode);
    setFocusedServiceId(serviceId);
    setTimeout(() => setFocusedServiceId(null), 1500);
  };

  const handleFocusProject = (projectId: string | null) => {
    setFocusedProjectId(projectId);
    setTimeout(() => setFocusedProjectId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-zinc-900 selection:bg-brand-orange/20 selection:text-zinc-900 font-sans overflow-x-clip antialiased">
      {/* BACKGROUND GRAPHIC BLUEPRINT & GRID DECOR */}
      <div className="fixed inset-0 blueprint-grid opacity-25 pointer-events-none z-0" />
      <div className="fixed inset-0 blueprint-grid-fine opacity-30 pointer-events-none z-0" />
      <div className="fixed inset-0 bg-radial-[at_bottom_center] from-brand-orange/5 via-transparent to-transparent pointer-events-none z-0 decoration-none" />

      <Navbar currentSection={activeSection} onNavigate={handleNavigate} />

      <div className="relative z-10 w-full">

        {/* HERO — scroll-driven frame animation only */}
        <section id="hero" className="relative h-[300vh] w-full">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <HeroBackgroundFrames />
          </div>
        </section>

        <AboutSection />
        <ServicesSection onSelectRenderMode={handleSelectRenderMode} focusedServiceId={focusedServiceId} />
        <ProjectsShowcase onFocusProject={handleFocusProject} focusedProjectId={focusedProjectId} />
        <ProcessTimeline onSelectStage={handleSelectStage} activeStage={activeStage} />
        <Testimonials />
        <ContactSection />

      </div>

      {/* FOOTER */}
      <footer className="w-full bg-zinc-50 border-t border-zinc-200 py-12 px-6 relative z-10 text-zinc-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-brand-orange node-pulse" />
            <span className="font-display font-medium text-xs text-zinc-600 tracking-widest uppercase">
              Ambot365 Engineering Group &mdash; Structural Mastery
            </span>
          </div>

          <div className="flex gap-4 font-mono text-[9px] text-zinc-500 uppercase">
            <span>ISO 19655 BIM</span>
            <span>・</span>
            <span>OSHA Certified</span>
            <span>・</span>
            <span>LEED Platinum v4</span>
          </div>

          <p className="font-mono text-[9px] text-zinc-500 text-center md:text-right">
            © 2026 AMBOT365 GROUP. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
}
