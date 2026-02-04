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
      metaDescription: "Usa MomentBook en iOS y Android.",
      title: "Descargar MomentBook",
      subtitle: "Un lugar tranquilo para guardar dias que quieres recordar. Disponible para iPhone y Android.",
      deviceImage: "/device-mocks/home-en.png",
      deviceAlt: "Pantalla principal de MomentBook en espanol",
      availability: "Disponible en App Store y Google Play.",
      storeLabels: {
        iosLabel: "Descargar en",
        iosName: "App Store",
        iosAriaLabel: "Descargar en App Store",
        androidLabel: "Disponible en",
        androidName: "Google Play",
        androidAriaLabel: "Descargar en Google Play",
      },
      featuresTitle: "Que ofrece",
      features: [
        {
          title: "Archivo por viajes",
          text: "Los momentos se agrupan en viajes con inicio y fin.",
        },
        {
          title: "Privado por defecto",
          text: "Nada es publico hasta que publiques.",
        },
        {
          title: "Compartir por enlace",
          text: "Publicar crea una pagina web unica para compartir.",
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
      privacyText: "Los viajes son privados por defecto. Publicar crea una pagina publica con URL unica.",
      supportPrefix: "Necesitas ayuda? ",
      supportLink: "Ir a soporte",
      supportSuffix: ".",
    };
  }

  if (lang === "pt") {
    return {
      metaTitle: "Baixar MomentBook",
      metaDescription: "Use o MomentBook no iOS e Android.",
      title: "Baixar MomentBook",
      subtitle: "Um espaco tranquilo para guardar os dias que voce quer lembrar. Disponivel para iPhone e Android.",
      deviceImage: "/device-mocks/home-en.png",
      deviceAlt: "Tela inicial do MomentBook em portugues",
      availability: "Disponivel na App Store e no Google Play.",
      storeLabels: {
        iosLabel: "Baixar na",
        iosName: "App Store",
        iosAriaLabel: "Baixar na App Store",
        androidLabel: "Disponivel no",
        androidName: "Google Play",
        androidAriaLabel: "Baixar no Google Play",
      },
      featuresTitle: "O que faz",
      features: [
        {
          title: "Arquivo por jornadas",
          text: "Os momentos se agrupam em jornadas com comeco e fim.",
        },
        {
          title: "Privado por padrao",
          text: "Nada fica publico ate voce publicar.",
        },
        {
          title: "Compartilhar por link",
          text: "Publicar cria uma pagina web unica para compartilhar.",
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
      privacyText: "As jornadas sao privadas por padrao. Publicar cria uma pagina publica com URL unica.",
      supportPrefix: "Precisa de ajuda? ",
      supportLink: "Ir para suporte",
      supportSuffix: ".",
    };
  }

  if (lang === "fr") {
    return {
      metaTitle: "Telecharger MomentBook",
      metaDescription: "Utilisez MomentBook sur iOS et Android.",
      title: "Telecharger MomentBook",
      subtitle: "Un espace calme pour garder les jours dont vous voulez vous souvenir. Disponible sur iPhone et Android.",
      deviceImage: "/device-mocks/home-en.png",
      deviceAlt: "Ecran d'accueil MomentBook en francais",
      availability: "Disponible sur App Store et Google Play.",
      storeLabels: {
        iosLabel: "Telecharger sur",
        iosName: "App Store",
        iosAriaLabel: "Telecharger sur App Store",
        androidLabel: "Disponible sur",
        androidName: "Google Play",
        androidAriaLabel: "Telecharger sur Google Play",
      },
      featuresTitle: "Ce que fait l'app",
      features: [
        {
          title: "Archive par voyage",
          text: "Les moments se regroupent en voyages avec un debut et une fin.",
        },
        {
          title: "Prive par defaut",
          text: "Rien n'est public tant que vous ne publiez pas.",
        },
        {
          title: "Partage par lien",
          text: "Publier cree une page web unique a partager.",
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
      privacyText: "Les voyages sont prives par defaut. Publier cree une page publique avec une URL unique.",
      supportPrefix: "Besoin d'aide ? ",
      supportLink: "Aller au support",
      supportSuffix: ".",
    };
  }

  if (lang === "th") {
    return {
      metaTitle: "ดาวน์โหลด MomentBook",
      metaDescription: "ใช้ MomentBook ได้บน iOS และ Android",
      title: "ดาวน์โหลด MomentBook",
      subtitle: "พื้นที่เงียบๆ สำหรับเก็บวันที่คุณอยากจดจำ ใช้ได้บน iPhone และ Android",
      deviceImage: "/device-mocks/home-en.png",
      deviceAlt: "หน้าหลัก MomentBook ภาษาไทย",
      availability: "ดาวน์โหลดได้จาก App Store และ Google Play",
      storeLabels: {
        iosLabel: "ดาวน์โหลดบน",
        iosName: "App Store",
        iosAriaLabel: "ดาวน์โหลดจาก App Store",
        androidLabel: "ดาวน์โหลดบน",
        androidName: "Google Play",
        androidAriaLabel: "ดาวน์โหลดจาก Google Play",
      },
      featuresTitle: "สิ่งที่แอปทำได้",
      features: [
        {
          title: "เก็บเป็นทริป",
          text: "ช่วงเวลาจะถูกรวมเป็นทริปที่มีจุดเริ่มและจุดจบ",
        },
        {
          title: "เป็นส่วนตัวโดยค่าเริ่มต้น",
          text: "จะไม่เปิดเผยจนกว่าคุณจะกดเผยแพร่",
        },
        {
          title: "แชร์ด้วยลิงก์",
          text: "เมื่อเผยแพร่ จะสร้างหน้าเว็บเฉพาะสำหรับแชร์",
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
      privacyText: "ทริปเป็นส่วนตัวโดยค่าเริ่มต้น การเผยแพร่จะสร้างหน้าสาธารณะที่มี URL เฉพาะ",
      supportPrefix: "ต้องการความช่วยเหลือ? ",
      supportLink: "ไปที่หน้าซัพพอร์ต",
      supportSuffix: "",
    };
  }

  if (lang === "vi") {
    return {
      metaTitle: "Tai MomentBook",
      metaDescription: "Su dung MomentBook tren iOS va Android.",
      title: "Tai MomentBook",
      subtitle: "Khong gian nhe nhang de luu lai nhung ngay ban muon ghi nho. Ho tro iPhone va Android.",
      deviceImage: "/device-mocks/home-en.png",
      deviceAlt: "Man hinh chinh MomentBook tieng Viet",
      availability: "Co tren App Store va Google Play.",
      storeLabels: {
        iosLabel: "Tai tren",
        iosName: "App Store",
        iosAriaLabel: "Tai tren App Store",
        androidLabel: "Co tren",
        androidName: "Google Play",
        androidAriaLabel: "Tai tren Google Play",
      },
      featuresTitle: "Nhung gi ung dung lam duoc",
      features: [
        {
          title: "Luu theo hanh trinh",
          text: "Khoanh khac duoc nhom thanh hanh trinh co diem bat dau va ket thuc.",
        },
        {
          title: "Rieng tu mac dinh",
          text: "Khong co gi cong khai neu ban chua dang.",
        },
        {
          title: "Chia se bang lien ket",
          text: "Dang se tao mot trang web rieng de ban chia se.",
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
      privacyText: "Hanh trinh la rieng tu theo mac dinh. Dang bai se tao trang cong khai voi URL rieng.",
      supportPrefix: "Can ho tro? ",
      supportLink: "Den trang ho tro",
      supportSuffix: ".",
    };
  }

  if (lang === "ko") {
    return {
      metaTitle: "MomentBook 다운로드",
      metaDescription: "iOS와 Android에서 MomentBook을 사용할 수 있습니다.",
      title: "MomentBook 다운로드",
      subtitle: "기억하고 싶은 하루를 조용히 남기는 공간. iPhone과 Android에서 사용할 수 있습니다.",
      deviceImage: "/device-mocks/home-ko.png",
      deviceAlt: "한국어 MomentBook 홈 화면",
      availability: "App Store와 Google Play에서 받을 수 있습니다.",
      storeLabels: {
        iosLabel: "App Store에서",
        iosName: "다운로드",
        iosAriaLabel: "App Store에서 다운로드",
        androidLabel: "Google Play에서",
        androidName: "다운로드",
        androidAriaLabel: "Google Play에서 다운로드",
      },
      featuresTitle: "MomentBook에서 하는 일",
      features: [
        {
          title: "여정으로 묶기",
          text: "순간을 시작과 끝이 있는 여정으로 정리합니다.",
        },
        {
          title: "기본은 비공개",
          text: "원할 때 게시하기 전까지는 공개되지 않습니다.",
        },
        {
          title: "링크로 공유",
          text: "게시하면 고유 URL 페이지가 생성되어 링크로 공유할 수 있습니다.",
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
      privacyText: "기본은 비공개입니다. 게시하면 고유 URL 페이지가 생성됩니다.",
      supportPrefix: "도움이 필요하신가요? ",
      supportLink: "지원 페이지",
      supportSuffix: "로 이동하세요.",
    };
  }

  if (lang === "ja") {
    return {
      metaTitle: "MomentBook をダウンロード",
      metaDescription: "iOS と Android で MomentBook を利用できます。",
      title: "MomentBook をダウンロード",
      subtitle: "覚えておきたい一日を静かに残す場所。iPhone と Android に対応。",
      deviceImage: "/device-mocks/home-ja.png",
      deviceAlt: "日本語の MomentBook ホーム画面",
      availability: "App Store と Google Play で入手できます。",
      storeLabels: {
        iosLabel: "App Storeで",
        iosName: "入手",
        iosAriaLabel: "App Storeで入手",
        androidLabel: "Google Playで",
        androidName: "入手",
        androidAriaLabel: "Google Playで入手",
      },
      featuresTitle: "MomentBook でできること",
      features: [
        {
          title: "旅としてまとめる",
          text: "瞬間を始まりと終わりのある旅として整えます。",
        },
        {
          title: "デフォルトは非公開",
          text: "公開は投稿するまで行われません。",
        },
        {
          title: "リンクで共有",
          text: "投稿すると固有URLページが作成され、リンクで共有できます。",
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
      privacyText: "基本は非公開です。投稿すると固有URLページが作成されます。",
      supportPrefix: "お困りの際は",
      supportLink: "サポート",
      supportSuffix: "へ。",
    };
  }

  if (lang === "zh") {
    return {
      metaTitle: "下载 MomentBook",
      metaDescription: "在 iOS 与 Android 使用 MomentBook。",
      title: "下载 MomentBook",
      subtitle: "为想记住的日子提供安静的记录空间。支持 iPhone 与 Android。",
      deviceImage: "/device-mocks/home-zh.png",
      deviceAlt: "MomentBook 中文主屏幕",
      availability: "可在 App Store 与 Google Play 安装。",
      storeLabels: {
        iosLabel: "在 App Store",
        iosName: "获取",
        iosAriaLabel: "在 App Store 获取",
        androidLabel: "在 Google Play",
        androidName: "获取",
        androidAriaLabel: "在 Google Play 获取",
      },
      featuresTitle: "MomentBook 能做什么",
      features: [
        {
          title: "整理成旅程",
          text: "把瞬间整理成有始有终的旅程。",
        },
        {
          title: "默认私密",
          text: "在你发布之前不会公开。",
        },
        {
          title: "通过链接分享",
          text: "发布后会生成唯一 URL 的页面，可通过链接分享。",
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
      privacyText: "默认是私密的。发布后会生成唯一 URL 的页面。",
      supportPrefix: "需要帮助？",
      supportLink: "前往支持页",
      supportSuffix: "。",
    };
  }

  return {
    metaTitle: "Download MomentBook",
    metaDescription: "Get MomentBook on iOS and Android.",
    title: "Download MomentBook",
    subtitle: "A quiet archive for the days you want to remember. Available for iPhone and Android.",
    deviceImage: "/device-mocks/home-en.png",
    deviceAlt: "MomentBook home screen in English",
    availability: "Available on the App Store and Google Play.",
    storeLabels: {
      iosLabel: "Download on the",
      iosName: "App Store",
      iosAriaLabel: "Download on the App Store",
      androidLabel: "Get it on",
      androidName: "Google Play",
      androidAriaLabel: "Get it on Google Play",
    },
    featuresTitle: "What it does",
    features: [
      {
        title: "Journey-based archive",
        text: "Moments group into journeys with a beginning and an end.",
      },
      {
        title: "Private by default",
        text: "Nothing is public unless you publish.",
      },
      {
        title: "Share by link",
        text: "Publishing creates a single web page you can send.",
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
    privacyText: "Journeys are private by default. Publishing creates a public page with a unique URL.",
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
