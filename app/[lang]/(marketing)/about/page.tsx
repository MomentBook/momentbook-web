import type { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.scss";
import { getCoreFlowContent } from "@/lib/core-flow";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";

type AboutSection = {
  title: string;
  paragraphs: string[];
};

type AboutCopy = {
  metaTitle: string;
  metaDescription: string;
  pageTitle: string;
  pageLead: string;
  sections: AboutSection[];
  flowTitle: string;
  flowLead: string;
  scopeTitle: string;
  scopePoints: string[];
  scopeLead: string;
  faqCta: string;
  downloadCta: string;
};

const aboutCopy: Record<Language, AboutCopy> = {
  en: {
    metaTitle: "About MomentBook — Detailed text guide",
    metaDescription:
      "Detailed text guide to MomentBook's post-trip photo organization flow and the read-only scope of MomentBook Web.",
    pageTitle: "About MomentBook",
    pageLead:
      "This page keeps the app explanation in plain text for users who want to review the full flow before installation.",
    sections: [
      {
        title: "What MomentBook focuses on",
        paragraphs: [
          "MomentBook is built around one moment: after your trip ends and photos are mixed in your camera roll.",
          "The app starts with batch upload, auto-ordering by date and time, and only small manual cleanup when needed.",
        ],
      },
      {
        title: "What MomentBook does not target",
        paragraphs: [
          "It is not a feed product, ranking product, or frequent posting loop.",
          "The main outcome is a clear timeline and map recap for personal recall.",
        ],
      },
      {
        title: "How the web and app split roles",
        paragraphs: [
          "Native app handles creation, editing, and account-side controls.",
          "Web exposes published journeys, moments, photos, and profiles as public read-only pages.",
        ],
      },
    ],
    flowTitle: "Detailed post-trip flow",
    flowLead: "The core sequence is fixed and repeated for each trip.",
    scopeTitle: "Public web scope",
    scopeLead: "Current web scope is intentionally limited to explanation and read-only access.",
    scopePoints: [
      "Marketing pages explain app context and route users to installation.",
      "FAQ provides short operational answers without redefining app behavior.",
      "Download page links to official stores and platform requirements.",
    ],
    faqCta: "Read FAQ",
    downloadCta: "Go to Download",
  },
  ko: {
    metaTitle: "MomentBook 소개 — 상세 텍스트 가이드",
    metaDescription:
      "MomentBook의 여행 후 사진 정리 흐름과 웹의 읽기 전용 범위를 텍스트로 자세히 설명합니다.",
    pageTitle: "MomentBook 소개",
    pageLead:
      "이 페이지는 앱 설명을 단순 텍스트로 유지합니다. 설치 전에 전체 흐름을 먼저 확인하려는 사용자를 위한 구성입니다.",
    sections: [
      {
        title: "MomentBook가 집중하는 지점",
        paragraphs: [
          "MomentBook는 여행이 끝난 직후, 카메라롤에 사진이 섞여 있는 상황에 맞춰 설계되었습니다.",
          "흐름은 일괄 업로드, 날짜/시간 자동 정리, 필요한 수동 보정으로 이어집니다.",
        ],
      },
      {
        title: "MomentBook의 비목표",
        paragraphs: [
          "피드 소비, 랭킹 경쟁, 잦은 게시 유도 구조를 목표로 하지 않습니다.",
          "핵심 결과는 여행 순서를 정리한 타임라인과 지도 회상입니다.",
        ],
      },
      {
        title: "웹과 앱의 역할 분리",
        paragraphs: [
          "작성/편집/계정 제어는 네이티브 앱에서 수행합니다.",
          "웹은 공개된 여정, 모먼트, 사진, 프로필을 읽기 전용으로 제공합니다.",
        ],
      },
    ],
    flowTitle: "여행 후 상세 흐름",
    flowLead: "아래 순서는 매 여행마다 반복되는 고정 흐름입니다.",
    scopeTitle: "공개 웹 제공 범위",
    scopeLead: "현재 웹 범위는 설명과 읽기 전용 접근으로 의도적으로 제한되어 있습니다.",
    scopePoints: [
      "홈/소개 페이지는 앱 사용 맥락을 설명하고 설치로 연결합니다.",
      "FAQ는 앱 동작을 재정의하지 않고 짧은 답변만 제공합니다.",
      "Download는 공식 스토어 링크와 플랫폼 요구사항을 제공합니다.",
    ],
    faqCta: "FAQ 보기",
    downloadCta: "다운로드로 이동",
  },
  ja: {
    metaTitle: "MomentBook 紹介 — 詳細テキストガイド",
    metaDescription:
      "MomentBook の旅行後写真整理フローと、Web の読み取り専用範囲をテキストで詳しく説明します。",
    pageTitle: "MomentBook 紹介",
    pageLead:
      "このページはアプリ説明をシンプルなテキストでまとめています。インストール前に全体フローを確認したい方のための構成です。",
    sections: [
      {
        title: "MomentBook が重視する点",
        paragraphs: [
          "MomentBook は、旅行が終わった直後にカメラロール内の写真が混ざっている状況に合わせて設計されています。",
          "フローは一括アップロード、日時による自動整理、必要な手動補正で構成されます。",
        ],
      },
      {
        title: "MomentBook の非目標",
        paragraphs: [
          "フィード消費、ランキング競争、頻繁な投稿誘導を目的にしていません。",
          "主要な結果は、旅行の順序を整理したタイムラインと地図回想です。",
        ],
      },
      {
        title: "Web とアプリの役割分離",
        paragraphs: [
          "作成・編集・アカウント制御はネイティブアプリで行います。",
          "Web は公開された旅、モーメント、写真、プロフィールを読み取り専用で提供します。",
        ],
      },
    ],
    flowTitle: "旅行後の詳細フロー",
    flowLead: "以下の順序は、旅行ごとに繰り返される固定フローです。",
    scopeTitle: "公開 Web の提供範囲",
    scopeLead: "現在の Web 範囲は、説明と読み取り専用アクセスに意図的に限定されています。",
    scopePoints: [
      "Home / About ページは利用文脈を説明し、インストールへ案内します。",
      "FAQ はアプリ動作を再定義せず、短い回答のみを提供します。",
      "Download は公式ストアリンクとプラットフォーム要件を案内します。",
    ],
    faqCta: "FAQを見る",
    downloadCta: "ダウンロードへ",
  },
  zh: {
    metaTitle: "MomentBook 介绍 — 详细文字指南",
    metaDescription:
      "以文字详细说明 MomentBook 的旅行后照片整理流程，以及网页端只读范围。",
    pageTitle: "MomentBook 介绍",
    pageLead:
      "此页面以纯文本说明应用内容，适合希望在安装前先了解完整流程的用户。",
    sections: [
      {
        title: "MomentBook 的关注点",
        paragraphs: [
          "MomentBook 围绕旅行结束后、相册中照片混在一起的场景进行设计。",
          "流程由批量上传、按日期时间自动整理，以及必要的手动修正组成。",
        ],
      },
      {
        title: "MomentBook 的非目标",
        paragraphs: [
          "不以信息流消费、排行榜竞争或频繁发布诱导为目标。",
          "核心结果是按旅行顺序整理出的时间线与地图回想。",
        ],
      },
      {
        title: "网页与应用的角色分离",
        paragraphs: [
          "创建、编辑与账号控制由原生应用负责。",
          "网页仅以只读方式提供公开行程、时刻、照片与个人资料。",
        ],
      },
    ],
    flowTitle: "旅行后的详细流程",
    flowLead: "以下顺序是每次旅行都会重复的固定流程。",
    scopeTitle: "公开网页提供范围",
    scopeLead: "当前网页范围被有意限制为说明与只读访问。",
    scopePoints: [
      "Home / About 页面说明应用使用场景并引导安装。",
      "FAQ 不重新定义应用行为，只提供简短答案。",
      "Download 提供官方商店链接与平台要求。",
    ],
    faqCta: "查看 FAQ",
    downloadCta: "前往下载",
  },
  es: {
    metaTitle: "Sobre MomentBook — Guía de texto detallada",
    metaDescription:
      "Explicación detallada del flujo de organización de fotos después del viaje y del alcance de solo lectura de MomentBook Web.",
    pageTitle: "Sobre MomentBook",
    pageLead:
      "Esta página mantiene la explicación de la app en texto simple. Está pensada para quienes quieren revisar el flujo completo antes de instalar.",
    sections: [
      {
        title: "En qué se enfoca MomentBook",
        paragraphs: [
          "MomentBook está diseñado para el momento justo después de terminar un viaje, cuando las fotos quedan mezcladas en el carrete.",
          "El flujo conecta carga en lote, orden automático por fecha y hora, y ajustes manuales solo cuando hacen falta.",
        ],
      },
      {
        title: "Qué no busca MomentBook",
        paragraphs: [
          "No está orientado al consumo de feed, competencia por ranking ni impulso de publicaciones frecuentes.",
          "El resultado principal es una línea de tiempo clara y un repaso en mapa para recordar el viaje.",
        ],
      },
      {
        title: "Cómo se dividen los roles entre web y app",
        paragraphs: [
          "La creación, edición y control de cuenta se realizan en la app nativa.",
          "La web ofrece viajes, momentos, fotos y perfiles publicados en modo solo lectura.",
        ],
      },
    ],
    flowTitle: "Flujo detallado después del viaje",
    flowLead: "La secuencia siguiente es fija y se repite en cada viaje.",
    scopeTitle: "Alcance público de la web",
    scopeLead: "El alcance web actual está limitado de forma intencional a explicación y acceso de solo lectura.",
    scopePoints: [
      "Las páginas Home/About explican el contexto de uso y conectan con la instalación.",
      "FAQ ofrece respuestas breves sin redefinir el comportamiento de la app.",
      "Download enlaza a tiendas oficiales y requisitos de plataforma.",
    ],
    faqCta: "Ver FAQ",
    downloadCta: "Ir a Descarga",
  },
  pt: {
    metaTitle: "Sobre o MomentBook — Guia de texto detalhado",
    metaDescription:
      "Explicação detalhada em texto do fluxo de organização de fotos após a viagem e do escopo de leitura do MomentBook Web.",
    pageTitle: "Sobre o MomentBook",
    pageLead:
      "Esta página mantém a explicação do app em texto simples. É para quem quer revisar o fluxo completo antes de instalar.",
    sections: [
      {
        title: "No que o MomentBook foca",
        paragraphs: [
          "O MomentBook foi desenhado para o momento após o fim da viagem, quando as fotos ficam misturadas no rolo da câmera.",
          "O fluxo combina envio em lote, organização automática por data e hora e ajuste manual apenas quando necessário.",
        ],
      },
      {
        title: "O que não é objetivo do MomentBook",
        paragraphs: [
          "Não é um produto voltado para feed, competição por ranking ou incentivo de postagens frequentes.",
          "O resultado principal é uma timeline clara e um recap no mapa para lembrar a viagem.",
        ],
      },
      {
        title: "Divisão de papéis entre web e app",
        paragraphs: [
          "Criação, edição e controle de conta ficam na app nativa.",
          "A web oferece jornadas, momentos, fotos e perfis publicados em modo somente leitura.",
        ],
      },
    ],
    flowTitle: "Fluxo detalhado pós-viagem",
    flowLead: "A sequência abaixo é fixa e se repete a cada viagem.",
    scopeTitle: "Escopo público da web",
    scopeLead: "O escopo atual da web é intencionalmente limitado a explicação e acesso somente leitura.",
    scopePoints: [
      "As páginas Home/About explicam o contexto de uso e direcionam para a instalação.",
      "FAQ traz respostas curtas sem redefinir o comportamento da app.",
      "Download aponta para lojas oficiais e requisitos de plataforma.",
    ],
    faqCta: "Ver FAQ",
    downloadCta: "Ir para Download",
  },
  fr: {
    metaTitle: "À propos de MomentBook — Guide texte détaillé",
    metaDescription:
      "Explication détaillée du flux d'organisation des photos après voyage et du périmètre en lecture seule de MomentBook Web.",
    pageTitle: "À propos de MomentBook",
    pageLead:
      "Cette page conserve l'explication de l'application en texte simple. Elle vise les utilisateurs qui veulent voir le flux complet avant l'installation.",
    sections: [
      {
        title: "Ce sur quoi MomentBook se concentre",
        paragraphs: [
          "MomentBook est conçu pour l'instant juste après le voyage, quand les photos sont mélangées dans la pellicule.",
          "Le flux relie import en lot, tri automatique par date et heure, puis correction manuelle seulement si nécessaire.",
        ],
      },
      {
        title: "Ce que MomentBook ne vise pas",
        paragraphs: [
          "Ce n'est pas un produit de feed, de classement compétitif ou d'incitation à publier souvent.",
          "Le résultat principal est une timeline claire et un rappel sur carte pour se souvenir du voyage.",
        ],
      },
      {
        title: "Répartition des rôles entre web et app",
        paragraphs: [
          "La création, l'édition et la gestion du compte se font dans l'app native.",
          "Le web expose les voyages, moments, photos et profils publiés en lecture seule.",
        ],
      },
    ],
    flowTitle: "Flux détaillé après voyage",
    flowLead: "La séquence suivante est fixe et se répète à chaque voyage.",
    scopeTitle: "Périmètre public du web",
    scopeLead: "Le périmètre web actuel est volontairement limité à l'explication et à l'accès en lecture seule.",
    scopePoints: [
      "Les pages Home/About expliquent le contexte d'usage et redirigent vers l'installation.",
      "FAQ donne des réponses courtes sans redéfinir le comportement de l'app.",
      "Download fournit les liens officiels des stores et les exigences de plateforme.",
    ],
    faqCta: "Voir la FAQ",
    downloadCta: "Aller au téléchargement",
  },
  th: {
    metaTitle: "เกี่ยวกับ MomentBook — คู่มือข้อความแบบละเอียด",
    metaDescription:
      "อธิบายโฟลว์การจัดรูปหลังทริปของ MomentBook และขอบเขตการใช้งานแบบอ่านอย่างเดียวของเว็บอย่างละเอียด",
    pageTitle: "เกี่ยวกับ MomentBook",
    pageLead:
      "หน้านี้อธิบายแอปด้วยข้อความแบบตรงไปตรงมา เหมาะสำหรับผู้ใช้ที่ต้องการดูโฟลว์ทั้งหมดก่อนติดตั้ง",
    sections: [
      {
        title: "จุดที่ MomentBook ให้ความสำคัญ",
        paragraphs: [
          "MomentBook ออกแบบมาสำหรับช่วงหลังจบทริป เมื่อรูปจากหลายวันยังปะปนอยู่ใน Camera Roll",
          "โฟลว์หลักคืออัปโหลดแบบชุดเดียว จัดเรียงตามวันเวลาอัตโนมัติ และปรับแก้ด้วยตนเองเท่าที่จำเป็น",
        ],
      },
      {
        title: "สิ่งที่ MomentBook ไม่ได้มุ่งเน้น",
        paragraphs: [
          "ไม่ได้มุ่งเน้นการเสพฟีด การแข่งขันแบบจัดอันดับ หรือการกระตุ้นให้โพสต์ถี่",
          "ผลลัพธ์หลักคือไทม์ไลน์ที่ชัดเจนและการย้อนดูผ่านแผนที่เพื่อทบทวนการเดินทาง",
        ],
      },
      {
        title: "การแบ่งบทบาทระหว่างเว็บและแอป",
        paragraphs: [
          "การสร้าง แก้ไข และควบคุมบัญชีทำในแอปเนทีฟ",
          "เว็บให้การเข้าถึงทริป โมเมนต์ รูป และโปรไฟล์ที่เผยแพร่แล้วในโหมดอ่านอย่างเดียว",
        ],
      },
    ],
    flowTitle: "โฟลว์แบบละเอียดหลังจบทริป",
    flowLead: "ลำดับด้านล่างคือโฟลว์คงที่ที่ทำซ้ำในทุกทริป",
    scopeTitle: "ขอบเขตการให้บริการของเว็บสาธารณะ",
    scopeLead: "ขอบเขตเว็บปัจจุบันถูกจำกัดโดยตั้งใจไว้ที่การอธิบายและการเข้าถึงแบบอ่านอย่างเดียว",
    scopePoints: [
      "หน้า Home/About อธิบายบริบทการใช้งานและพาไปยังหน้าติดตั้ง",
      "FAQ ให้คำตอบสั้น ๆ โดยไม่นิยามพฤติกรรมแอปใหม่",
      "Download ให้ลิงก์สโตร์ทางการและข้อกำหนดแพลตฟอร์ม",
    ],
    faqCta: "ดู FAQ",
    downloadCta: "ไปหน้าดาวน์โหลด",
  },
  vi: {
    metaTitle: "Giới thiệu MomentBook — Hướng dẫn văn bản chi tiết",
    metaDescription:
      "Giải thích chi tiết bằng văn bản về luồng sắp xếp ảnh sau chuyến đi của MomentBook và phạm vi chỉ đọc của web.",
    pageTitle: "Giới thiệu MomentBook",
    pageLead:
      "Trang này giữ phần giải thích ứng dụng ở dạng văn bản đơn giản. Phù hợp cho người muốn xem toàn bộ luồng trước khi cài đặt.",
    sections: [
      {
        title: "Điểm MomentBook tập trung",
        paragraphs: [
          "MomentBook được thiết kế cho thời điểm ngay sau chuyến đi, khi ảnh từ nhiều ngày còn trộn trong camera roll.",
          "Luồng chính gồm tải theo lô, tự động sắp theo ngày giờ và chỉnh tay khi thật sự cần.",
        ],
      },
      {
        title: "Những gì MomentBook không nhắm tới",
        paragraphs: [
          "Ứng dụng không nhắm vào tiêu thụ feed, cạnh tranh xếp hạng hay thúc đẩy đăng bài thường xuyên.",
          "Kết quả cốt lõi là timeline rõ ràng và phần hồi tưởng trên bản đồ để nhớ lại chuyến đi.",
        ],
      },
      {
        title: "Phân vai giữa web và ứng dụng",
        paragraphs: [
          "Tạo mới, chỉnh sửa và điều khiển tài khoản được thực hiện trong app native.",
          "Web chỉ cung cấp hành trình, khoảnh khắc, ảnh và hồ sơ đã công khai dưới dạng chỉ đọc.",
        ],
      },
    ],
    flowTitle: "Luồng chi tiết sau chuyến đi",
    flowLead: "Chuỗi bước dưới đây là luồng cố định, lặp lại cho mỗi chuyến đi.",
    scopeTitle: "Phạm vi web công khai",
    scopeLead: "Phạm vi web hiện tại được giới hạn có chủ đích ở phần giải thích và truy cập chỉ đọc.",
    scopePoints: [
      "Trang Home/About giải thích ngữ cảnh sử dụng và dẫn đến cài đặt.",
      "FAQ chỉ trả lời ngắn gọn, không định nghĩa lại hành vi của app.",
      "Download cung cấp liên kết store chính thức và điều kiện nền tảng.",
    ],
    faqCta: "Xem FAQ",
    downloadCta: "Đi tới tải xuống",
  },
};

function getAboutCopy(lang: Language): AboutCopy {
  return aboutCopy[lang] ?? aboutCopy.en;
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> },
): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getAboutCopy(lang);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    robots: buildPublicRobots(),
    alternates: buildAlternates(lang, "/about"),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: buildOpenGraphUrl(lang, "/about"),
    },
    twitter: {
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
  const content = getAboutCopy(lang);
  const flow = getCoreFlowContent(lang);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "MomentBook",
        item: `${siteUrl}/${lang}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: `${siteUrl}/${lang}/about`,
      },
    ],
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />

      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.pageTitle}>{content.pageTitle}</h1>
          <p className={styles.pageLead}>{content.pageLead}</p>
        </header>

        {content.sections.map((section) => (
          <section key={section.title} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph} className={styles.paragraph}>{paragraph}</p>
            ))}
          </section>
        ))}

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.flowTitle}</h2>
          <p className={styles.paragraph}>{content.flowLead}</p>
          <p className={styles.paragraph}>{flow.lead}</p>
          <ol className={styles.flowList}>
            {flow.steps.map((step) => (
              <li key={step.title} className={styles.flowItem}>
                <div className={styles.flowHeading}>
                  <p className={styles.flowTitle}>{step.title}</p>
                </div>
                <p className={styles.paragraph}>{step.detail}</p>
              </li>
            ))}
          </ol>
          <p className={styles.paragraph}>{flow.mapRecapTitle}: {flow.mapRecapDetail}</p>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>{content.scopeTitle}</h2>
          <p className={styles.paragraph}>{content.scopeLead}</p>
          <ul className={styles.scopeList}>
            {content.scopePoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </section>

        <footer className={styles.footerLinks}>
          <Link href={`/${lang}/faq`} className={`${styles.linkButton} ${styles.linkButtonGhost}`}>
            {content.faqCta}
          </Link>
          <Link href={`/${lang}/download`} className={`${styles.linkButton} ${styles.linkButtonPrimary}`}>
            {content.downloadCta}
          </Link>
        </footer>
      </article>
    </main>
  );
}
