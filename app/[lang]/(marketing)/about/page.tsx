import type { Metadata } from "next";
import styles from "./about.module.scss";
import { type Language } from "@/lib/i18n/config";

type AboutSection = {
  heading: string;
  paragraphs: string[];
};

type AboutContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  lead: string;
  missionTitle: string;
  missionParagraphs: string[];
  principlesTitle: string;
  principles: string[];
  sections: AboutSection[];
  privacyTitle: string;
  privacyParagraphs: string[];
  closingTitle: string;
  closingParagraph: string;
};

const aboutContent: Record<Language, AboutContent> = {
  en: {
    metaTitle: "About MomentBook",
    metaDescription: "What MomentBook does and who it is for.",
    title: "About MomentBook",
    subtitle: "Practical memory for travel and everyday life.",
    lead:
      "MomentBook stores photos, short notes, and locations so you can find a day later. It is built for quick capture, not long writing.",
    missionTitle: "What it solves",
    missionParagraphs: [
      "Days blur together. A photo plus a place is often enough to remember when and where something happened.",
      "MomentBook keeps capture and review simple so you can get back to your day.",
    ],
    principlesTitle: "Product principles",
    principles: [
      "Fast capture",
      "Automatic grouping",
      "Private by default",
      "Optional sync",
    ],
    sections: [
      {
        heading: "Who it is for",
        paragraphs: [
          "Travelers who want quick recall without writing long entries.",
          "People who prefer short notes and photos over full journals.",
        ],
      },
      {
        heading: "Who it is not for",
        paragraphs: [
          "If you want a public-first feed, long-form journaling, or habit tracking, this may not fit.",
        ],
      },
    ],
    privacyTitle: "Data handling",
    privacyParagraphs: [
      "Your moments stay on your device by default. Publishing a journey makes it public on the web.",
      "Sync is optional, and we do not sell data or track behavior.",
    ],
    closingTitle: "Practical by intent",
    closingParagraph: "If you want a practical way to remember places and days, MomentBook is built for that.",
  },
  ko: {
    metaTitle: "MomentBook 소개",
    metaDescription: "MomentBook이 무엇을 하고, 누구에게 맞는지 안내합니다.",
    title: "MomentBook 소개",
    subtitle: "여행과 일상을 위한 실용적인 기록.",
    lead:
      "MomentBook은 사진, 짧은 메모, 장소를 저장해 나중에 하루를 찾기 쉽게 합니다. 긴 글쓰기 대신 빠른 기록에 맞춰 설계했습니다.",
    missionTitle: "해결하려는 문제",
    missionParagraphs: [
      "하루는 금방 흐려집니다. 사진과 장소만 있어도 언제 어디서였는지 떠올리기 쉽습니다.",
      "MomentBook은 기록과 확인을 단순하게 만들어 시간을 아껴줍니다.",
    ],
    principlesTitle: "제품 원칙",
    principles: [
      "빠른 기록",
      "자동 정리",
      "기본은 비공개",
      "동기화는 선택",
    ],
    sections: [
      {
        heading: "누구에게 맞나요",
        paragraphs: [
          "여행 기록을 짧게 남기고 싶은 분.",
          "사진과 간단한 메모로 하루를 기억하고 싶은 분.",
        ],
      },
      {
        heading: "맞지 않을 수 있는 경우",
        paragraphs: [
          "공개 피드 중심 공유, 긴 글쓰기, 습관 관리가 필요하다면 맞지 않을 수 있습니다.",
        ],
      },
    ],
    privacyTitle: "데이터 처리",
    privacyParagraphs: [
      "기본은 기기 저장이며, 게시하면 웹에 공개됩니다.",
      "동기화는 선택이고 데이터 판매나 추적을 하지 않습니다.",
    ],
    closingTitle: "의도적으로 실용하게",
    closingParagraph: "장소와 하루를 실용적으로 기억하고 싶다면 MomentBook이 맞습니다.",
  },
  ja: {
    metaTitle: "MomentBook について",
    metaDescription: "MomentBook の機能と対象ユーザーを紹介します。",
    title: "MomentBook について",
    subtitle: "旅と日常のための実用的な記録。",
    lead:
      "MomentBook は写真、短いメモ、場所を保存して、後から一日を探しやすくします。長文ではなく素早い記録に最適化されています。",
    missionTitle: "解決すること",
    missionParagraphs: [
      "一日はすぐに曖昧になります。写真と場所があれば、いつどこで何があったか思い出せます。",
      "記録と確認をシンプルにして、日常の負担を減らします。",
    ],
    principlesTitle: "製品原則",
    principles: [
      "素早い記録",
      "自動整理",
      "デフォルトは非公開",
      "同期は任意",
    ],
    sections: [
      {
        heading: "合う人",
        paragraphs: [
          "旅の記録を短く残したい人。",
          "写真と短いメモで一日を覚えておきたい人。",
        ],
      },
      {
        heading: "合わないかもしれない人",
        paragraphs: [
          "公開フィード中心の共有、長文の記録、習慣管理が必要な方には合わないかもしれません。",
        ],
      },
    ],
    privacyTitle: "データの扱い",
    privacyParagraphs: [
      "基本は端末保存で、投稿するとWebで公開されます。",
      "同期は任意で、データ販売や行動追跡は行いません。",
    ],
    closingTitle: "実用を優先",
    closingParagraph: "場所と一日を実用的に覚えたいなら MomentBook が合います。",
  },
  zh: {
    metaTitle: "关于 MomentBook",
    metaDescription: "介绍 MomentBook 的功能与适用人群。",
    title: "关于 MomentBook",
    subtitle: "为旅行与日常准备的实用记录。",
    lead:
      "MomentBook 保存照片、短句和地点，方便你之后查找某一天。它针对快速记录而设计，而不是长篇写作。",
    missionTitle: "解决什么问题",
    missionParagraphs: [
      "一天很容易模糊。照片加地点通常就足够回忆当时的情景。",
      "我们让记录和回看更简单，节省时间。",
    ],
    principlesTitle: "产品原则",
    principles: [
      "快速记录",
      "自动整理",
      "默认私密",
      "同步可选",
    ],
    sections: [
      {
        heading: "适合谁",
        paragraphs: [
          "想用短记录保存旅行的人。",
          "更喜欢照片和短句的人。",
        ],
      },
      {
        heading: "可能不适合谁",
        paragraphs: [
          "如果你需要公开信息流式分享、长篇记录或习惯管理，可能不适合。",
        ],
      },
    ],
    privacyTitle: "数据处理",
    privacyParagraphs: [
      "默认保存在设备中，发布后会在网页公开。",
      "同步可选，我们不出售数据也不追踪行为。",
    ],
    closingTitle: "以实用为先",
    closingParagraph: "如果你想实用地记住地点和日子，MomentBook 就是为此而做。",
  },
};

