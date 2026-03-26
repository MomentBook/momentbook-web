import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { PaginationNav } from "@/components/PaginationNav";
import { JourneyPreviewCard } from "@/components/JourneyPreviewCard";
import { LocalizedDateTimeRange } from "@/components/LocalizedTime";
import styles from "./journeys.module.scss";
import {
    type Language,
} from "@/lib/i18n/config";
import { buildOpenGraphUrl, buildPaginatedAlternates } from "@/lib/i18n/metadata";
import {
    fetchPublishedJourneys,
} from "@/lib/published-journey";
import {
    buildPaginationEntries,
    parsePositiveIntegerPage,
} from "@/lib/pagination";
import { LocalizedDate } from "@/components/LocalizedTime";
import {
    buildPublisherOrganizationJsonLd,
    buildStructuredDataUrl,
    resolveStructuredDataSiteUrl,
    serializeJsonLd,
} from "@/lib/seo/json-ld";
import {
    buildLocalizedAppScreenshotImage,
    buildOpenGraphBase,
    buildPublicRobots,
    buildSeoDescription,
} from "@/lib/seo/public-metadata";
import { buildJourneyCards, buildJourneyPageHref } from "./journeys.helpers";

export const revalidate = 60;

const JOURNEYS_PER_PAGE = 16;

