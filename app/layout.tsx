import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "pixlite — Free Online Image Optimizer",
    template: "%s | pixlite",
  },
  description:
    "Free browser-based image optimizer. Compress JPEG, PNG, WebP with real-time preview. No login, no upload, 100% private.",
  keywords: [
    "image optimizer",
    "compress image online",
    "resize image",
    "convert to webp",
    "free image compressor",
  ],
  authors: [{ name: "pixlite" }],
  openGraph: {
    title: "pixlite — Free Online Image Optimizer",
    description:
      "Compress, resize, and convert images instantly in your browser. No login, no upload, 100% private.",
    url: "https://pixlite.io",
    siteName: "pixlite",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "pixlite — Free Online Image Optimizer",
    description:
      "Compress, resize, and convert images instantly in your browser. Free forever.",
  },
  metadataBase: new URL("https://pixlite.io"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${bebasNeue.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-bg-base text-text-primary font-ui antialiased">
        <TooltipProvider>
          {children}
        </TooltipProvider>
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#0E0E0E',
              border: '1px solid #191919',
              color: '#EEEEEE',
            },
          }}
        />
      </body>
    </html>
  );
}