function getAboutContent(lang: Language): AboutContent {
  return aboutContent[lang] ?? aboutContent.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getAboutContent(lang);

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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getAboutContent(lang);

  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.subtitle}</p>
          <p className={styles.lead}>{content.lead}</p>
        </div>
      </header>

      <section className={styles.mission}>
        <div className={styles.missionCopy}>
          <h2 className={styles.sectionTitle}>{content.missionTitle}</h2>
          {content.missionParagraphs.map((paragraph, index) => (
            <p key={`${content.missionTitle}-${index}`} className={styles.sectionText}>
              {paragraph}
            </p>
          ))}
        </div>
        <aside className={styles.principles}>
          <h3 className={styles.sectionTitle}>{content.principlesTitle}</h3>
          <ul className={styles.principleList}>
            {content.principles.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className={styles.sectionGrid}>
        {content.sections.map((section, index) => (
          <div key={`${section.heading}-${index}`} className={styles.sectionCard}>
            <h2 className={styles.sectionTitle}>{section.heading}</h2>
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={`${section.heading}-${paragraphIndex}`} className={styles.sectionText}>
                {paragraph}
              </p>
            ))}
          </div>
        ))}
      </section>

      <section className={styles.privacySection}>
        <h2 className={styles.sectionTitle}>{content.privacyTitle}</h2>
        {content.privacyParagraphs.map((paragraph, index) => (
          <p key={`${content.privacyTitle}-${index}`} className={styles.sectionText}>
            {paragraph}
          </p>
        ))}
      </section>

      <section className={styles.closingSection}>
        <h2 className={styles.sectionTitle}>{content.closingTitle}</h2>
        <p className={styles.sectionText}>{content.closingParagraph}</p>
      </section>
    </div>
  );
}
