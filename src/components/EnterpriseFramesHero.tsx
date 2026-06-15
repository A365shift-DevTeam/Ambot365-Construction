import React, { useState, useEffect, useRef, useCallback } from 'react';

interface EnterpriseFramesHeroProps {
  onNavigate: (id: string) => void;
  children?: React.ReactNode;
}

export default function EnterpriseFramesHero({ onNavigate, children }: EnterpriseFramesHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [frameIndex, setFrameIndex] = useState(1);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 1024);
  const [imgAspect, setImgAspect] = useState(16 / 9);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const frameCount = 156;

  // Detect mobile / tablet
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024); // lg breakpoint inclusive, applies stacked layout to iPad Pro
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Preload all frames
  useEffect(() => {
    let loaded = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = `/frames/ezgif-frame-${String(i).padStart(3, '0')}.jpg`;
      img.onload = img.onerror = () => {
        loaded++;
        setLoadProgress(Math.round((loaded / frameCount) * 100));
        if (loaded === frameCount) {
          setImagesPreloaded(true);
          const first = images.find(im => im.complete && im.width > 0);
          if (first) setImgAspect(first.width / first.height);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;
  }, []);

  // Scroll-driven frame animation
  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const stickyH = containerRef.current?.clientHeight || window.innerHeight;
      const scrollDistance = rect.height - stickyH;
      const scrolled = -rect.top;
      
      const scrollFraction = Math.max(0, Math.min(scrolled / Math.max(scrollDistance, 1), 1));
      const frame = Math.floor(scrollFraction * (frameCount - 1)) + 1;

      requestAnimationFrame(() => setFrameIndex(frame));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Draw frame to canvas
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container || !imagesPreloaded) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const image = imagesRef.current[index - 1];
    if (!image || !image.complete || image.width === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    // On mobile, the canvas wrapper dictates the height. On desktop, the container does.
    const displayW = isMobile ? container.clientWidth : container.clientWidth;
    // On mobile, force canvas to aspect ratio height. On desktop, fill container.
    const displayH = isMobile ? container.clientWidth / imgAspect : container.clientHeight;

    if (canvas.width !== displayW * dpr || canvas.height !== displayH * dpr) {
      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
      canvas.style.width = `${displayW}px`;
      canvas.style.height = `${displayH}px`;
    }

    if (isMobile) {
      // Mobile: exact fit, no crop
      ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
    } else {
      // Desktop: cover fit
      const iAspect = image.width / image.height;
      const cAspect = canvas.width / canvas.height;
      let sx = 0, sy = 0, sw = image.width, sh = image.height;

      if (iAspect > cAspect) {
        sw = image.height * cAspect;
        sx = (image.width - sw) / 2;
      } else {
        sh = image.width / cAspect;
        sy = (image.height - sh) / 2;
      }
      ctx.drawImage(image, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
    }
  }, [imagesPreloaded, isMobile, imgAspect]);

  useEffect(() => { drawFrame(frameIndex); }, [frameIndex, imagesPreloaded, drawFrame]);

  useEffect(() => {
    const handleResize = () => drawFrame(frameIndex);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [frameIndex, drawFrame]);

  return (
    <>
      <section
        ref={sectionRef}
        id="hero"
        className="relative w-full bg-[#F8F7F4]"
        style={{ height: '240vh' }} // Provide plenty of scroll distance to watch frames fully
      >
        <div
          ref={containerRef}
          className={`sticky w-full overflow-hidden flex flex-col ${isMobile ? 'top-[80px] bg-[#F8F7F4]' : 'top-0 bg-[#1a1a1a]'}`}
          style={{ height: isMobile ? 'calc(100dvh - 80px)' : '100dvh' }}
        >
          {/* Canvas Wrapper */}
          <div className={`relative w-full shrink-0 ${!isMobile ? 'h-full absolute inset-0' : ''}`}>
            <canvas
              ref={canvasRef}
              className="w-full"
              style={{ 
                opacity: imagesPreloaded ? 1 : 0, 
                transition: 'opacity 0.5s ease',
                height: isMobile ? `calc(100vw / ${imgAspect})` : '100%',
                objectFit: isMobile ? 'contain' : 'cover'
              }}
            />

            {!imagesPreloaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-2 bg-[#1a1a1a]">
                <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-[#B87333]/30 border-t-[#B87333] rounded-full animate-spin" />
                <div className="text-[9px] md:text-[11px] text-white/50 tracking-[0.25em] font-mono">
                  LOADING — {loadProgress}%
                </div>
              </div>
            )}
            
            {/* Mobile blueprint grid only covers the image area */}
            <div className={`absolute inset-0 blueprint-grid opacity-[0.12] pointer-events-none ${!isMobile ? 'h-full' : ''}`} />
          </div>

          {/* MOBILE CONTENT: Placed inside sticky container right below image */}
          {isMobile && (
            <div className="flex-1 w-full overflow-y-auto bg-[#F8F7F4]">
              {children}
            </div>
          )}

          {/* Desktop-only Overlays */}
          {!isMobile && (
            <>
              <div className="absolute top-20 left-12 z-30 flex items-center gap-3 pointer-events-none">
                <div className="w-8 h-8 rounded-md overflow-hidden shadow-sm">
                  <img src="/favicon.png" alt="Ambot365 Logo" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col -space-y-px">
                  <div className="font-display font-semibold tracking-[0.2em] text-[13px] text-white">AMBOT365</div>
                  <div className="text-[8px] text-white/70 tracking-[0.22em]">CONSTRUCTION</div>
                </div>
              </div>

              <div
                onClick={() => onNavigate('contact')}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 cursor-pointer text-white/60 hover:text-white/90 transition-colors"
              >
                <div className="text-[9px] font-medium tracking-[3.5px]">SCROLL</div>
                <div className="h-px w-5 bg-white/30" />
              </div>

              <div className="absolute bottom-8 right-8 hidden lg:block z-30 text-right pointer-events-none">
                <div className="text-[9px] text-white/50 tracking-[2px] font-mono">CONSTRUCTION SEQUENCE • 156 FRAMES</div>
              </div>
            </>
          )}
        </div>
      </section>

      {/* DESKTOP CONTENT: Placed naturally after the 240vh section */}
      {!isMobile && children}
    </>
  );
}
