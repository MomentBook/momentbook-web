import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import { LocalizedDateTimeRange } from "@/components/LocalizedTime";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { Language } from "@/lib/i18n/config";
import type { JourneyLabels } from "../labels";
import type { ClusterSection } from "./journey-content.helpers";
import styles from "./JourneyContent.module.scss";

type JourneyMomentsSectionProps = {
  lang: Language;
  labels: JourneyLabels;
  sections: ClusterSection[];
};

export function JourneyMomentsSection({
  lang,
  labels,
  sections,
}: JourneyMomentsSectionProps) {
  function renderMomentMedia(section: ClusterSection) {
    const previewPhotos = section.previewPhotos.slice(0, 3);
    const overflowCount = Math.max(0, section.photoCount - previewPhotos.length);
    const usesMosaic = previewPhotos.length > 1;

    return (
      <div className={styles.momentMediaFrame}>
        <div
          className={
            usesMosaic ? styles.momentMediaGrid : styles.momentMediaSingle
          }
        >
          {previewPhotos.map((photo, index) => (
            <div
              key={photo.key}
              className={[
                styles.momentMediaTile,
                usesMosaic && index === 0 ? styles.momentMediaTilePrimary : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                sizes="(max-width: 899px) 100vw, (max-width: 1199px) 46vw, (max-width: 1439px) 32vw, 28rem"
                unoptimized={shouldBypassImageOptimization(photo.url)}
                className={styles.photoImage}
              />

              {overflowCount > 0 && index === previewPhotos.length - 1 ? (
                <span className={styles.momentMediaOverflow}>
                  +{overflowCount}
                </span>
              ) : null}
            </div>
          ))}
        </div>

        <span className={styles.momentMediaBadge}>
          {section.photoCount} {labels.photoCount}
        </span>
      </div>
    );
  }

  return (
    <section
      className={styles.momentsSection}
      aria-labelledby="journey-moments-title"
    >
      <SectionReveal>
        <div className={styles.sectionIntro}>
          <h2
            id="journey-moments-title"
            className={styles.sectionTitle}
          >
            {labels.momentsTitle}
          </h2>
          <p className={styles.sectionLead}>{labels.momentsLead}</p>
        </div>
      </SectionReveal>

      <ol className={styles.momentList}>
        {sections.map((section, index) => (
          <li
            key={section.key}
            className={styles.momentListItem}
          >
            <SectionReveal variant="item" delay={110} staggerIndex={index}>
              <Link
                href={section.href}
                className={styles.momentCard}
              >
                {renderMomentMedia(section)}

                <div className={styles.momentCardBody}>
                  <div className={styles.momentCardTop}>
                    <span className={styles.momentIndex}>
                      {labels.momentLabel} {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.momentTime}>
                      <LocalizedDateTimeRange
                        lang={lang}
                        start={section.time.startAt}
                        end={section.time.endAt}
                        startContext={section.time.startLocal}
                        endContext={section.time.endLocal}
                        fallback="—"
                      />
                    </span>
                  </div>

                  <h3 className={styles.momentTitle}>{section.title}</h3>

                  {section.impression ? (
                    <p className={styles.momentExcerpt}>
                      {section.impression}
                    </p>
                  ) : null}
                </div>
              </Link>
            </SectionReveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
