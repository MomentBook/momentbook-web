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
  featuresTitle: string;
  features: DownloadFeature[];
  requirementsTitle: string;
  requirements: DownloadRequirement[];
  privacyText: string;
  supportPrefix: string;
  supportLink: string;
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
      metaDescription: "Organiza fotos en un viaje tranquilo en iOS y Android.",
      title: "Descargar MomentBook",
      subtitle: "Un lugar tranquilo para organizar fotos como viajes. Disponible para iPhone y Android.",
      deviceImage: "/screenshots/organize-photos.png",
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
      featuresTitle: "Funciones centradas en fotos",
      features: [
        {
          title: "Organizacion por fotos",
          text: "Empieza eligiendo fotos y agrupandolas en momentos.",
        },
        {
          title: "Contexto de viaje opcional",
          text: "Al iniciar un viaje se agregan tiempo y lugares (con ubicacion).",
        },
        {
          title: "Compartir en calma",
          text: "Publica solo cuando quieras y despublica cuando lo necesites.",
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
      supportSuffix: ".",
    };
  }

  if (lang === "pt") {
    return {
      metaTitle: "Baixar MomentBook",
      metaDescription: "Organize fotos em uma jornada tranquila no iOS e Android.",
      title: "Baixar MomentBook",
      subtitle: "Um lugar tranquilo para organizar fotos como jornadas. Disponivel para iPhone e Android.",
      deviceImage: "/screenshots/organize-photos.png",
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
      featuresTitle: "Recursos com fotos primeiro",
      features: [
        {
          title: "Organizacao por fotos",
          text: "Comece escolhendo fotos e agrupando em momentos.",
        },
        {
          title: "Contexto de jornada opcional",
          text: "Ao iniciar uma jornada, tempo e locais se adicionam (com localizacao).",
        },
        {
          title: "Compartilhar em calma",
          text: "Publique quando quiser e despublique quando precisar.",
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
      supportSuffix: ".",
    };
  }

  if (lang === "fr") {
    return {
      metaTitle: "Telecharger MomentBook",
      metaDescription: "Organisez des photos en voyage calme sur iOS et Android.",
      title: "Telecharger MomentBook",
      subtitle: "Un lieu calme pour organiser des photos en voyages. Disponible sur iPhone et Android.",
      deviceImage: "/screenshots/organize-photos.png",
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
      featuresTitle: "Fonctions photo d'abord",
      features: [
        {
          title: "Organisation par photos",
          text: "Commencez en choisissant des photos et en les groupant en moments.",
        },
        {
          title: "Contexte de voyage optionnel",
          text: "En demarrant un voyage, temps et lieux s'ajoutent (avec localisation).",
        },
        {
          title: "Partage calme",
          text: "Publiez quand vous voulez et depubliez quand besoin.",
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
      supportSuffix: ".",
    };
  }

  if (lang === "th") {
    return {
      metaTitle: "ดาวน์โหลด MomentBook",
      metaDescription: "จัดรูปเป็นทริปอย่างสงบบน iOS และ Android",
      title: "ดาวน์โหลด MomentBook",
      subtitle: "พื้นที่สงบสำหรับจัดรูปให้เป็นทริป ใช้ได้บน iPhone และ Android",
      deviceImage: "/screenshots/organize-photos.png",
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
      featuresTitle: "ฟีเจอร์แบบรูปก่อน",
      features: [
        {
          title: "จัดด้วยรูปก่อน",
          text: "เริ่มจากเลือกรูปและจัดเป็นช่วงเวลา",
        },
        {
          title: "บริบททริปแบบเลือกได้",
          text: "เริ่มทริปเพื่อเพิ่มเวลาและสถานที่ (เมื่ออนุญาตตำแหน่ง)",
        },
        {
          title: "แชร์อย่างสงบ",
          text: "เผยแพร่เมื่อคุณเลือก และยกเลิกได้เสมอ",
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
      supportSuffix: "",
    };
  }

  if (lang === "vi") {
    return {
      metaTitle: "Tai MomentBook",
      metaDescription: "Sap xep anh thanh hanh trinh yen tinh tren iOS va Android.",
      title: "Tai MomentBook",
      subtitle: "Noi nhe nhang de sap xep anh thanh hanh trinh. Co tren iPhone va Android.",
      deviceImage: "/screenshots/organize-photos.png",
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
      featuresTitle: "Tinh nang uu tien anh",
      features: [
        {
          title: "To chuc tu anh",
          text: "Bat dau bang viec chon anh va nhom thanh khoanh khac.",
        },
        {
          title: "Boi canh hanh trinh tuy chon",
          text: "Bat dau hanh trinh de them thoi gian va dia diem (neu cho phep vi tri).",
        },
        {
          title: "Chia se nhe nhang",
          text: "Dang khi ban chon va co the huy dang bat cu luc nao.",
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
      supportSuffix: ".",
    };
  }

  if (lang === "ko") {
    return {
      metaTitle: "MomentBook 다운로드",
      metaDescription: "iOS와 Android에서 사진을 여정으로 정리하세요.",
      title: "MomentBook 다운로드",
      subtitle: "사진을 여정으로 정리하는 조용한 공간. iPhone과 Android에서 사용할 수 있습니다.",
      deviceImage: "/screenshots/organize-photos.png",
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
      featuresTitle: "사진 중심 기능",
      features: [
        {
          title: "사진 중심 정리",
          text: "사진을 고르고 순간으로 묶어 정리합니다.",
        },
        {
          title: "선택적 여정 맥락",
          text: "여정을 시작하면 시간과 장소가 더해집니다(위치 허용 시).",
        },
        {
          title: "조용한 공유",
          text: "원할 때만 게시하고 언제든 되돌릴 수 있습니다.",
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
      supportSuffix: "로 이동하세요.",
    };
  }

  if (lang === "ja") {
    return {
      metaTitle: "MomentBook をダウンロード",
      metaDescription: "iOS と Android で写真を旅として整理できます。",
      title: "MomentBook をダウンロード",
      subtitle: "写真を旅として整理する静かな場所。iPhone と Android に対応。",
      deviceImage: "/screenshots/organize-photos.png",
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
      featuresTitle: "写真中心の機能",
      features: [
        {
          title: "写真から整理",
          text: "写真を選び、瞬間としてまとめます。",
        },
        {
          title: "任意の旅コンテキスト",
          text: "旅を開始すると時間と場所が加わります（位置情報許可時）。",
        },
        {
          title: "静かな共有",
          text: "必要なときだけ公開し、いつでも戻せます。",
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
      supportSuffix: "へ。",
    };
  }

  if (lang === "zh") {
    return {
      metaTitle: "下载 MomentBook",
      metaDescription: "在 iOS 与 Android 上把照片整理成旅程。",
      title: "下载 MomentBook",
      subtitle: "把照片整理成旅程的安静空间。支持 iPhone 与 Android。",
      deviceImage: "/screenshots/organize-photos.png",
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
      featuresTitle: "照片优先功能",
      features: [
        {
          title: "照片优先整理",
          text: "先选照片，再整理成片段。",
        },
        {
          title: "可选旅程脉络",
          text: "开启旅程后加入时间与地点（需允许定位）。",
        },
        {
          title: "安静分享",
          text: "只在你选择时发布，可随时取消。",
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
      supportSuffix: "。",
    };
  }

  return {
    metaTitle: "Download MomentBook",
    metaDescription: "Organize photos into a calm journey on iOS and Android.",
    title: "Download MomentBook",
    subtitle: "A quiet place to organize photos into journeys. Available for iPhone and Android.",
    deviceImage: "/screenshots/organize-photos.png",
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
    featuresTitle: "Photo-first features",
    features: [
      {
        title: "Photo-first organization",
        text: "Start by selecting photos and grouping them into moments.",
      },
      {
        title: "Optional journey context",
        text: "Begin a journey to add time and places (with location permission).",
      },
      {
        title: "Quiet sharing",
        text: "Publish only when you choose, and unpublish anytime.",
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
    url: pageUrl,
    offers: [
      {
        "@type": "Offer",
        url: storeLinks.ios,
        availability: "https://schema.org/InStock",
      },
      {
        "@type": "Offer",
        url: storeLinks.android,
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
