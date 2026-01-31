import type { Metadata } from "next";
import Link from "next/link";
import faqStyles from "./faq.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

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
      metaTitle: "MomentBook 질문과 답",
      metaDescription: "MomentBook을 조용히 이해할 수 있는 질문과 답입니다.",
      pageTitle: "MomentBook 질문과 답",
      pageSubtitle: "짧고 차분한 답변을 모았습니다.",
      calloutPrefix: "더 필요한 내용이 있나요? ",
      calloutLink: "문의하기",
      calloutSuffix: "",
      items: [
        {
          question: "MomentBook이 무엇인가요?",
          answer: "순간을 여정으로 묶어 두는 기록 아카이브입니다.",
        },
        {
          question: "SNS인가요?",
          answer: "아니요. 피드, 좋아요, 랭킹이 없고 공유는 선택입니다.",
        },
        {
          question: "여정이란 무엇인가요?",
          answer: "시작과 끝이 있는 시간을 하나로 묶는 기록 단위입니다.",
        },
        {
          question: "무엇이 저장되나요?",
          answer: "사진, 짧은 메모, 기록 시각, 위치를 허용한 경우 장소와 경로입니다.",
        },
        {
          question: "기본은 비공개인가요?",
          answer: "네. 기본은 비공개이며, 게시할 때만 공개됩니다.",
        },
        {
          question: "게시(Publish)는 무엇인가요?",
          answer: "해당 여정만의 고유 URL 페이지를 만들어 공유하는 기능입니다.",
        },
        {
          question: "앱 없이도 볼 수 있나요?",
          answer: "네. 링크를 받은 사람은 웹에서 볼 수 있고, 검색 엔진에 수집될 수 있습니다.",
        },
        {
          question: "항상 위치를 추적하나요?",
          answer: "아니요. 위치는 허용한 경우에만 사용됩니다.",
        },
        {
          question: "AI는 무엇을 하나요?",
          answer: "제목 제안, 요약, 장소명 정리처럼 정리를 돕는 역할에 한정됩니다.",
        },
      ],
    };
  }

  if (lang === "ja") {
    return {
      metaTitle: "MomentBook 質問と回答",
      metaDescription: "MomentBook を静かに理解するための質問と回答です。",
      pageTitle: "MomentBook 質問と回答",
      pageSubtitle: "短く穏やかな回答をまとめました。",
      calloutPrefix: "まだ気になる点があれば、",
      calloutLink: "お問い合わせ",
      calloutSuffix: "ください。",
      items: [
        {
          question: "MomentBook とは何ですか？",
          answer: "瞬間を旅としてまとめて残す記録アーカイブです。",
        },
        {
          question: "SNS ですか？",
          answer: "いいえ。フィードやいいね、ランキングはなく、共有は任意です。",
        },
        {
          question: "旅とは何ですか？",
          answer: "始まりと終わりのある時間をひとつにまとめる単位です。",
        },
        {
          question: "何が保存されますか？",
          answer: "写真、短いメモ、記録時刻、許可した場合の場所とルートです。",
        },
        {
          question: "デフォルトは非公開ですか？",
          answer: "はい。基本は非公開で、投稿したときだけ公開されます。",
        },
        {
          question: "Publish(投稿)とは？",
          answer: "その旅だけの固有URLページを作成して共有することです。",
        },
        {
          question: "アプリがなくても見られますか？",
          answer: "はい。リンクを受け取った人はWebで閲覧でき、検索エンジンに表示される可能性もあります。",
        },
        {
          question: "常に位置情報を追跡しますか？",
          answer: "いいえ。位置情報は許可した場合のみ使用します。",
        },
        {
          question: "AI は何をしますか？",
          answer: "タイトル提案や要約、場所名の整理など、整理の補助に限ります。",
        },
      ],
    };
  }

  if (lang === "zh") {
    return {
      metaTitle: "MomentBook 问题与回答",
      metaDescription: "帮助你安静了解 MomentBook 的问题与回答。",
      pageTitle: "MomentBook 问题与回答",
      pageSubtitle: "简短而平和的回答汇总。",
      calloutPrefix: "还有其他疑问？",
      calloutLink: "联系我们",
      calloutSuffix: "",
      items: [
        {
          question: "MomentBook 是什么？",
          answer: "把瞬间整理成旅程并安静保存的记录应用。",
        },
        {
          question: "是社交网络吗？",
          answer: "不是。没有信息流、点赞或排名，分享是可选的。",
        },
        {
          question: "什么是旅程？",
          answer: "把有开始和结束的时间整理成一个整体的记录单位。",
        },
        {
          question: "会保存哪些内容？",
          answer: "照片、短句、记录时间，以及在允许位置时的地点与路线。",
        },
        {
          question: "默认是私密的吗？",
          answer: "是的。默认私密，仅在发布时公开。",
        },
        {
          question: "发布(Publish)是什么？",
          answer: "为该旅程生成一个唯一 URL 的网页并进行分享。",
        },
        {
          question: "没有 App 也能看吗？",
          answer: "可以。收到链接的人可在网页查看，并可能被搜索引擎收录。",
        },
        {
          question: "会一直追踪位置吗？",
          answer: "不会。只有在你允许时才会使用位置。",
        },
        {
          question: "AI 会做什么？",
          answer: "只负责整理辅助，例如标题建议、摘要、地点名称整理。",
        },
      ],
    };
  }

  return {
    metaTitle: "MomentBook Questions",
    metaDescription: "Quiet answers about MomentBook.",
    pageTitle: "MomentBook questions",
    pageSubtitle: "Short, calm answers about how it works.",
    calloutPrefix: "Still wondering about something? ",
    calloutLink: "Get in touch",
    calloutSuffix: "",
    items: [
      {
        question: "What is MomentBook?",
        answer: "A quiet archive that keeps moments as journeys.",
      },
      {
        question: "Is it a social network?",
        answer: "No. There is no feed, likes, or rankings. Sharing is optional.",
      },
      {
        question: "What is a journey?",
        answer: "A journey is a single stretch of time kept together as one story.",
      },
      {
        question: "What gets saved?",
        answer: "Photos, short notes, time of capture, and places/routes when location is allowed.",
      },
      {
        question: "Is it private by default?",
        answer: "Yes. Journeys stay private unless you publish them.",
      },
      {
        question: "What does Publish mean?",
        answer: "Publishing creates a public web page with a unique URL for that journey.",
      },
      {
        question: "Can people view without the app?",
        answer: "Yes. Anyone with the link can view it on the web, and it may be indexed.",
      },
      {
        question: "Does it track my location?",
        answer: "Only if you allow it. Location is used to place moments into a journey.",
      },
      {
        question: "What does AI do?",
        answer: "It helps with titles, summaries, and place names. It does not create for you.",
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
  const path = "/faq";
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

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getFaqContent(lang);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/faq"), siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: pageUrl,
    mainEntity: content.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div className={faqStyles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
