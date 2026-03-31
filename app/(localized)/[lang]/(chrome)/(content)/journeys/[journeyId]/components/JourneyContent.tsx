import type { Language } from "@/lib/i18n/config";
import type { LanguageDisplayInfo } from "@/lib/i18n/language-display";
import { SectionReveal } from "@/components/SectionReveal";
import type { LocalDateTimeContext } from "@/lib/local-time-context";
import type { PublishedJourneyApi } from "@/lib/published-journey";
import type { JourneyLabels } from "../labels";
import styles from "./JourneyContent.module.scss";
import { JourneyArchiveSection } from "./JourneyArchiveSection";
import { JourneyHero } from "./JourneyHero";
import {
    buildJourneyArchivePhotos,
    buildJourneyClusterSections,
    buildJourneyHeroImage,
} from "./journey-content.helpers";
import { JourneyMomentsSection } from "./JourneyMomentsSection";

type JourneyContentProps = {
    journey: PublishedJourneyApi;
    photoImageMap: Map<string, string>;
    lang: Language;
    labels: JourneyLabels;
    authorName: string | null;
    locationSummary: string | null;
    sourceLanguage: LanguageDisplayInfo | null;
    publishedTimestamp: number | null;
    periodStart: number | null;
    periodEnd: number | null;
    periodStartLocal?: LocalDateTimeContext | null;
    periodEndLocal?: LocalDateTimeContext | null;
};

export default function JourneyContent({
    journey,
    photoImageMap,
    lang,
    labels,
    authorName,
    locationSummary,
    sourceLanguage,
    publishedTimestamp,
    periodStart,
    periodEnd,
    periodStartLocal,
    periodEndLocal,
}: JourneyContentProps) {
    const heroImage = buildJourneyHeroImage(
        journey.images,
        journey.title,
        journey.thumbnailUrl,
    );
    const archivePhotos = buildJourneyArchivePhotos(
        journey.images,
        journey.title,
        labels.locationFallback,
    );
    const clusterSections = buildJourneyClusterSections(
        journey,
        photoImageMap,
        lang,
        labels.locationFallback,
    );
    const hasClusters = clusterSections.length > 0;
    const photoCount = journey.photoCount > 0 ? journey.photoCount : journey.images.length;

    return (
        <article className={styles.shell}>
            <SectionReveal>
                <JourneyHero
                    journey={journey}
                    heroImage={heroImage}
                    lang={lang}
                    labels={labels}
                    authorName={authorName}
                    locationSummary={locationSummary}
                    sourceLanguage={sourceLanguage}
                    publishedTimestamp={publishedTimestamp}
                    periodStart={periodStart}
                    periodEnd={periodEnd}
                    periodStartLocal={periodStartLocal}
                    periodEndLocal={periodEndLocal}
                    photoCount={photoCount}
                />
            </SectionReveal>

            {hasClusters ? (
                <JourneyMomentsSection
                    lang={lang}
                    labels={labels}
                    sections={clusterSections}
                />
            ) : (
                <JourneyArchiveSection
                    lang={lang}
                    labels={labels}
                    photos={archivePhotos}
                />
            )}
        </article>
    );
}
