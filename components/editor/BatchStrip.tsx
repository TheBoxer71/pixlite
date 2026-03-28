'use client';

import { useRef, useCallback } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';
import { Check, Plus, Loader2 } from 'lucide-react';

export function BatchStrip() {
  const images = useEditorStore((s) => s.images);
  const activeImageId = useEditorStore((s) => s.activeImageId);
  const mode = useEditorStore((s) => s.mode);
  const setActiveImage = useEditorStore((s) => s.setActiveImage);
  const addImages = useEditorStore((s) => s.addImages);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAddMore = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (files.length > 0) addImages(files);
      e.target.value = '';
    },
    [addImages]
  );

  if (mode !== 'batch' || images.length === 0) return null;

  const canAddMore = images.length < 8;

  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2 px-1 mt-2">
      {images.map((image) => (
        <button
          key={image.id}
          onClick={() => setActiveImage(image.id)}
          className={`
            relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all
            ${image.id === activeImageId
              ? 'border-accent-brand shadow-[0_0_0_1px_rgba(232,69,42,0.3)]'
              : 'border-border-default hover:border-text-ghost'
            }
          `}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={image.originalUrl}
            alt={image.file.name}
            className="w-full h-full object-cover"
          />

          {/* Processing spinner */}
          {image.isProcessing && (
            <div className="absolute inset-0 flex items-center justify-center bg-bg-base/60">
              <Loader2 className="w-4 h-4 text-accent-brand animate-spin" />
            </div>
          )}

          {/* Downloaded checkmark */}
          {image.isDownloaded && (
            <div className="absolute bottom-0.5 right-0.5 w-4 h-4 rounded-full bg-success flex items-center justify-center">
              <Check className="w-2.5 h-2.5 text-white" />
            </div>
          )}

          {/* Error indicator */}
          {image.error && (
            <div className="absolute inset-0 flex items-center justify-center bg-danger/20">
              <span className="text-[8px] text-danger font-bold">ERR</span>
            </div>
          )}
        </button>
      ))}

      {/* Add more button */}
      {canAddMore && (
        <>
          <button
            onClick={handleAddMore}
            className="shrink-0 w-16 h-16 rounded-lg border-2 border-dashed border-border-default flex items-center justify-center text-text-ghost hover:text-text-muted hover:border-text-ghost transition-colors"
          >
            <Plus className="w-5 h-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif,image/bmp,image/tiff"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
        </>
      )}
    </div>
  );
}
