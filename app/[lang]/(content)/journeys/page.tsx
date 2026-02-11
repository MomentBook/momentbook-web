import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import styles from "./journeys.module.scss";
import {
    defaultLanguage,
    languageList,
    toHreflang,
    type Language,
} from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
    fetchPublishedJourney,
    fetchPublishedJourneys,
    type PublishedJourneyListItemApi,
} from "@/lib/published-journey";
import { fetchPublicUser } from "@/lib/public-users";
import { JourneyPreviewCard } from "@/components/JourneyPreviewCard";
import { LocalizedDate, LocalizedDateTimeRange } from "@/components/LocalizedTime";
import { readTimestamp, resolveJourneyPeriodRange } from "@/lib/journey-period";

export const revalidate = 60;

const JOURNEYS_PER_PAGE = 16;

type JourneyPageLabels = {
    title: string;
    subtitle: string;
    countLabel: string;
    empty: string;
    byLabel: string;
    photosLabel: string;
    periodLabel: string;
    previousPage: string;
    nextPage: string;
    untitledJourney: string;
    publishedLabel: string;
    pageLabel: string;
    unknownDateLabel: string;
    unknownUserLabel: string;
};

const journeyPageLabels: Partial<Record<Language, JourneyPageLabels>> & {
    en: JourneyPageLabels;
} = {
    en: {
        title: "Journeys",
        subtitle: "Shared journeys on MomentBook.",
        countLabel: "{count} journeys",
        empty: "No published journeys yet.",
        byLabel: "by",
        photosLabel: "photos",
        periodLabel: "period",
        previousPage: "Previous",
        nextPage: "Next",
        untitledJourney: "Untitled journey",
        publishedLabel: "Published",
        pageLabel: "Page {page}",
        unknownDateLabel: "Date unavailable",
        unknownUserLabel: "Unknown user",
    },
    ko: {
        title: "여정",
        subtitle: "MomentBook에서 공유된 여정입니다.",
        countLabel: "{count}개 여정",
        empty: "아직 게시된 여정이 없습니다.",
        byLabel: "작성자",
        photosLabel: "사진",
        periodLabel: "기간",
        previousPage: "이전",
        nextPage: "다음",
        untitledJourney: "제목 없는 여정",
        publishedLabel: "게시일",
        pageLabel: "{page}페이지",
        unknownDateLabel: "날짜 정보 없음",
        unknownUserLabel: "알 수 없는 사용자",
    },
    ja: {
        title: "旅",
        subtitle: "MomentBookで共有された旅です。",
        countLabel: "{count}件の旅",
        empty: "公開された旅はまだありません。",
        byLabel: "投稿者",
        photosLabel: "写真",
        periodLabel: "期間",
        previousPage: "前へ",
        nextPage: "次へ",
        untitledJourney: "タイトル未設定の旅",
        publishedLabel: "公開日",
        pageLabel: "{page}ページ",
        unknownDateLabel: "日付情報なし",
        unknownUserLabel: "不明なユーザー",
    },
    zh: {
        title: "行程",
        subtitle: "在 MomentBook 上分享的公开行程。",
        countLabel: "{count} 条行程",
        empty: "暂无已发布行程。",
        byLabel: "作者",
        photosLabel: "照片",
        periodLabel: "时间",
        previousPage: "上一页",
        nextPage: "下一页",
        untitledJourney: "未命名行程",
        publishedLabel: "发布日期",
        pageLabel: "第 {page} 页",
        unknownDateLabel: "暂无日期信息",
        unknownUserLabel: "未知用户",
    },
    es: {
        title: "Viajes",
        subtitle: "Viajes compartidos en MomentBook.",
        countLabel: "{count} viajes",
        empty: "Aun no hay viajes publicados.",
        byLabel: "por",
        photosLabel: "fotos",
        periodLabel: "periodo",
        previousPage: "Anterior",
        nextPage: "Siguiente",
        untitledJourney: "Viaje sin titulo",
        publishedLabel: "Publicado",
        pageLabel: "Pagina {page}",
        unknownDateLabel: "Fecha no disponible",
        unknownUserLabel: "Usuario desconocido",
    },
    pt: {
        title: "Jornadas",
        subtitle: "Jornadas compartilhadas no MomentBook.",
        countLabel: "{count} jornadas",
        empty: "Ainda nao ha jornadas publicadas.",
        byLabel: "por",
        photosLabel: "fotos",
        periodLabel: "periodo",
        previousPage: "Anterior",
        nextPage: "Proxima",
        untitledJourney: "Jornada sem titulo",
        publishedLabel: "Publicado em",
        pageLabel: "Pagina {page}",
        unknownDateLabel: "Data indisponivel",
        unknownUserLabel: "Usuario desconhecido",
    },
    fr: {
        title: "Voyages",
        subtitle: "Voyages partages sur MomentBook.",
        countLabel: "{count} voyages",
        empty: "Aucun voyage publie pour le moment.",
        byLabel: "par",
        photosLabel: "photos",
        periodLabel: "periode",
        previousPage: "Precedent",
        nextPage: "Suivant",
        untitledJourney: "Voyage sans titre",
        publishedLabel: "Publie",
        pageLabel: "Page {page}",
        unknownDateLabel: "Date indisponible",
        unknownUserLabel: "Utilisateur inconnu",
    },
    th: {
        title: "ทริป",
        subtitle: "ทริปที่แชร์บน MomentBook",
        countLabel: "{count} ทริป",
        empty: "ยังไม่มีทริปที่เผยแพร่",
        byLabel: "โดย",
        photosLabel: "รูป",
        periodLabel: "ช่วงเวลา",
        previousPage: "ก่อนหน้า",
        nextPage: "ถัดไป",
        untitledJourney: "ทริปไม่มีชื่อ",
        publishedLabel: "วันที่เผยแพร่",
        pageLabel: "หน้า {page}",
        unknownDateLabel: "ไม่มีข้อมูลวันที่",
        unknownUserLabel: "ผู้ใช้ไม่ทราบชื่อ",
    },
    vi: {
        title: "Hanh trinh",
        subtitle: "Cac hanh trinh duoc chia se tren MomentBook.",
        countLabel: "{count} hanh trinh",
        empty: "Chua co hanh trinh da dang.",
        byLabel: "boi",
        photosLabel: "anh",
        periodLabel: "thoi gian",
        previousPage: "Truoc",
        nextPage: "Sau",
        untitledJourney: "Hanh trinh chua dat ten",
        publishedLabel: "Da dang",
        pageLabel: "Trang {page}",
        unknownDateLabel: "Khong co ngay",
        unknownUserLabel: "Nguoi dung khong ro",
    },
};

