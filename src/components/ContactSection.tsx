import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Sliders, Send, ArrowUpRight } from 'lucide-react';

export default function ContactSection() {
  const [buildingType, setBuildingType] = useState<'spire' | 'vertex' | 'citadel'>('spire');
  const [heightGoal, setHeightGoal] = useState(300);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientLocation, setClientLocation] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const getCalculations = () => {
    const floorsVal = Math.round(heightGoal / 4.1);
    let alloyTonnage = floorsVal * 240;
    let carbonCapture = floorsVal * 1.8;
    let estimationPrice = floorsVal * 6.2;

    if (buildingType === 'vertex') {
      alloyTonnage = Math.round(alloyTonnage * 1.35);
      estimationPrice = Math.round(estimationPrice * 1.25);
    } else if (buildingType === 'citadel') {
      carbonCapture = Math.round(carbonCapture * 1.85);
      estimationPrice = Math.round(estimationPrice * 1.15);
    }

    return {
      floors: floorsVal,
      alloy: alloyTonnage,
      carbon: carbonCapture.toFixed(1),
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
    { id: 'spire',   name: 'Commercial Tower', spec: 'Office / Retail' },
    { id: 'vertex',  name: 'Multi-Family Res.', spec: 'Residential' },
    { id: 'citadel', name: 'Mixed-Use Citadel', spec: 'Eco-Certified' },
  ] as const;

  const calcRows = [
    { label: 'Story Heights',     value: `${calcs.floors} Floors`,            color: 'text-zinc-950' },
    { label: 'Steel Requirement', value: `${calcs.alloy.toLocaleString()} MT`, color: 'text-zinc-950' },
    { label: 'Carbon Offset CO₂', value: `${calcs.carbon} MT/Yr`,             color: 'text-emerald-600' },
    { label: 'Estimated Budget',  value: `~€${calcs.price}M`,                 color: 'text-brand-orange' },
  ];

  return (
    <section id="contact" className="relative bg-[#f9fafb] overflow-hidden border-t border-zinc-200">

      {/* Giant ghosted section number */}
      <div className="absolute -top-8 right-0 font-display text-[20rem] leading-none text-zinc-950/[0.028] pointer-events-none select-none pr-4 z-0">
        06
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 relative z-10">

        {/* ── Header ──────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-orange" />
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">
                Project Estimator — Contact Us
              </span>
            </div>
            <h2 className="font-display text-6xl md:text-7xl lg:text-8xl text-zinc-950 leading-[0.88] tracking-tight">
              Inquire &amp;<br />
              <span className="text-brand-orange">Consult</span>
            </h2>
          </div>
          <div className="max-w-sm">
            <p className="text-zinc-500 text-sm leading-relaxed mb-6">
              Estimate your preliminary building specs using our interactive structural calculator. Submit your details to request a comprehensive engineering consultation.
            </p>
            <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
              <span className="w-4 h-px bg-zinc-300" />
              Integrated BIM Level 3 Estimates
            </div>
          </div>
        </div>

        {/* ── Main panels ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* LEFT: Estimator */}
          <div className="lg:col-span-7">
            <div className="h-full flex flex-col border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">

              {/* Header strip */}
              <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.25em] flex items-center gap-1.5">
                  <Sliders className="w-3 h-3" />
                  Preliminary Project Estimator
                </span>
                <span className="font-mono text-[9px] text-zinc-400">SCALE: 1:500</span>
              </div>

              <div className="px-8 py-8 flex flex-col gap-8 flex-1">

                {/* Step 1 — Building type */}
                <div>
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] block mb-4">
                    01 — Select Structural Class
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {buildingTypes.map((type) => (
                      <button
                        key={type.id}
                        id={`desk-template-btn-${type.id}`}
                        onClick={() => setBuildingType(type.id)}
                        className={`p-4 rounded-xl border flex flex-col items-start text-left transition-all cursor-pointer ${
                          buildingType === type.id
                            ? 'bg-brand-orange/5 border-brand-orange/40 shadow-sm'
                            : 'bg-zinc-50 border-zinc-200 hover:border-zinc-300 hover:bg-white'
                        }`}
                      >
                        {buildingType === type.id && (
                          <span className="w-1 h-1 rounded-full bg-brand-orange mb-2 node-pulse" />
                        )}
                        <span className={`font-display text-sm tracking-wide ${buildingType === type.id ? 'text-brand-orange' : 'text-zinc-800'}`}>
                          {type.name}
                        </span>
                        <span className="font-mono text-[8px] text-zinc-400 mt-1">{type.spec}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2 — Height slider */}
                <div>
                  <div className="flex justify-between items-baseline mb-4">
                    <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em]">
                      02 — Configure Height Range
                    </span>
                    <span className="font-display text-2xl text-brand-orange tracking-tight leading-none">
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
                    <span>Min: 50m</span>
                    <span>Median: 325m</span>
                    <span>Max: 600m</span>
                  </div>
                </div>

                {/* Step 3 — Specs HUD */}
                <div>
                  <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-[0.2em] block mb-4">
                    03 — Structural Output Parameters
                  </span>
                  <div className="grid grid-cols-2 divide-x divide-y divide-zinc-100 border border-zinc-100 rounded-xl overflow-hidden">
                    {calcRows.map(({ label, value, color }, i) => (
                      <div key={i} className="px-5 py-4 flex flex-col gap-1.5 bg-zinc-50">
                        <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest">{label}</span>
                        <span className={`font-display text-xl tracking-tight leading-none ${color}`}>{value}</span>
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

              {/* Header strip */}
              <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.25em]">
                  Submit Consultation Request
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 node-pulse" />
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
                        { id: 'form-client-name',     label: 'Representative Name',            type: 'text',  placeholder: 'e.g. Jean-Pierre Laurent',  value: clientName,     setter: setClientName,     required: true },
                        { id: 'form-client-email',    label: 'Corporate Email',                type: 'email', placeholder: 'e.g. laurent@novartis.ch',   value: clientEmail,    setter: setClientEmail,    required: true },
                        { id: 'form-client-location', label: 'Project Location / Coordinates', type: 'text',  placeholder: 'e.g. Geneva Alps, Switzerland', value: clientLocation, setter: setClientLocation, required: false },
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
                            className="py-3 px-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-800 placeholder-zinc-400 focus:outline-none focus:border-brand-orange focus:bg-white transition-all"
                          />
                        </div>
                      ))}

                      <button
                        id="form-submit-telemetry-btn"
                        type="submit"
                        className="w-full mt-2 py-3.5 px-4 bg-zinc-950 hover:bg-brand-orange text-white font-display text-xs uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-sm"
                      >
                        <span>Inquire Blueprint Synthesis</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
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
                        <h3 className="font-display text-3xl text-zinc-950 tracking-tight leading-none mb-3">
                          Inquiry Received
                        </h3>
                        <p className="text-zinc-500 text-xs leading-relaxed max-w-xs">
                          Thank you, <span className="text-brand-orange font-medium">{clientName}</span>. Your preliminary parameters have been recorded. Our engineering office will contact{' '}
                          <span className="text-zinc-800">{clientEmail}</span> shortly.
                        </p>
                      </div>

                      <div className="w-full border border-zinc-100 rounded-xl bg-zinc-50 p-4 font-mono text-[9px] text-zinc-500 text-left flex flex-col gap-1.5">
                        <p>STATUS: Consultation Request Registered</p>
                        <p>FORMAT: Integrated BIM Level 3 Estimate</p>
                        <p>REF ID: {Math.floor(100000 + Math.random() * 900000)}</p>
                        <p className="text-emerald-600 mt-1">● Confirmation Sent</p>
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
