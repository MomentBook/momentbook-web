import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { fetchPublicUsers } from "@/lib/public-users";
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
    title: "Public users",
    subtitle: "Users who share their journeys on MomentBook.",
    searchPlaceholder: "Search by name",
    countLabel: "{count} users",
    empty: "No users match this search.",
    journeysLabel: "journeys",
  },
  ko: {
    title: "공개 사용자",
    subtitle: "MomentBook에서 여정을 공유하는 사용자입니다.",
    searchPlaceholder: "이름으로 검색",
    countLabel: "{count}명",
    empty: "검색 결과가 없습니다.",
    journeysLabel: "개 여정",
  },
  ja: {
    title: "公開ユーザー",
    subtitle: "MomentBookで旅を共有しているユーザーです。",
    searchPlaceholder: "名前で検索",
    countLabel: "{count}人",
    empty: "一致するユーザーがいません。",
    journeysLabel: "件の旅",
  },
  zh: {
    title: "公开用户",
    subtitle: "在 MomentBook 上分享行程的用户。",
    searchPlaceholder: "按名称搜索",
    countLabel: "{count} 位用户",
    empty: "没有符合的用户。",
    journeysLabel: "条行程",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const labels = userListLabels[lang] ?? userListLabels.en;
  const path = "/users";
  const url = buildOpenGraphUrl(lang, path);

  return {
    title: labels.title,
    description: labels.subtitle,
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
  searchParams: Promise<{ q?: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const { q } = await searchParams as { q?: string };
  const labels = userListLabels[lang] ?? userListLabels.en;

  const response = await fetchPublicUsers({ limit: 100, sort: "recent" });
  const allUsers = response?.data?.users ?? [];

  // Server-side filtering
  const query = q?.trim().toLowerCase() || "";
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
