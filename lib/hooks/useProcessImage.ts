'use client';

import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/lib/store/editorStore';
import { processImage, needsCrop, generateCroppedPreview } from '@/lib/utils/imageUtils';

export function useProcessImage() {
  const activeImageId = useEditorStore((s) => s.activeImageId);
  const format = useEditorStore((s) => s.settings.format);
  const quality = useEditorStore((s) => s.settings.quality);
  const resizeMode = useEditorStore((s) => s.settings.resizeMode);
  const width = useEditorStore((s) => s.settings.width);
  const height = useEditorStore((s) => s.settings.height);
  const presetId = useEditorStore((s) => s.settings.presetId);
  const cropOffsetX = useEditorStore((s) => s.settings.cropOffset.x);
  const cropOffsetY = useEditorStore((s) => s.settings.cropOffset.y);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const abortRef = useRef<AbortController>(undefined);

  useEffect(() => {
    const state = useEditorStore.getState();
    const activeImage = state.images.find((i) => i.id === activeImageId);
    if (!activeImage) return;

    clearTimeout(timeoutRef.current);
    abortRef.current?.abort();

    const controller = new AbortController();
    abortRef.current = controller;

    timeoutRef.current = setTimeout(async () => {
      if (controller.signal.aborted) return;

      useEditorStore.getState().setProcessing(activeImage.id, true);

      try {
        const settings = useEditorStore.getState().settings;
        const result = await processImage(activeImage.file, settings);
        if (controller.signal.aborted) return;

        // Revoke previous processed URL
        const current = useEditorStore.getState().images.find((i) => i.id === activeImage.id);
        if (current?.processedUrl) {
          URL.revokeObjectURL(current.processedUrl);
        }

        const url = URL.createObjectURL(result.blob);

        // If crop is active, generate a lossless cropped preview for the "before" side
        let croppedPreviewUrl: string | null = null;
        const isCropped = needsCrop(
          activeImage.originalWidth,
          activeImage.originalHeight,
          settings.width,
          settings.height
        );
        if (isCropped) {
          const previewBlob = await generateCroppedPreview(activeImage.file, settings);
          if (!controller.signal.aborted) {
            croppedPreviewUrl = URL.createObjectURL(previewBlob);
          }
        }

        if (controller.signal.aborted) return;

        useEditorStore.getState().setProcessedResult(
          activeImage.id, url, result.size, result.width, result.height, croppedPreviewUrl
        );
      } catch (err) {
        if (controller.signal.aborted) return;
        useEditorStore.getState().setError(activeImage.id, (err as Error).message);
      }
    }, 250);

    return () => {
      clearTimeout(timeoutRef.current);
      controller.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeImageId, format, quality, resizeMode, width, height, presetId, cropOffsetX, cropOffsetY]);
}
