import type { SocialPreset } from '@/lib/types';

export const instagramPresets: SocialPreset[] = [
  { id: 'instagram-feed-square', platform: 'Instagram', name: 'Feed Square', width: 1080, height: 1080, format: 'jpeg', quality: 85 },
  { id: 'instagram-feed-portrait', platform: 'Instagram', name: 'Feed Portrait', width: 1080, height: 1350, format: 'jpeg', quality: 85 },
  { id: 'instagram-feed-landscape', platform: 'Instagram', name: 'Feed Landscape', width: 1080, height: 566, format: 'jpeg', quality: 85 },
  { id: 'instagram-story-reels', platform: 'Instagram', name: 'Story / Reels', width: 1080, height: 1920, format: 'jpeg', quality: 85 },
  { id: 'instagram-profile', platform: 'Instagram', name: 'Profile Picture', width: 320, height: 320, format: 'jpeg', quality: 90 },
];
