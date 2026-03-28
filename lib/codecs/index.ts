import type { Codec, ImageFormat } from '@/lib/types';
import { jpegCodec } from './jpeg';
import { pngCodec } from './png';
import { webpCodec } from './webp';

const codecs: Record<ImageFormat, Codec> = {
  jpeg: jpegCodec,
  png: pngCodec,
  webp: webpCodec,
};

export function getCodec(format: ImageFormat): Codec {
  return codecs[format];
}

export function getExtension(format: ImageFormat): string {
  return codecs[format].extension;
}
