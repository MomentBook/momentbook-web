import type { Metadata } from "next";
import Link from "next/link";
import styles from "@/styles/common.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { buildNoIndexRobots } from "@/lib/seo/public-metadata";

const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@momentbook.app";
const supportHref = `mailto:${supportEmail}`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  let title = "MomentBook Support";
  let description = "Help and contact for MomentBook.";

  if (lang === "ko") {
    title = "MomentBook 지원";
    description = "MomentBook 도움말과 문의 방법을 안내합니다.";
  }

  if (lang === "ja") {
    title = "MomentBook サポート";
    description = "MomentBookのヘルプとお問い合わせ方法をご案内します。";
  }

  if (lang === "zh") {
    title = "MomentBook 支持";
    description = "了解 MomentBook 的帮助与联系方法。";
  }

  if (lang === "es") {
    title = "Soporte de MomentBook";
    description = "Ayuda y contacto para MomentBook.";
  }

  if (lang === "pt") {
    title = "Suporte do MomentBook";
    description = "Ajuda e contato do MomentBook.";
  }

  if (lang === "fr") {
    title = "Support MomentBook";
    description = "Aide et contact pour MomentBook.";
  }

  if (lang === "th") {
    title = "ศูนย์ช่วยเหลือ MomentBook";
    description = "ความช่วยเหลือและช่องทางติดต่อของ MomentBook";
  }

  if (lang === "vi") {
    title = "Ho tro MomentBook";
    description = "Tro giup va lien he cho MomentBook.";
  }

  const path = "/support";
  const url = buildOpenGraphUrl(lang, path);

  return {
    title,
    description,
    robots: buildNoIndexRobots(),
    alternates: buildAlternates(lang, path),
    openGraph: {
      title,
      description,
      url,
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
  const content =
    lang === "ko" ? <KoreanSupport /> :
    lang === "ja" ? <JapaneseSupport /> :
    lang === "zh" ? <ChineseSupport /> :
    lang === "es" ? <SpanishSupport /> :
    lang === "pt" ? <PortugueseSupport /> :
    lang === "fr" ? <FrenchSupport /> :
    lang === "th" ? <ThaiSupport /> :
    lang === "vi" ? <VietnameseSupport /> :
    <EnglishSupport />;

  return (
    <div className={styles.container}>
      <article className={styles.content}>{content}</article>
    </div>
  );
}

function EnglishSupport() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>MomentBook Support</h1>
        <p className={styles.subtitle}>
          Quiet help for your photos and journeys.
        </p>
      </header>

      <div className={`${styles.textContent} ${styles.supportTextContent}`}>
        <h2 className={styles.heading2}>Common questions</h2>

        <p>
          You might find a quick answer in our{" "}
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
          사진과 여정을 위한 조용한 도움.
        </p>
      </header>

      <div className={`${styles.textContent} ${styles.supportTextContent}`}>
        <h2 className={styles.heading2}>자주 묻는 질문</h2>

        <p>
          <Link href="/ko/faq" className={styles.link}>
            FAQ
          </Link>
          에서 먼저 확인해 보실 수 있습니다.
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
          写真と旅のための静かなサポート。
        </p>
      </header>

      <div className={`${styles.textContent} ${styles.supportTextContent}`}>
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
          为照片与行程提供安静的帮助。
        </p>
      </header>

      <div className={`${styles.textContent} ${styles.supportTextContent}`}>
        <h2 className={styles.heading2}>常见问题</h2>

        <p>
          你可能可以在{" "}
          <Link href="/zh/faq" className={styles.link}>
            FAQ
          </Link>
          中先查看答案。
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

function SpanishSupport() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Soporte de MomentBook</h1>
        <p className={styles.subtitle}>Ayuda tranquila para tus fotos y viajes.</p>
      </header>
      <div className={`${styles.textContent} ${styles.supportTextContent}`}>
        <h2 className={styles.heading2}>Preguntas frecuentes</h2>
        <p>
          Puedes encontrar respuestas rapidas en{" "}
          <Link href="/es/faq" className={styles.link}>FAQ</Link>.
        </p>
        <h2 className={styles.heading2}>Contacto</h2>
        <p>
          Para otras dudas o problemas, escribe a{" "}
          <a href={supportHref} className={styles.link}>{supportEmail}</a>.
        </p>
        <p className={styles.note}>Normalmente respondemos en 1-2 dias habiles.</p>
      </div>
    </>
  );
}

