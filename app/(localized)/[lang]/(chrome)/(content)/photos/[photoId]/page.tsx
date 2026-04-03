import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./photo.module.scss";
import { type Language, toLocaleTag } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
    fetchPublishedPhoto,
} from "@/lib/published-journey";
import {
    buildOpenGraphArticleTags,
    buildOpenGraphBase,
    buildPublicKeywords,
    buildPublicRobots,
    buildStructuredDataKeywordValue,
} from "@/lib/seo/public-metadata";
import { buildSocialImageMetadata } from "@/lib/seo/social-image";
import {
    buildPublisherOrganizationJsonLd,
    buildStructuredDataUrl,
    resolveStructuredDataSiteUrl,
    serializeJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { getJourneyPageLabels } from "../../journeys/journeys-page.helpers";
import { PhotoContent } from "./PhotoContent";
import {
    buildPhotoDisplayState,
    hasValidTimestamp,
    photoCopy,
    photoNotFoundTitleByLanguage,
} from "./photo.helpers";

export const revalidate = 14400;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; photoId: string }>;
}): Promise<Metadata> {
    const { lang, photoId } = (await params) as {
        lang: Language;
        photoId: string;
    };
    const photo = await fetchPublishedPhoto(photoId, lang);
    const copy = photoCopy[lang] ?? photoCopy.en;

    if (!photo) {
        return {
            title: photoNotFoundTitleByLanguage[lang],
        };
    }

    const display = buildPhotoDisplayState(copy, photo);
    const path = `/photos/${photo.photoId}`;
    const takenAt = hasValidTimestamp(photo.takenAt) ? photo.takenAt : null;
    const publishedTime =
        takenAt !== null
            ? new Date(takenAt).toISOString()
            : undefined;
    const keywords = buildPublicKeywords({
        lang,
        kind: "photo",
        title: display.title,
        locationNames: display.locationName ? [display.locationName] : [],
        extra: display.journeyTitle ? [display.journeyTitle] : [],
    });
    const socialImages = buildSocialImageMetadata(
        {
            kind: "photo",
            lang,
            photoId: photo.photoId,
        },
        display.title,
    );

    return {
        title: display.title,
        description: display.description,
        applicationName: "MomentBook",
        creator: "MomentBook",
        publisher: "MomentBook",
        robots: buildPublicRobots(),
        alternates: buildAlternates(lang, path),
        openGraph: {
            ...buildOpenGraphBase(lang, path),
            title: display.title,
            description: display.description,
            type: "article",
            images: socialImages,
            publishedTime,
            tags: buildOpenGraphArticleTags(keywords),
        },
        twitter: {
            card: "summary_large_image",
            title: display.title,
            description: display.description,
            images: socialImages?.map((image) => image.url),
        },
    };
}

export default async function PhotoPage({
    params,
}: {
    params: Promise<{ lang: string; photoId: string }>;
}) {
    const { lang, photoId } = (await params) as {
        lang: Language;
        photoId: string;
    };
    const photo = await fetchPublishedPhoto(photoId, lang);

    if (!photo) {
        notFound();
    }

    const copy = photoCopy[lang] ?? photoCopy.en;
    const display = buildPhotoDisplayState(copy, photo);

    const siteUrl = resolveStructuredDataSiteUrl();
    const pageUrl = buildStructuredDataUrl(
        buildOpenGraphUrl(lang, `/photos/${photo.photoId}`),
        siteUrl,
    );

    const datePublished = display.hasTakenAt && display.takenAt !== null
        ? new Date(display.takenAt).toISOString()
        : undefined;
    const keywords = buildPublicKeywords({
        lang,
        kind: "photo",
        title: display.title,
        locationNames: display.locationName ? [display.locationName] : [],
        extra: display.journeyTitle ? [display.journeyTitle] : [],
    });
    const keywordValue = buildStructuredDataKeywordValue(keywords);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        name: display.title,
        description: display.description,
        contentUrl: photo.url,
        url: pageUrl,
        caption: display.caption ?? undefined,
        inLanguage: toLocaleTag(lang),
        ...(keywordValue ? { keywords: keywordValue } : {}),
        ...(datePublished && { datePublished }),
        ...(display.locationName
            ? {
                  contentLocation: {
                      "@type": "Place",
                      name: display.locationName,
                  },
              }
            : {}),
        publisher: buildPublisherOrganizationJsonLd(siteUrl),
        isPartOf: {
            "@type": "Article",
            url: buildStructuredDataUrl(
                buildOpenGraphUrl(lang, `/journeys/${photo.journey.publicId}`),
                siteUrl,
            ),
            ...(display.journeyTitle ? { name: display.journeyTitle } : {}),
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": pageUrl,
            name: display.title,
            description: display.description,
            inLanguage: toLocaleTag(lang),
            primaryImageOfPage: photo.url,
        },
    };

    const journeyPageLabels = getJourneyPageLabels(lang);
    const breadcrumbJsonLd = buildPageBreadcrumbJsonLd(lang, [
        { name: journeyPageLabels.title, path: `/${lang}/journeys` },
        { name: display.journeyTitle || journeyPageLabels.title, path: `/${lang}/journeys/${photo.journey.publicId}` },
        { name: display.title, path: `/${lang}/photos/${photo.photoId}` },
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

            <PhotoContent
                lang={lang}
                photoId={photoId}
                photo={photo}
                copy={copy}
                display={display}
            />
        </div>
    );
}
