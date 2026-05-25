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
        <div className="w-full max-w-4xl mx-auto">
          {/* Project spec sheet */}
          <motion.div
            key={activeProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-col border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm"
          >
            <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.25em]">
                {activeProject.category}
              </span>
              <span className="font-mono text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                {activeProject.completionYear}
              </span>
            </div>

            <div className="px-8 pt-8 pb-6 border-b border-zinc-100">
              <h3 className="font-display font-bold text-3xl md:text-4xl text-zinc-950 tracking-tight leading-tight mb-5">
                {activeProject.title}
              </h3>
              <p className="text-zinc-600 text-sm md:text-base leading-relaxed max-w-3xl">
                {activeProject.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-zinc-100 bg-zinc-50/30">
              {specs.map(({ icon: Icon, label, value }, i) => (
                <div key={i} className="px-6 py-6 flex flex-col gap-2.5">
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] flex items-center gap-2">
                    <Icon className="w-3.5 h-3.5 text-brand-orange" />
                    {label}
                  </span>
                  <span className="font-display font-bold text-lg md:text-xl text-zinc-950 tracking-tight leading-none">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
