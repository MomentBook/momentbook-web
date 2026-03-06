import type { Metadata } from "next";
import { buildAbsoluteAppTransparentLogoUrl } from "@/lib/branding/logo";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { getDownloadCopy } from "@/lib/marketing/download-content";
import { MARKETING_CHANNEL_URLS } from "@/lib/marketing/social-channels";
import { getCanonicalStoreLinks } from "@/lib/mobile-app";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";
import { HashTargetFocus } from "./HashTargetFocus";
import { HomeDownloadSection } from "./HomeDownloadSection";
import { HomeHero } from "./HomeHero";
import styles from "./page.module.scss";

type HomePageCopy = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroLead: string;
  heroTutorialCta: string;
  primaryCta: string;
  deviceAlt: string;
  replayLabel: string;
  playWithSoundLabel: string;
  playLabel: string;
  pauseLabel: string;
  muteLabel: string;
  unmuteLabel: string;
  volumeLabel: string;
  seekLabel: string;
  fullscreenLabel: string;
  exitFullscreenLabel: string;
  introPromptCta: string;
  introGuideTitle: string;
  introGuideLead: string;
};

const homePageCopy: Record<Language, HomePageCopy> = {
  en: {
    metaTitle: "MomentBook — Memorize your moments",
    metaDescription:
      "Capture your travel moments in one upload, and remember them longer on your timeline and map.",
    heroTitle: "Memorize your moments",
    heroLead:
      "After each trip, upload once and let moments gather by time and place so you can revisit them anytime.",
    heroTutorialCta: "Watch tutorial",
    primaryCta: "Download MomentBook",
    deviceAlt: "MomentBook splash screen",
    replayLabel: "Replay intro",
    playWithSoundLabel: "Play with sound",
    playLabel: "Play",
    pauseLabel: "Pause",
    muteLabel: "Mute",
    unmuteLabel: "Unmute",
    volumeLabel: "Volume",
    seekLabel: "Seek video",
    fullscreenLabel: "Full screen",
    exitFullscreenLabel: "Exit full screen",
    introPromptCta: "Try organizing in the app",
    introGuideTitle: "Continue your trip recap in MomentBook",
    introGuideLead:
      "After the intro, open the app to upload your photos at once and arrange moments by time and place.",
  },
  ko: {
    metaTitle: "MomentBook — 여행의 순간을 기억하세요",
    metaDescription:
      "MomentBook로 여행의 순간을 한 번에 담고, 타임라인과 지도에서 오래 기억하세요.",
    heroTitle: "여행의 순간을 기억하세요",
    heroLead:
      "여행이 끝난 뒤 사진을 한 번에 올리면, 시간과 장소의 흐름대로 순간이 모여 언제든 다시 기억할 수 있어요.",
    heroTutorialCta: "튜토리얼 보기",
    primaryCta: "MomentBook 다운로드",
    deviceAlt: "MomentBook 스플래시 화면",
    replayLabel: "인트로 다시 보기",
    playWithSoundLabel: "소리와 함께 재생",
    playLabel: "재생",
    pauseLabel: "일시정지",
    muteLabel: "음소거",
    unmuteLabel: "음소거 해제",
    volumeLabel: "볼륨",
    seekLabel: "영상 탐색",
    fullscreenLabel: "전체 화면",
    exitFullscreenLabel: "전체 화면 종료",
    introPromptCta: "앱에서 정리해보기",
    introGuideTitle: "MomentBook에서 여행을 정리해보세요",
    introGuideLead:
      "인트로를 본 뒤 앱에서 사진을 한 번에 올리고, 시간과 장소 흐름으로 순간을 정리해보세요.",
  },
  ja: {
    metaTitle: "MomentBook — 旅の瞬間を、ずっと記憶に",
    metaDescription:
      "旅の瞬間をまとめて取り込み、タイムラインと地図で長く思い出せます。",
    heroTitle: "旅の瞬間を、ずっと記憶に",
    heroLead:
      "旅が終わったら一度にアップロード。時間と場所の流れで瞬間がまとまり、いつでも振り返れます。",
    heroTutorialCta: "チュートリアルを見る",
    primaryCta: "MomentBookをダウンロード",
    deviceAlt: "MomentBook スプラッシュ画面",
    replayLabel: "イントロを再生",
    playWithSoundLabel: "音声付きで再生",
    playLabel: "再生",
    pauseLabel: "一時停止",
    muteLabel: "ミュート",
    unmuteLabel: "ミュート解除",
    volumeLabel: "音量",
    seekLabel: "動画シーク",
    fullscreenLabel: "全画面",
    exitFullscreenLabel: "全画面を終了",
    introPromptCta: "アプリで整理してみる",
    introGuideTitle: "MomentBookで旅の記録を続ける",
    introGuideLead:
      "イントロのあと、アプリで写真をまとめてアップロードし、時間と場所の流れで瞬間を整理できます。",
  },
  zh: {
    metaTitle: "MomentBook — 记住每个旅行瞬间",
    metaDescription:
      "一次上传旅行瞬间，在时间线与地图中长久回想。",
    heroTitle: "记住每个旅行瞬间",
    heroLead:
      "旅行结束后一次上传，瞬间会按时间与地点自然汇聚，随时都能再回看。",
    heroTutorialCta: "查看教程",
    primaryCta: "下载 MomentBook",
    deviceAlt: "MomentBook 启动画面",
    replayLabel: "重播介绍",
    playWithSoundLabel: "开启声音播放",
    playLabel: "播放",
    pauseLabel: "暂停",
    muteLabel: "静音",
    unmuteLabel: "取消静音",
    volumeLabel: "音量",
    seekLabel: "调整播放进度",
    fullscreenLabel: "全屏",
    exitFullscreenLabel: "退出全屏",
    introPromptCta: "在应用中整理看看",
    introGuideTitle: "在 MomentBook 继续整理旅程",
    introGuideLead:
      "看完介绍后，在应用里一次上传照片，按时间与地点把旅行瞬间整理好。",
  },
  es: {
    metaTitle: "MomentBook — Memoriza tus momentos",
    metaDescription:
      "Guarda tus momentos de viaje en una sola carga y recuérdalos por más tiempo en la línea de tiempo y el mapa.",
    heroTitle: "Memoriza tus momentos",
    heroLead:
      "Al terminar el viaje, sube todo una vez y deja que los momentos se ordenen por tiempo y lugar para volver a ellos cuando quieras.",
    heroTutorialCta: "Ver tutorial",
    primaryCta: "Descargar MomentBook",
    deviceAlt: "Pantalla de inicio de MomentBook",
    replayLabel: "Repetir intro",
    playWithSoundLabel: "Reproducir con sonido",
    playLabel: "Reproducir",
    pauseLabel: "Pausar",
    muteLabel: "Silenciar",
    unmuteLabel: "Activar sonido",
    volumeLabel: "Volumen",
    seekLabel: "Buscar en el video",
    fullscreenLabel: "Pantalla completa",
    exitFullscreenLabel: "Salir de pantalla completa",
    introPromptCta: "Organizar en la app",
    introGuideTitle: "Continúa tu repaso en MomentBook",
    introGuideLead:
      "Después de la introducción, abre la app para subir fotos en lote y ordenar momentos por tiempo y lugar.",
  },
  pt: {
    metaTitle: "MomentBook — Guarde seus momentos",
    metaDescription:
      "Guarde seus momentos de viagem em um único envio e reviva-os por mais tempo na timeline e no mapa.",
    heroTitle: "Guarde seus momentos",
    heroLead:
      "Quando a viagem terminar, envie tudo de uma vez e deixe os momentos se organizarem por tempo e lugar para revisitar quando quiser.",
    heroTutorialCta: "Ver tutorial",
    primaryCta: "Baixar MomentBook",
    deviceAlt: "Tela de abertura do MomentBook",
    replayLabel: "Reproduzir intro",
    playWithSoundLabel: "Reproduzir com som",
    playLabel: "Reproduzir",
    pauseLabel: "Pausar",
    muteLabel: "Silenciar",
    unmuteLabel: "Ativar som",
    volumeLabel: "Volume",
    seekLabel: "Buscar no vídeo",
    fullscreenLabel: "Tela cheia",
    exitFullscreenLabel: "Sair da tela cheia",
    introPromptCta: "Organizar no app",
    introGuideTitle: "Continue seu resumo no MomentBook",
    introGuideLead:
      "Depois da introdução, abra o app para enviar fotos em lote e organizar momentos por tempo e lugar.",
  },
  fr: {
    metaTitle: "MomentBook — Memorisez vos moments",
    metaDescription:
      "Gardez vos moments de voyage en un seul envoi et retrouvez-les plus longtemps sur la timeline et la carte.",
    heroTitle: "Memorisez vos moments",
    heroLead:
      "À la fin du voyage, importez tout en une fois et laissez les moments se ranger par temps et lieu pour y revenir quand vous voulez.",
    heroTutorialCta: "Voir le tutoriel",
    primaryCta: "Télécharger MomentBook",
    deviceAlt: "Écran de démarrage MomentBook",
    replayLabel: "Rejouer l'intro",
    playWithSoundLabel: "Lire avec le son",
    playLabel: "Lire",
    pauseLabel: "Pause",
    muteLabel: "Couper le son",
    unmuteLabel: "Activer le son",
    volumeLabel: "Volume",
    seekLabel: "Avancer dans la vidéo",
    fullscreenLabel: "Plein écran",
    exitFullscreenLabel: "Quitter le plein écran",
    introPromptCta: "Organiser dans l'app",
    introGuideTitle: "Continuez votre récapitulatif dans MomentBook",
    introGuideLead:
      "Après l'introduction, ouvrez l'app pour importer vos photos en lot et organiser les moments par temps et lieu.",
  },
  th: {
    metaTitle: "MomentBook — จดจำทุกช่วงเวลาของคุณ",
    metaDescription:
      "เก็บทุกช่วงเวลาการเดินทางในครั้งเดียว แล้วกลับมาจดจำได้ยาวนานบนไทม์ไลน์และแผนที่",
    heroTitle: "จดจำทุกช่วงเวลาของคุณ",
    heroLead:
      "เมื่อทริปจบ อัปโหลดครั้งเดียว แล้วช่วงเวลาจะเรียงตามเวลาและสถานที่ ให้คุณย้อนกลับมาดูได้ทุกเมื่อ",
    heroTutorialCta: "ดูทิวโทเรียล",
    primaryCta: "ดาวน์โหลด MomentBook",
    deviceAlt: "หน้าสแปลชของ MomentBook",
    replayLabel: "เล่นอินโทรอีกครั้ง",
    playWithSoundLabel: "เล่นพร้อมเสียง",
    playLabel: "เล่น",
    pauseLabel: "หยุดชั่วคราว",
    muteLabel: "ปิดเสียง",
    unmuteLabel: "เปิดเสียง",
    volumeLabel: "ระดับเสียง",
    seekLabel: "เลื่อนตำแหน่งวิดีโอ",
    fullscreenLabel: "เต็มหน้าจอ",
    exitFullscreenLabel: "ออกจากโหมดเต็มหน้าจอ",
    introPromptCta: "ลองจัดในแอป",
    introGuideTitle: "จัดทริปต่อใน MomentBook",
    introGuideLead:
      "หลังดูอินโทรแล้ว เปิดแอปเพื่ออัปโหลดรูปแบบชุดและจัดช่วงเวลาตามเวลาและสถานที่",
  },
  vi: {
    metaTitle: "MomentBook — Ghi nhớ khoảnh khắc của bạn",
    metaDescription:
      "Lưu khoảnh khắc chuyến đi trong một lần tải lên, rồi xem lại lâu hơn trên timeline và bản đồ.",
    heroTitle: "Ghi nhớ khoảnh khắc của bạn",
    heroLead:
      "Sau mỗi chuyến đi, tải lên một lần để các khoảnh khắc tự sắp theo thời gian và địa điểm, để bạn quay lại bất cứ lúc nào.",
    heroTutorialCta: "Xem hướng dẫn",
    primaryCta: "Tải MomentBook",
    deviceAlt: "Màn hình splash MomentBook",
    replayLabel: "Xem lại phần mở đầu",
    playWithSoundLabel: "Phát kèm âm thanh",
    playLabel: "Phát",
    pauseLabel: "Tạm dừng",
    muteLabel: "Tắt tiếng",
    unmuteLabel: "Bật tiếng",
    volumeLabel: "Âm lượng",
    seekLabel: "Tua video",
    fullscreenLabel: "Toàn màn hình",
    exitFullscreenLabel: "Thoát toàn màn hình",
    introPromptCta: "Thử sắp xếp trong app",
    introGuideTitle: "Tiếp tục phần tóm tắt trong MomentBook",
    introGuideLead:
      "Sau phần mở đầu, mở app để tải ảnh theo lô và sắp xếp khoảnh khắc theo thời gian và địa điểm.",
  },
};

