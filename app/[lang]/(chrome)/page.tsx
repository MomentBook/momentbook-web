import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FadeIn } from "@/components/FadeIn";
import { LocalizedDate } from "@/components/LocalizedTime";
import { buildAbsoluteAppTransparentLogoUrl } from "@/lib/branding/logo";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { getDownloadCopy } from "@/lib/marketing/download-content";
import { MARKETING_CHANNEL_URLS } from "@/lib/marketing/social-channels";
import {
  buildAppleSmartBannerContent,
  getCanonicalStoreLinks,
} from "@/lib/mobile-app";
import { fetchPublishedJourneys, type PublishedJourneyListItemApi } from "@/lib/published-journey";
import { fetchPublicUser } from "@/lib/public-users";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";
import { HashTargetFocus } from "./HashTargetFocus";
import {
  HomeDownloadSection,
  type HomeDownloadNarrativeContent,
} from "./HomeDownloadSection";
import { HomeIntroSection } from "./HomeIntroSection";
import {
  HomeHero,
  type HomeHeroProcessContent,
} from "./HomeHero";
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

type HomeEditorialCopy = {
  heroEyebrow: string;
  heroExploreCta: string;
  featuredEyebrow: string;
  featuredTitle: string;
  featuredLead: string;
  featuredArchiveCta: string;
  featuredReadOnlyLabel: string;
  photoCountLabel: string;
  untitledJourney: string;
  unknownUser: string;
  emptyJourneys: string;
};

type HomeMessageCopy = {
  process: HomeHeroProcessContent;
  download: HomeDownloadNarrativeContent;
};

