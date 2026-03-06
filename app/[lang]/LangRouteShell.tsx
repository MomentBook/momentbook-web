"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./layout.module.scss";
import { MomentBookLogo } from "@/components/MomentBookLogo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { MobileMenu } from "@/components/MobileMenu";
import { LanguagePreferenceSync } from "@/components/LanguagePreferenceSync";
import { ScrollHeader } from "@/components/ScrollHeader";
import { type Dictionary } from "@/lib/i18n/dictionaries/en";
import { type Language } from "@/lib/i18n/config";

type LangRouteShellProps = {
  children: React.ReactNode;
  lang: Language;
  dict: Dictionary;
  journeysNavLabel: string;
  supportEmail: string;
  storeLinks: {
    ios: string;
    android: string;
  };
};

export function LangRouteShell({
  children,
  lang,
  dict,
  journeysNavLabel,
  supportEmail,
  storeLinks,
}: LangRouteShellProps) {
  const pathname = usePathname();
  const isInstallLanding = pathname === `/${lang}/install`;

  if (isInstallLanding) {
    return (
      <>
        <LanguagePreferenceSync currentLang={lang} />
        <main className={styles.installMain}>{children}</main>
      </>
    );
  }

  return (
    <>
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

          <div className={styles.desktopNav}>
            <Link href={`/${lang}/faq`} className={styles.navLink}>
              {dict.nav.faq}
            </Link>
            <Link href={`/${lang}/download`} className={styles.navLink}>
              {dict.nav.download}
            </Link>
          </div>

          <div className={styles.controls}>
            <Link href={`/${lang}/journeys`} className={styles.journeysLink}>
              {journeysNavLabel}
            </Link>
            <div className={styles.desktopPrefs}>
              <LanguageDropdown currentLang={lang} variant="compact" />
              <ThemeToggle variant="icon" />
            </div>
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
                      rel="noopener noreferrer"
                    >
                      App Store
                    </a>
                  </li>
                  <li>
                    <a
                      href={storeLinks.android}
                      className={styles.footerLink}
                      target="_blank"
                      rel="noopener noreferrer"
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
                    <a href={`mailto:${supportEmail}`} className={styles.footerLink}>
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
    </>
  );
}
