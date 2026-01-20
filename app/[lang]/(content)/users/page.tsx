import type { Metadata } from "next";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { fetchPublicUsers } from "@/lib/public-users";
import { UserList } from "./UserList";
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
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const labels = userListLabels[lang] ?? userListLabels.en;

  const response = await fetchPublicUsers({ limit: 100, sort: "recent" });
  const users = response?.data?.users ?? [];

  const cards = users.map((user) => {
    const searchText = [user.name, user.biography]
      .filter(Boolean)
      .join(" ");

    return {
      userId: user.userId,
      name: user.name,
      picture: user.picture,
      biography: user.biography,
      journeyCount: user.publishedJourneyCount,
      searchText,
    };
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{labels.title}</h1>
        <p className={styles.subtitle}>{labels.subtitle}</p>
      </header>

      <UserList
        lang={lang}
        cards={cards}
        labels={labels}
      />
    </div>
  );
}