const homePageCopy: Record<Language, HomePageCopy> = {
  en: {
    metaTitle: "MomentBook — Upload once, organize and sync",
    metaDescription:
      "Upload trip photos once, organize them by time and place, and let MomentBook sync the archive to your cloud drive.",
    heroTitle: "Upload once. Sorted for you.",
    heroLead:
      "MomentBook sorts trip photos by time and place, then syncs the archive to your cloud drive.",
    heroTutorialCta: "See how",
    primaryCta: "Install app",
    deviceAlt: "MomentBook tutorial video",
    replayLabel: "Replay video",
    playWithSoundLabel: "Play with sound",
    playLabel: "Play",
    pauseLabel: "Pause",
    muteLabel: "Mute",
    unmuteLabel: "Unmute",
    volumeLabel: "Volume",
    seekLabel: "Seek video",
    fullscreenLabel: "Full screen",
    exitFullscreenLabel: "Exit full screen",
    introPromptCta: "Open guide",
    introGuideTitle: "See how MomentBook works",
    introGuideLead:
      "Watch the flow from upload to organization and drive sync.",
  },
  ko: {
    metaTitle: "MomentBook — 한 번 올리면, 드라이브까지 정리됩니다",
    metaDescription:
      "여행 사진을 한 번에 올리면 시간과 장소 기준 타임라인으로 정리하고, 정리된 아카이브를 클라우드 드라이브에 자동 동기화합니다.",
    heroTitle: "당신의 여행을 기록하세요",
    heroLead:
      "여행 사진을 올리면 시간과 장소 기준으로 정리하고, 드라이브까지 자동 동기화합니다.",
    heroTutorialCta: "작동 보기",
    primaryCta: "앱 설치",
    deviceAlt: "MomentBook 튜토리얼 영상",
    replayLabel: "영상 다시 보기",
    playWithSoundLabel: "소리와 함께 재생",
    playLabel: "재생",
    pauseLabel: "일시정지",
    muteLabel: "음소거",
    unmuteLabel: "음소거 해제",
    volumeLabel: "볼륨",
    seekLabel: "영상 탐색",
    fullscreenLabel: "전체 화면",
    exitFullscreenLabel: "전체 화면 종료",
    introPromptCta: "가이드 열기",
    introGuideTitle: "MomentBook 작동 보기",
    introGuideLead:
      "업로드부터 자동 정리, 드라이브 동기화까지 영상으로 확인하세요.",
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
    replayLabel: "Volver a ver la introducción",
    playWithSoundLabel: "Reproducir con sonido",
    playLabel: "Reproducir",
    pauseLabel: "Pausar",
    muteLabel: "Silenciar",
    unmuteLabel: "Activar sonido",
    volumeLabel: "Volumen",
    seekLabel: "Buscar en el video",
    fullscreenLabel: "Pantalla completa",
    exitFullscreenLabel: "Salir de pantalla completa",
    introPromptCta: "Organizar en la aplicación",
    introGuideTitle: "Continúa tu repaso en MomentBook",
    introGuideLead:
      "Después de la introducción, abre la aplicación para subir fotos en lote y ordenar momentos por tiempo y lugar.",
  },
  pt: {
    metaTitle: "MomentBook — Guarde seus momentos",
    metaDescription:
      "Guarde seus momentos de viagem em um único envio e reviva-os por mais tempo na linha do tempo e no mapa.",
    heroTitle: "Guarde seus momentos",
    heroLead:
      "Quando a viagem terminar, envie tudo de uma vez e deixe os momentos se organizarem por tempo e lugar para revisitar quando quiser.",
    heroTutorialCta: "Ver tutorial",
    primaryCta: "Baixar MomentBook",
    deviceAlt: "Tela de abertura do MomentBook",
    replayLabel: "Rever a introdução",
    playWithSoundLabel: "Reproduzir com som",
    playLabel: "Reproduzir",
    pauseLabel: "Pausar",
    muteLabel: "Silenciar",
    unmuteLabel: "Ativar som",
    volumeLabel: "Volume",
    seekLabel: "Buscar no vídeo",
    fullscreenLabel: "Tela cheia",
    exitFullscreenLabel: "Sair da tela cheia",
    introPromptCta: "Organizar no aplicativo",
    introGuideTitle: "Continue seu resumo no MomentBook",
    introGuideLead:
      "Depois da introdução, abra o aplicativo para enviar fotos em lote e organizar momentos por tempo e lugar.",
  },
  fr: {
    metaTitle: "MomentBook — Memorisez vos moments",
    metaDescription:
      "Gardez vos moments de voyage en un seul envoi et retrouvez-les plus longtemps sur la chronologie et la carte.",
    heroTitle: "Memorisez vos moments",
    heroLead:
      "À la fin du voyage, importez tout en une fois et laissez les moments se ranger par temps et lieu pour y revenir quand vous voulez.",
    heroTutorialCta: "Voir le tutoriel",
    primaryCta: "Télécharger MomentBook",
    deviceAlt: "Écran de démarrage MomentBook",
    replayLabel: "Revoir l'introduction",
    playWithSoundLabel: "Lire avec le son",
    playLabel: "Lire",
    pauseLabel: "Pause",
    muteLabel: "Couper le son",
    unmuteLabel: "Activer le son",
    volumeLabel: "Volume",
    seekLabel: "Avancer dans la vidéo",
    fullscreenLabel: "Plein écran",
    exitFullscreenLabel: "Quitter le plein écran",
    introPromptCta: "Organiser dans l'application",
    introGuideTitle: "Continuez votre récapitulatif dans MomentBook",
    introGuideLead:
      "Après l'introduction, ouvrez l'application pour importer vos photos en lot et organiser les moments par temps et lieu.",
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
      "Lưu khoảnh khắc chuyến đi trong một lần tải lên, rồi xem lại lâu hơn trên dòng thời gian và bản đồ.",
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
    introPromptCta: "Thử sắp xếp trong ứng dụng",
    introGuideTitle: "Tiếp tục phần tóm tắt trong MomentBook",
    introGuideLead:
      "Sau phần mở đầu, mở ứng dụng để tải ảnh theo lô và sắp xếp khoảnh khắc theo thời gian và địa điểm.",
  },
};

