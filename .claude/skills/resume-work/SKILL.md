---
name: resume-work
description: Resume development on pixlite — summarize project state, recent changes, and suggest next steps
disable-model-invocation: true
---

Help the developer resume work on pixlite after a break.

## Steps

1. **Check project state:**
   - Run `git status` to see uncommitted changes
   - Run `git log --oneline -10` to see recent commits
   - Run `git diff --stat` to see what files have been modified

2. **Check for build health:**
   - Run `npm run build` to verify the project compiles
   - If it fails, report the error and suggest fixing it first

3. **Read the PRD** at `pixlite-PRD.md` — specifically the MVP checklist in section 13 ("MVP Scope & Phases") to understand what's done and what remains.

4. **Scan for TODO/FIXME comments** in the codebase:
   - Search for `TODO`, `FIXME`, `HACK`, `XXX` in all `.ts` and `.tsx` files

5. **Summarize clearly:**
   - What was last worked on (from git log and diff)
   - Current build status (passing or failing)
   - Any uncommitted work in progress
   - What PRD features are still pending
   - Suggested next task to work on

6. **Present as a brief status report** — keep it scannable, use bullet points. End with a clear recommendation for what to do next.
