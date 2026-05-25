import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Anchor, Scaling, Grid3x3, Layers, ShieldCheck } from 'lucide-react';
import { TimelineMilestone } from '../types';

interface ProcessTimelineProps {
  onSelectStage: (stageIndex: number, scrollProgressGoal: number) => void;
  activeStage: number;
}

export default function ProcessTimeline({ onSelectStage, activeStage }: ProcessTimelineProps) {
  const milestones: TimelineMilestone[] = [
    {
      id: 0,
      title: "Groundworks",
      phase: "01 / SITE PREPARATION & EXCAVATION",
      duration: "Weeks 01 – 12",
      details: "Bulk excavation to founding level, installation of temporary works and shoring, dewatering, and construction of reinforced concrete pile caps and ground beams. Site preparation for superstructure construction.",
      activeDepth: 0.1
    },
    {
      id: 1,
      title: "Structural Frame",
      phase: "02 / STRUCTURAL STEEL & CONCRETE FRAME",
      duration: "Weeks 13 – 32",
      details: "Erection of the primary structural frame — steel moment connections, concrete core walls, and composite floor beams. All works to structural engineer's drawings with full ITP inspection regime.",
      activeDepth: 0.4
    },
    {
      id: 2,
      title: "Floors & Services",
      phase: "03 / FLOOR SLABS & MEP ROUGH-IN",
      duration: "Weeks 33 – 48",
      details: "Post-tensioned composite floor slab construction and MEP rough-in installations. Electrical risers, mechanical ductwork routes, drainage stacks, and fire protection pipework installed per coordinated BIM models.",
      activeDepth: 0.65
    },
    {
      id: 3,
      title: "Envelope",
      phase: "04 / BUILDING ENVELOPE & FACADE",
      duration: "Weeks 49 – 62",
      details: "Installation of unitised curtain wall, cladding panels, and roofing systems. Air and water tightness testing to ATTMA standards. Completion of building envelope for internal fit-out to commence.",
      activeDepth: 0.82
    },
    {
      id: 4,
      title: "Fit-Out & Handover",
      phase: "05 / INTERNAL FIT-OUT & COMMISSIONING",
      duration: "Weeks 63 – 72",
      details: "Internal partitions, ceilings, finishes, and MEP commissioning. HVAC balancing, electrical testing, fire alarm and sprinkler commissioning, followed by formal snagging, owner walkthrough, and legal occupation sign-off.",
      activeDepth: 0.98
    }
  ];

  const stageStats = [
    { label: "Pile depth to bedrock", val: "42 Metres" },
    { label: "Steel alloy grade", val: "Grade S355" },
    { label: "Concrete mix design", val: "C50/60 RC" },
    { label: "Facade U-value target", val: "0.18 W/m²K" },
    { label: "Commissioning period", val: "8 Weeks" }
  ];

  const icons = [Anchor, Scaling, Grid3x3, Layers, ShieldCheck];
  const activeMilestone = milestones[activeStage] || milestones[0];
  const currentStat = stageStats[activeStage] || stageStats[0];

  return (
    <section id="process" className="relative bg-[#f9fafb] overflow-hidden border-t border-zinc-200">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 relative z-10">

        {/* ── Header ──────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-orange" />
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">
                How We Deliver
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-zinc-950 leading-[1.1] tracking-tight">
              Construction<br />
              <span className="text-brand-orange">Process</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-zinc-500 text-sm leading-relaxed">
              Select any phase to review structural milestones, material specifications, and quality hold points for that stage of the build programme.
            </p>
          </div>
        </div>

        {/* ── Timeline track ──────────────────────────── */}
        <div className="relative w-full mb-16 px-4">
          <div className="absolute top-[18px] left-[calc(4%+8px)] right-[calc(4%+8px)] h-[2px] bg-zinc-200 z-0 hidden md:block" />
          <div
            className="absolute top-[18px] left-[calc(4%+8px)] h-[2px] bg-brand-orange z-0 hidden md:block transition-all duration-700"
            style={{ width: `${(activeStage / (milestones.length - 1)) * 92}%` }}
          />

          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-8 relative z-10">
            {milestones.map((m) => {
              const isActive = activeStage === m.id;
              const isPast = m.id < activeStage;
              const IconComp = icons[m.id];

              return (
                <button
                  key={m.id}
                  id={`timeline-milestone-btn-${m.id}`}
                  onClick={() => onSelectStage(m.id, m.activeDepth)}
                  className="flex flex-col items-center text-center group cursor-pointer focus:outline-none gap-4"
                >
                  <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center transition-all duration-500 ${
                    isActive
                      ? 'bg-brand-orange border-brand-orange text-white shadow-[0_0_0_4px_rgba(255,140,0,0.15)] scale-110'
                      : isPast
                        ? 'bg-white border-brand-orange text-brand-orange'
                        : 'bg-white border-zinc-300 text-zinc-400 group-hover:border-zinc-400'
                  }`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className={`font-display font-bold text-xs uppercase tracking-wider transition-colors ${
                      isActive ? 'text-brand-orange' : isPast ? 'text-zinc-700' : 'text-zinc-400 group-hover:text-zinc-700'
                    }`}>
                      {m.title}
                    </span>
                    <span className="font-mono text-[8px] text-zinc-400">{m.duration}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Detail panels ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMilestone.id}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.3 }}
                className="h-full flex flex-col border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.25em]">
                    {activeMilestone.phase}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-400">
                    {activeMilestone.duration}
                  </span>
                </div>

                <div className="px-8 pt-8 pb-6 flex-1">
                  <h3 className="font-display font-bold text-3xl text-zinc-950 tracking-tight leading-tight mb-6">
                    {activeMilestone.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {activeMilestone.details}
                  </p>
                </div>

                <div className="px-8 py-5 border-t border-zinc-100 flex items-center gap-2 font-mono text-[9px] text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                  <span>All works subject to OSHA compliance, independent inspection, and sign-off before proceeding</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4">
            <div className="h-full flex flex-col border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.25em]">
                  Key Specification
                </span>
                <span className="font-mono text-[9px] text-zinc-400">
                  Phase 0{activeStage + 1}
                </span>
              </div>

              <div className="px-8 py-8 flex flex-col gap-6 flex-1">
                <div>
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] block mb-2">
                    Parameter
                  </span>
                  <span className="font-display font-bold text-xl text-zinc-950 tracking-tight leading-none">
                    {currentStat.label}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] block mb-2">
                    Design Value
                  </span>
                  <span className="font-display font-black text-3xl text-brand-orange tracking-tight leading-none">
                    {currentStat.val}
                  </span>
                </div>

                <div className="mt-auto">
                  <div className="flex gap-1">
                    {milestones.map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                          i <= activeStage ? 'bg-brand-orange' : 'bg-zinc-200'
                        }`}
                        style={{ opacity: i === activeStage ? 1 : i < activeStage ? 0.5 : 1 }}
                      />
                    ))}
                  </div>
                  <p className="font-mono text-[8px] text-zinc-400 mt-2">
                    Stage {activeStage + 1} of {milestones.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
