import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { LocalizedDate } from "@/components/LocalizedTime";
import { Reveal } from "@/components/Reveal";
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
import {
  buildAbsoluteTitle,
  buildPublicRobots,
} from "@/lib/seo/public-metadata";
import { HashTargetFocus } from "./HashTargetFocus";
import {
  HomeDownloadSection,
  type HomeDownloadNarrativeContent,
} from "./HomeDownloadSection";
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
  primaryCta: string;
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
  download: HomeDownloadNarrativeContent;
};

const homePageCopy: Record<Language, HomePageCopy> = {
  en: {
    metaTitle: "MomentBook — Upload once, organized all the way to your drive",
    metaDescription:
      "Upload trip photos in one batch. MomentBook organizes them into a timeline by time and place, then automatically syncs the archive to your cloud drive.",
    heroTitle: "Remember your trip",
    heroLead:
      "Upload trip photos and MomentBook organizes them by time and place, then automatically syncs them to your drive.",
    primaryCta: "Install app",
  },
  ko: {
    metaTitle: "MomentBook — 한 번 올리면, 드라이브까지 정리됩니다",
    metaDescription:
      "여행 사진을 한 번에 올리면 시간과 장소 기준 타임라인으로 정리하고, 정리된 아카이브를 클라우드 드라이브에 자동 동기화합니다.",
    heroTitle: "당신의 여행을 기억하세요",
    heroLead:
      "여행 사진을 올리면 시간과 장소 기준으로 정리하고, 드라이브까지 자동 동기화합니다.",
    primaryCta: "앱 설치",
  },
  ja: {
    metaTitle: "MomentBook — 一度アップロードすると、ドライブまで整理されます",
    metaDescription:
      "旅行写真をまとめてアップロードすると、時間と場所の流れでタイムラインに整理し、整理されたアーカイブをクラウドドライブに自動同期します。",
    heroTitle: "あなたの旅を記憶に残しましょう",
    heroLead:
      "旅行写真をアップロードすると、時間と場所で整理され、ドライブまで自動で同期されます。",
    primaryCta: "アプリをインストール",
  },
  zh: {
    metaTitle: "MomentBook — 一次上传，连云盘都会整理好",
    metaDescription:
      "一次上传旅行照片后，MomentBook 会按时间和地点整理成时间线，并将整理好的档案自动同步到云盘。",
    heroTitle: "记住你的旅行",
    heroLead:
      "上传旅行照片后，MomentBook 会按时间和地点整理，并自动同步到云盘。",
    primaryCta: "安装应用",
  },
  es: {
    metaTitle: "MomentBook — Súbelo una vez y se ordena hasta tu drive",
    metaDescription:
      "Sube las fotos del viaje de una vez. MomentBook las ordena en una línea de tiempo por fecha y lugar, y sincroniza automáticamente el archivo con tu nube.",
    heroTitle: "Recuerda tu viaje",
    heroLead:
      "Sube las fotos del viaje y MomentBook las ordena por fecha y lugar, y después las sincroniza automáticamente con tu drive.",
    primaryCta: "Instalar app",
  },
  pt: {
    metaTitle: "MomentBook — Envie uma vez e tudo segue organizado até o drive",
    metaDescription:
      "Envie as fotos da viagem de uma vez. O MomentBook organiza tudo em uma linha do tempo por data e lugar e sincroniza automaticamente o arquivo com seu drive na nuvem.",
    heroTitle: "Guarde sua viagem",
    heroLead:
      "Envie as fotos da viagem e o MomentBook organiza tudo por data e lugar, depois sincroniza automaticamente com o seu drive.",
    primaryCta: "Instalar app",
  },
  fr: {
    metaTitle: "MomentBook — Importez une fois, l'organisation va jusqu'au drive",
    metaDescription:
      "Importez les photos du voyage en une fois. MomentBook les range dans une chronologie par date et lieu, puis synchronise automatiquement l'archive avec votre espace cloud.",
    heroTitle: "Gardez votre voyage en mémoire",
    heroLead:
      "Importez les photos du voyage et MomentBook les organise par date et lieu, puis les synchronise automatiquement avec votre espace cloud.",
    primaryCta: "Installer l'app",
  },
  th: {
    metaTitle: "MomentBook — อัปโหลดครั้งเดียว แล้วจัดไปถึงไดรฟ์",
    metaDescription:
      "อัปโหลดรูปทริปครั้งเดียว MomentBook จะจัดเป็นไทม์ไลน์ตามเวลาและสถานที่ พร้อมซิงก์คลังที่จัดแล้วไปยังคลาวด์ไดรฟ์โดยอัตโนมัติ",
    heroTitle: "จดจำการเดินทางของคุณ",
    heroLead:
      "เมื่ออัปโหลดรูปทริป MomentBook จะจัดตามเวลาและสถานที่ แล้วซิงก์ไปยังไดรฟ์ของคุณโดยอัตโนมัติ",
    primaryCta: "ติดตั้งแอป",
  },
  vi: {
    metaTitle: "MomentBook — Tải lên một lần, sắp xếp tới tận drive",
    metaDescription:
      "Tải ảnh chuyến đi lên một lần. MomentBook sắp thành dòng thời gian theo thời gian và địa điểm, rồi tự động đồng bộ kho lưu trữ đã sắp xếp lên cloud drive.",
    heroTitle: "Ghi nhớ chuyến đi của bạn",
    heroLead:
      "Tải ảnh chuyến đi lên và MomentBook sẽ sắp xếp theo thời gian, địa điểm rồi tự động đồng bộ lên drive của bạn.",
    primaryCta: "Cài ứng dụng",
  },
};

