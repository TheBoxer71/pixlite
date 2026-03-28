'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { presetsByPlatform } from '@/lib/presets';

export function PresetLibrary() {
  const presetId = useEditorStore((s) => s.settings.presetId);
  const applyPreset = useEditorStore((s) => s.applyPreset);

  return (
    <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
      {presetsByPlatform.map((group) => (
        <div key={group.platform}>
          <h4 className="text-[9px] font-bold uppercase tracking-widest text-text-ghost mb-1.5 sticky top-0 bg-bg-surface py-0.5">
            {group.platform}
          </h4>
          <div className="space-y-0.5">
            {group.presets.map((preset) => (
              <button
                key={preset.id}
                onClick={() => applyPreset(preset.id)}
                className={`
                  w-full flex items-center justify-between px-2.5 py-1.5 rounded-md text-left transition-all
                  ${presetId === preset.id
                    ? 'bg-accent-dim border border-accent-border text-text-primary'
                    : 'hover:bg-bg-elevated text-text-muted hover:text-text-primary border border-transparent'
                  }
                `}
              >
                <span className="text-[11px] font-medium">{preset.name}</span>
                <span className="text-[10px] font-mono text-text-ghost">
                  {preset.width} × {preset.height}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
