import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface EnterpriseFramesHeroProps {
  onNavigate: (id: string) => void;
}

export default function EnterpriseFramesHero({ onNavigate }: EnterpriseFramesHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameIndex, setFrameIndex] = useState(1);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const frameCount = 156;

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = img.onerror = () => {
        loaded++;
        if (loaded === frameCount) {
          setImagesPreloaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Scroll-driven frame animation
  useEffect(() => {
    const handleScroll = () => {
      const container = canvasRef.current?.closest('section');
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollDistance = rect.height - window.innerHeight;
      const scrolled = -rect.top;
      const scrollFraction = Math.max(0, Math.min(scrolled / Math.max(scrollDistance, 1), 1));
      const frame = Math.floor(scrollFraction * (frameCount - 1)) + 1;

      requestAnimationFrame(() => setFrameIndex(frame));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Draw current frame to canvas
  useEffect(() => {
    if (!imagesPreloaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    const image = imagesRef.current[frameIndex - 1];

    if (image && image.complete && image.width > 0) {
      if (canvas.width !== image.width) canvas.width = image.width;
      if (canvas.height !== image.height) canvas.height = image.height;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
    }
  }, [frameIndex, imagesPreloaded]);

  return (
    <section id="hero" className="relative h-[240vh] w-full bg-[#F8F7F4]">
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#1a1a1a]">
        
        {/* The Frame Sequence Canvas — Full visibility, no heavy overlays */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover object-center"
          style={{ opacity: imagesPreloaded ? 1 : 0 }}
        />

        {/* Extremely subtle grid — almost invisible so frames are clean */}
        <div className="absolute inset-0 blueprint-grid opacity-[0.12] pointer-events-none" />

        {/* Minimal top-left logo only — very restrained */}
        <div className="absolute top-8 left-8 md:left-12 z-30 flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#B87333] flex items-center justify-center shadow-sm">
            <span className="text-white text-[14px] font-bold tracking-[-1.5px]">A</span>
          </div>
          <div className="flex flex-col -space-y-px">
            <div className="font-display font-semibold tracking-[0.2em] text-[#0B111F] text-[13px] md:text-white">AMBOT365</div>
            <div className="text-[8px] text-[#0B111F]/45 md:text-white/70 tracking-[0.22em]">ENGINEERING</div>
          </div>
        </div>

        {/* Very minimal bottom scroll indicator */}
        <div 
          onClick={() => onNavigate('about')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 cursor-pointer text-[#0B111F]/35 md:text-white/60 hover:text-[#0B111F]/55 md:hover:text-white/90 transition-colors"
        >
          <div className="text-[9px] font-medium tracking-[3.5px]">SCROLL</div>
          <div className="h-px w-5 bg-[#0B111F]/25 md:bg-white/30" />
        </div>

        {/* Small technical label bottom right — very quiet */}
        <div className="absolute bottom-8 right-8 hidden lg:block z-30 text-right">
          <div className="text-[9px] text-[#0B111F]/30 md:text-white/50 tracking-[2px] font-mono">CONSTRUCTION SEQUENCE • 156 FRAMES</div>
        </div>
      </div>
    </section>
  );
}
