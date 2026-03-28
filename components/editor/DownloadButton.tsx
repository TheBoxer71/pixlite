'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { formatBytes } from '@/lib/utils/formatBytes';
import { Download } from 'lucide-react';

export function DownloadButton() {
  const activeImage = useEditorStore((s) => {
    return s.images.find((i) => i.id === s.activeImageId);
  });
  const mode = useEditorStore((s) => s.mode);
  const format = useEditorStore((s) => s.settings.format);
  const downloadImage = useEditorStore((s) => s.downloadImage);
  const downloadAll = useEditorStore((s) => s.downloadAll);
  const images = useEditorStore((s) => s.images);

  const hasProcessed = activeImage?.processedUrl;
  const size = activeImage?.processedSize;
  const formatLabel = format.toUpperCase();

  const undownloadedCount = images.filter((i) => i.processedUrl && !i.isDownloaded).length;

  return (
    <div className="space-y-2">
      {/* Primary download */}
      <button
        onClick={() => activeImage && downloadImage(activeImage.id)}
        disabled={!hasProcessed || activeImage?.isProcessing}
        className="w-full flex items-center justify-center gap-2 bg-accent-brand text-white py-2.5 px-4 rounded-md
          text-xs font-bold uppercase tracking-wider transition-all
          hover:bg-accent-brand/90 active:scale-[0.98]
          disabled:opacity-40 disabled:cursor-not-allowed disabled:active:scale-100"
      >
        <Download className="w-4 h-4" />
        {hasProcessed && size
          ? `Download ${formatLabel} · ${formatBytes(size)}`
          : activeImage?.isProcessing
            ? 'Processing...'
            : 'Download'
        }
      </button>

      {/* Batch download all */}
      {mode === 'batch' && undownloadedCount > 1 && (
        <button
          onClick={() => downloadAll()}
          className="w-full flex items-center justify-center gap-2 bg-bg-elevated border border-border-default text-text-muted py-2 px-4 rounded-md
            text-[10px] font-bold uppercase tracking-wider transition-all
            hover:text-text-primary hover:border-text-ghost"
        >
          <Download className="w-3.5 h-3.5" />
          Download All ({undownloadedCount})
        </button>
      )}
    </div>
  );
}
