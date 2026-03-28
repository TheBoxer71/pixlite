---
name: lint
description: Run ESLint on the pixlite codebase and report or fix issues
disable-model-invocation: true
allowed-tools: Bash(npm run lint*), Bash(npx eslint*)
---

Lint the pixlite codebase.

1. Run `npm run lint`
2. If there are **no issues**, report success
3. If there are **errors or warnings**:
   - List each issue with file path and line number
   - Group by severity (errors first, then warnings)
   - For auto-fixable issues, ask the user if they want to run `npx eslint --fix`
   - For manual issues, explain what needs to change
