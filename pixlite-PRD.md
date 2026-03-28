npm# pixlite.io — Product Requirements Document

> **Version:** 2.0.0 · **Date:** March 2026 · **Status:** Active Development  
> **Domain:** pixlite.io · **Stack:** Next.js 15 · **Model:** Free Forever, No Login

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Problem Statement & Opportunity](#2-problem-statement--opportunity)
3. [Goals & Success Metrics](#3-goals--success-metrics)
4. [Target Users & Personas](#4-target-users--personas)
5. [Technology Stack](#5-technology-stack)
6. [Feature Specifications](#6-feature-specifications)
7. [Site Architecture](#7-site-architecture)
8. [UI / UX Design System](#8-ui--ux-design-system)
9. [Business Model](#9-business-model)
10. [Performance Targets](#10-performance-targets)
11. [SEO Content Strategy](#11-seo-content-strategy)
12. [Security & Privacy](#12-security--privacy)
13. [MVP Scope & Phases](#13-mvp-scope--phases)
14. [Risk Register](#14-risk-register)
15. [Open Questions](#15-open-questions)
16. [Appendices](#16-appendices)

---

## 1. Executive Summary

pixlite.io is a **free-forever, no-login** browser-based image optimization platform. Users upload images, configure compression and resize settings with intuitive sliders, preview results live with an interactive before/after comparison slider, and download the optimized file — all without creating an account or uploading anything to a server.

The product is built on Next.js 15 for maximum SEO discoverability. All image processing runs client-side via WebAssembly (WASM) codecs, making it both privacy-first and infinitely scalable at zero marginal cost.

### Core Value Proposition

| Pillar | Description |
|---|---|
| **Zero friction** | No account, no login, no paywall — open and use immediately |
| **Privacy-first** | Images are processed locally in the browser; nothing is ever uploaded |
| **Real-time preview** | Interactive before/after slider with live quality feedback |
| **Smart presets** | One-click optimization for Instagram, X, LinkedIn, WhatsApp, and more |
| **Free forever** | No freemium bait-and-switch — the full tool is permanently free |

### v2.0 Key Changes from v1.0

- **Removed all paid tiers** — pixlite.io is free forever with no Pro plan
- **No user accounts** — zero login friction, zero data retention
- **Enforced download gate** — users must download before processing a new image
- **Single / Batch toggle** — switch between single image and batch mode (max 8 images)
- **New design system** — dark mode only, Hexaon-inspired palette (`#080808` / `#E8452A`)

---

## 2. Problem Statement & Opportunity

### 2.1 The Problem

Web images account for over 50% of average page weight. Unoptimized images are the single largest cause of poor Core Web Vitals (LCP), directly harming SEO and user experience. Despite this, most content creators and small business owners lack efficient tooling.

Existing solutions fail in predictable ways:

- **Desktop apps** (Photoshop, Affinity) require purchase and installation
- **CLI tools** (ImageMagick, Sharp) have steep learning curves
- **Free online tools** are cluttered with ads, require sign-up, or impose aggressive file-size limits
- **Most tools** lack real-time before/after visual comparison
- **Social media presets** are absent or outdated across the board

### 2.2 The Opportunity

A polished, privacy-respecting, browser-native image optimizer — permanently free, fast to load, and SEO-discoverable — has a clear gap in the market. Target segments include:

- Independent web developers and freelancers
- Content creators, bloggers, and YouTubers
- Social media managers and marketing teams
- E-commerce store owners (Shopify, WooCommerce)
- Photographers preparing work for web galleries

---

## 3. Goals & Success Metrics

### 3.1 Product Goals

1. Ship a fully functional MVP within 8 weeks of kickoff
2. Achieve a Lighthouse Performance score of 95+ on the marketing homepage
3. Target sub-2-second Time to Interactive on a mid-range Android device
4. Support JPEG, PNG, WebP, and AVIF input/output at launch
5. Drive sustainable traffic entirely through SEO and word-of-mouth (zero paid acquisition)

### 3.2 Key Performance Indicators

| Metric | Target (3 months post-launch) |
|---|---|
| Monthly Active Users | 5,000+ MAU |
| Images processed / month | 50,000+ |
| Bounce rate (landing page) | < 45% |
| Core Web Vitals — LCP | < 2.5 s (Good) |
| NPS Score | > 45 |
| Avg. session duration | > 3 minutes |
| Organic search traffic share | > 60% of total |
| Return visitor rate | > 25% |

---

## 4. Target Users & Personas

### Persona 1 — The Content Creator (Primary)

| Attribute | Detail |
|---|---|
| Name | Sofia, 29, lifestyle blogger |
| Goal | Resize and compress hero images for WordPress without quality loss |
| Pain point | No Photoshop license; finds CLI tools intimidating |
| Key features | Drag-and-drop, quick presets (Blog Hero, IG Post), one-click download |
| Expectation | Completely free, works instantly, no account required |

### Persona 2 — The Web Developer (Secondary)

| Attribute | Detail |
|---|---|
| Name | Marcus, 34, freelance front-end developer |
| Goal | Batch-convert client images to WebP/AVIF for performance projects |
| Pain point | Needs a shareable browser tool clients can use without a login |
| Key features | Format conversion, quality slider, AVIF, batch mode (8 images) |
| Expectation | Fast, technical, zero friction |

### Persona 3 — The Social Media Manager (Tertiary)

| Attribute | Detail |
|---|---|
| Name | Priya, 26, social media manager |
| Goal | Resize product images to exact platform specs — fast |
| Pain point | Constantly switching tools; needs spec accuracy without guesswork |
| Key features | Social media preset library, correct dimensions per platform |
| Expectation | Free, reliable, updated with current platform specs |

---

## 5. Technology Stack

### 5.1 Architecture Principle

> All image processing runs **client-side via WebAssembly**. No image bytes are ever transmitted to a server. The Next.js server layer serves only HTML, metadata, and static assets. This eliminates egress costs, preserves user privacy, and scales to unlimited users at zero marginal infrastructure cost.

### 5.2 Frontend

| Layer | Technology | Rationale |
|---|---|---|
| Framework | Next.js 15 (App Router) | SSG/SSR for SEO, React Server Components, image metadata |
| Language | TypeScript 5 | Type safety, better DX |
| Styling | Tailwind CSS 4 | Utility-first, purges unused CSS |
| UI Components | shadcn/ui + Radix UI | Accessible, headless, customizable |
| State | Zustand | Lightweight, no boilerplate |
| File handling | react-dropzone | Accessible drag-and-drop with ARIA |
| Before/After slider | Custom CSS + Pointer Events API | Zero dependency, smooth 60fps |
| Sliders | Radix UI Slider | Accessible range inputs with keyboard support |
| Animations | Framer Motion | Upload states, panel transitions |
| Fonts | Bebas Neue, DM Sans, JetBrains Mono | Brand identity, readability, monospaced values |

### 5.3 Image Processing (Client-Side WASM)

| Library | Purpose |
|---|---|
| `@squoosh/lib` (WASM) | Core encode/decode — JPEG, WebP, AVIF, PNG, OxiPNG |
| `exifr` | EXIF metadata extraction (orientation, GPS, camera data) |
| `browser-image-compression` | JS fallback during WASM initialization |
| `gifuct-js` | Animated GIF frame parsing |
| `jszip` | Client-side ZIP assembly for batch downloads |

### 5.4 Infrastructure

| Layer | Technology |
|---|---|
| Hosting | Vercel (zero-config Next.js, edge network) |
| Analytics | Plausible (privacy-respecting, GDPR-compliant, cookieless) |
| Error tracking | Sentry |
| Sitemap | next-sitemap (auto-generated on deploy) |

> **No database, no auth, no backend required.** The absence of user accounts eliminates the largest infrastructure cost and compliance surface area entirely.

---

## 6. Feature Specifications

### 6.1 Mode Toggle — Single vs Batch

A prominent toggle in the app header switches between two modes:

| Mode | Behaviour |
|---|---|
| **Single** | One image at a time. Full-screen preview + settings. |
| **Batch** | Up to 8 images simultaneously. Thumbnail strip below preview. Settings apply to all images. |

Mode switching clears the current workspace. If images have not been downloaded, the **download gate modal** fires before switching.

### 6.2 Upload Interface

#### 6.2.1 Drop Zone

The drop zone is the dominant UI element — at least 40% of viewport height on desktop. Supports:

- Drag-and-drop from OS file manager or browser
- Click-to-browse (native file picker)
- Clipboard paste (`Ctrl+V` / `Cmd+V`)
- In batch mode: multi-select or drop multiple files (up to 8)

**Accepted formats:** JPEG, PNG, WebP, AVIF, GIF, BMP, TIFF  
**File size limit:** 25 MB per image (applied in the browser; no server-side limit)

#### 6.2.2 Drop Zone States

| State | Behaviour |
|---|---|
| Idle | Dotted border, upload icon, instructional copy, dot-grid background |
| Drag-over | Border highlights in `#E8452A`, background tint, animated pulse |
| Processing / Decoding | Spinner, file name displayed |
| Error (wrong type) | Red border, accepted formats hint |
| Error (file too large) | Red border, file size shown |
| Success | Smooth transition to editor panel |

### 6.3 Download Gate (Critical UX Constraint)

**Principle:** Processed images are never stored anywhere — not on the server, not in local storage. Once the user navigates away or uploads a new image, the optimized result is gone.

**Enforcement mechanism:**

1. When a user attempts to upload a new image (or switch mode) while a processed image has not been downloaded, a modal intercepts the action.
2. The modal presents three options:
   - **Download First** — triggers download of all un-downloaded images, then proceeds with new upload
   - **Discard & Continue** — abandons the current result and loads the new image
   - **Cancel** — returns to the current session unchanged
3. In batch mode, the gate checks each image individually and reports how many are un-downloaded.

A persistent inline warning in the settings panel reads: *"Download before uploading new images — processed files are not stored anywhere."*

### 6.4 Before / After Comparison Slider

The comparison slider uses CSS `clip-path` combined with a draggable pointer-events handle:

- **Divider:** 2px vertical line, `#E8452A` circular handle (36px diameter) with left/right chevron icon
- **Keyboard accessible:** Focus the handle, use Left/Right arrow keys
- **Touch-optimized:** Pointer Events API (works on both mouse and touch)
- **Labels:** "ORIGINAL" badge pinned top-left, "OPTIMIZED" badge pinned top-right (in brand red)
- **Stats bar:** Below the slider — Original size → Optimized size, % saved, output dimensions

### 6.5 Settings Panel

#### 6.5.1 Format Selector

Segmented button group (JPEG / PNG / WebP). Each format displays a quality descriptor on selection.

| Format | Use Case |
|---|---|
| JPEG | Photographs, complex images. Widest compatibility. |
| PNG | Graphics, logos, transparency. Lossless or lossy. |
| WebP | Modern web. 25–35% smaller than JPEG. All modern browsers. |

> **Note:** AVIF support added in Phase 2 via `@squoosh/lib` WASM codec.

#### 6.5.2 Quality Slider

- **Range:** 10–100 (JPEG/WebP). Not shown for PNG.
- **Default:** 82 (empirically optimal quality/size balance)
- **Quick presets below track:** Low (30) · Balanced (65) · High (85) · Max (100)
- **Live update:** Debounced 250ms — preview updates as slider moves
- **Live estimate:** "Est. size: ~420 KB" shown beneath slider

#### 6.5.3 Resize Controls

Three-way toggle: **None** / **Custom** / **Preset**

**Custom mode:**
- Width (px) + Height (px) number inputs
- Aspect ratio lock toggle (on by default)
- Lock engaged: changing one dimension auto-calculates the other

**Preset mode:** See Social Media Preset Library below.

### 6.6 Social Media Preset Library

Accessible from the Resize › Preset mode. Grouped by platform.

#### Instagram
| Preset | Dimensions | Format | Quality |
|---|---|---|---|
| Feed Square | 1080 × 1080 px | JPEG | 85 |
| Feed Portrait | 1080 × 1350 px | JPEG | 85 |
| Feed Landscape | 1080 × 566 px | JPEG | 85 |
| Story / Reels | 1080 × 1920 px | JPEG | 85 |
| Profile Picture | 320 × 320 px | JPEG | 90 |

#### X / Twitter
| Preset | Dimensions | Format | Quality |
|---|---|---|---|
| Post (16:9) | 1200 × 675 px | JPEG | 85 |
| Post (1:1) | 1200 × 1200 px | JPEG | 85 |
| Header / Banner | 1500 × 500 px | JPEG | 80 |
| Profile Picture | 400 × 400 px | JPEG | 90 |

#### LinkedIn
| Preset | Dimensions | Format | Quality |
|---|---|---|---|
| Post / Share | 1200 × 627 px | JPEG | 85 |
| Company Cover | 1128 × 191 px | JPEG | 80 |
| Personal Banner | 1584 × 396 px | JPEG | 80 |

#### Facebook
| Preset | Dimensions | Format | Quality |
|---|---|---|---|
| Feed Post | 1200 × 630 px | JPEG | 85 |
| Cover Photo | 820 × 312 px | JPEG | 80 |
| Story | 1080 × 1920 px | JPEG | 85 |

#### Web & Blog
| Preset | Dimensions | Format | Quality |
|---|---|---|---|
| Blog Hero (Wide) | 1920 × 1080 px | WebP | 82 |
| Blog Hero | 1200 × 630 px | WebP | 82 |
| OG / Open Graph | 1200 × 630 px | JPEG | 85 |
| Thumbnail | 640 × 360 px | WebP | 78 |
| E-commerce Product | 800 × 800 px | WebP | 85 |
| Avatar | 400 × 400 px | JPEG | 90 |

### 6.7 Batch Mode Specifics

- Settings (format, quality, resize) apply globally to all images in the batch
- Thumbnail strip below the preview — click a thumbnail to inspect that image
- Each thumbnail shows a green checkmark overlay once downloaded
- An `+` slot at the end of the strip allows adding more images (up to 8 total)
- **Download All** button triggers sequential downloads with 250ms delay between files
- Download gate checks all images individually — reports how many are un-downloaded

### 6.8 Download & Export

- **Filename pattern:** `[original-name]-pixlite.[ext]` (e.g. `banner-pixlite.webp`)
- **Download button label:** Shows format and final file size — `DOWNLOAD WEBP · 340 KB`
- **Batch:** Individual download per thumbnail, plus **Download All** button
- **Copy to clipboard:** PNG output only (Clipboard API)

---

## 7. Site Architecture

| Route | Purpose |
|---|---|
| `/` | Landing page: hero, tool embed, features, social proof |
| `/app` | Full-screen optimizer application |
| `/blog` | SEO content hub |
| `/blog/[slug]` | Individual blog post (SSG) |
| `/presets` | All social media presets with specs — high organic value |
| `/tools/convert-to-webp` | Dedicated WebP conversion landing page |
| `/tools/compress-jpeg` | Dedicated JPEG compression landing page |
| `/tools/resize-image` | Dedicated resize landing page |
| `/tools/convert-to-avif` | AVIF conversion landing page |
| `/changelog` | Product updates |
| `/privacy` | GDPR-compliant privacy policy |
| `/terms` | Terms of service |

> **SEO note:** Each `/tools/*` page embeds the full optimizer pre-configured for its use case. This maximises both keyword relevance and conversion. The `/presets` page captures high-intent queries like *"Instagram image size 2026"*.

---

## 8. UI / UX Design System

### 8.1 Design Philosophy

pixlite.io uses a **dark mode only** design system inspired by the Hexaon brand identity. The aesthetic is utilitarian-premium: near-black backgrounds, maximum contrast, and a single high-energy accent color. No gradients, no glow effects, no purple/teal SaaS clichés.

> "Tools should feel like tools. Fast, sharp, and out of the way."

### 8.2 Color Tokens

| Token | Hex | Usage |
|---|---|---|
| `--bg-base` | `#080808` | App background (near-black) |
| `--bg-surface` | `#0E0E0E` | Cards, panels, settings sidebar |
| `--bg-elevated` | `#131313` | Hover states, input backgrounds |
| `--border` | `#191919` | All borders and dividers |
| `--accent` | `#E8452A` | CTAs, active states, brand identity |
| `--accent-dim` | `#E8452A1A` | Accent tint backgrounds |
| `--text-primary` | `#EEEEEE` | Main body text |
| `--text-muted` | `#888888` | Labels, secondary info |
| `--text-ghost` | `#333333` | Disabled, placeholder text |
| `--success` | `#22C55E` | Download complete, savings positive |
| `--danger` | `#EF4444` | Errors, size increase warning |

### 8.3 Typography

| Role | Font | Weight | Size |
|---|---|---|---|
| Wordmark / Logo | Bebas Neue | 400 | 24px |
| UI labels | DM Sans | 700 | 9–11px, ALL CAPS, tracked |
| Body / Settings | DM Sans | 400–500 | 11–14px |
| Stats / Values | JetBrains Mono | 400–500 | 10–16px |

### 8.4 Component Patterns

- **Sliders:** Custom-styled range inputs — 3px track, 16px thumb in `#E8452A`, gradient fill from 0 to current value
- **Segmented controls:** Pill-shaped button groups for format and mode selection
- **Buttons (primary):** Solid `#E8452A`, white text, 7px border-radius, ALL CAPS, tracked
- **Buttons (secondary):** Transparent, `#1e1e1e` border, muted text
- **Input fields:** `#131313` background, `#222` border, JetBrains Mono font
- **Badges / Pills:** `#E8452A1A` background, `#E8452A` text, small border

### 8.5 Responsive Layout

| Breakpoint | Layout |
|---|---|
| < 640px (Mobile) | Single column: full-width preview, settings below. Sticky download button. |
| 640–1024px (Tablet) | Two-column with collapsible settings drawer |
| 1024px+ (Desktop) | Fixed split: 63% preview / 37% settings |
| 1440px+ (Wide) | Max content width 1400px, centered |

### 8.6 Accessibility

- WCAG 2.1 AA compliance
- All interactive elements keyboard-navigable with visible focus rings
- ARIA labels on all icon buttons and sliders
- `prefers-reduced-motion` respected for all animations
- Screen reader announcements for processing start, completion, and errors
- Color is never the sole state indicator — always paired with icon or text

---

## 9. Business Model

### 9.1 Free Forever — No Tiers, No Paywalls

pixlite.io is **permanently and completely free**. There is no Pro plan, no usage cap, no watermark, and no login required. Every feature is available to every user on every visit.

**Why free forever?**

- Eliminates conversion friction — the primary barrier to adoption
- Builds brand equity and organic word-of-mouth at scale
- The entire processing cost is borne by the user's device (client-side WASM), making the marginal cost per user effectively zero
- Enables aggressive SEO targeting — free tools rank and convert better than freemium

### 9.2 Sustainability

Running costs for pixlite.io are near-zero:

| Cost | Amount |
|---|---|
| Vercel hosting (static + edge) | ~$0–20/month at 100k MAU |
| Plausible analytics | ~$9/month |
| Domain | ~$20/year |
| **Total** | **< $30/month** |

### 9.3 Future Monetization Options (Not Active)

These are potential future revenue streams that do **not** compromise the free tool:

- **Donations / "Buy me a coffee"** — voluntary, no feature gate
- **Sponsored blog content** — image optimization guides with affiliate links (hosting, CDNs)
- **White-label / embed licence** — for agencies wanting to embed pixlite in their own products
- **SaaS API** — a separate server-side API product (Sharp-powered) for developers needing programmatic access

---

## 10. Performance Targets

| Metric | Target |
|---|---|
| First Contentful Paint (FCP) | < 1.2 s on 4G |
| Largest Contentful Paint (LCP) | < 2.5 s — Core Web Vitals "Good" |
| Cumulative Layout Shift (CLS) | < 0.1 |
| Total Blocking Time (TBT) | < 200 ms |
| WASM codec load time | < 1.5 s on first use (cached via IndexedDB) |
| Preview update latency | < 250 ms after slider stop (debounced) |
| JS bundle size (initial) | < 120 KB gzipped (excluding WASM) |
| Lighthouse Performance | ≥ 95 desktop / ≥ 85 mobile |
| Time to first interaction | < 3 s on 3G, mid-range Android |

**WASM lazy loading strategy:** JPEG and PNG codecs load eagerly on page mount. WebP and AVIF load on first selection and are cached in IndexedDB for future visits.

---

## 11. SEO Content Strategy

### 11.1 Target Keywords

| Keyword | Est. Monthly Volume | Priority |
|---|---|---|
| compress image online | 450,000 | High |
| resize image online | 380,000 | High |
| convert image to WebP | 120,000 | High |
| JPEG compressor online | 90,000 | High |
| image optimizer free | 75,000 | High |
| Instagram image size 2026 | 60,000 | High |
| compress PNG online | 68,000 | Medium |
| reduce image file size | 55,000 | Medium |
| convert to AVIF online | 22,000 | Medium |
| best image format for web | 18,000 | Medium — blog |
| WebP vs AVIF vs JPEG | 8,500 | Low — blog |

### 11.2 Structured Data (JSON-LD)

| Page | Schema Types |
|---|---|
| Homepage & `/app` | `SoftwareApplication`, `AggregateRating` |
| `/tools/*` | `WebApplication`, `HowTo` |
| `/presets` | `ItemList` |
| `/blog/[slug]` | `BlogPosting`, `BreadcrumbList` |

### 11.3 Launch Content Plan (90 Days)

1. WebP vs JPEG vs AVIF: The Complete 2026 Guide
2. How to Optimize Images for Core Web Vitals
3. Instagram Image Sizes: Complete 2026 Cheat Sheet
4. How to Convert Images to WebP Without Losing Quality
5. The Ultimate Guide to Image Compression for the Web
6. AVIF Format: Is It Ready for Production in 2026?

---

## 12. Security & Privacy

### 12.1 Privacy Architecture

**pixlite.io processes all images locally in the user's browser. No image data is transmitted to any server at any time.** This is the foundation of the privacy guarantee and must be stated clearly and prominently in the UI.

- Zero server-side image storage
- Zero image upload telemetry
- No user accounts means no PII to protect or breach
- GDPR compliance is trivially achieved — no personal data is collected

### 12.2 Security Requirements

- **CSP headers** configured via Next.js middleware
- **HTTPS enforced** — Vercel automatic TLS
- **Rate limiting** on any server-side routes (next-rate-limit or Upstash)
- **No third-party tracking pixels** — Plausible only (cookieless, GDPR-safe)
- **Cookie consent** — not required (no cookies set by pixlite.io itself)
- **Subresource integrity** — all CDN assets use SRI hashes

---

## 13. MVP Scope & Phases

### Phase 1 — MVP (Weeks 1–6)

- [x] Drag-and-drop upload zone (single image mode)
- [x] Single / Batch mode toggle (max 8 images)
- [x] JPEG, PNG, WebP encode/decode via Canvas API (WASM in Phase 2)
- [x] Quality slider with real-time preview
- [x] Basic resize — custom W × H with aspect ratio lock
- [x] Before/after comparison slider
- [x] File size reduction stats bar
- [x] Download gate modal (enforced before new upload)
- [x] Batch thumbnail strip with per-image download tracking
- [x] 10 core social media presets (Instagram, X, LinkedIn)
- [x] Marketing landing page with SEO meta
- [x] 3× `/tools/*` pages for SEO
- [ ] Vercel deployment + GitHub CI/CD

### Phase 2 — Polish (Weeks 7–10)

- [ ] Replace Canvas API with `@squoosh/lib` WASM codecs
- [ ] AVIF output support
- [ ] Full social media preset library (all platforms)
- [ ] Advanced settings accordion (chroma subsampling, progressive JPEG, metadata strip)
- [ ] Clipboard paste support
- [ ] Download All (batch ZIP via JSZip)
- [ ] EXIF metadata display panel
- [ ] Blog with 6 launch articles
- [ ] Sitemap + Search Console submission

### Phase 3 — Growth (Weeks 11–16)

- [ ] GIF input handling (gifuct-js)
- [ ] URL import (paste image URL)
- [ ] PWA / offline mode (IndexedDB WASM caching)
- [ ] Copy to clipboard (PNG)
- [ ] `prefers-reduced-motion` full audit
- [ ] Performance audit — LCP target < 2.5 s mobile
- [ ] "Buy me a coffee" donation link (optional)

---

## 14. Risk Register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| WASM codec browser compat | Low | High | JS Canvas API fallback already in Phase 1 |
| AVIF encode slow on low-end devices | Medium | Medium | Speed/quality slider; warn on slow devices |
| `@squoosh/lib` maintenance / license change | Low | High | Apache 2.0; fork is viable. Fallback: libvips WASM |
| SEO competition from established tools | High | Medium | Target long-tail + social media spec pages aggressively |
| High-volume usage breaking Vercel free tier | Low | Low | All processing is client-side — zero server egress cost |
| WASM memory limits on mobile (>50MB images) | Medium | Medium | Cap file size at 25MB in browser before decode |

---

## 15. Open Questions

1. Should the before/after slider support animated GIF playback for GIF comparison?
2. Plausible vs PostHog — Plausible for simplicity, PostHog for future feature flags?
3. Should there be a PWA install prompt once WASM is cached in IndexedDB?
4. Should pixlite add a subtle "Optimized with pixlite.io" EXIF comment for organic brand awareness (opt-out toggle)?
5. Should the landing page `/` embed a trimmed version of the tool inline, or link to `/app`?

---

## 16. Appendices

### Appendix A — Project File Structure

```
pixlite/
  app/
    (marketing)/
      page.tsx              # Landing page
      presets/page.tsx
      blog/[slug]/page.tsx
      tools/[tool]/page.tsx
    app/
      page.tsx              # /app route — full-screen optimizer
      layout.tsx            # Minimal layout (no nav)
  components/
    editor/
      UploadZone.tsx
      ModeToggle.tsx        # Single / Batch toggle
      BeforeAfterSlider.tsx
      SettingsPanel.tsx
      FormatSelector.tsx
      QualitySlider.tsx
      ResizeControls.tsx
      PresetLibrary.tsx
      DownloadButton.tsx
      DownloadGateModal.tsx # Critical UX constraint
      BatchStrip.tsx
    ui/                     # shadcn/ui components
    marketing/
  lib/
    codecs/
      jpeg.ts
      webp.ts
      avif.ts
      png.ts
    presets/
      instagram.ts
      twitter.ts
      linkedin.ts
      facebook.ts
      web.ts
    store/
      editorStore.ts        # Zustand — mode, images, settings, dlDone[]
    utils/
      imageUtils.ts
      formatBytes.ts
      downloadGate.ts
  public/
    fonts/
    og-image.png
  content/                  # Blog MDX files
  next.config.ts
  tailwind.config.ts
```

### Appendix B — Key npm Dependencies

| Package | Version | Purpose |
|---|---|---|
| `next` | 15.x | Core framework |
| `typescript` | 5.x | Language |
| `tailwindcss` | 4.x | Styling |
| `@radix-ui/react-slider` | latest | Accessible sliders |
| `framer-motion` | 11.x | Animations |
| `react-dropzone` | 14.x | File upload |
| `zustand` | 5.x | State management |
| `@squoosh/lib` | 0.5.x | WASM image codecs |
| `exifr` | 7.x | EXIF metadata |
| `jszip` | 3.x | Batch ZIP assembly |
| `sonner` | latest | Toast notifications |
| `next-sitemap` | 4.x | Sitemap generation |
| `@sentry/nextjs` | 8.x | Error tracking |

### Appendix C — Design Tokens (CSS Variables)

```css
:root {
  --bg-base:        #080808;
  --bg-surface:     #0E0E0E;
  --bg-elevated:    #131313;
  --border:         #191919;
  --accent:         #E8452A;
  --accent-dim:     #E8452A1A;
  --accent-border:  #E8452A40;
  --text-primary:   #EEEEEE;
  --text-muted:     #888888;
  --text-ghost:     #333333;
  --success:        #22C55E;
  --danger:         #EF4444;
  --font-brand:     'Bebas Neue', cursive;
  --font-ui:        'DM Sans', system-ui, sans-serif;
  --font-mono:      'JetBrains Mono', monospace;
  --radius-sm:      5px;
  --radius-md:      7px;
  --radius-lg:      12px;
}
```

---

*pixlite.io PRD v2.0.0 — March 2026 — Confidential*
