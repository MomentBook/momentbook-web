import Image from "next/image";
import type { InstallLandingContent } from "@/lib/install-landing";
import { InstallSectionHeader } from "./InstallSectionHeader";
import styles from "./install.module.scss";

type InstallSampleTripSectionProps = {
  content: InstallLandingContent;
};

export function InstallSampleTripSection({ content }: InstallSampleTripSectionProps) {
  return (
    <section id="sample-trip" className={styles.section}>
      <InstallSectionHeader
        eyebrow={content.sectionSampleLabel}
        title={content.sample.sectionTitle}
        lead={content.sample.sectionLead}
      />

      <div className={styles.sampleLayout}>
        <div className={styles.samplePreview}>
          <div className={styles.samplePreviewHeader}>
            <span className={styles.samplePreviewLabel}>{content.timelineViewLabel}</span>
            <strong className={styles.samplePreviewCity}>{content.sample.city}</strong>
          </div>
          <div className={styles.sampleScreenshotCard}>
            <Image
              src={content.sampleTimelineScreenshotSrc}
              alt=""
              aria-hidden="true"
              fill
              loading="lazy"
              sizes="(max-width: 819px) 100vw, 28rem"
              className={styles.sampleScreenshot}
            />
          </div>
        </div>

        <div className={styles.sampleDayList}>
          {content.sample.days.map((day) => (
            <article key={`${content.sample.key}-${day.dayLabel}-${day.title}`} className={styles.sampleDayCard}>
              <p className={styles.sampleDayLabel}>{day.dayLabel}</p>
              <h3 className={styles.sampleDayTitle}>{day.title}</h3>
              <p className={styles.sampleDayNote}>{day.note}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
