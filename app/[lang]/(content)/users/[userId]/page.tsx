import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./user.module.scss";
import { type Language, languageList } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { JourneyPreviewCard } from "@/components/JourneyPreviewCard";
import {
  fetchPublicUsers,
  fetchPublicUser,
  fetchUserJourneys,
  type UserJourneyApi,
} from "@/lib/public-users";
import { formatJourneyPeriodRange, readTimestamp, resolveJourneyPeriodRange } from "@/lib/journey-period";

export const revalidate = 3600;

type UserPageLabels = {
  profileEyebrow: string;
  journeys: string;
  photos: string;
  period: string;
  byLabel: string;
  publishedLabel: string;
  unknownDateLabel: string;
  previousPage: string;
  nextPage: string;
  sharedCount: string;
  untitledJourney: string;
  periodUnknown: string;
  emptyJourneys: string;
};

const JOURNEYS_PER_PAGE = 12;

const userLabels: Partial<Record<Language, UserPageLabels>> & {
  en: UserPageLabels;
} = {
  en: {
    profileEyebrow: "Published profile",
    journeys: "Journeys",
    photos: "photos",
    period: "Period",
    byLabel: "by",
    publishedLabel: "Published",
    unknownDateLabel: "Date unavailable",
    previousPage: "Previous",
    nextPage: "Next",
    sharedCount: "{count} journeys shared",
    untitledJourney: "Untitled journey",
    periodUnknown: "Time not available",
    emptyJourneys: "No published journeys yet.",
  },
  ko: {
    profileEyebrow: "공개 프로필",
    journeys: "여정",
    photos: "사진",
    period: "기간",
    byLabel: "작성자",
    publishedLabel: "게시일",
    unknownDateLabel: "날짜 정보 없음",
    previousPage: "이전",
    nextPage: "다음",
    sharedCount: "{count}개 여정 공유됨",
    untitledJourney: "제목 없는 여정",
    periodUnknown: "시간 정보 없음",
    emptyJourneys: "아직 공개된 여정이 없습니다.",
  },
  ja: {
    profileEyebrow: "公開プロフィール",
    journeys: "旅",
    photos: "写真",
    period: "期間",
    byLabel: "投稿者",
    publishedLabel: "公開日",
    unknownDateLabel: "日付情報なし",
    previousPage: "前へ",
    nextPage: "次へ",
    sharedCount: "{count}件の旅を共有",
    untitledJourney: "タイトル未設定の旅",
    periodUnknown: "時間情報なし",
    emptyJourneys: "公開された旅はまだありません。",
  },
  zh: {
    profileEyebrow: "公开资料",
    journeys: "行程",
    photos: "照片",
    period: "时间",
    byLabel: "作者",
    publishedLabel: "发布日期",
    unknownDateLabel: "暂无日期信息",
    previousPage: "上一页",
    nextPage: "下一页",
    sharedCount: "已分享 {count} 条行程",
    untitledJourney: "未命名行程",
    periodUnknown: "暂无时间信息",
    emptyJourneys: "暂时没有公开行程。",
  },
  es: {
    profileEyebrow: "Perfil publicado",
    journeys: "Viajes",
    photos: "fotos",
    period: "Periodo",
    byLabel: "por",
    publishedLabel: "Publicado",
    unknownDateLabel: "Fecha no disponible",
    previousPage: "Anterior",
    nextPage: "Siguiente",
    sharedCount: "{count} viajes compartidos",
    untitledJourney: "Viaje sin titulo",
    periodUnknown: "Horario no disponible",
    emptyJourneys: "Aun no hay viajes publicados.",
  },
  pt: {
    profileEyebrow: "Perfil publicado",
    journeys: "Jornadas",
    photos: "fotos",
    period: "Periodo",
    byLabel: "por",
    publishedLabel: "Publicado em",
    unknownDateLabel: "Data indisponivel",
    previousPage: "Anterior",
    nextPage: "Proxima",
    sharedCount: "{count} jornadas compartilhadas",
    untitledJourney: "Jornada sem titulo",
    periodUnknown: "Horario indisponivel",
    emptyJourneys: "Ainda nao ha jornadas publicadas.",
  },
  fr: {
    profileEyebrow: "Profil public",
    journeys: "Voyages",
    photos: "photos",
    period: "Periode",
    byLabel: "par",
    publishedLabel: "Publie",
    unknownDateLabel: "Date indisponible",
    previousPage: "Precedent",
    nextPage: "Suivant",
    sharedCount: "{count} voyages partages",
    untitledJourney: "Voyage sans titre",
    periodUnknown: "Horaire indisponible",
    emptyJourneys: "Aucun voyage publie pour le moment.",
  },
  th: {
    profileEyebrow: "โปรไฟล์สาธารณะ",
    journeys: "ทริป",
    photos: "รูป",
    period: "ช่วงเวลา",
    byLabel: "โดย",
    publishedLabel: "วันที่เผยแพร่",
    unknownDateLabel: "ไม่มีข้อมูลวันที่",
    previousPage: "ก่อนหน้า",
    nextPage: "ถัดไป",
    sharedCount: "แชร์แล้ว {count} ทริป",
    untitledJourney: "ทริปไม่มีชื่อ",
    periodUnknown: "ไม่มีข้อมูลเวลา",
    emptyJourneys: "ยังไม่มีทริปที่เผยแพร่",
  },
  vi: {
    profileEyebrow: "Ho so cong khai",
    journeys: "Hanh trinh",
    photos: "anh",
    period: "Thoi gian",
    byLabel: "boi",
    publishedLabel: "Da dang",
    unknownDateLabel: "Khong co ngay",
    previousPage: "Truoc",
    nextPage: "Sau",
    sharedCount: "Da chia se {count} hanh trinh",
    untitledJourney: "Hanh trinh chua dat ten",
    periodUnknown: "Khong co thong tin thoi gian",
    emptyJourneys: "Chua co hanh trinh da dang.",
  },
};

