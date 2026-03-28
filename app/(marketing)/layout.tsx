import Link from "next/link";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-bg-base">
      {/* Marketing Header */}
      <header className="border-b border-border-default">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between px-6 h-14">
          <Link href="/" className="font-brand text-2xl tracking-wide text-text-primary hover:text-accent-brand transition-colors">
            PIXLITE
          </Link>
          <nav className="hidden sm:flex items-center gap-6">
            <Link href="/presets" className="text-xs font-ui font-semibold uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors">
              Presets
            </Link>
            <Link href="/tools/compress-jpeg" className="text-xs font-ui font-semibold uppercase tracking-wider text-text-muted hover:text-text-primary transition-colors">
              Tools
            </Link>
          </nav>
          <Link
            href="/app"
            className="bg-accent-brand text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-md hover:bg-accent-brand/90 transition-colors"
          >
            Open App
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border-default">
        <div className="max-w-[1400px] mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-brand text-lg text-text-muted">PIXLITE</span>
              <span className="text-xs text-text-ghost">Free forever. No login. 100% private.</span>
            </div>
            <nav className="flex items-center gap-4 text-xs text-text-muted">
              <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-text-primary transition-colors">Terms</Link>
              <Link href="/presets" className="hover:text-text-primary transition-colors">Presets</Link>
            </nav>
          </div>
          <div className="mt-4 text-center text-[10px] text-text-ghost">
            &copy; {new Date().getFullYear()} pixlite.io — All images processed locally in your browser.
          </div>
        </div>
      </footer>
    </div>
  );
}
