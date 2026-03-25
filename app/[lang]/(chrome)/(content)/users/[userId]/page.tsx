import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import styles from "./user.module.scss";
import { languageList, type Language } from "@/lib/i18n/config";
import {
  buildOpenGraphUrl,
  buildPaginatedAlternates,
} from "@/lib/i18n/metadata";
import {
  buildOpenGraphBase,
  buildPublicRobots,
  buildSeoDescription,
} from "@/lib/seo/public-metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { LocalizedDate, LocalizedDateRange } from "@/components/LocalizedTime";
import {
  fetchPublicUsers,
  fetchPublicUser,
  fetchUserJourneys,
  type PublicUserApi,
  type UserJourneyApi,
} from "@/lib/public-users";
import {
  buildPaginationEntries,
  parsePositiveIntegerPage,
} from "@/lib/pagination";
import { readTimestamp, resolveJourneyPeriodRange } from "@/lib/journey-period";

export const revalidate = 3600;

const FALLBACK_COVER_SRC = "/images/placeholders/journey-cover-fallback.svg";
const JOURNEYS_PER_PAGE = 16;

type UserPageLabels = {
  profileEyebrow: string;
  journeys: string;
  photos: string;
  period: string;
  publishedLabel: string;
  unknownDateLabel: string;
  previousPage: string;
  nextPage: string;
  sharedCount: string;
  untitledJourney: string;
  periodUnknown: string;
  emptyJourneys: string;
  pageStatus: string;
  metaPageLabel: string;
};