const userDescriptionTemplates: Partial<Record<Language, string>> & {
  en: string;
} = {
  en: "Journeys shared by {name} on MomentBook.",
  ko: "{name}님이 MomentBook에서 공유한 여정입니다.",
  ja: "{name}さんが MomentBook で共有した旅です。",
  zh: "{name} 在 MomentBook 分享的行程。",
  es: "Viajes compartidos por {name} en MomentBook.",
  pt: "Jornadas compartilhadas por {name} no MomentBook.",
  fr: "Voyages partages par {name} sur MomentBook.",
  th: "ทริปที่ {name} แชร์บน MomentBook",
  vi: "Cac hanh trinh duoc {name} chia se tren MomentBook.",
};

function readText(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function resolveJourneyMetadata(journey: UserJourneyApi) {
  const metadata = asRecord(journey.metadata);

  return {
    title: readText(metadata?.title),
    description: readText(metadata?.description),
    thumbnailUri: readText(metadata?.thumbnailUri),
  };
}

function getJourneyCoverUrl(journey: UserJourneyApi, thumbnailUri: string | null): string | null {
  const coverCandidate =
    readText(journey.coverUrl) ?? readText(journey.thumbnailUrl) ?? thumbnailUri;

  if (coverCandidate) {
    return coverCandidate;
  }

  if (!Array.isArray(journey.images)) {
    return null;
  }

  for (const image of journey.images) {
    if (typeof image === "string") {
      const value = readText(image);
      if (value) {
        return value;
      }
      continue;
    }

    if (image && typeof image === "object") {
      const value =
        readText(image.url) ??
        readText(image.imageUrl) ??
        readText(image.src);

      if (value) {
        return value;
      }
    }
  }

  return null;
}

function getJourneyPeriodText(journey: UserJourneyApi, lang: Language, unknownLabel: string): string {
  const range = resolveJourneyPeriodRange({
    startedAt: journey.startedAt,
    endedAt: journey.endedAt,
    photoSources: [journey.images],
  });
  return formatJourneyPeriodRange(lang, range, unknownLabel);
}

function getJourneyPhotoCount(journey: UserJourneyApi): number {
  if (typeof journey.photoCount === "number" && Number.isFinite(journey.photoCount)) {
    return journey.photoCount;
  }

  return 0;
}

function parsePageParam(value: string | string[] | undefined): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

function buildPageHref(lang: Language, userId: string, page: number): string {
  if (page <= 1) {
    return `/${lang}/users/${userId}`;
  }

  return `/${lang}/users/${userId}?page=${page}`;
}

type PaginationEntry =
  | {
      type: "page";
      page: number;
    }
  | {
      type: "ellipsis";
      key: string;
    };

function buildPaginationEntries(
  currentPage: number,
  totalPages: number,
): PaginationEntry[] {
  if (totalPages <= 1) {
    return [];
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

export async function generateStaticParams() {
  const response = await fetchPublicUsers({ limit: 1000, sort: "recent" });
  const users = response?.data?.users ?? [];

  return languageList.flatMap((lang) =>
    users.map((user) => ({
      lang,
      userId: user.userId,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; userId: string }>;
}): Promise<Metadata> {
  const { lang, userId } = (await params) as { lang: Language; userId: string };
  const user = await fetchPublicUser(userId);

  if (!user) {
    return {
      title: "User not found",
    };
  }

  const description =
    user.biography?.trim() ||
    (userDescriptionTemplates[lang] ?? userDescriptionTemplates.en).replace(
      "{name}",
      user.name,
    );

  const path = `/users/${userId}`;
  const url = buildOpenGraphUrl(lang, path);

  return {
    title: `${user.name} · MomentBook`,
    description,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: `${user.name} · MomentBook`,
      description,
      type: "profile",
      url,
      images: user.picture
        ? [
            {
              url: user.picture,
              width: 800,
              height: 800,
              alt: user.name,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary",
      title: `${user.name} · MomentBook`,
      description,
      images: user.picture ? [user.picture] : [],
    },
  };
}

export default async function UserPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; userId: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { lang, userId } = (await params) as { lang: Language; userId: string };
  const { page } = (await searchParams) as { page?: string | string[] };
  const currentPage = parsePageParam(page);
  const user = await fetchPublicUser(userId);

  if (!user) {
    notFound();
  }

  const journeysResponse = await fetchUserJourneys(userId, {
    page: currentPage,
    limit: JOURNEYS_PER_PAGE,
    sort: "recent",
  });
  const journeys = journeysResponse?.data?.journeys ?? [];
  const totalJourneys =
    journeysResponse?.data?.total ?? user.publishedJourneyCount ?? journeys.length;
  const totalPagesFromApi = journeysResponse?.data?.pages;
  const totalPages =
    typeof totalPagesFromApi === "number" && totalPagesFromApi > 0
      ? totalPagesFromApi
      : Math.max(1, Math.ceil(totalJourneys / JOURNEYS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const hasPreviousPage = safeCurrentPage > 1;
  const hasNextPage = safeCurrentPage < totalPages;
  const labels = userLabels[lang] ?? userLabels.en;
  const sharedCountText = labels.sharedCount.replace(
    "{count}",
    String(user.publishedJourneyCount),
  );
  const paginationEntries = buildPaginationEntries(safeCurrentPage, totalPages);
  const profileImageUrl = readText(user.picture);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(
    buildOpenGraphUrl(lang, `/users/${user.userId}`),
    siteUrl,
  ).toString();
  const description =
    user.biography?.trim() ||
    (userDescriptionTemplates[lang] ?? userDescriptionTemplates.en).replace(
      "{name}",
      user.name,
    );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${user.name} · MomentBook`,
    url: pageUrl,
    mainEntity: {
      "@type": "Person",
      name: user.name,
      identifier: user.userId,
      description,
      image: user.picture ?? "",
      url: pageUrl,
    },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className={styles.header}>
        <div className={styles.avatarFrame}>
          <ProfileAvatar name={user.name} picture={profileImageUrl} size="profile" />
        </div>

        <div className={styles.profileBody}>
          <p className={styles.eyebrow}>{labels.profileEyebrow}</p>
          <h1 className={styles.name}>{user.name}</h1>
          <p className={styles.sharedCount}>{sharedCountText}</p>
          {user.biography && <p className={styles.bio}>{user.biography}</p>}
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{labels.journeys}</h2>
          <p className={styles.sectionCount}>{totalJourneys}</p>
        </div>

        {journeys.length === 0 ? (
          <div className={styles.emptyState}>{labels.emptyJourneys}</div>
        ) : (
          <>
            <div className={styles.journeyGrid}>
              {journeys.map((journey) => {
                const meta = resolveJourneyMetadata(journey);
                const journeyTitle = meta.title ?? readText(journey.title) ?? labels.untitledJourney;
                const journeyDescription = meta.description ?? readText(journey.description);
                const coverUrl = getJourneyCoverUrl(journey, meta.thumbnailUri);
                const photoCount = getJourneyPhotoCount(journey);
                const periodText = getJourneyPeriodText(journey, lang, labels.periodUnknown);
                const publishedAt = readTimestamp(journey.publishedAt);
                const publishedDateText = publishedAt
                  ? new Intl.DateTimeFormat(lang, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    }).format(publishedAt)
                  : labels.unknownDateLabel;

                return (
                  <JourneyPreviewCard
                    key={journey.publicId}
                    href={`/${lang}/journeys/${journey.publicId}`}
                    title={journeyTitle}
                    description={journeyDescription}
                    coverUrl={coverUrl}
                    topMeta={`${labels.publishedLabel} · ${publishedDateText}`}
                    metaItems={[
                      { label: labels.photos, value: photoCount },
                      { label: labels.period, value: periodText },
                    ]}
                    authorText={`${labels.byLabel} ${user.name}`}
                  />
                );
              })}
            </div>

            {totalPages > 1 ? (
              <nav className={styles.pagination} aria-label="Journey list pagination">
                {hasPreviousPage ? (
                  <Link
                    className={styles.pageButton}
                    href={buildPageHref(lang, user.userId, safeCurrentPage - 1)}
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
                        <span key={entry.key} className={styles.pageEllipsis} aria-hidden="true">
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
                        href={buildPageHref(lang, user.userId, entry.page)}
                      >
                        {entry.page}
                      </Link>
                    );
                  })}
                </div>

                {hasNextPage ? (
                  <Link
                    className={styles.pageButton}
                    href={buildPageHref(lang, user.userId, safeCurrentPage + 1)}
                  >
                    {labels.nextPage}
                  </Link>
                ) : (
                  <span className={styles.pageButtonDisabled}>{labels.nextPage}</span>
                )}
              </nav>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}
