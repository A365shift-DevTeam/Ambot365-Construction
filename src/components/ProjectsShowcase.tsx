import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ruler, Sparkles, Coins, Locate, Eye } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsProps {
  onFocusProject: (projectId: string | null) => void;
  focusedProjectId: string | null;
}

export default function ProjectsShowcase({ onFocusProject, focusedProjectId }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState<'apollo' | 'ares' | 'cronos'>('apollo');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isSliding, setIsSliding] = useState(false);

  const projects: ProjectItem[] = [
    {
      id: "apollo",
      title: "The Apollo Spire",
      category: "Metropolitan Supertall",
      location: "Geneva, Switzerland",
      completionYear: "2026",
      height: "432 Metres",
      floors: "102 Levels",
      investment: "€850 Million",
      description: "A 432-metre supertall tower built on a composite steel superstructure with post-tensioned floor slabs. Foundations anchored to Alpine granite bedrock at 42-metre depth via 800mm CFA piles designed to carry 180,000 kN vertical load.",
      blueprintColor: "rgba(255, 0, 81, 0.3)"
    },
    {
      id: "ares",
      title: "Ares Research Vertex",
      category: "Aerospace Core Structure",
      location: "Houston, USA",
      completionYear: "2025",
      height: "280 Metres",
      floors: "64 Levels",
      investment: "$420 Million",
      description: "A 280-metre cantilever research institute with carbon-reinforced concrete core and structural steel diagrid facade. The first building in Houston to achieve 100% net energy generation through integrated solar thermal light-well systems.",
      blueprintColor: "rgba(245, 158, 11, 0.3)"
    },
    {
      id: "cronos",
      title: "Cronos Eco-Citadel",
      category: "Sustainable Smart Campus",
      location: "Singapore",
      completionYear: "2026",
      height: "190 Metres",
      floors: "45 Levels",
      investment: "$340 Million",
      description: "A 190-metre biophilic tower with a double-skin ventilated curtain wall facade, post-tensioned transfer slabs at levels 15 and 32, and high-velocity wind turbine arrays generating 3.2MW of on-site renewable power.",
      blueprintColor: "rgba(6, 182, 212, 0.3)"
    }
  ];

  const activeProject = projects.find(p => p.id === activeTab) || projects[0];

  const handleSliderMove = (clientX: number, containerRect: DOMRect) => {
    const x = clientX - containerRect.left;
    setSliderPosition(Math.max(0, Math.min(100, (x / containerRect.width) * 100)));
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) handleSliderMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect());
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.buttons === 1 || isSliding) handleSliderMove(e.clientX, e.currentTarget.getBoundingClientRect());
  };

  const specs = [
    { icon: Ruler,    label: 'Height',          value: activeProject.height },
    { icon: Sparkles, label: 'Floors',           value: activeProject.floors },
    { icon: Coins,    label: 'Total Investment', value: activeProject.investment },
    { icon: Locate,   label: 'Location',         value: activeProject.location },
  ];

  return (
    <section id="projects" className="relative bg-white overflow-hidden border-t border-zinc-200">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 relative z-10">

        {/* ── Header + tabs ──────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-orange" />
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">
                Featured Projects
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-zinc-950 leading-[1.1] tracking-tight">
              Landmark<br />
              <span className="text-brand-orange">Structures</span>
            </h2>
          </div>

          <div className="flex flex-col gap-1 lg:items-end">
            {projects.map((proj, i) => (
              <button
                key={proj.id}
                id={`project-tab-btn-${proj.id}`}
                onClick={() => { setActiveTab(proj.id as any); onFocusProject(proj.id); }}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl font-display font-bold text-xs uppercase tracking-widest transition-all cursor-pointer ${
                  activeTab === proj.id
                    ? 'bg-zinc-950 text-white'
                    : 'text-zinc-400 hover:text-zinc-950'
                }`}
              >
                <span className="font-mono text-[9px]">0{i + 1}</span>
                <span>{proj.title}</span>
                {activeTab === proj.id && <span className="w-1.5 h-1.5 rounded-full bg-brand-orange node-pulse" />}
              </button>
            ))}
          </div>
        </div>

        {/* ── Main panels ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT: Project spec sheet */}
          <div className="lg:col-span-5">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="h-full flex flex-col border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50">
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.25em]">
                  {activeProject.category}
                </span>
              </div>

              <div className="px-8 pt-8 pb-6 border-b border-zinc-100">
                <h3 className="font-display font-bold text-3xl text-zinc-950 tracking-tight leading-tight mb-4">
                  {activeProject.title}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              <div className="grid grid-cols-2 divide-x divide-y divide-zinc-100 flex-1">
                {specs.map(({ icon: Icon, label, value }, i) => (
                  <div key={i} className="px-6 py-5 flex flex-col gap-2">
                    <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-brand-orange" />
                      {label}
                    </span>
                    <span className="font-display font-bold text-lg text-zinc-950 tracking-tight leading-none">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Blueprint vs Render slider */}
          <div className="lg:col-span-7">
            <div
              id="before-after-slider-container"
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden select-none shadow-xl border border-zinc-200"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={() => setIsSliding(true)}
              onMouseUp={() => setIsSliding(false)}
              onMouseLeave={() => setIsSliding(false)}
            >
              {/* BEFORE — blueprint wireframe */}
              <div className="absolute inset-0 bg-zinc-50 flex items-center justify-center p-8">
                <div className="absolute inset-0 blueprint-grid opacity-30 pointer-events-none" />
                <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-brand-orange/40" />
                <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-brand-orange/40" />
                <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-brand-orange/40" />
                <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-brand-orange/40" />
                <div className="w-full h-full opacity-70 flex items-center justify-center text-cyan-600">
                  <svg viewBox="0 0 400 450" className="w-[72%] h-auto" fill="none" stroke="currentColor" strokeWidth="1">
                    {/* Foundation */}
                    <line x1="80" y1="420" x2="320" y2="420" strokeWidth="2" />
                    <line x1="100" y1="420" x2="100" y2="410" />
                    <line x1="150" y1="420" x2="150" y2="410" />
                    <line x1="200" y1="420" x2="200" y2="410" />
                    <line x1="250" y1="420" x2="250" y2="410" />
                    <line x1="300" y1="420" x2="300" y2="410" />
                    {/* Main tower */}
                    <rect x="130" y="80" width="140" height="330" strokeWidth="1.5" />
                    {/* Floor lines */}
                    {[...Array(10)].map((_, i) => (
                      <line key={i} x1="130" y1={80 + i * 33} x2="270" y2={80 + i * 33} strokeDasharray="3,3" stroke="rgba(8,145,178,0.5)" />
                    ))}
                    {/* Window grid */}
                    <line x1="160" y1="80" x2="160" y2="410" stroke="rgba(8,145,178,0.4)" />
                    <line x1="200" y1="80" x2="200" y2="410" stroke="rgba(8,145,178,0.4)" />
                    <line x1="240" y1="80" x2="240" y2="410" stroke="rgba(8,145,178,0.4)" />
                    {/* Spire */}
                    <line x1="200" y1="80" x2="200" y2="20" strokeWidth="1.5" stroke="#d97706" />
                    <circle cx="200" cy="20" r="3" fill="#e05e00" />
                    {/* Dimension lines */}
                    <line x1="60" y1="80" x2="60" y2="410" stroke="#e05e00" strokeWidth="0.8" strokeDasharray="4,4" />
                    <polygon points="60,76 57,84 63,84" fill="#e05e00" />
                    <polygon points="60,414 57,406 63,406" fill="#e05e00" />
                    <line x1="50" y1="245" x2="55" y2="245" stroke="#e05e00" strokeWidth="0.8" />
                  </svg>
                </div>
                <span className="absolute bottom-5 left-6 font-mono text-[9px] text-zinc-500 uppercase tracking-widest bg-white px-2.5 py-1 rounded border border-zinc-200 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  Construction Drawing
                </span>
              </div>

              {/* AFTER — photorealistic render */}
              <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <div
                  className="absolute inset-y-0 left-0 flex items-end justify-center pb-10"
                  style={{ width: '100%', minWidth: '400px', background: 'linear-gradient(to bottom, #1c2b4a 0%, #243357 45%, #1a2540 80%, #111827 100%)' }}
                >
                  {/* Sky ambient glow */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 rounded-full pointer-events-none" style={{background: 'radial-gradient(ellipse, rgba(255,140,0,0.12) 0%, transparent 70%)'}} />

                  {/* Tower */}
                  <div className="relative flex flex-col items-center mb-6">
                    {/* Antenna */}
                    <div className="w-px h-16 bg-gradient-to-t from-zinc-400/80 to-transparent" />
                    <div className="w-1 h-3 rounded-full bg-brand-orange shadow-[0_0_12px_rgba(255,140,0,0.9)]" />

                    {/* Tower body */}
                    <div
                      className="relative w-28 h-72 overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(180,200,230,0.15) 0%, rgba(140,170,210,0.08) 50%, rgba(100,140,190,0.05) 100%)',
                        border: '1px solid rgba(180,210,255,0.2)',
                        boxShadow: 'inset 1px 0 0 rgba(255,255,255,0.08), 2px 0 20px rgba(0,0,0,0.4)'
                      }}
                    >
                      {/* Glass panel grid */}
                      <div className="absolute inset-0 grid grid-cols-4 gap-px p-px">
                        {[...Array(48)].map((_, i) => (
                          <div
                            key={i}
                            style={{
                              background: i % 11 === 0 ? 'rgba(255,255,255,0.12)' :
                                          i % 7  === 0 ? 'rgba(160,200,255,0.10)' :
                                          i % 3  === 0 ? 'rgba(120,170,230,0.07)' :
                                                         'rgba(80,120,180,0.04)',
                            }}
                          />
                        ))}
                      </div>
                      {/* Highlight streak */}
                      <div className="absolute top-0 left-4 w-px h-full bg-gradient-to-b from-white/25 via-white/08 to-transparent pointer-events-none" />
                      <div className="absolute top-0 left-6 w-px h-2/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
                      {/* Scanner line */}
                      <div className="absolute inset-x-0 h-px bg-brand-orange/60 shadow-[0_0_8px_rgba(255,140,0,0.5)] scanner-line pointer-events-none" />
                    </div>

                    {/* Podium */}
                    <div
                      className="w-40 h-5 rounded-sm"
                      style={{
                        background: 'linear-gradient(to right, rgba(255,255,255,0.04), rgba(255,255,255,0.10), rgba(255,255,255,0.04))',
                        borderTop: '1px solid rgba(180,210,255,0.15)',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
                      }}
                    />
                    {/* Ground reflection */}
                    <div className="w-44 h-2 mt-px opacity-20 rounded-full" style={{background: 'linear-gradient(to right, transparent, rgba(180,210,255,0.4), transparent)'}} />
                  </div>

                  <span className="absolute bottom-5 left-6 font-mono text-[9px] text-brand-orange uppercase tracking-widest bg-zinc-900/80 px-2.5 py-1 rounded border border-brand-orange/25 flex items-center gap-1.5 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange node-pulse" />
                    Architectural Render
                  </span>
                </div>
              </div>

              {/* Slider handle */}
              <div
                id="slider-divider-pole"
                className="absolute inset-y-0 z-30 cursor-ew-resize"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute inset-y-0 left-0 w-0.5 bg-brand-orange shadow-[0_0_8px_rgba(255,140,0,0.4)]" />
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-brand-orange border-2 border-white shadow-lg shadow-brand-orange/30 flex items-center justify-center hover:scale-110 transition-transform">
                  <Eye className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
