import React, { useState, useEffect, useRef } from 'react';

export default function HeroBackgroundFrames() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [frameIndex, setFrameIndex] = useState(1);
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const imagesRef = useRef<HTMLImageElement[]>([]);

  const frameCount = 156;

  // Preload images
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

  // Scroll handler
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

  // Render to canvas
  useEffect(() => {
    if (!imagesPreloaded || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    const image = imagesRef.current[frameIndex - 1];

    if (image && image.complete) {
      if (canvas.width !== image.width) canvas.width = image.width;
      if (canvas.height !== image.height) canvas.height = image.height;

      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(image, 0, 0);
    }
  }, [frameIndex, imagesPreloaded]);

  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-zinc-100">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500"
        style={{ opacity: imagesPreloaded ? 1 : 0 }}
      />
    </div>
  );
}