const homeEditorialCopy: Record<Language, HomeEditorialCopy> = {
  en: {
    heroEyebrow: "Travel photo organizer",
    heroExploreCta: "See journeys",
    featuredEyebrow: "Public archives",
    featuredTitle: "See the result",
    featuredLead: "Recent public trips from MomentBook.",
    featuredArchiveCta: "All journeys",
    featuredReadOnlyLabel: "Read only",
    photoCountLabel: "photos",
    untitledJourney: "Untitled journey",
    unknownUser: "Unknown user",
    emptyJourneys: "No public journeys yet.",
  },
  ko: {
    heroEyebrow: "여행 사진 정리 앱",
    heroExploreCta: "공개 여정",
    featuredEyebrow: "공개 아카이브",
    featuredTitle: "정리된 결과 보기",
    featuredLead: "최근 공개된 여행입니다.",
    featuredArchiveCta: "전체 보기",
    featuredReadOnlyLabel: "읽기 전용",
    photoCountLabel: "장의 사진",
    untitledJourney: "제목 없는 여정",
    unknownUser: "알 수 없는 사용자",
    emptyJourneys: "아직 공개된 여정이 없습니다.",
  },
  ja: {
    heroEyebrow: "読み取り専用の旅アーカイブ",
    heroExploreCta: "旅を見てみる",
    featuredEyebrow: "最新の公開された旅",
    featuredTitle: "最近の旅",
    featuredLead: "MomentBookで最近公開された旅です。",
    featuredArchiveCta: "アーカイブを見る",
    featuredReadOnlyLabel: "閲覧専用",
    photoCountLabel: "枚の写真",
    untitledJourney: "タイトル未設定の旅",
    unknownUser: "不明なユーザー",
    emptyJourneys: "公開された旅はまだありません。",
  },
  zh: {
    heroEyebrow: "只读旅行档案",
    heroExploreCta: "查看旅程",
    featuredEyebrow: "最新公开旅程",
    featuredTitle: "最近旅程",
    featuredLead: "MomentBook 中最近公开的旅程。",
    featuredArchiveCta: "查看归档",
    featuredReadOnlyLabel: "只读",
    photoCountLabel: "张照片",
    untitledJourney: "未命名旅程",
    unknownUser: "未知用户",
    emptyJourneys: "暂无公开旅程。",
  },
  es: {
    heroEyebrow: "Archivo de viajes de solo lectura",
    heroExploreCta: "Explorar viajes",
    featuredEyebrow: "Viajes públicos recientes",
    featuredTitle: "Viajes recientes",
    featuredLead: "Los viajes públicos publicados más recientemente en MomentBook.",
    featuredArchiveCta: "Ver archivo",
    featuredReadOnlyLabel: "Solo lectura",
    photoCountLabel: "fotos",
    untitledJourney: "Viaje sin título",
    unknownUser: "Usuario desconocido",
    emptyJourneys: "Aún no hay viajes públicos.",
  },
  pt: {
    heroEyebrow: "Arquivo de viagens somente leitura",
    heroExploreCta: "Explorar jornadas",
    featuredEyebrow: "Jornadas públicas recentes",
    featuredTitle: "Jornadas recentes",
    featuredLead: "As jornadas públicas publicadas mais recentemente no MomentBook.",
    featuredArchiveCta: "Ver arquivo",
    featuredReadOnlyLabel: "Somente leitura",
    photoCountLabel: "fotos",
    untitledJourney: "Jornada sem título",
    unknownUser: "Usuário desconhecido",
    emptyJourneys: "Ainda não há jornadas públicas.",
  },
  fr: {
    heroEyebrow: "Archive de voyage en lecture seule",
    heroExploreCta: "Explorer les voyages",
    featuredEyebrow: "Voyages publics récents",
    featuredTitle: "Voyages récents",
    featuredLead: "Les voyages publics publiés le plus récemment sur MomentBook.",
    featuredArchiveCta: "Voir l'archive",
    featuredReadOnlyLabel: "Lecture seule",
    photoCountLabel: "photos",
    untitledJourney: "Voyage sans titre",
    unknownUser: "Utilisateur inconnu",
    emptyJourneys: "Aucun voyage public pour le moment.",
  },
  th: {
    heroEyebrow: "คลังการเดินทางแบบอ่านอย่างเดียว",
    heroExploreCta: "สำรวจทริป",
    featuredEyebrow: "ทริปสาธารณะล่าสุด",
    featuredTitle: "ทริปล่าสุด",
    featuredLead: "ทริปสาธารณะที่เผยแพร่ล่าสุดบน MomentBook",
    featuredArchiveCta: "ดูคลังทั้งหมด",
    featuredReadOnlyLabel: "อ่านอย่างเดียว",
    photoCountLabel: "ภาพ",
    untitledJourney: "ทริปไม่มีชื่อ",
    unknownUser: "ผู้ใช้ไม่ทราบชื่อ",
    emptyJourneys: "ยังไม่มีทริปสาธารณะ",
  },
  vi: {
    heroEyebrow: "Kho luu tru hanh trinh chi doc",
    heroExploreCta: "Xem hanh trinh",
    featuredEyebrow: "Hanh trinh cong khai moi nhat",
    featuredTitle: "Hanh trinh gan day",
    featuredLead: "Nhung hanh trinh cong khai moi duoc dang tren MomentBook.",
    featuredArchiveCta: "Xem kho luu tru",
    featuredReadOnlyLabel: "Chi doc",
    photoCountLabel: "anh",
    untitledJourney: "Hanh trinh chua dat ten",
    unknownUser: "Nguoi dung khong ro",
    emptyJourneys: "Chua co hanh trinh cong khai.",
  },
};

