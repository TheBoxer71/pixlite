---
name: add-tool-page
description: Add a new SEO-optimized tool landing page to pixlite (e.g., convert-to-avif)
argument-hint: [tool-slug]
---

Add a new SEO tool landing page for `$ARGUMENTS` to pixlite.

## Steps

1. **Read the existing tools page** at `app/(marketing)/tools/[tool]/page.tsx` to understand the `toolsConfig` structure.

2. **Add a new entry to `toolsConfig`** with the key `$ARGUMENTS`:
   ```typescript
   "[tool-slug]": {
     title: "...",           // SEO <title> — include "Free" and "Online"
     h1: "...",              // ALL CAPS heading for the page
     description: "...",     // Short one-line description
     metaDescription: "...", // 150-160 char meta description with keywords
     copy: "...",            // 2-3 paragraphs of SEO content (separated by \n\n)
     faqs: [                 // 3 common questions with concise answers
       { q: "...", a: "..." },
       { q: "...", a: "..." },
       { q: "...", a: "..." },
     ],
   }
   ```

3. **Add the tool slug** to `generateStaticParams()` in the same file.

4. **Update `app/sitemap.ts`** — add a new entry:
   ```typescript
   { url: `${baseUrl}/tools/$ARGUMENTS`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
   ```

5. **SEO content guidelines:**
   - Title: Target the primary keyword (e.g., "Convert to AVIF Online — Free AVIF Converter")
   - H1: Action-oriented, ALL CAPS (e.g., "CONVERT IMAGES TO AVIF")
   - Copy: Explain the format benefits, how pixlite handles it, who it's for
   - FAQs: Answer real user questions — browser support, quality, file size
   - Always mention: free, no login, browser-based, private

6. **Run `/build`** to verify the page generates correctly.
