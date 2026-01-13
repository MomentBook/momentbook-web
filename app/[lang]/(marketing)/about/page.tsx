import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import styles from "./about.module.scss";
import { type Language } from "@/lib/i18n/config";

type AboutSection = {
  heading: string;
  paragraphs: string[];
  deviceText: string;
};

type AboutContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  sections: AboutSection[];
  privacy: {
    heading: string;
    paragraphs: string[];
    emphasized: string;
  };
  closing: {
    heading: string;
    paragraphs: string[];
    emphasized: string;
  };
};

const aboutContent: Record<Language, AboutContent> = {
  en: {
    metaTitle: "About MomentBook",
    metaDescription: "What MomentBook is and how it fits into your day.",
    title: "MomentBook is a quiet record of your days",
    subtitle: "Not a diary. Not a feed. Just a place for what you notice.",
    sections: [
      {
        heading: "A place for small moments",
        paragraphs: [
          "Capture a photo or a short note when something feels worth keeping.",
          "Moments stay connected to the time and place they happened.",
        ],
        deviceText: "A moment, held",
      },
      {
        heading: "Made for real life",
        paragraphs: [
          "For people who want to remember without a routine.",
          "If you've ever wondered where you were or how a day felt, this is for that.",
        ],
        deviceText: "For real days",
      },
      {
        heading: "What it doesn't do",
        paragraphs: [
          "No social feed, no likes, no streaks.",
          "Nothing to keep up with, nothing to perform.",
        ],
        deviceText: "No pressure",
      },
      {
        heading: "A day you can return to",
        paragraphs: [
          "Moments gather into simple day views.",
          "Open it when you want. Let it rest when you don't.",
        ],
        deviceText: "A day, returned",
      },
    ],
    privacy: {
      heading: "Privacy as the baseline",
      paragraphs: [
        "Your moments stay on your device.",
        "Optional sync is yours to choose.",
      ],
      emphasized: "We don't sell data or track behavior.",
    },
    closing: {
      heading: "Who it might not fit",
      paragraphs: [
        "If you want public sharing, long-form journaling, or habit tracking, this may not be for you.",
      ],
      emphasized: "MomentBook is for quiet remembering, not performance.",
    },
  },
  ko: {
    metaTitle: "MomentBook 소개",
    metaDescription: "MomentBook의 철학과 쓰임을 소개합니다.",
    title: "MomentBook은 하루를 조용히 기록하는 공간입니다",
    subtitle: "일기도, 피드도 아닙니다. 알아차린 순간을 담을 뿐입니다.",
    sections: [
      {
        heading: "작은 순간을 담는 곳",
        paragraphs: [
          "기억하고 싶은 순간에 사진이나 짧은 메모를 남기세요.",
          "순간은 시간과 장소와 함께 이어집니다.",
        ],
        deviceText: "순간을 담다",
      },
      {
        heading: "일상에 맞춘 방식",
        paragraphs: [
          "루틴 없이도 기록하고 싶은 사람을 위해 만들었습니다.",
          "어디 있었는지, 그날이 어땠는지 떠올리고 싶을 때를 위한 앱입니다.",
        ],
        deviceText: "일상의 기록",
      },
      {
        heading: "하지 않는 것들",
        paragraphs: [
          "소셜 피드도, 좋아요도, 연속 기록도 없습니다.",
          "보여주기 위한 기록이 아니라 나를 위한 기록입니다.",
        ],
        deviceText: "부담 없음",
      },
      {
        heading: "다시 돌아볼 수 있는 하루",
        paragraphs: [
          "순간들이 모여 하루가 단순하게 정리됩니다.",
          "원할 때 열고, 필요 없으면 쉬어도 됩니다.",
        ],
        deviceText: "하루를 되돌아봄",
      },
    ],
    privacy: {
      heading: "기본은 프라이버시",
      paragraphs: [
        "기록은 기기에 남습니다.",
        "동기화는 선택 사항입니다.",
      ],
      emphasized: "데이터를 판매하거나 행동을 추적하지 않습니다.",
    },
    closing: {
      heading: "이런 분에게는 맞지 않을 수 있어요",
      paragraphs: [
        "공유가 중심인 서비스나 긴 글쓰기, 습관 관리가 필요하다면 맞지 않을 수 있습니다.",
      ],
      emphasized: "MomentBook은 조용히 기억하기 위한 앱입니다.",
    },
  },
  ja: {
    metaTitle: "MomentBook について",
    metaDescription: "MomentBook がどんなアプリかをご紹介します。",
    title: "MomentBook は一日を静かに記録する場所です",
    subtitle: "日記でも、フィードでもありません。気づいた瞬間を残すだけ。",
    sections: [
      {
        heading: "小さな瞬間のために",
        paragraphs: [
          "残したいと感じたときに写真や短いメモを保存します。",
          "瞬間は時間と場所とともに記録されます。",
        ],
        deviceText: "瞬間を残す",
      },
      {
        heading: "日常のための設計",
        paragraphs: [
          "習慣にしなくても記録したい人のために作りました。",
          "どこにいて、どんな一日だったかを思い出したいときのためのアプリです。",
        ],
        deviceText: "日々の記録",
      },
      {
        heading: "やらないこと",
        paragraphs: [
          "ソーシャルフィードも、いいねも、連続記録もありません。",
          "見せるためではなく、自分のための記録です。",
        ],
        deviceText: "プレッシャーなし",
      },
      {
        heading: "あとで戻れる一日",
        paragraphs: [
          "瞬間が集まって一日の流れが見えてきます。",
          "見たいときに開き、必要なければ休んでも大丈夫です。",
        ],
        deviceText: "一日を振り返る",
      },
    ],
    privacy: {
      heading: "プライバシーが基準",
      paragraphs: [
        "記録は端末に保存されます。",
        "同期は選択制です。",
      ],
      emphasized: "データを販売したり行動を追跡したりしません。",
    },
    closing: {
      heading: "合わないかもしれない人",
      paragraphs: [
        "公開共有や長文の記録、習慣管理を求める方には合わないかもしれません。",
      ],
      emphasized: "MomentBook は静かな記憶のためのアプリです。",
    },
  },
  zh: {
    metaTitle: "关于 MomentBook",
    metaDescription: "了解 MomentBook 的理念与使用方式。",
    title: "MomentBook 是记录一天的安静空间",
    subtitle: "不是日记，也不是动态。只是留住你注意到的瞬间。",
    sections: [
      {
        heading: "为小小瞬间而设",
        paragraphs: [
          "当你觉得值得留下时，记录一张照片或一句话。",
          "瞬间会与时间和地点一起保存。",
        ],
        deviceText: "留下瞬间",
      },
      {
        heading: "为真实生活而做",
        paragraphs: [
          "为不想被习惯驱动、但想留下记忆的人而做。",
          "当你想起那天在哪里、感觉如何时，它会帮你记起。",
        ],
        deviceText: "日常记录",
      },
      {
        heading: "不会做的事",
        paragraphs: [
          "没有社交动态、没有点赞、没有打卡。",
          "不是为了展示，而是为了自己。",
        ],
        deviceText: "没有压力",
      },
      {
        heading: "随时可回看的日子",
        paragraphs: [
          "瞬间会组合成简单的一天视图。",
          "想看时打开，不想时就让它安静。",
        ],
        deviceText: "一天可回看",
      },
    ],
    privacy: {
      heading: "隐私是基础",
      paragraphs: [
        "记录保存在你的设备里。",
        "同步是可选的。",
      ],
      emphasized: "我们不会出售数据或追踪行为。",
    },
    closing: {
      heading: "可能不适合谁",
      paragraphs: [
        "如果你需要公开分享、长篇写作或习惯管理，这里可能不适合你。",
      ],
      emphasized: "MomentBook 用于安静地记住。",
    },
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
      <header className={styles.header}>
        <FadeIn>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.subtitle}</p>
        </FadeIn>
      </header>

      {content.sections.map((section, index) => (
        <section
          key={`${section.heading}-${index}`}
          className={`${styles.section} ${index % 2 === 1 ? styles.sectionReverse : ""}`}
        >
          <FadeIn>
            <div className={styles.visual}>
              <DeviceMock>
                <span>{section.deviceText}</span>
              </DeviceMock>
            </div>
          </FadeIn>
          <FadeIn delay={100}>
            <div className={styles.text}>
              <h2 className={styles.heading}>{section.heading}</h2>
              {section.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${section.heading}-${paragraphIndex}`}>{paragraph}</p>
              ))}
            </div>
          </FadeIn>
        </section>
      ))}

      <section className={styles.privacySection}>
        <FadeIn>
          <h2 className={styles.heading}>{content.privacy.heading}</h2>
          {content.privacy.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={`${content.privacy.heading}-${paragraphIndex}`}>{paragraph}</p>
          ))}
          <p className={styles.emphasized}>{content.privacy.emphasized}</p>
        </FadeIn>
      </section>

      <section className={styles.closingSection}>
        <FadeIn>
          <h2 className={styles.heading}>{content.closing.heading}</h2>
          {content.closing.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={`${content.closing.heading}-${paragraphIndex}`}>{paragraph}</p>
          ))}
          <p className={styles.emphasized}>{content.closing.emphasized}</p>
        </FadeIn>
      </section>
    </div>
  );
}