type PaginationEntry =
    | {
        type: "page";
        page: number;
    }
    | {
        type: "ellipsis";
        key: string;
    };

function asRecord(value: unknown): Record<string, unknown> | null {
    return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function readText(value: unknown): string | null {
    if (typeof value !== "string") {
        return null;
    }

    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
}

function readCount(value: unknown): number | null {
    if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
        return Math.floor(value);
    }

    if (typeof value === "string") {
        const parsed = Number(value);
        if (Number.isFinite(parsed) && parsed >= 0) {
            return Math.floor(parsed);
        }
    }

    return null;
}

function resolvePhotoCount(...values: unknown[]): number {
    let maxCount = 0;

    for (const value of values) {
        const count = readCount(value);
        if (count !== null && count > maxCount) {
            maxCount = count;
        }
    }

    return maxCount;
}

function parsePageParam(value: string | string[] | undefined): number {
    const raw = Array.isArray(value) ? value[0] : value;
    const parsed = Number(raw);

    if (!Number.isInteger(parsed) || parsed < 1) {
        return 1;
    }

    return parsed;
}

function buildPageHref(lang: Language, page: number): string {
    if (page <= 1) {
        return `/${lang}/journeys`;
    }

    return `/${lang}/journeys?page=${page}`;
}

function buildPaginationEntries(currentPage: number, totalPages: number): PaginationEntry[] {
    if (totalPages <= 1) {
        return [{ type: "page", page: 1 }];
    }

    const pages = new Set<number>([1, totalPages]);
    const siblingCount = 1;
    const edgeWindow = 4;

    for (let page = currentPage - siblingCount; page <= currentPage + siblingCount; page += 1) {
        if (page > 1 && page < totalPages) {
            pages.add(page);
        }
    }

    if (currentPage <= edgeWindow) {
        for (let page = 2; page <= Math.min(totalPages - 1, edgeWindow + 1); page += 1) {
            pages.add(page);
        }
    }

    if (currentPage >= totalPages - edgeWindow + 1) {
        for (let page = Math.max(2, totalPages - edgeWindow); page <= totalPages - 1; page += 1) {
            pages.add(page);
        }
    }

    const sortedPages = [...pages].sort((a, b) => a - b);
    const entries: PaginationEntry[] = [];

    sortedPages.forEach((page, index) => {
        const previousPage = sortedPages[index - 1];

        if (index > 0 && previousPage && page - previousPage > 1) {
            entries.push({
                type: "ellipsis",
                key: `${previousPage}-${page}`,
            });
        }

        entries.push({
            type: "page",
            page,
        });
    });

    return entries;
}

