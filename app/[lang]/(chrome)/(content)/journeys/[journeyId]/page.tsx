import type { Metadata } from "next";
import { notFound } from "next/navigation";
import styles from "./journey.module.scss";
import { buildAbsoluteAppTransparentLogoUrl } from "@/lib/branding/logo";
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
    buildSeoDescription,
} from "@/lib/seo/public-metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";

export const revalidate = 60;

const hiddenNoticeByLanguage: Record<Language, { title: string; message: string }> = {
    en: {
        title: "This journey is hidden",
        message: "This post has been hidden due to accumulated reports.",
    },
    ko: {
        title: "숨김 처리된 게시글입니다",
        message: "신고가 누적되어 숨김 처리된 게시글입니다.",
    },
    ja: {
        title: "非表示の投稿です",
        message: "この投稿は通報の累積により非表示になりました。",
    },
    zh: {
        title: "此帖子已被隐藏",
        message: "该帖子因举报累计已被隐藏。",
    },
    es: {
        title: "Esta publicación está oculta",
        message: "Esta publicación fue ocultada por reportes acumulados.",
    },
    pt: {
        title: "Esta publicação está oculta",
        message: "Esta publicação foi ocultada por denúncias acumuladas.",
    },
    fr: {
        title: "Cette publication est masquée",
        message: "Cette publication a été masquée suite à des signalements répétés.",
    },
    th: {
        title: "โพสต์นี้ถูกซ่อน",
        message: "โพสต์นี้ถูกซ่อนเนื่องจากมีการรายงานสะสม",
    },
    vi: {
        title: "Bài đăng đã bị ẩn",
        message: "Bài đăng này đã bị ẩn do tích lũy báo cáo.",
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

const journeyAuthorFallbackByLanguage: Record<Language, string> = {
    en: "MomentBook User",
    ko: "MomentBook 사용자",
    ja: "MomentBookユーザー",
    zh: "MomentBook 用户",
    es: "Usuario de MomentBook",
    pt: "Usuário do MomentBook",
    fr: "Utilisateur MomentBook",
    th: "ผู้ใช้ MomentBook",
    vi: "Người dùng MomentBook",
};

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
        const hiddenNotice = hiddenNoticeByLanguage[lang] ?? hiddenNoticeByLanguage.en;
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
    const authorName = author?.name || journeyAuthorFallbackByLanguage[lang];
    const description = buildSeoDescription([
        journey.description,
        buildJourneyDescription(lang, locations, journey.photoCount),
    ]);
    const images = journey.images.slice(0, 6).map((img) => ({
        url: img.url,
        alt: journey.title,
        width: img.width,
        height: img.height,
    }));

    return {
        title: journey.title,
        description,
        applicationName: "MomentBook",
        authors: [
            {
                name: authorName,
                url: `/${lang}/users/${journey.userId}`,
            },
        ],
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
            authors: [authorName],
            section: journeyLabels[lang]?.eyebrow ?? journeyLabels.en.eyebrow,
            tags: locations.slice(0, 6),
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
    const result = await fetchPublishedJourneyResult(journeyId);
    const hiddenNotice = hiddenNoticeByLanguage[lang] ?? hiddenNoticeByLanguage.en;

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

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
    const pageUrl = new URL(
        buildOpenGraphUrl(lang, `/journeys/${journey.publicId}`),
        siteUrl,
    ).toString();
    const publishedTimestamp = Number.isFinite(Date.parse(journey.publishedAt))
        ? Date.parse(journey.publishedAt)
        : Number.isFinite(Date.parse(journey.createdAt))
            ? Date.parse(journey.createdAt)
            : null;
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
            name: user?.name || journeyAuthorFallbackByLanguage[lang],
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
                url: buildAbsoluteAppTransparentLogoUrl(siteUrl),
            },
        },
        mainEntityOfPage: pageUrl,
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
                authorName={user?.name || journeyAuthorFallbackByLanguage[lang]}
                publishedTimestamp={publishedTimestamp}
                periodStart={periodRange.start}
                periodEnd={periodRange.end}
                labels={labels}
            />
        </div>
    );
}