function PortugueseSupport() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Suporte do MomentBook</h1>
        <p className={styles.subtitle}>Ajuda tranquila para suas fotos e jornadas.</p>
      </header>
      <div className={`${styles.textContent} ${styles.supportTextContent}`}>
        <h2 className={styles.heading2}>Perguntas frequentes</h2>
        <p>
          Voce pode encontrar respostas rapidas no{" "}
          <Link href="/pt/faq" className={styles.link}>FAQ</Link>.
        </p>
        <h2 className={styles.heading2}>Contato</h2>
        <p>
          Para outras duvidas ou problemas, fale com{" "}
          <a href={supportHref} className={styles.link}>{supportEmail}</a>.
        </p>
        <p className={styles.note}>Normalmente respondemos em 1-2 dias uteis.</p>
      </div>
    </>
  );
}

function FrenchSupport() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Support MomentBook</h1>
        <p className={styles.subtitle}>Aide calme pour vos photos et voyages.</p>
      </header>
      <div className={`${styles.textContent} ${styles.supportTextContent}`}>
        <h2 className={styles.heading2}>Questions frequentes</h2>
        <p>
          Vous pouvez trouver une reponse rapide dans la{" "}
          <Link href="/fr/faq" className={styles.link}>FAQ</Link>.
        </p>
        <h2 className={styles.heading2}>Contact</h2>
        <p>
          Pour toute autre question, contactez{" "}
          <a href={supportHref} className={styles.link}>{supportEmail}</a>.
        </p>
        <p className={styles.note}>Nous repondons en general sous 1 a 2 jours ouvres.</p>
      </div>
    </>
  );
}

function ThaiSupport() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>ศูนย์ช่วยเหลือ MomentBook</h1>
        <p className={styles.subtitle}>ความช่วยเหลือแบบสงบสำหรับรูปและทริปของคุณ</p>
      </header>
      <div className={`${styles.textContent} ${styles.supportTextContent}`}>
        <h2 className={styles.heading2}>คําถามที่พบบ่อย</h2>
        <p>
          คุณอาจพบคําตอบได้จาก{" "}
          <Link href="/th/faq" className={styles.link}>FAQ</Link>
        </p>
        <h2 className={styles.heading2}>ติดต่อ</h2>
        <p>
          หากมีปัญหาหรือคําถามเพิ่มเติม ติดต่อ{" "}
          <a href={supportHref} className={styles.link}>{supportEmail}</a>
        </p>
        <p className={styles.note}>โดยปกติเราจะตอบกลับภายใน 1-2 วันทําการ</p>
      </div>
    </>
  );
}

function VietnameseSupport() {
  return (
    <>
      <header className={styles.header}>
        <h1 className={styles.title}>Ho tro MomentBook</h1>
        <p className={styles.subtitle}>Tro giup nhe nhang cho anh va hanh trinh cua ban.</p>
      </header>
      <div className={`${styles.textContent} ${styles.supportTextContent}`}>
        <h2 className={styles.heading2}>Cau hoi thuong gap</h2>
        <p>
          Ban co the tim thay cau tra loi nhanh trong{" "}
          <Link href="/vi/faq" className={styles.link}>FAQ</Link>.
        </p>
        <h2 className={styles.heading2}>Lien he</h2>
        <p>
          Voi cac cau hoi hoac su co khac, vui long lien he{" "}
          <a href={supportHref} className={styles.link}>{supportEmail}</a>.
        </p>
        <p className={styles.note}>Thong thuong chung toi phan hoi trong 1-2 ngay lam viec.</p>
      </div>
    </>
  );
}
