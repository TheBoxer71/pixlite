'use client';

import { useEditorStore } from '@/lib/store/editorStore';

const presets = [
  { label: 'Low', value: 30 },
  { label: 'Balanced', value: 65 },
  { label: 'High', value: 85 },
  { label: 'Max', value: 100 },
];

export function QualitySlider() {
  const quality = useEditorStore((s) => s.settings.quality);
  const format = useEditorStore((s) => s.settings.format);
  const setQuality = useEditorStore((s) => s.setQuality);
  const activeImage = useEditorStore((s) => {
    const img = s.images.find((i) => i.id === s.activeImageId);
    return img;
  });

  // PNG is lossless — hide quality slider
  if (format === 'png') return null;

  const estimatedSize = activeImage
    ? activeImage.originalSize * (quality / 100) * (format === 'webp' ? 0.75 : 0.9)
    : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-[10px] font-bold uppercase tracking-widest text-text-muted">
          Quality
        </label>
        <span className="font-mono text-sm text-accent-brand font-medium">
          {quality}
        </span>
      </div>

      {/* Custom range slider */}
      <div className="relative">
        <input
          type="range"
          min={10}
          max={100}
          step={1}
          value={quality}
          onChange={(e) => setQuality(Number(e.target.value))}
          className="w-full h-[3px] appearance-none bg-border-default rounded-full outline-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-4
            [&::-webkit-slider-thumb]:h-4
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-accent-brand
            [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:border-0
            [&::-webkit-slider-thumb]:shadow-[0_0_0_3px_rgba(232,69,42,0.2)]
            [&::-webkit-slider-thumb]:transition-shadow
            [&::-webkit-slider-thumb]:hover:shadow-[0_0_0_5px_rgba(232,69,42,0.3)]
            [&::-moz-range-thumb]:w-4
            [&::-moz-range-thumb]:h-4
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-accent-brand
            [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-0
          "
          style={{
            background: `linear-gradient(to right, #E8452A 0%, #E8452A ${((quality - 10) / 90) * 100}%, #191919 ${((quality - 10) / 90) * 100}%, #191919 100%)`,
          }}
          aria-label="Compression quality"
          aria-valuemin={10}
          aria-valuemax={100}
          aria-valuenow={quality}
          aria-valuetext={`${quality} percent`}
        />
      </div>

      {/* Preset pills */}
      <div className="flex gap-1.5 mt-2.5">
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => setQuality(p.value)}
            className={`
              px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider rounded-md transition-all border
              ${quality === p.value
                ? 'bg-accent-dim border-accent-border text-accent-brand'
                : 'bg-transparent border-border-default text-text-ghost hover:text-text-muted hover:border-text-ghost'
              }
            `}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* Estimated size */}
      {estimatedSize !== null && (
        <p className="mt-2 text-[10px] font-mono text-text-ghost">
          Est. size: ~{formatEstimate(estimatedSize)}
        </p>
      )}
    </div>
  );
}

function formatEstimate(bytes: number): string {
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
