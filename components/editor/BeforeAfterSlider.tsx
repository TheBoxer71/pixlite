'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';
import { needsCrop } from '@/lib/utils/imageUtils';
import { CropPreview } from './CropPreview';
import { ChevronLeft, ChevronRight, Crop } from 'lucide-react';

export function BeforeAfterSlider() {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showCropPreview, setShowCropPreview] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeImage = useEditorStore((s) =>
    s.images.find((i) => i.id === s.activeImageId)
  );
  const settings = useEditorStore((s) => s.settings);

  const cropNeeded = activeImage
    ? needsCrop(
        activeImage.originalWidth,
        activeImage.originalHeight,
        settings.width,
        settings.height
      )
    : false;

  // Auto-show crop preview when crop becomes needed (e.g. user picks a preset)
  useEffect(() => {
    if (cropNeeded) setShowCropPreview(true);
    else setShowCropPreview(false);
  }, [cropNeeded, settings.presetId, settings.width, settings.height]);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(percent);
  }, []);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      setIsDragging(true);
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = e.shiftKey ? 10 : 1;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + step));
    }
  }, []);

  if (!activeImage) return null;

  // Show crop preview when crop is needed and user hasn't dismissed it
  if (cropNeeded && showCropPreview) {
    return (
      <div className="relative w-full select-none">
        <CropPreview onDone={() => setShowCropPreview(false)} />
      </div>
    );
  }

  const showProcessed = !!activeImage.processedUrl;

  // When crop is active, use the cropped preview as the "before" image
  // so both sides have the same aspect ratio
  const beforeUrl = (cropNeeded && activeImage.croppedPreviewUrl)
    ? activeImage.croppedPreviewUrl
    : activeImage.originalUrl;

  return (
    <div className="relative w-full select-none">
      <div
        ref={containerRef}
        className="relative overflow-hidden rounded-lg bg-bg-surface border border-border-default cursor-col-resize"
        style={{ touchAction: 'none' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        {/* Original / cropped-original image (full, behind) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeUrl}
          alt="Original"
          className="w-full h-auto block max-h-[70vh] object-contain mx-auto"
          draggable={false}
        />

        {/* Optimized image (clipped overlay) */}
        {showProcessed && (
          <div
            className="absolute inset-0"
            style={{
              clipPath: `inset(0 ${100 - position}% 0 0)`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activeImage.processedUrl!}
              alt="Optimized"
              className="w-full h-auto block max-h-[70vh] object-contain mx-auto"
              draggable={false}
            />
          </div>
        )}

        {/* Divider line */}
        {showProcessed && (
          <div
            className="absolute top-0 bottom-0 w-[2px] bg-accent-brand z-10 pointer-events-none"
            style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
          />
        )}

        {/* Handle */}
        {showProcessed && (
          <div
            className="absolute top-1/2 z-20 -translate-y-1/2 -translate-x-1/2 pointer-events-auto"
            style={{ left: `${position}%` }}
            tabIndex={0}
            role="slider"
            aria-label="Before/after comparison"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            onKeyDown={handleKeyDown}
          >
            <div className="w-9 h-9 rounded-full bg-accent-brand flex items-center justify-center shadow-lg border-2 border-white/20 hover:scale-110 transition-transform">
              <ChevronLeft className="w-3 h-3 text-white -mr-0.5" />
              <ChevronRight className="w-3 h-3 text-white -ml-0.5" />
            </div>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 z-10">
          <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-bg-base/80 text-text-muted rounded backdrop-blur-sm border border-border-default">
            Original
          </span>
        </div>
        {showProcessed && (
          <div className="absolute top-3 right-3 z-10">
            <span className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest bg-accent-brand/90 text-white rounded backdrop-blur-sm">
              Optimized
            </span>
          </div>
        )}

        {/* Adjust crop button — shown when crop is available but user dismissed the preview */}
        {cropNeeded && !showCropPreview && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowCropPreview(true);
            }}
            className="absolute bottom-3 left-3 z-20 flex items-center gap-1 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-bg-base/80 border border-border-default rounded-md hover:bg-accent-brand/80 backdrop-blur-sm transition-colors"
          >
            <Crop className="w-3 h-3" />
            Adjust Crop
          </button>
        )}

        {/* Processing overlay */}
        {activeImage.isProcessing && (
          <div className="absolute inset-0 flex items-center justify-center bg-bg-base/60 backdrop-blur-sm z-30">
            <div className="w-8 h-8 border-2 border-accent-brand border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </div>
  );
}
