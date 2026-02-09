import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./download.module.scss";
import { getStoreRegion, type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";

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
  deviceImage: string;
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
      metaDescription: "Registra con tracking o ordena solo con fotos en iOS y Android.",
      title: "Descargar MomentBook",
      subtitle: "Dos formas tranquilas de empezar. Disponible para iPhone y Android.",
      deviceImage: "/screenshots/journey-timeline.png",
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
      quickStartAnswer: "Descarga la app, elige tu inicio (tracking o fotos) y comienza tu primer viaje.",
      quickStartSteps: [
        "Descarga desde App Store o Google Play",
        "Elige inicio con tracking o solo fotos",
        "Crea tu primer viaje y agrega momentos",
      ],
      featuresTitle: "Pensado para dos inicios",
      features: [
        {
          title: "Tracking o fotos",
          text: "Registra mientras te mueves o empieza seleccionando fotos.",
        },
        {
          title: "Terminar y revisar",
          text: "Cierra el viaje y revisa los momentos organizados.",
        },
        {
          title: "Publicacion opcional",
          text: "Publica solo cuando quieras; lo privado es el punto de partida.",
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
      metaDescription: "Registre com tracking ou organize so com fotos no iOS e Android.",
      title: "Baixar MomentBook",
      subtitle: "Duas formas tranquilas de comecar. Disponivel para iPhone e Android.",
      deviceImage: "/screenshots/journey-timeline.png",
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
      quickStartAnswer: "Baixe o app, escolha seu inicio (tracking ou fotos) e comece sua primeira jornada.",
      quickStartSteps: [
        "Baixe da App Store ou do Google Play",
        "Escolha inicio com tracking ou so com fotos",
        "Crie sua primeira jornada e adicione momentos",
      ],
      featuresTitle: "Feito para dois inicios",
      features: [
        {
          title: "Tracking ou fotos",
          text: "Registre enquanto se move ou comece escolhendo fotos.",
        },
        {
          title: "Finalizar e revisar",
          text: "Finalize a jornada e veja os momentos organizados.",
        },
        {
          title: "Publicacao opcional",
          text: "Publique so quando quiser; o padrao e o privado.",
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
      metaDescription: "Enregistrez avec tracking ou organisez seulement avec des photos sur iOS et Android.",
      title: "Telecharger MomentBook",
      subtitle: "Deux facons calmes de commencer. Disponible sur iPhone et Android.",
      deviceImage: "/screenshots/journey-timeline.png",
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
      quickStartAnswer: "Telechargez l'app, choisissez votre debut (tracking ou photos) et commencez votre premier voyage.",
      quickStartSteps: [
        "Telechargez depuis l'App Store ou Google Play",
        "Choisissez debut avec tracking ou seulement avec photos",
        "Creez votre premier voyage et ajoutez des moments",
      ],
      featuresTitle: "Pense pour deux debuts",
      features: [
        {
          title: "Tracking ou photos",
          text: "Enregistrez en mouvement ou commencez en choisissant des photos.",
        },
        {
          title: "Terminer et revoir",
          text: "Terminez le voyage et revoyez les moments organises.",
        },
        {
          title: "Publication optionnelle",
          text: "Publiez seulement si vous le souhaitez; le prive reste la base.",
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
      metaDescription: "บันทึกด้วยการติดตามหรือจัดด้วยรูปเท่านั้นบน iOS และ Android",
      title: "ดาวน์โหลด MomentBook",
      subtitle: "สองวิธีเริ่มต้นอย่างสงบ ใช้ได้บน iPhone และ Android",
      deviceImage: "/screenshots/journey-timeline.png",
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
      quickStartAnswer: "ดาวน์โหลดแอป เลือกวิธีเริ่มต้นของคุณ (ติดตามหรือรูป) และเริ่มการเดินทางครั้งแรก",
      quickStartSteps: [
        "ดาวน์โหลดจาก App Store หรือ Google Play",
        "เลือกเริ่มต้นด้วยการติดตามหรือรูปเท่านั้น",
        "สร้างการเดินทางครั้งแรกและเพิ่มช่วงเวลา",
      ],
      featuresTitle: "ออกแบบมาสำหรับสองวิธีเริ่มต้น",
      features: [
        {
          title: "ติดตามหรือรูป",
          text: "บันทึกขณะเคลื่อนไหว หรือเริ่มจากการเลือกรูป",
        },
        {
          title: "จบและทบทวน",
          text: "จบทริปและดูช่วงเวลาที่จัดเรียงแล้ว",
        },
        {
          title: "เผยแพร่แบบเลือกได้",
          text: "เผยแพร่เมื่อคุณเลือก โดยพื้นฐานเป็นส่วนตัว",
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
      metaDescription: "Ghi lai bang tracking hoac sap xep chi voi anh tren iOS va Android.",
      title: "Tai MomentBook",
      subtitle: "Hai cach bat dau nhe nhang. Co tren iPhone va Android.",
      deviceImage: "/screenshots/journey-timeline.png",
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
      quickStartAnswer: "Tai ung dung, chon cach bat dau (tracking hoac anh) va bat dau hanh trinh dau tien.",
      quickStartSteps: [
        "Tai tu App Store hoac Google Play",
        "Chon bat dau voi tracking hoac chi voi anh",
        "Tao hanh trinh dau tien va them khoanh khac",
      ],
      featuresTitle: "Danh cho hai cach bat dau",
      features: [
        {
          title: "Tracking hoac anh",
          text: "Ghi lai khi di chuyen, hoac bat dau bang viec chon anh.",
        },
        {
          title: "Ket thuc va xem lai",
          text: "Ket thuc hanh trinh va xem cac khoanh khac da sap xep.",
        },
        {
          title: "Dang tuy chon",
          text: "Chi dang khi ban muon; mac dinh la rieng tu.",
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
      metaDescription: "iOS와 Android에서 트래킹으로 기록하거나 사진만으로 정리하세요.",
      title: "MomentBook 다운로드",
      subtitle: "두 가지 시작으로 여정을 남기는 조용한 공간. iPhone과 Android에서 사용할 수 있습니다.",
      deviceImage: "/screenshots/journey-timeline.png",
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
      quickStartAnswer: "앱을 다운로드하고 시작 방식(트래킹 또는 사진)을 선택한 후 첫 여정을 만드세요.",
      quickStartSteps: [
        "App Store 또는 Google Play에서 다운로드",
        "트래킹 기반 또는 사진만으로 시작 선택",
        "첫 여정을 만들고 순간 추가",
      ],
      featuresTitle: "두 가지 시작을 위한 기능",
      features: [
        {
          title: "트래킹 또는 사진",
          text: "이동을 기록하거나 사진을 고르는 것으로 시작합니다.",
        },
        {
          title: "마무리와 확인",
          text: "여정을 마무리하고 정리된 순간을 확인합니다.",
        },
        {
          title: "선택적 게시",
          text: "원할 때만 게시하고 기본은 비공개입니다.",
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
      metaDescription: "iOS と Android でトラッキング記録または写真だけで整理できます。",
      title: "MomentBook をダウンロード",
      subtitle: "二つの始め方で旅を残す静かな場所。iPhone と Android に対応。",
      deviceImage: "/screenshots/journey-timeline.png",
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
      quickStartAnswer: "アプリをダウンロードし、始め方(トラッキングまたは写真)を選んで最初の旅を作成します。",
      quickStartSteps: [
        "App Store または Google Play からダウンロード",
        "トラッキングベースまたは写真のみの開始を選択",
        "最初の旅を作成し、瞬間を追加",
      ],
      featuresTitle: "二つの始め方のための機能",
      features: [
        {
          title: "トラッキングでも写真でも",
          text: "移動を記録するか、写真を選んで始めます。",
        },
        {
          title: "終えて見返す",
          text: "旅を終えて、整理された瞬間を確認します。",
        },
        {
          title: "任意の公開",
          text: "必要なときだけ公開し、基本は非公開です。",
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
      metaDescription: "在 iOS 与 Android 上可用追踪记录或只用照片整理。",
      title: "下载 MomentBook",
      subtitle: "两种开始方式的安静空间。支持 iPhone 与 Android。",
      deviceImage: "/screenshots/journey-timeline.png",
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
      quickStartAnswer: "下载应用，选择开始方式(追踪或照片)并创建第一次行程。",
      quickStartSteps: [
        "从 App Store 或 Google Play 下载",
        "选择追踪式或仅照片开始",
        "创建第一次行程并添加瞬间",
      ],
      featuresTitle: "支持两种开始方式",
      features: [
        {
          title: "追踪或照片",
          text: "可以记录移动，也可以从选择照片开始。",
        },
        {
          title: "结束并查看",
          text: "结束行程，查看整理后的瞬间。",
        },
        {
          title: "可选发布",
          text: "仅在需要时发布，默认私密。",
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
    metaDescription: "Track a journey or organize with photos only on iOS and Android.",
    title: "Download MomentBook",
    subtitle: "Two calm ways to begin. Available for iPhone and Android.",
    deviceImage: "/screenshots/journey-timeline.png",
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
    quickStartAnswer: "Download the app, choose your starting path (tracking or photos), and begin your first journey.",
    quickStartSteps: [
      "Download from App Store or Google Play",
      "Choose tracking-based or photo-only start",
      "Create your first journey and add moments",
    ],
    featuresTitle: "Built for two ways to begin",
    features: [
      {
        title: "Tracking or photos",
        text: "Track as you move, or start by selecting photos.",
      },
      {
        title: "Finish and review",
        text: "End a journey and review the organized moments.",
      },
      {
        title: "Optional publishing",
        text: "Publish only when you choose, and keep it private by default.",
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
  const storeLinks = getStoreLinks(lang);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/download"), siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MomentBook",
    description: content.metaDescription,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    softwareRequirements: "iOS 16.0 or later, Android 10.0 or later",
    screenshot: [
      `${siteUrl}/screenshots/journey-timeline.png`,
      `${siteUrl}/screenshots/journey-map.png`,
      `${siteUrl}/screenshots/moment-detail.png`,
    ],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
                  rel="noreferrer"
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
                  rel="noreferrer"
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
                  src={content.deviceImage}
                  alt={content.deviceAlt}
                  fill
                  sizes="(max-width: 768px) 300px, (max-width: 1024px) 360px, 440px"
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
