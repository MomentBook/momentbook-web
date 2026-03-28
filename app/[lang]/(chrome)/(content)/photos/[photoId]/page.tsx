import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./photo.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
    fetchPublishedPhoto,
} from "@/lib/published-journey";
import {
    buildOpenGraphBase,
    buildPublicRobots,
    compactSocialImages,
    resolveTwitterCard,
} from "@/lib/seo/public-metadata";
import {
    buildPublisherOrganizationJsonLd,
    buildStructuredDataUrl,
    resolveStructuredDataSiteUrl,
    serializeJsonLd,
} from "@/lib/seo/json-ld";
import { PhotoContent } from "./PhotoContent";
import {
    buildPhotoDisplayState,
    buildPhotoSeoText,
    hasValidTimestamp,
    photoCopy,
    photoNotFoundTitleByLanguage,
} from "./photo.helpers";

export const revalidate = 3600;

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

    const { title, description } = buildPhotoSeoText(copy, photo);
    const path = `/photos/${photo.photoId}`;
    const takenAt = hasValidTimestamp(photo.takenAt) ? photo.takenAt : null;
    const publishedTime =
        takenAt !== null
            ? new Date(takenAt).toISOString()
            : undefined;
    const socialImages = compactSocialImages([
        {
            url: photo.url,
            alt: title,
        },
    ]);

    return {
        title,
        description,
        applicationName: "MomentBook",
        creator: "MomentBook",
        publisher: "MomentBook",
        robots: buildPublicRobots(),
        alternates: buildAlternates(lang, path),
        openGraph: {
            ...buildOpenGraphBase(lang, path),
            title,
            description,
            type: "article",
            images: socialImages,
            publishedTime,
        },
        twitter: {
            card: resolveTwitterCard(socialImages),
            title,
            description,
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

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        name: display.title,
        description: display.description,
        contentUrl: photo.url,
        url: pageUrl,
        caption: display.caption ?? undefined,
        ...(datePublished && { datePublished }),
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
        },
    };

    return (
        <div className={styles.page}>
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
