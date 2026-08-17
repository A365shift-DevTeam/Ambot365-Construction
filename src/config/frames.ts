/**
 * Single source of truth for hero frame sequence assets.
 * Lightweight, unified single frame sequence (80 high-efficiency WebP frames).
 */

export type FrameVariant = 'default' | 'desktop' | 'compact';

export const FRAME_CONFIG = {
  /** Total frames in the sequence */
  count: 80,
  /** Zero-pad width for filenames: 00000001.webp */
  pad: 8,
  /** Intrinsic aspect of the sequence (1280×720) */
  aspectRatio: 16 / 9,
  aspectRatioCss: '16 / 9',
  extension: 'webp' as const,
  dir: '/frames',
} as const;

/** 1-based frame number for a 0-based rendered index */
export function sourceFrameNumber(_variant?: FrameVariant, renderedIndex: number = 0): number {
  return renderedIndex + 1;
}

/** Public URL for a 0-based rendered index */
export function frameUrl(_variant?: FrameVariant, renderedIndex: number = 0): string {
  const { pad, extension, dir } = FRAME_CONFIG;
  const n = renderedIndex + 1;
  return `${dir}/${String(n).padStart(pad, '0')}.${extension}`;
}

/** Poster = Default hero image */
export function posterUrl(_variant?: FrameVariant): string {
  return '/default-hero-image.webp';
}

export function renderedCount(_variant?: FrameVariant): number {
  return FRAME_CONFIG.count;
}

/** Map 0–1 scroll progress → 0-based rendered index */
export function progressToIndex(progress: number, _variant?: FrameVariant): number {
  const count = FRAME_CONFIG.count;
  if (count <= 1) return 0;
  const t = Math.max(0, Math.min(1, progress));
  return Math.min(count - 1, Math.floor(t * (count - 1) + 1e-6));
}
