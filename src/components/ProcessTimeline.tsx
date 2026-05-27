import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Anchor, Scaling, Grid3x3, Layers, ShieldCheck } from 'lucide-react';
import { TimelineMilestone } from '../types';

interface ProcessTimelineProps {
  onSelectStage: (stageIndex: number, scrollProgressGoal?: number) => void;
  activeStage: number;
}

export default function ProcessTimeline({ onSelectStage, activeStage }: ProcessTimelineProps) {
  const milestones: TimelineMilestone[] = [
    { id: 0, title: "Groundworks & Substructure", phase: "PHASE 01", duration: "WEEKS 1–14", details: "Deep foundations, secant walls, dewatering, and pile cap construction. All works executed to 0.01 % tolerance with full digital as-built verification.", activeDepth: 0.1 },
    { id: 1, title: "Primary Structural Frame", phase: "PHASE 02", duration: "WEEKS 15–34", details: "Erection of composite steel and reinforced concrete core. Real-time structural monitoring and staged load transfer verification at every level.", activeDepth: 0.38 },
    { id: 2, title: "Floor Systems & MEP Rough-In", phase: "PHASE 03", duration: "WEEKS 35–49", details: "Post-tensioned slabs and fully coordinated MEP risers installed from coordinated BIM model. Zero clash certification prior to concrete pours.", activeDepth: 0.62 },
    { id: 3, title: "Envelope & Weatherproofing", phase: "PHASE 04", duration: "WEEKS 50–64", details: "Unitised façade installation with full air and water testing. Façade access and maintenance strategy validated by third-party façade consultant.", activeDepth: 0.81 },
    { id: 4, title: "Fit-Out, Commissioning & Handover", phase: "PHASE 05", duration: "WEEKS 65–74", details: "Interiors, specialist systems, integrated systems testing, and final commissioning. Formal handover with digital O&M and training for client teams.", activeDepth: 0.97 }
  ];

  const specs = [
    { label: "Design life", val: "100 years" },
    { label: "Concrete grade", val: "C60/75" },
    { label: "Steel grade", val: "S460 & S355" },
    { label: "Façade U-value", val: "0.16 W/m²K" },
    { label: "Commissioning", val: "12 weeks" }
  ];

  const icons = [Anchor, Scaling, Grid3x3, Layers, ShieldCheck];
  const active = milestones[activeStage] || milestones[0];
  const currentSpec = specs[activeStage] || specs[0];

  return (
    <section id="process" className="bg-white border-b border-[#E6E4DE] py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="text-[#B87333] text-xs tracking-[0.2em] font-medium mb-3">METHODOLOGY</div>
          <h2 className="display-lg text-6xl tracking-[-3px] leading-none">How we build.<br />How we protect value.</h2>
        </div>

        {/* Timeline Pills */}
        <div className="flex flex-wrap gap-2 mb-9">
          {milestones.map((m, i) => (
            <button
              key={i}
              onClick={() => onSelectStage(i)}
              className={`px-6 py-2.5 text-sm rounded-full border transition flex items-center gap-2 ${activeStage === i ? 'bg-[#0B111F] text-white border-[#0B111F]' : 'border-[#E6E4DE] hover:bg-[#F8F7F4]'}`}
            >
              <span className="font-mono text-xs opacity-50">0{i+1}</span> {m.title.split(' ')[0]}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-4">
          {/* Detail */}
          <AnimatePresence mode="wait">
            <motion.div key={active.id} initial={{opacity:0.5, y:6}} animate={{opacity:1, y:0}} className="lg:col-span-7 border border-[#E6E4DE] bg-[#F8F7F4] rounded-3xl p-9 md:p-12">
              <div className="flex justify-between text-xs uppercase tracking-[2px] mb-6 text-[#0B111F]/50">
                <div>{active.phase}</div><div>{active.duration}</div>
              </div>
              <div className="font-display text-[42px] tracking-[-1.6px] leading-none mb-8">{active.title}</div>
              <p className="text-[#0B111F]/75 text-[15px] leading-relaxed max-w-3xl">{active.details}</p>

              <div className="flex items-center gap-2 text-xs mt-10 pt-7 border-t border-[#E6E4DE] text-emerald-700">
                <ShieldCheck className="w-4 h-4" /> INDEPENDENT VERIFICATION AT EVERY HOLD POINT
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Specs panel */}
          <div className="lg:col-span-5 border border-[#E6E4DE] rounded-3xl p-9 md:p-12 bg-white flex flex-col">
            <div>
              <div className="uppercase text-xs tracking-[2px] text-[#B87333]">KEY SPECIFICATION — PHASE {activeStage + 1}</div>
              <div className="mt-8">
                <div className="text-[#0B111F]/50 text-sm">{currentSpec.label}</div>
                <div className="font-display font-semibold text-[52px] tracking-[-2.4px] text-[#0B111F] mt-1 leading-none">{currentSpec.val}</div>
              </div>
            </div>

            <div className="mt-auto pt-12 text-xs text-[#0B111F]/55 leading-relaxed">
              All works executed under our ISO 45001 &amp; ISO 9001 integrated management system. Third-party assurance provided by Bureau Veritas and Arup.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