const homeMessageCopy: Partial<Record<Language, HomeMessageCopy>> = {
  en: {
    process: {
      introEyebrow: "Tutorial video",
      processEyebrow: "3 steps",
      processTitle: "Upload. Sort. Sync.",
      processLead:
        "Skip the folder cleanup.",
      processSteps: [
        {
          stepLabel: "01",
          title: "Upload",
          description:
            "Add trip photos in one batch.",
        },
        {
          stepLabel: "02",
          title: "Sort by time and place",
          description:
            "Your timeline is built automatically.",
        },
        {
          stepLabel: "03",
          title: "Sync to drive",
          description:
            "The archive is ready for cloud storage.",
        },
      ],
    },
    download: {
      title: "Ready for your cloud drive",
      lead:
        "Install MomentBook to sort trip photos and keep the archive synced.",
      highlights: [
        "Upload once",
        "Sort automatically",
        "Sync to drive",
      ],
    },
  },
  ko: {
    process: {
      introEyebrow: "튜토리얼 영상",
      processEyebrow: "3단계",
      processTitle: "올리고, 정리하고, 동기화",
      processLead:
        "폴더 정리를 줄입니다.",
      processSteps: [
        {
          stepLabel: "01",
          title: "업로드",
          description:
            "여행 사진을 한 번에 올립니다.",
        },
        {
          stepLabel: "02",
          title: "시간·장소 정리",
          description:
            "타임라인이 자동으로 만들어집니다.",
        },
        {
          stepLabel: "03",
          title: "드라이브 동기화",
          description:
            "정리된 아카이브가 드라이브로 이어집니다.",
        },
      ],
    },
    download: {
      title: "드라이브까지 바로 이어집니다",
      lead:
        "MomentBook로 여행 사진 정리를 한 번에 끝내세요.",
      highlights: [
        "한 번 업로드",
        "자동 정리",
        "드라이브 동기화",
      ],
    },
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

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : null;
}

function readText(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function readCount(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value) && value >= 0) {
    return Math.floor(value);
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed >= 0) {
      return Math.floor(parsed);
    }
  }

  return null;
}

function resolvePhotoCount(...values: unknown[]): number {
  let maxCount = 0;

  for (const value of values) {
    const count = readCount(value);
    if (count !== null && count > maxCount) {
      maxCount = count;
    }
  }

  return maxCount;
}

function resolveJourneyMetadata(journey: PublishedJourneyListItemApi) {
  const metadata = asRecord(journey.metadata);

  return {
    title: readText(metadata?.title),
    description: readText(metadata?.description),
    thumbnailUri: readText(metadata?.thumbnailUri),
  };
}

function getHomePageCopy(lang: Language): HomePageCopy {
  return homePageCopy[lang] ?? homePageCopy.en;
}

function getHomeEditorialCopy(lang: Language): HomeEditorialCopy {
  return homeEditorialCopy[lang] ?? homeEditorialCopy.en;
}

