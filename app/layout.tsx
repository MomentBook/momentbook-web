import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "MomentBook",
    template: "%s | MomentBook",
  },
  description: "An app that quietly remembers your day.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "MomentBook",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="border-b border-zinc-200 dark:border-zinc-800">
          <nav className="max-w-5xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link href="/" className="font-semibold text-lg">
                MomentBook
              </Link>
              <div className="flex gap-6 text-sm">
                <Link href="/about" className="hover:text-zinc-600 dark:hover:text-zinc-400">
                  About
                </Link>
                <Link href="/how-it-works" className="hover:text-zinc-600 dark:hover:text-zinc-400">
                  How It Works
                </Link>
                <Link href="/faq" className="hover:text-zinc-600 dark:hover:text-zinc-400">
                  FAQ
                </Link>
                <Link href="/download" className="hover:text-zinc-600 dark:hover:text-zinc-400">
                  Download
                </Link>
              </div>
            </div>
          </nav>
        </header>
        <main className="min-h-screen">{children}</main>
        <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
          <div className="max-w-5xl mx-auto px-6 py-8">
            <div className="flex flex-col gap-6 text-sm text-zinc-600 dark:text-zinc-400">
              <div className="flex gap-6">
                <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Terms
                </Link>
                <Link href="/support" className="hover:text-zinc-900 dark:hover:text-zinc-100">
                  Support
                </Link>
              </div>
              <p className="text-xs">
                MomentBook is an app that quietly remembers your day.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