const userLabels: Record<Language, UserPageLabels> = {
  en: {
    profileEyebrow: "Profile",
    journeys: "Collected journeys",
    photos: "photos",
    period: "Travel period",
    publishedLabel: "Published",
    unknownDateLabel: "Date unavailable",
    previousPage: "Previous",
    nextPage: "Next",
    sharedCount: "{count} journeys",
    untitledJourney: "Untitled journey",
    periodUnknown: "Time not available",
    emptyJourneys: "No published journeys yet.",
    pageStatus: "Page {current} of {total}",
    metaPageLabel: "Page {page}",
  },
  ko: {
    profileEyebrow: "프로필",
    journeys: "기록된 여정",
    photos: "사진",
    period: "여행 기간",
    publishedLabel: "게시일",
    unknownDateLabel: "날짜 정보 없음",
    previousPage: "이전",
    nextPage: "다음",
    sharedCount: "여정 {count}개",
    untitledJourney: "제목 없는 여정",
    periodUnknown: "시간 정보 없음",
    emptyJourneys: "아직 공개된 여정이 없습니다.",
    pageStatus: "{total}페이지 중 {current}페이지",
    metaPageLabel: "{page}페이지",
  },
  ja: {
    profileEyebrow: "プロフィール",
    journeys: "記録された旅",
    photos: "写真",
    period: "旅の期間",
    publishedLabel: "公開日",
    unknownDateLabel: "日付情報なし",
    previousPage: "前へ",
    nextPage: "次へ",
    sharedCount: "{count}件の旅",
    untitledJourney: "タイトル未設定の旅",
    periodUnknown: "時間情報なし",
    emptyJourneys: "公開された旅はまだありません。",
    pageStatus: "{total}ページ中 {current}ページ",
    metaPageLabel: "{page}ページ",
  },
  zh: {
    profileEyebrow: "个人资料",
    journeys: "已记录的旅程",
    photos: "照片",
    period: "旅行时间",
    publishedLabel: "发布日期",
    unknownDateLabel: "暂无日期信息",
    previousPage: "上一页",
    nextPage: "下一页",
    sharedCount: "{count} 段旅程",
    untitledJourney: "未命名旅程",
    periodUnknown: "暂无时间信息",
    emptyJourneys: "还没有公开旅程。",
    pageStatus: "第 {current} / {total} 页",
    metaPageLabel: "第 {page} 页",
  },
  es: {
    profileEyebrow: "Perfil",
    journeys: "Viajes reunidos",
    photos: "fotos",
    period: "Período del viaje",
    publishedLabel: "Publicado",
    unknownDateLabel: "Fecha no disponible",
    previousPage: "Anterior",
    nextPage: "Siguiente",
    sharedCount: "{count} viajes",
    untitledJourney: "Viaje sin título",
    periodUnknown: "Horario no disponible",
    emptyJourneys: "Aún no hay viajes publicados.",
    pageStatus: "Página {current} de {total}",
    metaPageLabel: "Página {page}",
  },
  pt: {
    profileEyebrow: "Perfil",
    journeys: "Viagens reunidas",
    photos: "fotos",
    period: "Período da viagem",
    publishedLabel: "Publicado em",
    unknownDateLabel: "Data indisponível",
    previousPage: "Anterior",
    nextPage: "Próxima",
    sharedCount: "{count} viagens",
    untitledJourney: "Viagem sem título",
    periodUnknown: "Horário indisponível",
    emptyJourneys: "Ainda não há viagens publicadas.",
    pageStatus: "Página {current} de {total}",
    metaPageLabel: "Página {page}",
  },
  fr: {
    profileEyebrow: "Profil",
    journeys: "Voyages rassemblés",
    photos: "photos",
    period: "Période du voyage",
    publishedLabel: "Publié",
    unknownDateLabel: "Date indisponible",
    previousPage: "Précédent",
    nextPage: "Suivant",
    sharedCount: "{count} voyages",
    untitledJourney: "Voyage sans titre",
    periodUnknown: "Horaire indisponible",
    emptyJourneys: "Aucun voyage publié pour le moment.",
    pageStatus: "Page {current} sur {total}",
    metaPageLabel: "Page {page}",
  },
  th: {
    profileEyebrow: "โปรไฟล์",
    journeys: "ทริปที่บันทึกไว้",
    photos: "รูป",
    period: "ช่วงเวลาเดินทาง",
    publishedLabel: "วันที่เผยแพร่",
    unknownDateLabel: "ไม่มีข้อมูลวันที่",
    previousPage: "ก่อนหน้า",
    nextPage: "ถัดไป",
    sharedCount: "{count} ทริป",
    untitledJourney: "ทริปไม่มีชื่อ",
    periodUnknown: "ไม่มีข้อมูลเวลา",
    emptyJourneys: "ยังไม่มีทริปที่เผยแพร่",
    pageStatus: "หน้า {current} จาก {total}",
    metaPageLabel: "หน้า {page}",
  },
  vi: {
    profileEyebrow: "Hồ sơ",
    journeys: "Hành trình đã lưu",
    photos: "ảnh",
    period: "Thời gian chuyến đi",
    publishedLabel: "Đã đăng",
    unknownDateLabel: "Không có ngày",
    previousPage: "Trước",
    nextPage: "Sau",
    sharedCount: "{count} hành trình",
    untitledJourney: "Hành trình chưa đặt tên",
    periodUnknown: "Không có thông tin thời gian",
    emptyJourneys: "Chưa có hành trình đã đăng.",
    pageStatus: "Trang {current} trên {total}",
    metaPageLabel: "Trang {page}",
  },
};

const userDescriptionTemplates: Record<Language, string> = {
  en: "Public journeys, travel photos, and timeline archives shared by {name} on MomentBook.",
  ko: "{name}님이 MomentBook에서 공유한 공개 여정, 여행 사진, 타임라인 아카이브입니다.",
  ja: "{name}さんが MomentBook で共有した公開の旅、旅行写真、タイムラインアーカイブです。",
  zh: "{name} 在 MomentBook 分享的公开旅程、旅行照片与时间线档案。",
  es: "Viajes públicos, fotos de viaje y archivos de cronología compartidos por {name} en MomentBook.",
  pt: "Viagens públicas, fotos de viagem e arquivos de linha do tempo compartilhados por {name} no MomentBook.",
  fr: "Voyages publics, photos de voyage et archives de chronologie partagés par {name} sur MomentBook.",
  th: "ทริปสาธารณะ รูปท่องเที่ยว และคลังไทม์ไลน์ที่ {name} แชร์บน MomentBook",
  vi: "Hành trình công khai, ảnh du lịch và kho dòng thời gian do {name} chia sẻ trên MomentBook.",
};

