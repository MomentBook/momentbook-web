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
  heroNote: string;
  primaryCta: string;
  secondaryCta: string;
  heroDeviceText: string;
  heroVisualCaption: string;
  valueTitle: string;
  valueLead: string;
  valueCards: HomeCard[];
  storyTitle: string;
  storyLead: string;
  storyParagraphs: string[];
  storyListTitle: string;
  storyList: string[];
  previewTitle: string;
  previewLead: string;
  previewItems: HomePreview[];
  privacyTitle: string;
  privacyText: string;
  finalTitle: string;
  finalLead: string;
  finalCta: string;
  finalNote: string;
};

const homeContent: Record<Language, HomeContent> = {
  en: {
    metaTitle: "MomentBook",
    metaDescription: "A quiet app for remembering the places and moments of your day.",
    eyebrow: "Quiet travel memory",
    title: "Remember the day without writing it down",
    lead:
      "MomentBook keeps the small moments you notice—photos, short notes, and the places they happened.",
    heroNote: "No streaks. No feed. Just your timeline.",
    primaryCta: "Download MomentBook",
    secondaryCta: "See how it works",
    heroDeviceText: "A day, gently arranged",
    heroVisualCaption: "Moments grouped by day and place.",
    valueTitle: "A record that stays light",
    valueLead: "Built for travel and everyday movement.",
    valueCards: [
      {
        title: "Capture in seconds",
        text: "A photo or a short line is enough to keep a moment.",
      },
      {
        title: "Places make the story",
        text: "Moments gather by location so the day makes sense.",
      },
      {
        title: "Private by default",
        text: "No public feed, no ads, no tracking.",
      },
    ],
    storyTitle: "Why it feels different",
    storyLead:
      "MomentBook is not a journal you have to keep up with. It is a place you return to when you want to remember.",
    storyParagraphs: [
      "Travel days, ordinary days, quiet days. All of them are worth holding onto in small ways.",
      "The app stays out of your way until you need it. You decide what to keep and when to look back.",
    ],
    storyListTitle: "Designed to stay gentle",
    storyList: ["No reminders", "No goals", "No social pressure"],
    previewTitle: "A quick look inside",
    previewLead: "Simple views that let you revisit without effort.",
    previewItems: [
      { deviceText: "Today in three moments", caption: "A day view with time and place." },
      { deviceText: "Places you passed", caption: "A quiet map of your movement." },
      { deviceText: "Return to a week", caption: "Browse by day, not by noise." },
    ],
    privacyTitle: "Privacy is the baseline",
    privacyText: "Your moments stay on your device unless you choose to sync.",
    finalTitle: "Start a quieter record",
    finalLead: "Download MomentBook and keep the days you want to remember.",
    finalCta: "Get the app",
    finalNote: "Available for iOS and Android.",
  },
  ko: {
    metaTitle: "MomentBook",
    metaDescription: "하루의 장소와 순간을 조용히 기록하는 앱.",
    eyebrow: "조용한 여행 기록",
    title: "글을 쓰지 않아도 하루가 남습니다",
    lead: "MomentBook은 사진, 짧은 메모, 그리고 장소와 함께 순간을 기록합니다.",
    heroNote: "연속 기록도 피드도 없습니다. 나만의 타임라인만 남습니다.",
    primaryCta: "MomentBook 다운로드",
    secondaryCta: "작동 방식 보기",
    heroDeviceText: "하루를 조용히 정리",
    heroVisualCaption: "시간과 장소로 순간이 모입니다.",
    valueTitle: "가볍게 남기는 기록",
    valueLead: "여행과 일상 모두에 어울립니다.",
    valueCards: [
      {
        title: "몇 초면 충분",
        text: "사진이나 짧은 문장만 남기면 됩니다.",
      },
      {
        title: "장소가 흐름을 만듭니다",
        text: "순간이 장소별로 모여 하루가 정리됩니다.",
      },
      {
        title: "기본은 비공개",
        text: "공개 피드, 광고, 추적이 없습니다.",
      },
    ],
    storyTitle: "느낌이 다른 이유",
    storyLead:
      "MomentBook은 따라가야 하는 일기가 아니라, 필요할 때 돌아오는 기록입니다.",
    storyParagraphs: [
      "여행의 하루도, 평범한 하루도 작게 남겨둘 가치가 있습니다.",
      "앱은 방해하지 않고, 필요할 때만 열립니다. 무엇을 남길지도 당신이 결정합니다.",
    ],
    storyListTitle: "부담 없는 설계",
    storyList: ["알림 없음", "목표 없음", "소셜 압박 없음"],
    previewTitle: "짧게 미리 보기",
    previewLead: "간단한 화면으로 쉽게 돌아볼 수 있습니다.",
    previewItems: [
      { deviceText: "오늘의 순간 3개", caption: "시간과 장소가 모인 하루 보기." },
      { deviceText: "지나간 장소", caption: "조용한 이동 기록." },
      { deviceText: "한 주 다시 보기", caption: "소음 없이 날짜로 돌아보기." },
    ],
    privacyTitle: "프라이버시가 기본",
    privacyText: "동기화를 선택하지 않는 한 기록은 기기에만 남습니다.",
    finalTitle: "조용한 기록을 시작하세요",
    finalLead: "MomentBook을 다운로드하고 기억하고 싶은 하루를 남겨보세요.",
    finalCta: "앱 받기",
    finalNote: "iOS와 Android에서 이용 가능합니다.",
  },
  ja: {
    metaTitle: "MomentBook",
    metaDescription: "一日の場所と瞬間を静かに残すアプリ。",
    eyebrow: "静かな旅の記録",
    title: "書かなくても一日が残ります",
    lead: "MomentBook は写真、短いメモ、そして場所とともに瞬間を記録します。",
    heroNote: "連続記録もフィードもありません。自分のタイムラインだけ。",
    primaryCta: "MomentBook をダウンロード",
    secondaryCta: "仕組みを見る",
    heroDeviceText: "一日をそっと整理",
    heroVisualCaption: "時間と場所で瞬間が集まります。",
    valueTitle: "軽やかな記録",
    valueLead: "旅にも日常にも馴染みます。",
    valueCards: [
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
        text: "公開フィード、広告、追跡はありません。",
      },
    ],
    storyTitle: "違いを感じる理由",
    storyLead: "MomentBook は続ける日記ではなく、戻る記録です。",
    storyParagraphs: [
      "旅の一日も、普通の一日も、小さく残しておく価値があります。",
      "アプリは邪魔をせず、必要なときだけ開けます。残す内容はあなた次第です。",
    ],
    storyListTitle: "負担のない設計",
    storyList: ["通知なし", "目標なし", "ソーシャル圧力なし"],
    previewTitle: "少しだけ中を見る",
    previewLead: "簡単な画面で思い出を戻せます。",
    previewItems: [
      { deviceText: "今日の3つの瞬間", caption: "時間と場所でまとまる一日ビュー。" },
      { deviceText: "通った場所", caption: "静かな移動の記録。" },
      { deviceText: "一週間を振り返る", caption: "日付で静かに見返す。" },
    ],
    privacyTitle: "プライバシーが基本",
    privacyText: "同期を選ばない限り記録は端末に保存されます。",
    finalTitle: "静かな記録を始める",
    finalLead: "MomentBook をダウンロードして、残したい一日を保管しましょう。",
    finalCta: "アプリを入手",
    finalNote: "iOS と Android に対応。",
  },
  zh: {
    metaTitle: "MomentBook",
    metaDescription: "安静记录一天的地点与瞬间。",
    eyebrow: "安静的旅途记录",
    title: "不必写作，一天也能留下",
    lead: "MomentBook 记录照片、短句和发生的地点。",
    heroNote: "没有连续记录，没有信息流，只有你的时间线。",
    primaryCta: "下载 MomentBook",
    secondaryCta: "了解工作方式",
    heroDeviceText: "安静整理一天",
    heroVisualCaption: "按时间与地点汇总瞬间。",
    valueTitle: "轻盈的记录方式",
    valueLead: "适合旅行，也适合日常。",
    valueCards: [
      {
        title: "几秒即可",
        text: "一张照片或一句短句就够了。",
      },
      {
        title: "地点构成故事",
        text: "瞬间按地点汇聚，形成一天的脉络。",
      },
      {
        title: "默认私密",
        text: "没有公开动态、广告或追踪。",
      },
    ],
    storyTitle: "为何感觉不同",
    storyLead: "MomentBook 不是需要坚持的日记，而是想起时回来的记录。",
    storyParagraphs: [
      "旅行的日子也好，平常的日子也好，都值得轻轻保留。",
      "应用不会打扰你，只有在你需要时才打开。留下什么由你决定。",
    ],
    storyListTitle: "无压力设计",
    storyList: ["没有提醒", "没有目标", "没有社交压力"],
    previewTitle: "快速预览",
    previewLead: "用简单的视图轻松回看。",
    previewItems: [
      { deviceText: "今天的三个瞬间", caption: "按时间与地点整理的一天视图。" },
      { deviceText: "走过的地方", caption: "安静的移动记录。" },
      { deviceText: "回看一周", caption: "按日期静静浏览。" },
    ],
    privacyTitle: "隐私是基础",
    privacyText: "除非你选择同步，记录只保存在设备中。",
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
            <FadeIn delay={100}>
              <h1 className={styles.heroTitle}>{content.title}</h1>
            </FadeIn>
            <FadeIn delay={150}>
              <p className={styles.heroLead}>{content.lead}</p>
            </FadeIn>
            <FadeIn delay={200}>
              <div className={styles.heroActions}>
                <Link href={`/${lang}/download`} className={styles.primaryButton}>
                  {content.primaryCta}
                </Link>
                <Link href={`/${lang}/how-it-works`} className={styles.secondaryButton}>
                  {content.secondaryCta}
                </Link>
              </div>
            </FadeIn>
            <FadeIn delay={240}>
              <p className={styles.heroNote}>{content.heroNote}</p>
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
            <h2 className={styles.sectionTitle}>{content.valueTitle}</h2>
            <p className={styles.sectionLead}>{content.valueLead}</p>
          </header>
          <div className={styles.cardGrid}>
            {content.valueCards.map((card, index) => (
              <div key={`${card.title}-${index}`} className={styles.card}>
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

      <section className={styles.preview}>
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

      <section className={styles.privacy}>
        <div className={styles.privacyInner}>
          <h2 className={styles.privacyTitle}>{content.privacyTitle}</h2>
          <p className={styles.privacyText}>{content.privacyText}</p>
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
