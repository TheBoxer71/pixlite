'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { Layers, Image } from 'lucide-react';
import type { EditorMode } from '@/lib/types';

export function ModeToggle() {
  const mode = useEditorStore((s) => s.mode);
  const setMode = useEditorStore((s) => s.setMode);

  const modes: { value: EditorMode; label: string; icon: React.ReactNode }[] = [
    { value: 'single', label: 'SINGLE', icon: <Image className="w-3.5 h-3.5" /> },
    { value: 'batch', label: 'BATCH', icon: <Layers className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="inline-flex items-center bg-bg-surface border border-border-default rounded-lg p-0.5">
      {modes.map((m) => (
        <button
          key={m.value}
          onClick={() => setMode(m.value)}
          className={`
            flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all
            ${mode === m.value
              ? 'bg-accent-brand text-white'
              : 'text-text-muted hover:text-text-primary'
            }
          `}
        >
          {m.icon}
          {m.label}
        </button>
      ))}
    </div>
  );
}
