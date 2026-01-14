import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./page.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

type HomeCard = {
  title: string;
  text: string;
};

type HomePreview = {
  deviceText: string;
  caption: string;
};

type HomeContent = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  lead: string;
  note: string;
  primaryCta: string;
  secondaryCta: string;
  heroDeviceImage: string;
  heroDeviceAlt: string;
  heroVisualCaption: string;
  highlightTitle: string;
  highlightLead: string;
  highlightCards: HomeCard[];
  storyTitle: string;
  storyLead: string;
  storyParagraphs: string[];
  storyListTitle: string;
  storyList: string[];
  previewTitle: string;
  previewLead: string;
  previewItems: HomePreview[];
  finalTitle: string;
  finalLead: string;
  finalCta: string;
  finalNote: string;
};

const homeContent: Record<Language, HomeContent> = {
  en: {
    metaTitle: "MomentBook",
    metaDescription: "Track your day's journey and share your places and photos in one app.",
    eyebrow: "MomentBook",
    title: "Save travel and daily moments in one place",
    lead: "Track your day's journey—places, photos, and moments—then share it when you choose.",
    note: "Offline first. Sync optional. Travel alerts and journey-end reminders when it helps.",
    primaryCta: "Download MomentBook",
    secondaryCta: "See how it works",
    heroDeviceImage: "/device-mocks/home-en.png",
    heroDeviceAlt: "MomentBook home screen in English",
    heroVisualCaption: "Grouped into a journey timeline.",
    highlightTitle: "Built for quick recall",
    highlightLead: "Fast capture, automatic organization, sharing when you choose.",
    highlightCards: [
      {
        title: "Fast capture",
        text: "Save a photo or a short note in seconds.",
      },
      {
        title: "Auto organization",
        text: "Moments group into a journey timeline with places and photos.",
      },
      {
        title: "Private by default",
        text: "Publish a journey only when you choose.",
      },
    ],
    storyTitle: "Your journey, captured",
    storyLead: "See where you went and what you captured, then share when you're ready.",
    storyParagraphs: [
      "MomentBook tracks your day’s path so you can review the places you visited and the photos you took.",
      "Publish a journey to share it on the web, or keep it private.",
    ],
    storyListTitle: "Core features",
    storyList: [
      "Journey timeline",
      "Places and photo highlights",
      "Publish to the web",
      "Travel alerts",
      "Journey-end reminders",
    ],
    previewTitle: "What you'll share",
    previewLead: "A journey summary and a shareable page.",
    previewItems: [
      { deviceText: "Journey timeline", caption: "See places and photos in order." },
      { deviceText: "Share page", caption: "Publish your journey when ready." },
    ],
    finalTitle: "Install and start",
    finalLead: "Available now on iOS and Android.",
    finalCta: "Go to download",
    finalNote: "Set up takes less than a minute.",
  },
  ko: {
    metaTitle: "MomentBook",
    metaDescription: "하루의 여정을 기록하고 사진과 장소를 공유하세요.",
    eyebrow: "MomentBook",
    title: "여행과 일상의 순간을 한곳에 저장하세요",
    lead: "하루의 여정을 트래킹해 방문한 장소와 사진을 기록하고, 원할 때 게시해 공유합니다.",
    note: "오프라인 사용 가능. 동기화는 선택. 이동 감지/여정 마무리 알림 제공.",
    primaryCta: "MomentBook 다운로드",
    secondaryCta: "작동 방식",
    heroDeviceImage: "/device-mocks/home-ko.png",
    heroDeviceAlt: "한국어 MomentBook 홈 화면",
    heroVisualCaption: "여정 타임라인으로 정리됩니다.",
    highlightTitle: "빠르게 기록하는 방법",
    highlightLead: "빠른 입력, 자동 정리, 공유는 선택.",
    highlightCards: [
      {
        title: "빠른 기록",
        text: "사진이나 짧은 메모만 남기면 됩니다.",
      },
      {
        title: "자동 정리",
        text: "방문한 장소와 사진이 여정 타임라인으로 정리됩니다.",
      },
      {
        title: "기본은 비공개",
        text: "게시할 때만 웹에 공개됩니다.",
      },
    ],
    storyTitle: "여정을 기록하고 공유",
    storyLead: "내가 어디를 갔고 무엇을 찍었는지 한눈에 보고 공유합니다.",
    storyParagraphs: [
      "하루의 이동 경로와 방문한 장소, 찍은 사진이 여정으로 정리됩니다.",
      "게시하면 웹에 공유되어 다른 사람들에게 여정을 알릴 수 있습니다.",
    ],
    storyListTitle: "핵심 기능",
    storyList: ["여정 타임라인", "장소·사진 하이라이트", "웹 게시", "이동 감지 알림", "여정 마무리 알림"],
    previewTitle: "여정 화면",
    previewLead: "방문한 장소와 사진을 정리하고 공유합니다.",
    previewItems: [
      { deviceText: "여정 타임라인", caption: "방문 순서대로 정리." },
      { deviceText: "공유 페이지", caption: "게시하면 웹에 공개." },
    ],
    finalTitle: "지금 시작하세요",
    finalLead: "iOS와 Android에서 바로 설치할 수 있습니다.",
    finalCta: "다운로드 페이지로",
    finalNote: "설정은 1분 내에 끝납니다.",
  },
  ja: {
    metaTitle: "MomentBook",
    metaDescription: "一日の旅を記録し、場所や写真を共有できるアプリ。",
    eyebrow: "MomentBook",
    title: "旅と日常の瞬間を一つに保存",
    lead: "一日の旅を記録し、訪れた場所や写真を残して、必要なら公開して共有できます。",
    note: "オフライン対応。同期は任意。移動検知と旅の終了リマインドあり。",
    primaryCta: "MomentBook をダウンロード",
    secondaryCta: "仕組みを見る",
    heroDeviceImage: "/device-mocks/home-ja.png",
    heroDeviceAlt: "日本語の MomentBook ホーム画面",
    heroVisualCaption: "旅のタイムラインとして整理します。",
    highlightTitle: "すぐに記録できる",
    highlightLead: "素早い入力、整理、公開は任意。",
    highlightCards: [
      {
        title: "すばやく記録",
        text: "写真や短いメモだけで十分です。",
      },
      {
        title: "自動で整理",
        text: "訪れた場所と写真が旅のタイムラインにまとまります。",
      },
      {
        title: "基本は非公開",
        text: "投稿するとWebで公開されます。",
      },
    ],
    storyTitle: "旅を記録して共有",
    storyLead: "どこへ行き何を撮ったかをまとめ、必要なら共有できます。",
    storyParagraphs: [
      "一日の移動と訪れた場所、撮った写真が旅として整理されます。",
      "投稿するとWebで公開され、他の人に旅を共有できます。",
    ],
    storyListTitle: "主な機能",
    storyList: ["旅のタイムライン", "場所・写真のハイライト", "Webで公開", "移動検知通知", "旅の終了リマインド"],
    previewTitle: "旅の画面",
    previewLead: "旅をまとめて共有できます。",
    previewItems: [
      { deviceText: "旅のタイムライン", caption: "訪問順に並びます。" },
      { deviceText: "共有ページ", caption: "投稿するとWebで公開。" },
    ],
    finalTitle: "今すぐ始める",
    finalLead: "iOS と Android で利用できます。",
    finalCta: "ダウンロードへ",
    finalNote: "設定は1分ほどで完了します。",
  },
  zh: {
    metaTitle: "MomentBook",
    metaDescription: "记录一天的行程，并分享地点与照片。",
    eyebrow: "MomentBook",
    title: "把旅行与日常的瞬间集中保存",
    lead: "记录一天的行程，保留去过的地点和拍下的照片，并可在发布后分享给他人。",
    note: "支持离线，同步可选，并提供行程变化提醒与结束提醒。",
    primaryCta: "下载 MomentBook",
    secondaryCta: "了解工作方式",
    heroDeviceImage: "/device-mocks/home-zh.png",
    heroDeviceAlt: "MomentBook 中文主屏幕",
    heroVisualCaption: "整理成行程时间线。",
    highlightTitle: "快速记录方式",
    highlightLead: "快速输入、自动整理、发布可选。",
    highlightCards: [
      {
        title: "快速记录",
        text: "一张照片或一句短句即可。",
      },
      {
        title: "自动整理",
        text: "去过的地点和照片会整理成行程时间线。",
      },
      {
        title: "默认私密",
        text: "发布后会在网页公开。",
      },
    ],
    storyTitle: "记录并分享行程",
    storyLead: "清楚看到去过哪里、拍过什么，并可选择发布分享。",
    storyParagraphs: [
      "一天的行程、到过的地点和照片会整理成完整旅程。",
      "发布后会在网页公开，方便分享给他人。",
    ],
    storyListTitle: "核心功能",
    storyList: ["行程时间线", "地点与照片亮点", "网页发布", "行程变化提醒", "行程结束提醒"],
    previewTitle: "行程界面",
    previewLead: "整理旅程并完成分享。",
    previewItems: [
      { deviceText: "行程时间线", caption: "按到访顺序整理。" },
      { deviceText: "分享页面", caption: "发布后在网页公开。" },
    ],
    finalTitle: "立即开始",
    finalLead: "iOS 与 Android 均可使用。",
    finalCta: "前往下载",
    finalNote: "设置时间不到一分钟。",
  },
};

