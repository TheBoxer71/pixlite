'use client';

import { create } from 'zustand';
import type { ImageFile, EditorSettings, EditorMode, ImageFormat, ResizeMode, CropOffset } from '@/lib/types';
import { getPresetById } from '@/lib/presets';
import { getExtension } from '@/lib/codecs';
import { getFilenameWithoutExtension } from '@/lib/utils/formatBytes';

interface EditorState {
  mode: EditorMode;
  images: ImageFile[];
  activeImageId: string | null;
  settings: EditorSettings;
  isDownloadGateOpen: boolean;
  pendingAction: (() => void) | null;
}

interface EditorActions {
  setMode: (mode: EditorMode) => void;
  addImages: (files: File[]) => Promise<void>;
  removeImage: (id: string) => void;
  setActiveImage: (id: string) => void;
  clearAll: () => void;

  setProcessedResult: (id: string, url: string, size: number, width: number, height: number, croppedPreviewUrl?: string | null) => void;
  setProcessing: (id: string, isProcessing: boolean) => void;
  setError: (id: string, error: string) => void;

  setFormat: (format: ImageFormat) => void;
  setQuality: (quality: number) => void;
  setResizeMode: (mode: ResizeMode) => void;
  setDimensions: (width: number | null, height: number | null) => void;
  applyPreset: (presetId: string) => void;
  setCropOffset: (offset: CropOffset) => void;
  resetSettings: () => void;

  markDownloaded: (id: string) => void;
  downloadImage: (id: string) => void;
  downloadAll: () => Promise<void>;

  checkGate: (onProceed: () => void) => boolean;
  resolveGate: (action: 'download' | 'discard' | 'cancel') => void;

  getActiveImage: () => ImageFile | undefined;
  hasUndownloadedImages: () => boolean;
  undownloadedCount: () => number;
}

const defaultCropOffset: CropOffset = { x: 0.5, y: 0.5 };

const defaultSettings: EditorSettings = {
  format: 'jpeg',
  quality: 82,
  resizeMode: 'none',
  width: null,
  height: null,
  aspectRatioLocked: true,
  presetId: null,
  cropOffset: { ...defaultCropOffset },
};

function revokeImageUrls(image: ImageFile) {
  URL.revokeObjectURL(image.originalUrl);
  if (image.processedUrl) URL.revokeObjectURL(image.processedUrl);
  if (image.croppedPreviewUrl) URL.revokeObjectURL(image.croppedPreviewUrl);
}

