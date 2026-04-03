import { SectionReveal } from "@/components/SectionReveal";
import { StoreBadgeLink } from "@/components/StoreBadgeLink";
import { getCanonicalStoreLinks } from "@/lib/mobile-app";
import { HOME_SECTION_IDS } from "@/lib/marketing/home-sections";
import { type DownloadCopy } from "@/lib/marketing/download-content";
import { type Language } from "@/lib/i18n/config";
import styles from "./page.module.scss";

export type HomeDownloadNarrativeContent = {
  title: string;
  lead: string;
};

type HomeDownloadSectionProps = {
  lang: Language;
  content: DownloadCopy;
  narrative: HomeDownloadNarrativeContent;
};

export function HomeDownloadSection({ lang, content, narrative }: HomeDownloadSectionProps) {
  const storeLinks = getCanonicalStoreLinks(lang);

  return (
    <section
      id={HOME_SECTION_IDS.download}
      tabIndex={-1}
      className={`${styles.homeSection} ${styles.downloadSection}`}
      aria-labelledby="download-title"
    >
      <div className={styles.downloadHeroInner}>
        <SectionReveal className={styles.downloadHeroCopy}>
          <div className={styles.downloadCopyBlock}>
            <h2 id="download-title" className={styles.downloadHeroTitle}>
              {narrative.title}
            </h2>
            <p className={styles.downloadHeroLead}>{narrative.lead}</p>

            <div className={styles.downloadStoreButtons}>
              <StoreBadgeLink
                lang={lang}
                platform="ios"
                href={storeLinks.ios}
                className={styles.downloadStoreButton}
                imageClassName={styles.downloadStoreBadge}
                openInNewTab
              />
              <StoreBadgeLink
                lang={lang}
                platform="android"
                href={storeLinks.android}
                className={styles.downloadStoreButton}
                imageClassName={styles.downloadStoreBadge}
                openInNewTab
              />
            </div>

            <p className={styles.downloadAvailability}>{content.availability}</p>
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
