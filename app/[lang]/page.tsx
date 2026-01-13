import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./page.module.scss";
import { type Language } from "@/lib/i18n/config";

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
    metaDescription: "Save photos, notes, and places from your day in one app.",
    eyebrow: "MomentBook",
    title: "Save travel and daily moments in one place",
    lead: "Store photos, short notes, and locations so you can find a day later.",
    note: "Offline first. Sync optional. Travel alerts included.",
    primaryCta: "Download MomentBook",
    secondaryCta: "See how it works",
    heroDeviceImage: "/device-mocks/home-en.png",
    heroDeviceAlt: "MomentBook home screen in English",
    heroVisualCaption: "Grouped by time and place.",
    highlightTitle: "Built for quick recall",
    highlightLead: "Fast capture, automatic organization, sharing when you choose.",
    highlightCards: [
      {
        title: "Fast capture",
        text: "Save a photo or a short note in seconds.",
      },
      {
        title: "Auto organization",
        text: "Moments group by day and place without setup.",
      },
      {
        title: "Private by default",
        text: "Publish a journey only when you choose.",
      },
    ],
    storyTitle: "What you can do",
    storyLead: "Find a day quickly and keep only what matters.",
    storyParagraphs: [
      "Browse by date when you remember when it happened.",
      "Browse by place when you remember where it happened.",
    ],
    storyListTitle: "Core features",
    storyList: ["Browse by day", "Publish to the web", "Travel alerts", "Journey-end reminders"],
    previewTitle: "Common views",
    previewLead: "Simple screens for quick recall.",
    previewItems: [
      { deviceText: "Day view", caption: "See moments in order." },
      { deviceText: "Places view", caption: "Find moments by location." },
    ],
    finalTitle: "Install and start",
    finalLead: "Available now on iOS and Android.",
    finalCta: "Go to download",
    finalNote: "Set up takes less than a minute.",
  },
  ko: {
    metaTitle: "MomentBook",
    metaDescription: "하루의 사진, 메모, 장소를 한 앱에 저장하세요.",
    eyebrow: "MomentBook",
    title: "여행과 일상의 순간을 한곳에 저장하세요",
    lead: "사진, 짧은 메모, 장소를 저장해 나중에 하루를 쉽게 찾을 수 있습니다.",
    note: "오프라인 사용 가능. 동기화는 선택. 이동 감지/여정 마무리 알림 제공.",
    primaryCta: "MomentBook 다운로드",
    secondaryCta: "작동 방식",
    heroDeviceImage: "/device-mocks/home-ko.png",
    heroDeviceAlt: "한국어 MomentBook 홈 화면",
    heroVisualCaption: "시간과 장소로 묶입니다.",
    highlightTitle: "빠르게 기록하는 방법",
    highlightLead: "빠른 입력, 자동 정리, 공유는 선택.",
    highlightCards: [
      {
        title: "빠른 기록",
        text: "사진이나 짧은 메모만 남기면 됩니다.",
      },
      {
        title: "자동 정리",
        text: "날짜와 장소로 자동으로 묶입니다.",
      },
      {
        title: "기본은 비공개",
        text: "게시할 때만 웹에 공개됩니다.",
      },
    ],
    storyTitle: "할 수 있는 일",
    storyLead: "날짜나 장소로 빠르게 찾아보세요.",
    storyParagraphs: [
      "날짜를 기억하면 날짜별로 확인할 수 있습니다.",
      "장소를 기억하면 장소별로 확인할 수 있습니다.",
    ],
    storyListTitle: "핵심 기능",
    storyList: ["날짜별 보기", "웹 게시", "이동 감지 알림", "여정 마무리 알림"],
    previewTitle: "자주 쓰는 화면",
    previewLead: "필요한 정보를 바로 확인합니다.",
    previewItems: [
      { deviceText: "날짜 보기", caption: "시간 순서로 정리." },
      { deviceText: "장소 보기", caption: "장소별 기록 확인." },
    ],
    finalTitle: "지금 시작하세요",
    finalLead: "iOS와 Android에서 바로 설치할 수 있습니다.",
    finalCta: "다운로드 페이지로",
    finalNote: "설정은 1분 내에 끝납니다.",
  },
  ja: {
    metaTitle: "MomentBook",
    metaDescription: "一日の写真、メモ、場所を一つに保存するアプリ。",
    eyebrow: "MomentBook",
    title: "旅と日常の瞬間を一つに保存",
    lead: "写真、短いメモ、場所を保存して、後から一日を探せます。",
    note: "オフライン対応。同期は任意。移動検知と旅の終了リマインドあり。",
    primaryCta: "MomentBook をダウンロード",
    secondaryCta: "仕組みを見る",
    heroDeviceImage: "/device-mocks/home-ja.png",
    heroDeviceAlt: "日本語の MomentBook ホーム画面",
    heroVisualCaption: "時間と場所でまとめます。",
    highlightTitle: "すぐに記録できる",
    highlightLead: "素早い入力、整理、公開は任意。",
    highlightCards: [
      {
        title: "すばやく記録",
        text: "写真や短いメモだけで十分です。",
      },
      {
        title: "自動で整理",
        text: "日付と場所で自動的にまとまります。",
      },
      {
        title: "基本は非公開",
        text: "投稿するとWebで公開されます。",
      },
    ],
    storyTitle: "できること",
    storyLead: "日付や場所からすぐに見返せます。",
    storyParagraphs: [
      "日付を覚えていれば日付で確認できます。",
      "場所を覚えていれば場所で確認できます。",
    ],
    storyListTitle: "主な機能",
    storyList: ["日付で見る", "Webで公開", "移動検知通知", "旅の終了リマインド"],
    previewTitle: "よく使う画面",
    previewLead: "必要な情報をすぐ確認できます。",
    previewItems: [
      { deviceText: "日付ビュー", caption: "時間順で整理。" },
      { deviceText: "場所ビュー", caption: "場所ごとの記録。" },
    ],
    finalTitle: "今すぐ始める",
    finalLead: "iOS と Android で利用できます。",
    finalCta: "ダウンロードへ",
    finalNote: "設定は1分ほどで完了します。",
  },
  zh: {
    metaTitle: "MomentBook",
    metaDescription: "把一天的照片、短句和地点集中保存。",
    eyebrow: "MomentBook",
    title: "把旅行与日常的瞬间集中保存",
    lead: "保存照片、短句和地点，之后可快速找到某一天。",
    note: "支持离线，同步可选，并提供行程提醒。",
    primaryCta: "下载 MomentBook",
    secondaryCta: "了解工作方式",
    heroDeviceImage: "/device-mocks/home-zh.png",
    heroDeviceAlt: "MomentBook 中文主屏幕",
    heroVisualCaption: "按时间与地点分组。",
    highlightTitle: "快速记录方式",
    highlightLead: "快速输入、自动整理、发布可选。",
    highlightCards: [
      {
        title: "快速记录",
        text: "一张照片或一句短句即可。",
      },
      {
        title: "自动整理",
        text: "按日期与地点自动归类。",
      },
      {
        title: "默认私密",
        text: "发布后会在网页公开。",
      },
    ],
    storyTitle: "你可以做什么",
    storyLead: "按日期或地点快速查看。",
    storyParagraphs: [
      "记得日期时可按日期查看。",
      "记得地点时可按地点查看。",
    ],
    storyListTitle: "核心功能",
    storyList: ["按日期查看", "网页发布", "行程提醒", "结束提醒"],
    previewTitle: "常用界面",
    previewLead: "快速查看关键信息。",
    previewItems: [
      { deviceText: "日期视图", caption: "按时间顺序整理。" },
      { deviceText: "地点视图", caption: "按地点查看记录。" },
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

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
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
              <DeviceMock screenClassName={deviceStyles.screenMedia}>
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
                <DeviceMock>
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
