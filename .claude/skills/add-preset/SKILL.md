---
name: add-preset
description: Add a new social media preset to the pixlite preset library
argument-hint: [platform] [name] [width] [height] [format] [quality]
---

Add a new social media preset to pixlite. Arguments: `$ARGUMENTS`

## Steps

1. **Parse the arguments.** Expected format: `[platform] [name] [width] [height] [format] [quality]`
   - `platform` — one of: instagram, twitter, linkedin, facebook, web (or a new platform)
   - `name` — preset display name (e.g., "Feed Square", "Cover Photo")
   - `width` — pixel width (positive integer)
   - `height` — pixel height (positive integer)
   - `format` — one of: jpeg, png, webp
   - `quality` — 10–100 (integer)

   If any argument is missing, ask the user for the missing values.

2. **Validate the preset:**
   - Width and height must be positive integers
   - Format must be a valid `ImageFormat` from `lib/types.ts`
   - Quality must be 10–100
   - Check that the preset ID (generated as `[platform]-[name-slugified]`) doesn't already exist

3. **Generate the preset ID** by slugifying: `[platform]-[name]` → lowercase, spaces to hyphens
   Example: `instagram` + `Feed Square` → `instagram-feed-square`

4. **Add the preset** to the correct file:
   - Read `lib/presets/[platform].ts`
   - If the platform file doesn't exist, create it following the pattern from `lib/presets/instagram.ts`
   - Add the new `SocialPreset` object to the array
   - If a new platform file was created, register it in `lib/presets/index.ts`:
     - Add the import
     - Add to `allPresets` spread
     - Add to `presetsByPlatform` array

5. **Report success** with the preset details and tell the user to run `/build` to verify.

## Reference Pattern

```typescript
// lib/presets/[platform].ts
import type { SocialPreset } from '@/lib/types';

export const [platform]Presets: SocialPreset[] = [
  { id: '[platform]-[slugified-name]', platform: '[Platform Name]', name: '[Name]', width: [W], height: [H], format: '[format]', quality: [Q] },
];
```
