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
      let scrollFraction = 0;

      if (isMobile) {
        // Mobile: Scroll lock. The sticky wrapper holds the image and next section.
        const scrollDistance = window.innerHeight * 1.5; // Animate over 1.5 screens of scroll
        const scrolled = -rect.top;
        scrollFraction = Math.max(0, Math.min(scrolled / Math.max(scrollDistance, 1), 1));
      } else {
        const stickyH = containerRef.current?.clientHeight || window.innerHeight;
        const scrollDistance = rect.height - stickyH;
        const scrolled = -rect.top;
        scrollFraction = Math.max(0, Math.min(scrolled / Math.max(scrollDistance, 1), 1));
      }
      
      const frame = Math.floor(scrollFraction * (frameCount - 1)) + 1;
      requestAnimationFrame(() => setFrameIndex(frame));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

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
        className={`relative w-full bg-[#F8F7F4] ${isMobile ? 'pt-[80px]' : ''}`}
        style={{ height: isMobile ? '300vh' : '240vh' }} 
      >
        <div
          ref={containerRef}
          className={`${!isMobile ? 'sticky top-0 h-[100dvh] bg-[#1a1a1a] flex flex-col' : 'sticky top-[80px] w-full bg-[#F8F7F4]'} overflow-hidden`}
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

          {/* Desktop-only Overlays */}
          {!isMobile && (
            <>
              {/* Soft vignette for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

              <div className="absolute inset-0 flex flex-col justify-end p-12 lg:p-24 pointer-events-none z-10 pb-32">
                <div className="overflow-hidden mb-6">
                  <div className="uppercase tracking-[0.3em] text-[#B87333] text-sm md:text-base font-medium opacity-90">
                    Proprietary Framework
                  </div>
                </div>
                
                <h1 className="display-lg text-white max-w-5xl leading-[0.9] tracking-[-0.04em] mix-blend-overlay opacity-90 drop-shadow-2xl">
                  Ambot365
                  <br />
                  <span className="opacity-70">Construction</span>
                </h1>
              </div>

              {/* Scroll indicator desktop */}
              <div className="absolute bottom-12 right-12 z-20 pointer-events-none flex items-center gap-4">
                <span className="text-white/50 text-xs tracking-[0.3em] uppercase font-mono">Scroll</span>
                <div className="w-12 h-[1px] bg-white/20 relative overflow-hidden">
                  <div className="absolute inset-y-0 left-0 w-1/3 bg-[#B87333] animate-[slide_2s_ease-in-out_infinite]" />
                </div>
              </div>
            </>
          )}

          {/* Mobile Content inside Sticky */}
          {isMobile && children}
        </div>
      </section>

      {/* DESKTOP CONTENT: Placed naturally after the 240vh section */}
      {!isMobile && children}
    </>
  );
}