function resolveJourneyMetadata(journey: PublishedJourneyListItemApi) {
    const metadata = asRecord(journey.metadata);

    return {
        title: readText(metadata?.title),
        description: readText(metadata?.description),
        thumbnailUri: readText(metadata?.thumbnailUri),
    };
}

function buildJourneysAlternates(lang: Language, page: number) {
    if (page <= 1) {
        return buildAlternates(lang, "/journeys");
    }

    const languages = Object.fromEntries([
        ...languageList.map((code) => [
            toHreflang(code),
            `/${code}/journeys?page=${page}`,
        ]),
        ["x-default", `/${defaultLanguage}/journeys?page=${page}`],
    ]) as Record<string, string>;

    return {
        canonical: `/${lang}/journeys?page=${page}`,
        languages,
    };
}

export async function generateMetadata({
    params,
    searchParams,
}: {
    params: Promise<{ lang: string }>;
    searchParams: Promise<{ page?: string | string[] }>;
}): Promise<Metadata> {
    const { lang } = (await params) as { lang: Language };
    const { page } = (await searchParams) as { page?: string | string[] };
    const labels = journeyPageLabels[lang] ?? journeyPageLabels.en;
    const currentPage = parsePageParam(page);
    const pageTitleSuffix =
        currentPage > 1
            ? ` · ${labels.pageLabel.replace("{page}", String(currentPage))}`
            : "";

    const path = "/journeys";
    const urlBase = buildOpenGraphUrl(lang, path);
    const url = currentPage > 1 ? `${urlBase}?page=${currentPage}` : urlBase;

    return {
        title: `${labels.title}${pageTitleSuffix}`,
        description: labels.subtitle,
        alternates: buildJourneysAlternates(lang, currentPage),
        openGraph: {
            title: `${labels.title}${pageTitleSuffix}`,
            description: labels.subtitle,
            url,
        },
        twitter: {
            card: "summary",
            title: `${labels.title}${pageTitleSuffix}`,
            description: labels.subtitle,
        },
    };
}

