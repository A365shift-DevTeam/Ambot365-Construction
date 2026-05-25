import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Binary, Drill, Sparkles, Building2 } from 'lucide-react';

export default function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const pillars = [
    {
      id: 1,
      name: "Structural Engineering",
      desc: "Expert design and analysis of reinforced concrete, structural steel, and composite systems for high-rise, industrial, and infrastructure projects across demanding seismic and wind environments.",
      icon: Drill,
    },
    {
      id: 2,
      name: "Construction Management",
      desc: "End-to-end project delivery from procurement and scheduling through to commissioning. Our site teams maintain zero-defect standards and full OSHA compliance on every build phase.",
      icon: Binary,
    },
    {
      id: 3,
      name: "Sustainable Building",
      desc: "Low-carbon materials, recycled aggregates, and prefabricated modular systems that reduce embodied carbon and construction waste — delivering LEED Platinum outcomes on every project.",
      icon: Layers,
    }
  ];

  const stats = [
    { value: "480m+", label: "Tallest Structure Built" },
    { value: "14.2M", label: "Sq. Ft. Completed" },
    { value: "0.00%", label: "LTI Accident Rate" },
    { value: "85%",   label: "Recycled Materials" },
  ];

  return (
    <section id="about" className="relative bg-white overflow-hidden border-t border-zinc-200">

      {/* ── Stats band ─────────────────────────────── */}
      <div className="relative z-10 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-zinc-100">
            {stats.map((s, i) => (
              <div key={i} className="py-10 px-8 first:pl-0 lg:last:pr-0 flex flex-col gap-3">
                <span className="font-display font-extrabold text-4xl md:text-5xl text-zinc-950 leading-none tracking-tight">
                  {s.value}
                </span>
                <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.22em] flex items-center gap-2">
                  <span className="w-4 h-px bg-brand-orange flex-shrink-0" />
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ───────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 relative z-10">

        <div className="mb-16">
          <div className="flex items-center gap-3 mb-5">
            <span className="w-8 h-px bg-brand-orange" />
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">
              About Ambot365
            </span>
          </div>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-zinc-950 leading-[1.1] tracking-tight mb-6">
            Building<br />
            <span className="text-brand-orange">Tomorrow's Infrastructure</span>
          </h2>
          <p className="text-zinc-600 text-sm leading-relaxed max-w-2xl">
            Ambot365 delivers integrated construction solutions across structural engineering, civil works, and building systems. With 25+ years of experience on landmark projects across four continents, we execute complex builds with precision, safety, and measurable results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {pillars.map((p, idx) => {
            const IconComp = p.icon;
            const isHovered = hoveredCard === p.id;
            return (
              <div
                key={p.id}
                id={`about-pillar-${p.id}`}
                onMouseEnter={() => setHoveredCard(p.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`flex flex-col gap-6 p-8 border rounded-3xl transition-all duration-300 cursor-default ${
                  isHovered 
                    ? 'bg-white border-brand-orange/20 shadow-xl shadow-brand-orange/5 translate-y-[-4px]' 
                    : 'bg-zinc-50/50 border-zinc-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`font-mono text-3xl font-black transition-colors ${
                    isHovered ? 'text-brand-orange/20' : 'text-zinc-200'
                  }`}>
                    0{idx + 1}
                  </span>
                  <div className={`p-3 rounded-2xl transition-colors duration-300 ${
                    isHovered ? 'bg-brand-orange text-white shadow-lg shadow-brand-orange/30' : 'bg-white text-zinc-400 border border-zinc-100'
                  }`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                </div>
                
                <div>
                  <h4 className="font-display font-bold text-xl text-zinc-950 mb-3">
                    {p.name}
                  </h4>
                  <p className="text-zinc-500 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
