import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
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
  heroDeviceText: string;
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
    metaDescription: "Why MomentBook exists and who it is for.",
    title: "MomentBook is a quiet place for noticing",
    subtitle: "No pressure, no performance. Just the moments you want to keep.",
    heroDeviceText: "A day, softly held",
    sections: [
      {
        heading: "What it is",
        paragraphs: [
          "A space to save the small things: a photo, a short note, a place on the map.",
          "Moments gather into days, so the story stays simple.",
        ],
      },
      {
        heading: "Who it is for",
        paragraphs: [
          "For people who want to remember without a routine.",
          "If you want to keep travel days and ordinary days in the same way, this is for you.",
        ],
      },
      {
        heading: "What it avoids",
        paragraphs: [
          "No social feed, no likes, no streaks.",
          "No performance, no pressure, no public timeline.",
        ],
      },
      {
        heading: "How it fits",
        paragraphs: [
          "Open it when you want. Close it when you do not.",
          "It is meant to be quiet, not demanding.",
        ],
      },
    ],
    privacy: {
      heading: "Privacy by design",
      paragraphs: [
        "Your moments stay on your device unless you choose to sync.",
        "You stay in control of what is kept and what is shared.",
      ],
      emphasized: "We do not sell data or track behavior.",
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
    metaDescription: "MomentBook이 왜 필요한지, 누구에게 어울리는지 안내합니다.",
    title: "MomentBook은 알아차림을 위한 조용한 공간입니다",
    subtitle: "성과도, 공개도 없습니다. 남기고 싶은 순간만 담습니다.",
    heroDeviceText: "하루를 조용히 담다",
    sections: [
      {
        heading: "무엇인가요",
        paragraphs: [
          "사진, 짧은 메모, 그리고 지도를 통해 순간을 남깁니다.",
          "순간이 모여 하루가 단순하게 정리됩니다.",
        ],
      },
      {
        heading: "누구에게 어울리나요",
        paragraphs: [
          "루틴 없이도 기억하고 싶은 사람에게 어울립니다.",
          "여행과 일상을 같은 방식으로 남기고 싶다면 적합합니다.",
        ],
      },
      {
        heading: "하지 않는 것",
        paragraphs: [
          "소셜 피드, 좋아요, 연속 기록이 없습니다.",
          "보여주기 위한 기록이 아니라 나를 위한 기록입니다.",
        ],
      },
      {
        heading: "어떻게 맞춰지는지",
        paragraphs: [
          "원할 때 열고, 원치 않으면 닫으면 됩니다.",
          "조용히 곁에 있는 방식을 지향합니다.",
        ],
      },
    ],
    privacy: {
      heading: "프라이버시 중심",
      paragraphs: [
        "동기화를 선택하지 않는 한 기록은 기기에 남습니다.",
        "무엇을 남길지, 공유할지는 당신이 결정합니다.",
      ],
      emphasized: "데이터를 판매하거나 행동을 추적하지 않습니다.",
    },
    closing: {
      heading: "맞지 않을 수 있는 분",
      paragraphs: [
        "공개 공유, 긴 글쓰기, 습관 관리를 원한다면 맞지 않을 수 있습니다.",
      ],
      emphasized: "MomentBook은 조용한 기억을 위한 앱입니다.",
    },
  },
  ja: {
    metaTitle: "MomentBook について",
    metaDescription: "MomentBook がなぜ必要か、誰に合うかを紹介します。",
    title: "MomentBook は気づきを残す静かな場所です",
    subtitle: "成果も公開もありません。残したい瞬間だけ。",
    heroDeviceText: "一日をそっと残す",
    sections: [
      {
        heading: "どんなアプリか",
        paragraphs: [
          "写真、短いメモ、地図で瞬間を残します。",
          "瞬間が集まり、一日がシンプルにまとまります。",
        ],
      },
      {
        heading: "誰に合うか",
        paragraphs: [
          "習慣にしなくても記録したい人に合います。",
          "旅の日も日常も同じように残したい方へ。",
        ],
      },
      {
        heading: "やらないこと",
        paragraphs: [
          "ソーシャルフィード、いいね、連続記録はありません。",
          "見せるためではなく、自分のための記録です。",
        ],
      },
      {
        heading: "どう寄り添うか",
        paragraphs: [
          "開きたいときに開き、そうでないときは閉じるだけ。",
          "静かに寄り添うことを大切にしています。",
        ],
      },
    ],
    privacy: {
      heading: "プライバシー中心",
      paragraphs: [
        "同期を選ばない限り記録は端末に保存されます。",
        "残す内容も共有も自分で決められます。",
      ],
      emphasized: "データ販売や行動追跡は行いません。",
    },
    closing: {
      heading: "合わないかもしれない人",
      paragraphs: [
        "公開共有、長文の記録、習慣管理が必要な方には合わないかもしれません。",
      ],
      emphasized: "MomentBook は静かな記憶のためのアプリです。",
    },
  },
  zh: {
    metaTitle: "关于 MomentBook",
    metaDescription: "MomentBook 的理念与适合的人群。",
    title: "MomentBook 是记录注意力的安静空间",
    subtitle: "没有成绩，也没有公开。只留下你想要的瞬间。",
    heroDeviceText: "安静留下这一天",
    sections: [
      {
        heading: "它是什么",
        paragraphs: [
          "用照片、短句和地图保存瞬间。",
          "瞬间会汇总成简单的一天。",
        ],
      },
      {
        heading: "它适合谁",
        paragraphs: [
          "适合不想被习惯束缚、却想留下记忆的人。",
          "如果你想同样保存旅行和日常，这里适合你。",
        ],
      },
      {
        heading: "它不会做什么",
        paragraphs: [
          "没有社交动态、没有点赞、没有连续记录。",
          "不是为了展示，而是为了自己。",
        ],
      },
      {
        heading: "如何融入生活",
        paragraphs: [
          "想打开时打开，不想时就关闭。",
          "它的存在应该是安静的。",
        ],
      },
    ],
    privacy: {
      heading: "隐私优先",
      paragraphs: [
        "除非你选择同步，记录只保存在设备中。",
        "保存与分享都由你决定。",
      ],
      emphasized: "我们不出售数据，也不追踪行为。",
    },
    closing: {
      heading: "可能不适合谁",
      paragraphs: [
        "如果你需要公开分享、长篇记录或习惯管理，这里可能不适合你。",
      ],
      emphasized: "MomentBook 适合安静地记住。",
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
      <header className={styles.hero}>
        <div className={styles.heroInner}>
          <FadeIn>
            <div className={styles.heroCopy}>
              <h1 className={styles.title}>{content.title}</h1>
              <p className={styles.subtitle}>{content.subtitle}</p>
            </div>
          </FadeIn>
          <FadeIn delay={150}>
            <div className={styles.heroVisual}>
              <DeviceMock>
                <span>{content.heroDeviceText}</span>
              </DeviceMock>
            </div>
          </FadeIn>
        </div>
      </header>

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
        <FadeIn>
          <h2 className={styles.sectionTitle}>{content.privacy.heading}</h2>
          {content.privacy.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={`${content.privacy.heading}-${paragraphIndex}`} className={styles.sectionText}>
              {paragraph}
            </p>
          ))}
          <p className={styles.emphasized}>{content.privacy.emphasized}</p>
        </FadeIn>
      </section>

      <section className={styles.closingSection}>
        <FadeIn>
          <h2 className={styles.sectionTitle}>{content.closing.heading}</h2>
          {content.closing.paragraphs.map((paragraph, paragraphIndex) => (
            <p key={`${content.closing.heading}-${paragraphIndex}`} className={styles.sectionText}>
              {paragraph}
            </p>
          ))}
          <p className={styles.emphasized}>{content.closing.emphasized}</p>
        </FadeIn>
      </section>
    </div>
  );
}
