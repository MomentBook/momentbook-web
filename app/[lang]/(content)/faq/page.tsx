import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/styles/common.module.scss";
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
      pageSubtitle: "MomentBook에 대한 빠른 답변을 모았습니다.",
      calloutPrefix: "여기에서 답을 찾지 못하셨나요? ",
      calloutLink: "문의하기",
      calloutSuffix: "",
      items: [
        {
          question: "MomentBook이 무엇인가요?",
          answer:
            "하루를 알아차리게 해주는 앱입니다. 생산성이나 꾸준함을 요구하지 않고, 기억하고 싶은 순간을 담아둡니다.",
        },
        {
          question: "무료인가요?",
          answer: "가격 정책은 출시 시 공개됩니다.",
        },
        {
          question: "오프라인에서도 사용할 수 있나요?",
          answer: "네. 순간들은 기기에 저장되어 오프라인에서도 열람할 수 있습니다.",
        },
        {
          question: "기기 간 동기화가 되나요?",
          answer: "네. 개인 클라우드 저장소를 통해 동기화를 설정할 수 있습니다.",
        },
        {
          question: "제가 적은 내용을 누가 볼 수 있나요?",
          answer:
            "공유하지 않는 한 본인만 볼 수 있습니다. MomentBook은 내용을 접근하거나 배포하지 않습니다.",
        },
        {
          question: "매일 사용해야 하나요?",
          answer: "아니요. 연속 기록이나 목표, 기대가 없습니다. 필요할 때 사용하세요.",
        },
        {
          question: "데이터를 내보낼 수 있나요?",
          answer: "네. 언제든지 모든 순간을 내보낼 수 있습니다.",
        },
        {
          question: "일기 앱인가요?",
          answer:
            "완전히는 아닙니다. 매일 쓰거나 구조화된 회고를 요구하지 않습니다. 알아차린 것을 자유롭게 남기는 공간입니다.",
        },
        {
          question: "소셜 기능이 추가되나요?",
          answer: "아니요. 기본적으로 비공개이며, 소셜 상호작용에 의존하지 않습니다.",
        },
      ],
    };
  }

  if (lang === "ja") {
    return {
      metaTitle: "MomentBook よくある質問",
      metaDescription: "MomentBookに関するよくある質問をまとめています。",
      pageTitle: "MomentBook よくある質問",
      pageSubtitle: "MomentBookについての簡単な回答をまとめました。",
      calloutPrefix: "ここで解決しない場合は、",
      calloutLink: "お問い合わせ",
      calloutSuffix: "ください。",
      items: [
        {
          question: "MomentBookとは何ですか？",
          answer:
            "一日の気づきをそっと残すアプリです。生産性や継続を求めず、覚えておきたい瞬間を保管します。",
        },
        {
          question: "無料ですか？",
          answer: "料金の詳細はリリース時に公開します。",
        },
        {
          question: "オフラインでも使えますか？",
          answer: "はい。記録は端末に保存され、オフラインでも閲覧できます。",
        },
        {
          question: "端末間で同期できますか？",
          answer: "はい。個人のクラウドストレージを使って同期を有効にできます。",
        },
        {
          question: "書いた内容は誰が見られますか？",
          answer:
            "共有しない限り本人のみです。MomentBookが内容を閲覧・配布することはありません。",
        },
        {
          question: "毎日使う必要がありますか？",
          answer: "いいえ。連続記録や目標、期待はありません。必要なときに使ってください。",
        },
        {
          question: "データをエクスポートできますか？",
          answer: "はい。いつでも全ての記録をエクスポートできます。",
        },
        {
          question: "日記アプリですか？",
          answer:
            "厳密には違います。毎日の記入や構造化された振り返りを求めません。気づいたことをそのまま残せる場所です。",
        },
        {
          question: "ソーシャル機能は追加されますか？",
          answer: "いいえ。デフォルトで非公開で、ソーシャルなやりとりを前提にしていません。",
        },
      ],
    };
  }

  if (lang === "zh") {
    return {
      metaTitle: "MomentBook 常见问题",
      metaDescription: "汇总了关于 MomentBook 的常见问题。",
      pageTitle: "MomentBook 常见问题",
      pageSubtitle: "关于 MomentBook 的简要解答。",
      calloutPrefix: "还有其他问题？",
      calloutLink: "联系我们",
      calloutSuffix: "",
      items: [
        {
          question: "MomentBook 是什么？",
          answer:
            "这是一款为你留住日常感受的应用，不要求生产力或持续性，只保存你想记住的瞬间。",
        },
        {
          question: "是免费的吗？",
          answer: "定价信息将在发布时公布。",
        },
        {
          question: "离线可用吗？",
          answer: "可以。记录保存在你的设备上，离线也能查看。",
        },
        {
          question: "可以跨设备同步吗？",
          answer: "可以。你可以通过个人云存储开启同步。",
        },
        {
          question: "我写的内容谁能看到？",
          answer:
            "除非你选择分享，否则只有你自己能看到。MomentBook 不会访问或分发你的内容。",
        },
        {
          question: "需要每天使用吗？",
          answer: "不需要。没有连续记录、目标或期待，按需使用即可。",
        },
        {
          question: "可以导出数据吗？",
          answer: "可以。你随时都能导出所有记录。",
        },
        {
          question: "这算日记应用吗？",
          answer:
            "不完全是。它不要求每天记录或结构化反思，而是一个记录你所注意到的空间。",
        },
        {
          question: "会加入社交功能吗？",
          answer: "不会。默认是私密的，也不依赖社交互动。",
        },
      ],
    };
  }

  return {
    metaTitle: "MomentBook FAQ",
    metaDescription: "Frequently asked questions about MomentBook.",
    pageTitle: "MomentBook FAQ",
    pageSubtitle: "Quick answers about MomentBook.",
    calloutPrefix: "Have a question that's not answered here? ",
    calloutLink: "Get in touch",
    calloutSuffix: "",
    items: [
      {
        question: "What is MomentBook?",
        answer:
          "An app that creates space for noticing your day. It holds what you choose to remember, without asking you to be productive or consistent.",
      },
      {
        question: "Is it free?",
        answer: "Pricing details will be available when the app launches.",
      },
      {
        question: "Does it work offline?",
        answer: "Yes. Your moments are stored on your device and available offline.",
      },
      {
        question: "Can I sync across devices?",
        answer: "Yes. You can enable sync through your personal cloud storage.",
      },
      {
        question: "Who can see what I write?",
        answer:
          "Only you, unless you choose to share. MomentBook doesn't access or distribute your moments.",
      },
      {
        question: "Do I need to use it every day?",
        answer: "No. There are no streaks, goals, or expectations. Use it when it feels right.",
      },
      {
        question: "Can I export my data?",
        answer: "Yes. You can export all your moments at any time.",
      },
      {
        question: "Is this a journal app?",
        answer:
          "Not exactly. MomentBook doesn't ask for daily entries or structured reflection. It's a space for whatever you notice, whenever you notice it.",
      },
      {
        question: "Will you add social features?",
        answer: "No. MomentBook is private by default and doesn't depend on social interaction.",
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
    <div className={styles.container}>
      <article className={styles.content}>
        <header>
          <h1 className={styles.title}>{content.pageTitle}</h1>
          <p className={styles.subtitle}>{content.pageSubtitle}</p>
        </header>

        <div className={faqStyles.faqList}>
          {content.items.map((faq, index) => (
            <section key={index} className={faqStyles.faqItem}>
              <h2 className={faqStyles.faqQuestion}>{faq.question}</h2>
              <p className={faqStyles.faqAnswer}>{faq.answer}</p>
            </section>
          ))}
        </div>

        <aside className={styles.callout}>
          <p>
            {content.calloutPrefix}
            <Link href={`/${lang}/support`} className={styles.link}>
              {content.calloutLink}
            </Link>
            {content.calloutSuffix}
          </p>
        </aside>
      </article>
    </div>
  );
}