export const useEditorStore = create<EditorState & EditorActions>((set, get) => ({
  mode: 'single',
  images: [],
  activeImageId: null,
  settings: { ...defaultSettings },
  isDownloadGateOpen: false,
  pendingAction: null,

  setMode: (mode) => {
    const proceed = () => {
      const state = get();
      state.images.forEach(revokeImageUrls);
      set({ mode, images: [], activeImageId: null, settings: { ...defaultSettings } });
    };
    const state = get();
    if (state.images.length > 0 && state.hasUndownloadedImages()) {
      set({ isDownloadGateOpen: true, pendingAction: proceed });
    } else {
      proceed();
    }
  },

  addImages: async (files) => {
    const state = get();
    const maxImages = state.mode === 'single' ? 1 : 8;
    const available = maxImages - state.images.length;
    const filesToAdd = files.slice(0, available);

    const newImages: ImageFile[] = await Promise.all(
      filesToAdd.map(async (file) => {
        const bitmap = await createImageBitmap(file);
        const img: ImageFile = {
          id: crypto.randomUUID(),
          file,
          originalUrl: URL.createObjectURL(file),
          processedUrl: null,
          originalSize: file.size,
          processedSize: null,
          originalWidth: bitmap.width,
          originalHeight: bitmap.height,
          processedWidth: null,
          processedHeight: null,
          croppedPreviewUrl: null,
          isProcessing: false,
          isDownloaded: false,
          error: null,
        };
        bitmap.close();
        return img;
      })
    );

    if (state.mode === 'single' && state.images.length > 0) {
      state.images.forEach(revokeImageUrls);
      set({ images: newImages, activeImageId: newImages[0]?.id ?? null });
    } else {
      set({
        images: [...state.images, ...newImages],
        activeImageId: state.activeImageId ?? newImages[0]?.id ?? null,
      });
    }
  },

  removeImage: (id) => {
    const state = get();
    const image = state.images.find((i) => i.id === id);
    if (image) revokeImageUrls(image);
    const remaining = state.images.filter((i) => i.id !== id);
    set({
      images: remaining,
      activeImageId:
        state.activeImageId === id
          ? remaining[0]?.id ?? null
          : state.activeImageId,
    });
  },

  setActiveImage: (id) => set({ activeImageId: id }),

  clearAll: () => {
    get().images.forEach(revokeImageUrls);
    set({ images: [], activeImageId: null });
  },

  setProcessedResult: (id, url, size, width, height, croppedPreviewUrl) => {
    set((state) => ({
      images: state.images.map((img) => {
        if (img.id !== id) return img;
        // Revoke old cropped preview URL if it exists
        if (img.croppedPreviewUrl) URL.revokeObjectURL(img.croppedPreviewUrl);
        return {
          ...img,
          processedUrl: url,
          processedSize: size,
          processedWidth: width,
          processedHeight: height,
          croppedPreviewUrl: croppedPreviewUrl ?? null,
          isProcessing: false,
          isDownloaded: false,
          error: null,
        };
      }),
    }));
  },

  setProcessing: (id, isProcessing) => {
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, isProcessing } : img
      ),
    }));
  },

  setError: (id, error) => {
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, error, isProcessing: false } : img
      ),
    }));
  },

  setFormat: (format) => {
    set((state) => ({ settings: { ...state.settings, format, presetId: null } }));
  },

  setQuality: (quality) => {
    set((state) => ({ settings: { ...state.settings, quality, presetId: null } }));
  },

  setResizeMode: (resizeMode) => {
    set((state) => ({
      settings: {
        ...state.settings,
        resizeMode,
        width: resizeMode === 'none' ? null : state.settings.width,
        height: resizeMode === 'none' ? null : state.settings.height,
        presetId: resizeMode === 'none' ? null : state.settings.presetId,
        cropOffset: { ...defaultCropOffset },
      },
    }));
  },

  setDimensions: (width, height) => {
    set((state) => ({ settings: { ...state.settings, width, height, presetId: null, cropOffset: { ...defaultCropOffset } } }));
  },

  applyPreset: (presetId) => {
    const preset = getPresetById(presetId);
    if (!preset) return;
    set((state) => ({
      settings: {
        ...state.settings,
        format: preset.format,
        quality: preset.quality,
        resizeMode: 'preset',
        width: preset.width,
        height: preset.height,
        presetId,
        cropOffset: { ...defaultCropOffset },
      },
    }));
  },

  setCropOffset: (offset) => {
    set((state) => ({ settings: { ...state.settings, cropOffset: offset } }));
  },

  resetSettings: () => set({ settings: { ...defaultSettings } }),

  markDownloaded: (id) => {
    set((state) => ({
      images: state.images.map((img) =>
        img.id === id ? { ...img, isDownloaded: true } : img
      ),
    }));
  },

  downloadImage: (id) => {
    const state = get();
    const image = state.images.find((i) => i.id === id);
    if (!image?.processedUrl) return;

    const ext = getExtension(state.settings.format);
    const baseName = getFilenameWithoutExtension(image.file.name);
    const filename = `${baseName}-pixlite.${ext}`;

    const a = document.createElement('a');
    a.href = image.processedUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    get().markDownloaded(id);
  },

  downloadAll: async () => {
    const state = get();
    const undownloaded = state.images.filter((i) => i.processedUrl && !i.isDownloaded);
    for (const image of undownloaded) {
      get().downloadImage(image.id);
      await new Promise((r) => setTimeout(r, 250));
    }
  },

  checkGate: (onProceed) => {
    const state = get();
    if (state.images.length > 0 && state.hasUndownloadedImages()) {
      set({ isDownloadGateOpen: true, pendingAction: onProceed });
      return true;
    }
    onProceed();
    return false;
  },

  resolveGate: (action) => {
    const state = get();
    const pending = state.pendingAction;

    if (action === 'cancel') {
      set({ isDownloadGateOpen: false, pendingAction: null });
      return;
    }

    if (action === 'download') {
      state.downloadAll().then(() => {
        set({ isDownloadGateOpen: false, pendingAction: null });
        pending?.();
      });
      return;
    }

    if (action === 'discard') {
      state.images.forEach(revokeImageUrls);
      set({ isDownloadGateOpen: false, pendingAction: null, images: [], activeImageId: null });
      pending?.();
    }
  },

  getActiveImage: () => {
    const state = get();
    return state.images.find((i) => i.id === state.activeImageId);
  },

  hasUndownloadedImages: () => {
    return get().images.some((i) => i.processedUrl && !i.isDownloaded);
  },

  undownloadedCount: () => {
    return get().images.filter((i) => i.processedUrl && !i.isDownloaded).length;
  },
}));
