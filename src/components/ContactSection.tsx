import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  const [buildingType, setBuildingType] = useState<'commercial' | 'residential' | 'industrial'>('commercial');
  const [heightGoal, setHeightGoal] = useState(280);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientLocation, setClientLocation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getCalculations = () => {
    const floors = Math.max(8, Math.round(heightGoal / 4.05));
    let steel = Math.round(floors * 215);
    let concrete = Math.round(floors * 165);
    let budget = Math.round(floors * 5.8);

    if (buildingType === 'industrial') { steel = Math.round(steel * 1.38); budget = Math.round(budget * 1.15); }
    if (buildingType === 'residential') { concrete = Math.round(concrete * 1.22); budget = Math.round(budget * 0.86); }

    return { floors, steel, concrete, budget: budget.toLocaleString() };
  };

  const calcs = getCalculations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="border-b border-[#E6E4DE] bg-white py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="uppercase tracking-[0.22em] text-[#B87333] text-xs mb-3">NEXT STEP</div>
            <h2 className="display-lg text-[58px] leading-[0.96] tracking-[-3.2px]">Let’s define<br />your project.</h2>
            <p className="mt-6 text-[#0B111F]/70 text-[15px] max-w-sm">Receive a confidential preliminary programme, risk register, and budget indication within two working days.</p>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-[#E6E4DE] rounded-3xl bg-[#F8F7F4] p-9 md:p-11">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-7">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        {label:'Commercial / HQ', id:'commercial'},
                        {label:'Residential / Mixed-Use', id:'residential'},
                        {label:'Industrial / Mission Critical', id:'industrial'}
                      ].map(t => (
                        <button type="button" key={t.id} onClick={() => setBuildingType(t.id as any)}
                          className={`rounded-2xl border py-4 text-sm transition ${buildingType === t.id ? 'border-[#B87333] bg-white font-medium' : 'border-[#E6E4DE] hover:bg-white/70'}`}>
                          {t.label}
                        </button>
                      ))}
                    </div>

                    <div>
                      <div className="flex items-baseline justify-between mb-2 text-sm">
                        <div className="text-[#0B111F]/60">Approximate Height</div>
                        <div className="font-semibold tracking-tight text-3xl text-[#0B111F] tabular-nums">{heightGoal} <span className="text-base align-super font-normal text-[#0B111F]/50">m</span></div>
                      </div>
                      <input type="range" min="65" max="620" value={heightGoal} onChange={e => setHeightGoal(+e.target.value)} className="w-full accent-[#B87333]" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-[#E6E4DE] rounded-2xl overflow-hidden text-sm">
                      <div className="bg-white p-4"><div className="text-[#0B111F]/50 text-xs">EST. FLOORS</div><div className="font-semibold tabular-nums text-xl mt-0.5">{calcs.floors}</div></div>
                      <div className="bg-white p-4"><div className="text-[#0B111F]/50 text-xs">STEEL (MT)</div><div className="font-semibold tabular-nums text-xl mt-0.5">{calcs.steel.toLocaleString()}</div></div>
                      <div className="bg-white p-4"><div className="text-[#0B111F]/50 text-xs">CONCRETE (m³)</div><div className="font-semibold tabular-nums text-xl mt-0.5">{calcs.concrete.toLocaleString()}</div></div>
                      <div className="bg-white p-4"><div className="text-[#0B111F]/50 text-xs">INDICATIVE BUDGET</div><div className="font-semibold tabular-nums text-xl mt-0.5 text-[#B87333]">€{calcs.budget}M</div></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3 pt-2">
                      <input value={clientName} onChange={e=>setClientName(e.target.value)} required placeholder="Full Name" className="bg-white border border-[#E6E4DE] rounded-2xl px-5 py-3.5 placeholder:text-[#0B111F]/40" />
                      <input value={clientEmail} onChange={e=>setClientEmail(e.target.value)} required type="email" placeholder="Work Email" className="bg-white border border-[#E6E4DE] rounded-2xl px-5 py-3.5 placeholder:text-[#0B111F]/40" />
                      <input value={clientLocation} onChange={e=>setClientLocation(e.target.value)} placeholder="Project City / Country" className="bg-white border border-[#E6E4DE] rounded-2xl px-5 py-3.5 placeholder:text-[#0B111F]/40" />
                    </div>

                    <button type="submit" className="mt-2 w-full h-14 rounded-2xl bg-[#0B111F] text-white flex items-center justify-center gap-3 text-sm tracking-widest font-medium active:bg-black">
                      REQUEST CONFIDENTIAL BRIEFING <ArrowUpRight className="w-4 h-4" />
                    </button>
                    <p className="text-center text-xs text-[#0B111F]/45">All submissions are treated under strict NDA. Our leadership team responds personally.</p>
                  </form>
                ) : (
                  <div className="py-9 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-7"><CheckCircle2 className="text-emerald-600 w-8 h-8" /></div>
                    <div className="font-display text-4xl tracking-tight">Thank you, {clientName.split(" ")[0]}.</div>
                    <p className="mt-4 max-w-xs mx-auto text-[#0B111F]/70">Our Director of Development will contact you personally within 48 hours with a preliminary package.</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
