import type { Language } from "@/lib/i18n/config";
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
    publishedTimestamp: number | null;
    periodStart: number | null;
    periodEnd: number | null;
};

export default function JourneyContent({
    journey,
    photoImageMap,
    lang,
    labels,
    authorName,
    publishedTimestamp,
    periodStart,
    periodEnd,
}: JourneyContentProps) {
    const heroImage = buildJourneyHeroImage(journey.images, journey.title);
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
            <JourneyHero
                journey={journey}
                heroImage={heroImage}
                lang={lang}
                labels={labels}
                authorName={authorName}
                publishedTimestamp={publishedTimestamp}
                periodStart={periodStart}
                periodEnd={periodEnd}
                photoCount={photoCount}
            />

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
