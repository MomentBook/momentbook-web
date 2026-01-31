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
          answer: "순간을 여정으로 묶어 보관하는 조용한 기록 앱입니다.",
        },
        {
          question: "SNS인가요?",
          answer: "아니요. 피드, 좋아요, 랭킹이 없으며 비교나 확산을 목적으로 하지 않습니다.",
        },
        {
          question: "여정이란 무엇인가요?",
          answer: "시작과 끝이 있는 경험을 하나의 이야기로 묶은 기록 단위입니다.",
        },
        {
          question: "무엇이 저장되나요?",
          answer: "사진, 짧은 메모, 기록 시각, 그리고 위치를 허용한 경우 장소와 경로입니다.",
        },
        {
          question: "기본은 비공개인가요?",
          answer: "네. 기본은 비공개이며, 내가 게시할 때만 공개됩니다.",
        },
        {
          question: "게시(Publish)는 무엇인가요?",
          answer: "해당 여정만의 고유 URL 웹페이지를 만들어 공유하는 기능입니다.",
        },
        {
          question: "앱 없이도 볼 수 있나요?",
          answer: "네. 링크를 받은 사람은 웹에서 열람할 수 있으며, 검색 엔진에 수집될 수 있습니다.",
        },
        {
          question: "항상 위치를 추적하나요?",
          answer: "아니요. 위치는 허용한 경우에만 사용됩니다.",
        },
        {
          question: "AI는 무엇을 하나요?",
          answer: "제목 추천, 요약, 장소명 정리처럼 정리를 돕는 역할에 한정됩니다.",
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
          answer: "瞬間を旅としてまとめて残す静かな記録アプリです。",
        },
        {
          question: "SNS ですか？",
          answer: "いいえ。フィードやいいね、ランキングはなく、拡散を目的にしません。",
        },
        {
          question: "旅とは何ですか？",
          answer: "始まりと終わりのある体験を一つの物語としてまとめた単位です。",
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
          answer: "その旅だけの固有URLのWebページを作成して共有することです。",
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
          answer: "把瞬间整理成旅程并安静保存的记录应用。",
        },
        {
          question: "是社交网络吗？",
          answer: "不是。没有信息流、点赞或排名，也不以扩散为目标。",
        },
        {
          question: "什么是旅程？",
          answer: "把有开始和结束的经历整理成一个故事的记录单位。",
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
        answer: "A quiet app that keeps moments as journeys.",
      },
      {
        question: "Is it a social network?",
        answer: "No. There is no feed, likes, or rankings, and it is not built for broadcast.",
      },
      {
        question: "What is a journey?",
        answer: "A journey is a unit that groups a beginning-to-end experience as one story.",
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
