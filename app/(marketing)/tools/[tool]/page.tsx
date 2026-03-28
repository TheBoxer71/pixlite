import Link from "next/link";
import type { Metadata } from "next";

interface ToolConfig {
  title: string;
  h1: string;
  description: string;
  metaDescription: string;
  copy: string;
  faqs: { q: string; a: string }[];
}

const toolsConfig: Record<string, ToolConfig> = {
  "compress-jpeg": {
    title: "Compress JPEG Online — Free JPEG Compressor",
    h1: "COMPRESS JPEG ONLINE",
    description: "Reduce JPEG file size without visible quality loss.",
    metaDescription:
      "Free online JPEG compressor. Reduce JPEG file size up to 80% with adjustable quality. No upload, no login, 100% private browser-based compression.",
    copy: `JPEG is the most widely used image format on the web. With pixlite's JPEG compressor, you can drastically reduce file sizes while maintaining visual quality. Our intelligent compression algorithm runs entirely in your browser — your images never leave your device.

Adjust the quality slider to find the perfect balance between file size and visual fidelity. The real-time before/after preview shows you exactly what your compressed image will look like before you download it.

Perfect for photographers, bloggers, and web developers who need fast, reliable JPEG compression without the hassle of desktop software or account sign-ups.`,
    faqs: [
      { q: "How much can I compress a JPEG?", a: "Typically 50–80% file size reduction at quality 65–82 with no visible quality loss for web use." },
      { q: "Does compressing JPEG reduce image quality?", a: "JPEG compression is lossy, but at quality 80+ the difference is imperceptible to the human eye. Use our before/after slider to verify." },
      { q: "Is my image uploaded to a server?", a: "No. All compression happens locally in your browser using Canvas API. Your images never leave your device." },
    ],
  },
  "convert-to-webp": {
    title: "Convert to WebP Online — Free WebP Converter",
    h1: "CONVERT IMAGES TO WEBP",
    description: "Convert JPEG and PNG images to WebP for smaller file sizes.",
    metaDescription:
      "Free online WebP converter. Convert JPEG, PNG to WebP format with 25-35% smaller file sizes. No upload, no login, browser-based conversion.",
    copy: `WebP is Google's modern image format that delivers 25–35% smaller files compared to JPEG at equivalent quality. All modern browsers support WebP, making it the ideal format for web performance.

pixlite converts your JPEG and PNG images to WebP instantly in your browser. No server upload, no waiting, no quality compromise. Adjust the quality slider and watch the file size drop in real time.

WebP supports both lossy and lossless compression, transparency (like PNG), and animation (like GIF). It's the go-to format for web developers targeting Core Web Vitals performance scores.`,
    faqs: [
      { q: "Is WebP supported by all browsers?", a: "Yes. All modern browsers (Chrome, Firefox, Safari, Edge) support WebP. Legacy IE11 does not, but its market share is negligible." },
      { q: "How much smaller is WebP than JPEG?", a: "WebP images are typically 25–35% smaller than JPEG at equivalent visual quality." },
      { q: "Can I convert PNG with transparency to WebP?", a: "Yes. WebP supports alpha transparency, making it an excellent replacement for PNG on the web." },
    ],
  },
  "resize-image": {
    title: "Resize Image Online — Free Image Resizer",
    h1: "RESIZE IMAGES ONLINE",
    description: "Resize images to exact dimensions with aspect ratio control.",
    metaDescription:
      "Free online image resizer. Resize JPEG, PNG, WebP to exact dimensions with aspect ratio lock. Social media presets included. No upload, 100% private.",
    copy: `Resize any image to exact pixel dimensions with pixlite's free online resizer. Whether you need specific social media dimensions, blog hero images, or e-commerce product photos, pixlite handles it all.

Use custom dimensions with aspect ratio lock to maintain proportions, or choose from our library of social media presets for Instagram, X/Twitter, LinkedIn, and Facebook. Every preset uses platform-recommended dimensions for optimal display.

All resizing happens in your browser — no image data is sent to any server. The high-quality downsampling algorithm ensures sharp results even at smaller sizes.`,
    faqs: [
      { q: "Can I resize without losing quality?", a: "Downscaling preserves quality well. Upscaling beyond the original resolution may introduce softness. We recommend resizing to smaller or equal dimensions." },
      { q: "Can I resize to social media dimensions?", a: "Yes. pixlite includes presets for Instagram, X/Twitter, LinkedIn, Facebook, and common web sizes. One click applies the correct dimensions." },
      { q: "Does resizing change the file format?", a: "Not automatically. You can choose to resize and convert format simultaneously, or keep the original format." },
    ],
  },
};

export function generateStaticParams() {
  return Object.keys(toolsConfig).map((tool) => ({ tool }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tool: string }>;
}): Promise<Metadata> {
  const { tool } = await params;
  const config = toolsConfig[tool];
  if (!config) return {};
  return {
    title: config.title,
    description: config.metaDescription,
  };
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ tool: string }>;
}) {
  const { tool } = await params;
  const config = toolsConfig[tool];

  if (!config) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-16 text-center">
        <h1 className="font-brand text-4xl text-text-primary">Tool Not Found</h1>
        <p className="text-sm text-text-muted mt-2">
          <Link href="/" className="text-accent-brand hover:underline">Return home</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-12 lg:py-16">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-brand text-4xl sm:text-5xl tracking-wide text-text-primary mb-3">
          {config.h1}
        </h1>
        <p className="text-sm text-text-muted mb-6">{config.description}</p>
        <Link
          href="/app"
          className="inline-flex items-center gap-2 bg-accent-brand text-white px-6 py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-accent-brand/90 transition-colors"
        >
          Open Tool — Free
        </Link>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto mb-16">
        {config.copy.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-sm text-text-muted leading-relaxed mb-4">
            {paragraph}
          </p>
        ))}
      </div>

      {/* FAQs */}
      <div className="max-w-2xl mx-auto">
        <h2 className="font-brand text-2xl tracking-wide text-text-primary mb-6">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <div className="space-y-4">
          {config.faqs.map((faq, i) => (
            <div key={i} className="p-4 rounded-xl bg-bg-surface border border-border-default">
              <h3 className="text-sm font-bold text-text-primary mb-1.5">{faq.q}</h3>
              <p className="text-xs text-text-muted leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center mt-12 pt-8 border-t border-border-default">
        <Link
          href="/app"
          className="inline-flex items-center gap-2 bg-accent-brand text-white px-6 py-3 rounded-md text-sm font-bold uppercase tracking-wider hover:bg-accent-brand/90 transition-colors"
        >
          Start Optimizing — Free Forever
        </Link>
      </div>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `pixlite — ${config.h1}`,
            url: `https://pixlite.io/tools/${tool}`,
            applicationCategory: "MultimediaApplication",
            operatingSystem: "Web Browser",
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
          }),
        }}
      />
    </div>
  );
}
