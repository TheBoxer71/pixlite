import type { SocialPreset } from '@/lib/types';

export const linkedinPresets: SocialPreset[] = [
  { id: 'linkedin-post', platform: 'LinkedIn', name: 'Post / Share', width: 1200, height: 627, format: 'jpeg', quality: 85 },
  { id: 'linkedin-company-cover', platform: 'LinkedIn', name: 'Company Cover', width: 1128, height: 191, format: 'jpeg', quality: 80 },
  { id: 'linkedin-personal-banner', platform: 'LinkedIn', name: 'Personal Banner', width: 1584, height: 396, format: 'jpeg', quality: 80 },
];