function getHomeContent(lang: Language): HomeContent {
  return homeContent[lang] ?? homeContent.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getHomeContent(lang);
  const path = "";
  const url = buildOpenGraphUrl(lang, path);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url,
    },
    twitter: {
      card: "summary",
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getHomeContent(lang);

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <FadeIn>
              <span className={styles.eyebrow}>{content.eyebrow}</span>
            </FadeIn>
            <FadeIn delay={80}>
              <h1 className={styles.heroTitle}>{content.title}</h1>
            </FadeIn>
            <FadeIn delay={120}>
              <p className={styles.heroLead}>{content.lead}</p>
            </FadeIn>
            <FadeIn delay={160}>
              <div className={styles.heroActions}>
                <Link href={`/${lang}/download`} className={styles.primaryButton}>
                  {content.primaryCta}
                </Link>
                <Link href={`/${lang}/how-it-works`} className={styles.secondaryButton}>
                  {content.secondaryCta}
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={200}>
              <p className={styles.heroNote}>{content.note}</p>
            </FadeIn>
          </div>

          <FadeIn delay={150}>
            <div className={styles.heroVisual}>
              <DeviceMock
                className={styles.heroDevice}
                screenClassName={deviceStyles.screenMedia}
              >
                <Image
                  src={content.heroDeviceImage}
                  alt={content.heroDeviceAlt}
                  fill
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 360px, 440px"
                  className={deviceStyles.screenImage}
                />
              </DeviceMock>
              <p className={styles.heroCaption}>{content.heroVisualCaption}</p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.highlightTitle}</h2>
            <p className={styles.sectionLead}>{content.highlightLead}</p>
          </header>
          <div className={styles.highlightGrid}>
            {content.highlightCards.map((card, index) => (
              <div key={`${card.title}-${index}`} className={styles.highlightCard}>
                <h3 className={styles.cardTitle}>{card.title}</h3>
                <p className={styles.cardText}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionInnerWide}>
          <div className={styles.storyGrid}>
            <div className={styles.storyCopy}>
              <h2 className={styles.sectionTitle}>{content.storyTitle}</h2>
              <p className={styles.sectionLead}>{content.storyLead}</p>
              {content.storyParagraphs.map((paragraph, index) => (
                <p key={`${content.storyTitle}-${index}`} className={styles.storyText}>
                  {paragraph}
                </p>
              ))}
            </div>
            <div className={styles.storyPanel}>
              <h3 className={styles.storyPanelTitle}>{content.storyListTitle}</h3>
              <ul className={styles.storyList}>
                {content.storyList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInnerWide}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.previewTitle}</h2>
            <p className={styles.sectionLead}>{content.previewLead}</p>
          </header>
          <div className={styles.previewGrid}>
            {content.previewItems.map((item, index) => (
              <div key={`${item.deviceText}-${index}`} className={styles.previewCard}>
                <DeviceMock className={styles.previewDevice}>
                  <span>{item.deviceText}</span>
                </DeviceMock>
                <p className={styles.previewCaption}>{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.final}>
        <div className={styles.finalInner}>
          <h2 className={styles.finalTitle}>{content.finalTitle}</h2>
          <p className={styles.finalLead}>{content.finalLead}</p>
          <Link href={`/${lang}/download`} className={styles.primaryButton}>
            {content.finalCta}
          </Link>
          <p className={styles.finalNote}>{content.finalNote}</p>
        </div>
      </section>
    </div>
  );
}
