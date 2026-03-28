import type { SocialPreset } from '@/lib/types';

export const facebookPresets: SocialPreset[] = [
  { id: 'facebook-feed', platform: 'Facebook', name: 'Feed Post', width: 1200, height: 630, format: 'jpeg', quality: 85 },
  { id: 'facebook-cover', platform: 'Facebook', name: 'Cover Photo', width: 820, height: 312, format: 'jpeg', quality: 80 },
  { id: 'facebook-story', platform: 'Facebook', name: 'Story', width: 1080, height: 1920, format: 'jpeg', quality: 85 },
];
