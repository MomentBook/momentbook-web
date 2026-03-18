import type { Metadata } from "next";
import Link from "next/link";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { fetchPublicUsers } from "@/lib/public-users";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";
import { UserSearchForm } from "./UserSearchForm";
import styles from "./users.module.scss";

export const revalidate = 3600;

type UserListLabels = {
  title: string;
  subtitle: string;
  directoryEyebrow: string;
  resultsEyebrow: string;
  searchPlaceholder: string;
  searchButton: string;
  clearSearch: string;
  countLabel: string;
  empty: string;
  journeysLabel: string;
  viewProfile: string;
};

const userListLabels: Record<Language, UserListLabels> = {
  en: {
    title: "Public profiles",
    subtitle: "Profiles that share public journeys on MomentBook.",
    directoryEyebrow: "Public directory",
    resultsEyebrow: "Profiles",
    searchPlaceholder: "Search by name or biography",
    searchButton: "Search",
    clearSearch: "Clear search",
    countLabel: "{count} users",
    empty: "No profiles match this search.",
    journeysLabel: "journeys",
    viewProfile: "View profile",
  },
  ko: {
    title: "공개 프로필",
    subtitle: "MomentBook에서 공개 여정을 공유하는 프로필입니다.",
    directoryEyebrow: "공개 디렉터리",
    resultsEyebrow: "프로필",
    searchPlaceholder: "이름 또는 소개로 검색",
    searchButton: "검색",
    clearSearch: "검색 지우기",
    countLabel: "{count}명",
    empty: "검색 결과가 없습니다.",
    journeysLabel: "개 여정",
    viewProfile: "프로필 보기",
  },
  ja: {
    title: "公開プロフィール",
    subtitle: "MomentBookで公開された旅を共有しているプロフィールです。",
    directoryEyebrow: "公開ディレクトリ",
    resultsEyebrow: "プロフィール",
    searchPlaceholder: "名前または紹介文で検索",
    searchButton: "検索",
    clearSearch: "検索をクリア",
    countLabel: "{count}人",
    empty: "一致するプロフィールがありません。",
    journeysLabel: "件の旅",
    viewProfile: "プロフィールを見る",
  },
  zh: {
    title: "公开个人资料",
    subtitle: "在 MomentBook 分享公开旅程的个人资料。",
    directoryEyebrow: "公开目录",
    resultsEyebrow: "个人资料",
    searchPlaceholder: "按名称或简介搜索",
    searchButton: "搜索",
    clearSearch: "清除搜索",
    countLabel: "{count} 位用户",
    empty: "没有符合的个人资料。",
    journeysLabel: "段旅程",
    viewProfile: "查看资料",
  },
  es: {
    title: "Perfiles públicos",
    subtitle: "Perfiles que comparten viajes públicos en MomentBook.",
    directoryEyebrow: "Directorio público",
    resultsEyebrow: "Perfiles",
    searchPlaceholder: "Buscar por nombre o biografía",
    searchButton: "Buscar",
    clearSearch: "Borrar búsqueda",
    countLabel: "{count} usuarios",
    empty: "No hay perfiles que coincidan.",
    journeysLabel: "viajes",
    viewProfile: "Ver perfil",
  },
  pt: {
    title: "Perfis públicos",
    subtitle: "Perfis que compartilham viagens públicas no MomentBook.",
    directoryEyebrow: "Diretório público",
    resultsEyebrow: "Perfis",
    searchPlaceholder: "Buscar por nome ou biografia",
    searchButton: "Buscar",
    clearSearch: "Limpar busca",
    countLabel: "{count} usuários",
    empty: "Nenhum perfil corresponde à busca.",
    journeysLabel: "viagens",
    viewProfile: "Ver perfil",
  },
  fr: {
    title: "Profils publics",
    subtitle: "Profils qui partagent des voyages publics sur MomentBook.",
    directoryEyebrow: "Répertoire public",
    resultsEyebrow: "Profils",
    searchPlaceholder: "Rechercher par nom ou biographie",
    searchButton: "Rechercher",
    clearSearch: "Effacer la recherche",
    countLabel: "{count} utilisateurs",
    empty: "Aucun profil ne correspond à la recherche.",
    journeysLabel: "voyages",
    viewProfile: "Voir le profil",
  },
  th: {
    title: "โปรไฟล์สาธารณะ",
    subtitle: "โปรไฟล์ที่แชร์ทริปจาก MomentBook",
    directoryEyebrow: "ไดเรกทอรีสาธารณะ",
    resultsEyebrow: "โปรไฟล์",
    searchPlaceholder: "ค้นหาด้วยชื่อหรือคำแนะนำตัว",
    searchButton: "ค้นหา",
    clearSearch: "ล้างการค้นหา",
    countLabel: "{count} ผู้ใช้",
    empty: "ไม่พบโปรไฟล์ที่ตรงกัน",
    journeysLabel: "ทริป",
    viewProfile: "ดูโปรไฟล์",
  },
  vi: {
    title: "Hồ sơ công khai",
    subtitle: "Hồ sơ chia sẻ hành trình từ MomentBook.",
    directoryEyebrow: "Danh mục công khai",
    resultsEyebrow: "Hồ sơ",
    searchPlaceholder: "Tìm theo tên hoặc tiểu sử",
    searchButton: "Tìm kiếm",
    clearSearch: "Xóa tìm kiếm",
    countLabel: "{count} người dùng",
    empty: "Không có hồ sơ phù hợp.",
    journeysLabel: "hành trình",
    viewProfile: "Xem hồ sơ",
  },
};

