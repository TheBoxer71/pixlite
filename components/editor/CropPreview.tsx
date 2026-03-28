'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';
import { Move } from 'lucide-react';

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

interface CropPreviewProps {
  onDone?: () => void;
}

export function CropPreview({ onDone }: CropPreviewProps) {
  const activeImage = useEditorStore((s) =>
    s.images.find((i) => i.id === s.activeImageId)
  );
  const settings = useEditorStore((s) => s.settings);
  const setCropOffset = useEditorStore((s) => s.setCropOffset);

  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ w: 0, h: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const dragStartRef = useRef<{
    x: number;
    y: number;
    offsetX: number;
    offsetY: number;
  } | null>(null);

  // Measure container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setContainerSize({
          w: entry.contentRect.width,
          h: entry.contentRect.height,
        });
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!activeImage || !settings.width || !settings.height) return null;

  const srcW = activeImage.originalWidth;
  const srcH = activeImage.originalHeight;
  const dstW = settings.width;
  const dstH = settings.height;
  const dstAspect = dstW / dstH;
  const srcAspect = srcW / srcH;

  // Calculate frame dimensions that fit inside the container
  const cW = containerSize.w || 600;
  const cH = containerSize.h || 400;

  let frameW: number, frameH: number;
  if (cW / cH > dstAspect) {
    // Container is wider than target — fit by height
    frameH = cH * 0.85;
    frameW = frameH * dstAspect;
  } else {
    // Container is taller — fit by width
    frameW = cW * 0.85;
    frameH = frameW / dstAspect;
  }

  // Scale the source image to "cover" the frame
  const scale = Math.max(frameW / srcW, frameH / srcH);
  const imgDisplayW = srcW * scale;
  const imgDisplayH = srcH * scale;

  // Pan range — how much the image can move beyond the frame
  const panRangeX = imgDisplayW - frameW;
  const panRangeY = imgDisplayH - frameH;

  // Image position based on crop offset
  const frameLeft = (cW - frameW) / 2;
  const frameTop = (cH - frameH) / 2;
  const imgLeft = frameLeft - panRangeX * settings.cropOffset.x;
  const imgTop = frameTop - panRangeY * settings.cropOffset.y;

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      setHasInteracted(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        offsetX: settings.cropOffset.x,
        offsetY: settings.cropOffset.y,
      };
    },
    [settings.cropOffset]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging || !dragStartRef.current) return;
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;

      // Dragging the image right = crop moves left, so subtract
      const newX =
        panRangeX > 0
          ? clamp(dragStartRef.current.offsetX - dx / panRangeX, 0, 1)
          : 0.5;
      const newY =
        panRangeY > 0
          ? clamp(dragStartRef.current.offsetY - dy / panRangeY, 0, 1)
          : 0.5;

      setCropOffset({ x: newX, y: newY });
    },
    [isDragging, panRangeX, panRangeY, setCropOffset]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
    dragStartRef.current = null;
  }, []);

  // Only show if aspect ratios actually differ
  const cropNeeded = Math.abs(srcAspect - dstAspect) > 0.01;
  if (!cropNeeded) return null;

  return (
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg bg-bg-base border border-border-default"
        style={{
          height: `min(70vh, ${Math.round(frameH / 0.85 + 40)}px)`,
          touchAction: 'none',
          cursor: isDragging ? 'grabbing' : 'grab',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Source image — positioned behind the frame */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={activeImage.originalUrl}
          alt="Crop preview"
          className="absolute select-none pointer-events-none"
          style={{
            width: imgDisplayW,
            height: imgDisplayH,
            left: imgLeft,
            top: imgTop,
          }}
          draggable={false}
        />

        {/* Darkened overlay — top */}
        <div
          className="absolute left-0 right-0 top-0 bg-black/60 pointer-events-none"
          style={{ height: frameTop }}
        />
        {/* Darkened overlay — bottom */}
        <div
          className="absolute left-0 right-0 bottom-0 bg-black/60 pointer-events-none"
          style={{ height: cH - frameTop - frameH }}
        />
        {/* Darkened overlay — left */}
        <div
          className="absolute left-0 bg-black/60 pointer-events-none"
          style={{ top: frameTop, width: frameLeft, height: frameH }}
        />
        {/* Darkened overlay — right */}
        <div
          className="absolute right-0 bg-black/60 pointer-events-none"
          style={{
            top: frameTop,
            width: cW - frameLeft - frameW,
            height: frameH,
          }}
        />

        {/* Crop frame border */}
        <div
          className="absolute border-2 border-white/70 rounded-sm pointer-events-none z-10"
          style={{
            left: frameLeft,
            top: frameTop,
            width: frameW,
            height: frameH,
          }}
        >
          {/* Rule of thirds grid lines */}
          <div className="absolute inset-0">
            <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white/20" />
            <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white/20" />
            <div className="absolute top-1/3 left-0 right-0 h-px bg-white/20" />
            <div className="absolute top-2/3 left-0 right-0 h-px bg-white/20" />
          </div>
        </div>

        {/* Dimension label */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10">
          <span className="px-2 py-0.5 text-[10px] font-mono font-medium text-white/80 bg-black/60 rounded backdrop-blur-sm">
            {dstW} × {dstH}
          </span>
        </div>

        {/* Drag hint */}
        {!hasInteracted && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center gap-1.5 px-3 py-1.5 bg-black/70 rounded-lg backdrop-blur-sm">
            <Move className="w-4 h-4 text-white/80" />
            <span className="text-[11px] font-medium text-white/80">
              Drag to position
            </span>
          </div>
        )}
      </div>

      {/* Done button */}
      {onDone && (
        <button
          onClick={onDone}
          className="absolute top-2 right-2 z-20 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-accent-brand rounded-md hover:bg-accent-brand/90 transition-colors"
        >
          Done
        </button>
      )}
    </div>
  );
}
