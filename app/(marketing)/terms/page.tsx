import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "pixlite terms of service.",
};

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 lg:py-16">
      <h1 className="font-brand text-4xl tracking-wide text-text-primary mb-8">TERMS OF SERVICE</h1>

      <div className="space-y-6 text-sm text-text-muted leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-text-primary mb-2">Acceptance of Terms</h2>
          <p>
            By accessing and using pixlite.io, you agree to be bound by these Terms of Service. If you do not agree, please do not use the service.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text-primary mb-2">Description of Service</h2>
          <p>
            pixlite.io is a free, browser-based image optimization tool. All image processing occurs locally on your device. No images are uploaded to, stored on, or transmitted through our servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text-primary mb-2">User Responsibilities</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>You must have the legal right to process any images you upload</li>
            <li>You are solely responsible for your images and their content</li>
            <li>Do not use the service for any illegal purpose</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text-primary mb-2">No Warranty</h2>
          <p>
            pixlite.io is provided &quot;as is&quot; without any warranty of any kind. We make no guarantees about the availability, accuracy, or quality of the image processing. Processed images are not stored — if you do not download them, they are permanently lost.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text-primary mb-2">Limitation of Liability</h2>
          <p>
            pixlite.io and its creators shall not be liable for any damages arising from the use or inability to use the service, including but not limited to data loss, image quality degradation, or service interruption.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text-primary mb-2">Intellectual Property</h2>
          <p>
            You retain all rights to your images. pixlite does not claim any ownership or rights over images processed using the service. The pixlite brand, logo, and website design are the intellectual property of pixlite.io.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-text-primary mb-2">Changes</h2>
          <p>
            We reserve the right to modify these terms at any time. Continued use of the service constitutes acceptance of any changes.
          </p>
        </section>

        <p className="text-text-ghost text-xs pt-4 border-t border-border-default">
          Last updated: March 2026
        </p>
      </div>
    </div>
  );
}
