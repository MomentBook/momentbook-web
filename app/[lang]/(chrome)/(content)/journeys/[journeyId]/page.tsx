import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./journey.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { fetchPublishedJourneyResult } from "@/lib/published-journey";
import { fetchPublicUser } from "@/lib/public-users";
import { resolveJourneyPeriodRange } from "@/lib/journey-period";
import JourneyContent from "./components/JourneyContent";
import {
    journeyLabels,
    buildJourneyDescription,
} from "./labels";
import {
    getUniqueJourneyLocations,
    buildPhotoIdToImageUrlMap,
} from "./utils";
import {
    buildNoIndexRobots,
    buildOpenGraphBase,
    buildPublicRobots,
    compactSocialImages,
    resolveTwitterCard,
    buildSeoDescription,
} from "@/lib/seo/public-metadata";
import {
    buildPublisherOrganizationJsonLd,
    buildStructuredDataUrl,
    resolveStructuredDataSiteUrl,
    serializeJsonLd,
} from "@/lib/seo/json-ld";

export const revalidate = 60;

const unavailableNoticeByLanguage: Record<Language, { title: string; message: string }> = {
    en: {
        title: "This journey is unavailable",
        message: "This journey is currently unavailable on the web.",
    },
    ko: {
        title: "이 여정은 웹에서 볼 수 없습니다",
        message: "이 여정은 현재 웹에서 볼 수 없습니다.",
    },
    ja: {
        title: "この旅はウェブでは表示できません",
        message: "この旅は現在ウェブでは表示できません。",
    },
    zh: {
        title: "此旅程暂时无法在网页上查看",
        message: "此旅程当前无法在网页上查看。",
    },
    es: {
        title: "Este viaje no está disponible en la web",
        message: "Este viaje no está disponible actualmente en la web.",
    },
    pt: {
        title: "Esta viagem não está disponível na web",
        message: "Esta viagem não está disponível no momento na web.",
    },
    fr: {
        title: "Ce voyage n'est pas disponible sur le web",
        message: "Ce voyage n'est actuellement pas disponible sur le web.",
    },
    th: {
        title: "ทริปนี้ไม่สามารถดูบนเว็บได้",
        message: "ขณะนี้ทริปนี้ไม่สามารถดูบนเว็บได้",
    },
    vi: {
        title: "Hành trình này hiện không xem được trên web",
        message: "Hành trình này hiện không xem được trên web.",
    },
};

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

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string; journeyId: string }>;
}): Promise<Metadata> {
    const { lang, journeyId } = (await params) as {
        lang: Language;
        journeyId: string;
    };
    const result = await fetchPublishedJourneyResult(journeyId);

    if (result.status === "hidden") {
        const hiddenNotice = unavailableNoticeByLanguage[lang] ?? unavailableNoticeByLanguage.en;
        const hiddenMessage =
            result.data?.notice?.trim() ||
            result.message ||
            hiddenNotice.message;
        return {
            title: hiddenNotice.title,
            description: hiddenMessage,
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
    const images = compactSocialImages(
        journey.images.slice(0, 6).map((img) => ({
            url: img.url,
            alt: journey.title,
            width: img.width,
            height: img.height,
        })),
    );

    return {
        title: journey.title,
        description,
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
            title: journey.title,
            description,
            type: "article",
            images,
            publishedTime: journey.publishedAt,
            modifiedTime: journey.publishedAt,
            ...(authorName ? { authors: [authorName] } : {}),
            section: journeyLabels[lang]?.eyebrow ?? journeyLabels.en.eyebrow,
            tags: locations.slice(0, 6),
        },
        twitter: {
            card: resolveTwitterCard(images),
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
    const result = await fetchPublishedJourneyResult(journeyId);
    const hiddenNotice = unavailableNoticeByLanguage[lang] ?? unavailableNoticeByLanguage.en;

    if (result.status === "hidden") {
        const hiddenMessage =
            result.data?.notice?.trim() ||
            result.message ||
            hiddenNotice.message;

        return (
            <div className={styles.page}>
                <section className={styles.hiddenNotice}>
                    <h1 className={styles.hiddenNoticeTitle}>{hiddenNotice.title}</h1>
                    <p className={styles.hiddenNoticeMessage}>{hiddenMessage}</p>
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
    const periodRange = resolveJourneyPeriodRange({
        startedAt: journey.startedAt,
        endedAt: journey.endedAt,
        photoSources: [journey.images, journey.clusters],
    });
    const photoImageMap = buildPhotoIdToImageUrlMap(journey);

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
    const authorName = readAuthorName(user?.name);

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: journey.title,
        description,
        image: journey.images.map((img) => img.url),
        datePublished: journey.publishedAt,
        dateModified: journey.publishedAt,
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

    return (
        <div className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
            />

            <JourneyContent
                journey={journey}
                photoImageMap={photoImageMap}
                lang={lang}
                authorName={authorName}
                publishedTimestamp={publishedTimestamp}
                periodStart={periodRange.start}
                periodEnd={periodRange.end}
                labels={labels}
            />
        </div>
    );
}
