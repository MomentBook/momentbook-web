import Image from "next/image";
import { Reveal } from "@/components/Reveal";
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
        <Reveal
          delay={0}
          duration={820}
          distance={8}
          className={styles.downloadHeroCopy}
        >
          <div className={styles.downloadCopyBlock}>
            <h2 id="download-title" className={styles.downloadHeroTitle}>
              {narrative.title}
            </h2>
            <p className={styles.downloadHeroLead}>{narrative.lead}</p>

            <div className={styles.downloadStoreButtons}>
              <a
                href={storeLinks.ios}
                className={styles.downloadStoreButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={content.iosName}
              >
                <Image
                  src="/images/download/app-store-button.webp"
                  alt={content.iosName}
                  width={635}
                  height={200}
                  className={styles.downloadStoreBadge}
                />
              </a>
              <a
                href={storeLinks.android}
                className={styles.downloadStoreButton}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={content.androidName}
              >
                <Image
                  src="/images/download/google-play-button.webp"
                  alt={content.androidName}
                  width={636}
                  height={200}
                  className={styles.downloadStoreBadge}
                />
              </a>
            </div>

            <p className={styles.downloadAvailability}>{content.availability}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
