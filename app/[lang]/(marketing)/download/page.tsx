import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./download.module.scss";
import { getLocalizedScreenshotGallery, getLocalizedScreenshotPath } from "@/lib/app-screenshots";
import { getStoreRegion, type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";

type StoreLinks = {
  ios: string;
  android: string;
};

type StoreLabels = {
  iosLabel: string;
  iosName: string;
  iosAriaLabel: string;
  androidLabel: string;
  androidName: string;
  androidAriaLabel: string;
};

type DownloadFeature = {
  title: string;
  text: string;
};

type DownloadRequirement = {
  platform: string;
  details: string[];
};

type DownloadContent = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  subtitle: string;
  deviceAlt: string;
  availability: string;
  storeLabels: StoreLabels;
  quickStartTitle: string;
  quickStartQuestion: string;
  quickStartAnswer: string;
  quickStartSteps: string[];
  featuresTitle: string;
  features: DownloadFeature[];
  requirementsTitle: string;
  requirements: DownloadRequirement[];
  privacyText: string;
  supportPrefix: string;
  supportLink: string;
  faqOr: string;
  faqLink: string;
  supportSuffix: string;
};

const iosPath = "app/momentbook-%EC%97%AC%ED%96%89-%EA%B8%B0%EB%A1%9D/id6749165889";

function getStoreLinks(lang: Language): StoreLinks {
  const region = getStoreRegion(lang);

  return {
    ios: `https://apps.apple.com/${region.ios}/${iosPath}`,
    android: `https://play.google.com/store/apps/details?id=com.reflectalab.momentbook&hl=${region.hl}&gl=${region.gl}`,
  };
}

