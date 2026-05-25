import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Binary, Drill, Sparkles, Building2 } from 'lucide-react';

export default function AboutSection() {
  const [isSynthesized, setIsSynthesized] = useState(false);
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* LEFT */}
          <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col gap-8">

            <div className="rounded-2xl border border-zinc-200 overflow-hidden bg-white shadow-sm">
              <div className="px-5 py-4 bg-zinc-50 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-brand-orange" />
                  <span className="font-display font-bold text-sm text-zinc-950 tracking-wider uppercase">
                    Structural Model Viewer
                  </span>
                </div>
                <span className={`font-mono text-[9px] uppercase tracking-widest px-2 py-0.5 rounded border ${
                  isSynthesized
                    ? 'text-brand-orange border-brand-orange/30 bg-brand-orange/5'
                    : 'text-cyan-600 border-cyan-200 bg-cyan-50/60'
                }`}>
                  {isSynthesized ? '3D Model' : 'Wireframe'}
                </span>
              </div>
              <div className="p-5">
                <p className="text-zinc-500 text-xs leading-relaxed mb-4">
                  Toggle between a detailed architectural wireframe and a finished 3D structural model.
                </p>
                <button
                  id="synthesis-toggle-btn"
                  onClick={() => setIsSynthesized(!isSynthesized)}
                  className={`w-full py-3 px-4 rounded-xl font-display font-bold text-xs uppercase tracking-widest flex items-center justify-between border transition-all duration-500 cursor-pointer ${
                    isSynthesized
                      ? 'bg-gradient-to-r from-brand-orange to-amber-500 text-white border-transparent shadow-lg shadow-brand-orange/20'
                      : 'bg-zinc-50 text-cyan-600 border-cyan-200 hover:border-cyan-400 hover:bg-white'
                  }`}
                >
                  <span>{isSynthesized ? 'View Blueprint Wireframe' : 'View Finished 3D Model'}</span>
                  <Sparkles className={`w-4 h-4 ${isSynthesized ? 'animate-spin' : 'text-cyan-500'}`} />
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              {pillars.map((p, idx) => {
                const IconComp = p.icon;
                const isHovered = hoveredCard === p.id;
                return (
                  <div
                    key={p.id}
                    id={`about-pillar-${p.id}`}
                    onMouseEnter={() => setHoveredCard(p.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className="flex gap-4 py-6 border-b border-zinc-100 last:border-0 cursor-default"
                  >
                    <div className="flex flex-col items-center gap-1.5 pt-0.5 min-w-[1.75rem]">
                      <span className="font-mono text-[9px] text-zinc-300 leading-none">0{idx + 1}</span>
                      <div className={`w-px flex-1 min-h-[2rem] transition-colors duration-300 ${isHovered ? 'bg-brand-orange' : 'bg-zinc-200'}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-display font-bold text-sm text-zinc-950 uppercase tracking-wide leading-snug">
                          {p.name}
                        </h4>
                        <div className={`p-1.5 rounded-lg flex-shrink-0 transition-all duration-200 ${
                          isHovered ? 'bg-brand-orange/10 text-brand-orange' : 'bg-zinc-100 text-zinc-400'
                        }`}>
                          <IconComp className="w-4 h-4" />
                        </div>
                      </div>
                      <p className="text-zinc-500 text-xs leading-relaxed">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200 shadow-xl p-8 flex items-center justify-center">
              <div className="absolute inset-0 blueprint-grid opacity-25 pointer-events-none" />
              <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-brand-orange/40" />
              <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-brand-orange/40" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-brand-orange/40" />
              <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-brand-orange/40" />

              <div className="relative w-full h-full max-w-sm flex items-center justify-center">
                <AnimatePresence mode="popLayout">
                  {!isSynthesized && (
                    <motion.div
                      key="blueprint-svg"
                      initial={{ opacity: 0, scale: 0.9, rotateX: 20, rotateY: -20 }}
                      animate={{ opacity: 0.9, scale: 1, rotateX: 26, rotateY: -25 }}
                      exit={{ opacity: 0, scale: 1.05, filter: 'blur(8px)', transition: { duration: 0.4 } }}
                      transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                      className="absolute w-full h-full flex items-center justify-center"
                      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                    >
                      <svg viewBox="0 0 400 450" className="w-[85%] h-auto text-cyan-600 opacity-90" fill="none" stroke="currentColor" strokeWidth="1">
                        <polygon points="100,320 200,270 300,320 200,370" strokeDasharray="3,3" stroke="rgba(8,145,178,0.4)" />
                        <polygon points="100,220 200,170 300,220 200,270" strokeDasharray="1,1" />
                        <polygon points="100,120 200,70 300,120 200,170" />
                        <line x1="100" y1="320" x2="100" y2="120" strokeWidth="1.5" />
                        <line x1="200" y1="370" x2="200" y2="170" strokeWidth="1.5" />
                        <line x1="300" y1="320" x2="300" y2="120" strokeWidth="1.5" />
                        <line x1="200" y1="270" x2="200" y2="70" strokeWidth="1.5" />
                        <line x1="150" y1="345" x2="150" y2="145" stroke="rgba(8,145,178,0.5)" />
                        <line x1="250" y1="345" x2="250" y2="145" stroke="rgba(8,145,178,0.5)" />
                        <line x1="320" y1="120" x2="320" y2="320" stroke="#e05e00" strokeWidth="0.8" strokeDasharray="4,4" />
                        <polygon points="320,116 317,123 323,123" fill="#e05e00" />
                        <polygon points="320,324 317,317 323,317" fill="#e05e00" />
                        <line x1="100" y1="220" x2="200" y2="170" stroke="rgba(217,119,6,0.7)" strokeDasharray="4,2" />
                        <line x1="200" y1="270" x2="300" y2="220" stroke="rgba(217,119,6,0.7)" strokeDasharray="4,2" />
                        <line x1="200" y1="70" x2="200" y2="20" strokeWidth="1.5" stroke="#d97706" />
                        <circle cx="200" cy="20" r="3" fill="#e05e00" />
                        <ellipse cx="200" cy="320" rx="100" ry="50" stroke="rgba(8,145,178,0.15)" />
                        <ellipse cx="200" cy="170" rx="100" ry="50" stroke="rgba(8,145,178,0.15)" />
                      </svg>
                      <div className="absolute top-0 w-[80%] h-[1px] bg-cyan-500 shadow-[0_0_15px_rgba(8,145,178,0.7)] scanner-line" />
                    </motion.div>
                  )}

                  {isSynthesized && (
                    <motion.div
                      key="solid-mockup"
                      initial={{ opacity: 0, scale: 0.95, rotateX: 23, rotateY: -22 }}
                      animate={{ opacity: 1, scale: 1, rotateX: 26, rotateY: -25 }}
                      exit={{ opacity: 0, scale: 0.9, filter: 'blur(8px)', transition: { duration: 0.4 } }}
                      transition={{ type: 'spring', stiffness: 80, damping: 15 }}
                      className="absolute w-full h-full flex items-center justify-center"
                      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
                    >
                      <div className="relative w-48 h-80 flex flex-col justify-end">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-14 bg-gradient-to-b from-amber-500 to-zinc-400 flex flex-col items-center">
                          <span className="w-3 h-3 rounded-full bg-amber-500 absolute -top-1 animate-ping" />
                          <span className="w-2 h-2 rounded-full bg-amber-500" />
                        </div>
                        <div className="w-full h-64 relative border border-zinc-300 shadow-xl rounded-lg overflow-hidden flex flex-col justify-between" style={{background: 'linear-gradient(135deg, #e8eaed 0%, #d4d8de 100%)'}}>
                          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-white/20 pointer-events-none z-10" />
                          <div className="absolute inset-x-0 h-0.5 bg-brand-orange shadow-[0_0_12px_#e05e00] scanner-line z-20 pointer-events-none" />
                          {[...Array(8)].map((_, i) => (
                            <div key={i} className="flex-1 border-b border-zinc-400/20 grid grid-cols-3 gap-px p-px">
                              {[...Array(3)].map((_, j) => (
                                <div key={j} className="h-full rounded-sm" style={{background: (i + j) % 3 === 0 ? 'rgba(186,230,253,0.5)' : 'rgba(255,255,255,0.3)'}} />
                              ))}
                            </div>
                          ))}
                        </div>
                        <div className="w-60 h-6 self-center mt-1 rounded border border-zinc-300 flex items-center justify-center" style={{background: 'linear-gradient(to right, #c8cbd0, #d4d7dc, #c8cbd0)'}}>
                          <span className="text-[7px] font-mono text-zinc-600 tracking-wider">REINFORCED CONCRETE FOUNDATION</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
