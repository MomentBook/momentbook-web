import Image from "next/image";
import Link from "next/link";
import { LocalizedDate } from "@/components/LocalizedTime";
import { Reveal } from "@/components/Reveal";
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
      <Reveal
        delay={0}
        duration={760}
        distance={8}
        className={styles.sectionHeader}
      >
        <div className={styles.sectionHeaderCopy}>
          <h2 id="home-featured-title" className={styles.sectionTitle}>
            {content.featuredTitle}
          </h2>
        </div>
        <Link href={`/${lang}/journeys`} className={styles.archiveLink}>
          {content.featuredArchiveCta}
        </Link>
      </Reveal>

      {journeys.length > 0 ? (
        <div className={styles.featuredGrid}>
          {journeys.map((journey, index) => (
            <Reveal
              key={journey.publicId}
              delay={index * 70}
              duration={820}
              distance={8}
              className={styles.featuredCard}
            >
              <Link href={journey.href} className={styles.featuredCardLink}>
                <div className={styles.featuredCardMedia}>
                  <Image
                    src={journey.coverUrl || "/images/placeholders/journey-cover-fallback.svg"}
                    alt={journey.title}
                    fill
                    sizes="(max-width: 739px) 100vw, (max-width: 1099px) 50vw, 33vw"
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
              </Link>
            </Reveal>
          ))}
        </div>
      ) : (
        <Reveal delay={80} duration={760} distance={8}>
          <p className={styles.featuredEmpty}>{content.emptyJourneys}</p>
        </Reveal>
      )}
    </section>
  );
}