function getDownloadContent(lang: Language): DownloadContent {
  if (lang === "es") {
    return {
      metaTitle: "Descargar MomentBook",
      metaDescription: "Sube fotos del viaje en lote y ordenalas automaticamente por fecha y hora en iOS y Android.",
      title: "Descargar MomentBook",
      subtitle: "Carga en lote, organizacion automatica y recap del viaje. Disponible para iPhone y Android.",
      deviceAlt: "Pantalla de organizacion de fotos",
      availability: "Disponible en App Store y Google Play.",
      storeLabels: {
        iosLabel: "Descargar en",
        iosName: "App Store",
        iosAriaLabel: "Descargar en App Store",
        androidLabel: "Disponible en",
        androidName: "Google Play",
        androidAriaLabel: "Descargar en Google Play",
      },
      quickStartTitle: "Inicio rapido",
      quickStartQuestion: "¿Como empiezo con MomentBook?",
      quickStartAnswer: "Descarga la app, sube las fotos del viaje en una sola carga y revisa la timeline ordenada automaticamente.",
      quickStartSteps: [
        "Descarga desde App Store o Google Play",
        "Sube en lote las fotos del viaje",
        "Revisa la timeline organizada por fecha y hora",
      ],
      featuresTitle: "Flujo de organizacion automatica",
      features: [
        {
          title: "Carga en lote",
          text: "Sube fotos de varios dias en una sola vez.",
        },
        {
          title: "Orden automatico por fecha y hora",
          text: "Las fotos se ordenan en timeline sin clasificacion manual completa.",
        },
        {
          title: "Recap y publicacion opcional",
          text: "Revisa el viaje y publica solo cuando quieras.",
        },
      ],
      requirementsTitle: "Requisitos del sistema",
      requirements: [
        {
          platform: "iOS",
          details: ["Requiere iOS 16.0 o superior", "Compatible con iPhone y iPad"],
        },
        {
          platform: "Android",
          details: ["Requiere Android 10.0 o superior", "Compatible con la mayoria de dispositivos Android"],
        },
      ],
      privacyText: "Privado por defecto. Publicar crea una pagina publica con URL unica.",
      supportPrefix: "Necesitas ayuda? ",
      supportLink: "Ir a soporte",
      faqOr: " o ",
      faqLink: "ver FAQ",
      supportSuffix: ".",
    };
  }

  if (lang === "pt") {
    return {
      metaTitle: "Baixar MomentBook",
      metaDescription: "Envie fotos da viagem em lote e organize automaticamente por data e hora no iOS e Android.",
      title: "Baixar MomentBook",
      subtitle: "Envio em lote, organizacao automatica e recap da viagem. Disponivel para iPhone e Android.",
      deviceAlt: "Tela de organizacao de fotos",
      availability: "Disponivel na App Store e no Google Play.",
      storeLabels: {
        iosLabel: "Baixar na",
        iosName: "App Store",
        iosAriaLabel: "Baixar na App Store",
        androidLabel: "Disponivel no",
        androidName: "Google Play",
        androidAriaLabel: "Baixar no Google Play",
      },
      quickStartTitle: "Inicio rapido",
      quickStartQuestion: "Como comecar com o MomentBook?",
      quickStartAnswer: "Baixe o app, envie as fotos da viagem em uma vez e veja a timeline organizada automaticamente.",
      quickStartSteps: [
        "Baixe da App Store ou do Google Play",
        "Envie em lote as fotos da viagem",
        "Revise a timeline organizada por data e hora",
      ],
      featuresTitle: "Fluxo de organizacao automatica",
      features: [
        {
          title: "Envio em lote",
          text: "Envie fotos de varios dias de uma so vez.",
        },
        {
          title: "Ordem automatica por data e hora",
          text: "As fotos entram na timeline sem classificacao manual completa.",
        },
        {
          title: "Recap e publicacao opcional",
          text: "Revise a viagem e publique so quando quiser.",
        },
      ],
      requirementsTitle: "Requisitos do sistema",
      requirements: [
        {
          platform: "iOS",
          details: ["Requer iOS 16.0 ou superior", "Compativel com iPhone e iPad"],
        },
        {
          platform: "Android",
          details: ["Requer Android 10.0 ou superior", "Compativel com a maioria dos dispositivos Android"],
        },
      ],
      privacyText: "Privado por padrao. Publicar cria uma pagina publica com URL unica.",
      supportPrefix: "Precisa de ajuda? ",
      supportLink: "Ir para suporte",
      faqOr: " ou ",
      faqLink: "ver FAQ",
      supportSuffix: ".",
    };
  }

  if (lang === "fr") {
    return {
      metaTitle: "Telecharger MomentBook",
      metaDescription: "Importez les photos du voyage en lot et organisez-les automatiquement par date et heure sur iOS et Android.",
      title: "Telecharger MomentBook",
      subtitle: "Import en lot, organisation automatique et recap du voyage. Disponible sur iPhone et Android.",
      deviceAlt: "Ecran d'organisation de photos",
      availability: "Disponible sur App Store et Google Play.",
      storeLabels: {
        iosLabel: "Telecharger sur",
        iosName: "App Store",
        iosAriaLabel: "Telecharger sur App Store",
        androidLabel: "Disponible sur",
        androidName: "Google Play",
        androidAriaLabel: "Telecharger sur Google Play",
      },
      quickStartTitle: "Demarrage rapide",
      quickStartQuestion: "Comment commencer avec MomentBook?",
      quickStartAnswer: "Telechargez l'app, importez les photos du voyage en une fois et consultez la timeline organisee automatiquement.",
      quickStartSteps: [
        "Telechargez depuis l'App Store ou Google Play",
        "Importez en lot les photos du voyage",
        "Consultez la timeline classee par date et heure",
      ],
      featuresTitle: "Flux d'organisation automatique",
      features: [
        {
          title: "Import en lot",
          text: "Importez d'un coup des photos de plusieurs jours.",
        },
        {
          title: "Classement auto par date et heure",
          text: "Les photos se placent en timeline sans tri manuel complet.",
        },
        {
          title: "Recap et publication optionnelle",
          text: "Revoyez le voyage et publiez seulement si vous le souhaitez.",
        },
      ],
      requirementsTitle: "Configuration requise",
      requirements: [
        {
          platform: "iOS",
          details: ["Necessite iOS 16.0 ou plus", "Compatible iPhone et iPad"],
        },
        {
          platform: "Android",
          details: ["Necessite Android 10.0 ou plus", "Compatible avec la plupart des appareils Android"],
        },
      ],
      privacyText: "Prive par defaut. Publier cree une page publique avec une URL unique.",
      supportPrefix: "Besoin d'aide ? ",
      supportLink: "Aller au support",
      faqOr: " ou ",
      faqLink: "voir FAQ",
      supportSuffix: ".",
    };
  }

  if (lang === "th") {
    return {
      metaTitle: "ดาวน์โหลด MomentBook",
      metaDescription: "อัปโหลดรูปทริปแบบชุดเดียวและจัดตามวันเวลาอัตโนมัติบน iOS และ Android",
      title: "ดาวน์โหลด MomentBook",
      subtitle: "อัปโหลดครั้งเดียว จัดอัตโนมัติ และทบทวนทริป ใช้ได้บน iPhone และ Android",
      deviceAlt: "หน้าจอจัดรูป",
      availability: "ดาวน์โหลดได้จาก App Store และ Google Play",
      storeLabels: {
        iosLabel: "ดาวน์โหลดบน",
        iosName: "App Store",
        iosAriaLabel: "ดาวน์โหลดจาก App Store",
        androidLabel: "ดาวน์โหลดบน",
        androidName: "Google Play",
        androidAriaLabel: "ดาวน์โหลดจาก Google Play",
      },
      quickStartTitle: "เริ่มต้นอย่างรวดเร็ว",
      quickStartQuestion: "ฉันจะเริ่มใช้ MomentBook ได้อย่างไร?",
      quickStartAnswer: "ดาวน์โหลดแอป อัปโหลดรูปทริปแบบชุดเดียว แล้วดูไทม์ไลน์ที่จัดอัตโนมัติได้ทันที",
      quickStartSteps: [
        "ดาวน์โหลดจาก App Store หรือ Google Play",
        "อัปโหลดรูประหว่างทริปแบบชุดเดียว",
        "ทบทวนไทม์ไลน์ที่จัดตามวันและเวลา",
      ],
      featuresTitle: "โฟลว์จัดรูปอัตโนมัติ",
      features: [
        {
          title: "อัปโหลดแบบชุดเดียว",
          text: "อัปโหลดรูปหลายวันพร้อมกันในครั้งเดียว",
        },
        {
          title: "จัดตามวันและเวลาอัตโนมัติ",
          text: "รูปถูกเรียงในไทม์ไลน์โดยไม่ต้องจัดเองทั้งหมด",
        },
        {
          title: "ทบทวนและเผยแพร่แบบเลือกได้",
          text: "ย้อนดูทริปก่อน และเผยแพร่เมื่อคุณต้องการเท่านั้น",
        },
      ],
      requirementsTitle: "ความต้องการของระบบ",
      requirements: [
        {
          platform: "iOS",
          details: ["ต้องใช้ iOS 16.0 ขึ้นไป", "รองรับ iPhone และ iPad"],
        },
        {
          platform: "Android",
          details: ["ต้องใช้ Android 10.0 ขึ้นไป", "รองรับอุปกรณ์ Android ส่วนใหญ่"],
        },
      ],
      privacyText: "เป็นส่วนตัวโดยค่าเริ่มต้น การเผยแพร่จะสร้างหน้าสาธารณะที่มี URL เฉพาะ",
      supportPrefix: "ต้องการความช่วยเหลือ? ",
      supportLink: "ไปที่หน้าซัพพอร์ต",
      faqOr: " หรือ ",
      faqLink: "ดู FAQ",
      supportSuffix: "",
    };
  }

  if (lang === "vi") {
    return {
      metaTitle: "Tai MomentBook",
      metaDescription: "Tai anh du lich theo lo va tu dong sap xep theo ngay gio tren iOS va Android.",
      title: "Tai MomentBook",
      subtitle: "Tai len hang loat, tu dong sap xep va recap chuyen di. Co tren iPhone va Android.",
      deviceAlt: "Man hinh sap xep anh",
      availability: "Co tren App Store va Google Play.",
      storeLabels: {
        iosLabel: "Tai tren",
        iosName: "App Store",
        iosAriaLabel: "Tai tren App Store",
        androidLabel: "Co tren",
        androidName: "Google Play",
        androidAriaLabel: "Tai tren Google Play",
      },
      quickStartTitle: "Bat dau nhanh",
      quickStartQuestion: "Lam cach nao de bat dau voi MomentBook?",
      quickStartAnswer: "Tai ung dung, tai anh du lich mot lan va xem timeline da duoc sap xep tu dong.",
      quickStartSteps: [
        "Tai tu App Store hoac Google Play",
        "Tai len hang loat anh trong chuyen di",
        "Xem timeline da sap xep theo ngay gio",
      ],
      featuresTitle: "Luong tu dong sap xep",
      features: [
        {
          title: "Tai len hang loat",
          text: "Tai anh cua nhieu ngay trong mot lan.",
        },
        {
          title: "Tu dong sap xep theo ngay gio",
          text: "Anh vao timeline ma khong can sap xep thu cong day du.",
        },
        {
          title: "Recap va dang tuy chon",
          text: "Nhin lai chuyen di truoc, dang bai chi khi ban muon.",
        },
      ],
      requirementsTitle: "Yeu cau he thong",
      requirements: [
        {
          platform: "iOS",
          details: ["Yeu cau iOS 16.0 tro len", "Tuong thich voi iPhone va iPad"],
        },
        {
          platform: "Android",
          details: ["Yeu cau Android 10.0 tro len", "Tuong thich voi da so thiet bi Android"],
        },
      ],
      privacyText: "Rieng tu mac dinh. Dang bai tao trang cong khai voi URL rieng.",
      supportPrefix: "Can ho tro? ",
      supportLink: "Den trang ho tro",
      faqOr: " hoac ",
      faqLink: "xem FAQ",
      supportSuffix: ".",
    };
  }

  if (lang === "ko") {
    return {
      metaTitle: "MomentBook 다운로드",
      metaDescription: "여행 기간 사진을 한 번에 업로드하면 날짜와 시간으로 자동 정리해 회고하기 쉬운 타임라인을 만듭니다.",
      title: "MomentBook 다운로드",
      subtitle: "여행 사진 일괄 업로드부터 자동 정리, 여행 회고까지. iPhone과 Android에서 사용할 수 있습니다.",
      deviceAlt: "사진을 정리하는 화면",
      availability: "App Store와 Google Play에서 받을 수 있습니다.",
      storeLabels: {
        iosLabel: "App Store에서",
        iosName: "다운로드",
        iosAriaLabel: "App Store에서 다운로드",
        androidLabel: "Google Play에서",
        androidName: "다운로드",
        androidAriaLabel: "Google Play에서 다운로드",
      },
      quickStartTitle: "빠른 시작",
      quickStartQuestion: "MomentBook을 어떻게 시작하나요?",
      quickStartAnswer: "앱을 다운로드하고 여행 사진을 한 번에 올리면 날짜·시간 기준으로 자동 정리된 타임라인을 바로 확인할 수 있습니다.",
      quickStartSteps: [
        "App Store 또는 Google Play에서 다운로드",
        "여행 기간 사진을 한 번에 선택해 업로드",
        "자동 정리된 타임라인으로 여행 회고",
      ],
      featuresTitle: "사진 자동 정리 흐름",
      features: [
        {
          title: "여행 사진 일괄 업로드",
          text: "여러 날짜의 사진을 한 번에 올려 정리를 시작합니다.",
        },
        {
          title: "날짜·시간 자동 정리",
          text: "업로드한 사진을 시간 흐름대로 정리해 타임라인을 구성합니다.",
        },
        {
          title: "여행 회고와 선택적 게시",
          text: "정리된 여행을 돌아보고, 원할 때만 게시할 수 있습니다.",
        },
      ],
      requirementsTitle: "시스템 요구 사항",
      requirements: [
        {
          platform: "iOS",
          details: ["iOS 16.0 이상 필요", "iPhone 및 iPad 지원"],
        },
        {
          platform: "Android",
          details: ["Android 10.0 이상 필요", "대부분의 Android 기기 지원"],
        },
      ],
      privacyText: "기본은 비공개입니다. 게시하면 고유 URL의 공개 페이지가 생성됩니다.",
      supportPrefix: "도움이 필요하신가요? ",
      supportLink: "지원 페이지",
      faqOr: " 또는 ",
      faqLink: "FAQ",
      supportSuffix: "로 이동하세요.",
    };
  }

  if (lang === "ja") {
    return {
      metaTitle: "MomentBook をダウンロード",
      metaDescription: "iOS と Android で旅行写真を一括アップロードし、日時順に自動整理できます。",
      title: "MomentBook をダウンロード",
      subtitle: "一括アップロード、自動整理、旅の振り返り。iPhone と Android に対応。",
      deviceAlt: "写真を整理する画面",
      availability: "App Store と Google Play で入手できます。",
      storeLabels: {
        iosLabel: "App Storeで",
        iosName: "入手",
        iosAriaLabel: "App Storeで入手",
        androidLabel: "Google Playで",
        androidName: "入手",
        androidAriaLabel: "Google Playで入手",
      },
      quickStartTitle: "クイックスタート",
      quickStartQuestion: "MomentBook の使い方は?",
      quickStartAnswer: "アプリをダウンロードして旅行写真をまとめてアップロードすると、日時順に整理されたタイムラインをすぐ確認できます。",
      quickStartSteps: [
        "App Store または Google Play からダウンロード",
        "旅行写真を一括アップロード",
        "自動整理されたタイムラインで振り返る",
      ],
      featuresTitle: "写真自動整理フロー",
      features: [
        {
          title: "旅行写真の一括アップロード",
          text: "複数日の写真をまとめて整理開始できます。",
        },
        {
          title: "日時で自動整理",
          text: "写真が時系列でタイムラインに自動配置されます。",
        },
        {
          title: "旅の振り返りと任意公開",
          text: "まず振り返り、必要なときだけ公開できます。",
        },
      ],
      requirementsTitle: "システム要件",
      requirements: [
        {
          platform: "iOS",
          details: ["iOS 16.0 以上が必要", "iPhone と iPad に対応"],
        },
        {
          platform: "Android",
          details: ["Android 10.0 以上が必要", "ほとんどの Android 端末に対応"],
        },
      ],
      privacyText: "基本は非公開です。公開すると固有URLの公開ページが作成されます。",
      supportPrefix: "お困りの際は",
      supportLink: "サポート",
      faqOr: "または",
      faqLink: "FAQ",
      supportSuffix: "へ。",
    };
  }

  if (lang === "zh") {
    return {
      metaTitle: "下载 MomentBook",
      metaDescription: "在 iOS 与 Android 上可批量上传旅行照片，并按日期时间自动整理。",
      title: "下载 MomentBook",
      subtitle: "批量上传、自动整理、旅行回顾。支持 iPhone 与 Android。",
      deviceAlt: "整理照片的界面",
      availability: "可在 App Store 与 Google Play 安装。",
      storeLabels: {
        iosLabel: "在 App Store",
        iosName: "获取",
        iosAriaLabel: "在 App Store 获取",
        androidLabel: "在 Google Play",
        androidName: "获取",
        androidAriaLabel: "在 Google Play 获取",
      },
      quickStartTitle: "快速开始",
      quickStartQuestion: "如何开始使用 MomentBook?",
      quickStartAnswer: "下载应用后一次上传旅行照片，即可查看按日期和时间自动整理的时间线。",
      quickStartSteps: [
        "从 App Store 或 Google Play 下载",
        "批量上传旅行照片",
        "查看自动整理后的旅行时间线",
      ],
      featuresTitle: "照片自动整理流程",
      features: [
        {
          title: "旅行照片批量上传",
          text: "可一次上传多个日期的照片开始整理。",
        },
        {
          title: "按日期时间自动整理",
          text: "照片会自动进入按时间排序的时间线。",
        },
        {
          title: "旅行回顾与可选发布",
          text: "先回顾再决定是否发布，默认私密。",
        },
      ],
      requirementsTitle: "系统要求",
      requirements: [
        {
          platform: "iOS",
          details: ["需要 iOS 16.0 或以上", "支持 iPhone 与 iPad"],
        },
        {
          platform: "Android",
          details: ["需要 Android 10.0 或以上", "支持大多数 Android 设备"],
        },
      ],
      privacyText: "默认私密。发布后会生成唯一 URL 的页面。",
      supportPrefix: "需要帮助？",
      supportLink: "前往支持页",
      faqOr: "或",
      faqLink: "查看 FAQ",
      supportSuffix: "。",
    };
  }

  return {
    metaTitle: "Download MomentBook",
    metaDescription: "Batch upload travel photos and auto-organize them by date and time on iOS and Android.",
    title: "Download MomentBook",
    subtitle: "Batch upload, auto-organization, and trip recap. Available for iPhone and Android.",
    deviceAlt: "Organizing photos screen on MomentBook",
    availability: "Available on the App Store and Google Play.",
    storeLabels: {
      iosLabel: "Download on the",
      iosName: "App Store",
      iosAriaLabel: "Download on the App Store",
      androidLabel: "Get it on",
      androidName: "Google Play",
      androidAriaLabel: "Get it on Google Play",
    },
    quickStartTitle: "Quick start",
    quickStartQuestion: "How do I get started with MomentBook?",
    quickStartAnswer: "Download the app, upload travel photos in one batch, and review the auto-organized timeline right away.",
    quickStartSteps: [
      "Download from App Store or Google Play",
      "Batch upload photos from your trip",
      "Review the timeline sorted by date and time",
    ],
    featuresTitle: "Auto-organization flow",
    features: [
      {
        title: "Batch upload",
        text: "Upload photos from multiple dates in one go.",
      },
      {
        title: "Automatic date/time sorting",
        text: "Photos are arranged in timeline order without full manual sorting.",
      },
      {
        title: "Trip recap and optional publishing",
        text: "Revisit your trip first and publish only when you choose.",
      },
    ],
    requirementsTitle: "System requirements",
    requirements: [
      {
        platform: "iOS",
        details: ["Requires iOS 16.0 or later", "Compatible with iPhone and iPad"],
      },
      {
        platform: "Android",
        details: ["Requires Android 10.0 or later", "Compatible with most Android devices"],
      },
    ],
    privacyText: "Private by default. Publishing creates a public page with a unique URL.",
    supportPrefix: "Need help? ",
    supportLink: "Visit support",
    faqOr: " or ",
    faqLink: "check FAQ",
    supportSuffix: ".",
  };
}

