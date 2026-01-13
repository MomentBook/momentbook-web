import type { Metadata } from "next";
import styles from "./how-it-works.module.scss";
import { type Language } from "@/lib/i18n/config";

type HowItWorksStep = {
  title: string;
  text: string;
};

type HowItWorksDetail = {
  title: string;
  items: string[];
};

type HowItWorksContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  intro: string;
  steps: HowItWorksStep[];
  details: HowItWorksDetail[];
  noPressureTitle: string;
  noPressureItems: string[];
};

const howItWorksContent: Record<Language, HowItWorksContent> = {
  en: {
    metaTitle: "How MomentBook Works",
    metaDescription: "Capture, organize, and revisit your moments without a routine.",
    title: "How MomentBook works",
    subtitle: "Clear steps, minimal effort.",
    intro: "MomentBook is built for real days. It keeps your moments without demanding attention.",
    steps: [
      {
        title: "Capture",
        text: "Save a photo or a short note when something feels worth keeping. Add location if you want.",
      },
      {
        title: "Organize",
        text: "Moments group by time and place into a simple day view. No folders, no tags.",
      },
      {
        title: "Return",
        text: "Browse by day or place when you want to remember. Export anytime.",
      },
    ],
    details: [
      {
        title: "What gets saved",
        items: ["Photos", "Short notes", "Location (if enabled)", "Time of capture"],
      },
      {
        title: "When it becomes public",
        items: [
          "Only when you tap Publish",
          "Published journeys appear on the web",
          "You control what is shared",
        ],
      },
    ],
    noPressureTitle: "On your terms",
    noPressureItems: [
      "No streaks or daily goals",
      "Travel alerts when location changes",
      "Journey-end reminders",
      "Public sharing only when you post",
    ],
  },
  ko: {
    metaTitle: "MomentBook 작동 방식",
    metaDescription: "기록하고, 모으고, 원할 때 돌아보는 방식입니다.",
    title: "MomentBook 작동 방식",
    subtitle: "단순한 흐름, 최소한의 노력.",
    intro: "MomentBook은 현실적인 하루를 위한 앱입니다. 방해하지 않고 기록만 남깁니다.",
    steps: [
      {
        title: "기록",
        text: "기억하고 싶은 순간에 사진이나 짧은 메모를 남깁니다. 원하면 위치도 저장합니다.",
      },
      {
        title: "정리",
        text: "시간과 장소로 순간이 모여 하루가 정리됩니다. 폴더나 태그는 필요 없습니다.",
      },
      {
        title: "돌아보기",
        text: "날짜나 장소로 다시 볼 수 있습니다. 언제든 내보내기 가능합니다.",
      },
    ],
    details: [
      {
        title: "저장되는 것",
        items: ["사진", "짧은 메모", "위치(허용 시)", "기록 시각"],
      },
      {
        title: "웹에 공개되는 경우",
        items: ["게시하기를 눌렀을 때만", "게시된 여정은 웹에 공개", "공개 범위는 사용자가 선택"],
      },
    ],
    noPressureTitle: "내 방식대로",
    noPressureItems: [
      "연속 기록이나 목표 없음",
      "이동 감지 알림",
      "여정 마무리 알림",
      "게시할 때만 공개",
    ],
  },
  ja: {
    metaTitle: "MomentBook の仕組み",
    metaDescription: "記録して整理し、必要なときに戻れます。",
    title: "MomentBook の仕組み",
    subtitle: "シンプルな流れ、最小限の負担。",
    intro: "MomentBook は現実の一日に寄り添うアプリです。注意を奪わず記録だけ残します。",
    steps: [
      {
        title: "記録",
        text: "残したい瞬間に写真や短いメモを保存します。必要なら場所も保存します。",
      },
      {
        title: "整理",
        text: "時間と場所で瞬間がまとまり、一日が見えてきます。フォルダやタグは不要です。",
      },
      {
        title: "戻る",
        text: "日付や場所で見返せます。いつでもエクスポート可能です。",
      },
    ],
    details: [
      {
        title: "保存されるもの",
        items: ["写真", "短いメモ", "位置情報(許可時)", "記録時刻"],
      },
      {
        title: "公開される条件",
        items: ["投稿したときだけ", "公開した旅はWebで表示", "公開範囲は自分で決める"],
      },
    ],
    noPressureTitle: "自分のペースで",
    noPressureItems: [
      "連続記録や目標なし",
      "移動検知の通知",
      "旅の終了リマインド",
      "投稿時のみ公開",
    ],
  },
  zh: {
    metaTitle: "MomentBook 如何运作",
    metaDescription: "记录、整理，并在需要时回看。",
    title: "MomentBook 如何运作",
    subtitle: "简单流程，最小负担。",
    intro: "MomentBook 贴合真实生活，不打扰，只记录。",
    steps: [
      {
        title: "记录",
        text: "当你想留下时，保存照片或短句。需要的话可以保存地点。",
      },
      {
        title: "整理",
        text: "瞬间按时间与地点汇总成一天的视图，不需要文件夹或标签。",
      },
      {
        title: "回看",
        text: "按日期或地点查看，需要时随时导出。",
      },
    ],
    details: [
      {
        title: "保存的内容",
        items: ["照片", "短句", "位置信息(允许时)", "记录时间"],
      },
      {
        title: "何时公开",
        items: ["仅在点击发布时", "发布的旅程会在网页公开", "公开范围由你决定"],
      },
    ],
    noPressureTitle: "按你的节奏",
    noPressureItems: ["没有连续记录或目标", "行程变化提醒", "行程结束提醒", "仅发布时公开"],
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
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>{content.title}</h1>
        <p className={styles.subtitle}>{content.subtitle}</p>
        <p className={styles.intro}>{content.intro}</p>
      </header>

      <section className={styles.steps}>
        {content.steps.map((step, index) => (
          <div key={`${step.title}-${index}`} className={styles.stepCard}>
            <span className={styles.stepNumber}>{index + 1}</span>
            <h2 className={styles.stepTitle}>{step.title}</h2>
            <p className={styles.stepText}>{step.text}</p>
          </div>
        ))}
      </section>

      <section className={styles.detailGrid}>
        {content.details.map((detail) => (
          <div key={detail.title} className={styles.detailCard}>
            <h2 className={styles.detailTitle}>{detail.title}</h2>
            <ul className={styles.detailList}>
              {detail.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className={styles.noPressure}>
        <h2 className={styles.noPressureTitle}>{content.noPressureTitle}</h2>
        <ul className={styles.noPressureList}>
          {content.noPressureItems.map((item) => (
            <li key={item} className={styles.noPressureItem}>
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
