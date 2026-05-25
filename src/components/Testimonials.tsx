import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';
import { TestimonialItem } from '../types';

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials: TestimonialItem[] = [
    {
      id: 1,
      name: "Jean-Pierre Laurent",
      role: "VP of Real Estate Portfolio",
      company: "Novartis AG Development",
      text: "Ambot365 delivered our 104-storey headquarters ahead of programme with zero structural defects at practical completion. Their integrated BIM coordination eliminated clash conflicts that would have cost us weeks on site.",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      rating: 5
    },
    {
      id: 2,
      name: "Marcus Vance",
      role: "Head of Infrastructure Projects",
      company: "AeroVanguard Complex",
      text: "The structural engineering team handled a complex cantilever transfer structure that three other firms had declined. Their approach to seismic isolation and concrete mix design on this coastal site was outstanding.",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      rating: 5
    },
    {
      id: 3,
      name: "Elena Geller",
      role: "Chief Coordinating Architect",
      company: "Metropolis Lab Group",
      text: "From tender through to handover, Ambot365 maintained full programme transparency and proactive issue resolution. The MEP coordination on 45 levels was executed without a single services clash — exceptional work.",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      rating: 5
    }
  ];

  const credentials = [
    "ISO 19650 BIM Level 2 Certified",
    "USGBC LEED Fellows Accredited",
    "OSHA Diamond Level Safety Rating",
    "EU Embodied Carbon Certified",
  ];

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % testimonials.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section id="testimonials" className="relative bg-white overflow-hidden border-t border-zinc-200">

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-24 relative z-10">

        {/* ── Header ──────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-brand-orange" />
              <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.3em]">
                Client Feedback
              </span>
            </div>
            <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-zinc-950 leading-[1.1] tracking-tight">
              Trusted by<br />
              <span className="text-brand-orange">Industry Leaders</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 self-start lg:self-auto lg:mb-2">
            <div className="flex items-center gap-1.5 mr-2">
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

        {/* ── Panels ──────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

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
                <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50 flex items-center gap-1">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-brand-orange text-brand-orange" />
                  ))}
                </div>

                <div className="px-8 pt-8 pb-6 flex-1 relative">
                  <Quote className="absolute right-8 top-6 w-20 h-20 text-zinc-950/[0.03] pointer-events-none" />
                  <p className="font-display font-semibold text-xl md:text-2xl text-zinc-950 leading-[1.4] tracking-tight">
                    "{testimonials[activeIndex].text}"
                  </p>
                </div>

                <div className="px-8 py-5 border-t border-zinc-100 flex items-center gap-4">
                  <img
                    src={testimonials[activeIndex].avatarUrl}
                    alt={testimonials[activeIndex].name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full border-2 border-brand-orange/20 object-cover flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-display font-black text-sm text-zinc-950 tracking-wide uppercase">
                      {testimonials[activeIndex].name}
                    </h4>
                    <p className="font-mono text-[9px] text-zinc-400 uppercase tracking-wider mt-0.5">
                      {testimonials[activeIndex].role} — <span className="text-zinc-600">{testimonials[activeIndex].company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="lg:col-span-4">
            <div className="h-full flex flex-col border border-zinc-200 rounded-2xl overflow-hidden bg-white shadow-sm">
              <div className="px-8 py-5 border-b border-zinc-100 bg-zinc-50">
                <span className="font-mono text-[9px] text-brand-orange uppercase tracking-[0.25em]">
                  Certifications
                </span>
              </div>

              <div className="px-8 pt-8 pb-6 border-b border-zinc-100">
                <h3 className="font-display font-extrabold text-2xl text-zinc-950 tracking-tight leading-tight">
                  Industry<br />Accreditations
                </h3>
              </div>

              <div className="flex flex-col divide-y divide-zinc-100 flex-1">
                {credentials.map((cred, i) => (
                  <div key={i} className="px-8 py-4 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-orange flex-shrink-0" />
                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest leading-snug">{cred}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
