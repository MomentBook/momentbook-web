import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/styles/common.module.scss";
import { type Language } from "@/lib/i18n/config";

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@momentbook.app";
const supportHref = `mailto:${supportEmail}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };

  if (lang === "ko") {
    const title = "MomentBook 지원";
    const description = "MomentBook 도움말과 문의 방법을 안내합니다.";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
    };
  }

  if (lang === "ja") {
    const title = "MomentBook サポート";
    const description = "MomentBookのヘルプとお問い合わせ方法をご案内します。";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
    };
  }

  if (lang === "zh") {
    const title = "MomentBook 支持";
    const description = "了解 MomentBook 的帮助与联系方法。";

    return {
      title,
      description,
      openGraph: {
        title,
        description,
      },
      twitter: {
        card: "summary",
        title,
        description,
      },
    };
  }

  const title = "MomentBook Support";
  const description = "Help and contact for MomentBook.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function SupportPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };

  return (
    <div className={styles.container}>
      <article className={styles.content}>
        {lang === "en" && <EnglishSupport />}
        {lang === "ko" && <KoreanSupport />}
        {lang === "ja" && <JapaneseSupport />}
        {lang === "zh" && <ChineseSupport />}
      </article>
    </div>
  );
}

function EnglishSupport() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook Support</h1>
        <p className={styles.subtitle}>
          Help with MomentBook, whenever you need it.
        </p>
      </header>

      <div className={styles.textContent}>
        <h2 className={styles.heading2}>Common questions</h2>

        <p>
          You might find answers in our{" "}
          <Link href="/en/faq" className={styles.link}>
            FAQ
          </Link>
          .
        </p>

        <h2 className={styles.heading2}>Contact</h2>

        <p>
          For other questions or issues, you can reach us at{" "}
          <a href={supportHref} className={styles.link}>
            {supportEmail}
          </a>
          .
        </p>

        <p className={styles.note}>
          We typically respond within 1-2 business days.
        </p>
      </div>
    </>
  );
}

function KoreanSupport() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook 지원</h1>
        <p className={styles.subtitle}>
          MomentBook 도움이 필요할 때 언제든지 찾아주세요.
        </p>
      </header>

      <div className={styles.textContent}>
        <h2 className={styles.heading2}>자주 묻는 질문</h2>

        <p>
          <Link href="/ko/faq" className={styles.link}>
            FAQ
          </Link>
          에서 답을 찾을 수 있습니다.
        </p>

        <h2 className={styles.heading2}>문의</h2>

        <p>
          그 외 문의는{" "}
          <a href={supportHref} className={styles.link}>
            {supportEmail}
          </a>
          로 연락해 주세요.
        </p>

        <p className={styles.note}>
          일반적으로 영업일 기준 1~2일 이내에 답변드립니다.
        </p>
      </div>
    </>
  );
}

function JapaneseSupport() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook サポート</h1>
        <p className={styles.subtitle}>
          MomentBookでお困りのときはいつでもお手伝いします。
        </p>
      </header>

      <div className={styles.textContent}>
        <h2 className={styles.heading2}>よくある質問</h2>

        <p>
          <Link href="/ja/faq" className={styles.link}>
            FAQ
          </Link>
          に回答があるかもしれません。
        </p>

        <h2 className={styles.heading2}>お問い合わせ</h2>

        <p>
          その他のご質問や不具合は{" "}
          <a href={supportHref} className={styles.link}>
            {supportEmail}
          </a>
          までご連絡ください。
        </p>

        <p className={styles.note}>
          通常、1〜2営業日以内にご返信します。
        </p>
      </div>
    </>
  );
}

function ChineseSupport() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook 支持</h1>
        <p className={styles.subtitle}>
          需要 MomentBook 帮助时，我们随时在这里。
        </p>
      </header>

      <div className={styles.textContent}>
        <h2 className={styles.heading2}>常见问题</h2>

        <p>
          你可能可以在{" "}
          <Link href="/zh/faq" className={styles.link}>
            FAQ
          </Link>
          中找到答案。
        </p>

        <h2 className={styles.heading2}>联系</h2>

        <p>
          其他问题或故障，请联系{" "}
          <a href={supportHref} className={styles.link}>
            {supportEmail}
          </a>
          。
        </p>

        <p className={styles.note}>
          我们通常会在 1-2 个工作日内回复。
        </p>
      </div>
    </>
  );
}
