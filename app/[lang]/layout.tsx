import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import styles from "./layout.module.scss";
import { MomentBookLogo } from "@/components/MomentBookLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HeaderProfileMenu } from "@/components/HeaderProfileMenu";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { MobileMenu } from "@/components/MobileMenu";
import { LanguagePreferenceSync } from "@/components/LanguagePreferenceSync";
import { ScrollHeader } from "@/components/ScrollHeader";
import {
  getStoreRegion,
  languageList,
  toOpenGraphLocale,
  type Language,
} from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildNoIndexRobots } from "@/lib/seo/public-metadata";

const suit = localFont({
  variable: "--font-suit",
  display: "swap",
  src: [
    { path: "../../public/fonts/suit/SUIT-Thin.woff2", weight: "100", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-ExtraLight.woff2", weight: "200", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-Bold.woff2", weight: "700", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-ExtraBold.woff2", weight: "800", style: "normal" },
    { path: "../../public/fonts/suit/SUIT-Heavy.woff2", weight: "900", style: "normal" },
  ],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@momentbook.app";
const iosPath = "app/momentbook-%EC%97%AC%ED%96%89-%EA%B8%B0%EB%A1%9D/id6749165889";
const journeysNavLabelMap: Record<Language, string> = {
  en: "Journeys",
  ko: "여정",
  ja: "旅",
  zh: "行程",
  es: "Viajes",
  pt: "Jornadas",
  fr: "Voyages",
  th: "ทริป",
  vi: "Hanh trinh",
};

function getStoreLinks(lang: Language) {
  const region = getStoreRegion(lang);

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
    robots: buildNoIndexRobots(),
    openGraph: {
      type: "website",
      locale: toOpenGraphLocale(lang),
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
  const journeysNavLabel = journeysNavLabelMap[lang] ?? journeysNavLabelMap.en;

  return (
    <div className={suit.variable}>
        <LanguagePreferenceSync currentLang={lang} />
        <ScrollHeader className={styles.header}>
          <nav className={styles.nav}>
            <Link href={`/${lang}`} className={styles.logo}>
              <MomentBookLogo
                className={styles.logoMark}
                iconClassName={styles.logoIcon}
                wordmarkClassName={styles.logoWordmark}
              />
            </Link>

            {/* Desktop Navigation */}
            <div className={styles.desktopNav}>
              <Link href={`/${lang}/about`} className={styles.navLink}>
                {dict.nav.about}
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
              <Link href={`/${lang}/journeys`} className={styles.journeysLink}>
                {journeysNavLabel}
              </Link>
              <div className={styles.desktopPrefs}>
                <LanguageDropdown currentLang={lang} variant="compact" />
                <ThemeToggle variant="icon" />
              </div>
              <HeaderProfileMenu lang={lang} />
              <MobileMenu lang={lang} dict={dict} journeysLabel={journeysNavLabel} />
            </div>
          </nav>
        </ScrollHeader>

        <main className={styles.main}>{children}</main>

        <footer className={styles.footer}>
          <div className={styles.footerContainer}>
            <div className={styles.footerTop}>
              <div className={styles.footerBrand}>
                <Link href={`/${lang}`} className={styles.footerLogo}>
                  <MomentBookLogo
                    className={styles.logoMark}
                    iconClassName={styles.logoIcon}
                    wordmarkClassName={styles.logoWordmark}
                  />
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
    </div>
  );
}
