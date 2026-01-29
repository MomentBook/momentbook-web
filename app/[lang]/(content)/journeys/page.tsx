import type { Metadata } from "next";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { getPublicUser, publicJourneys } from "@/lib/public-content";
import { JourneyList } from "./JourneyList";
import styles from "./journeys.module.scss";

const journeyPageLabels: Record<Language, {
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  countLabel: string;
  empty: string;
  byLabel: string;
  placesLabel: string;
  photosLabel: string;
  notice: string;
}> = {
  en: {
    title: "Shared journeys",
    subtitle: "Journeys published by link from MomentBook.",
    searchPlaceholder: "Search journeys, places, or people",
    countLabel: "{count} journeys",
    empty: "No journeys match this search.",
    byLabel: "shared by",
    placesLabel: "places",
    photosLabel: "photos",
    notice: "Each journey is a single shared page. What is not published stays private.",
  },
  ko: {
    title: "공유된 여정",
    subtitle: "MomentBook에서 링크로 공유된 여정입니다.",
    searchPlaceholder: "여정, 장소, 사람을 검색",
    countLabel: "{count}개 여정",
    empty: "검색 결과가 없습니다.",
    byLabel: "공유한 사람",
    placesLabel: "곳",
    photosLabel: "장",
    notice: "여정 하나가 하나의 공유 페이지로 열립니다. 게시하지 않은 기록은 공개되지 않습니다.",
  },
  ja: {
    title: "共有された旅",
    subtitle: "MomentBookでリンク共有された旅です。",
    searchPlaceholder: "旅、場所、ユーザーを検索",
    countLabel: "{count}件の旅",
    empty: "一致する旅がありません。",
    byLabel: "共有者",
    placesLabel: "か所",
    photosLabel: "枚",
    notice: "旅ごとに共有ページが作られます。公開していない記録は表示されません。",
  },
  zh: {
    title: "已分享的行程",
    subtitle: "来自 MomentBook 的链接分享行程。",
    searchPlaceholder: "搜索行程、地点或用户",
    countLabel: "{count} 条行程",
    empty: "没有符合的行程。",
    byLabel: "分享者",
    placesLabel: "个地点",
    photosLabel: "张照片",
    notice: "每段行程对应一个分享页面。未发布的记录不会公开。",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const labels = journeyPageLabels[lang] ?? journeyPageLabels.en;
  const path = "/journeys";
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

export default async function JourneysPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const labels = journeyPageLabels[lang] ?? journeyPageLabels.en;

  const cards = publicJourneys.map((journey) => {
    const user = getPublicUser(journey.userId);
    const cover = journey.images[0];
    const meta = `${journey.recapDraft.inputSummary.totalStayPoints} ${labels.placesLabel} · ${journey.recapDraft.inputSummary.totalPhotos} ${labels.photosLabel}`;
    const searchText = [
      journey.title,
      journey.description,
      ...journey.highlights,
      ...journey.locations,
      user?.displayName,
      user?.handle,
    ]
      .filter(Boolean)
      .join(" ");

    return {
      journeyId: journey.journeyId,
      title: journey.title,
      description: journey.description,
      coverUrl: cover?.url ?? "",
      coverAlt: cover?.caption ?? journey.title,
      highlights: journey.highlights,
      userName: user?.displayName ?? "",
      userHandle: user?.handle ?? "",
      meta,
      searchText,
    };
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{labels.title}</h1>
        <p className={styles.subtitle}>{labels.subtitle}</p>
      </header>

      <p className={styles.notice}>{labels.notice}</p>

      <JourneyList
        lang={lang}
        cards={cards}
        labels={labels}
      />
    </div>
  );
}
