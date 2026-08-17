/**
 * Single source of truth for hero frame sequence assets.
 * Imported by the hero component and the build script (via scripts/build-frames.mjs).
 */

export type FrameVariant = 'desktop' | 'compact';

export const FRAME_CONFIG = {
  /** Source / master sequence */
  total: 240,
  /** Zero-pad width for filenames: 00000001.webp */
  pad: 8,
  /** Intrinsic aspect of the sequence (1280×720) */
  aspectRatio: 16 / 9,
  aspectRatioCss: '16 / 9',
  extension: 'webp' as const,

  desktop: {
    dir: '/frames',
    /** Every frame, full resolution */
    step: 1,
    /** Rendered frame count */
    count: 240,
  },

  compact: {
    dir: '/frames/compact',
    /** Every Nth source frame */
    step: 3,
    /** Math.ceil(total / step) */
    count: 80,
    /** Max encode width (height follows aspect) */
    maxWidth: 960,
    quality: 75,
  },
} as const;

/** 1-based source frame number for a 0-based rendered index in a variant */
export function sourceFrameNumber(variant: FrameVariant, renderedIndex: number): number {
  const step = FRAME_CONFIG[variant].step;
  return renderedIndex * step + 1;
}

/** Public URL for a 0-based rendered index */
export function frameUrl(variant: FrameVariant, renderedIndex: number): string {
  const { pad, extension } = FRAME_CONFIG;
  const dir = FRAME_CONFIG[variant].dir;
  const n = sourceFrameNumber(variant, renderedIndex);
  return `${dir}/${String(n).padStart(pad, '0')}.${extension}`;
}

/** Poster = Default hero image */
export function posterUrl(_variant?: FrameVariant): string {
  return '/default-hero-image.webp';
}

export function renderedCount(variant: FrameVariant): number {
  return FRAME_CONFIG[variant].count;
}

/** Map 0–1 scroll progress → 0-based rendered index for the variant */
export function progressToIndex(progress: number, variant: FrameVariant): number {
  const count = renderedCount(variant);
  if (count <= 1) return 0;
  const t = Math.max(0, Math.min(1, progress));
  // floor tracks continuous scroll without the “stuck then skip” of round()
  return Math.min(count - 1, Math.floor(t * (count - 1) + 1e-6));
}
