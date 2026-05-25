import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Anchor, Scaling, Palette, Milestone, ShieldCheck } from 'lucide-react';
import { TimelineMilestone } from '../types';

interface ProcessTimelineProps {
  onSelectStage: (stageIndex: number, scrollProgressGoal: number) => void;
  activeStage: number;
}

export default function ProcessTimeline({ onSelectStage, activeStage }: ProcessTimelineProps) {
  const milestones: TimelineMilestone[] = [
    {
      id: 0,
      title: "Bedrock Foundation",
      phase: "01 / FOUNDATION & EXCAVATION",
      duration: "Weeks 01 – 12",
      details: "Excavation to load-bearing Alpine bedrock. Casting of high-strength reinforced concrete piles and deep-founded pile caps to anchor substantial building vertical loads safely.",
      activeDepth: 0.1
    },
    {
      id: 1,
      title: "Superstructure Frame",
      phase: "02 / STRUCTURAL STEEL FRAMING",
      duration: "Weeks 13 – 32",
      details: "Erecting the heavy column framework. Installing high-strength steel moment frames and column girders engineered to distribute seismic and wind-driven lateral forces.",
      activeDepth: 0.4
    },
    {
      id: 2,
      title: "Decking & Core Slabs",
      phase: "03 / DECKING & CONCRETE SLABS",
      duration: "Weeks 33 – 48",
      details: "Detailing and pouring post-tensioned floor slabs. Integrating essential electrical risers, safety corridors, interior shafts, and critical MEP plumbing routes.",
      activeDepth: 0.65
    },
    {
      id: 3,
      title: "Curtain Wall Enclosure",
      phase: "04 / EXTERIOR GLASS ENVELOPE",
      duration: "Weeks 49 – 62",
      details: "Wrapping the outer perimeter in premium double-glazed, low-E curtain wall panels. Preparing internal systems for air-barrier integrity testing and window installation.",
      activeDepth: 0.82
    },
    {
      id: 4,
      title: "Finishes & Handover",
      phase: "05 / INTERIOR FINISHES & HANDOVER",
      duration: "Weeks 63 – 72",
      details: "Final system commissioning, HVAC balance, and indoor finishes. Conducting formal inspection checklists, owner walk-throughs, and legal occupancy sign-offs.",
      activeDepth: 0.98
    }
  ];

  const stageStats = [
    { label: "Bedrock anchor depth", val: "42 Meters" },
    { label: "Steel truss alloy grade", val: "Grade A572" },
    { label: "Active concrete load", val: "B60 Ultra-mix" },
    { label: "Solar glass deflection", val: "0.04% Max" },
    { label: "Dampener fluid viscosity", val: "ISO VG 150" }
  ];

  const icons = [Anchor, Scaling, Palette, Milestone, ShieldCheck];
  const activeMilestone = milestones[activeStage] || milestones[0];
  const currentStat = stageStats[activeStage] || stageStats[0];

  return (
    <section id="process" className="relative bg-[#f9fafb] overflow-hidden border-t border-zinc-200">

      {/* Giant ghosted section number */}
      <div className="absolute -top-8 right-0 font-display text-[20rem] leading-none text-zinc-950/[0.028] pointer-events-none select-none pr-4 z-0">
        04
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 relative z-10">

        {/* ── Header ──────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-orange" />
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">
                Project Lifecycle — Timeline
              </span>
            </div>
            <h2 className="font-display text-6xl md:text-7xl lg:text-8xl text-zinc-950 leading-[0.88] tracking-tight">
              Construction<br />
              <span className="text-brand-orange">Phasing</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Select any phase node to inspect the structural milestones, quality controls, and engineering benchmarks for that construction stage.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
              <span className="w-4 h-px bg-zinc-300" />
              72 weeks total build cycle
            </div>
          </div>
        </div>

        {/* ── Timeline track ──────────────────────────── */}
        <div className="relative w-full mb-16 px-4">

          {/* Track line */}
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
                    <span className={`font-display text-xs uppercase tracking-wider transition-colors ${
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

          {/* Main detail card */}
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
                {/* Header strip */}
                <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.25em]">
                    {activeMilestone.phase}
                  </span>
                  <span className="font-mono text-[9px] text-zinc-400">
                    {activeMilestone.duration}
                  </span>
                </div>

                {/* Body */}
                <div className="px-8 pt-8 pb-6 flex-1">
                  <h3 className="font-display text-4xl md:text-5xl text-zinc-950 tracking-tight leading-none mb-6">
                    {activeMilestone.title}
                  </h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {activeMilestone.details}
                  </p>
                </div>

                {/* Footer */}
                <div className="px-8 py-5 border-t border-zinc-100 flex items-center gap-2 font-mono text-[9px] text-zinc-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>OSHA COMPLIANT WORKSPACE — SAFETY INSPECTION ACTIVE</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Spec panel */}
          <div className="lg:col-span-4">
            <div className="h-full flex flex-col border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              {/* Header strip */}
              <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.25em]">
                  Construction Parameters
                </span>
                <span className="font-mono text-[9px] text-zinc-400">
                  PHASE 0{activeStage + 1}
                </span>
              </div>

              {/* Spec values */}
              <div className="px-8 py-8 flex flex-col gap-6 flex-1">
                <div>
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] block mb-2">
                    Active Parameter
                  </span>
                  <span className="font-display text-2xl text-zinc-950 tracking-tight leading-none">
                    {currentStat.label}
                  </span>
                </div>
                <div>
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] block mb-2">
                    Standard Tolerance / Grade
                  </span>
                  <span className="font-display text-3xl text-brand-orange tracking-tight leading-none">
                    {currentStat.val}
                  </span>
                </div>

                {/* Mini stage indicator */}
                <div className="mt-auto">
                  <div className="flex gap-1">
                    {milestones.map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full transition-all duration-500 ${
                          i < activeStage ? 'bg-brand-orange' : i === activeStage ? 'bg-brand-orange' : 'bg-zinc-200'
                        }`}
                        style={{ opacity: i === activeStage ? 1 : i < activeStage ? 0.5 : 1 }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between font-mono text-[8px] text-zinc-400 mt-2">
                    <span>STAGE {activeStage + 1} / {milestones.length}</span>
                    <span>STATUS: INSPECTED</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
