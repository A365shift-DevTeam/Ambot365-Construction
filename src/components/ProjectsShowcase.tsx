import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Ruler, Building2, Coins, MapPin, ArrowUpRight } from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectsProps {
  onFocusProject: (projectId: string | null) => void;
  focusedProjectId: string | null;
}

export default function ProjectsShowcase({ onFocusProject, focusedProjectId }: ProjectsProps) {
  const [activeTab, setActiveTab] = useState<'apollo' | 'ares' | 'cronos'>('apollo');

  const projects: ProjectItem[] = [
    {
      id: "apollo", title: "Apollo Spire", category: "Supertall / Mixed-Use",
      location: "Geneva, Switzerland", completionYear: "2026",
      height: "432 m", floors: "102", investment: "€850M",
      description: "A 432-metre composite steel and concrete tower founded on 42-metre-deep rock sockets. 102 storeys of Grade-A office, residences, and observatory. The tallest structure in the Alpine region.",
      blueprintColor: "rgba(184,115,51,0.3)"
    },
    {
      id: "ares", title: "Ares Research Vertex", category: "Research & Aerospace",
      location: "Houston, Texas", completionYear: "2025",
      height: "280 m", floors: "64", investment: "$420M",
      description: "Cantilevered research campus for aerospace and energy clients. Achieved 102% net-zero performance through integrated solar and geothermal systems. Structural steel diagrid engineered for 160 mph wind.",
      blueprintColor: "rgba(184,115,51,0.3)"
    },
    {
      id: "cronos", title: "Cronos Eco-Citadel", category: "Sustainable Campus",
      location: "Singapore", completionYear: "2026",
      height: "190 m", floors: "45", investment: "$340M",
      description: "Asia’s highest performing biophilic office tower. Double-skin ventilated façade, on-site 3.2 MW wind generation, and 42% reduction in embodied carbon versus baseline through mass-timber hybrid transfer structure.",
      blueprintColor: "rgba(184,115,51,0.3)"
    }
  ];

  const activeProject = projects.find(p => p.id === activeTab) || projects[0];

  return (
    <section id="projects" className="bg-[#F8F7F4] border-b border-[#E6E4DE] py-14 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-y-4 sm:gap-y-6 mb-8 sm:mb-11">
          <div>
            <div className="text-xs font-medium tracking-[0.2em] text-[#B87333]">SELECT LANDMARKS</div>
            <h2 className="display-lg text-[32px] sm:text-[44px] md:text-[58px] tracking-[-2px] sm:tracking-[-2.6px] md:tracking-[-3.2px] leading-none mt-2 sm:mt-3">Signature projects.<br />Global impact.</h2>
          </div>
          <div className="text-base sm:text-lg md:text-xl text-[#0B111F]/70 max-w-md">Three projects that demonstrate our capability at the extreme end of complexity, scale, and sustainability ambition.</div>
        </div>

        <div className="flex gap-1.5 sm:gap-2 mb-6 sm:mb-8 flex-wrap">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => { setActiveTab(p.id as any); onFocusProject(p.id); }}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm transition border ${activeTab === p.id ? 'bg-[#0B111F] text-white border-[#0B111F]' : 'border-[#E6E4DE] hover:bg-white text-[#0B111F]/70'}`}
            >
              {p.title}
            </button>
          ))}
        </div>

        <motion.div
          key={activeProject.id}
          initial={{ opacity: 0.6, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          className="border border-[#E6E4DE] bg-white rounded-2xl sm:rounded-3xl overflow-hidden"
        >
          <div className="px-5 sm:px-9 pt-5 sm:pt-8 pb-4 sm:pb-7 border-b border-[#E6E4DE] flex flex-col sm:flex-row sm:flex-wrap justify-between gap-y-1 sm:gap-y-2 items-start sm:items-center bg-[#F8F7F4]">
            <div>
              <div className="font-medium text-base sm:text-xl tracking-tight">{activeProject.title}</div>
              <div className="text-xs sm:text-sm text-[#0B111F]/50 mt-px">{activeProject.category}</div>
            </div>
            <div className="text-xs sm:text-sm font-mono text-[#0B111F]/50">{activeProject.location} — {activeProject.completionYear}</div>
          </div>

          <div className="p-5 sm:p-9 md:p-12 grid md:grid-cols-5 gap-x-6 sm:gap-x-9 gap-y-6 sm:gap-y-9 text-[14px] sm:text-[15px]">
            <div className="md:col-span-3 text-[#0B111F]/80 leading-relaxed text-[14px] sm:text-[15.5px] pr-2">
              {activeProject.description}
            </div>

            <div className="md:col-span-2 grid grid-cols-2 gap-x-5 sm:gap-x-8 gap-y-5 sm:gap-y-8 text-sm pt-1">
              {[
                { icon: Ruler, label: "HEIGHT", value: activeProject.height },
                { icon: Building2, label: "FLOORS", value: activeProject.floors },
                { icon: Coins, label: "INVESTMENT", value: activeProject.investment },
                { icon: MapPin, label: "LOCATION", value: activeProject.location.split(',')[0] },
              ].map((item, idx) => (
                <div key={idx} className="border-l-2 border-[#B87333] pl-3 sm:pl-5">
                  <div className="uppercase text-[10px] sm:text-xs tracking-[1.5px] text-[#0B111F]/45">{item.label}</div>
                  <div className="mt-1 font-semibold tracking-tight text-lg sm:text-xl text-[#0B111F]">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-[#E6E4DE] px-5 sm:px-9 py-4 sm:py-5 bg-[#F8F7F4] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm">
            <div className="text-[#0B111F]/60 text-xs sm:text-sm">View project documentation and live digital twin available under NDA.</div>
            <button onClick={() => onFocusProject(activeProject.id)} className="flex items-center gap-2 text-[#B87333] font-medium tracking-wider text-xs whitespace-nowrap">
              HIGHLIGHT IN VIEWER <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