const timelineExportNoteByLang: Record<Language, string> = {
  en: "After organizing timeline moments, you can export a ZIP (images + metadata) to keep it yourself or share directly with others. Publishing is not required.",
  ko: "타임라인으로 정리한 여정은 이미지+메타데이터 ZIP으로 내보내 개인 보관하거나 타인에게 직접 공유할 수 있습니다. 게시는 필수가 아닙니다.",
  ja: "タイムラインに整理した旅は、画像+メタデータZIPで書き出して個人保管または直接共有できます。公開は必須ではありません。",
  zh: "整理为时间线的旅程可导出为 ZIP（图片+元数据），用于个人保存或直接分享。无需发布。",
  es: "Tras organizar el timeline, puedes exportar un ZIP (imagenes + metadatos) para guardarlo o compartirlo directamente. Publicar no es obligatorio.",
  pt: "Apos organizar a timeline, voce pode exportar um ZIP (imagens + metadados) para guardar ou compartilhar diretamente. Publicar nao e obrigatorio.",
  fr: "Apres organisation en timeline, vous pouvez exporter un ZIP (images + metadonnees) pour conserver ou partager directement. Publier n'est pas obligatoire.",
  th: "เมื่อจัดเป็นไทม์ไลน์แล้ว คุณสามารถส่งออก ZIP (รูป+เมทาดาทา) เพื่อเก็บเองหรือแชร์โดยตรงได้ โดยไม่ต้องเผยแพร่",
  vi: "Sau khi sap xep thanh timeline, ban co the xuat ZIP (anh + metadata) de tu luu hoac chia se truc tiep. Khong bat buoc dang bai.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getDownloadContent(lang);
  const path = "/download";
  const url = buildOpenGraphUrl(lang, path);

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    robots: buildPublicRobots(),
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

export default async function DownloadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getDownloadContent(lang);
  const timelineExportNote = timelineExportNoteByLang[lang] ?? timelineExportNoteByLang.en;
  const storeLinks = getStoreLinks(lang);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const deviceImage = getLocalizedScreenshotPath(lang, "timeline");
  const screenshotUrls = getLocalizedScreenshotGallery(lang).map((item) =>
    new URL(item.src, siteUrl).toString(),
  );
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/download"), siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MomentBook",
    description: content.metaDescription,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    softwareRequirements: "iOS 16.0 or later, Android 10.0 or later",
    screenshot: screenshotUrls,
    url: pageUrl,
    offers: [
      {
        "@type": "Offer",
        url: storeLinks.ios,
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        url: storeLinks.android,
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
    ],
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <FadeIn>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>{content.title}</h1>
              <p className={styles.heroSubtitle}>{content.subtitle}</p>
              <div className={styles.storeButtons}>
                <a
                  href={storeLinks.ios}
                  className={styles.storeButton}
                  aria-label={content.storeLabels.iosAriaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.storeButtonContent}>
                    <span className={styles.storeButtonLabel}>{content.storeLabels.iosLabel}</span>
                    <span className={styles.storeButtonName}>{content.storeLabels.iosName}</span>
                  </div>
                </a>
                <a
                  href={storeLinks.android}
                  className={styles.storeButton}
                  aria-label={content.storeLabels.androidAriaLabel}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className={styles.storeButtonContent}>
                    <span className={styles.storeButtonLabel}>{content.storeLabels.androidLabel}</span>
                    <span className={styles.storeButtonName}>{content.storeLabels.androidName}</span>
                  </div>
                </a>
              </div>
              <p className={styles.availability}>{content.availability}</p>
              <p className={styles.supportNote}>
                {content.supportPrefix}
                <Link href={`/${lang}/support`} className={styles.supportLink}>
                  {content.supportLink}
                </Link>
                {content.faqOr}
                <Link href={`/${lang}/faq`} className={styles.supportLink}>
                  {content.faqLink}
                </Link>
                {content.supportSuffix}
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className={styles.heroVisual}>
              <DeviceMock
                className={styles.heroDevice}
                screenClassName={deviceStyles.screenMedia}
              >
                <Image
                  src={deviceImage}
                  alt={content.deviceAlt}
                  fill
                  sizes="(max-width: 768px) 230px, (max-width: 1024px) 270px, 310px"
                  className={deviceStyles.screenImage}
                />
              </DeviceMock>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className={styles.quickStartSection}>
        <div className={styles.quickStartInner}>
          <h2 className={styles.quickStartTitle}>{content.quickStartTitle}</h2>
          <div className={styles.quickStartCard}>
            <h3 className={styles.quickStartQuestion}>{content.quickStartQuestion}</h3>
            <p className={styles.quickStartAnswer}>{content.quickStartAnswer}</p>
            <ol className={styles.quickStartSteps}>
              {content.quickStartSteps.map((step, idx) => (
                <li key={`quickstart-${idx}`}>{step}</li>
              ))}
            </ol>
            <p className={styles.quickStartNote}>{timelineExportNote}</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.featuresTitle}</h2>
          </header>
          <div className={styles.featureGrid}>
            {content.features.map((feature, index) => (
              <div key={`${feature.title}-${index}`} className={styles.featureCard}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureText}>{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionInner}>
          <header className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{content.requirementsTitle}</h2>
          </header>
          <div className={styles.requirementsGrid}>
            {content.requirements.map((requirement, index) => (
              <div key={`${requirement.platform}-${index}`} className={styles.requirementCard}>
                <h3 className={styles.requirementTitle}>{requirement.platform}</h3>
                <p className={styles.requirementDetails}>
                  {requirement.details.map((detail, detailIndex) => (
                    <span key={`${requirement.platform}-${detailIndex}`}>
                      {detail}
                      {detailIndex < requirement.details.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.privacyBand}>
        <p className={styles.privacyText}>{content.privacyText}</p>
      </section>
    </div>
  );
}
