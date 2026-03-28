---
name: review
description: Review current code changes against pixlite standards, types, and PRD requirements
disable-model-invocation: true
---

Review the current code changes in pixlite.

## Steps

1. **Gather changes:**
   - Run `git diff` to see all unstaged changes
   - Run `git diff --cached` to see staged changes
   - If no changes exist, report that and stop

2. **Type check:**
   - Run `npx tsc --noEmit` to check for TypeScript errors
   - Report any type errors with file and line

3. **Lint check:**
   - Run `npm run lint` to catch ESLint issues

4. **Design system compliance** — for any modified component files, check:
   - Uses correct color tokens (`bg-bg-base`, `text-text-primary`, `border-border-default`, etc.)
   - Uses correct font classes (`font-mono` for values, `font-brand` for headings, `font-ui` for body)
   - Section labels follow pattern: `text-[10px] font-bold uppercase tracking-widest text-text-muted`
   - Buttons use `bg-accent-brand text-white` for primary, correct border/ghost styles for secondary
   - All interactive elements have keyboard accessibility

5. **Architecture check:**
   - Components use `'use client'` directive when they use hooks or browser APIs
   - Zustand selectors are granular (select individual fields, not entire state)
   - Object URLs are properly revoked to prevent memory leaks
   - No `images` array in `useEffect` dependency arrays (causes infinite loops)

6. **PRD alignment** — read `pixlite-PRD.md` and check that changes align with the spec:
   - Correct dimensions for presets
   - Correct default values (quality 82, aspect ratio locked, etc.)
   - Download filename pattern: `[original-name]-pixlite.[ext]`

7. **Report findings** grouped by severity:
   - **Errors** — must fix (type errors, lint errors, broken functionality)
   - **Warnings** — should fix (design system violations, accessibility gaps)
   - **Notes** — nice to fix (code style, minor improvements)
