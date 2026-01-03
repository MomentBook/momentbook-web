import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.scss";
import styles from "./layout.module.scss";

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
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link href="/" className={styles.logo}>
              MomentBook
            </Link>
            <div className={styles.navLinks}>
              <Link href="/about" className={styles.navLink}>
                About
              </Link>
              <Link href="/how-it-works" className={styles.navLink}>
                How It Works
              </Link>
              <Link href="/faq" className={styles.navLink}>
                FAQ
              </Link>
              <Link href="/download" className={styles.navLink}>
                Download
              </Link>
            </div>
          </nav>
        </header>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.footerContent}>
              <nav className={styles.footerLinks}>
                <Link href="/privacy" className={styles.footerLink}>
                  Privacy
                </Link>
                <Link href="/terms" className={styles.footerLink}>
                  Terms
                </Link>
                <Link href="/support" className={styles.footerLink}>
                  Support
                </Link>
              </nav>
              <p className={styles.footerText}>
                MomentBook is an app that quietly remembers your day.
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
