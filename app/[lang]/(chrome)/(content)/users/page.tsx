import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { fetchPublicUsers } from "@/lib/public-users";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";
import { UserSearchForm } from "./UserSearchForm";
import styles from "./users.module.scss";

export const revalidate = 3600;

const userListLabels: Record<Language, {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  countLabel: string;
  empty: string;
  journeysLabel: string;
}> = {
  en: {
    title: "Public profiles",
    subtitle: "Profiles that share public journeys on MomentBook.",
    searchPlaceholder: "Search by name",
    countLabel: "{count} users",
    empty: "No profiles match this search.",
    journeysLabel: "journeys",
  },
  ko: {
    title: "공개 프로필",
    subtitle: "MomentBook에서 공개 여정을 공유하는 프로필입니다.",
    searchPlaceholder: "이름으로 검색",
    countLabel: "{count}명",
    empty: "검색 결과가 없습니다.",
    journeysLabel: "개 여정",
  },
  ja: {
    title: "公開プロフィール",
    subtitle: "MomentBookで公開された旅を共有しているプロフィールです。",
    searchPlaceholder: "名前で検索",
    countLabel: "{count}人",
    empty: "一致するプロフィールがありません。",
    journeysLabel: "件の旅",
  },
  zh: {
    title: "公开个人资料",
    subtitle: "在 MomentBook 分享公开旅程的个人资料。",
    searchPlaceholder: "按名称搜索",
    countLabel: "{count} 位用户",
    empty: "没有符合的个人资料。",
    journeysLabel: "段旅程",
  },
  es: {
    title: "Perfiles públicos",
    subtitle: "Perfiles que comparten viajes públicos en MomentBook.",
    searchPlaceholder: "Buscar por nombre",
    countLabel: "{count} usuarios",
    empty: "No hay perfiles que coincidan.",
    journeysLabel: "viajes",
  },
  pt: {
    title: "Perfis públicos",
    subtitle: "Perfis que compartilham viagens públicas no MomentBook.",
    searchPlaceholder: "Buscar por nome",
    countLabel: "{count} usuários",
    empty: "Nenhum perfil corresponde à busca.",
    journeysLabel: "viagens",
  },
  fr: {
    title: "Profils publics",
    subtitle: "Profils qui partagent des voyages publics sur MomentBook.",
    searchPlaceholder: "Rechercher par nom",
    countLabel: "{count} utilisateurs",
    empty: "Aucun profil ne correspond à la recherche.",
    journeysLabel: "voyages",
  },
  th: {
    title: "โปรไฟล์สาธารณะ",
    subtitle: "โปรไฟล์ที่แชร์ทริปจาก MomentBook",
    searchPlaceholder: "ค้นหาด้วยชื่อ",
    countLabel: "{count} ผู้ใช้",
    empty: "ไม่พบโปรไฟล์ที่ตรงกัน",
    journeysLabel: "ทริป",
  },
  vi: {
    title: "Hồ sơ công khai",
    subtitle: "Hồ sơ chia sẻ hành trình từ MomentBook.",
    searchPlaceholder: "Tìm theo tên",
    countLabel: "{count} người dùng",
    empty: "Không có hồ sơ phù hợp.",
    journeysLabel: "hành trình",
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

  // Server-side filtering
  const query = readSearchQuery(q).toLowerCase();
  const filteredUsers = query
    ? allUsers.filter((user) => {
        const searchText = [user.name, user.biography]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return searchText.includes(query);
      })
    : allUsers;

  const countText = labels.countLabel.replace("{count}", String(filteredUsers.length));
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/users"), siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: labels.title,
    description: labels.subtitle,
    url: pageUrl,
    mainEntity: {
      "@type": "ItemList",
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <header className={styles.header}>
        <h1 className={styles.title}>{labels.title}</h1>
        <p className={styles.subtitle}>{labels.subtitle}</p>
      </header>

      <div className={styles.listSection}>
        <div className={styles.searchRow}>
          <UserSearchForm lang={lang} placeholder={labels.searchPlaceholder} />
          <p className={styles.countText}>{countText}</p>
        </div>

        <div className={styles.grid}>
          {filteredUsers.map((user) => (
            <Link
              key={user.userId}
              href={`/${lang}/users/${user.userId}`}
              className={styles.card}
            >
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
              <div className={styles.cardBody}>
                <p className={styles.name}>{user.name}</p>
                {user.biography && <p className={styles.bio}>{user.biography}</p>}
                <p className={styles.meta}>
                  {user.publishedJourneyCount} {labels.journeysLabel}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className={styles.emptyState}>{labels.empty}</div>
        )}
      </div>
    </div>
  );
}