const homeEditorialCopy: Record<Language, HomeEditorialCopy> = {
  en: {
    heroEyebrow: "Travel photo organizer",
    heroExploreCta: "Public journeys",
    featuredEyebrow: "Public archive",
    featuredTitle: "See the organized result",
    featuredLead: "Recently published trips.",
    featuredArchiveCta: "View all",
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
    heroEyebrow: "旅行写真整理アプリ",
    heroExploreCta: "公開された旅",
    featuredEyebrow: "公開アーカイブ",
    featuredTitle: "整理された結果を見る",
    featuredLead: "最近公開された旅行です。",
    featuredArchiveCta: "すべて見る",
    photoCountLabel: "枚の写真",
    untitledJourney: "タイトル未設定の旅",
    unknownUser: "不明なユーザー",
    emptyJourneys: "公開された旅はまだありません。",
  },
  zh: {
    heroEyebrow: "旅行照片整理应用",
    heroExploreCta: "公开旅程",
    featuredEyebrow: "公开档案",
    featuredTitle: "查看整理结果",
    featuredLead: "最近公开的旅程。",
    featuredArchiveCta: "查看全部",
    photoCountLabel: "张照片",
    untitledJourney: "未命名旅程",
    unknownUser: "未知用户",
    emptyJourneys: "还没有公开旅程。",
  },
  es: {
    heroEyebrow: "App para organizar fotos de viaje",
    heroExploreCta: "Viajes públicos",
    featuredEyebrow: "Archivo público",
    featuredTitle: "Ver el resultado organizado",
    featuredLead: "Viajes publicados recientemente.",
    featuredArchiveCta: "Ver todo",
    photoCountLabel: "fotos",
    untitledJourney: "Viaje sin título",
    unknownUser: "Usuario desconocido",
    emptyJourneys: "Aún no hay viajes públicos.",
  },
  pt: {
    heroEyebrow: "App para organizar fotos de viagem",
    heroExploreCta: "Viagens publicadas",
    featuredEyebrow: "Arquivo público",
    featuredTitle: "Ver o resultado organizado",
    featuredLead: "Viagens publicadas recentemente.",
    featuredArchiveCta: "Ver tudo",
    photoCountLabel: "fotos",
    untitledJourney: "Viagem sem título",
    unknownUser: "Usuário desconhecido",
    emptyJourneys: "Ainda não há viagens publicadas.",
  },
  fr: {
    heroEyebrow: "App d'organisation de photos de voyage",
    heroExploreCta: "Voyages publics",
    featuredEyebrow: "Archive publique",
    featuredTitle: "Voir le résultat organisé",
    featuredLead: "Voyages publiés récemment.",
    featuredArchiveCta: "Voir tout",
    photoCountLabel: "photos",
    untitledJourney: "Voyage sans titre",
    unknownUser: "Utilisateur inconnu",
    emptyJourneys: "Aucun voyage public pour le moment.",
  },
  th: {
    heroEyebrow: "แอปจัดรูปทริป",
    heroExploreCta: "ทริปสาธารณะ",
    featuredEyebrow: "คลังสาธารณะ",
    featuredTitle: "ดูผลลัพธ์ที่จัดแล้ว",
    featuredLead: "ทริปที่เพิ่งเผยแพร่ล่าสุด",
    featuredArchiveCta: "ดูทั้งหมด",
    photoCountLabel: "ภาพ",
    untitledJourney: "ทริปไม่มีชื่อ",
    unknownUser: "ผู้ใช้ไม่ทราบชื่อ",
    emptyJourneys: "ยังไม่มีทริปสาธารณะ",
  },
  vi: {
    heroEyebrow: "Ứng dụng sắp xếp ảnh du lịch",
    heroExploreCta: "Hành trình công khai",
    featuredEyebrow: "Kho lưu trữ công khai",
    featuredTitle: "Xem kết quả đã sắp xếp",
    featuredLead: "Những hành trình vừa được công khai.",
    featuredArchiveCta: "Xem tất cả",
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
      processTitle: "Upload, organize, sync",
      processLead:
        "Spend less time cleaning up folders.",
      processSteps: [
        {
          stepLabel: "01",
          title: "Upload",
          description:
            "Upload trip photos in one batch.",
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
            "The organized archive continues to your drive.",
        },
      ],
    },
    download: {
      title: "Download now",
      lead:
        "Install now and start organizing trip photos.",
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
    download: {
      title: "立即下载",
      lead:
        "安装 MomentBook，开始整理旅行照片。",
    },
  },
  es: {
    process: {
      processEyebrow: "3 pasos",
      processTitle: "Sube, ordena y sincroniza",
      processLead:
        "Reduce el orden manual de carpetas.",
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
            "El archivo organizado se sincroniza con tu drive.",
        },
      ],
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
      processTitle: "Envie, organize e sincronize",
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
            "O arquivo organizado é sincronizado com o seu drive.",
        },
      ],
    },
    download: {
      title: "Baixe agora",
      lead:
        "Instale agora e comece a organizar as fotos da sua viagem.",
    },
  },
  fr: {
    process: {
      processEyebrow: "3 étapes",
      processTitle: "Importez, triez et synchronisez",
      processLead:
        "Réduisez le rangement manuel des dossiers.",
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
            "L'archive organisée est synchronisée avec votre espace cloud.",
        },
      ],
    },
    download: {
      title: "Téléchargez maintenant",
      lead:
        "Installez-le maintenant et commencez à organiser vos photos de voyage.",
    },
  },
  th: {
    process: {
      processEyebrow: "3 ขั้นตอน",
      processTitle: "อัปโหลด จัดระเบียบ ซิงก์",
      processLead:
        "ลดการจัดโฟลเดอร์ด้วยตัวเอง",
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
            "คลังรูปที่จัดแล้วจะซิงก์ต่อไปยังไดรฟ์",
        },
      ],
    },
    download: {
      title: "ดาวน์โหลดตอนนี้",
      lead:
        "ติดตั้งตอนนี้แล้วเริ่มจัดรูปทริปของคุณ",
    },
  },
  vi: {
    process: {
      processEyebrow: "3 bước",
      processTitle: "Tải lên, sắp xếp, đồng bộ",
      processLead:
        "Giảm việc tự dọn thư mục.",
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
            "Kho lưu trữ đã sắp xếp sẽ đồng bộ lên drive.",
        },
      ],
    },
    download: {
      title: "Tải ngay",
      lead:
        "Cài ngay và bắt đầu sắp xếp ảnh chuyến đi của bạn.",
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
    title: buildAbsoluteTitle(content.metaTitle),
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
    primaryCta: content.primaryCta,
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
        <Reveal
          delay={0}
          duration={760}
          distance={8}
          className={styles.sectionHeader}
        >
          <div className={styles.sectionHeaderCopy}>
            <p className={styles.sectionEyebrow}>{editorialContent.featuredEyebrow}</p>
            <h2 id="home-featured-title" className={styles.sectionTitle}>
              {editorialContent.featuredTitle}
            </h2>
            <p className={styles.sectionLead}>{editorialContent.featuredLead}</p>
          </div>
          <Link href={`/${lang}/journeys`} className={styles.archiveLink}>
            {editorialContent.featuredArchiveCta}
          </Link>
        </Reveal>

        {featuredJourneys.length > 0 ? (
          <div className={styles.featuredGrid}>
            {featuredJourneys.map((journey, index) => (
              <Reveal
                key={journey.publicId}
                delay={index * 70}
                duration={820}
                distance={8}
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
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal delay={80} duration={760} distance={8}>
            <p className={styles.featuredEmpty}>{editorialContent.emptyJourneys}</p>
          </Reveal>
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
