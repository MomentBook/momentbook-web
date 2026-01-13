import type { Metadata } from "next";
import styles from "@/styles/common.module.scss";
import { type Language } from "@/lib/i18n/config";

type HowItWorksSection = {
  heading: string;
  paragraphs: string[];
};

type HowItWorksContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  intro: string;
  steps: HowItWorksSection[];
  noPressureTitle: string;
  noPressureItems: string[];
};

const howItWorksContent: Record<Language, HowItWorksContent> = {
  en: {
    metaTitle: "How MomentBook Works",
    metaDescription: "Capture, organize, and revisit your moments without a routine.",
    title: "How MomentBook works",
    subtitle: "Three gentle steps, no routine required.",
    intro: "MomentBook is designed to fit around your day, not the other way around.",
    steps: [
      {
        heading: "Capture",
        paragraphs: [
          "Open the app when something feels worth keeping. Save a photo or a short line.",
          "If you allow location, the place is quietly saved too.",
        ],
      },
      {
        heading: "Let the day assemble",
        paragraphs: [
          "Moments gather by time and place into a simple day view.",
          "No folders to manage, no tags to maintain.",
        ],
      },
      {
        heading: "Return when you want",
        paragraphs: [
          "Browse by day or place whenever you want to remember.",
          "Export your moments anytime.",
        ],
      },
    ],
    noPressureTitle: "No pressure by design",
    noPressureItems: [
      "No streaks or goals",
      "No reminders or prompts",
      "No public feed or likes",
    ],
  },
  ko: {
    metaTitle: "MomentBook 작동 방식",
    metaDescription: "기록하고, 모으고, 원할 때 돌아보는 방식입니다.",
    title: "MomentBook 작동 방식",
    subtitle: "루틴 없이, 세 단계로 끝납니다.",
    intro: "MomentBook은 하루에 맞춰 조용히 따라옵니다.",
    steps: [
      {
        heading: "기록하기",
        paragraphs: [
          "기억하고 싶은 순간에 앱을 열고 사진이나 짧은 메모를 남기세요.",
          "위치 권한을 허용하면 장소도 함께 저장됩니다.",
        ],
      },
      {
        heading: "하루가 모이기",
        paragraphs: [
          "시간과 장소를 기준으로 순간이 모여 하루가 정리됩니다.",
          "폴더나 태그를 관리할 필요가 없습니다.",
        ],
      },
      {
        heading: "원할 때 돌아보기",
        paragraphs: [
          "날짜나 장소로 쉽게 다시 볼 수 있습니다.",
          "필요할 때 언제든 내보낼 수 있습니다.",
        ],
      },
    ],
    noPressureTitle: "부담 없는 설계",
    noPressureItems: [
      "연속 기록이나 목표 없음",
      "알림이나 재촉 없음",
      "공개 피드나 좋아요 없음",
    ],
  },
  ja: {
    metaTitle: "MomentBook の仕組み",
    metaDescription: "記録して、まとまり、好きなときに戻れます。",
    title: "MomentBook の仕組み",
    subtitle: "習慣不要の3ステップ。",
    intro: "MomentBook は一日の流れに合わせて静かに寄り添います。",
    steps: [
      {
        heading: "記録する",
        paragraphs: [
          "残したいときに開いて、写真や短いメモを保存します。",
          "位置情報を許可すると場所も一緒に保存されます。",
        ],
      },
      {
        heading: "一日がまとまる",
        paragraphs: [
          "時間と場所で瞬間が集まり、一日の流れが見えてきます。",
          "フォルダやタグの管理は不要です。",
        ],
      },
      {
        heading: "好きなときに戻る",
        paragraphs: [
          "日付や場所から見返せます。",
          "必要なときにいつでもエクスポートできます。",
        ],
      },
    ],
    noPressureTitle: "プレッシャーのない設計",
    noPressureItems: [
      "連続記録や目標なし",
      "通知や促しなし",
      "公開フィードやいいねなし",
    ],
  },
  zh: {
    metaTitle: "MomentBook 如何运作",
    metaDescription: "记录、整理，并在需要时回看。",
    title: "MomentBook 如何运作",
    subtitle: "无需习惯，三步完成。",
    intro: "MomentBook 贴合你的日常，而不是要求你改变。",
    steps: [
      {
        heading: "记录",
        paragraphs: [
          "当你想留下时打开应用，保存照片或短句。",
          "允许定位时，地点会一起保存。",
        ],
      },
      {
        heading: "一天自动成形",
        paragraphs: [
          "瞬间会按时间和地点整理成一天的视图。",
          "无需管理文件夹或标签。",
        ],
      },
      {
        heading: "想起时再看",
        paragraphs: [
          "可按日期或地点回看。",
          "需要时随时导出。",
        ],
      },
    ],
    noPressureTitle: "没有压力的设计",
    noPressureItems: [
      "没有连续记录或目标",
      "没有提醒或催促",
      "没有公开动态或点赞",
    ],
  },
};

function getHowItWorksContent(lang: Language): HowItWorksContent {
  return howItWorksContent[lang] ?? howItWorksContent.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getHowItWorksContent(lang);

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

export default async function HowItWorksPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getHowItWorksContent(lang);

  return (
    <div className={styles.container}>
      <article className={styles.content}>
        <header className={styles.header}>
          <h1 className={styles.title}>{content.title}</h1>
          <p className={styles.subtitle}>{content.subtitle}</p>
        </header>

        <div className={styles.textContent}>
          <p>{content.intro}</p>

          {content.steps.map((step, index) => (
            <section key={`${step.heading}-${index}`}>
              <h2 className={styles.heading2}>{step.heading}</h2>
              {step.paragraphs.map((paragraph, paragraphIndex) => (
                <p key={`${step.heading}-${paragraphIndex}`}>{paragraph}</p>
              ))}
            </section>
          ))}

          <h2 className={styles.heading2}>{content.noPressureTitle}</h2>
          <ul className={styles.list}>
            {content.noPressureItems.map((item, index) => (
              <li key={`${content.noPressureTitle}-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      </article>
    </div>
  );
}
