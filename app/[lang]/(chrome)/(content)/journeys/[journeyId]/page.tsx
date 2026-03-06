import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./journey.module.scss";
import { buildAbsoluteAppTransparentLogoUrl } from "@/lib/branding/logo";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { fetchPublishedJourneyResult } from "@/lib/published-journey";
import { fetchPublicUser } from "@/lib/public-users";
import { LocalizedDateTimeRange } from "@/components/LocalizedTime";
import { resolveJourneyPeriodRange } from "@/lib/journey-period";
import JourneyContent from "./components/JourneyContent";
import {
    journeyLabels,
    buildJourneyDescription,
} from "./labels";
import {
    formatDuration,
    getUniqueLocations,
    buildImageUrlToPhotoIdMap,
} from "./utils";
import {
    buildPublicRobots,
} from "@/lib/seo/public-metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";

export const revalidate = 60;

const hiddenNoticeByLanguage: Partial<Record<Language, { title: string; message: string }>> & {
    en: { title: string; message: string };
} = {
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
    zh: "找不到行程",
    es: "No se encontró el viaje",
    pt: "Jornada não encontrada",
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
            robots: {
                index: false,
                follow: false,
            },
        };
    }

    const journey = result.data;
    if (!journey) {
        return {
            title: journeyNotFoundTitleByLanguage[lang],
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
        robots: buildPublicRobots(),
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
    const locations = getUniqueLocations(journey.clusters);
    const totalDuration = journey.clusters.reduce(
        (sum, cluster) => sum + cluster.time.durationMs,
        0,
    );
    const periodRange = resolveJourneyPeriodRange({
        startedAt: journey.startedAt,
        endedAt: journey.endedAt,
        photoSources: [journey.images, journey.clusters],
    });
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

            <header className={styles.hero}>
                <div className={styles.heroMain}>
                    <p className={styles.eyebrow}>{labels.eyebrow}</p>
                    <h1 className={styles.title}>{journey.title}</h1>
                    {journey.description && (
                        <p className={styles.subtitle}>
                            {journey.description}
                        </p>
                    )}
                </div>

                <div className={styles.metaRow}>
                    <Link
                        href={`/${lang}/users/${journey.userId}`}
                        className={styles.metaAuthor}
                    >
                        {user?.name ?? labels.profileLinkLabel}
                    </Link>
                    <span>
                        <LocalizedDateTimeRange
                            lang={lang}
                            start={periodRange.start}
                            end={periodRange.end}
                        />
                    </span>
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
        </div>
    );
}
