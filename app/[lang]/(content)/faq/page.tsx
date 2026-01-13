import type { Metadata } from "next";
import Link from "next/link";
import faqStyles from "./faq.module.scss";
import { type Language } from "@/lib/i18n/config";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQContent = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageSubtitle: string;
  calloutPrefix: string;
  calloutLink: string;
  calloutSuffix: string;
  items: FAQItem[];
};

function getFaqContent(lang: Language): FAQContent {
  if (lang === "ko") {
    return {
      metaTitle: "MomentBook 자주 묻는 질문",
      metaDescription: "MomentBook에 대한 자주 묻는 질문을 모았습니다.",
      pageTitle: "MomentBook 자주 묻는 질문",
      pageSubtitle: "MomentBook을 빠르게 이해하는 답변을 모았습니다.",
      calloutPrefix: "여기에서 답을 찾지 못하셨나요? ",
      calloutLink: "문의하기",
      calloutSuffix: "",
      items: [
        {
          question: "MomentBook이 무엇인가요?",
          answer: "사진, 짧은 메모, 그리고 장소를 함께 남기는 조용한 기록 앱입니다.",
        },
        {
          question: "매일 사용해야 하나요?",
          answer: "아니요. 연속 기록이나 일일 목표는 없고, 필요할 때 이동 감지/여정 마무리 알림이 있습니다.",
        },
        {
          question: "무엇을 기록할 수 있나요?",
          answer: "사진, 짧은 메모, 그리고 허용한 경우 위치 정보입니다.",
        },
        {
          question: "오프라인에서도 사용할 수 있나요?",
          answer: "네. 기록은 기기에 저장되어 오프라인에서도 볼 수 있습니다.",
        },
        {
          question: "비공개인가요?",
          answer: "기본은 비공개입니다. 게시하면 웹에 공개됩니다.",
        },
        {
          question: "항상 위치를 추적하나요?",
          answer: "허용한 경우에만 위치를 사용하며, 순간 정리와 이동 감지/여정 마무리 알림에 사용합니다.",
        },
        {
          question: "기기 간 동기화가 되나요?",
          answer: "네. 개인 클라우드를 통해 선택적으로 동기화할 수 있습니다.",
        },
        {
          question: "데이터를 내보낼 수 있나요?",
          answer: "네. 언제든지 내보낼 수 있습니다.",
        },
        {
          question: "어디에서 다운로드하나요?",
          answer: "App Store와 Google Play에서 받을 수 있습니다.",
        },
      ],
    };
  }

  if (lang === "ja") {
    return {
      metaTitle: "MomentBook よくある質問",
      metaDescription: "MomentBookに関するよくある質問をまとめています。",
      pageTitle: "MomentBook よくある質問",
      pageSubtitle: "MomentBookについての回答をまとめました。",
      calloutPrefix: "ここで解決しない場合は、",
      calloutLink: "お問い合わせ",
      calloutSuffix: "ください。",
      items: [
        {
          question: "MomentBook とは何ですか？",
          answer: "写真や短いメモ、場所を静かに残すアプリです。",
        },
        {
          question: "毎日使う必要はありますか？",
          answer: "ありません。連続記録や日々の目標はなく、必要なときに移動検知/旅の終了リマインドがあります。",
        },
        {
          question: "何を記録できますか？",
          answer: "写真、短いメモ、許可した場合の位置情報です。",
        },
        {
          question: "オフラインでも使えますか？",
          answer: "はい。記録は端末に保存され、オフラインでも閲覧できます。",
        },
        {
          question: "非公開ですか？",
          answer: "基本は非公開です。投稿するとWebで公開されます。",
        },
        {
          question: "位置情報は常に追跡しますか？",
          answer: "許可した場合のみ使用し、記録の整理や移動検知/旅の終了リマインドに使います。",
        },
        {
          question: "端末間の同期はできますか？",
          answer: "はい。個人のクラウドで任意に同期できます。",
        },
        {
          question: "データはエクスポートできますか？",
          answer: "はい。いつでも可能です。",
        },
        {
          question: "どこで入手できますか？",
          answer: "App Store と Google Play で入手できます。",
        },
      ],
    };
  }

  if (lang === "zh") {
    return {
      metaTitle: "MomentBook 常见问题",
      metaDescription: "汇总了关于 MomentBook 的常见问题。",
      pageTitle: "MomentBook 常见问题",
      pageSubtitle: "关于 MomentBook 的回答汇总。",
      calloutPrefix: "还有其他问题？",
      calloutLink: "联系我们",
      calloutSuffix: "",
      items: [
        {
          question: "MomentBook 是什么？",
          answer: "用于保存照片、短句和地点的安静记录应用。",
        },
        {
          question: "需要每天使用吗？",
          answer: "不需要。没有连续记录或每日目标，但需要时会有行程变化与结束提醒。",
        },
        {
          question: "可以记录什么？",
          answer: "照片、短句，以及你允许时的位置信息。",
        },
        {
          question: "离线可用吗？",
          answer: "可以。记录保存在设备上，离线也能查看。",
        },
        {
          question: "是私密的吗？",
          answer: "默认私密，发布后会在网页公开。",
        },
        {
          question: "会一直追踪位置吗？",
          answer: "只在你允许时使用，用于整理记录和行程变化与结束提醒。",
        },
        {
          question: "可以跨设备同步吗？",
          answer: "可以。通过个人云存储选择性同步。",
        },
        {
          question: "可以导出数据吗？",
          answer: "可以，随时导出。",
        },
        {
          question: "在哪里下载？",
          answer: "可在 App Store 与 Google Play 下载。",
        },
      ],
    };
  }

  return {
    metaTitle: "MomentBook FAQ",
    metaDescription: "Frequently asked questions about MomentBook.",
    pageTitle: "MomentBook FAQ",
    pageSubtitle: "Straight answers about MomentBook.",
    calloutPrefix: "Have a question that's not answered here? ",
    calloutLink: "Get in touch",
    calloutSuffix: "",
    items: [
      {
        question: "What is MomentBook?",
        answer: "A quiet app for saving moments—photos, short notes, and the places they happened.",
      },
      {
        question: "Do I have to use it every day?",
        answer: "No. There are no streaks or daily goals. Travel and journey-end reminders appear only when needed.",
      },
      {
        question: "What can I capture?",
        answer: "A photo, a short note, and the location (if you allow it).",
      },
      {
        question: "Does it work offline?",
        answer: "Yes. Your moments live on your device.",
      },
      {
        question: "Is it private?",
        answer: "Private by default. If you publish, that journey is public on the web.",
      },
      {
        question: "Does it track my location?",
        answer: "Only if you enable it. Location helps organize moments and send travel and journey-end reminders.",
      },
      {
        question: "Can I sync across devices?",
        answer: "Yes, optional sync through your own cloud storage.",
      },
      {
        question: "Can I export my data?",
        answer: "Yes, export anytime.",
      },
      {
        question: "Where can I download it?",
        answer: "Available on the App Store and Google Play.",
      },
    ],
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getFaqContent(lang);

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

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getFaqContent(lang);

  return (
    <div className={faqStyles.page}>
      <header className={faqStyles.header}>
        <h1 className={faqStyles.title}>{content.pageTitle}</h1>
        <p className={faqStyles.subtitle}>{content.pageSubtitle}</p>
      </header>

      <div className={faqStyles.faqGrid}>
        {content.items.map((faq, index) => (
          <section key={`${faq.question}-${index}`} className={faqStyles.faqItem}>
            <h2 className={faqStyles.faqQuestion}>{faq.question}</h2>
            <p className={faqStyles.faqAnswer}>{faq.answer}</p>
          </section>
        ))}
      </div>

      <aside className={faqStyles.callout}>
        <p>
          {content.calloutPrefix}
          <Link href={`/${lang}/support`} className={faqStyles.link}>
            {content.calloutLink}
          </Link>
          {content.calloutSuffix}
        </p>
      </aside>
    </div>
  );
}
