import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "pixlite App — Image Optimizer",
  description: "Compress, resize, and convert images in your browser. Free, private, no login required.",
};

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-base">
      {/* Minimal header — just the wordmark */}
      <header className="flex items-center justify-between px-4 h-12 border-b border-border-default shrink-0">
        <a href="/" className="font-brand text-2xl tracking-wide text-text-primary hover:text-accent-brand transition-colors">
          PIXLITE
        </a>
        <span className="text-[10px] font-mono text-text-ghost uppercase tracking-widest">
          Free Forever
        </span>
      </header>
      <main className="flex-1 flex flex-col">
        {children}
      </main>
    </div>
  );
}
