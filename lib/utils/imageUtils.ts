import type { EditorSettings, CodecResult, CropOffset } from '@/lib/types';
import { getCodec } from '@/lib/codecs';

export function calculateDimensions(
  originalWidth: number,
  originalHeight: number,
  settings: EditorSettings
): { width: number; height: number } {
  if (settings.resizeMode === 'none') {
    return { width: originalWidth, height: originalHeight };
  }

  if (settings.resizeMode === 'preset' || settings.resizeMode === 'custom') {
    const w = settings.width;
    const h = settings.height;
    if (w && h) return { width: w, height: h };
    if (w) {
      const ratio = originalHeight / originalWidth;
      return { width: w, height: Math.round(w * ratio) };
    }
    if (h) {
      const ratio = originalWidth / originalHeight;
      return { width: Math.round(h * ratio), height: h };
    }
  }

  return { width: originalWidth, height: originalHeight };
}

/**
 * Calculate the source crop region for a "cover" fit.
 * Returns the (sx, sy, sw, sh) sub-rectangle of the source to sample from.
 */
export function calculateCropRegion(
  srcW: number,
  srcH: number,
  dstW: number,
  dstH: number,
  cropOffset: CropOffset
): { sx: number; sy: number; sw: number; sh: number } {
  const srcAspect = srcW / srcH;
  const dstAspect = dstW / dstH;

  let sw: number, sh: number;

  if (srcAspect > dstAspect) {
    // Source is wider — crop horizontally
    sh = srcH;
    sw = srcH * dstAspect;
  } else {
    // Source is taller — crop vertically
    sw = srcW;
    sh = srcW / dstAspect;
  }

  const sx = (srcW - sw) * cropOffset.x;
  const sy = (srcH - sh) * cropOffset.y;

  return { sx, sy, sw, sh };
}

/**
 * Check if the target dimensions require cropping (different aspect ratio than source).
 */
export function needsCrop(
  srcW: number,
  srcH: number,
  dstW: number | null,
  dstH: number | null
): boolean {
  if (!dstW || !dstH) return false;
  const srcAspect = srcW / srcH;
  const dstAspect = dstW / dstH;
  return Math.abs(srcAspect - dstAspect) > 0.01;
}

/**
 * Generate a high-quality cropped preview (the "before" image for the slider when crop is active).
 * This crops to the target region at maximum quality so the user can compare crop vs crop+compression.
 */
export async function generateCroppedPreview(
  file: File,
  settings: EditorSettings
): Promise<Blob> {
  const bitmap = await createImageBitmap(file);
  const { width, height } = calculateDimensions(bitmap.width, bitmap.height, settings);
  const crop = calculateCropRegion(bitmap.width, bitmap.height, width, height, settings.cropOffset);

  const canvas = typeof OffscreenCanvas !== 'undefined'
    ? new OffscreenCanvas(width, height)
    : (() => { const c = document.createElement('canvas'); c.width = width; c.height = height; return c; })();
  const ctx = canvas.getContext('2d')!;
  (ctx as CanvasRenderingContext2D).drawImage(bitmap, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, width, height);
  bitmap.close();

  if (canvas instanceof OffscreenCanvas) {
    return canvas.convertToBlob({ type: 'image/png' });
  }
  return new Promise<Blob>((resolve) => {
    (canvas as HTMLCanvasElement).toBlob((b) => resolve(b!), 'image/png');
  });
}

export async function processImage(
  file: File,
  settings: EditorSettings
): Promise<CodecResult> {
  const bitmap = await createImageBitmap(file);
  const { width, height } = calculateDimensions(
    bitmap.width,
    bitmap.height,
    settings
  );
  const codec = getCodec(settings.format);
  const quality = settings.format === 'png' ? 1 : settings.quality / 100;

  const result = await codec.encode(bitmap, {
    quality,
    width,
    height,
    cropOffset: settings.cropOffset,
    sourceWidth: bitmap.width,
    sourceHeight: bitmap.height,
  });
  bitmap.close();
  return result;
}
