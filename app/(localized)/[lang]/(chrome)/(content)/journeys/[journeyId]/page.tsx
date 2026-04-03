import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./journey.module.scss";
import { type Language, toLocaleTag } from "@/lib/i18n/config";
import { getLanguageDisplayInfo } from "@/lib/i18n/language-display";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { fetchPublishedJourneyResult } from "@/lib/published-journey";
import { fetchPublicUser } from "@/lib/public-users";
import { resolveJourneyPeriodRange } from "@/lib/journey-period";
import JourneyContent from "./components/JourneyContent";
import {
    journeyLabels,
    buildJourneyDescription,
    resolveJourneyUnavailableCopy,
} from "./labels";
import {
    getUniqueJourneyLocations,
} from "./utils";
import {
    buildNoIndexRobots,
    buildOpenGraphArticleTags,
    buildOpenGraphBase,
    buildPublicKeywords,
    buildPublicRobots,
    buildSeoTitle,
    buildStructuredDataKeywordValue,
    buildSeoDescription,
} from "@/lib/seo/public-metadata";
import { buildSocialImageMetadata } from "@/lib/seo/social-image";
import {
    buildPublisherOrganizationJsonLd,
    buildStructuredDataUrl,
    resolveStructuredDataSiteUrl,
    serializeJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { getJourneyPageLabels } from "../journeys-page.helpers";

export const revalidate = 300;

const journeyNotFoundTitleByLanguage: Record<Language, string> = {
    en: "Journey not found",
    ko: "여정을 찾을 수 없습니다",
    ja: "旅が見つかりません",
    zh: "找不到旅程",
    es: "No se encontró el viaje",
    pt: "Viagem não encontrada",
    fr: "Voyage introuvable",
    th: "ไม่พบทริป",
    vi: "Không tìm thấy hành trình",
};

function readAuthorName(value: string | null | undefined): string | null {
    if (typeof value !== "string") {
        return null;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function buildVisibleJourneyTopics(hashtags: string[]): Array<{ "@type": "DefinedTerm"; name: string }> {
    return hashtags
        .map((tag) => tag.replace(/^#+/, "").trim())
        .filter((tag) => tag.length > 0)
        .slice(0, 8)
        .map((tag) => ({
            "@type": "DefinedTerm" as const,
            name: tag,
        }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; journeyId: string }>;
}): Promise<Metadata> {
    const { lang, journeyId } = (await params) as {
        lang: Language;
        journeyId: string;
    };
    const result = await fetchPublishedJourneyResult(journeyId, lang);

    if (result.status === "hidden") {
        const hiddenNotice = resolveJourneyUnavailableCopy(
            lang,
            result.data,
            result.message,
        );
        return {
            title: hiddenNotice.title,
            description: hiddenNotice.message,
            alternates: buildAlternates(lang, `/journeys/${journeyId}`),
            robots: buildNoIndexRobots(),
        };
    }

    const journey = result.data;
    if (!journey) {
        return {
            title: journeyNotFoundTitleByLanguage[lang],
        };
    }

    const path = `/journeys/${journey.publicId}`;
    const locations = getUniqueJourneyLocations(journey);
    const author = await fetchPublicUser(journey.userId);
    const authorName = readAuthorName(author?.name);
    const description = buildSeoDescription([
        journey.description,
        buildJourneyDescription(lang, locations, journey.photoCount),
    ]);
    const title = buildSeoTitle([
        journey.title,
        locations[0] ?? null,
    ]);
    const keywords = buildPublicKeywords({
        lang,
        kind: "journey",
        title,
        locationNames: locations,
        authorName,
        hashtags: journey.hashtags,
        extra: [journeyLabels[lang]?.eyebrow ?? journeyLabels.en.eyebrow],
    });
    const images = buildSocialImageMetadata(
        {
            kind: "journey",
            lang,
            journeyId: journey.publicId,
        },
        title,
    );

    return {
        title,
        description,
        keywords,
        applicationName: "MomentBook",
        ...(authorName
            ? {
                  authors: [
                      {
                          name: authorName,
                          url: `/${lang}/users/${journey.userId}`,
                      },
                  ],
              }
            : {}),
        creator: "MomentBook",
        publisher: "MomentBook",
        robots: buildPublicRobots(),
        alternates: buildAlternates(lang, path),
        openGraph: {
            ...buildOpenGraphBase(lang, path),
            title,
            description,
            type: "article",
            images,
            publishedTime: journey.publishedAt,
            modifiedTime: journey.publishedAt,
            ...(authorName ? { authors: [authorName] } : {}),
            section: journeyLabels[lang]?.eyebrow ?? journeyLabels.en.eyebrow,
            tags: buildOpenGraphArticleTags(keywords),
        },
        twitter: {
            card: "summary_large_image",
            title: journey.title,
            description,
            images: images?.map((img) => img.url),
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
    const result = await fetchPublishedJourneyResult(journeyId, lang);

    if (result.status === "hidden") {
        const hiddenNotice = resolveJourneyUnavailableCopy(
            lang,
            result.data,
            result.message,
        );

        return (
            <div className={styles.page}>
                <section className={styles.hiddenNotice}>
                    <h1 className={styles.hiddenNoticeTitle}>{hiddenNotice.title}</h1>
                    <p className={styles.hiddenNoticeMessage}>{hiddenNotice.message}</p>
                </section>
            </div>
        );
    }

    const journey = result.data;
    if (!journey) {
        notFound();
    }

    const labels = journeyLabels[lang] ?? journeyLabels.en;
    const user = await fetchPublicUser(journey.userId);
    const locations = getUniqueJourneyLocations(journey);
    const locationSummary = locations.length > 0 ? locations.slice(0, 2).join(" · ") : null;
    const sourceLanguage = getLanguageDisplayInfo(
        journey.localizedContent?.sourceLanguage,
        lang,
    );
    const periodRange = resolveJourneyPeriodRange({
        startedAt: journey.startedAt,
        endedAt: journey.endedAt,
        photoSources: [journey.images, journey.clusters],
    });
    const siteUrl = resolveStructuredDataSiteUrl();
    const pageUrl = buildStructuredDataUrl(
        buildOpenGraphUrl(lang, `/journeys/${journey.publicId}`),
        siteUrl,
    );
    const publishedTimestamp = Number.isFinite(Date.parse(journey.publishedAt))
        ? Date.parse(journey.publishedAt)
        : Number.isFinite(Date.parse(journey.createdAt))
            ? Date.parse(journey.createdAt)
            : null;
    const description = buildSeoDescription([
        journey.description,
        buildJourneyDescription(lang, locations, journey.photoCount),
    ]);
    const title = buildSeoTitle([
        journey.title,
        locations[0] ?? null,
    ]);
    const authorName = readAuthorName(user?.name);
    const keywords = buildPublicKeywords({
        lang,
        kind: "journey",
        title,
        locationNames: locations,
        authorName,
        hashtags: journey.hashtags,
        extra: [labels.eyebrow],
    });
    const keywordValue = buildStructuredDataKeywordValue(keywords);
    const about = [
        ...locations.slice(0, 5).map((location) => ({
            "@type": "Place" as const,
            name: location,
        })),
        ...buildVisibleJourneyTopics(journey.hashtags),
    ];
    const structuredImages = [
        ...(journey.thumbnailUrl ? [journey.thumbnailUrl] : []),
        ...journey.images
            .map((image) => image.url)
            .filter((url) => url !== journey.thumbnailUrl),
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: title,
        description,
        image: structuredImages,
        inLanguage: toLocaleTag(lang),
        ...(keywordValue ? { keywords: keywordValue } : {}),
        datePublished: journey.publishedAt,
        dateModified: journey.publishedAt,
        ...(about.length > 0 ? { about } : {}),
        ...(authorName
            ? {
                  author: {
                      "@type": "Person",
                      name: authorName,
                      url: buildStructuredDataUrl(
                          buildOpenGraphUrl(lang, `/users/${journey.userId}`),
                          siteUrl,
                      ),
                  },
              }
            : {}),
        publisher: buildPublisherOrganizationJsonLd(siteUrl),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": pageUrl,
        },
    };

    const journeyPageLabels = getJourneyPageLabels(lang);
    const breadcrumbJsonLd = buildPageBreadcrumbJsonLd(lang, [
        { name: journeyPageLabels.title, path: `/${lang}/journeys` },
        { name: journey.title || journeyPageLabels.title, path: `/${lang}/journeys/${journey.publicId}` },
    ], siteUrl);

    return (
        <div className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
            />

            <JourneyContent
                journey={journey}
                lang={lang}
                authorName={authorName}
                locationSummary={locationSummary}
                sourceLanguage={sourceLanguage}
                publishedTimestamp={publishedTimestamp}
                periodStart={periodRange.start}
                periodEnd={periodRange.end}
                periodStartLocal={journey.startedAtLocal}
                periodEndLocal={journey.endedAtLocal}
                labels={labels}
            />
        </div>
    );
}
