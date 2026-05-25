import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { TestimonialItem } from '../types';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      name: "Jean-Pierre Laurent",
      role: "VP of Real Estate Portfolio",
      company: "Novartis AG Development",
      text: "Ambot365's integrated parametric modeling and master planning bypassed material waste constraints completely. Our 104-story regional headquarters was completed ahead of schedule with flawless precision structural tracking.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Vance",
      role: "Head of Infrastructure Projects",
      company: "AeroVanguard Complex",
      text: "From severe coastal wind dampeners to heavy vibration absorption grids, Ambot365 treated the structural concrete like a fine composite alloy. Their custom crane coordination and construction phasing are a sight to behold.",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      rating: 5
    },
    {
      id: 3,
      name: "Elena Geller",
      role: "Chief Coordinating Architect",
      company: "Metropolis Lab Group",
      text: "Synchronizing real-time BIM models directly with spatial contractor templates on-site eliminated structural collisions completely. Ambot365 delivers professional, highly reliable engineering designs.",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      rating: 5
    }
  ];

  const credentials = [
    "ISO 19650 BIM Compliant",
    "USGBC LEED Fellows Staff",
    "OSHA Diamond Level HSE",
    "EU De-Carbon Certification",
  ];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative bg-white overflow-hidden border-t border-zinc-200">

      {/* Giant ghosted section number */}
      <div className="absolute -top-8 right-0 font-display text-[20rem] leading-none text-zinc-950/[0.028] pointer-events-none select-none pr-4 z-0">
        05
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 relative z-10">

        {/* ── Header ──────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-orange" />
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">
                Client Reviews — Trusted Partner
              </span>
            </div>
            <h2 className="font-display text-6xl md:text-7xl lg:text-8xl text-zinc-950 leading-[0.88] tracking-tight">
              Client<br />
              <span className="text-brand-orange">Verification</span>
            </h2>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-4 lg:mb-2 self-start lg:self-auto">
            <div className="flex items-center gap-1.5 font-mono text-[9px] text-zinc-400 mr-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-all cursor-pointer ${
                    i === activeIndex ? 'bg-brand-orange scale-125' : 'bg-zinc-300 hover:bg-zinc-400'
                  }`}
                />
              ))}
            </div>
            <button
              id="prev-testimonial-btn"
              onClick={handlePrev}
              className="w-10 h-10 rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:text-brand-orange hover:border-brand-orange/40 transition-all flex items-center justify-center cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              id="next-testimonial-btn"
              onClick={handleNext}
              className="w-10 h-10 rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:text-brand-orange hover:border-brand-orange/40 transition-all flex items-center justify-center cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ── Main panels ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Quote panel */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
                className="h-full flex flex-col border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm"
              >
                {/* Header strip */}
                <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-brand-orange text-brand-orange" />
                    ))}
                  </div>
                  <span className="font-mono text-[9px] text-zinc-400">
                    CLIENT STATEMENT — VERIFIED
                  </span>
                </div>

                {/* Quote body */}
                <div className="px-8 pt-8 pb-6 flex-1 relative">
                  <Quote className="absolute right-8 top-6 w-20 h-20 text-zinc-950/[0.03] pointer-events-none" />
                  <p className="font-display text-2xl md:text-3xl lg:text-4xl text-zinc-950 leading-[1.15] tracking-tight">
                    "{testimonials[activeIndex].text}"
                  </p>
                </div>

                {/* Author footer */}
                <div className="px-8 py-5 border-t border-zinc-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[activeIndex].avatarUrl}
                      alt={testimonials[activeIndex].name}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full border-2 border-brand-orange/20 object-cover"
                    />
                    <div>
                      <h4 className="font-display text-sm text-zinc-950 tracking-wide uppercase">
                        {testimonials[activeIndex].name}
                      </h4>
                      <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider mt-0.5">
                        {testimonials[activeIndex].role} — <span className="text-zinc-600">{testimonials[activeIndex].company}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 font-mono text-[9px] text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 self-start md:self-auto flex-shrink-0">
                    <CheckCircle2 className="w-3 h-3" />
                    BIM_SIGN_OFF_VERIFIED
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Credentials panel */}
          <div className="lg:col-span-4">
            <div className="h-full flex flex-col border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              {/* Header strip */}
              <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50 flex items-center justify-between">
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.25em]">
                  Ambot365 Standards
                </span>
                <span className="font-mono text-[9px] text-zinc-400">
                  2026 CERTIFIED
                </span>
              </div>

              {/* Title */}
              <div className="px-8 pt-8 pb-6 border-b border-zinc-100">
                <h3 className="font-display text-3xl text-zinc-950 tracking-tight leading-none">
                  Verified<br />Credentials
                </h3>
              </div>

              {/* Credential list */}
              <div className="flex flex-col divide-y divide-zinc-100 flex-1">
                {credentials.map((cred, i) => (
                  <div key={i} className="px-8 py-4 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0 node-pulse" />
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest">{cred}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-8 py-5 border-t border-zinc-100">
                <span className="font-mono text-[9px] text-zinc-400 block uppercase tracking-wider">System Record No.</span>
                <span className="font-mono text-[10px] text-zinc-800 font-bold uppercase tracking-wider block mt-1">
                  REC_AEC_ID_2026_X9
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
