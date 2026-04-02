import Link from "next/link";
import { AnalyticsLink } from "@/components/AnalyticsLink";
import { DownloadActionButton } from "@/components/DownloadActionButton";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { MobileMenu } from "@/components/MobileMenu";
import { MomentBookLogo } from "@/components/MomentBookLogo";
import { ScrollHeader } from "@/components/ScrollHeader";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PUBLIC_WEB_EVENTS } from "@/lib/analytics/public-web";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { type Language } from "@/lib/i18n/config";
import styles from "./layout.module.scss";

type ChromeDictionary = Awaited<ReturnType<typeof getDictionary>>;

type ChromeHeaderProps = {
  lang: Language;
  dict: ChromeDictionary;
  journeysLabel: string;
};

export function ChromeHeader({
  lang,
  dict,
  journeysLabel,
}: ChromeHeaderProps) {
  return (
    <ScrollHeader className={styles.header}>
      <nav className={styles.nav}>
        <Link href={`/${lang}`} className={styles.logo}>
          <MomentBookLogo
            className={styles.logoMark}
            iconClassName={styles.logoIcon}
            wordmarkClassName={styles.logoWordmark}
            hideIcon
          />
        </Link>

        <div className={styles.controls}>
          <div className={styles.desktopActions}>
            <AnalyticsLink
              lang={lang}
              href={`/${lang}/journeys`}
              className={styles.secondaryAction}
              analyticsEvent={PUBLIC_WEB_EVENTS.navigationLinkClick}
              analyticsParams={{
                surface: "header",
                link_group: "product",
                link_id: "journeys",
                link_kind: "header_cta",
              }}
            >
              {journeysLabel}
            </AnalyticsLink>
          </div>
          <DownloadActionButton
            lang={lang}
            className={styles.navAction}
            analyticsSurface="header"
            mobileLaunchBehavior="launch-directly"
          >
            <svg
              className={styles.navActionIcon}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3v11" />
              <path d="m7 11 5 5 5-5" />
              <path d="M5 21h14" />
            </svg>
            <span className={styles.navActionLabel}>
              {dict.nav.download}
            </span>
          </DownloadActionButton>
          <div className={styles.desktopPrefs}>
            <LanguageDropdown
              currentLang={lang}
              variant="compact"
            />
            <ThemeToggle lang={lang} variant="icon" />
          </div>
          <MobileMenu
            lang={lang}
            dict={dict}
            journeysLabel={journeysLabel}
          />
        </div>
      </nav>
    </ScrollHeader>
  );
}
