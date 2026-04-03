import Image from "next/image";
import { AnalyticsLink } from "@/components/AnalyticsLink";
import { LocalizedDate } from "@/components/LocalizedTime";
import { SectionReveal } from "@/components/SectionReveal";
import { PUBLIC_WEB_EVENTS } from "@/lib/analytics/public-web";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { Language } from "@/lib/i18n/config";
import type { HomeFeaturedCopy, HomeFeaturedJourney } from "./home.helpers";
import styles from "./page.module.scss";

type HomeFeaturedJourneysProps = {
  lang: Language;
  content: HomeFeaturedCopy;
  journeys: HomeFeaturedJourney[];
};

export function HomeFeaturedJourneys({
  lang,
  content,
  journeys,
}: HomeFeaturedJourneysProps) {
  return (
    <section className={styles.featuredSection} aria-labelledby="home-featured-title">
      <SectionReveal className={styles.sectionHeader}>
        <div className={styles.sectionHeaderCopy}>
          <h2 id="home-featured-title" className={styles.sectionTitle}>
            {content.featuredTitle}
          </h2>
        </div>
        <AnalyticsLink
          lang={lang}
          href={`/${lang}/journeys`}
          className={styles.archiveLink}
          analyticsEvent={PUBLIC_WEB_EVENTS.navigationLinkClick}
          analyticsParams={{
            surface: "home_featured",
            link_id: "view_all_journeys",
            link_kind: "archive",
          }}
        >
          {content.featuredArchiveCta}
        </AnalyticsLink>
      </SectionReveal>

      {journeys.length > 0 ? (
        <div className={styles.featuredGrid}>
          {journeys.map((journey, index) => {
            const imageSrc =
              journey.coverUrl || "/images/placeholders/journey-cover-fallback.svg";

            return (
              <SectionReveal
                key={journey.publicId}
                className={styles.featuredCard}
                variant="item"
                staggerIndex={index}
              >
                <AnalyticsLink
                  lang={lang}
                  href={journey.href}
                  className={styles.featuredCardLink}
                  analyticsEvent={PUBLIC_WEB_EVENTS.featuredJourneyClick}
                  analyticsParams={{
                    surface: "home_featured",
                    journey_id: journey.publicId,
                    card_index: index + 1,
                  }}
                >
                  <div className={styles.featuredCardMedia}>
                    <Image
                      src={imageSrc}
                      alt={journey.title}
                      fill
                      sizes="(max-width: 739px) 100vw, (max-width: 1099px) 50vw, 33vw"
                      unoptimized={shouldBypassImageOptimization(imageSrc)}
                      className={styles.featuredCardImage}
                    />
                  </div>
                  <div className={styles.featuredCardBody}>
                    <div className={styles.featuredCardMeta}>
                      {journey.publishedAt ? (
                        <LocalizedDate lang={lang} timestamp={Date.parse(journey.publishedAt)} />
                      ) : null}
                      <span>{journey.authorName}</span>
                    </div>
                    <h3 className={styles.featuredCardTitle}>{journey.title}</h3>
                    <p className={styles.featuredCardDescription}>{journey.description}</p>
                    <div className={styles.featuredCardFooter}>
                      <span>
                        {journey.photoCount} {content.photoCountLabel}
                      </span>
                    </div>
                  </div>
                </AnalyticsLink>
              </SectionReveal>
            );
          })}
        </div>
      ) : (
        <SectionReveal delay={80}>
          <p className={styles.featuredEmpty}>{content.emptyJourneys}</p>
        </SectionReveal>
      )}
    </section>
  );
}
