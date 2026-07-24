/**
 * Build compact (decimated + smaller) WebP frames from the master sequence.
 * Mirrors src/config/frames.ts — keep these values in sync.
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

// ── Keep in sync with src/config/frames.ts ──────────────────────────
const FRAME_CONFIG = {
  total: 240,
  pad: 8,
  extension: 'webp',
  desktop: { dir: 'public/frames', step: 1, count: 240 },
  compact: {
    dir: 'public/frames/compact',
    step: 3,
    count: 80,
    maxWidth: 960,
    quality: 75,
  },
};
// ────────────────────────────────────────────────────────────────────

const { total, pad, extension, compact } = FRAME_CONFIG;
const outDir = path.join(root, compact.dir);
const srcDir = path.join(root, FRAME_CONFIG.desktop.dir);

fs.mkdirSync(outDir, { recursive: true });

function sourceName(n) {
  return `${String(n).padStart(pad, '0')}.${extension}`;
}

const indices = [];
for (let i = 0; i < compact.count; i++) {
  const sourceNum = i * compact.step + 1;
  if (sourceNum > total) break;
  indices.push(sourceNum);
}

console.log(`Building ${indices.length} compact frames → ${compact.dir}`);
console.log(`  step=${compact.step}, maxWidth=${compact.maxWidth}, quality=${compact.quality}`);

let done = 0;
const concurrency = 8;

async function convertOne(sourceNum) {
  const input = path.join(srcDir, sourceName(sourceNum));
  const output = path.join(outDir, sourceName(sourceNum));
  if (!fs.existsSync(input)) {
    console.warn('Missing source:', input);
    return;
  }
  await sharp(input)
    .resize({ width: compact.maxWidth, withoutEnlargement: true })
    .webp({ quality: compact.quality })
    .toFile(output);
  done++;
  if (done % 20 === 0 || done === indices.length) {
    console.log(`  ${done}/${indices.length}`);
  }
}

for (let i = 0; i < indices.length; i += concurrency) {
  await Promise.all(indices.slice(i, i + concurrency).map(convertOne));
}

console.log('Compact frames ready.');
