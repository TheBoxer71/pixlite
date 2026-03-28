export type ImageFormat = 'jpeg' | 'png' | 'webp';
export type EditorMode = 'single' | 'batch';
export type ResizeMode = 'none' | 'custom' | 'preset';

export interface ImageFile {
  id: string;
  file: File;
  originalUrl: string;
  processedUrl: string | null;
  originalSize: number;
  processedSize: number | null;
  originalWidth: number;
  originalHeight: number;
  processedWidth: number | null;
  processedHeight: number | null;
  croppedPreviewUrl: string | null;
  isProcessing: boolean;
  isDownloaded: boolean;
  error: string | null;
}

export interface CropOffset {
  x: number; // 0–1 normalized. 0 = left, 0.5 = center, 1 = right
  y: number; // 0–1 normalized. 0 = top, 0.5 = center, 1 = bottom
}

export interface EditorSettings {
  format: ImageFormat;
  quality: number;
  resizeMode: ResizeMode;
  width: number | null;
  height: number | null;
  aspectRatioLocked: boolean;
  presetId: string | null;
  cropOffset: CropOffset;
}

export interface SocialPreset {
  id: string;
  platform: string;
  name: string;
  width: number;
  height: number;
  format: ImageFormat;
  quality: number;
}

export interface CodecOptions {
  quality: number;
  width?: number;
  height?: number;
  cropOffset?: CropOffset;
  sourceWidth?: number;
  sourceHeight?: number;
}

export interface CodecResult {
  blob: Blob;
  width: number;
  height: number;
  size: number;
}

export interface Codec {
  encode(source: ImageBitmap, options: CodecOptions): Promise<CodecResult>;
  mimeType: string;
  extension: string;
}
