@AGENTS.md

# pixlite.io — Project Guide

## What is this?
A free-forever, no-login, browser-based image optimization platform. All image processing runs client-side via Canvas API (Phase 2: WASM). Built with Next.js 15, TypeScript, Tailwind CSS 4, Zustand, shadcn/ui.

## Quick Start
```bash
npm run dev    # Start dev server → http://localhost:3000
npm run build  # Production build
npm run lint   # ESLint
```

## Key Routes
- `/` — Marketing landing page
- `/app` — Full-screen image optimizer editor
- `/presets` — Social media presets reference
- `/tools/compress-jpeg` | `/tools/convert-to-webp` | `/tools/resize-image` — SEO tool pages
- `/privacy` | `/terms` — Legal pages

## Architecture
- **All image processing is client-side** — no server uploads, zero backend
- **Zustand store** (`lib/store/editorStore.ts`) — single store, all editor state and actions
- **Codecs** (`lib/codecs/`) — Canvas API implementations for JPEG, PNG, WebP with crop support
- **Processing hook** (`lib/hooks/useProcessImage.ts`) — debounced 250ms, abort-controlled
- **Presets** (`lib/presets/`) — 22 social media presets across 5 platforms

## Design System (Dark Mode Only)
- Background: `#080808` (base), `#0E0E0E` (surface), `#131313` (elevated)
- Accent: `#E8452A` (brand red)
- Border: `#191919`
- Fonts: Bebas Neue (brand), DM Sans (UI), JetBrains Mono (stats/values)
- Use Tailwind classes: `bg-bg-base`, `text-text-primary`, `border-border-default`, `bg-accent-brand`

## Critical Rules
- **Never put `images` array in useEffect dependency arrays** — causes infinite processing loops
- **Always revoke Object URLs** (`URL.revokeObjectURL()`) when removing/replacing images
- **Use `useEditorStore.getState()`** inside async callbacks, not subscribed selectors
- **Quality slider hidden when PNG** is selected (PNG is lossless)
- **Download gate** must fire before any action that would discard undownloaded processed images
- **Crop preview** appears automatically when target aspect ratio differs from source

## Skills (Slash Commands)
- `/dev` — Start dev server
- `/build` — Production build with error reporting
- `/lint` — ESLint with auto-fix option
- `/add-preset` — Add a social media preset
- `/add-codec` — Scaffold a new image format codec
- `/add-component` — Scaffold an editor component
- `/add-tool-page` — Add an SEO tool landing page
- `/resume-work` — Resume where you left off (git state, build health, next steps)
- `/review` — Review current changes against standards
- `/prd` — Quick PRD section lookup

## PRD Reference
Full spec: `pixlite-PRD.md` (use `/prd [section]` for quick lookup)

## Current Status
- **Phase 1 MVP: COMPLETE** — all features implemented and building
- **Phase 2 (Polish)**: Not started — WASM codecs, AVIF, advanced settings, blog
- **Phase 3 (Growth)**: Not started — GIF, URL import, PWA, clipboard copy
- **GitHub**: https://github.com/TheBoxer71/pixlite
