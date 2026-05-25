import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sliders, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  const [buildingType, setBuildingType] = useState<'commercial' | 'residential' | 'industrial'>('commercial');
  const [heightGoal, setHeightGoal] = useState(300);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientLocation, setClientLocation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getCalculations = () => {
    const floorsVal = Math.round(heightGoal / 4.1);
    let steelTonnage = floorsVal * 240;
    let concreteM3 = floorsVal * 180;
    let estimationPrice = floorsVal * 6.2;

    if (buildingType === 'industrial') {
      steelTonnage = Math.round(steelTonnage * 1.4);
      estimationPrice = Math.round(estimationPrice * 1.2);
    } else if (buildingType === 'residential') {
      concreteM3 = Math.round(concreteM3 * 1.25);
      estimationPrice = Math.round(estimationPrice * 0.9);
    }

    return {
      floors: floorsVal,
      steel: steelTonnage,
      concrete: concreteM3,
      price: estimationPrice.toFixed(0)
    };
  };

  const calcs = getCalculations();

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail) return;
    setIsSubmitted(true);
  };

  const buildingTypes = [
    { id: 'commercial',  name: 'Commercial',  spec: 'Office / Retail / Hotel' },
    { id: 'residential', name: 'Residential', spec: 'Apartments / Mixed-Use' },
    { id: 'industrial',  name: 'Industrial',  spec: 'Warehouse / Data Centre' },
  ] as const;

  const calcRows = [
    { label: 'Floor Count',       value: `${calcs.floors} Floors`,              color: 'text-zinc-950' },
    { label: 'Structural Steel',  value: `${calcs.steel.toLocaleString()} MT`,  color: 'text-zinc-950' },
    { label: 'Concrete Volume',   value: `${calcs.concrete.toLocaleString()} m³`, color: 'text-zinc-950' },
    { label: 'Estimated Budget',  value: `~€${calcs.price}M`,                   color: 'text-brand-orange' },
  ];

  return (
    <section id="contact" className="relative bg-[#f9fafb] overflow-hidden border-t border-zinc-200">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 relative z-10">

        {/* ── Header ──────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-orange" />
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">
                Get in Touch
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-zinc-950 leading-[1.1] tracking-tight">
              Start Your<br />
              <span className="text-brand-orange">Project</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-zinc-500 text-sm leading-relaxed">
              Use our preliminary estimator to generate an indicative budget and programme. Submit your details and our estimating team will return a detailed scope within 48 hours.
            </p>
          </div>
        </div>

        {/* ── Main panels ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT: Estimator */}
          <div className="lg:col-span-7">
            <div className="h-full flex flex-col border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">

              <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50 flex items-center gap-2">
                <Sliders className="w-3.5 h-3.5 text-brand-orange" />
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.25em]">
                  Preliminary Cost Estimator
                </span>
              </div>

              <div className="px-8 py-8 flex flex-col gap-8 flex-1">

                <div>
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] block mb-4">
                    Building Type
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {buildingTypes.map((type) => (
                      <button
                        key={type.id}
                        id={`desk-template-btn-${type.id}`}
                        onClick={() => setBuildingType(type.id)}
                        className={`p-4 rounded-xl border flex flex-col items-start text-left transition-all cursor-pointer ${
                          buildingType === type.id
                            ? 'bg-brand-orange/5 border-brand-orange/40'
                            : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 hover:bg-white'
                        }`}
                      >
                        <span className={`font-display font-bold text-sm tracking-wide ${buildingType === type.id ? 'text-brand-orange' : 'text-zinc-800'}`}>
                          {type.name}
                        </span>
                        <span className="font-mono text-[8px] text-zinc-400 mt-1 leading-snug">{type.spec}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em]">
                      Building Height
                    </span>
                    <span className="font-display font-black text-2xl text-brand-orange tracking-tight leading-none">
                      {heightGoal}m
                    </span>
                  </div>
                  <input
                    id="desk-height-slider"
                    type="range"
                    min="50"
                    max="600"
                    value={heightGoal}
                    onChange={(e) => setHeightGoal(Number(e.target.value))}
                    className="w-full h-1.5 rounded-lg appearance-none cursor-pointer accent-brand-orange bg-zinc-200"
                  />
                  <div className="flex justify-between font-mono text-[8px] text-zinc-400 mt-2">
                    <span>50m</span>
                    <span>325m</span>
                    <span>600m</span>
                  </div>
                </div>

                <div>
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] block mb-4">
                    Structural Output
                  </span>
                  <div className="grid grid-cols-2 divide-x divide-y divide-zinc-100 border border-zinc-100 rounded-xl overflow-hidden">
                    {calcRows.map(({ label, value, color }, i) => (
                      <div key={i} className="px-5 py-4 flex flex-col gap-1.5 bg-zinc-50">
                        <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">{label}</span>
                        <span className={`font-display font-black text-xl tracking-tight leading-none ${color}`}>{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="lg:col-span-5">
            <div className="h-full flex flex-col border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">

              <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50">
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.25em]">
                  Request a Consultation
                </span>
              </div>

              <div className="px-8 py-8 flex-1 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="inquiry-form"
                      onSubmit={handleFormSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      className="flex flex-col gap-5"
                    >
                      {[
                        { id: 'form-client-name',     label: 'Your Name',        type: 'text',  placeholder: 'e.g. Jean-Pierre Laurent',    value: clientName,     setter: setClientName,     required: true },
                        { id: 'form-client-email',    label: 'Work Email',       type: 'email', placeholder: 'e.g. laurent@novartis.ch',     value: clientEmail,    setter: setClientEmail,    required: true },
                        { id: 'form-client-location', label: 'Project Location', type: 'text',  placeholder: 'e.g. Geneva, Switzerland',     value: clientLocation, setter: setClientLocation, required: false },
                      ].map((field) => (
                        <div key={field.id} className="flex flex-col gap-1.5">
                          <label className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em]">
                            {field.label}
                          </label>
                          <input
                            id={field.id}
                            type={field.type}
                            required={field.required}
                            placeholder={field.placeholder}
                            value={field.value}
                            onChange={(e) => field.setter(e.target.value)}
                            className="py-3 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                          />
                        </div>
                      ))}

                      <button
                        id="form-submit-telemetry-btn"
                        type="submit"
                        className="w-full mt-2 py-3.5 px-4 bg-zinc-950 hover:bg-brand-orange text-white font-display font-black text-sm uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer"
                      >
                        <span>Submit Enquiry</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="submission-success"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center text-center py-8 gap-6"
                    >
                      <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>

                      <div>
                        <h3 className="font-display font-black text-3xl text-zinc-950 tracking-tight leading-none mb-3">
                          Enquiry Received
                        </h3>
                        <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
                          Thank you, <span className="text-brand-orange font-medium">{clientName}</span>. Our estimating team will review your brief and respond to <span className="text-zinc-800">{clientEmail}</span> within 48 hours.
                        </p>
                      </div>

                      <div className="w-full border border-zinc-100 rounded-xl bg-zinc-50 p-4 font-mono text-[9px] text-zinc-500 text-left flex flex-col gap-1.5">
                        <p>Status: Enquiry Registered</p>
                        <p>Response: Within 48 hours</p>
                        <p>Ref: ENQ-{Math.floor(100000 + Math.random() * 900000)}</p>
                        <p className="text-emerald-600 mt-1">● Confirmation email sent</p>
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
