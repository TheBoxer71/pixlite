import type { Codec, CodecOptions, CodecResult } from '@/lib/types';
import { calculateCropRegion } from '@/lib/utils/imageUtils';

function drawWithCrop(
  ctx: OffscreenCanvasRenderingContext2D | CanvasRenderingContext2D,
  source: ImageBitmap,
  w: number,
  h: number,
  options: CodecOptions
) {
  if (options.cropOffset && options.sourceWidth && options.sourceHeight) {
    const crop = calculateCropRegion(options.sourceWidth, options.sourceHeight, w, h, options.cropOffset);
    ctx.drawImage(source, crop.sx, crop.sy, crop.sw, crop.sh, 0, 0, w, h);
  } else {
    ctx.drawImage(source, 0, 0, w, h);
  }
}

export const pngCodec: Codec = {
  mimeType: 'image/png',
  extension: 'png',
  async encode(source: ImageBitmap, options: CodecOptions): Promise<CodecResult> {
    const w = options.width ?? source.width;
    const h = options.height ?? source.height;

    if (typeof OffscreenCanvas !== 'undefined') {
      const canvas = new OffscreenCanvas(w, h);
      const ctx = canvas.getContext('2d')!;
      drawWithCrop(ctx, source, w, h, options);
      const blob = await canvas.convertToBlob({ type: 'image/png' });
      return { blob, width: w, height: h, size: blob.size };
    }

    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d')!;
    drawWithCrop(ctx, source, w, h, options);
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), 'image/png');
    });
    return { blob, width: w, height: h, size: blob.size };
  },
};
