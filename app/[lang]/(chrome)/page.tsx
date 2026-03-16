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
import {
  HomeTutorialSection,
  type HomeTutorialContent,
} from "./HomeTutorialSection";
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
  photoCountLabel: string;
  untitledJourney: string;
  unknownUser: string;
  emptyJourneys: string;
};

type HomeMessageCopy = {
  process: HomeHeroProcessContent;
  tutorial: Pick<HomeTutorialContent, "introEyebrow">;
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
    heroTutorialCta: "Watch tutorial",
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
    introGuideTitle: "MomentBook tutorial video",
    introGuideLead:
      "Watch the flow from upload to organization and drive sync.",
  },
  ko: {
    metaTitle: "MomentBook — 한 번 올리면, 드라이브까지 정리됩니다",
    metaDescription:
      "여행 사진을 한 번에 올리면 시간과 장소 기준 타임라인으로 정리하고, 정리된 아카이브를 클라우드 드라이브에 자동 동기화합니다.",
    heroTitle: "당신의 여행을 기억하세요",
    heroLead:
      "여행 사진을 올리면 시간과 장소 기준으로 정리하고, 드라이브까지 자동 동기화합니다.",
    heroTutorialCta: "튜토리얼 보기",
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
    introGuideTitle: "MomentBook 튜토리얼 영상",
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
    photoCountLabel: "ภาพ",
    untitledJourney: "ทริปไม่มีชื่อ",
    unknownUser: "ผู้ใช้ไม่ทราบชื่อ",
    emptyJourneys: "ยังไม่มีทริปสาธารณะ",
  },
  vi: {
    heroEyebrow: "Kho lưu trữ hành trình chỉ đọc",
    heroExploreCta: "Xem hành trình",
    featuredEyebrow: "Hành trình công khai mới nhất",
    featuredTitle: "Hành trình gần đây",
    featuredLead: "Những hành trình công khai mới được đăng trên MomentBook.",
    featuredArchiveCta: "Xem kho lưu trữ",
    photoCountLabel: "ảnh",
    untitledJourney: "Hành trình chưa đặt tên",
    unknownUser: "Người dùng không rõ",
    emptyJourneys: "Chưa có hành trình công khai.",
  },
};

