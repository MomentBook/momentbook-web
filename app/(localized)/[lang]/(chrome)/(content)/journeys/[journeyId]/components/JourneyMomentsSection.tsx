import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/SectionReveal";
import { LocalizedDateTimeRange } from "@/components/LocalizedTime";
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
            key={section.cluster.clusterId}
            className={styles.momentListItem}
          >
            <SectionReveal variant="item" delay={110} staggerIndex={index}>
              <Link
                href={section.href}
                className={styles.momentCard}
              >
                <div className={styles.momentThumbFrame}>
                  <div className={styles.momentThumb}>
                    <Image
                      src={section.coverPhoto.url}
                      alt={section.coverPhoto.alt}
                      fill
                      sizes="(max-width: 899px) 100vw, 52vw"
                      className={styles.photoImage}
                    />
                  </div>
                </div>

                <div className={styles.momentCardBody}>
                  <div className={styles.momentCardTop}>
                    <span className={styles.momentIndex}>
                      {labels.momentLabel} {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={styles.momentChevron}
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </div>

                  <h3 className={styles.momentTitle}>
                    {section.cluster.locationName ||
                      labels.locationFallback}
                  </h3>

                  {section.cluster.impression ? (
                    <p className={styles.momentExcerpt}>
                      {section.cluster.impression}
                    </p>
                  ) : null}

                  <div className={styles.momentMeta}>
                    <LocalizedDateTimeRange
                      lang={lang}
                      start={section.cluster.time.startAt}
                      end={section.cluster.time.endAt}
                      fallback="—"
                    />
                    <span>
                      {section.cluster.photoIds.length}{" "}
                      {labels.photoCount}
                    </span>
                  </div>
                </div>
              </Link>
            </SectionReveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
