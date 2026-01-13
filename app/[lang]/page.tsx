import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
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
  heroDeviceText: string;
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
    metaDescription: "A quiet app for remembering the places and moments of your day.",
    eyebrow: "MomentBook",
    title: "Keep the days you want to remember",
    lead:
      "A calm place for travel and everyday moments—photos, short notes, and the places they happened.",
    note: "No streaks. No feed. No pressure.",
    primaryCta: "Download MomentBook",
    secondaryCta: "How it works",
    heroDeviceText: "Today, in three moments",
    heroVisualCaption: "Time + place arranged automatically.",
    highlightTitle: "Why people keep it",
    highlightLead: "Lightweight, private, and easy to return to.",
    highlightCards: [
      {
        title: "Capture in seconds",
        text: "Save a photo or a short line. That's it.",
      },
      {
        title: "Places shape the story",
        text: "Moments group by location so the day makes sense.",
      },
      {
        title: "Private by default",
        text: "No public feed, no tracking, no ads.",
      },
    ],
    storyTitle: "A record that fits real life",
    storyLead:
      "Not a journal to keep up with. A place you open when you want to remember.",
    storyParagraphs: [
      "Travel days, quiet days, ordinary days—each can stay in a small, gentle form.",
      "You decide what matters. The rest stays silent.",
    ],
    storyListTitle: "Designed to stay gentle",
    storyList: ["No reminders", "No goals", "No social metrics"],
    previewTitle: "A quick look inside",
    previewLead: "Simple views that keep the day clear.",
    previewItems: [
      { deviceText: "Places you've passed", caption: "A quiet map of your day." },
      { deviceText: "A week at a glance", caption: "Return by date, not by noise." },
    ],
    finalTitle: "Start a quieter record",
    finalLead: "Download MomentBook and keep the days you want to remember.",
    finalCta: "Get the app",
    finalNote: "Available on iOS and Android.",
  },
  ko: {
    metaTitle: "MomentBook",
    metaDescription: "하루의 장소와 순간을 조용히 기록하는 앱.",
    eyebrow: "MomentBook",
    title: "기억하고 싶은 하루를 남기세요",
    lead: "여행과 일상의 순간을 사진, 짧은 메모, 장소로 조용히 기록합니다.",
    note: "연속 기록도, 피드도, 부담도 없습니다.",
    primaryCta: "MomentBook 다운로드",
    secondaryCta: "작동 방식",
    heroDeviceText: "오늘의 세 순간",
    heroVisualCaption: "시간과 장소로 자동 정리",
    highlightTitle: "많이 선택하는 이유",
    highlightLead: "가볍고, 비공개이며, 다시 보기 쉽습니다.",
    highlightCards: [
      {
        title: "몇 초면 끝",
        text: "사진이나 짧은 메모만 남기면 됩니다.",
      },
      {
        title: "장소가 이야기를 만듭니다",
        text: "장소별로 모여 하루가 이해됩니다.",
      },
      {
        title: "기본은 비공개",
        text: "공개 피드, 추적, 광고가 없습니다.",
      },
    ],
    storyTitle: "일상에 맞는 기록",
    storyLead: "따라가야 하는 일기가 아니라, 돌아오고 싶은 기록입니다.",
    storyParagraphs: [
      "여행도, 평범한 하루도 작은 형태로 남길 수 있습니다.",
      "무엇을 남길지 당신이 결정하고, 나머지는 조용히 사라집니다.",
    ],
    storyListTitle: "부담 없는 설계",
    storyList: ["알림 없음", "목표 없음", "소셜 지표 없음"],
    previewTitle: "간단히 보기",
    previewLead: "날짜와 장소로 쉽게 돌아보세요.",
    previewItems: [
      { deviceText: "지나간 장소", caption: "하루의 이동 지도." },
      { deviceText: "한 주 한눈에", caption: "날짜로 조용히 돌아보기." },
    ],
    finalTitle: "조용한 기록을 시작하세요",
    finalLead: "MomentBook을 다운로드하고 기억하고 싶은 하루를 남겨보세요.",
    finalCta: "앱 받기",
    finalNote: "iOS와 Android에서 이용 가능합니다.",
  },
  ja: {
    metaTitle: "MomentBook",
    metaDescription: "一日の場所と瞬間を静かに残すアプリ。",
    eyebrow: "MomentBook",
    title: "残したい一日をそっと記録",
    lead: "旅や日常の瞬間を、写真・短いメモ・場所とともに残します。",
    note: "連続記録もフィードもありません。",
    primaryCta: "MomentBook をダウンロード",
    secondaryCta: "仕組みを見る",
    heroDeviceText: "今日の3つの瞬間",
    heroVisualCaption: "時間と場所で自動整理",
    highlightTitle: "選ばれる理由",
    highlightLead: "軽く、非公開で、戻りやすい。",
    highlightCards: [
      {
        title: "数秒で完了",
        text: "写真や短い一文だけで十分です。",
      },
      {
        title: "場所が流れを作る",
        text: "場所ごとに集まり、一日が見えてきます。",
      },
      {
        title: "デフォルトは非公開",
        text: "公開フィード、追跡、広告はありません。",
      },
    ],
    storyTitle: "日常に寄り添う記録",
    storyLead: "続ける日記ではなく、戻るための記録です。",
    storyParagraphs: [
      "旅の日も、普通の日も、小さく残しておけます。",
      "何を残すかはあなた次第です。",
    ],
    storyListTitle: "負担のない設計",
    storyList: ["通知なし", "目標なし", "ソーシャル指標なし"],
    previewTitle: "少しだけ中を見る",
    previewLead: "日付と場所で簡単に戻れます。",
    previewItems: [
      { deviceText: "通った場所", caption: "一日の静かな地図。" },
      { deviceText: "一週間を一覧", caption: "日付で静かに見返す。" },
    ],
    finalTitle: "静かな記録を始める",
    finalLead: "MomentBook をダウンロードして、残したい一日を保管しましょう。",
    finalCta: "アプリを入手",
    finalNote: "iOS と Android に対応。",
  },
  zh: {
    metaTitle: "MomentBook",
    metaDescription: "安静记录一天的地点与瞬间。",
    eyebrow: "MomentBook",
    title: "把想记住的一天留下",
    lead: "用照片、短句和地点安静地记录旅行与日常。",
    note: "没有连续记录，没有信息流。",
    primaryCta: "下载 MomentBook",
    secondaryCta: "了解工作方式",
    heroDeviceText: "今天的三个瞬间",
    heroVisualCaption: "按时间与地点自动整理",
    highlightTitle: "大家选择它的原因",
    highlightLead: "轻盈、私密、容易回看。",
    highlightCards: [
      {
        title: "几秒即可",
        text: "一张照片或一句短句就够了。",
      },
      {
        title: "地点构成故事",
        text: "按地点汇聚，整合成一天。",
      },
      {
        title: "默认私密",
        text: "没有公开动态、追踪或广告。",
      },
    ],
    storyTitle: "贴近日常的记录",
    storyLead: "不是要坚持的日记，而是想起时回来的记录。",
    storyParagraphs: [
      "旅行的日子也好，普通的日子也好，都能安静留下。",
      "留下什么由你决定。",
    ],
    storyListTitle: "无压力设计",
    storyList: ["没有提醒", "没有目标", "没有社交指标"],
    previewTitle: "快速预览",
    previewLead: "用日期和地点轻松回看。",
    previewItems: [
      { deviceText: "走过的地方", caption: "一天的安静地图。" },
      { deviceText: "一周一览", caption: "按日期静静浏览。" },
    ],
    finalTitle: "开始安静的记录",
    finalLead: "下载 MomentBook，把想记住的日子留住。",
    finalCta: "获取应用",
    finalNote: "支持 iOS 与 Android。",
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
              <DeviceMock>
                <span>{content.heroDeviceText}</span>
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
