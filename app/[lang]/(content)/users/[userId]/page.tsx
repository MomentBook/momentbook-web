import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./user.module.scss";
import { LocalizedJourneyPeriod } from "./LocalizedJourneyPeriod";
import { type Language, languageList } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
  fetchPublicUsers,
  fetchPublicUser,
  fetchUserJourneys,
  type UserJourneyApi,
} from "@/lib/public-users";

export const revalidate = 3600;

type UserPageLabels = {
  profileEyebrow: string;
  journeys: string;
  photos: string;
  period: string;
  sharedCount: string;
  untitledJourney: string;
  journeyDescriptionFallback: string;
  periodUnknown: string;
  emptyJourneys: string;
};

const userLabels: Partial<Record<Language, UserPageLabels>> & {
  en: UserPageLabels;
} = {
  en: {
    profileEyebrow: "Published profile",
    journeys: "Journeys",
    photos: "photos",
    period: "Period",
    sharedCount: "{count} journeys shared",
    untitledJourney: "Untitled journey",
    journeyDescriptionFallback: "A published journey page from MomentBook.",
    periodUnknown: "Time not available",
    emptyJourneys: "No published journeys yet.",
  },
  ko: {
    profileEyebrow: "공개 프로필",
    journeys: "여정",
    photos: "장",
    period: "기간",
    sharedCount: "{count}개 여정 공유됨",
    untitledJourney: "제목 없는 여정",
    journeyDescriptionFallback: "MomentBook에 공개된 여정 페이지입니다.",
    periodUnknown: "시간 정보 없음",
    emptyJourneys: "아직 공개된 여정이 없습니다.",
  },
  ja: {
    profileEyebrow: "公開プロフィール",
    journeys: "旅",
    photos: "枚",
    period: "期間",
    sharedCount: "{count}件の旅を共有",
    untitledJourney: "タイトル未設定の旅",
    journeyDescriptionFallback: "MomentBookで公開された旅ページです。",
    periodUnknown: "時間情報なし",
    emptyJourneys: "公開された旅はまだありません。",
  },
  zh: {
    profileEyebrow: "公开资料",
    journeys: "行程",
    photos: "张照片",
    period: "时间",
    sharedCount: "已分享 {count} 条行程",
    untitledJourney: "未命名行程",
    journeyDescriptionFallback: "这是来自 MomentBook 的公开行程页面。",
    periodUnknown: "暂无时间信息",
    emptyJourneys: "暂时没有公开行程。",
  },
  es: {
    profileEyebrow: "Perfil publicado",
    journeys: "Viajes",
    photos: "fotos",
    period: "Periodo",
    sharedCount: "{count} viajes compartidos",
    untitledJourney: "Viaje sin titulo",
    journeyDescriptionFallback: "Una pagina de viaje publicada desde MomentBook.",
    periodUnknown: "Horario no disponible",
    emptyJourneys: "Aun no hay viajes publicados.",
  },
  pt: {
    profileEyebrow: "Perfil publicado",
    journeys: "Jornadas",
    photos: "fotos",
    period: "Periodo",
    sharedCount: "{count} jornadas compartilhadas",
    untitledJourney: "Jornada sem titulo",
    journeyDescriptionFallback: "Uma pagina de jornada publicada no MomentBook.",
    periodUnknown: "Horario indisponivel",
    emptyJourneys: "Ainda nao ha jornadas publicadas.",
  },
  fr: {
    profileEyebrow: "Profil public",
    journeys: "Voyages",
    photos: "photos",
    period: "Periode",
    sharedCount: "{count} voyages partages",
    untitledJourney: "Voyage sans titre",
    journeyDescriptionFallback: "Une page de voyage publiee depuis MomentBook.",
    periodUnknown: "Horaire indisponible",
    emptyJourneys: "Aucun voyage publie pour le moment.",
  },
  th: {
    profileEyebrow: "โปรไฟล์สาธารณะ",
    journeys: "ทริป",
    photos: "รูป",
    period: "ช่วงเวลา",
    sharedCount: "แชร์แล้ว {count} ทริป",
    untitledJourney: "ทริปไม่มีชื่อ",
    journeyDescriptionFallback: "หน้าทริปที่เผยแพร่จาก MomentBook",
    periodUnknown: "ไม่มีข้อมูลเวลา",
    emptyJourneys: "ยังไม่มีทริปที่เผยแพร่",
  },
  vi: {
    profileEyebrow: "Ho so cong khai",
    journeys: "Hanh trinh",
    photos: "anh",
    period: "Thoi gian",
    sharedCount: "Da chia se {count} hanh trinh",
    untitledJourney: "Hanh trinh chua dat ten",
    journeyDescriptionFallback: "Trang hanh trinh da dang tu MomentBook.",
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

function readTimestamp(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function getJourneyCoverUrl(journey: UserJourneyApi): string | null {
  const coverCandidate =
    readText(journey.coverUrl) ?? readText(journey.thumbnailUrl);

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

function getJourneyStartedAt(journey: UserJourneyApi): number | undefined {
  return readTimestamp(journey.startedAt) ?? undefined;
}

function getJourneyEndedAt(journey: UserJourneyApi): number | undefined {
  return readTimestamp(journey.endedAt) ?? undefined;
}

function getJourneyPhotoCount(journey: UserJourneyApi): number {
  if (typeof journey.photoCount === "number" && Number.isFinite(journey.photoCount)) {
    return journey.photoCount;
  }

  return 0;
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
}: {
  params: Promise<{ lang: string; userId: string }>;
}) {
  const { lang, userId } = (await params) as { lang: Language; userId: string };
  const user = await fetchPublicUser(userId);

  if (!user) {
    notFound();
  }

  const journeysResponse = await fetchUserJourneys(userId, { limit: 100 });
  const journeys = journeysResponse?.data?.journeys ?? [];
  const labels = userLabels[lang] ?? userLabels.en;
  const sharedCountText = labels.sharedCount.replace(
    "{count}",
    String(user.publishedJourneyCount),
  );

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
          {user.picture ? (
            <Image
              src={user.picture}
              alt={user.name}
              fill
              sizes="120px"
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarFallback}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
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
          <p className={styles.sectionCount}>{journeys.length}</p>
        </div>

        {journeys.length === 0 ? (
          <div className={styles.emptyState}>{labels.emptyJourneys}</div>
        ) : (
          <div className={styles.journeyList}>
            {journeys.map((journey) => {
              const journeyTitle = readText(journey.title) ?? labels.untitledJourney;
              const journeyDescription =
                readText(journey.description) ?? labels.journeyDescriptionFallback;
              const coverUrl = getJourneyCoverUrl(journey);
              const startedAt = getJourneyStartedAt(journey);
              const endedAt = getJourneyEndedAt(journey);
              const photoCount = getJourneyPhotoCount(journey);

              return (
                <Link
                  key={journey.publicId}
                  href={`/${lang}/journeys/${journey.publicId}`}
                  className={styles.journeyCard}
                >
                  <div className={styles.coverImageFrame}>
                    {coverUrl ? (
                      <Image
                        src={coverUrl}
                        alt={journeyTitle}
                        fill
                        sizes="(max-width: 768px) 100vw, 280px"
                        className={styles.coverImage}
                      />
                    ) : (
                      <div className={styles.coverFallback}>
                        <Image
                          src="/images/placeholders/journey-cover-fallback.svg"
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 280px"
                          className={styles.coverFallbackImage}
                        />
                      </div>
                    )}
                  </div>

                  <article className={styles.journeyBody}>
                    <h3 className={styles.journeyTitle}>{journeyTitle}</h3>
                    <p className={styles.journeyDescription}>{journeyDescription}</p>
                    <p className={styles.metaLine}>
                      <span className={styles.metaLabel}>{labels.period}</span>
                      <LocalizedJourneyPeriod
                        lang={lang}
                        startedAt={startedAt}
                        endedAt={endedAt}
                        unknownLabel={labels.periodUnknown}
                        className={styles.metaValue}
                      />
                    </p>
                    <p className={styles.metaLine}>
                      <span className={styles.metaLabel}>{labels.photos}</span>
                      <span className={styles.metaValue}>{photoCount}</span>
                    </p>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
