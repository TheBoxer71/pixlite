---
name: build
description: Run a production build of the pixlite Next.js app and report results
disable-model-invocation: true
allowed-tools: Bash(npm run build*)
---

Run a production build of pixlite and report results.

1. Run `npm run build`
2. If the build **succeeds**:
   - Report the route summary (static vs SSG pages)
   - Note any warnings
3. If the build **fails**:
   - Show the TypeScript or build error clearly
   - Identify the file and line number
   - Suggest a fix if the error is straightforward
   - Do NOT automatically fix — ask the user first
