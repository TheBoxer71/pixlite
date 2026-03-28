---
name: dev
description: Start the Next.js development server for pixlite
disable-model-invocation: true
allowed-tools: Bash(npm run dev*)
---

Start the pixlite development server.

1. Run the dev server:
   ```
   npm run dev
   ```
2. Confirm the server is ready and report the local URL (typically http://localhost:3000)
3. Remind the user of key routes:
   - `/` — Landing page
   - `/app` — Image optimizer editor
   - `/presets` — Social media presets
   - `/tools/compress-jpeg` — JPEG compressor
   - `/tools/convert-to-webp` — WebP converter
   - `/tools/resize-image` — Image resizer
