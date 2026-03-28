---
name: add-component
description: Scaffold a new editor component for pixlite with Zustand store integration
argument-hint: [ComponentName]
---

Scaffold a new editor component called `$ARGUMENTS` for pixlite.

## Steps

1. **Read existing components** for patterns:
   - Read `components/editor/FormatSelector.tsx` for a simple store-connected component
   - Read `components/editor/SettingsPanel.tsx` for a composite component
   - Read `lib/store/editorStore.ts` for available state and actions
   - Read `app/globals.css` for design token reference

2. **Create `components/editor/$ARGUMENTS.tsx`** following these conventions:

   ```typescript
   'use client';

   import { useEditorStore } from '@/lib/store/editorStore';
   // Import icons from lucide-react as needed
   // Import child components as needed

   export function $ARGUMENTS() {
     // Use individual selectors to minimize re-renders
     const someValue = useEditorStore((s) => s.someValue);
     const someAction = useEditorStore((s) => s.someAction);

     return (
       <div>
         {/* Component content */}
       </div>
     );
   }
   ```

3. **Follow these design system rules:**
   - Always use `'use client'` directive
   - Use `bg-bg-base`, `bg-bg-surface`, `bg-bg-elevated` for backgrounds
   - Use `border-border-default` for borders
   - Use `text-text-primary`, `text-text-muted`, `text-text-ghost` for text
   - Use `bg-accent-brand` / `text-accent-brand` for accent/active states
   - Use `font-mono` for numeric values, `font-brand` for headings
   - Section labels: `text-[10px] font-bold uppercase tracking-widest text-text-muted`
   - All interactive elements need keyboard accessibility and ARIA labels
   - Icons from `lucide-react`, sized `w-3.5 h-3.5` or `w-4 h-4`

4. **If the component needs new state**, add it to `lib/store/editorStore.ts`:
   - Add the state field to `EditorState` interface
   - Add the action to `EditorActions` interface
   - Implement the action in the store
   - Add default value to initial state

5. **Report the created file** and suggest where to integrate it (e.g., in `SettingsPanel.tsx` or `app/app/page.tsx`).