type JourneyPageLabels = {
    title: string;
    subtitle: string;
    metaDescription: string;
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

const journeyPageLabels: Record<Language, JourneyPageLabels> = {
    en: {
        title: "Journeys",
        subtitle: "Shared journeys on MomentBook.",
        metaDescription:
            "Public journeys, travel timelines, and published trip photo archives shared on MomentBook.",
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
        metaDescription:
            "MomentBook에서 공유된 공개 여정, 여행 타임라인, 사진 아카이브를 모아둔 페이지입니다.",
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
        metaDescription:
            "MomentBook で共有された公開の旅、旅行タイムライン、写真アーカイブをまとめたページです。",
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
        title: "旅程",
        subtitle: "在 MomentBook 上分享的公开旅程。",
        metaDescription:
            "汇集了 MomentBook 上分享的公开旅程、旅行时间线与照片档案。",
        countLabel: "{count} 段旅程",
        empty: "还没有已发布的旅程。",
        byLabel: "作者",
        photosLabel: "照片",
        periodLabel: "时间",
        previousPage: "上一页",
        nextPage: "下一页",
        untitledJourney: "未命名旅程",
        publishedLabel: "发布日期",
        pageLabel: "第 {page} 页",
        unknownDateLabel: "暂无日期信息",
        unknownUserLabel: "未知用户",
    },
  es: {
    title: "Viajes",
    subtitle: "Viajes compartidos en MomentBook.",
    metaDescription:
        "Página con viajes públicos, cronologías de viaje y archivos de fotos publicados en MomentBook.",
    countLabel: "{count} viajes",
    empty: "Aún no hay viajes publicados.",
        byLabel: "por",
        photosLabel: "fotos",
        periodLabel: "período",
    previousPage: "Anterior",
    nextPage: "Siguiente",
    untitledJourney: "Viaje sin título",
    publishedLabel: "Publicado",
    pageLabel: "Página {page}",
    unknownDateLabel: "Fecha no disponible",
    unknownUserLabel: "Usuario desconocido",
  },
  pt: {
    title: "Viagens",
    subtitle: "Viagens compartilhadas no MomentBook.",
    metaDescription:
        "Página com viagens públicas, linhas do tempo de viagem e arquivos de fotos publicados no MomentBook.",
    countLabel: "{count} viagens",
    empty: "Ainda não há viagens publicadas.",
        byLabel: "por",
    photosLabel: "fotos",
    periodLabel: "período",
    previousPage: "Anterior",
    nextPage: "Próxima",
    untitledJourney: "Viagem sem título",
    publishedLabel: "Publicado em",
    pageLabel: "Página {page}",
    unknownDateLabel: "Data indisponível",
    unknownUserLabel: "Usuário desconhecido",
  },
  fr: {
    title: "Voyages",
    subtitle: "Voyages partagés sur MomentBook.",
    metaDescription:
        "Page regroupant les voyages publics, chronologies de voyage et archives photo publiés sur MomentBook.",
    countLabel: "{count} voyages",
    empty: "Aucun voyage publié pour le moment.",
    byLabel: "par",
    photosLabel: "photos",
    periodLabel: "période",
    previousPage: "Précédent",
    nextPage: "Suivant",
    untitledJourney: "Voyage sans titre",
    publishedLabel: "Publié",
    pageLabel: "Page {page}",
    unknownDateLabel: "Date indisponible",
    unknownUserLabel: "Utilisateur inconnu",
  },
    th: {
        title: "ทริป",
        subtitle: "ทริปที่แชร์บน MomentBook",
        metaDescription:
            "รวมทริปสาธารณะ ไทม์ไลน์การเดินทาง และคลังรูปที่เผยแพร่บน MomentBook",
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
    title: "Hành trình",
    subtitle: "Các hành trình được chia sẻ trên MomentBook.",
    metaDescription:
        "Trang tổng hợp hành trình công khai, dòng thời gian chuyến đi và kho ảnh đã đăng trên MomentBook.",
    countLabel: "{count} hành trình",
    empty: "Chưa có hành trình đã đăng.",
    byLabel: "bởi",
    photosLabel: "ảnh",
    periodLabel: "thời gian",
    previousPage: "Trước",
    nextPage: "Sau",
    untitledJourney: "Hành trình chưa đặt tên",
    publishedLabel: "Đã đăng",
    pageLabel: "Trang {page}",
    unknownDateLabel: "Không có ngày",
    unknownUserLabel: "Người dùng không rõ",
  },
};

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
    const currentPage = parsePositiveIntegerPage(page);
    const pageTitleSuffix =
        currentPage > 1
            ? ` · ${labels.pageLabel.replace("{page}", String(currentPage))}`
            : "";
    const description = buildSeoDescription([
        labels.metaDescription,
        currentPage > 1
            ? labels.pageLabel.replace("{page}", String(currentPage))
            : null,
    ]);
    const socialImages = [
        buildLocalizedAppScreenshotImage(lang, `${labels.title}${pageTitleSuffix}`),
    ];

    const path = "/journeys";
    const openGraphPath =
        currentPage > 1 ? `${path}?page=${currentPage}` : path;

    return {
        title: `${labels.title}${pageTitleSuffix}`,
        description,
        applicationName: "MomentBook",
        creator: "MomentBook",
        publisher: "MomentBook",
        robots: buildPublicRobots(),
        alternates: buildPaginatedAlternates(lang, path, currentPage),
        openGraph: {
            ...buildOpenGraphBase(lang, openGraphPath),
            type: "website",
            title: `${labels.title}${pageTitleSuffix}`,
            description,
            images: socialImages,
        },
        twitter: {
            card: "summary_large_image",
            title: `${labels.title}${pageTitleSuffix}`,
            description,
            images: socialImages.map((image) => image.url),
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

    const requestedPage = parsePositiveIntegerPage(page);
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
        redirect(buildJourneyPageHref(lang, safeCurrentPage));
    }

    const paginationEntries = buildPaginationEntries(safeCurrentPage, totalPages);
    const hasPreviousPage = safeCurrentPage > 1;
    const hasNextPage = safeCurrentPage < totalPages;
    const cards = await buildJourneyCards(journeys, labels);

    const siteUrl = resolveStructuredDataSiteUrl();
    const pagePath = buildOpenGraphUrl(lang, "/journeys");
    const pagePathWithQuery =
        safeCurrentPage > 1 ? `${pagePath}?page=${safeCurrentPage}` : pagePath;
    const pageUrl = buildStructuredDataUrl(pagePathWithQuery, siteUrl);
    const offset = (safeCurrentPage - 1) * JOURNEYS_PER_PAGE;
    const pageTitle =
        safeCurrentPage > 1
            ? `${labels.title} · ${labels.pageLabel.replace("{page}", String(safeCurrentPage))}`
            : labels.title;
    const description = buildSeoDescription([
        labels.metaDescription,
        safeCurrentPage > 1
            ? labels.pageLabel.replace("{page}", String(safeCurrentPage))
            : null,
    ]);
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: pageTitle,
        description,
        url: pageUrl,
        publisher: buildPublisherOrganizationJsonLd(siteUrl),
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": pageUrl,
        },
        mainEntity: {
            "@type": "ItemList",
            numberOfItems: totalJourneys,
            itemListElement: cards.map((card, index) => ({
                "@type": "ListItem",
                position: offset + index + 1,
                url: buildStructuredDataUrl(
                    buildOpenGraphUrl(lang, `/journeys/${card.publicId}`),
                    siteUrl,
                ),
                name: card.title,
            })),
        },
    };

    return (
        <div className={styles.page}>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
            />
            <div className={styles.backdrop} aria-hidden="true">
                <span className={styles.backdropOrbPrimary} />
                <span className={styles.backdropOrbSecondary} />
                <span className={styles.backdropLine} />
            </div>

            <header className={styles.hero}>
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
                    <div className={styles.contentShell}>
                        <div className={styles.grid}>
                            {cards.map((card) => (
                                <JourneyPreviewCard
                                    key={card.publicId}
                                    href={`/${lang}/journeys/${card.publicId}`}
                                    variant="glimmer"
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
                    </div>

                    <PaginationNav
                        ariaLabel="Journey list pagination"
                        currentPage={safeCurrentPage}
                        entries={paginationEntries}
                        hasPreviousPage={hasPreviousPage}
                        hasNextPage={hasNextPage}
                        previousLabel={labels.previousPage}
                        nextLabel={labels.nextPage}
                        buildHref={(targetPage) => buildJourneyPageHref(lang, targetPage)}
                        classNames={{
                            nav: styles.pagination,
                            button: styles.pageButton,
                            buttonDisabled: styles.pageButtonDisabled,
                            numbers: styles.pageNumbers,
                            ellipsis: styles.pageEllipsis,
                            current: styles.pageNumberCurrent,
                            page: styles.pageNumber,
                        }}
                    />
                </>
            )}
        </div>
    );
}