function getHomeMessageCopy(lang: Language): HomeMessageCopy {
  return homeMessageCopy[lang] ?? homeMessageCopy.en!;
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
    other: {
      "apple-itunes-app": buildAppleSmartBannerContent(lang),
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
  const editorialContent = getHomeEditorialCopy(lang);
  const messageContent = getHomeMessageCopy(lang);
  const downloadContent = getDownloadCopy(lang);
  const latestJourneys = await fetchPublishedJourneys({
    page: 1,
    limit: 3,
    sort: "recent",
  });
  const journeyItems = latestJourneys?.journeys ?? [];
  const uniqueUserIds = [...new Set(journeyItems.map((journey) => journey.userId).filter(Boolean))];
  const users = await Promise.all(
    uniqueUserIds.map(async (userId) => [userId, await fetchPublicUser(userId)] as const),
  );
  const userMap = new Map(users);
  const featuredJourneys = journeyItems.map((journey) => {
    const meta = resolveJourneyMetadata(journey);
    const authorName = readText(userMap.get(journey.userId)?.name) ?? editorialContent.unknownUser;
    const photoCount = resolvePhotoCount(journey.photoCount, journey.imageCount);
    const publishedAt = readText(journey.publishedAt) ?? readText(journey.createdAt);

    return {
      publicId: journey.publicId,
      href: `/${lang}/journeys/${journey.publicId}`,
      title: readText(journey.title) ?? meta.title ?? editorialContent.untitledJourney,
      description: readText(journey.description) ?? meta.description ?? null,
      authorName,
      photoCount,
      publishedAt,
      coverUrl: readText(journey.thumbnailUrl) ?? meta.thumbnailUri ?? null,
    };
  });
  const heroContent = {
    ...content,
    ...editorialContent,
    heroFootnote: "",
  };

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
    description: content.metaDescription,
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

      <HomeHero lang={lang} content={heroContent} process={messageContent.process} />
      <section className={styles.featuredSection} aria-labelledby="home-featured-title">
        <div className={styles.sectionHeader}>
          <div className={styles.sectionHeaderCopy}>
            <FadeIn delay={80}>
              <p className={styles.sectionEyebrow}>{editorialContent.featuredEyebrow}</p>
            </FadeIn>
            <FadeIn delay={120}>
              <h2 id="home-featured-title" className={styles.sectionTitle}>
                {editorialContent.featuredTitle}
              </h2>
            </FadeIn>
            <FadeIn delay={160}>
              <p className={styles.sectionLead}>{editorialContent.featuredLead}</p>
            </FadeIn>
          </div>
          <FadeIn delay={200}>
            <Link href={`/${lang}/journeys`} className={styles.archiveLink}>
              {editorialContent.featuredArchiveCta}
            </Link>
          </FadeIn>
        </div>

        {featuredJourneys.length > 0 ? (
          <div className={styles.featuredGrid}>
            {featuredJourneys.map((journey, index) => (
              <FadeIn
                key={journey.publicId}
                delay={240 + (index * 80)}
                className={styles.featuredCard}
              >
                <Link href={journey.href} className={styles.featuredCardLink}>
                  <div className={styles.featuredCardMedia}>
                    <Image
                      src={journey.coverUrl || "/images/placeholders/journey-cover-fallback.svg"}
                      alt={journey.title}
                      fill
                      sizes="(max-width: 739px) 100vw, (max-width: 1099px) 50vw, 33vw"
                      className={styles.featuredCardImage}
                    />
                    <span className={styles.featuredBadge}>{editorialContent.featuredReadOnlyLabel}</span>
                  </div>
                  <div className={styles.featuredCardBody}>
                    <div className={styles.featuredCardMeta}>
                      {journey.publishedAt ? (
                        <LocalizedDate lang={lang} timestamp={Date.parse(journey.publishedAt)} />
                      ) : null}
                      <span>{journey.authorName}</span>
                    </div>
                    <h3 className={styles.featuredCardTitle}>{journey.title}</h3>
                    <p className={styles.featuredCardDescription}>{journey.description}</p>
                    <div className={styles.featuredCardFooter}>
                      <span>{journey.photoCount} {editorialContent.photoCountLabel}</span>
                    </div>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        ) : (
          <FadeIn delay={240}>
            <p className={styles.featuredEmpty}>{editorialContent.emptyJourneys}</p>
          </FadeIn>
        )}
      </section>
      <HomeIntroSection
        lang={lang}
        content={heroContent}
        introEyebrow={messageContent.process.introEyebrow}
      />
      <HomeDownloadSection
        lang={lang}
        content={downloadContent}
        narrative={messageContent.download}
      />
    </div>
  );
}