const userTitleTemplates: Record<Language, string> = {
  en: "{name}'s public journeys",
  ko: "{name}님의 공개 여정",
  ja: "{name}さんの公開された旅",
  zh: "{name} 的公开旅程",
  es: "Viajes públicos de {name}",
  pt: "Viagens públicas de {name}",
  fr: "Voyages publics de {name}",
  th: "ทริปสาธารณะของ {name}",
  vi: "Hành trình công khai của {name}",
};

const userJourneyCountTemplates: Record<Language, string> = {
  en: "{count} published journeys.",
  ko: "공개 여정 {count}개.",
  ja: "公開された旅 {count}件。",
  zh: "已发布旅程 {count} 段。",
  es: "{count} viajes publicados.",
  pt: "{count} viagens publicadas.",
  fr: "{count} voyages publiés.",
  th: "ทริปที่เผยแพร่ {count} ทริป",
  vi: "{count} hành trình đã đăng.",
};

const userNotFoundTitleByLanguage: Record<Language, string> = {
  en: "User not found",
  ko: "사용자를 찾을 수 없습니다",
  ja: "ユーザーが見つかりません",
  zh: "找不到用户",
  es: "No se encontró el usuario",
  pt: "Usuário não encontrado",
  fr: "Utilisateur introuvable",
  th: "ไม่พบผู้ใช้",
  vi: "Không tìm thấy người dùng",
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

function getJourneyPeriodRange(journey: UserJourneyApi) {
  return resolveJourneyPeriodRange({
    startedAt: journey.startedAt,
    endedAt: journey.endedAt,
    photoSources: [journey.images],
  });
}

function getJourneyPhotoCount(journey: UserJourneyApi): number {
  if (typeof journey.photoCount === "number" && Number.isFinite(journey.photoCount)) {
    return journey.photoCount;
  }

  if (typeof journey.imageCount === "number" && Number.isFinite(journey.imageCount)) {
    return journey.imageCount;
  }

  return 0;
}

function buildPageHref(lang: Language, userId: string, page: number): string {
  if (page <= 1) {
    return `/${lang}/users/${userId}`;
  }

  return `/${lang}/users/${userId}?page=${page}`;
}

function formatTemplate(
  template: string,
  values: Record<string, string | number>,
): string {
  return Object.entries(values).reduce(
    (result, [key, value]) => result.replace(`{${key}}`, String(value)),
    template,
  );
}

function buildUserProfileDescription(lang: Language, user: PublicUserApi): string {
  const biography = readText(user.biography);
  const countSummary = formatTemplate(
    userJourneyCountTemplates[lang] ?? userJourneyCountTemplates.en,
    {
      count: user.publishedJourneyCount,
    },
  );
  const scopeSummary = formatTemplate(
    userDescriptionTemplates[lang] ?? userDescriptionTemplates.en,
    {
      name: user.name,
    },
  );

  return buildSeoDescription([biography, countSummary, scopeSummary]);
}

function buildUserMetadataTitle(
  lang: Language,
  userName: string,
  currentPage: number,
): string {
  const labels = userLabels[lang] ?? userLabels.en;
  const baseTitle = formatTemplate(
    userTitleTemplates[lang] ?? userTitleTemplates.en,
    { name: userName },
  );

  if (currentPage <= 1) {
    return baseTitle;
  }

  return `${baseTitle} · ${formatTemplate(labels.metaPageLabel, { page: currentPage })}`;
}

function buildUserMetadataDescription(
  lang: Language,
  user: PublicUserApi,
  currentPage: number,
): string {
  const labels = userLabels[lang] ?? userLabels.en;
  return buildSeoDescription([
    buildUserProfileDescription(lang, user),
    currentPage > 1
      ? formatTemplate(labels.metaPageLabel, { page: currentPage })
      : null,
  ]);
}

type UserJourneyCardProps = {
  journey: UserJourneyApi;
  lang: Language;
  labels: UserPageLabels;
};

function UserJourneyCard({ journey, lang, labels }: UserJourneyCardProps) {
  const meta = resolveJourneyMetadata(journey);
  const journeyTitle = meta.title ?? readText(journey.title) ?? labels.untitledJourney;
  const journeyDescription = meta.description ?? readText(journey.description);
  const coverUrl = getJourneyCoverUrl(journey, meta.thumbnailUri);
  const photoCount = getJourneyPhotoCount(journey);
  const periodRange = getJourneyPeriodRange(journey);
  const publishedAt = readTimestamp(journey.publishedAt);

  return (
    <Link
      href={`/${lang}/journeys/${journey.publicId}`}
      className={styles.journeyCard}
      aria-label={journeyTitle}
    >
      <div className={styles.journeyCover}>
        <Image
          src={coverUrl ?? FALLBACK_COVER_SRC}
          alt={coverUrl ? journeyTitle : ""}
          aria-hidden={coverUrl ? undefined : true}
          fill
          sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
          className={styles.journeyImage}
        />
        {photoCount > 0 ? (
          <span className={styles.photoBadge}>
            {photoCount} {labels.photos}
          </span>
        ) : null}
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardHeading}>
          <h3 className={styles.cardTitle}>{journeyTitle}</h3>
          <p className={styles.cardDescription}>
            {journeyDescription ?? "\u00A0"}
          </p>
        </div>

        <div className={styles.cardMeta}>
          <div className={styles.cardMetaRow}>
            <span className={styles.cardMetaLabel}>{labels.period}</span>
            <LocalizedDateRange
              lang={lang}
              start={periodRange.start}
              end={periodRange.end}
              fallback={labels.periodUnknown}
              className={styles.cardMetaValue}
            />
          </div>
          <div className={styles.cardMetaRow}>
            <span className={styles.cardMetaLabel}>{labels.publishedLabel}</span>
            <LocalizedDate
              lang={lang}
              timestamp={publishedAt}
              fallback={labels.unknownDateLabel}
              className={styles.cardMetaValueAccent}
            />
          </div>
        </div>
      </div>
    </Link>
  );
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
  searchParams,
}: {
  params: Promise<{ lang: string; userId: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}): Promise<Metadata> {
  const { lang, userId } = (await params) as { lang: Language; userId: string };
  const { page } = (await searchParams) as { page?: string | string[] };
  const currentPage = parsePositiveIntegerPage(page);
  const user = await fetchPublicUser(userId);

  if (!user) {
    return {
      title: userNotFoundTitleByLanguage[lang],
    };
  }

  const path = `/users/${userId}`;
  const openGraphPath =
    currentPage > 1 ? `${path}?page=${currentPage}` : path;
  const title = buildUserMetadataTitle(lang, user.name, currentPage);
  const description = buildUserMetadataDescription(lang, user, currentPage);

  return {
    title,
    description,
    applicationName: "MomentBook",
    authors: [
      {
        name: user.name,
        url: `/${lang}/users/${user.userId}`,
      },
    ],
    creator: "MomentBook",
    publisher: "MomentBook",
    robots: buildPublicRobots(),
    alternates: buildPaginatedAlternates(lang, path, currentPage),
    openGraph: {
      ...buildOpenGraphBase(lang, openGraphPath),
      title,
      description,
      type: "profile",
      username: user.userId,
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
      title,
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
  const currentPage = parsePositiveIntegerPage(page);
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

  if (currentPage !== safeCurrentPage) {
    redirect(buildPageHref(lang, userId, safeCurrentPage));
  }

  const hasPreviousPage = safeCurrentPage > 1;
  const hasNextPage = safeCurrentPage < totalPages;
  const labels = userLabels[lang] ?? userLabels.en;
  const sharedCountText = formatTemplate(labels.sharedCount, {
    count: user.publishedJourneyCount,
  });
  const pageStatusText = formatTemplate(labels.pageStatus, {
    current: safeCurrentPage,
    total: totalPages,
  });
  const paginationEntries = buildPaginationEntries(safeCurrentPage, totalPages, {
    includeSinglePage: false,
  });
  const profileImageUrl = readText(user.picture);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const profilePath = buildOpenGraphUrl(lang, `/users/${user.userId}`);
  const pagePath =
    safeCurrentPage > 1
      ? `${profilePath}?page=${safeCurrentPage}`
      : profilePath;
  const profileUrl = new URL(profilePath, siteUrl).toString();
  const pageUrl = new URL(pagePath, siteUrl).toString();
  const description = buildUserProfileDescription(lang, user);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: buildUserMetadataTitle(lang, user.name, safeCurrentPage),
    url: pageUrl,
    mainEntity: {
      "@type": "Person",
      name: user.name,
      identifier: user.userId,
      description,
      ...(profileImageUrl ? { image: profileImageUrl } : {}),
      url: profileUrl,
    },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.avatarHalo}>
            <div className={styles.avatarFrame}>
              <ProfileAvatar
                name={user.name}
                picture={profileImageUrl}
                size="profile"
              />
            </div>
          </div>

          <div className={styles.heroText}>
            <p className={styles.eyebrow}>{labels.profileEyebrow}</p>
            <h1 className={styles.name}>{user.name}</h1>

            <div className={styles.heroMeta}>
              <span className={styles.countBadge}>{sharedCountText}</span>
            </div>

            {user.biography ? (
              <p className={styles.bio}>{user.biography}</p>
            ) : null}
          </div>
        </div>
      </header>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeadingGroup}>
            <p className={styles.sectionEyebrow}>{labels.profileEyebrow}</p>
            <h2 className={styles.sectionTitle}>{labels.journeys}</h2>
          </div>

          <div className={styles.sectionSummary}>
            <p className={styles.sectionCount}>{sharedCountText}</p>
            {totalPages > 1 ? (
              <p className={styles.pageStatus}>{pageStatusText}</p>
            ) : null}
          </div>
        </div>

        {journeys.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyDivider} />
            <p className={styles.emptyTitle}>{labels.emptyJourneys}</p>
            <div className={styles.emptyDivider} />
          </div>
        ) : (
          <>
            <div className={styles.journeyGrid}>
              {journeys.map((journey) => (
                <UserJourneyCard
                  key={journey.publicId}
                  journey={journey}
                  lang={lang}
                  labels={labels}
                />
              ))}
            </div>

            {totalPages > 1 ? (
              <nav className={styles.pagination} aria-label={labels.journeys}>
                {hasPreviousPage ? (
                  <Link
                    href={buildPageHref(lang, userId, safeCurrentPage - 1)}
                    className={styles.pageButton}
                  >
                    {labels.previousPage}
                  </Link>
                ) : (
                  <span className={styles.pageButtonDisabled}>
                    {labels.previousPage}
                  </span>
                )}

                <div className={styles.pageNumbers}>
                  {paginationEntries.map((entry) =>
                    entry.type === "ellipsis" ? (
                      <span key={entry.key} className={styles.pageEllipsis}>
                        ...
                      </span>
                    ) : entry.page === safeCurrentPage ? (
                      <span
                        key={entry.page}
                        className={styles.pageNumberCurrent}
                        aria-current="page"
                      >
                        {entry.page}
                      </span>
                    ) : (
                      <Link
                        key={entry.page}
                        href={buildPageHref(lang, userId, entry.page)}
                        className={styles.pageNumber}
                      >
                        {entry.page}
                      </Link>
                    ),
                  )}
                </div>

                {hasNextPage ? (
                  <Link
                    href={buildPageHref(lang, userId, safeCurrentPage + 1)}
                    className={styles.pageButton}
                  >
                    {labels.nextPage}
                  </Link>
                ) : (
                  <span className={styles.pageButtonDisabled}>
                    {labels.nextPage}
                  </span>
                )}
              </nav>
            ) : null}
          </>
        )}
      </section>
    </div>
  );
}
