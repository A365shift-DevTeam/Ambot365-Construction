import React, { useState } from 'react';
import { HardHat, Landmark, Wrench, ClipboardList, Layers, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectRenderMode: (mode: 'wireframe' | 'xray' | 'thermal' | 'solid' | 'hologram', serviceId: string) => void;
  focusedServiceId: string | null;
}

export default function ServicesSection({ onSelectRenderMode, focusedServiceId }: ServicesProps) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const services: ServiceItem[] = [
    {
      id: "structural",
      title: "Structural Engineering",
      description: "Design and analysis of reinforced concrete, structural steel, and composite frame systems. From foundation engineering and pile design through to connection detailing and construction supervision.",
      iconName: "HardHat",
      details: ["RC & Steel Frame Design", "Seismic & Wind Analysis", "Deep Foundation Piling", "Construction Detailing"],
      techSpec: "",
      renderMode: "xray"
    },
    {
      id: "commercial",
      title: "Commercial Construction",
      description: "Delivery of high-rise towers, mixed-use developments, corporate campuses, and industrial facilities. Full programme management from enabling works through to practical completion and handover.",
      iconName: "Landmark",
      details: ["High-Rise Tower Build", "Mixed-Use Developments", "Industrial Facilities", "Fit-Out & Handover"],
      techSpec: "",
      renderMode: "solid"
    },
    {
      id: "mep",
      title: "MEP Systems",
      description: "Full mechanical, electrical, and plumbing design, coordination, and installation. HVAC, power distribution, fire protection, and building management systems delivered to specification.",
      iconName: "Wrench",
      details: ["HVAC & Ventilation Design", "LV Electrical Distribution", "Fire Protection Systems", "Building Management Systems"],
      techSpec: "",
      renderMode: "thermal"
    },
    {
      id: "management",
      title: "Project Management",
      description: "End-to-end programme, cost, and quality management for complex multi-stage construction projects. Contractor procurement, site inspection, risk management, and regulatory compliance.",
      iconName: "ClipboardList",
      details: ["Programme Scheduling", "Cost & Value Management", "Contractor Procurement", "Site QA & Inspection"],
      techSpec: "",
      renderMode: "wireframe"
    },
    {
      id: "envelope",
      title: "Building Envelope",
      description: "Design and installation of curtain wall, cladding, and roofing systems. High-performance facades engineered for thermal, acoustic, and structural performance in demanding climates.",
      iconName: "Layers",
      details: ["Unitised Curtain Wall", "High-Performance Cladding", "Flat & Pitched Roofing", "Air & Water Tightness Testing"],
      techSpec: "",
      renderMode: "hologram"
    }
  ];

  const icons: Record<string, React.FC<{ className?: string }>> = {
    HardHat, Landmark, Wrench, ClipboardList, Layers
  };

  return (
    <section id="services" className="relative py-24 md:py-32 bg-[#f9fafb] overflow-hidden border-t border-zinc-200">

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">

        {/* ── Header ─────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-orange" />
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">
                What We Build
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-zinc-950 leading-[1.1] tracking-tight">
              Construction<br />
              <span className="text-brand-orange">Services</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-zinc-500 text-sm leading-relaxed">
              From structural design and civil groundworks through to MEP systems and specialist fit-out, Ambot365 delivers every discipline under one contract — on programme, on budget, and to specification.
            </p>
          </div>
        </div>

        {/* ── Services grid ──────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200">
          {services.map((service, index) => {
            const IconComp = icons[service.iconName] || HardHat;
            const isHovered = hoveredCardId === service.id;
            const isActive = focusedServiceId === service.id;
            const num = String(index + 1).padStart(2, '0');

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onClick={() => onSelectRenderMode(service.renderMode, service.id)}
                onMouseEnter={() => setHoveredCardId(service.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`relative p-8 flex flex-col justify-between gap-8 cursor-pointer select-none group transition-colors duration-300 overflow-hidden ${
                  isActive || isHovered ? 'bg-white' : 'bg-[#f9fafb]'
                }`}
              >
                {/* Top active bar */}
                <div className={`absolute top-0 inset-x-0 h-0.5 bg-brand-orange transition-all duration-300 ${
                  isActive || isHovered ? 'opacity-100' : 'opacity-0'
                }`} />

                {/* Faded index number */}
                <div className="absolute bottom-4 right-5 font-display font-black text-8xl leading-none text-zinc-950/[0.04] pointer-events-none select-none">
                  {num}
                </div>

                {/* Icon */}
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-200 ${
                  isActive || isHovered
                    ? 'bg-brand-orange/10 border-brand-orange/30 text-brand-orange'
                    : 'bg-white border-zinc-200 text-zinc-400'
                }`}>
                  <IconComp className="w-5 h-5" />
                </div>

                {/* Body */}
                <div>
                  <h3 className={`font-display font-bold text-base leading-snug mb-3 transition-colors ${
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

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-zinc-200">
                  <div className={`flex items-center gap-1 font-display font-bold text-[10px] uppercase tracking-wider transition-all ${
                    isActive ? 'text-brand-orange' : 'text-zinc-400 group-hover:text-zinc-950'
                  }`}>
                    <span>{isActive ? 'Active' : 'Learn More'}</span>
                    <ArrowRight className={`w-3 h-3 transition-transform duration-200 ${isActive ? 'translate-x-1' : 'group-hover:translate-x-0.5'}`} />
                  </div>
                </div>
              </div>
            );
          })}

          {/* CTA cell */}
          <div className="bg-zinc-950 p-8 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute bottom-0 right-0 font-display font-black text-[9rem] leading-none text-white/[0.05] pointer-events-none select-none translate-y-4 translate-x-4">
              →
            </div>
            <div>
              <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest block mb-4">
                Start a Project
              </span>
              <h3 className="font-display font-extrabold text-2xl text-white leading-tight tracking-tight">
                Ready to Break Ground?
              </h3>
            </div>
            <div>
              <p className="text-white/50 text-xs leading-relaxed mb-6">
                Our estimating team will review your brief and return a preliminary scope, programme, and budget within 48 hours.
              </p>
              <button
                id="capabilities-request-cta"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange text-white font-display font-bold text-xs uppercase tracking-widest hover:bg-amber-500 transition-colors cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