const contactTypeByLanguage: Record<Language, string> = {
  en: "Customer Support",
  ko: "고객 지원",
  ja: "カスタマーサポート",
  zh: "客户支持",
  es: "Atención al cliente",
  pt: "Suporte ao cliente",
  fr: "Support client",
  th: "ฝ่ายสนับสนุนลูกค้า",
  vi: "Hỗ trợ khách hàng",
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
  const downloadContent = getDownloadCopy(lang);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@momentbook.app";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/"), siteUrl).toString();
  const storeLinks = getCanonicalStoreLinks(lang);

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "MomentBook",
    url: siteUrl,
    logo: buildAbsoluteAppTransparentLogoUrl(siteUrl),
    sameAs: [...MARKETING_CHANNEL_URLS, storeLinks.ios, storeLinks.android],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: contactTypeByLanguage[lang],
      email: supportEmail,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "MomentBook",
    url: pageUrl,
    description: content.metaDescription,
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MomentBook",
    description: downloadContent.metaDescription,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    softwareRequirements: downloadContent.softwareRequirements,
    url: pageUrl,
    offers: [
      {
        "@type": "Offer",
        url: storeLinks.ios,
        price: "0",
        priceCurrency: "USD",
      },
      {
        "@type": "Offer",
        url: storeLinks.android,
        price: "0",
        priceCurrency: "USD",
      },
    ],
  };

  return (
    <div className={styles.page}>
      <HashTargetFocus />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(softwareApplicationSchema) }}
      />

      <HomeHero lang={lang} content={content} />
      <HomeDownloadSection lang={lang} content={downloadContent} />
    </div>
  );
}
