import React, { useState } from 'react';
import { Drill, Binary, Layers } from 'lucide-react';

export default function AboutSection() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const pillars = [
    {
      id: 1,
      name: "Structural Engineering",
      desc: "Advanced design of steel, reinforced concrete, and composite systems for supertall towers, long-span infrastructure, and high-seismic environments. Peer-reviewed by leading independent engineers.",
      icon: Drill,
    },
    {
      id: 2,
      name: "Construction Management",
      desc: "Full-lifecycle delivery from preconstruction through commissioning. Rigorous programme controls, supply chain governance, and zero-incident safety culture across every continent we operate.",
      icon: Binary,
    },
    {
      id: 3,
      name: "Sustainable Delivery",
      desc: "Science-based decarbonisation. Mass timber hybrids, low-carbon concretes, and circular construction strategies delivering verifiable net-zero pathways aligned to SBTi and CSRD requirements.",
      icon: Layers,
    }
  ];

  const stats = [
    { value: "480", unit: "m", label: "Supertall Delivered" },
    { value: "14.2", unit: "M", label: "Sq Ft Commissioned" },
    { value: "0.00", unit: "%", label: "Lost Time Injury Rate" },
    { value: "42", unit: "", label: "Countries" },
  ];

  return (
    <section id="about" className="bg-white border-b border-[#E6E4DE]">
      {/* Enterprise Stats */}
      <div className="border-b border-[#E6E4DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6 sm:gap-y-9 py-8 sm:py-11">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col border-l border-[#E6E4DE] pl-4 sm:pl-6 first:border-l-0 first:pl-0">
                <div className="font-display font-semibold text-[32px] sm:text-[42px] md:text-6xl tracking-[-1.8px] text-[#0B111F] tabular-nums flex items-baseline">
                  {stat.value}
                  <span className="text-[18px] sm:text-[22px] md:text-[27px] ml-1 text-[#B87333] font-medium tracking-normal">{stat.unit}</span>
                </div>
                <div className="mt-1 uppercase text-[10px] sm:text-xs tracking-[0.16em] sm:tracking-[0.2em] text-[#0B111F]/50 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Narrative + Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 pt-12 sm:pt-16 pb-14 sm:pb-20">
        <div className="max-w-4xl">
          <div className="uppercase text-[#B87333] tracking-[0.2em] text-xs font-medium mb-3 sm:mb-4">EST. 2001</div>
          <h2 className="display-lg text-[36px] sm:text-5xl md:text-6xl lg:text-[68px] tracking-[-2px] sm:tracking-[-3px] md:tracking-[-3.6px] leading-none mb-4 sm:mb-6">
            Engineering for<br />the long term.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#0B111F]/70 max-w-3xl leading-snug">
            Ambot365 is a privately held engineering and construction group delivering landmark buildings, 
            critical infrastructure, and complex industrial facilities worldwide. We bring together world-class 
            structural engineers, construction technologists, and delivery teams with a singular focus: 
            buildings and infrastructure that will define cities for generations.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-10 sm:mt-16">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            const active = hoveredCard === p.id;
            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredCard(p.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className={`enterprise-card group rounded-2xl sm:rounded-3xl p-6 sm:p-9 flex flex-col bg-white cursor-default ${active ? 'border-[#B87333]/40 shadow-xl' : ''}`}
              >
                <div className="mb-auto">
                  <div className={`inline-flex w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl items-center justify-center mb-5 sm:mb-9 transition ${active ? 'bg-[#B87333] text-white' : 'bg-[#F8F7F4] text-[#B87333]'}`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="font-display font-semibold text-lg sm:text-[23px] tracking-[-0.4px] sm:tracking-[-0.6px] mb-3 sm:mb-4 text-[#0B111F]">{p.name}</div>
                  <p className="text-[#0B111F]/65 leading-relaxed text-[13px] sm:text-[15px]">{p.desc}</p>
                </div>
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 text-[10px] border-t border-[#E6E4DE] tracking-widest text-[#0B111F]/40 group-hover:text-[#B87333] transition">0{idx+1} — CORE DISCIPLINE</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
