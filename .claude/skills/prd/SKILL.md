---
name: prd
description: Quick reference for pixlite PRD sections — look up specs, features, design tokens, or presets
argument-hint: [section-name]
---

Look up information from the pixlite PRD. Query: `$ARGUMENTS`

## Steps

1. **Read `pixlite-PRD.md`** in the project root.

2. **Find the relevant section** based on the user's query. Match against these PRD sections:
   - `summary` — Executive summary and core value proposition
   - `problem` — Problem statement and opportunity
   - `goals` or `metrics` — Goals and KPIs
   - `personas` or `users` — Target user personas
   - `stack` or `tech` — Technology stack
   - `features` — Feature specifications (upload, download gate, slider, settings, batch)
   - `presets` — Social media preset library with all dimensions
   - `architecture` or `routes` — Site architecture and routes
   - `design` or `ui` or `colors` or `tokens` — Design system, colors, typography, components
   - `business` or `model` — Business model and sustainability
   - `performance` — Performance targets and WASM strategy
   - `seo` or `keywords` — SEO content strategy and target keywords
   - `security` or `privacy` — Security and privacy architecture
   - `mvp` or `phases` or `scope` — MVP scope, phases, and checklist
   - `risks` — Risk register
   - `structure` or `files` — Project file structure (Appendix A)
   - `dependencies` or `packages` — npm dependencies (Appendix B)
   - `css` or `variables` — CSS design tokens (Appendix C)

3. **If no argument is provided**, show a table of contents with section names and one-line summaries so the user can pick one.

4. **Present the information concisely** — extract the key facts, tables, and specs. Don't dump the entire PRD section verbatim; summarize and highlight actionable details.
