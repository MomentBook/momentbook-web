import type { Metadata } from "next";
import styles from "./how-it-works.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

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
    metaDescription: "Keep moments as journeys, quietly and on your terms.",
    title: "How MomentBook works",
    subtitle: "A simple flow, minimal effort.",
    intro: "MomentBook keeps moments as journeys without asking for a routine.",
    steps: [
      {
        title: "Capture",
        text: "Save a photo or a short note. If you allow location, it adds place and time.",
      },
      {
        title: "Gather",
        text: "Moments gather into a journey with a beginning and an end, showing the flow of time and place.",
      },
      {
        title: "Return",
        text: "Review the journey and publish only if you want to share.",
      },
    ],
    details: [
      {
        title: "What gets saved",
        items: ["Photos", "Short notes", "Time of capture", "Places and route (if location is allowed)"],
      },
      {
        title: "How routes appear",
        items: [
          "Strong route when GPS is rich and precise",
          "Soft route when GPS is intermittent",
          "No route when location is not allowed",
        ],
      },
      {
        title: "When it becomes public",
        items: [
          "Only when you tap Publish",
          "Creates a public web page with a unique URL",
          "Anyone with the link can view, and it may be indexed",
        ],
      },
    ],
    noPressureTitle: "On your terms",
    noPressureItems: [
      "No feeds, likes, or rankings",
      "No streaks or daily goals",
      "Private by default",
      "Share only when you choose",
    ],
  },
  ko: {
    metaTitle: "MomentBook 작동 방식",
    metaDescription: "순간을 여정으로 남기는 조용한 방식입니다.",
    title: "MomentBook 작동 방식",
    subtitle: "단순한 흐름, 최소한의 노력.",
    intro: "MomentBook은 일상을 방해하지 않고 순간을 여정으로 남깁니다.",
    steps: [
      {
        title: "기록",
        text: "사진이나 짧은 메모를 남깁니다. 위치를 허용하면 시간과 장소가 함께 기록됩니다.",
      },
      {
        title: "정리",
        text: "순간이 모여 하나의 여정이 되고, 시간과 장소의 흐름이 보입니다.",
      },
      {
        title: "돌아보기",
        text: "여정을 다시 보고, 공유가 필요할 때만 게시합니다.",
      },
    ],
    details: [
      {
        title: "저장되는 것",
        items: ["사진", "짧은 메모", "기록 시각", "장소와 경로(허용 시)"],
      },
      {
        title: "경로 표현 방식",
        items: [
          "GPS가 풍부하면 선명한 경로",
          "GPS가 간헐이면 느슨한 경로",
          "권한 미허용 시 경로 없음",
        ],
      },
      {
        title: "웹에 공개되는 경우",
        items: ["게시하기를 눌렀을 때만", "게시된 여정은 웹에 공개", "공개 여부는 사용자가 선택"],
      },
      {
        title: "공개 페이지의 성격",
        items: [
          "고유 URL의 웹페이지가 생성됨",
          "링크를 아는 사람은 열람 가능",
          "검색 엔진에 수집될 수 있음",
        ],
      },
    ],
    noPressureTitle: "내 방식대로",
    noPressureItems: [
      "피드, 좋아요, 랭킹 없음",
      "연속 기록이나 목표 없음",
      "기본은 비공개",
      "원할 때만 공유",
    ],
  },
  ja: {
    metaTitle: "MomentBook の仕組み",
    metaDescription: "瞬間を旅として静かに残します。",
    title: "MomentBook の仕組み",
    subtitle: "シンプルな流れ、最小限の負担。",
    intro: "MomentBook は日常を邪魔せず、瞬間を旅として残します。",
    steps: [
      {
        title: "記録",
        text: "写真や短いメモを保存します。位置情報を許可すると場所と時間も残ります。",
      },
      {
        title: "整理",
        text: "瞬間が一つの旅にまとまり、時間と場所の流れが見えてきます。",
      },
      {
        title: "戻る",
        text: "旅を見返し、必要なときだけ投稿して共有します。",
      },
    ],
    details: [
      {
        title: "保存されるもの",
        items: ["写真", "短いメモ", "記録時刻", "場所とルート(許可時)"],
      },
      {
        title: "ルート表示",
        items: [
          "GPSが十分なら明確なルート",
          "GPSが途切れると緩やかなルート",
          "許可がない場合はルートなし",
        ],
      },
      {
        title: "公開される条件",
        items: ["投稿したときだけ", "公開した旅はWebで表示", "公開するかどうかは自分で決める"],
      },
      {
        title: "公開ページについて",
        items: [
          "固有URLのWebページが作成される",
          "リンクを知っている人は閲覧可能",
          "検索エンジンに表示される可能性がある",
        ],
      },
    ],
    noPressureTitle: "自分のペースで",
    noPressureItems: [
      "フィード、いいね、ランキングなし",
      "連続記録や目標なし",
      "デフォルトは非公開",
      "必要なときだけ共有",
    ],
  },
  zh: {
    metaTitle: "MomentBook 如何运作",
    metaDescription: "把瞬间安静地保存为旅程。",
    title: "MomentBook 如何运作",
    subtitle: "简单流程，最小负担。",
    intro: "MomentBook 不打扰日常，把瞬间整理成旅程。",
    steps: [
      {
        title: "记录",
        text: "保存照片或短句。允许位置后，会记录地点与时间。",
      },
      {
        title: "整理",
        text: "瞬间汇成一段旅程，时间与地点的脉络会变得清晰。",
      },
      {
        title: "回看",
        text: "回看旅程，需要时再发布分享。",
      },
    ],
    details: [
      {
        title: "保存的内容",
        items: ["照片", "短句", "记录时间", "地点与路线(允许时)"],
      },
      {
        title: "路线呈现方式",
        items: [
          "GPS 充足时显示清晰路线",
          "GPS 间歇时显示柔和路线",
          "未允许时不显示路线",
        ],
      },
      {
        title: "何时公开",
        items: ["仅在点击发布时", "发布的旅程会在网页公开", "是否公开由你决定"],
      },
      {
        title: "公开页面",
        items: [
          "生成唯一 URL 的网页",
          "知道链接的人可以访问",
          "可能被搜索引擎收录",
        ],
      },
    ],
    noPressureTitle: "按你的节奏",
    noPressureItems: ["没有信息流、点赞或排名", "没有连续记录或目标", "默认私密", "仅在需要时分享"],
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
  const path = "/how-it-works";
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
