import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import { getLocalizedScreenshotPath } from "@/lib/app-screenshots";
import { getCanonicalStoreLinks } from "@/lib/mobile-app";
import { HOME_SECTION_IDS } from "@/lib/marketing/home-sections";
import { type DownloadCopy } from "@/lib/marketing/download-content";
import { type Language } from "@/lib/i18n/config";
import styles from "./page.module.scss";

type HomeDownloadSectionProps = {
  lang: Language;
  content: DownloadCopy;
};

export function HomeDownloadSection({ lang, content }: HomeDownloadSectionProps) {
  const storeLinks = getCanonicalStoreLinks(lang);
  const introScreenshot = getLocalizedScreenshotPath(lang, "intro");
  const timelineScreenshot = getLocalizedScreenshotPath(lang, "timeline");

  return (
    <section
      id={HOME_SECTION_IDS.download}
      tabIndex={-1}
      className={`${styles.homeSection} ${styles.downloadSection}`}
      aria-labelledby="download-title"
    >
      <div className={styles.downloadHeroInner}>
        <FadeIn delay={120} className={styles.downloadHeroCopy}>
          <div>
            <h2 id="download-title" className={styles.downloadHeroTitle}>
              {content.title}
            </h2>

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
        </FadeIn>

        <FadeIn delay={180} className={styles.downloadVisual}>
          <div className={styles.downloadVisualCanvas} aria-hidden="true">
            <div className={`${styles.downloadVisualCard} ${styles.downloadVisualPrimary}`}>
              <Image
                src={introScreenshot}
                alt=""
                fill
                sizes="(max-width: 979px) 12rem, 15rem"
                className={styles.downloadVisualImage}
              />
            </div>
            <div className={`${styles.downloadVisualCard} ${styles.downloadVisualSecondary}`}>
              <Image
                src={timelineScreenshot}
                alt=""
                fill
                sizes="(max-width: 979px) 10rem, 13rem"
                className={styles.downloadVisualImage}
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
