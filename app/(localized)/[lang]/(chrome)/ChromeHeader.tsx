import Link from "next/link";
import { DownloadActionButton } from "@/components/DownloadActionButton";
import { LanguageDropdown } from "@/components/LanguageDropdown";
import { MobileMenu } from "@/components/MobileMenu";
import { MomentBookLogo } from "@/components/MomentBookLogo";
import { ScrollHeader } from "@/components/ScrollHeader";
import { ThemeToggle } from "@/components/ThemeToggle";
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

        <div className={styles.desktopNav}>
          <Link
            href={`/${lang}/journeys`}
            className={styles.navLink}
          >
            {journeysLabel}
          </Link>
          <DownloadActionButton
            lang={lang}
            className={styles.navAction}
            analyticsSurface="header"
          >
            {dict.nav.download}
          </DownloadActionButton>
        </div>

        <div className={styles.controls}>
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
