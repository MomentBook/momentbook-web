import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./journey.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { fetchPublishedJourney } from "@/lib/published-journey";
import { fetchPublicUser } from "@/lib/public-users";
import JourneyContent from "./components/JourneyContent";
import ReportJourneyButton from "../components/ReportJourneyButton";
import {
    journeyLabels,
    buildJourneyDescription,
} from "./labels";
import {
    formatDateRange,
    formatDuration,
    getUniqueLocations,
    buildImageUrlToPhotoIdMap,
} from "./utils";

export const revalidate = 3600;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; journeyId: string }>;
}): Promise<Metadata> {
    const { lang, journeyId } = (await params) as {
        lang: Language;
        journeyId: string;
    };
    const journey = await fetchPublishedJourney(journeyId);

    if (!journey) {
        return {
            title: "Journey not found",
        };
    }

    const path = `/journeys/${journey.publicId}`;
    const url = buildOpenGraphUrl(lang, path);
    const locations = getUniqueLocations(journey.clusters);
    const description =
        journey.description ||
        buildJourneyDescription(lang, locations, journey.photoCount);

    const images = journey.images.slice(0, 6).map((img) => ({
        url: img.url,
        alt: journey.title,
    }));

    return {
        title: journey.title,
        description,
        alternates: buildAlternates(lang, path),
        openGraph: {
            title: journey.title,
            description,
            type: "article",
            url,
            images,
            publishedTime: journey.publishedAt,
            modifiedTime: journey.publishedAt,
        },
        twitter: {
            card: "summary_large_image",
            title: journey.title,
            description,
            images: images.map((img) => img.url),
        },
    };
}

export default async function JourneyPage({
    params,
}: {
    params: Promise<{ lang: string; journeyId: string }>;
}) {
    const { lang, journeyId } = (await params) as {
        lang: Language;
        journeyId: string;
    };
    const journey = await fetchPublishedJourney(journeyId);

    if (!journey) {
        notFound();
    }

    const labels = journeyLabels[lang] ?? journeyLabels.en;
    const user = await fetchPublicUser(journey.userId);
    const dateRange = formatDateRange(lang, journey.startedAt, journey.endedAt);
    const locations = getUniqueLocations(journey.clusters);
    const totalDuration = journey.clusters.reduce(
        (sum, cluster) => sum + cluster.time.durationMs,
        0,
    );
    const imageMap = buildImageUrlToPhotoIdMap(journey);

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
    const pageUrl = new URL(
        buildOpenGraphUrl(lang, `/journeys/${journey.publicId}`),
        siteUrl,
    ).toString();
    const description =
        journey.description ||
        buildJourneyDescription(lang, locations, journey.photoCount);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: journey.title,
        description,
        image: journey.images.map((img) => img.url),
        datePublished: journey.publishedAt,
        dateModified: journey.publishedAt,
        author: {
            "@type": "Person",
            name: user?.name || "MomentBook User",
            url: new URL(
                buildOpenGraphUrl(lang, `/users/${journey.userId}`),
                siteUrl,
            ).toString(),
        },
        publisher: {
            "@type": "Organization",
            name: "MomentBook",
            url: siteUrl,
            logo: {
                "@type": "ImageObject",
                url: `${siteUrl}/logo.png`,
            },
        },
        mainEntityOfPage: pageUrl,
    };

    return (
        <div className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <header className={styles.hero}>
                <div className={styles.heroTop}>
                    <div className={styles.heroMain}>
                        <p className={styles.eyebrow}>{labels.eyebrow}</p>
                        <h1 className={styles.title}>{journey.title}</h1>
                        {journey.description && (
                            <p className={styles.subtitle}>
                                {journey.description}
                            </p>
                        )}
                    </div>
                    <aside className={styles.heroAside}>
                        <Link
                            href={`/${lang}/users/${journey.userId}`}
                            className={styles.userCard}
                        >
                            {user?.name && (
                                <span className={styles.userHandle}>
                                    {labels.profileLinkLabel}
                                </span>
                            )}
                            <span className={styles.userName}>
                                {user?.name ?? labels.profileLinkLabel}
                            </span>
                        </Link>
                    </aside>
                </div>

                <div className={styles.metaRow}>
                    <span>{dateRange}</span>
                    <span>
                        {journey.photoCount} {labels.photoCount}
                    </span>
                    <span>
                        {locations.length} {labels.locationCount}
                    </span>
                    {totalDuration > 0 && (
                        <span>
                            {formatDuration(totalDuration, labels.hours)}
                        </span>
                    )}
                </div>
            </header>

            <JourneyContent
                journey={journey}
                imageMap={imageMap}
                lang={lang}
                labels={labels}
            />

            <footer className={styles.pageFooter}>
                <ReportJourneyButton
                    publicId={journey.publicId}
                    lang={lang}
                    ownerUserId={journey.userId}
                    variant="quiet"
                />
            </footer>
        </div>
    );
}
