import type { SocialPreset } from '@/lib/types';

export const twitterPresets: SocialPreset[] = [
  { id: 'twitter-post-16-9', platform: 'X / Twitter', name: 'Post (16:9)', width: 1200, height: 675, format: 'jpeg', quality: 85 },
  { id: 'twitter-post-1-1', platform: 'X / Twitter', name: 'Post (1:1)', width: 1200, height: 1200, format: 'jpeg', quality: 85 },
  { id: 'twitter-header', platform: 'X / Twitter', name: 'Header / Banner', width: 1500, height: 500, format: 'jpeg', quality: 80 },
  { id: 'twitter-profile', platform: 'X / Twitter', name: 'Profile Picture', width: 400, height: 400, format: 'jpeg', quality: 90 },
];
