'use client';

import { useEditorStore } from '@/lib/store/editorStore';
import { Link2, Unlink } from 'lucide-react';
import { PresetLibrary } from './PresetLibrary';
import type { ResizeMode } from '@/lib/types';

const modes: { value: ResizeMode; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'custom', label: 'Custom' },
  { value: 'preset', label: 'Preset' },
];

export function ResizeControls() {
  const settings = useEditorStore((s) => s.settings);
  const setResizeMode = useEditorStore((s) => s.setResizeMode);
  const setDimensions = useEditorStore((s) => s.setDimensions);
  const activeImage = useEditorStore((s) => {
    return s.images.find((i) => i.id === s.activeImageId);
  });

  const toggleAspectLock = () => {
    useEditorStore.setState((state) => ({
      settings: {
        ...state.settings,
        aspectRatioLocked: !state.settings.aspectRatioLocked,
      },
    }));
  };

  const handleWidthChange = (value: string) => {
    const w = value ? parseInt(value) : null;
    if (settings.aspectRatioLocked && activeImage && w) {
      const ratio = activeImage.originalHeight / activeImage.originalWidth;
      setDimensions(w, Math.round(w * ratio));
    } else {
      setDimensions(w, settings.height);
    }
  };

  const handleHeightChange = (value: string) => {
    const h = value ? parseInt(value) : null;
    if (settings.aspectRatioLocked && activeImage && h) {
      const ratio = activeImage.originalWidth / activeImage.originalHeight;
      setDimensions(Math.round(h * ratio), h);
    } else {
      setDimensions(settings.width, h);
    }
  };

  return (
    <div>
      <label className="block text-[10px] font-bold uppercase tracking-widest text-text-muted mb-2">
        Resize
      </label>

      {/* Mode toggle */}
      <div className="flex bg-bg-surface border border-border-default rounded-lg p-0.5 mb-3">
        {modes.map((m) => (
          <button
            key={m.value}
            onClick={() => setResizeMode(m.value)}
            className={`
              flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all
              ${settings.resizeMode === m.value
                ? 'bg-accent-brand text-white'
                : 'text-text-muted hover:text-text-primary'
              }
            `}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Custom dimensions */}
      {settings.resizeMode === 'custom' && (
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="block text-[9px] font-bold uppercase tracking-widest text-text-ghost mb-1">
              Width
            </label>
            <div className="relative">
              <input
                type="number"
                value={settings.width ?? ''}
                onChange={(e) => handleWidthChange(e.target.value)}
                placeholder={activeImage ? String(activeImage.originalWidth) : '0'}
                className="w-full bg-bg-elevated border border-border-default rounded-md px-2.5 py-1.5 font-mono text-sm text-text-primary placeholder:text-text-ghost outline-none focus:border-accent-brand transition-colors"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-text-ghost font-mono">
                px
              </span>
            </div>
          </div>

          <button
            onClick={toggleAspectLock}
            className={`mt-4 p-1.5 rounded-md transition-colors ${
              settings.aspectRatioLocked
                ? 'text-accent-brand bg-accent-dim'
                : 'text-text-ghost hover:text-text-muted'
            }`}
            aria-label={settings.aspectRatioLocked ? 'Unlock aspect ratio' : 'Lock aspect ratio'}
          >
            {settings.aspectRatioLocked ? <Link2 className="w-3.5 h-3.5" /> : <Unlink className="w-3.5 h-3.5" />}
          </button>

          <div className="flex-1">
            <label className="block text-[9px] font-bold uppercase tracking-widest text-text-ghost mb-1">
              Height
            </label>
            <div className="relative">
              <input
                type="number"
                value={settings.height ?? ''}
                onChange={(e) => handleHeightChange(e.target.value)}
                placeholder={activeImage ? String(activeImage.originalHeight) : '0'}
                className="w-full bg-bg-elevated border border-border-default rounded-md px-2.5 py-1.5 font-mono text-sm text-text-primary placeholder:text-text-ghost outline-none focus:border-accent-brand transition-colors"
              />
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-text-ghost font-mono">
                px
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Preset library */}
      {settings.resizeMode === 'preset' && <PresetLibrary />}
    </div>
  );
}
