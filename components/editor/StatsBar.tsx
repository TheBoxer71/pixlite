'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { formatBytes } from '@/lib/utils/formatBytes';
import { ArrowRight } from 'lucide-react';

export function StatsBar() {
  const activeImage = useEditorStore((s) => {
    return s.images.find((i) => i.id === s.activeImageId);
  });

  if (!activeImage || !activeImage.processedUrl) return null;

  const originalSize = activeImage.originalSize;
  const processedSize = activeImage.processedSize ?? 0;
  const savings = originalSize > 0
    ? Math.round(((originalSize - processedSize) / originalSize) * 100)
    : 0;
  const isSmaller = processedSize < originalSize;

  const outputW = activeImage.processedWidth ?? activeImage.originalWidth;
  const outputH = activeImage.processedHeight ?? activeImage.originalHeight;

  return (
    <div className="flex items-center justify-between gap-4 px-3 py-2 bg-bg-surface border border-border-default rounded-lg mt-2">
      {/* Size comparison */}
      <div className="flex items-center gap-2 font-mono text-xs">
        <span className="text-text-muted">{formatBytes(originalSize)}</span>
        <ArrowRight className="w-3 h-3 text-text-ghost" />
        <span className="text-text-primary font-medium">{formatBytes(processedSize)}</span>
      </div>

      {/* Savings */}
      <div className={`font-mono text-xs font-bold ${isSmaller ? 'text-success' : 'text-danger'}`}>
        {isSmaller ? '-' : '+'}{Math.abs(savings)}%
      </div>

      {/* Dimensions */}
      <div className="font-mono text-[10px] text-text-ghost">
        {outputW} × {outputH}
      </div>
    </div>
  );
}
