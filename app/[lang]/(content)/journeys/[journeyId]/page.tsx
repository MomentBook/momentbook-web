import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./journey.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
    fetchPublishedJourney,
    type PublishedJourneyApi,
    type PublishedJourneyCluster,
} from "@/lib/published-journey";
import JourneyContent from "./components/JourneyContent";

export const revalidate = 3600;

const journeyLabels: Record<
    Language,
    {
        eyebrow: string;
        photoCount: string;
        locationCount: string;
        duration: string;
        places: string;
        gallery: string;
        hours: string;
        routeTitle: string;
        routeBadgeStrong: string;
        routeBadgeWeak: string;
        routeBadgeNone: string;
        routeBadgePhotoOnly: string;
        routeLeadStrong: string;
        routeLeadWeak: string;
        routeLeadNone: string;
        routeLeadPhotoOnly: string;
        mapEmpty: string;
        locationFallback: string;
    }
> = {
    en: {
        eyebrow: "Journey",
        photoCount: "photos",
        locationCount: "places",
        duration: "duration",
        places: "Places Visited",
        gallery: "Photo Gallery",
        hours: "h",
        routeTitle: "Journey map",
        routeBadgeStrong: "Clear route",
        routeBadgeWeak: "Soft route",
        routeBadgeNone: "Places only",
        routeBadgePhotoOnly: "Photos only",
        routeLeadStrong: "GPS points are sufficient to trace a clear route.",
        routeLeadWeak: "GPS points are partial, so the route appears softer.",
        routeLeadNone:
            "Location data was not available, so only places are shown.",
        routeLeadPhotoOnly: "This journey is shared as photos without a route.",
        mapEmpty: "There is no map data for this journey.",
        locationFallback: "Location",
    },
    ko: {
        eyebrow: "여정",
        photoCount: "장",
        locationCount: "곳",
        duration: "소요 시간",
        places: "방문한 장소",
        gallery: "사진 갤러리",
        hours: "시간",
        routeTitle: "여정 지도",
        routeBadgeStrong: "선명한 경로",
        routeBadgeWeak: "느슨한 경로",
        routeBadgeNone: "장소만 표시",
        routeBadgePhotoOnly: "사진만 공유",
        routeLeadStrong: "GPS 데이터가 충분해 경로가 선명하게 표시됩니다.",
        routeLeadWeak: "GPS 데이터가 간헐적이라 흐름이 부드럽게 보입니다.",
        routeLeadNone: "위치 데이터가 없어 장소만 표시됩니다.",
        routeLeadPhotoOnly: "경로 없이 사진만 공유된 여정입니다.",
        mapEmpty: "이 여정에는 지도 정보가 없습니다.",
        locationFallback: "장소",
    },
    ja: {
        eyebrow: "旅",
        photoCount: "枚",
        locationCount: "か所",
        duration: "所要時間",
        places: "訪れた場所",
        gallery: "フォトギャラリー",
        hours: "時間",
        routeTitle: "旅の地図",
        routeBadgeStrong: "明確なルート",
        routeBadgeWeak: "緩やかなルート",
        routeBadgeNone: "場所のみ",
        routeBadgePhotoOnly: "写真のみ",
        routeLeadStrong: "GPSが十分なため、ルートが明確に表示されます。",
        routeLeadWeak: "GPSが部分的なため、ゆるやかな流れで表示されます。",
        routeLeadNone: "位置情報がないため、場所のみ表示されます。",
        routeLeadPhotoOnly: "ルートなしの写真共有のみの旅です。",
        mapEmpty: "この旅には地図情報がありません。",
        locationFallback: "場所",
    },
    zh: {
        eyebrow: "行程",
        photoCount: "张照片",
        locationCount: "个地点",
        duration: "持续时间",
        places: "到访地点",
        gallery: "照片画廊",
        hours: "小时",
        routeTitle: "行程地图",
        routeBadgeStrong: "清晰路线",
        routeBadgeWeak: "柔和路线",
        routeBadgeNone: "仅地点",
        routeBadgePhotoOnly: "仅照片",
        routeLeadStrong: "GPS 数据充足，因此路线清晰可见。",
        routeLeadWeak: "GPS 数据不完整，路线呈现更柔和的脉络。",
        routeLeadNone: "位置数据不可用，因此仅显示地点。",
        routeLeadPhotoOnly: "该行程仅分享照片，不显示路线。",
        mapEmpty: "此行程没有地图信息。",
        locationFallback: "地点",
    },
};

function formatDateRange(lang: Language, start: number, end: number) {
    const formatter = new Intl.DateTimeFormat(lang, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
    const startDate = formatter.format(new Date(start));
    const endDate = formatter.format(new Date(end));

    if (startDate === endDate) {
        return startDate;
    }

    return `${startDate} – ${endDate}`;
}

function formatDuration(ms: number, hoursLabel: string) {
    const hours = Math.round(ms / (1000 * 60 * 60));
    if (hours < 1) {
        const minutes = Math.round(ms / (1000 * 60));
        return `${minutes}m`;
    }
    return `${hours}${hoursLabel}`;
}

function getUniqueLocations(clusters: PublishedJourneyCluster[]): string[] {
    const locationSet = new Set<string>();
    clusters.forEach((cluster) => {
        if (cluster.locationName) {
            locationSet.add(cluster.locationName);
        }
    });
    return Array.from(locationSet);
}

function buildJourneyDescription(
    lang: Language,
    locations: string[],
    photoCount: number,
) {
    const locationText = locations.slice(0, 3).join(", ");

    if (lang === "ko") {
        return locationText
            ? `${locationText}의 여정, 사진 ${photoCount}장.`
            : `사진 ${photoCount}장이 담긴 공개 여정입니다.`;
    }

    if (lang === "ja") {
        return locationText
            ? `${locationText}の旅、写真${photoCount}枚。`
            : `写真${photoCount}枚が含まれる公開された旅です。`;
    }

    if (lang === "zh") {
        return locationText
            ? `${locationText} 的行程，${photoCount} 张照片。`
            : `包含 ${photoCount} 张照片的公开行程。`;
    }

    return locationText
        ? `Journey through ${locationText} with ${photoCount} photos.`
        : `A published journey with ${photoCount} photos.`;
}

function buildImageUrlToPhotoIdMap(
    journey: PublishedJourneyApi,
): Map<string, string> {
    const map = new Map<string, string>();
    journey.images.forEach((img) => {
        map.set(img.photoId, img.url);
    });
    return map;
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
            name: "MomentBook User",
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
                    <div>
                        <p className={styles.eyebrow}>{labels.eyebrow}</p>
                        <h1 className={styles.title}>{journey.title}</h1>
                        {journey.description && (
                            <p className={styles.subtitle}>
                                {journey.description}
                            </p>
                        )}
                    </div>
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
                locations={locations}
            />
        </div>
    );
}
