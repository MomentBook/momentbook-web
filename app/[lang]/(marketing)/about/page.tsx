import type { Metadata } from "next";
import styles from "./about.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

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
    metaDescription: "A quiet archive for journeys and who it is for.",
    title: "About MomentBook",
    subtitle: "A calm way to keep journeys.",
    lead:
      "MomentBook is a quiet archive for moments grouped as journeys. It keeps time, place, and photos together without turning them into a feed.",
    missionTitle: "Why it exists",
    missionParagraphs: [
      "Moments scatter across cameras, maps, and posts, and the context disappears.",
      "MomentBook keeps the flow of a day in one place so you can return without performing.",
    ],
    principlesTitle: "Principles",
    principles: [
      "Journey-first structure",
      "Private by default",
      "Quiet sharing by link",
      "AI as a helper, not an author",
    ],
    sections: [
      {
        heading: "Who it is for",
        paragraphs: [
          "People who want to remember travel or daily moments without a public feed.",
          "Anyone who prefers short notes and photos over long journaling.",
        ],
      },
      {
        heading: "Who it is not for",
        paragraphs: [
          "If you want social discovery, rankings, or habit tracking, this may not fit.",
        ],
      },
    ],
    privacyTitle: "Publishing and visibility",
    privacyParagraphs: [
      "Journeys are private by default.",
      "Publishing creates a public web page with a unique URL that you can share, and it may be indexed by search engines.",
    ],
    closingTitle: "Quiet by design",
    closingParagraph: "If you want a calm archive for your journeys, MomentBook is made for that.",
  },
  ko: {
    metaTitle: "MomentBook 소개",
    metaDescription: "여정을 조용히 남기는 기록 아카이브입니다.",
    title: "MomentBook 소개",
    subtitle: "여정을 조용히 남기는 방법.",
    lead:
      "MomentBook은 순간을 여정 단위로 묶는 기록 아카이브입니다. 시간과 장소, 사진을 한 흐름으로 남기되 피드로 만들지 않습니다.",
    missionTitle: "왜 필요한가요",
    missionParagraphs: [
      "기록이 여러 곳에 흩어지면 맥락이 사라집니다.",
      "MomentBook은 하루의 흐름을 한곳에 담아 조용히 돌아볼 수 있게 합니다.",
    ],
    principlesTitle: "원칙",
    principles: [
      "여정 중심 구조",
      "기본은 비공개",
      "링크로 조용한 공유",
      "AI는 조력자",
    ],
    sections: [
      {
        heading: "누구에게 맞나요",
        paragraphs: [
          "공개 피드 없이 여행/일상을 기억하고 싶은 분.",
          "긴 글보다 짧은 메모와 사진을 선호하는 분.",
        ],
      },
      {
        heading: "맞지 않을 수 있는 경우",
        paragraphs: [
          "소셜 확산, 랭킹, 습관 관리가 필요한 경우에는 맞지 않을 수 있습니다.",
        ],
      },
    ],
    privacyTitle: "게시와 공개 범위",
    privacyParagraphs: [
      "기본은 비공개입니다.",
      "게시하면 고유 URL의 웹페이지가 만들어지며, 링크 공유와 검색 엔진 수집이 가능할 수 있습니다.",
    ],
    closingTitle: "조용한 의도",
    closingParagraph: "여정을 차분하게 남기고 싶다면 MomentBook이 맞습니다.",
  },
  ja: {
    metaTitle: "MomentBook について",
    metaDescription: "旅を静かに残す記録アーカイブです。",
    title: "MomentBook について",
    subtitle: "旅を静かに残す方法。",
    lead:
      "MomentBook は瞬間を旅としてまとめる記録アーカイブです。時間・場所・写真を一つの流れとして残し、フィードにはしません。",
    missionTitle: "なぜ必要か",
    missionParagraphs: [
      "記録が散らばると文脈が失われます。",
      "MomentBook は一日の流れを一つにまとめ、静かに振り返れるようにします。",
    ],
    principlesTitle: "原則",
    principles: [
      "旅中心の構造",
      "デフォルトは非公開",
      "リンクで静かな共有",
      "AIは補助者",
    ],
    sections: [
      {
        heading: "合う人",
        paragraphs: [
          "公開フィードなしで旅や日常を覚えておきたい人。",
          "長文よりも短いメモと写真が合う人。",
        ],
      },
      {
        heading: "合わないかもしれない人",
        paragraphs: [
          "ソーシャル拡散、ランキング、習慣管理を求める場合。",
        ],
      },
    ],
    privacyTitle: "公開と可視性",
    privacyParagraphs: [
      "基本は非公開です。",
      "投稿すると固有URLのWebページが作成され、共有や検索エンジンに表示される可能性があります。",
    ],
    closingTitle: "静かな意図",
    closingParagraph: "旅を静かに残したいなら MomentBook が合います。",
  },
  zh: {
    metaTitle: "关于 MomentBook",
    metaDescription: "一个安静记录旅程的档案空间。",
    title: "关于 MomentBook",
    subtitle: "安静保存旅程的方法。",
    lead:
      "MomentBook 将瞬间整理成旅程，保存时间、地点与照片的脉络，而不是做成信息流。",
    missionTitle: "为什么需要它",
    missionParagraphs: [
      "记录分散时，脉络就容易丢失。",
      "MomentBook 把一天的流れ保留下来，方便安静回看。",
    ],
    principlesTitle: "原则",
    principles: [
      "以旅程为单位",
      "默认私密",
      "通过链接安静分享",
      "AI 只是助手",
    ],
    sections: [
      {
        heading: "适合谁",
        paragraphs: [
          "想在没有公开信息流的情况下记录旅程的人。",
          "更喜欢短句和照片的人。",
        ],
      },
      {
        heading: "可能不适合谁",
        paragraphs: [
          "如果你需要社交扩散、排名或习惯管理，可能不适合。",
        ],
      },
    ],
    privacyTitle: "发布与可见性",
    privacyParagraphs: [
      "默认是私密的。",
      "发布后会生成一个公开网页链接，可被分享，也可能被搜索引擎收录。",
    ],
    closingTitle: "安静的意图",
    closingParagraph: "如果你想安静地保存旅程，MomentBook 就是为此而做。",
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
  const path = "/about";
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
