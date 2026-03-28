import type { SocialPreset } from '@/lib/types';
import { instagramPresets } from './instagram';
import { twitterPresets } from './twitter';
import { linkedinPresets } from './linkedin';
import { facebookPresets } from './facebook';
import { webPresets } from './web';

export const allPresets: SocialPreset[] = [
  ...instagramPresets,
  ...twitterPresets,
  ...linkedinPresets,
  ...facebookPresets,
  ...webPresets,
];

export const presetsByPlatform: { platform: string; presets: SocialPreset[] }[] = [
  { platform: 'Instagram', presets: instagramPresets },
  { platform: 'X / Twitter', presets: twitterPresets },
  { platform: 'LinkedIn', presets: linkedinPresets },
  { platform: 'Facebook', presets: facebookPresets },
  { platform: 'Web & Blog', presets: webPresets },
];

export function getPresetById(id: string): SocialPreset | undefined {
  return allPresets.find((p) => p.id === id);
}
