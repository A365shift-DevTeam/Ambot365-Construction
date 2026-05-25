import React, { useState } from 'react';
import { Home, Landmark, Palette, Compass, Cpu, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectRenderMode: (mode: 'wireframe' | 'xray' | 'thermal' | 'solid' | 'hologram', serviceId: string) => void;
  focusedServiceId: string | null;
}

export default function ServicesSection({ onSelectRenderMode, focusedServiceId }: ServicesProps) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const services: ServiceItem[] = [
    {
      id: "residential",
      title: "Residential Structures",
      description: "Developing bespoke luxury retreats, energy-efficient apartments, and premium seaside penthouses with net-zero carbon targets.",
      iconName: "Home",
      details: ["Premium Smart Homes", "Net-Zero Materials", "Biophilic Light Wells", "Seismic Concrete Dampers"],
      techSpec: "ISO CLASS-A RESIDENCY",
      renderMode: "xray"
    },
    {
      id: "commercial",
      title: "Commercial Projects",
      description: "Assembling durable double-skin glass towers, luxury hotels, corporate headquarters, and high-tech industrial research facilities.",
      iconName: "Landmark",
      details: ["High-rise Glass Facades", "Steel Truss Columns", "Dynamic Heli-decks", "Aerodynamic Wind Dampers"],
      techSpec: "ASTM A992 ALLOY FRAME",
      renderMode: "solid"
    },
    {
      id: "smart_buildings",
      title: "Sustainable Systems",
      description: "Designing advanced HVAC utility grids, active glass solar panels, integrated safety controls, and sustainable water treatment pipelines.",
      iconName: "Cpu",
      details: ["High-Efficiency HVAC", "Integrated Microgrids", "Insulated Modern Slabs", "Smart Utility Management"],
      techSpec: "HVAC REGULATORY APP-4.1",
      renderMode: "thermal"
    },
    {
      id: "architecture",
      title: "Architecture Planning",
      description: "Defining optimal layouts, geometric curves, concrete load-bearing structures, and optimized daylight orientations.",
      iconName: "Compass",
      details: ["Custom Geometric Curves", "Reinforced Foundations", "Shadow Exposure Audit", "Zoning Standards Compliance"],
      techSpec: "BIM LEVEL 3 PLANNING",
      renderMode: "wireframe"
    },
    {
      id: "interior_design",
      title: "Interior Design",
      description: "Curating custom acoustic wood panels, recessed high-end lighting, ornamental metal designs, and signature custom staircases.",
      iconName: "Palette",
      details: ["Acoustic Wood Paneling", "Diffused LED Fixtures", "Floating Concrete Steps", "Premium Natural Finishes"],
      techSpec: "LEED GOLD INTERIOR",
      renderMode: "hologram"
    }
  ];

  const icons: Record<string, React.FC<{ className?: string }>> = {
    Home, Landmark, Palette, Compass, Cpu
  };

  const renderBadgeMap: Record<string, { label: string; color: string }> = {
    xray:      { label: 'X-Ray Structural',   color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
    solid:     { label: 'Finished 3D Render', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
    thermal:   { label: 'Thermal Simulation', color: 'text-purple-600 bg-purple-50 border-purple-200' },
    wireframe: { label: 'Wireframe Blueprint', color: 'text-orange-600 bg-orange-50 border-orange-200' },
    hologram:  { label: 'Acoustic Spec View', color: 'text-amber-600 bg-amber-50 border-amber-200' },
  };

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#f9fafb] overflow-hidden border-t border-zinc-200">

      {/* Giant ghosted section number */}
      <div className="absolute -top-8 right-0 font-display text-[20rem] leading-none text-zinc-950/[0.028] pointer-events-none select-none pr-4 z-0">
        02
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* ── Header row ────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-orange" />
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">
                Design &amp; Construction Capabilities
              </span>
            </div>
            <h2 className="font-display text-6xl md:text-7xl lg:text-8xl text-zinc-950 leading-[0.88] tracking-tight">
              Engineering<br />
              <span className="text-brand-orange">Services</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Select any capability card to explore its dynamic technical performance parameters and architectural specifications linked to the 3D viewport.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
              <span className="w-4 h-px bg-zinc-300" />
              5 core service disciplines
            </div>
          </div>
        </div>

        {/* ── Services grid ──────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200">
          {services.map((service, index) => {
            const IconComp = icons[service.iconName] || Home;
            const isHovered = hoveredCardId === service.id;
            const isActive = focusedServiceId === service.id;
            const badge = renderBadgeMap[service.renderMode];
            const num = String(index + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => onSelectRenderMode(service.renderMode, service.id)}
                onMouseEnter={() => setHoveredCardId(service.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`relative bg-[#f9fafb] p-8 flex flex-col justify-between gap-8 cursor-pointer select-none group transition-colors duration-300 overflow-hidden ${
                  isActive ? 'bg-white' : isHovered ? 'bg-white' : ''
                }`}
              >
                {/* Top orange active bar */}
                <div className={`absolute top-0 inset-x-0 h-0.5 bg-brand-orange transition-all duration-300 ${
                  isActive || isHovered ? 'opacity-100' : 'opacity-0'
                }`} />

                {/* Faded background index number */}
                <div className="absolute bottom-4 right-5 font-display text-8xl leading-none text-zinc-950/[0.04] pointer-events-none select-none">
                  {num}
                </div>

                {/* Top row: icon + spec badge */}
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-xl border transition-all duration-200 ${
                    isActive || isHovered
                      ? 'bg-brand-orange/10 border-brand-orange/30 text-brand-orange'
                      : 'bg-white border-zinc-200 text-zinc-400'
                  }`}>
                    <IconComp className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-[8px] text-zinc-400 uppercase tracking-widest bg-white px-2 py-1 rounded border border-zinc-200">
                    {service.techSpec}
                  </span>
                </div>

                {/* Body */}
                <div>
                  <h3 className={`font-display text-xl uppercase tracking-wide leading-tight mb-3 transition-colors ${
                    isActive || isHovered ? 'text-brand-orange' : 'text-zinc-950'
                  }`}>
                    {service.title}
                  </h3>
                  <p className="text-zinc-500 text-xs leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-2 gap-y-1.5 gap-x-3">
                    {service.details.map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-400">
                        <span className={`w-1 h-1 rounded-full flex-shrink-0 ${isActive || isHovered ? 'bg-brand-orange' : 'bg-zinc-300'}`} />
                        {d}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom: badge + arrow */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
                  <span className={`text-[9px] font-mono px-2 py-0.5 rounded border ${badge.color}`}>
                    {badge.label}
                  </span>
                  <div className={`flex items-center gap-1 font-display text-[10px] uppercase tracking-wider transition-all ${
                    isActive ? 'text-brand-orange' : 'text-zinc-400 group-hover:text-zinc-950'
                  }`}>
                    <span>{isActive ? 'Active' : 'Explore'}</span>
                    <ArrowRight className={`w-3 h-3 transition-transform duration-200 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              </div>
            );
          })}

          {/* Sixth cell — CTA */}
          <div className="bg-brand-orange p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute bottom-0 right-0 font-display text-[10rem] leading-none text-white/[0.08] pointer-events-none select-none translate-y-4 translate-x-4">
              →
            </div>
            <div>
              <span className="font-mono text-[9px] text-white/60 uppercase tracking-widest block mb-4">
                Start a Project
              </span>
              <h3 className="font-display text-3xl text-white leading-tight tracking-tight">
                Ready to Build Something Extraordinary?
              </h3>
            </div>
            <div>
              <p className="text-white/70 text-xs leading-relaxed mb-6">
                Every layout integrates natively with Revit, IFC, and advanced industry BIM Level 3 data pipelines.
              </p>
              <button
                id="capabilities-request-cta"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-brand-orange font-display text-xs uppercase tracking-widest font-bold hover:bg-zinc-100 transition-colors cursor-pointer"
              >
                <span>Download Specs</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
