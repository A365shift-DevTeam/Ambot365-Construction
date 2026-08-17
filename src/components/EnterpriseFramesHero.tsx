import React, { useEffect, useRef, useState } from 'react';
import { useLenis } from 'lenis/react';
import {
  FRAME_CONFIG,
  frameUrl,
  posterUrl,
  progressToIndex,
  renderedCount,
  type FrameVariant,
} from '../config/frames';

interface EnterpriseFramesHeroProps {
  onNavigate: (id: string) => void;
  children?: React.ReactNode;
}

const COMPACT_MQ = '(max-width: 1023px), (orientation: portrait)';
const REDUCED_MQ = '(prefers-reduced-motion: reduce)';
/** Parallel loaders — fills the sequence quickly so scrubbing never stalls */
const LOAD_CONCURRENCY = 32;
/** Unlock canvas once this fraction is decoded (rest continues in background) */
const READY_THRESHOLD = 0.4;

function isCompactViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(COMPACT_MQ).matches;
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia(REDUCED_MQ).matches;
}

function drawImageFitted(
  ctx: CanvasRenderingContext2D,
  image: HTMLImageElement,
  boxW: number,
  boxH: number,
  mode: 'cover' | 'contain',
) {
  const imgW = image.naturalWidth || image.width;
  const imgH = image.naturalHeight || image.height;
  if (!imgW || !imgH || !boxW || !boxH) return;

  if (mode === 'cover') {
    const scale = Math.max(boxW / imgW, boxH / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    ctx.drawImage(image, (boxW - dw) / 2, (boxH - dh) / 2, dw, dh);
  } else {
    const scale = Math.min(boxW / imgW, boxH / imgH);
    const dw = imgW * scale;
    const dh = imgH * scale;
    ctx.drawImage(image, (boxW - dw) / 2, 0, dw, dh);
  }
}

/** Prefer holding the previous frame (no forward jumps while still loading) */
function resolveFrame(target: number, loaded: boolean[], count: number): number {
  if (target < 0 || target >= count) return -1;
  if (loaded[target]) return target;
  for (let i = target - 1; i >= 0; i--) {
    if (loaded[i]) return i;
  }
  for (let i = target + 1; i < count; i++) {
    if (loaded[i]) return i;
  }
  return -1;
}

function readNavHeightPx(): number {
  if (typeof window === 'undefined') return 80;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue('--nav-height')
    .trim();
  if (!raw) return 80;
  const probe = document.createElement('div');
  probe.style.cssText = `position:absolute;visibility:hidden;height:${raw}`;
  document.documentElement.appendChild(probe);
  const h = probe.offsetHeight || 80;
  probe.remove();
  return h;
}

export default function EnterpriseFramesHero({
  onNavigate: _onNavigate,
  children,
}: EnterpriseFramesHeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const loadPctElRef = useRef<HTMLSpanElement>(null);

  const [variant, setVariant] = useState<FrameVariant>(() =>
    isCompactViewport() ? 'compact' : 'desktop',
  );
  const [reducedMotion, setReducedMotion] = useState(() => prefersReducedMotion());
  const [ready, setReady] = useState(false);

  // Imperative — never drive frames through React state
  const progressRef = useRef(0);
  const lastDrawnRef = useRef(-1);
  const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const variantRef = useRef(variant);
  const reducedRef = useRef(reducedMotion);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const readyRef = useRef(false);
  const navHRef = useRef(80);
  const needsPaintRef = useRef(true);
  const loopingRef = useRef(false);
  const rafLoopRef = useRef(0);
  const idleFramesRef = useRef(0);

  variantRef.current = variant;
  reducedRef.current = reducedMotion;
  readyRef.current = ready;

  const paint = () => {
    if (reducedRef.current) return;

    const ctx = ctxRef.current;
    if (!ctx) return;

    const v = variantRef.current;
    const count = renderedCount(v);
    const target = progressToIndex(progressRef.current, v);
    const idx = resolveFrame(target, loadedRef.current, count);
    if (idx < 0) return;
    if (idx === lastDrawnRef.current) return;

    const image = imagesRef.current[idx];
    if (!image || !image.complete || !image.naturalWidth) return;

    const { w, h, dpr } = sizeRef.current;
    if (w < 1 || h < 1) return;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, w, h);

    drawImageFitted(ctx, image, w, h, 'cover');

    lastDrawnRef.current = idx;
  };

  /** Sticky rAF loop — keeps painting every display frame while scroll is active */
  const ensureLoop = () => {
    if (loopingRef.current) {
      idleFramesRef.current = 0;
      return;
    }
    loopingRef.current = true;
    idleFramesRef.current = 0;

    const tick = () => {
      if (needsPaintRef.current) {
        needsPaintRef.current = false;
        idleFramesRef.current = 0;
        paint();
      } else {
        idleFramesRef.current += 1;
      }

      // Stop after ~0.5s idle to save battery; restart on next scroll
      if (idleFramesRef.current > 30) {
        loopingRef.current = false;
        return;
      }

      rafLoopRef.current = requestAnimationFrame(tick);
    };

    rafLoopRef.current = requestAnimationFrame(tick);
  };

  const requestPaint = (force = false) => {
    if (force) lastDrawnRef.current = -1;
    needsPaintRef.current = true;
    ensureLoop();
  };

  const updateProgress = () => {
    const section = sectionRef.current;
    if (!section || reducedRef.current) return;

    const rect = section.getBoundingClientRect();
    const v = variantRef.current;
    const stickyH =
      stickyRef.current?.clientHeight ||
      (v === 'compact'
        ? window.innerHeight - navHRef.current
        : window.innerHeight);
    const scrollDistance = Math.max(rect.height - stickyH, 1);
    const scrolled = -rect.top;
    const next = Math.max(0, Math.min(scrolled / scrollDistance, 1));

    // Always flag paint — even tiny Lenis steps must advance frames
    progressRef.current = next;
    requestPaint(false);
  };

  // matchMedia
  useEffect(() => {
    const compactMq = window.matchMedia(COMPACT_MQ);
    const reducedMq = window.matchMedia(REDUCED_MQ);

    const onCompact = () => setVariant(compactMq.matches ? 'compact' : 'desktop');
    const onReduced = () => setReducedMotion(reducedMq.matches);

    navHRef.current = readNavHeightPx();
    onCompact();
    onReduced();

    compactMq.addEventListener('change', onCompact);
    reducedMq.addEventListener('change', onReduced);
    const onWinResize = () => {
      navHRef.current = readNavHeightPx();
      updateProgress();
    };
    window.addEventListener('resize', onWinResize);

    return () => {
      compactMq.removeEventListener('change', onCompact);
      reducedMq.removeEventListener('change', onReduced);
      window.removeEventListener('resize', onWinResize);
      cancelAnimationFrame(rafLoopRef.current);
      loopingRef.current = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Parallel preload — no React setState per image (that was killing FPS)
  useEffect(() => {
    let cancelled = false;
    const count = renderedCount(variant);
    const loaded = new Array(count).fill(false);
    const images: (HTMLImageElement | null)[] = new Array(count).fill(null);

    loadedRef.current = loaded;
    imagesRef.current = images;
    lastDrawnRef.current = -1;
    readyRef.current = false;
    setReady(false);
    if (loadPctElRef.current) loadPctElRef.current.textContent = '0';

    let finished = 0;
    let cursor = 0;

    const onOneDone = (i: number, img: HTMLImageElement | null, ok: boolean) => {
      if (cancelled) return;

      if (ok && img && img.naturalWidth > 0) {
        images[i] = img;
        loaded[i] = true;
      }

      finished++;
      const pct = Math.round((finished / count) * 100);
      // Imperative DOM write — zero React cost
      if (loadPctElRef.current) loadPctElRef.current.textContent = String(pct);

      if (!readyRef.current && finished / count >= READY_THRESHOLD && loaded[0]) {
        readyRef.current = true;
        setReady(true);
        requestPaint(true);
      }

      if (finished === count && !cancelled) {
        readyRef.current = true;
        setReady(true);
        requestPaint(true);
      }
    };

    const loadOne = (i: number) =>
      new Promise<void>((resolve) => {
        if (cancelled) {
          resolve();
          return;
        }
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => {
          // decode() so the first draw doesn't hitch
          const finish = () => {
            onOneDone(i, img, true);
            resolve();
          };
          if (img.decode) {
            img.decode().then(finish).catch(finish);
          } else {
            finish();
          }
        };
        img.onerror = () => {
          onOneDone(i, null, false);
          resolve();
        };
        img.src = frameUrl(variant, i);
      });

    const worker = async () => {
      while (!cancelled) {
        const i = cursor++;
        if (i >= count) break;
        await loadOne(i);
      }
    };

    void Promise.all(
      Array.from({ length: Math.min(LOAD_CONCURRENCY, count) }, () => worker()),
    );

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafLoopRef.current);
      loopingRef.current = false;
      for (let i = 0; i < count; i++) {
        const img = images[i];
        if (img) {
          img.onload = null;
          img.onerror = null;
          img.src = '';
        }
        images[i] = null;
        loaded[i] = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  // Canvas measure
  useEffect(() => {
    const plate = plateRef.current;
    const canvas = canvasRef.current;
    if (!plate || !canvas || reducedMotion) return;

    let raf = 0;

    const measure = () => {
      const rect = plate.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const prev = sizeRef.current;
      if (prev.w !== w || prev.h !== h || prev.dpr !== dpr) {
        sizeRef.current = { w, h, dpr };
        const bw = Math.round(w * dpr);
        const bh = Math.round(h * dpr);

        if (canvas.width !== bw || canvas.height !== bh) {
          canvas.width = bw;
          canvas.height = bh;
          canvas.style.width = `${w}px`;
          canvas.style.height = `${h}px`;
        }

        const ctx =
          canvas.getContext('2d', { alpha: false, desynchronized: true }) ||
          canvas.getContext('2d', { alpha: false });
        ctxRef.current = ctx;
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'medium'; // faster than 'high' while scrolling
        }
      }

      requestPaint(true);
    };

    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(measure);
    };

    measure();
    const ro = new ResizeObserver(onResize);
    ro.observe(plate);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant, reducedMotion]);

  // Lenis + native scroll both feed the same progress ref
  useLenis(() => {
    updateProgress();
  });

  useEffect(() => {
    const onScroll = () => updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener('scroll', onScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [variant]);

  const isCompact = variant === 'compact';
  const poster = posterUrl(variant);

  return (
    <>
      <section
        ref={sectionRef}
        id="hero"
        className="relative w-full bg-[#F8F7F4]"
        style={{ height: isCompact ? '260vh' : '240vh' }}
      >
        <div
          ref={stickyRef}
          className="sticky top-0 h-[100dvh] w-full bg-[#1a1a1a] overflow-hidden"
        >
          <div
            ref={plateRef}
            className="absolute inset-0 w-full h-full bg-[#1a1a1a] overflow-hidden"
          >
            <img
              src={poster}
              alt="AMBOT365 Construction Landmark Structure"
              width={2752}
              height={1536}
              decoding="async"
              fetchPriority="high"
              draggable={false}
              className="absolute inset-0 w-full h-full pointer-events-none select-none"
              style={{
                objectFit: 'cover',
                objectPosition: 'center center',
                opacity: reducedMotion || !ready ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
            />

            {!reducedMotion && (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{
                  opacity: ready ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
                aria-hidden
              />
            )}

            {!ready && !reducedMotion && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-20 gap-2 bg-[#1a1a1a]/70">
                <div className="w-8 h-8 border-2 border-[#B87333]/30 border-t-[#B87333] rounded-full animate-spin" />
                <div className="text-[10px] text-white/50 tracking-[0.25em] font-mono">
                  LOADING — <span ref={loadPctElRef}>0</span>%
                </div>
              </div>
            )}

            <div className="absolute inset-0 blueprint-grid opacity-[0.10] pointer-events-none" />
          </div>
        </div>
      </section>

      {children}
    </>
  );
}
