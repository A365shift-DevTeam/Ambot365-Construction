import React, { useState } from 'react';
import { ArrowRight, Maximize2, RotateCw, Eye } from 'lucide-react';
import ThreeCanvas from './ThreeCanvas';

interface EnterpriseHeroProps {
  onNavigate: (id: string) => void;
}

const RENDER_MODES = [
  { id: 'solid', label: 'Solid', desc: 'Photoreal' },
  { id: 'wireframe', label: 'Wireframe', desc: 'Structural' },
  { id: 'xray', label: 'X-Ray', desc: 'BIM Overlay' },
  { id: 'thermal', label: 'Thermal', desc: 'Stress Map' },
  { id: 'hologram', label: 'Hologram', desc: 'Digital Twin' },
] as const;

export default function EnterpriseHero({ onNavigate }: EnterpriseHeroProps) {
  const [renderMode, setRenderMode] = useState<'wireframe' | 'xray' | 'thermal' | 'solid' | 'hologram'>('solid');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const handleModeChange = (mode: typeof renderMode) => {
    setRenderMode(mode);
  };

  const handleFullscreen = () => {
    const container = document.getElementById('hero-3d-container');
    if (!container) return;

    if (!document.fullscreenElement) {
      container.requestFullscreen?.().then(() => setIsFullscreen(true));
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false));
    }
  };

  return (
    <section id="hero" className="relative w-full bg-[#0A101F] text-white overflow-hidden">
      {/* Premium Top Gradient Bar */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C5A46E]/30 to-transparent z-30" />

      {/* 3D VIEWER - Full Hero Height */}
      <div 
        id="hero-3d-container"
        className="relative h-[100dvh] w-full min-h-[640px] flex items-center justify-center"
      >
        <div className="absolute inset-0 z-10">
          <ThreeCanvas
            scrollProgress={0}
            activeStage={0}
            renderMode={renderMode}
            focusedServiceId={null}
            focusedProjectId={null}
            enterpriseMode={true}
          />
        </div>

        {/* Subtle architectural grid overlay on 3D */}
        <div className="absolute inset-0 z-20 pointer-events-none blueprint-grid-dark opacity-60" />

        {/* Enterprise Top Bar Overlay */}
        <div className="absolute top-0 left-0 right-0 z-40 px-6 md:px-10 pt-8 pb-4 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md overflow-hidden">
                <img src="/favicon.png" alt="Ambot365 Logo" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="font-display text-[13px] font-semibold tracking-[0.18em] text-white">AMBOT365</div>
                <div className="text-[9px] text-white/50 -mt-0.5 tracking-[0.2em]">CONSTRUCTION</div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 pointer-events-auto text-xs font-medium">
            <div className="px-4 py-1.5 rounded-full border border-white/15 bg-white/5 text-white/70 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE DIGITAL TWIN • 2026
            </div>
          </div>
        </div>

        {/* Left Hero Messaging — Enterprise Grade */}
        <div className="absolute left-0 bottom-0 z-40 px-6 md:pl-12 pb-16 md:pb-20 max-w-[620px] pointer-events-none">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-white/15 bg-white/5 text-[10px] tracking-[0.18em] font-medium text-white/70">
              EST. 2001  •  GLOBAL DELIVERY
            </div>

            <h1 className="display-xl text-[64px] md:text-[84px] leading-[0.92] tracking-[-4.2px] text-white">
              Structures that<br />endure generations.
            </h1>

            <p className="max-w-md text-[15px] text-white/75 leading-relaxed tracking-[-0.1px]">
              We design and deliver landmark buildings, infrastructure, and industrial facilities 
              with uncompromising precision and a legacy mindset.
            </p>

            <div className="flex items-center gap-3 pt-3 pointer-events-auto">
              <button
                onClick={() => onNavigate('contact')}
                className="btn-enterprise btn-enterprise-primary flex items-center gap-2.5 px-7 h-12 rounded-full text-sm font-semibold tracking-wider"
              >
                REQUEST PROPOSAL
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => onNavigate('projects')}
                className="btn-enterprise btn-enterprise-secondary flex items-center gap-2.5 px-6 h-12 rounded-full text-sm font-semibold tracking-wider"
              >
                VIEW LANDMARKS
              </button>
            </div>

            <div className="flex items-center gap-8 pt-4 text-[10px] text-white/50 tracking-[0.16em] font-medium">
              <div>35+ COUNTRIES</div>
              <div>480M+ TALLEST DELIVERED</div>
              <div>0 LTI RECORD</div>
            </div>
          </div>
        </div>

        {/* Right-side Render Mode Controls — Enterprise BIM Toolbar */}
        <div className="absolute right-6 md:right-10 top-28 z-40 hidden lg:flex flex-col gap-1.5 pointer-events-auto">
          <div className="mb-2 px-3 text-[9px] text-white/50 tracking-[0.2em] font-medium">MODEL VISUALIZATION</div>
          
          {RENDER_MODES.map((mode) => {
            const isActive = renderMode === mode.id;
            return (
              <button
                key={mode.id}
                onClick={() => handleModeChange(mode.id)}
                className={`viewer-control group flex items-center justify-between px-4 py-[9px] pr-5 w-[188px] rounded-xl border text-left transition-all ${
                  isActive 
                    ? 'active border-[#B87333] bg-[#B87333] text-white' 
                    : 'border-white/15 bg-black/30 text-white/80 hover:text-white'
                }`}
              >
                <div>
                  <div className="text-sm font-semibold tracking-tight">{mode.label}</div>
                  <div className="text-[10px] opacity-60 -mt-px">{mode.desc}</div>
                </div>
                <Eye className={`w-3.5 h-3.5 transition ${isActive ? 'opacity-90' : 'opacity-40 group-hover:opacity-70'}`} />
              </button>
            );
          })}

          <div className="h-px bg-white/10 my-1.5" />

          <button
            onClick={handleFullscreen}
            className="viewer-control flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/15 bg-black/30 text-white/80 hover:text-white text-xs tracking-wider"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            IMMERSIVE VIEW
          </button>
        </div>

        {/* Bottom Scroll Indicator */}
        <div 
          onClick={() => onNavigate('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 text-white/50 hover:text-white/80 cursor-pointer transition-colors pointer-events-auto"
        >
          <div className="text-[9px] tracking-[3.5px] font-medium">SCROLL TO BEGIN</div>
          <div className="h-px w-7 bg-white/40" />
        </div>

        {/* Bottom-right Telemetry Hint */}
        <div className="absolute bottom-7 right-7 z-40 hidden xl:block pointer-events-none">
          <div className="text-right">
            <div className="text-[9px] text-white/40 tracking-widest font-mono">INTERACTIVE 3D MODEL</div>
            <div className="text-[10px] text-white/55 font-medium tracking-tight">Drag to orbit • Scroll drives construction</div>
          </div>
        </div>
      </div>

      {/* Subtle bottom architectural transition */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8F7F4] to-transparent z-30 pointer-events-none" />
    </section>
  );
}
