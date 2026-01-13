import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import Script from "next/script";
import "../globals.scss";
import styles from "./layout.module.scss";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { MobileMenu } from "@/components/MobileMenu";
import { LanguagePreferenceSync } from "@/components/LanguagePreferenceSync";
import { languageList, type Language } from "@/lib/i18n/config";
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
const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@momentbook.app";
const iosPath = "app/momentbook-%EC%97%AC%ED%96%89-%EA%B8%B0%EB%A1%9D/id6749165889";

const storeRegionMap: Record<Language, { ios: string; hl: string; gl: string }> = {
  en: { ios: "us", hl: "en", gl: "US" },
  ko: { ios: "kr", hl: "ko", gl: "KR" },
  ja: { ios: "jp", hl: "ja", gl: "JP" },
  zh: { ios: "cn", hl: "zh", gl: "CN" },
};

function getStoreLinks(lang: Language) {
  const region = storeRegionMap[lang] ?? storeRegionMap.en;

  return {
    ios: `https://apps.apple.com/${region.ios}/${iosPath}`,
    android: `https://play.google.com/store/apps/details?id=com.reflectalab.momentbook&hl=${region.hl}&gl=${region.gl}`,
  };
}

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
  const storeLinks = getStoreLinks(lang);

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
        <LanguagePreferenceSync currentLang={lang} />
        <header className={styles.header}>
          <nav className={styles.nav}>
            <Link href={`/${lang}`} className={styles.logo}>
              MomentBook
            </Link>

            {/* Desktop Navigation */}
            <div className={styles.desktopNav}>
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
            </div>

            {/* Controls (Language + Theme) */}
            <div className={styles.controls}>
              <LanguageDropdown currentLang={lang} />
              <ThemeToggle />
              <MobileMenu lang={lang} dict={dict} />
            </div>
          </nav>
        </header>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.footerTop}>
              <div className={styles.footerBrand}>
                <Link href={`/${lang}`} className={styles.footerLogo}>
                  MomentBook
                </Link>
                <p className={styles.footerSummary}>{dict.footer.summary}</p>
                <div className={styles.footerActions}>
                  <Link href={`/${lang}/download`} className={styles.footerButton}>
                    {dict.footer.ctaPrimary}
                  </Link>
                  <Link href={`/${lang}/support`} className={styles.footerButtonGhost}>
                    {dict.footer.ctaSecondary}
                  </Link>
                </div>
              </div>

              <div className={styles.footerGrid}>
                <div className={styles.footerColumn}>
                  <h3 className={styles.footerHeading}>{dict.footer.sections.product}</h3>
                  <ul className={styles.footerList}>
                    <li>
                      <Link href={`/${lang}/about`} className={styles.footerLink}>
                        {dict.nav.about}
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${lang}/how-it-works`} className={styles.footerLink}>
                        {dict.nav.howItWorks}
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${lang}/faq`} className={styles.footerLink}>
                        {dict.nav.faq}
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className={styles.footerColumn}>
                  <h3 className={styles.footerHeading}>{dict.footer.sections.download}</h3>
                  <ul className={styles.footerList}>
                    <li>
                      <Link href={`/${lang}/download`} className={styles.footerLink}>
                        {dict.nav.download}
                      </Link>
                    </li>
                    <li>
                      <a
                        href={storeLinks.ios}
                        className={styles.footerLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        App Store
                      </a>
                    </li>
                    <li>
                      <a
                        href={storeLinks.android}
                        className={styles.footerLink}
                        target="_blank"
                        rel="noreferrer"
                      >
                        Google Play
                      </a>
                    </li>
                  </ul>
                </div>

                <div className={styles.footerColumn}>
                  <h3 className={styles.footerHeading}>{dict.footer.sections.support}</h3>
                  <ul className={styles.footerList}>
                    <li>
                      <Link href={`/${lang}/support`} className={styles.footerLink}>
                        {dict.footer.links.support}
                      </Link>
                    </li>
                    <li>
                      <a
                        href={`mailto:${supportEmail}`}
                        className={styles.footerLink}
                      >
                        {dict.footer.email}
                      </a>
                    </li>
                  </ul>
                </div>

                <div className={styles.footerColumn}>
                  <h3 className={styles.footerHeading}>{dict.footer.sections.legal}</h3>
                  <ul className={styles.footerList}>
                    <li>
                      <Link href={`/${lang}/privacy`} className={styles.footerLink}>
                        {dict.footer.links.privacy}
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${lang}/terms`} className={styles.footerLink}>
                        {dict.footer.links.terms}
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${lang}/community-guidelines`} className={styles.footerLink}>
                        {dict.footer.links.communityGuidelines}
                      </Link>
                    </li>
                    <li>
                      <Link href={`/${lang}/marketing-consent`} className={styles.footerLink}>
                        {dict.footer.links.marketingConsent}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.footerBottom}>
              <p className={styles.footerCopyright}>
                {dict.footer.copyright}
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
