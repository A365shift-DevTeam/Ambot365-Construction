import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ruler, Sparkles, Coins, Locate, ArrowRight, Eye, ArrowUpRight } from 'lucide-react';
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
      height: "432 Meters",
      floors: "102 Levels",
      investment: "€850 Million",
      description: "An ultra-tall luxury residential and commercial spire utilizing composite structural steel and high-damping aerodynamic wind vents. Anchored directly into alpine granite foundations.",
      blueprintColor: "rgba(255, 0, 81, 0.3)"
    },
    {
      id: "ares",
      title: "Ares Research Vertex",
      category: "Aerospace Core Structure",
      location: "Houston, USA",
      completionYear: "2025",
      height: "280 Meters",
      floors: "64 Levels",
      investment: "$420 Million",
      description: "An innovative cantilever research institute crafted using carbon-reinforced concrete columns and active solar thermal light-well traps to generate 100% autonomous net power.",
      blueprintColor: "rgba(245, 158, 11, 0.3)"
    },
    {
      id: "cronos",
      title: "Cronos Eco-Citadel",
      category: "Sustainable Smart Campus",
      location: "Singapore",
      completionYear: "2026",
      height: "190 Meters",
      floors: "45 Levels",
      investment: "$340 Million",
      description: "A gorgeous biophilic smart skyscraper featuring double-skin facade gardens, internal smart humidity sensors, and high-velocity wind turbulence energy generation turbines.",
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

      {/* Giant ghosted section number */}
      <div className="absolute -top-8 right-0 font-display text-[20rem] leading-none text-zinc-950/[0.028] pointer-events-none select-none pr-4 z-0">
        03
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 relative z-10">

        {/* ── Header + project tabs ──────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-orange" />
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">
                Featured Projects — Expert Portfolio
              </span>
            </div>
            <h2 className="font-display text-6xl md:text-7xl lg:text-8xl text-zinc-950 leading-[0.88] tracking-tight">
              Landmark<br />
              <span className="text-brand-orange">Structural Design</span>
            </h2>
          </div>

          {/* Project tabs */}
          <div className="flex flex-col gap-1 lg:items-end">
            {projects.map((proj, i) => (
              <button
                key={proj.id}
                id={`project-tab-btn-${proj.id}`}
                onClick={() => { setActiveTab(proj.id as any); onFocusProject(proj.id); }}
                className={`group flex items-center gap-3 px-4 py-2.5 rounded-xl font-display text-xs uppercase tracking-widest transition-all cursor-pointer ${
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

          {/* LEFT: Spec sheet */}
          <div className="lg:col-span-5">
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="h-full flex flex-col border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm"
            >
              {/* Category header strip */}
              <div className="px-8 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.25em]">
                  {activeProject.category}
                </span>
                <span className="font-mono text-[9px] text-zinc-400">
                  REF #{activeProject.id.toUpperCase()}-{activeProject.completionYear}
                </span>
              </div>

              {/* Project name */}
              <div className="px-8 pt-8 pb-6 border-b border-zinc-100">
                <h3 className="font-display text-4xl md:text-5xl text-zinc-950 tracking-tight leading-none mb-4">
                  {activeProject.title}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed">
                  {activeProject.description}
                </p>
              </div>

              {/* Specs grid */}
              <div className="grid grid-cols-2 divide-x divide-y divide-zinc-100 flex-1">
                {specs.map(({ icon: Icon, label, value }, i) => (
                  <div key={i} className="px-6 py-5 flex flex-col gap-2">
                    <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-1.5">
                      <Icon className="w-3 h-3 text-brand-orange" />
                      {label}
                    </span>
                    <span className="font-display text-lg text-zinc-950 tracking-tight leading-none">
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-8 py-5 border-t border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-orange node-pulse" />
                  ENGINEERING FILE ACTIVE
                </div>
                <button
                  id={`focus-${activeProject.id}-canvas-btn`}
                  onClick={() => onFocusProject(activeProject.id)}
                  className="flex items-center gap-1.5 font-display text-[10px] uppercase tracking-widest text-brand-orange hover:text-zinc-950 transition-colors cursor-pointer"
                >
                  <span>Focus Viewport</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Before / after slider */}
          <div className="lg:col-span-7">
            <div
              id="before-after-slider-container"
              className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200 select-none shadow-xl"
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              onMouseDown={() => setIsSliding(true)}
              onMouseUp={() => setIsSliding(false)}
              onMouseLeave={() => setIsSliding(false)}
            >
              <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />

              {/* Corner marks */}
              <div className="absolute top-3 left-3 w-4 h-4 border-l-2 border-t-2 border-brand-orange/40" />
              <div className="absolute top-3 right-3 w-4 h-4 border-r-2 border-t-2 border-brand-orange/40" />
              <div className="absolute bottom-3 left-3 w-4 h-4 border-l-2 border-b-2 border-brand-orange/40" />
              <div className="absolute bottom-3 right-3 w-4 h-4 border-r-2 border-b-2 border-brand-orange/40" />

              {/* BEFORE — blueprint wireframe */}
              <div className="absolute inset-0 bg-zinc-50 flex items-center justify-center p-8">
                <div className="w-full h-full opacity-65 flex items-center justify-center text-cyan-600">
                  <svg viewBox="0 0 400 450" className="w-[72%] h-auto" fill="none" stroke="currentColor" strokeWidth="1">
                    <polygon points="120,380 200,340 280,380 200,420" strokeDasharray="3,3" />
                    <polygon points="120,280 200,240 280,280 200,320" />
                    <polygon points="120,180 200,140 280,180 200,220" />
                    <polygon points="140,80 200,50 260,80 200,110" />
                    <line x1="120" y1="380" x2="120" y2="180" strokeWidth="1.5" />
                    <line x1="200" y1="420" x2="200" y2="220" strokeWidth="1.5" />
                    <line x1="280" y1="380" x2="280" y2="180" strokeWidth="1.5" />
                    <line x1="200" y1="320" x2="200" y2="140" strokeWidth="1.5" />
                    <line x1="140" y1="180" x2="140" y2="80" strokeWidth="1.5" />
                    <line x1="260" y1="180" x2="260" y2="80" strokeWidth="1.5" />
                    <line x1="200" y1="50" x2="200" y2="10" stroke="#e05e00" />
                    <circle cx="200" cy="10" r="2.5" fill="#e05e00" />
                  </svg>
                </div>
                <span className="absolute bottom-5 left-6 font-mono text-[9px] text-zinc-500 uppercase tracking-widest bg-white px-2.5 py-1 rounded-lg border border-zinc-200 flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  Conceptual Blueprint
                </span>
              </div>

              {/* AFTER — finished render */}
              <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${sliderPosition}%` }}>
                <div className="absolute inset-y-0 left-0 bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center p-8" style={{ width: '100%', minWidth: '400px' }}>
                  <div className="absolute inset-0 blueprint-grid opacity-10 pointer-events-none" />

                  <div className="relative w-32 h-60 bg-white border border-zinc-300 rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-orange/15 via-transparent to-transparent pointer-events-none z-10" />
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex-1 border-b border-zinc-200/50 flex gap-1.5 p-1.5 justify-center">
                        <div className="w-1/3 h-full bg-zinc-100 rounded border border-zinc-200" />
                        <div className="w-1/2 h-full bg-cyan-50 rounded border border-cyan-200/60" />
                      </div>
                    ))}
                  </div>

                  <div className="w-40 h-4 mt-2 bg-zinc-300 border border-zinc-400 rounded flex items-center justify-center font-mono text-[7px] text-zinc-500">
                    BIM CERTIFIED
                  </div>

                  <span className="absolute bottom-5 left-6 font-mono text-[9px] text-brand-orange uppercase tracking-widest bg-white px-2.5 py-1 rounded-lg border border-brand-orange/25 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange node-pulse" />
                    Finished Render
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

              <div className="absolute top-4 right-8 z-20 font-mono text-[8px] text-zinc-400 bg-white px-2 py-1 rounded border border-zinc-200 uppercase tracking-wider shadow-sm">
                Drag to Inspect
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
