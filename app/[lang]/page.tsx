import type { Metadata } from "next";
import { buildAbsoluteAppTransparentLogoUrl } from "@/lib/branding/logo";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";
import { HomeHero } from "./HomeHero";
import styles from "./page.module.scss";

type HomePageCopy = {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heroTitle: string;
  heroLead: string;
  primaryCta: string;
  secondaryCta: string;
  heroMeta: string;
  deviceAlt: string;
  splashSubtitle: string;
  replayLabel: string;
  introPromptCta: string;
  introGuideTitle: string;
  introGuideLead: string;
};

const homePageCopy: Record<Language, HomePageCopy> = {
  en: {
    metaTitle: "MomentBook — Memorize your moments",
    metaDescription:
      "Capture your travel moments in one upload, and remember them longer on your timeline and map.",
    eyebrow: "MomentBook App",
    heroTitle: "Memorize your moments",
    heroLead:
      "After each trip, upload once and let moments gather by time and place so you can revisit them anytime.",
    primaryCta: "Download MomentBook",
    secondaryCta: "Read About",
    heroMeta: "Core flow: batch upload, auto organization, minimal cleanup, and recap.",
    deviceAlt: "MomentBook splash screen",
    splashSubtitle: "Travel memories, quietly kept.",
    replayLabel: "Replay intro",
    introPromptCta: "Try organizing in the app",
    introGuideTitle: "Continue your trip recap in MomentBook",
    introGuideLead:
      "After the intro, open the app to upload your photos at once and arrange moments by time and place.",
  },
  ko: {
    metaTitle: "MomentBook — 여행의 순간을 기억해요",
    metaDescription:
      "MomentBook로 여행의 순간을 한 번에 담고, 타임라인과 지도에서 오래 기억하세요.",
    eyebrow: "MomentBook App",
    heroTitle: "여행의 순간을 기억해요",
    heroLead:
      "여행이 끝난 뒤 사진을 한 번에 올리면, 시간과 장소의 흐름대로 순간이 모여 언제든 다시 기억할 수 있어요.",
    primaryCta: "MomentBook 다운로드",
    secondaryCta: "소개 읽기",
    heroMeta: "한 번에 올리고, 조용히 돌아보는 여행 기록.",
    deviceAlt: "MomentBook 스플래시 화면",
    splashSubtitle: "여행 기억을 차분히 보관합니다.",
    replayLabel: "인트로 다시 보기",
    introPromptCta: "앱에서 정리해보기",
    introGuideTitle: "MomentBook에서 여행을 정리해보세요",
    introGuideLead:
      "인트로를 본 뒤 앱에서 사진을 한 번에 올리고, 시간과 장소 흐름으로 순간을 정리해보세요.",
  },
  ja: {
    metaTitle: "MomentBook — 旅の瞬間を、ずっと記憶に",
    metaDescription:
      "旅の瞬間をまとめて取り込み、タイムラインと地図で長く思い出せます。",
    eyebrow: "MomentBook App",
    heroTitle: "旅の瞬間を、ずっと記憶に",
    heroLead:
      "旅が終わったら一度にアップロード。時間と場所の流れで瞬間がまとまり、いつでも振り返れます。",
    primaryCta: "MomentBookをダウンロード",
    secondaryCta: "紹介を見る",
    heroMeta: "コアフロー: 一括アップロード、自動整理、最小補正、回想。",
    deviceAlt: "MomentBook スプラッシュ画面",
    splashSubtitle: "旅の記憶を静かに保管します。",
    replayLabel: "イントロを再生",
    introPromptCta: "アプリで整理してみる",
    introGuideTitle: "MomentBookで旅の記録を続ける",
    introGuideLead:
      "イントロのあと、アプリで写真をまとめてアップロードし、時間と場所の流れで瞬間を整理できます。",
  },
  zh: {
    metaTitle: "MomentBook — 记住每个旅行瞬间",
    metaDescription:
      "一次上传旅行瞬间，在时间线与地图中长久回想。",
    eyebrow: "MomentBook App",
    heroTitle: "记住每个旅行瞬间",
    heroLead:
      "旅行结束后一次上传，瞬间会按时间与地点自然汇聚，随时都能再回看。",
    primaryCta: "下载 MomentBook",
    secondaryCta: "查看介绍",
    heroMeta: "核心流程: 批量上传、自动整理、最少修正、回想。",
    deviceAlt: "MomentBook 启动画面",
    splashSubtitle: "安静地保存旅行记忆。",
    replayLabel: "重播介绍",
    introPromptCta: "在应用中整理看看",
    introGuideTitle: "在 MomentBook 继续整理旅程",
    introGuideLead:
      "看完介绍后，在应用里一次上传照片，按时间与地点把旅行瞬间整理好。",
  },
  es: {
    metaTitle: "MomentBook — Memoriza tus momentos",
    metaDescription:
      "Guarda tus momentos de viaje en una sola carga y recuerdalos por mas tiempo en timeline y mapa.",
    eyebrow: "MomentBook App",
    heroTitle: "Memoriza tus momentos",
    heroLead:
      "Al terminar el viaje, sube todo una vez y deja que los momentos se ordenen por tiempo y lugar para volver a ellos cuando quieras.",
    primaryCta: "Descargar MomentBook",
    secondaryCta: "Leer introducción",
    heroMeta: "Flujo central: carga en lote, organización automática, ajuste mínimo y repaso.",
    deviceAlt: "Pantalla de inicio de MomentBook",
    splashSubtitle: "Tus recuerdos de viaje, guardados con calma.",
    replayLabel: "Repetir intro",
    introPromptCta: "Organizar en la app",
    introGuideTitle: "Continua tu recap en MomentBook",
    introGuideLead:
      "Despues del intro, abre la app para subir fotos en lote y ordenar momentos por tiempo y lugar.",
  },
  pt: {
    metaTitle: "MomentBook — Guarde seus momentos",
    metaDescription:
      "Guarde seus momentos de viagem em um unico envio e reviva-os por mais tempo na timeline e no mapa.",
    eyebrow: "MomentBook App",
    heroTitle: "Guarde seus momentos",
    heroLead:
      "Quando a viagem terminar, envie tudo de uma vez e deixe os momentos se organizarem por tempo e lugar para revisitar quando quiser.",
    primaryCta: "Baixar MomentBook",
    secondaryCta: "Ler introdução",
    heroMeta: "Fluxo principal: envio em lote, organização automática, ajuste mínimo e recap.",
    deviceAlt: "Tela de abertura do MomentBook",
    splashSubtitle: "Memórias de viagem guardadas com tranquilidade.",
    replayLabel: "Reproduzir intro",
    introPromptCta: "Organizar no app",
    introGuideTitle: "Continue seu recap no MomentBook",
    introGuideLead:
      "Depois do intro, abra o app para enviar fotos em lote e organizar momentos por tempo e lugar.",
  },
  fr: {
    metaTitle: "MomentBook — Memorisez vos moments",
    metaDescription:
      "Gardez vos moments de voyage en un seul envoi et retrouvez-les plus longtemps sur la timeline et la carte.",
    eyebrow: "MomentBook App",
    heroTitle: "Memorisez vos moments",
    heroLead:
      "A la fin du voyage, importez tout en une fois et laissez les moments se ranger par temps et lieu pour y revenir quand vous voulez.",
    primaryCta: "Télécharger MomentBook",
    secondaryCta: "Lire la présentation",
    heroMeta: "Flux principal: import en lot, organisation automatique, correction minimale et rappel.",
    deviceAlt: "Écran de démarrage MomentBook",
    splashSubtitle: "Les souvenirs de voyage, conservés avec calme.",
    replayLabel: "Rejouer l'intro",
    introPromptCta: "Organiser dans l'app",
    introGuideTitle: "Continuez votre recap dans MomentBook",
    introGuideLead:
      "Apres l'intro, ouvrez l'app pour importer vos photos en lot et organiser les moments par temps et lieu.",
  },
  th: {
    metaTitle: "MomentBook — จดจำทุกช่วงเวลาของคุณ",
    metaDescription:
      "เก็บทุกช่วงเวลาการเดินทางในครั้งเดียว แล้วกลับมาจดจำได้ยาวนานบนไทม์ไลน์และแผนที่",
    eyebrow: "MomentBook App",
    heroTitle: "จดจำทุกช่วงเวลาของคุณ",
    heroLead:
      "เมื่อทริปจบ อัปโหลดครั้งเดียว แล้วช่วงเวลาจะเรียงตามเวลาและสถานที่ ให้คุณย้อนกลับมาดูได้ทุกเมื่อ",
    primaryCta: "ดาวน์โหลด MomentBook",
    secondaryCta: "อ่านแนะนำ",
    heroMeta: "โฟลว์หลัก: อัปโหลดแบบชุด, จัดระเบียบอัตโนมัติ, ปรับแก้น้อยที่สุด, ย้อนความทรงจำ",
    deviceAlt: "หน้าสแปลชของ MomentBook",
    splashSubtitle: "เก็บความทรงจำการเดินทางไว้อย่างสงบ",
    replayLabel: "เล่นอินโทรอีกครั้ง",
    introPromptCta: "ลองจัดในแอป",
    introGuideTitle: "จัดทริปต่อใน MomentBook",
    introGuideLead:
      "หลังดูอินโทรแล้ว เปิดแอปเพื่ออัปโหลดรูปแบบชุดและจัดช่วงเวลาตามเวลาและสถานที่",
  },
  vi: {
    metaTitle: "MomentBook — Ghi nho khoanh khac cua ban",
    metaDescription:
      "Luu khoanh khac chuyen di trong mot lan tai len, roi nhin lai lau hon tren timeline va ban do.",
    eyebrow: "MomentBook App",
    heroTitle: "Ghi nho khoanh khac cua ban",
    heroLead:
      "Sau moi chuyen di, tai len mot lan de cac khoanh khac tu sap theo thoi gian va dia diem, de ban quay lai bat cu luc nao.",
    primaryCta: "Tải MomentBook",
    secondaryCta: "Đọc giới thiệu",
    heroMeta: "Luồng chính: tải theo lô, tự động sắp xếp, chỉnh tối thiểu và hồi tưởng.",
    deviceAlt: "Màn hình splash MomentBook",
    splashSubtitle: "Lưu giữ ký ức chuyến đi một cách nhẹ nhàng.",
    replayLabel: "Xem lai intro",
    introPromptCta: "Thu sap xep trong app",
    introGuideTitle: "Tiep tuc recap trong MomentBook",
    introGuideLead:
      "Sau intro, mo app de tai anh theo lo va sap xep khoanh khac theo thoi gian va dia diem.",
  },
};

function getHomePageCopy(lang: Language): HomePageCopy {
  return homePageCopy[lang] ?? homePageCopy.en;
}

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> },
): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getHomePageCopy(lang);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    robots: buildPublicRobots(),
    alternates: buildAlternates(lang, "/"),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: buildOpenGraphUrl(lang, "/"),
    },
    twitter: {
      title: content.metaTitle,
      description: content.metaDescription,
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getHomePageCopy(lang);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@momentbook.app";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MomentBook",
    url: siteUrl,
    logo: buildAbsoluteAppTransparentLogoUrl(siteUrl),
    sameAs: [
      "https://apps.apple.com/app/momentbook/id6749165889",
      "https://play.google.com/store/apps/details?id=com.reflectalab.momentbook",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Support",
      email: supportEmail,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MomentBook",
    url: siteUrl,
    description: content.metaDescription,
  };

  return (
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
      />

      <HomeHero lang={lang} content={content} />
    </main>
  );
}
