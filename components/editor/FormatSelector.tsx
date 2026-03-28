'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import type { ImageFormat } from '@/lib/types';

const formats: { value: ImageFormat; label: string; description: string }[] = [
  { value: 'jpeg', label: 'JPEG', description: 'Photographs, complex images. Widest compatibility.' },
  { value: 'png', label: 'PNG', description: 'Graphics, logos, transparency. Lossless.' },
  { value: 'webp', label: 'WebP', description: 'Modern web. 25–35% smaller than JPEG.' },
];

export function FormatSelector() {
  const format = useEditorStore((s) => s.settings.format);
  const setFormat = useEditorStore((s) => s.setFormat);

  const activeFormat = formats.find((f) => f.value === format)!;

  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
        Format
      </label>
      <div className="flex bg-bg-surface border border-border-default rounded-lg p-0.5">
        {formats.map((f) => (
          <button
            key={f.value}
            onClick={() => setFormat(f.value)}
            className={`
              flex-1 py-1.5 text-[11px] font-bold uppercase tracking-wider rounded-md transition-all
              ${format === f.value
                ? 'bg-accent-brand text-white'
                : 'text-text-muted hover:text-text-primary'
              }
            `}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p className="mt-1.5 text-[10px] text-text-ghost">
        {activeFormat.description}
      </p>
    </div>
  );
}
