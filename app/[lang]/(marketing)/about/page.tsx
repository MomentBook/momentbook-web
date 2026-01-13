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
    metaDescription: "The philosophy behind MomentBook and who it is for.",
    title: "About MomentBook",
    subtitle: "A quiet record for travel and everyday life.",
    lead:
      "MomentBook exists for people who want to remember without keeping a journal. It holds small moments without asking for consistency.",
    missionTitle: "Why it exists",
    missionParagraphs: [
      "We move through places every day. Most of it fades. A photo, a note, a location can be enough to keep a day from disappearing.",
      "MomentBook is intentionally small. It does not compete for attention. It waits until you want to return.",
    ],
    principlesTitle: "Design principles",
    principles: [
      "Keep it quiet and lightweight",
      "Let places shape the story",
      "Private by default",
      "No social performance",
    ],
    sections: [
      {
        heading: "Who it is for",
        paragraphs: [
          "People who travel and want to remember where they were without writing long entries.",
          "People who want a gentle record of their everyday movement.",
        ],
      },
      {
        heading: "Who it is not for",
        paragraphs: [
          "If you need public sharing, long-form journaling, or habit tracking, this may not fit.",
        ],
      },
    ],
    privacyTitle: "Privacy, clearly",
    privacyParagraphs: [
      "Your moments stay on your device unless you choose to sync.",
      "We do not sell data or track behavior.",
    ],
    closingTitle: "A small place to return to",
    closingParagraph: "MomentBook is built for remembering, not performing. If that feels right, it is for you.",
  },
  ko: {
    metaTitle: "MomentBook 소개",
    metaDescription: "MomentBook의 철학과 목적을 소개합니다.",
    title: "MomentBook 소개",
    subtitle: "여행과 일상을 위한 조용한 기록.",
    lead:
      "MomentBook은 일기를 꾸준히 쓰기 어려운 사람을 위한 앱입니다. 작은 순간을 남기고, 필요할 때 돌아볼 수 있게 합니다.",
    missionTitle: "왜 만들었나요",
    missionParagraphs: [
      "하루는 금방 사라집니다. 사진 한 장, 짧은 메모, 한 장소가 그날을 다시 떠올리게 합니다.",
      "MomentBook은 조용한 앱입니다. 주의를 끌지 않고, 돌아오고 싶을 때만 열립니다.",
    ],
    principlesTitle: "디자인 원칙",
    principles: [
      "가볍고 조용하게",
      "장소가 흐름을 만들게",
      "기본은 프라이버시",
      "보여주기 없는 기록",
    ],
    sections: [
      {
        heading: "누구에게 어울리나요",
        paragraphs: [
          "여행 중 길고 복잡한 기록 없이 장소와 순간을 남기고 싶은 분.",
          "일상의 이동을 가볍게 기록하고 싶은 분.",
        ],
      },
      {
        heading: "어울리지 않을 수도 있어요",
        paragraphs: [
          "공개 공유, 긴 글쓰기, 습관 관리가 필요하다면 맞지 않을 수 있습니다.",
        ],
      },
    ],
    privacyTitle: "프라이버시",
    privacyParagraphs: [
      "동기화를 선택하지 않는 한 기록은 기기에 남습니다.",
      "데이터를 판매하거나 행동을 추적하지 않습니다.",
    ],
    closingTitle: "작게 돌아올 수 있는 공간",
    closingParagraph: "보여주기보다 기억을 위해 만든 앱입니다. 그 방향이 맞는 분께 어울립니다.",
  },
  ja: {
    metaTitle: "MomentBook について",
    metaDescription: "MomentBook の哲学と目的を紹介します。",
    title: "MomentBook について",
    subtitle: "旅と日常のための静かな記録。",
    lead:
      "MomentBook は日記を続けるのが難しい人のためのアプリです。小さな瞬間を残し、必要なときに戻れます。",
    missionTitle: "なぜ作ったのか",
    missionParagraphs: [
      "一日はすぐに消えていきます。写真、短いメモ、場所だけでも思い出を呼び戻せます。",
      "MomentBook は静かなアプリです。注意を奪わず、戻りたいときだけ開けます。",
    ],
    principlesTitle: "デザイン原則",
    principles: [
      "軽く、静かに",
      "場所が流れを作る",
      "プライバシーが基本",
      "見せるための記録はしない",
    ],
    sections: [
      {
        heading: "合う人",
        paragraphs: [
          "旅先で長文を書かずに場所と瞬間を残したい人。",
          "日常の移動を軽く記録したい人。",
        ],
      },
      {
        heading: "合わないかもしれない人",
        paragraphs: [
          "公開共有、長文の記録、習慣管理が必要な方には合わないかもしれません。",
        ],
      },
    ],
    privacyTitle: "プライバシー",
    privacyParagraphs: [
      "同期を選ばない限り記録は端末に保存されます。",
      "データ販売や行動追跡は行いません。",
    ],
    closingTitle: "小さく戻れる場所",
    closingParagraph: "見せるためではなく、覚えておくためのアプリです。",
  },
  zh: {
    metaTitle: "关于 MomentBook",
    metaDescription: "介绍 MomentBook 的理念与目的。",
    title: "关于 MomentBook",
    subtitle: "为旅行与日常准备的安静记录。",
    lead:
      "MomentBook 为不想坚持写日记的人而做。它保存小小瞬间，需要时可以回来查看。",
    missionTitle: "为什么存在",
    missionParagraphs: [
      "一天很容易被忘记。一张照片、一句短句、一个地点就足以唤起记忆。",
      "MomentBook 保持安静，不争夺注意力，需要时再打开。",
    ],
    principlesTitle: "设计原则",
    principles: [
      "轻盈与安静",
      "地点形成故事",
      "隐私优先",
      "拒绝表演式记录",
    ],
    sections: [
      {
        heading: "适合谁",
        paragraphs: [
          "旅行中不想写长文，只想留下地点与瞬间的人。",
          "想轻松记录日常移动的人。",
        ],
      },
      {
        heading: "可能不适合谁",
        paragraphs: [
          "如果你需要公开分享、长篇记录或习惯管理，可能不适合。",
        ],
      },
    ],
    privacyTitle: "隐私",
    privacyParagraphs: [
      "除非选择同步，记录只保存在设备中。",
      "我们不出售数据，也不追踪行为。",
    ],
    closingTitle: "可以安静回来的地方",
    closingParagraph: "这是为记住而做的，不是为了展示。",
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
