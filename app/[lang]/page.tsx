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
    metaDescription: "A quiet archive that keeps your moments as journeys.",
    eyebrow: "MomentBook",
    title: "A quiet archive for your journeys",
    lead: "Keep moments as journeys—time, place, and photos held together. Share only when you choose.",
    note: "Private by default. Publishing creates a shareable page you can send to people you trust.",
    primaryCta: "Download MomentBook",
    secondaryCta: "See how it works",
    heroDeviceImage: "/device-mocks/home-en.png",
    heroDeviceAlt: "MomentBook home screen in English",
    heroVisualCaption: "Moments gathered into a journey.",
    highlightTitle: "Why it feels different",
    highlightLead: "Less performance, more context.",
    highlightCards: [
      {
        title: "Journey-first",
        text: "Moments belong to a story with a beginning and an end.",
      },
      {
        title: "Private by default",
        text: "Your moments stay yours unless you decide to publish.",
      },
      {
        title: "Quiet sharing",
        text: "Share a single journey page by sending a link.",
      },
    ],
    storyTitle: "Moments become a journey",
    storyLead: "Time and place give photos a thread you can return to.",
    storyParagraphs: [
      "Moments are grouped into a journey so you can see the flow of a day or a trip.",
      "AI can help with titles and short summaries, but it stays a helper, not the author.",
    ],
    storyListTitle: "What it keeps",
    storyList: [
      "Photos and short notes",
      "Places and time (if you allow location)",
      "A journey timeline",
      "A shareable page when you publish",
      "AI help for titles and summaries",
    ],
    previewTitle: "What a shared journey looks like",
    previewLead: "A single page that holds the journey's flow.",
    previewItems: [
      { deviceText: "Journey timeline", caption: "See places and photos in order." },
      { deviceText: "Share page", caption: "Publish only when you choose." },
    ],
    finalTitle: "Start quietly",
    finalLead: "Available on iOS and Android.",
    finalCta: "Go to download",
    finalNote: "Setup takes about a minute.",
  },
  ko: {
    metaTitle: "MomentBook",
    metaDescription: "순간을 여정으로 남기는 조용한 기록 아카이브.",
    eyebrow: "MomentBook",
    title: "여정을 담는 조용한 기록",
    lead: "시간, 장소, 사진이 하나의 여정으로 남습니다. 공유는 원할 때만 합니다.",
    note: "기본은 비공개. 게시하면 링크로 공유할 수 있는 페이지가 만들어집니다.",
    primaryCta: "MomentBook 다운로드",
    secondaryCta: "작동 방식",
    heroDeviceImage: "/device-mocks/home-ko.png",
    heroDeviceAlt: "한국어 MomentBook 홈 화면",
    heroVisualCaption: "여정으로 모아 보여줍니다.",
    highlightTitle: "왜 다른가요",
    highlightLead: "노출이 아닌 맥락에 집중합니다.",
    highlightCards: [
      {
        title: "여정 중심",
        text: "시작과 끝이 있는 이야기로 남깁니다.",
      },
      {
        title: "기본은 비공개",
        text: "내 기록은 내가 선택할 때만 공개됩니다.",
      },
      {
        title: "조용한 공유",
        text: "여정 링크를 필요한 사람에게만 보냅니다.",
      },
    ],
    storyTitle: "순간이 여정이 됩니다",
    storyLead: "시간과 장소가 사진에 맥락을 더합니다.",
    storyParagraphs: [
      "순간들은 여정으로 묶여 하루나 여행의 흐름을 보여줍니다.",
      "AI는 제목 추천, 요약처럼 정리를 돕는 조력자 역할에만 머뭅니다.",
    ],
    storyListTitle: "기록되는 것",
    storyList: [
      "사진과 짧은 메모",
      "시간과 장소(허용 시)",
      "여정 타임라인",
      "게시 시 공유 페이지",
      "AI 정리 보조",
    ],
    previewTitle: "공유된 여정의 모습",
    previewLead: "여정 하나가 하나의 페이지로 정리됩니다.",
    previewItems: [
      { deviceText: "여정 타임라인", caption: "순서대로 이어집니다." },
      { deviceText: "공유 페이지", caption: "원할 때만 게시합니다." },
    ],
    finalTitle: "조용히 시작하세요",
    finalLead: "iOS와 Android에서 사용 가능합니다.",
    finalCta: "다운로드 페이지로",
    finalNote: "설정은 1분 정도면 충분합니다.",
  },
  ja: {
    metaTitle: "MomentBook",
    metaDescription: "瞬間を旅として残す静かな記録アーカイブ。",
    eyebrow: "MomentBook",
    title: "旅を静かに残す場所",
    lead: "時間・場所・写真が一つの旅として残ります。共有は必要なときだけ。",
    note: "基本は非公開。投稿するとリンクで共有できるページが作られます。",
    primaryCta: "MomentBook をダウンロード",
    secondaryCta: "仕組みを見る",
    heroDeviceImage: "/device-mocks/home-ja.png",
    heroDeviceAlt: "日本語の MomentBook ホーム画面",
    heroVisualCaption: "旅としてまとまります。",
    highlightTitle: "違いはここにあります",
    highlightLead: "見せるより、文脈を残す。",
    highlightCards: [
      {
        title: "旅単位",
        text: "始まりと終わりのある物語として残します。",
      },
      {
        title: "非公開が基本",
        text: "公開はあなたが選ぶときだけ。",
      },
      {
        title: "静かな共有",
        text: "旅のリンクを必要な人に送るだけ。",
      },
    ],
    storyTitle: "瞬間が旅になる",
    storyLead: "時間と場所が写真に文脈を与えます。",
    storyParagraphs: [
      "瞬間は旅としてまとまり、一日や旅の流れが見えてきます。",
      "AIはタイトル提案や要約など、整理の助けに留まります。",
    ],
    storyListTitle: "残るもの",
    storyList: [
      "写真と短いメモ",
      "時間と場所(許可時)",
      "旅のタイムライン",
      "公開時の共有ページ",
      "AIによる整理の補助",
    ],
    previewTitle: "共有される旅のかたち",
    previewLead: "一つの旅が一つのページになります。",
    previewItems: [
      { deviceText: "旅のタイムライン", caption: "順に並びます。" },
      { deviceText: "共有ページ", caption: "必要なときだけ公開。" },
    ],
    finalTitle: "静かに始める",
    finalLead: "iOS と Android で利用できます。",
    finalCta: "ダウンロードへ",
    finalNote: "設定は1分ほどで完了します。",
  },
  zh: {
    metaTitle: "MomentBook",
    metaDescription: "将瞬间作为旅程保存的安静记录空间。",
    eyebrow: "MomentBook",
    title: "安静记录你的旅程",
    lead: "时间、地点与照片会组合成一段旅程。只在需要时分享。",
    note: "默认私密。发布后会生成可分享的页面链接。",
    primaryCta: "下载 MomentBook",
    secondaryCta: "了解工作方式",
    heroDeviceImage: "/device-mocks/home-zh.png",
    heroDeviceAlt: "MomentBook 中文主屏幕",
    heroVisualCaption: "汇成一段旅程。",
    highlightTitle: "它的不同之处",
    highlightLead: "不是展示，而是保留脉络。",
    highlightCards: [
      {
        title: "旅程为单位",
        text: "以有始有终的故事来保存。",
      },
      {
        title: "默认私密",
        text: "只有你选择发布时才公开。",
      },
      {
        title: "安静分享",
        text: "把旅程链接发送给需要的人。",
      },
    ],
    storyTitle: "瞬间汇成旅程",
    storyLead: "时间与地点让照片有了脉络。",
    storyParagraphs: [
      "瞬间会被整理成旅程，看到一天或一次旅行的脉络。",
      "AI 只做整理辅助，如标题与摘要建议。",
    ],
    storyListTitle: "记录的内容",
    storyList: [
      "照片与短句",
      "时间与地点（允许时）",
      "旅程时间线",
      "发布时的分享页面",
      "AI 整理辅助",
    ],
    previewTitle: "分享后的旅程",
    previewLead: "一段旅程对应一个页面。",
    previewItems: [
      { deviceText: "行程时间线", caption: "按到访顺序整理。" },
      { deviceText: "分享页面", caption: "只在需要时发布。" },
    ],
    finalTitle: "安静开始",
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
