import Link from "next/link";
import type { Metadata } from "next";
import {
  Shield,
  SlidersHorizontal,
  LayoutGrid,
  Layers,
  Heart,
  UserX,
} from "lucide-react";

export const metadata: Metadata = {
  title: "pixlite — Free Online Image Optimizer | Compress, Resize, Convert",
  description:
    "Free browser-based image optimizer. Compress JPEG, PNG, WebP with real-time preview. No login, no upload to servers, 100% private. Free forever.",
};

const features = [
  {
    icon: Shield,
    title: "Privacy-First",
    description: "Images are processed locally in your browser. Nothing is ever uploaded to a server.",
  },
  {
    icon: SlidersHorizontal,
    title: "Real-Time Preview",
    description: "Interactive before/after slider with live quality feedback as you adjust settings.",
  },
  {
    icon: LayoutGrid,
    title: "Smart Presets",
    description: "One-click optimization for Instagram, X, LinkedIn, Facebook, and more.",
  },
  {
    icon: Layers,
    title: "Batch Mode",
    description: "Process up to 8 images at once with shared settings and individual downloads.",
  },
  {
    icon: Heart,
    title: "Free Forever",
    description: "No freemium bait-and-switch. The full tool is permanently free for everyone.",
  },
  {
    icon: UserX,
    title: "No Login Required",
    description: "Open and use immediately. No account, no email, no friction whatsoever.",
  },
];

const steps = [
  { number: "01", title: "Upload", description: "Drag & drop, click to browse, or paste from clipboard." },
  { number: "02", title: "Adjust", description: "Choose format, quality, and resize. Preview changes in real time." },
  { number: "03", title: "Download", description: "Get your optimized image instantly. No watermark, no limits." },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="dot-grid absolute inset-0 opacity-30" />
        <div className="relative max-w-[1400px] mx-auto px-6 py-20 lg:py-32 text-center">
          <h1 className="font-brand text-5xl sm:text-7xl lg:text-8xl tracking-wide text-text-primary mb-4">
            OPTIMIZE YOUR IMAGES
          </h1>
          <p className="text-lg sm:text-xl text-text-muted max-w-2xl mx-auto mb-3">
            Compress, resize, and convert images instantly — right in your browser.
          </p>
          <p className="text-sm text-text-ghost max-w-lg mx-auto mb-8">
            Free forever. No login. No upload to servers. 100% private.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 bg-accent-brand text-white px-6 py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-accent-brand/90 transition-colors"
            >
              Start Optimizing
            </Link>
            <Link
              href="/presets"
              className="inline-flex items-center gap-2 bg-bg-elevated border border-border-default text-text-muted px-6 py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:text-text-primary hover:border-text-ghost transition-colors"
            >
              View Presets
            </Link>
          </div>
        </div>
      </section>

      {/* Format badges */}
      <section className="border-y border-border-default bg-bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 py-6 flex items-center justify-center gap-3 flex-wrap">
          {["JPEG", "PNG", "WebP", "GIF", "BMP", "TIFF"].map((f) => (
            <span
              key={f}
              className="px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest text-text-ghost border border-border-default rounded-md"
            >
              {f}
            </span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1400px] mx-auto px-6 py-16 lg:py-24">
        <div className="text-center mb-12">
          <h2 className="font-brand text-3xl sm:text-4xl tracking-wide text-text-primary mb-3">
            WHY PIXLITE
          </h2>
          <p className="text-sm text-text-muted max-w-md mx-auto">
            A polished, privacy-respecting image optimizer built for the modern web.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-5 rounded-xl bg-bg-surface border border-border-default hover:border-accent-brand/30 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-accent-dim flex items-center justify-center mb-3 group-hover:bg-accent-brand/20 transition-colors">
                <feature.icon className="w-5 h-5 text-accent-brand" />
              </div>
              <h3 className="text-sm font-bold text-text-primary mb-1">
                {feature.title}
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-border-default bg-bg-surface">
        <div className="max-w-[1400px] mx-auto px-6 py-16 lg:py-24">
          <div className="text-center mb-12">
            <h2 className="font-brand text-3xl sm:text-4xl tracking-wide text-text-primary mb-3">
              HOW IT WORKS
            </h2>
            <p className="text-sm text-text-muted">Three simple steps. No complications.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <span className="font-mono text-3xl font-bold text-accent-brand/30">
                  {step.number}
                </span>
                <h3 className="text-sm font-bold text-text-primary mt-2 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/app"
              className="inline-flex items-center gap-2 bg-accent-brand text-white px-6 py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-accent-brand/90 transition-colors"
            >
              Try It Now — It&apos;s Free
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof / trust */}
      <section className="max-w-[1400px] mx-auto px-6 py-16 lg:py-24 text-center">
        <h2 className="font-brand text-3xl sm:text-4xl tracking-wide text-text-primary mb-3">
          BUILT FOR EVERYONE
        </h2>
        <p className="text-sm text-text-muted max-w-lg mx-auto mb-8">
          Content creators, web developers, social media managers, photographers, and e-commerce owners all use pixlite to optimize their images.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl mx-auto">
          {[
            { value: "100%", label: "Free" },
            { value: "0", label: "Data collected" },
            { value: "25MB", label: "Max file size" },
            { value: "3", label: "Output formats" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-mono text-2xl font-bold text-accent-brand">{stat.value}</div>
              <div className="text-[10px] uppercase tracking-widest text-text-ghost mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "pixlite",
            url: "https://pixlite.io",
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web Browser",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
            description:
              "Free browser-based image optimizer. Compress, resize, and convert JPEG, PNG, WebP images with real-time preview.",
          }),
        }}
      />
    </div>
  );
}