function readSearchQuery(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    for (const candidate of value) {
      if (typeof candidate !== "string") {
        continue;
      }

      const trimmed = candidate.trim();
      if (trimmed.length > 0) {
        return trimmed;
      }
    }

    return "";
  }

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
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

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const { q } = await searchParams as { q?: string | string[] };
  const labels = userListLabels[lang] ?? userListLabels.en;
  const query = readSearchQuery(q);
  const path = "/users";
  const url = buildOpenGraphUrl(lang, path);
  const shouldNoIndexSearchResults = query.length > 0;

  return {
    title: labels.title,
    description: labels.subtitle,
    robots: shouldNoIndexSearchResults
      ? {
          index: false,
          follow: true,
          googleBot: {
            index: false,
            follow: true,
          },
        }
      : buildPublicRobots(),
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: labels.title,
      description: labels.subtitle,
      url,
    },
    twitter: {
      card: "summary",
      title: labels.title,
      description: labels.subtitle,
    },
  };
}

export default async function UsersPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { lang } = await params as { lang: Language };
  const { q } = await searchParams as { q?: string | string[] };
  const labels = userListLabels[lang] ?? userListLabels.en;

  const response = await fetchPublicUsers({ limit: 100, sort: "recent" });
  const allUsers = response?.data?.users ?? [];

  const query = readSearchQuery(q).toLowerCase();
  const isFiltering = query.length > 0;
  const filteredUsers = isFiltering
    ? allUsers.filter((user) => {
        const searchText = [user.name, user.biography]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchText.includes(query);
      })
    : allUsers;

  const countText = formatTemplate(labels.countLabel, {
    count: filteredUsers.length,
  });
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/users"), siteUrl).toString();
  const shouldExposeStructuredData = !isFiltering;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: labels.title,
    description: labels.subtitle,
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: filteredUsers.length,
      itemListElement: filteredUsers.map((user, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: new URL(
          buildOpenGraphUrl(lang, `/users/${user.userId}`),
          siteUrl,
        ).toString(),
        name: user.name,
      })),
    },
  };

  return (
    <div className={styles.page}>
      {shouldExposeStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      ) : null}

      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.backdropOrbPrimary} />
        <div className={styles.backdropOrbSecondary} />
        <div className={styles.backdropLine} />
      </div>

      <header className={styles.hero}>
        <p className={styles.kicker}>{labels.directoryEyebrow}</p>
        <h1 className={styles.title}>{labels.title}</h1>
        <p className={styles.subtitle}>{labels.subtitle}</p>

        <div className={styles.searchShell}>
          <UserSearchForm
            lang={lang}
            placeholder={labels.searchPlaceholder}
            submitLabel={labels.searchButton}
          />
        </div>
      </header>

      <section className={styles.contentShell}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeading}>
            <p className={styles.sectionEyebrow}>{labels.resultsEyebrow}</p>
            <h2 className={styles.sectionTitle}>{countText}</h2>
          </div>

          {isFiltering ? (
            <Link href={`/${lang}/users`} className={styles.clearLink}>
              {labels.clearSearch}
            </Link>
          ) : null}
        </div>

        {filteredUsers.length > 0 ? (
          <div className={styles.grid}>
            {filteredUsers.map((user) => (
              <Link
                key={user.userId}
                href={`/${lang}/users/${user.userId}`}
                className={styles.card}
              >
                <div className={styles.cardTop}>
                  <div className={styles.avatarShell}>
                    <ProfileAvatar
                      name={user.name}
                      picture={user.picture}
                      size="profile"
                    />
                  </div>

                  <div className={styles.cardIdentity}>
                    <p className={styles.name}>{user.name}</p>
                  </div>
                </div>

                {user.biography ? (
                  <p className={styles.bio}>{user.biography}</p>
                ) : (
                  <div className={styles.bioSpacer} aria-hidden="true" />
                )}

                <div className={styles.cardFooter}>
                  <span className={styles.metaPill}>
                    {user.publishedJourneyCount} {labels.journeysLabel}
                  </span>
                  <span className={styles.viewLink}>
                    {labels.viewProfile}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" className={styles.emptyIconSvg}>
                <path
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0a7 7 0 0 1 14 0Z"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                />
              </svg>
            </div>
            <p className={styles.emptyTitle}>{labels.empty}</p>
            {isFiltering ? (
              <Link href={`/${lang}/users`} className={styles.emptyAction}>
                {labels.clearSearch}
              </Link>
            ) : null}
          </div>
        )}
      </section>
    </div>
  );
}
