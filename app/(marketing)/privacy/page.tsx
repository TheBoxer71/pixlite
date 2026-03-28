import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "pixlite privacy policy. All image processing happens locally in your browser. We collect zero personal data.",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 lg:py-16">
      <h1 className="font-brand text-4xl tracking-wide text-text-primary mb-8">PRIVACY POLICY</h1>

      <div className="space-y-6 text-sm text-text-muted leading-relaxed">
        <div className="p-4 rounded-xl bg-accent-brand/5 border border-accent-brand/10">
          <p className="text-text-primary font-medium">
            pixlite.io processes all images locally in your browser. No image data is ever transmitted to any server, at any time, under any circumstance.
          </p>
        </div>

        <section>
          <h2 className="text-lg font-bold text-text-primary mb-2">What We Don&apos;t Collect</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>No images, thumbnails, or image metadata</li>
            <li>No personal information (name, email, address)</li>
            <li>No user accounts or passwords</li>
            <li>No cookies or tracking pixels</li>
            <li>No IP-based location tracking</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text-primary mb-2">Analytics</h2>
          <p>
            We may use privacy-respecting, cookieless analytics (such as Plausible) to understand aggregate traffic patterns. This data is anonymous and cannot be tied to any individual user. No personal data is collected through analytics.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text-primary mb-2">How Image Processing Works</h2>
          <p>
            When you upload an image to pixlite, the file is read directly by your browser using JavaScript. All compression, resizing, and format conversion happens via client-side APIs (Canvas API / WebAssembly). The processed image exists only in your browser&apos;s memory and is permanently lost when you close the tab or navigate away.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text-primary mb-2">Third-Party Services</h2>
          <p>
            pixlite is hosted on Vercel, which may collect standard server logs (IP address, user agent, timestamps) as part of its infrastructure. We do not access or store this data. See Vercel&apos;s privacy policy for details.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text-primary mb-2">GDPR Compliance</h2>
          <p>
            Because pixlite collects no personal data and sets no cookies, GDPR compliance is achieved by design. There is no data to request, export, or delete because none exists.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text-primary mb-2">Changes</h2>
          <p>
            This privacy policy may be updated from time to time. Any changes will be reflected on this page with an updated date.
          </p>
        </section>

        <p className="text-text-ghost text-xs pt-4 border-t border-border-default">
          Last updated: March 2026
        </p>
      </div>
    </div>
  );
}
