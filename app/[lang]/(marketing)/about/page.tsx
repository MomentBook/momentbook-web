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

const aboutContent: Partial<Record<Language, AboutContent>> & { en: AboutContent } = {
  en: {
    metaTitle: "About MomentBook",
    metaDescription: "A quiet archive for journeys and the people it fits.",
    title: "About MomentBook",
    subtitle: "A quiet way to keep journeys.",
    lead:
      "MomentBook gathers moments into journeys. Time, place, and photos stay together without becoming a feed.",
    missionTitle: "Why it exists",
    missionParagraphs: [
      "Moments scatter across cameras, maps, and messages, and the context fades.",
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
      "Publishing creates a public web page with a unique URL you can share, and it may be indexed by search engines.",
    ],
    closingTitle: "Quiet by design",
    closingParagraph: "If you want a calm archive for your journeys, MomentBook was built for that.",
  },
  ko: {
    metaTitle: "MomentBook 소개",
    metaDescription: "여정을 조용히 정리해 두는 기록 아카이브입니다.",
    title: "MomentBook 소개",
    subtitle: "여정을 가만히 남기는 방법.",
    lead:
      "MomentBook은 순간을 여정으로 묶어 정리합니다. 시간, 장소, 사진이 함께 남고 피드가 되지 않습니다.",
    missionTitle: "왜 필요한가요",
    missionParagraphs: [
      "기록이 흩어지면 맥락이 흐려집니다.",
      "MomentBook은 하루의 흐름을 한곳에 모아 조용히 돌아볼 수 있게 합니다.",
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
          "공개 피드 없이 여행이나 일상을 기억하고 싶은 분.",
          "긴 글보다 짧은 메모와 사진이 편한 분.",
        ],
      },
      {
        heading: "맞지 않을 수 있는 경우",
        paragraphs: [
          "소셜 확산이나 랭킹, 습관 관리가 중심이라면 맞지 않을 수 있습니다.",
        ],
      },
    ],
    privacyTitle: "게시와 공개 범위",
    privacyParagraphs: [
      "기본은 비공개입니다.",
      "게시하면 고유 URL 페이지가 만들어지며, 링크 공유와 검색 엔진 수집이 가능할 수 있습니다.",
    ],
    closingTitle: "조용한 의도",
    closingParagraph: "조용한 기록이 필요하다면 MomentBook이 맞습니다.",
  },
  ja: {
    metaTitle: "MomentBook について",
    metaDescription: "旅を静かに残すための記録アーカイブです。",
    title: "MomentBook について",
    subtitle: "旅を静かに残す方法。",
    lead:
      "MomentBook は瞬間を旅としてまとめて残します。時間・場所・写真が一つの流れとして残り、フィードにはしません。",
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
      "MomentBook 将瞬间整理成旅程，保留时间、地点与照片的脉络，而不是做成信息流。",
    missionTitle: "为什么需要它",
    missionParagraphs: [
      "记录分散时，脉络就容易丢失。",
      "MomentBook 把一天的脉络保留下来，方便安静回看。",
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
  if (lang === "es") {
    return {
      ...aboutContent.en,
      metaTitle: "Acerca de MomentBook",
      metaDescription: "Un archivo tranquilo para viajes y personas a quienes les encaja.",
      title: "Acerca de MomentBook",
      subtitle: "Una forma tranquila de guardar viajes.",
      lead: "MomentBook reune momentos en viajes. Tiempo, lugar y fotos permanecen juntos sin convertirse en feed.",
    };
  }

  if (lang === "pt") {
    return {
      ...aboutContent.en,
      metaTitle: "Sobre o MomentBook",
      metaDescription: "Um arquivo tranquilo para jornadas e pessoas que combinam com essa ideia.",
      title: "Sobre o MomentBook",
      subtitle: "Uma forma tranquila de guardar jornadas.",
      lead: "MomentBook reune momentos em jornadas. Tempo, lugar e fotos ficam juntos sem virar um feed.",
    };
  }

  if (lang === "fr") {
    return {
      ...aboutContent.en,
      metaTitle: "A propos de MomentBook",
      metaDescription: "Une archive calme pour les voyages et les personnes a qui cela correspond.",
      title: "A propos de MomentBook",
      subtitle: "Une facon calme de conserver ses voyages.",
      lead: "MomentBook rassemble les moments en voyages. Temps, lieux et photos restent ensemble sans devenir un feed.",
    };
  }

  if (lang === "th") {
    return {
      ...aboutContent.en,
      metaTitle: "เกี่ยวกับ MomentBook",
      metaDescription: "พื้นที่เก็บบันทึกแบบสงบสำหรับทริปและผู้ที่เหมาะกับแนวทางนี้",
      title: "เกี่ยวกับ MomentBook",
      subtitle: "วิธีเก็บทริปอย่างเงียบสงบ",
      lead: "MomentBook รวมช่วงเวลาเป็นทริป เวลา สถานที่ และรูปจะอยู่ด้วยกันโดยไม่กลายเป็นฟีด",
    };
  }

  if (lang === "vi") {
    return {
      ...aboutContent.en,
      metaTitle: "Ve MomentBook",
      metaDescription: "Kho luu tru nhe nhang cho hanh trinh va nhung nguoi phu hop voi no.",
      title: "Ve MomentBook",
      subtitle: "Mot cach nhe nhang de giu lai hanh trinh.",
      lead: "MomentBook gom cac khoanh khac thanh hanh trinh. Thoi gian, dia diem va anh di cung nhau ma khong tro thanh feed.",
    };
  }

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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/about"), siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: content.metaTitle,
    description: content.metaDescription,
    url: pageUrl,
    mainEntity: {
      "@type": "Organization",
      name: "MomentBook",
      url: siteUrl,
    },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
