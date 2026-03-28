import type { SocialPreset } from '@/lib/types';

export const webPresets: SocialPreset[] = [
  { id: 'web-blog-hero-wide', platform: 'Web & Blog', name: 'Blog Hero (Wide)', width: 1920, height: 1080, format: 'webp', quality: 82 },
  { id: 'web-blog-hero', platform: 'Web & Blog', name: 'Blog Hero', width: 1200, height: 630, format: 'webp', quality: 82 },
  { id: 'web-og', platform: 'Web & Blog', name: 'OG / Open Graph', width: 1200, height: 630, format: 'jpeg', quality: 85 },
  { id: 'web-thumbnail', platform: 'Web & Blog', name: 'Thumbnail', width: 640, height: 360, format: 'webp', quality: 78 },
  { id: 'web-ecommerce', platform: 'Web & Blog', name: 'E-commerce Product', width: 800, height: 800, format: 'webp', quality: 85 },
  { id: 'web-avatar', platform: 'Web & Blog', name: 'Avatar', width: 400, height: 400, format: 'jpeg', quality: 90 },
];
