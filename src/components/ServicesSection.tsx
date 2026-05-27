import React, { useState } from 'react';
import { HardHat, Landmark, Wrench, ClipboardList, Layers, ArrowUpRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServicesProps {
  onSelectRenderMode: (mode: 'wireframe' | 'xray' | 'thermal' | 'solid' | 'hologram', serviceId: string) => void;
  focusedServiceId: string | null;
}

export default function ServicesSection({ onSelectRenderMode, focusedServiceId }: ServicesProps) {
  const [hoveredCardId, setHoveredCardId] = useState<string | null>(null);

  const services: ServiceItem[] = [
    {
      id: "structural", title: "Structural Engineering",
      description: "Peer-reviewed design of steel, concrete, and hybrid systems for supertall towers, long-span bridges, and mission-critical facilities in extreme environments.",
      iconName: "HardHat",
      details: ["High-Rise & Supertall", "Seismic & Wind Engineering", "Deep Foundations", "Independent Design Review"],
      renderMode: "xray"
    },
    {
      id: "commercial", title: "Commercial & Mixed-Use",
      description: "Delivery of headquarters towers, luxury residential, hotels, and large-scale urban developments. Full vertical integration from design through construction.",
      iconName: "Landmark",
      details: ["Headquarters Towers", "Mixed-Use Precincts", "Hospitality & Residential", "Complex Urban Sites"],
      renderMode: "solid"
    },
    {
      id: "mep", title: "MEP & Building Systems",
      description: "Integrated mechanical, electrical, plumbing, and controls design with advanced energy modeling and commissioning oversight to achieve demanding performance targets.",
      iconName: "Wrench",
      details: ["High-Performance HVAC", "Critical Power Systems", "Fire & Life Safety", "Smart Building Platforms"],
      renderMode: "thermal"
    },
    {
      id: "management", title: "Programme Management",
      description: "End-to-end governance of complex capital programmes. Schedule control, commercial management, risk, and supply chain leadership across multi-contractor environments.",
      iconName: "ClipboardList",
      details: ["Integrated Master Planning", "Cost & Commercial Control", "Risk & Governance", "Multi-Stakeholder Delivery"],
      renderMode: "wireframe"
    },
    {
      id: "envelope", title: "Building Envelope & Façade",
      description: "High-performance unitised façades, structural glazing, and roofing systems engineered for thermal performance, blast resilience, and long-term durability.",
      iconName: "Layers",
      details: ["Unitised Curtain Wall", "Performance Cladding", "Structural Glass", "Envelope Commissioning"],
      renderMode: "hologram"
    }
  ];

  const icons: Record<string, React.FC<{ className?: string }>> = { HardHat, Landmark, Wrench, ClipboardList, Layers };

  return (
    <section id="services" className="bg-white border-b border-[#E6E4DE] py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end gap-8 mb-12">
          <div>
            <div className="text-xs tracking-[0.25em] text-[#B87333] font-medium mb-3">CAPABILITIES</div>
            <h2 className="display-lg text-[56px] md:text-7xl tracking-[-3.4px] leading-none">What we deliver<br />at the highest level.</h2>
          </div>
          <div className="max-w-md text-lg text-[#0B111F]/70 lg:mb-2">
            Five integrated disciplines. One accountable partner. Every project executed with the rigour of the world’s most demanding clients.
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#E6E4DE]">
          {services.map((service, idx) => {
            const Icon = icons[service.iconName] || HardHat;
            const isActive = hoveredCardId === service.id || focusedServiceId === service.id;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                onMouseEnter={() => setHoveredCardId(service.id)}
                onMouseLeave={() => setHoveredCardId(null)}
                className={`enterprise-card p-9 bg-white flex flex-col justify-between group cursor-pointer ${isActive ? 'ring-1 ring-[#B87333]/40' : ''}`}
              >
                <div>
                  <div className={`w-11 h-11 rounded-2xl mb-9 flex items-center justify-center transition ${isActive ? 'bg-[#B87333] text-white' : 'bg-[#F8F7F4] text-[#B87333]'}`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="font-display text-[21px] tracking-[-0.5px] mb-3.5">{service.title}</div>
                  <p className="text-[#0B111F]/65 leading-relaxed text-[14.5px]">{service.description}</p>
                </div>

                <div className="mt-9 pt-6 border-t border-[#E6E4DE] flex items-center justify-between text-sm">
                  <div className="grid grid-cols-1 gap-y-px text-xs text-[#0B111F]/50">
                    {service.details.slice(0, 2).map((d, i) => <div key={i}>{d}</div>)}
                  </div>
                  <div className="text-[#B87333] flex items-center gap-1 text-xs font-medium tracking-widest">
                    LEARN MORE <ArrowUpRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            );
          })}

          {/* CTA Tile */}
          <div className="bg-[#0B111F] p-9 md:p-10 flex flex-col text-white">
            <div>
              <div className="uppercase tracking-[3px] text-xs text-[#C5A46E] mb-5">START A CONVERSATION</div>
              <div className="font-display text-4xl tracking-[-1.2px] leading-none">Ready to discuss<br />your next landmark?</div>
            </div>
            <div className="mt-auto pt-10">
              <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
                className="inline-flex items-center justify-center gap-3 px-9 h-12 rounded-full border border-white/20 hover:bg-white hover:text-[#0B111F] transition text-sm tracking-wider font-medium">
                REQUEST A BRIEFING <ArrowUpRight className="w-4 h-4" />
              </button>
              <p className="text-xs text-white/50 mt-6 max-w-[22ch]">Our senior leadership team will respond within 48 hours with a preliminary programme and budget indication.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