const homeMessageCopy: Record<Language, HomeMessageCopy> = {
  en: {
    process: {
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
    tutorial: {
      introEyebrow: "Tutorial video",
    },
    download: {
      title: "Download now",
      lead:
        "Install MomentBook and start organizing trip photos.",
    },
  },
  ko: {
    process: {
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
    tutorial: {
      introEyebrow: "튜토리얼 영상",
    },
    download: {
      title: "지금 바로 다운로드하세요",
      lead:
        "지금 설치하고 여행 사진 정리를 시작하세요.",
    },
  },
  ja: {
    process: {
      processEyebrow: "3ステップ",
      processTitle: "アップロード、整理、同期",
      processLead:
        "フォルダ整理の手間を減らします。",
      processSteps: [
        {
          stepLabel: "01",
          title: "アップロード",
          description:
            "旅行写真をまとめて追加します。",
        },
        {
          stepLabel: "02",
          title: "時間・場所で整理",
          description:
            "タイムラインが自動で作られます。",
        },
        {
          stepLabel: "03",
          title: "ドライブに同期",
          description:
            "整理されたアーカイブがクラウドに保存されます。",
        },
      ],
    },
    tutorial: {
      introEyebrow: "チュートリアル動画",
    },
    download: {
      title: "今すぐダウンロード",
      lead:
        "インストールして旅行写真の整理を始めましょう。",
    },
  },
  zh: {
    process: {
      processEyebrow: "3 个步骤",
      processTitle: "上传、整理、同步",
      processLead:
        "少做文件夹整理。",
      processSteps: [
        {
          stepLabel: "01",
          title: "上传",
          description:
            "一次上传整趟旅行的照片。",
        },
        {
          stepLabel: "02",
          title: "按时间和地点整理",
          description:
            "时间线会自动生成。",
        },
        {
          stepLabel: "03",
          title: "同步到云盘",
          description:
            "整理好的档案会同步到云端。",
        },
      ],
    },
    tutorial: {
      introEyebrow: "教程视频",
    },
    download: {
      title: "立即下载",
      lead:
        "安装 MomentBook，开始整理旅行照片。",
    },
  },
  es: {
    process: {
      processEyebrow: "3 pasos",
      processTitle: "Sube. Ordena. Sincroniza.",
      processLead:
        "Evita ordenar carpetas a mano.",
      processSteps: [
        {
          stepLabel: "01",
          title: "Subir",
          description:
            "Añade las fotos del viaje en un solo lote.",
        },
        {
          stepLabel: "02",
          title: "Ordenar por tiempo y lugar",
          description:
            "La línea de tiempo se crea automáticamente.",
        },
        {
          stepLabel: "03",
          title: "Sincronizar con tu drive",
          description:
            "El archivo queda listo para la nube.",
        },
      ],
    },
    tutorial: {
      introEyebrow: "Video tutorial",
    },
    download: {
      title: "Descarga ahora",
      lead:
        "Instala MomentBook y empieza a organizar tus fotos de viaje.",
    },
  },
  pt: {
    process: {
      processEyebrow: "3 etapas",
      processTitle: "Envie. Organize. Sincronize.",
      processLead:
        "Menos limpeza manual de pastas.",
      processSteps: [
        {
          stepLabel: "01",
          title: "Enviar",
          description:
            "Adicione as fotos da viagem em um único lote.",
        },
        {
          stepLabel: "02",
          title: "Organizar por tempo e lugar",
          description:
            "A linha do tempo é criada automaticamente.",
        },
        {
          stepLabel: "03",
          title: "Sincronizar com seu drive",
          description:
            "O arquivo fica pronto para a nuvem.",
        },
      ],
    },
    tutorial: {
      introEyebrow: "Vídeo tutorial",
    },
    download: {
      title: "Baixe agora",
      lead:
        "Instale o MomentBook e comece a organizar suas fotos de viagem.",
    },
  },
  fr: {
    process: {
      processEyebrow: "3 étapes",
      processTitle: "Importez. Triez. Synchronisez.",
      processLead:
        "Moins de tri manuel dans les dossiers.",
      processSteps: [
        {
          stepLabel: "01",
          title: "Importer",
          description:
            "Ajoutez les photos du voyage en un seul lot.",
        },
        {
          stepLabel: "02",
          title: "Trier par date et lieu",
          description:
            "La chronologie se crée automatiquement.",
        },
        {
          stepLabel: "03",
          title: "Synchroniser vers le drive",
          description:
            "L’archive est prête pour le cloud.",
        },
      ],
    },
    tutorial: {
      introEyebrow: "Vidéo tutorielle",
    },
    download: {
      title: "Téléchargez maintenant",
      lead:
        "Installez MomentBook et commencez à organiser vos photos de voyage.",
    },
  },
  th: {
    process: {
      processEyebrow: "3 ขั้นตอน",
      processTitle: "อัปโหลด จัดระเบียบ ซิงก์",
      processLead:
        "ลดเวลาจัดโฟลเดอร์ด้วยตัวเอง",
      processSteps: [
        {
          stepLabel: "01",
          title: "อัปโหลด",
          description:
            "เพิ่มรูปทริปทั้งหมดในครั้งเดียว",
        },
        {
          stepLabel: "02",
          title: "จัดตามเวลาและสถานที่",
          description:
            "ไทม์ไลน์ถูกสร้างให้อัตโนมัติ",
        },
        {
          stepLabel: "03",
          title: "ซิงก์เข้าไดรฟ์",
          description:
            "คลังรูปที่จัดแล้วพร้อมส่งต่อขึ้นคลาวด์",
        },
      ],
    },
    tutorial: {
      introEyebrow: "วิดีโอทิวโทเรียล",
    },
    download: {
      title: "ดาวน์โหลดตอนนี้",
      lead:
        "ติดตั้ง MomentBook แล้วเริ่มจัดรูปทริปของคุณ",
    },
  },
  vi: {
    process: {
      processEyebrow: "3 bước",
      processTitle: "Tải lên. Sắp xếp. Đồng bộ.",
      processLead:
        "Bớt dọn thư mục thủ công.",
      processSteps: [
        {
          stepLabel: "01",
          title: "Tải lên",
          description:
            "Thêm ảnh chuyến đi trong một lần.",
        },
        {
          stepLabel: "02",
          title: "Sắp theo thời gian và địa điểm",
          description:
            "Dòng thời gian được tạo tự động.",
        },
        {
          stepLabel: "03",
          title: "Đồng bộ lên drive",
          description:
            "Kho lưu trữ đã sẵn sàng cho cloud.",
        },
      ],
    },
    tutorial: {
      introEyebrow: "Video hướng dẫn",
    },
    download: {
      title: "Tải ngay",
      lead:
        "Cài MomentBook và bắt đầu sắp xếp ảnh chuyến đi của bạn.",
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
  return homeMessageCopy[lang] ?? homeMessageCopy.en;
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
    heroEyebrow: editorialContent.heroEyebrow,
    heroTitle: content.heroTitle,
    heroLead: content.heroLead,
    heroExploreCta: editorialContent.heroExploreCta,
    heroTutorialCta: content.heroTutorialCta,
    primaryCta: content.primaryCta,
    heroFootnote: "",
  };
  const tutorialContent: HomeTutorialContent = {
    introEyebrow: messageContent.tutorial.introEyebrow,
    deviceAlt: content.deviceAlt,
    replayLabel: content.replayLabel,
    playWithSoundLabel: content.playWithSoundLabel,
    playLabel: content.playLabel,
    pauseLabel: content.pauseLabel,
    muteLabel: content.muteLabel,
    unmuteLabel: content.unmuteLabel,
    volumeLabel: content.volumeLabel,
    seekLabel: content.seekLabel,
    fullscreenLabel: content.fullscreenLabel,
    exitFullscreenLabel: content.exitFullscreenLabel,
    introGuideTitle: content.introGuideTitle,
    introGuideLead: content.introGuideLead,
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
      <HomeTutorialSection content={tutorialContent} />
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
      <HomeDownloadSection
        lang={lang}
        content={downloadContent}
        narrative={messageContent.download}
      />
    </div>
  );
}
