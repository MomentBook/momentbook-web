import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "../globals.scss";
import styles from "./layout.module.scss";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { languageList, type Language, languages } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";

// Generate static params for all supported languages
export async function generateStaticParams() {
  return languageList.map((lang) => ({ lang }));
}

// Generate metadata based on language
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: "MomentBook",
      template: "%s | MomentBook",
    },
    description: "An app that quietly remembers your day.",
    openGraph: {
      type: "website",
      locale: lang === "en" ? "en_US" : lang === "ko" ? "ko_KR" : lang === "zh" ? "zh_CN" : "ja_JP",
      siteName: "MomentBook",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} data-theme="light">
      <head>
        <Script id="theme-script" strategy="beforeInteractive">
          {`
            (function() {
              const stored = localStorage.getItem('theme');
              const theme = (stored === 'light' || stored === 'dark') ? stored : 'light';
              document.documentElement.setAttribute('data-theme', theme);
            })();
          `}
        </Script>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link href={`/${lang}`} className={styles.logo}>
              MomentBook
            </Link>
            <div className={styles.navLinks}>
              <Link href={`/${lang}/about`} className={styles.navLink}>
                {dict.nav.about}
              </Link>
              <Link href={`/${lang}/how-it-works`} className={styles.navLink}>
                {dict.nav.howItWorks}
              </Link>
              <Link href={`/${lang}/faq`} className={styles.navLink}>
                {dict.nav.faq}
              </Link>
              <Link href={`/${lang}/download`} className={styles.navLink}>
                {dict.nav.download}
              </Link>
              <LanguageSwitcher currentLang={lang} />
              <ThemeToggle />
            </div>
          </nav>
        </header>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.footerContent}>
              <nav className={styles.footerLinks}>
                <Link href={`/${lang}/privacy`} className={styles.footerLink}>
                  {dict.footer.links.privacy}
                </Link>
                <Link href={`/${lang}/terms`} className={styles.footerLink}>
                  {dict.footer.links.terms}
                </Link>
                <Link href={`/${lang}/community-guidelines`} className={styles.footerLink}>
                  {dict.footer.links.communityGuidelines}
                </Link>
                <Link href={`/${lang}/marketing-consent`} className={styles.footerLink}>
                  {dict.footer.links.marketingConsent}
                </Link>
                <Link href={`/${lang}/support`} className={styles.footerLink}>
                  {dict.footer.links.support}
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
