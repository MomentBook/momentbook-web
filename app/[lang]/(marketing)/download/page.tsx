import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import deviceStyles from "@/components/DeviceMock.module.scss";
import styles from "./download.module.scss";
import { type Language } from "@/lib/i18n/config";
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
  const regionMap: Record<Language, { ios: string; hl: string; gl: string }> = {
    en: { ios: "us", hl: "en", gl: "US" },
    ko: { ios: "kr", hl: "ko", gl: "KR" },
    ja: { ios: "jp", hl: "ja", gl: "JP" },
    zh: { ios: "cn", hl: "zh", gl: "CN" },
  };

  const region = regionMap[lang] ?? regionMap.en;

  return {
    ios: `https://apps.apple.com/${region.ios}/${iosPath}`,
    android: `https://play.google.com/store/apps/details?id=com.reflectalab.momentbook&hl=${region.hl}&gl=${region.gl}`,
  };
}

function getDownloadContent(lang: Language): DownloadContent {
  if (lang === "ko") {
    return {
      metaTitle: "MomentBook 다운로드",
      metaDescription: "iOS와 Android에서 MomentBook을 다운로드하세요.",
      title: "MomentBook 다운로드",
      subtitle: "기억하고 싶은 하루를 실용적으로 담는 공간. iPhone과 Android에서 사용 가능합니다.",
      deviceImage: "/device-mocks/home-ko.png",
      deviceAlt: "한국어 MomentBook 홈 화면",
      availability: "스토어에서 바로 설치하세요.",
      storeLabels: {
        iosLabel: "App Store에서",
        iosName: "다운로드",
        iosAriaLabel: "App Store에서 다운로드",
        androidLabel: "Google Play에서",
        androidName: "다운로드",
        androidAriaLabel: "Google Play에서 다운로드",
      },
      featuresTitle: "MomentBook이 선택받는 이유",
      features: [
        {
          title: "몇 초면 기록",
          text: "사진 한 장이나 짧은 메모만 남기면 됩니다.",
        },
        {
          title: "하루가 정리됩니다",
          text: "시간과 장소가 순간을 모아 흐름을 보여줍니다.",
        },
        {
          title: "기본은 비공개",
          text: "기본은 비공개이며, 게시하면 웹에 공개됩니다.",
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
      privacyText: "기본은 기기 저장이며, 게시하면 웹에 공개됩니다. 동기화는 선택입니다.",
      supportPrefix: "도움이 필요하신가요? ",
      supportLink: "지원 페이지",
      supportSuffix: "로 이동하세요.",
    };
  }

  if (lang === "ja") {
    return {
      metaTitle: "MomentBook をダウンロード",
      metaDescription: "iOS と Android で MomentBook をダウンロードできます。",
      title: "MomentBook をダウンロード",
      subtitle: "覚えておきたい一日を手軽に残す場所。iPhone と Android に対応。",
      deviceImage: "/device-mocks/home-ja.png",
      deviceAlt: "日本語の MomentBook ホーム画面",
      availability: "ストアからインストールできます。",
      storeLabels: {
        iosLabel: "App Storeで",
        iosName: "入手",
        iosAriaLabel: "App Storeで入手",
        androidLabel: "Google Playで",
        androidName: "入手",
        androidAriaLabel: "Google Playで入手",
      },
      featuresTitle: "MomentBook が選ばれる理由",
      features: [
        {
          title: "数秒で記録",
          text: "写真や短いメモを残すだけです。",
        },
        {
          title: "一日がまとまる",
          text: "時間と場所で瞬間が集まり、流れが見えてきます。",
        },
        {
          title: "デフォルトは非公開",
          text: "基本は非公開。投稿するとWebで公開されます。",
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
      privacyText: "基本は端末保存。投稿するとWebで公開されます。同期は任意です。",
      supportPrefix: "お困りの際は",
      supportLink: "サポート",
      supportSuffix: "へ。",
    };
  }

  if (lang === "zh") {
    return {
      metaTitle: "下载 MomentBook",
      metaDescription: "在 iOS 与 Android 下载 MomentBook。",
      title: "下载 MomentBook",
      subtitle: "为想记住的日子提供一个实用的记录空间。支持 iPhone 与 Android。",
      deviceImage: "/device-mocks/home-zh.png",
      deviceAlt: "MomentBook 中文主屏幕",
      availability: "可在应用商店直接安装。",
      storeLabels: {
        iosLabel: "在 App Store",
        iosName: "获取",
        iosAriaLabel: "在 App Store 获取",
        androidLabel: "在 Google Play",
        androidName: "获取",
        androidAriaLabel: "在 Google Play 获取",
      },
      featuresTitle: "为什么选择 MomentBook",
      features: [
        {
          title: "几秒就能记录",
          text: "保存一张照片或一句短句即可。",
        },
        {
          title: "一天自动整理",
          text: "时间与地点让瞬间形成清晰的脉络。",
        },
        {
          title: "默认私密",
          text: "默认私密，发布后会在网页公开。",
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
      privacyText: "默认保存在设备中，发布后会在网页公开，同步可选。",
      supportPrefix: "需要帮助？",
      supportLink: "前往支持页",
      supportSuffix: "。",
    };
  }

  return {
    metaTitle: "Download MomentBook",
    metaDescription: "Get MomentBook for iOS and Android.",
    title: "Download MomentBook",
    subtitle: "A practical place to keep the days you want to remember. Available for iPhone and Android.",
    deviceImage: "/device-mocks/home-en.png",
    deviceAlt: "MomentBook home screen in English",
    availability: "Install from your store.",
    storeLabels: {
      iosLabel: "Download on the",
      iosName: "App Store",
      iosAriaLabel: "Download on the App Store",
      androidLabel: "Get it on",
      androidName: "Google Play",
      androidAriaLabel: "Get it on Google Play",
    },
    featuresTitle: "Why people choose MomentBook",
      features: [
      {
        title: "Capture in seconds",
        text: "Save a photo or a short line. No setup required.",
      },
      {
        title: "Your day, organized",
        text: "Moments gather by time and place into a simple view.",
      },
        {
          title: "Private by default",
          text: "Publish to the web only when you choose.",
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
    privacyText: "Stored on your device by default. Publishing makes a journey public. Sync is optional.",
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

  return (
    <div className={styles.page}>
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
              <DeviceMock screenClassName={deviceStyles.screenMedia}>
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