export default async function JourneysPage({
    params,
    searchParams,
}: {
    params: Promise<{ lang: string }>;
    searchParams: Promise<{ page?: string | string[] }>;
}) {
    const { lang } = (await params) as { lang: Language };
    const { page } = (await searchParams) as { page?: string | string[] };
    const labels = journeyPageLabels[lang] ?? journeyPageLabels.en;

    const requestedPage = parsePageParam(page);
    const journeysData = await fetchPublishedJourneys({
        page: requestedPage,
        limit: JOURNEYS_PER_PAGE,
        sort: "recent",
    });

    const journeys = journeysData?.journeys ?? [];
    const totalJourneys = journeysData?.total ?? 0;
    const totalPages = Math.max(1, journeysData?.pages ?? 1);
    const safeCurrentPage = Math.min(requestedPage, totalPages);

    if (requestedPage !== safeCurrentPage) {
        redirect(buildPageHref(lang, safeCurrentPage));
    }

    const uniqueUserIds = [...new Set(journeys.map((journey) => journey.userId).filter(Boolean))];
    const users = await Promise.all(
        uniqueUserIds.map(async (userId) => [userId, await fetchPublicUser(userId)] as const),
    );
    const userMap = new Map(users);
    const journeyDetails = await Promise.all(
        journeys.map(async (journey) => [journey.publicId, await fetchPublishedJourney(journey.publicId)] as const),
    );
    const detailMap = new Map(journeyDetails);

    const paginationEntries = buildPaginationEntries(safeCurrentPage, totalPages);
    const hasPreviousPage = safeCurrentPage > 1;
    const hasNextPage = safeCurrentPage < totalPages;

    const cards = journeys.map((journey) => {
        const meta = resolveJourneyMetadata(journey);
        const author = userMap.get(journey.userId);
        const detail = detailMap.get(journey.publicId);
        const publishedAt = readTimestamp(journey.publishedAt) ?? readTimestamp(journey.createdAt);
        const detailCoverUrl =
            detail?.images.find((image) => readText(image.url))?.url ?? null;
        const coverUrl =
            detailCoverUrl ??
            readText(journey.thumbnailUrl) ??
            meta.thumbnailUri;
        const periodRange = resolveJourneyPeriodRange({
            startedAt: detail?.startedAt ?? journey.startedAt,
            endedAt: detail?.endedAt ?? journey.endedAt,
            photoSources: [detail?.images, detail?.clusters, journey.metadata],
        });

        return {
            publicId: journey.publicId,
            userId: journey.userId,
            title: readText(detail?.title) ?? meta.title ?? labels.untitledJourney,
            description: readText(detail?.description) ?? meta.description ?? null,
            imageCount: resolvePhotoCount(
                journey.photoCount,
                detail?.photoCount,
                journey.imageCount,
                Array.isArray(detail?.images) ? detail.images.length : null,
            ),
            coverUrl,
            authorName: readText(author?.name) ?? labels.unknownUserLabel,
            publishedAt,
            periodRange,
        };
    });

    const countText = labels.countLabel.replace("{count}", String(totalJourneys));
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
    const pagePath = buildOpenGraphUrl(lang, "/journeys");
    const pagePathWithQuery =
        safeCurrentPage > 1 ? `${pagePath}?page=${safeCurrentPage}` : pagePath;
    const pageUrl = new URL(
        pagePathWithQuery,
        siteUrl,
    ).toString();
    const offset = (safeCurrentPage - 1) * JOURNEYS_PER_PAGE;
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: labels.title,
        description: labels.subtitle,
        url: pageUrl,
        mainEntity: {
            "@type": "ItemList",
            numberOfItems: totalJourneys,
            itemListElement: cards.map((card, index) => ({
                "@type": "ListItem",
                position: offset + index + 1,
                url: new URL(
                    buildOpenGraphUrl(lang, `/journeys/${card.publicId}`),
                    siteUrl,
                ).toString(),
                name: card.title,
            })),
        },
    };

    return (
        <div className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            <header className={styles.hero}>
                <p className={styles.kicker}>{countText}</p>
                <h1 className={styles.title}>
                    {labels.title}
                    {safeCurrentPage > 1 ? (
                        <span className={styles.pageBadge}>
                            {labels.pageLabel.replace("{page}", String(safeCurrentPage))}
                        </span>
                    ) : null}
                </h1>
                <p className={styles.subtitle}>{labels.subtitle}</p>
            </header>

            {cards.length === 0 ? (
                <div className={styles.emptyState}>{labels.empty}</div>
            ) : (
                <>
                    <div className={styles.grid}>
                        {cards.map((card) => (
                            <JourneyPreviewCard
                                key={card.publicId}
                                href={`/${lang}/journeys/${card.publicId}`}
                                title={card.title}
                                description={card.description}
                                coverUrl={card.coverUrl}
                                topMeta={(
                                    <>
                                        {labels.publishedLabel} ·{" "}
                                        <LocalizedDate
                                            lang={lang}
                                            timestamp={card.publishedAt}
                                            fallback={labels.unknownDateLabel}
                                        />
                                    </>
                                )}
                                metaItems={[
                                    { label: labels.photosLabel, value: card.imageCount },
                                    {
                                        label: labels.periodLabel,
                                        value: (
                                            <LocalizedDateTimeRange
                                                lang={lang}
                                                start={card.periodRange.start}
                                                end={card.periodRange.end}
                                                fallback={labels.unknownDateLabel}
                                            />
                                        ),
                                    },
                                ]}
                                authorText={`${labels.byLabel} ${card.authorName}`}
                            />
                        ))}
                    </div>

                    <nav className={styles.pagination} aria-label="Journey list pagination">
                        {hasPreviousPage ? (
                            <Link
                                className={styles.pageButton}
                                href={buildPageHref(lang, safeCurrentPage - 1)}
                            >
                                {labels.previousPage}
                            </Link>
                        ) : (
                            <span className={styles.pageButtonDisabled}>{labels.previousPage}</span>
                        )}

                        <div className={styles.pageNumbers}>
                            {paginationEntries.map((entry) => {
                                if (entry.type === "ellipsis") {
                                    return (
                                        <span
                                            key={entry.key}
                                            className={styles.pageEllipsis}
                                            aria-hidden="true"
                                        >
                                            ...
                                        </span>
                                    );
                                }

                                if (entry.page === safeCurrentPage) {
                                    return (
                                        <span
                                            key={`page-${entry.page}`}
                                            className={styles.pageNumberCurrent}
                                            aria-current="page"
                                        >
                                            {entry.page}
                                        </span>
                                    );
                                }

                                return (
                                    <Link
                                        key={`page-${entry.page}`}
                                        className={styles.pageNumber}
                                        href={buildPageHref(lang, entry.page)}
                                    >
                                        {entry.page}
                                    </Link>
                                );
                            })}
                        </div>

                        {hasNextPage ? (
                            <Link
                                className={styles.pageButton}
                                href={buildPageHref(lang, safeCurrentPage + 1)}
                            >
                                {labels.nextPage}
                            </Link>
                        ) : (
                            <span className={styles.pageButtonDisabled}>{labels.nextPage}</span>
                        )}
                    </nav>
                </>
            )}
        </div>
    );
}
