import Link from "next/link";
import type { Metadata } from "next";
import { presetsByPlatform } from "@/lib/presets";

export const metadata: Metadata = {
  title: "Social Media Image Sizes 2026 — All Platform Presets",
  description:
    "Complete guide to social media image sizes for Instagram, X/Twitter, LinkedIn, Facebook, and web. One-click presets for instant optimization.",
};

export default function PresetsPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 lg:py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="font-brand text-4xl sm:text-5xl tracking-wide text-text-primary mb-3">
          SOCIAL MEDIA PRESETS
        </h1>
        <p className="text-sm text-text-muted max-w-lg mx-auto mb-6">
          All the image dimensions you need for every major platform. Click any preset to start optimizing.
        </p>
        <Link
          href="/app"
          className="inline-flex items-center gap-2 bg-accent-brand text-white px-5 py-2.5 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-accent-brand/90 transition-colors"
        >
          Open in Editor
        </Link>
      </div>

      {/* Preset tables */}
      <div className="space-y-10">
        {presetsByPlatform.map((group) => (
          <div key={group.platform}>
            <h2 className="font-brand text-2xl tracking-wide text-text-primary mb-4 pb-2 border-b border-border-default">
              {group.platform.toUpperCase()}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left">
                    <th className="text-[9px] font-bold uppercase tracking-widest text-text-ghost pb-2 pr-4">
                      Preset
                    </th>
                    <th className="text-[9px] font-bold uppercase tracking-widest text-text-ghost pb-2 pr-4">
                      Dimensions
                    </th>
                    <th className="text-[9px] font-bold uppercase tracking-widest text-text-ghost pb-2 pr-4">
                      Format
                    </th>
                    <th className="text-[9px] font-bold uppercase tracking-widest text-text-ghost pb-2">
                      Quality
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {group.presets.map((preset) => (
                    <tr
                      key={preset.id}
                      className="border-t border-border-default hover:bg-bg-surface transition-colors"
                    >
                      <td className="py-2.5 pr-4 text-sm text-text-primary">
                        {preset.name}
                      </td>
                      <td className="py-2.5 pr-4 font-mono text-xs text-text-muted">
                        {preset.width} × {preset.height} px
                      </td>
                      <td className="py-2.5 pr-4">
                        <span className="px-1.5 py-0.5 text-[10px] font-mono font-bold uppercase bg-bg-elevated border border-border-default rounded text-text-ghost">
                          {preset.format}
                        </span>
                      </td>
                      <td className="py-2.5 font-mono text-xs text-text-muted">
                        {preset.quality}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="text-center mt-12 pt-8 border-t border-border-default">
        <p className="text-sm text-text-muted mb-4">
          Ready to optimize your images with these presets?
        </p>
        <Link
          href="/app"
          className="inline-flex items-center gap-2 bg-accent-brand text-white px-6 py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-accent-brand/90 transition-colors"
        >
          Start Optimizing — Free
        </Link>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Social Media Image Size Presets",
            description: "Complete list of social media image dimensions and optimization presets.",
            numberOfItems: presetsByPlatform.reduce((acc, g) => acc + g.presets.length, 0),
            itemListElement: presetsByPlatform.flatMap((group, gi) =>
              group.presets.map((preset, pi) => ({
                "@type": "ListItem",
                position: gi * 10 + pi + 1,
                name: `${group.platform} — ${preset.name} (${preset.width}×${preset.height})`,
              }))
            ),
          }),
        }}
      />
    </div>
  );
}
