import type { Metadata } from "next";
import Link from "next/link";
import { FadeIn } from "@/components/FadeIn";
import { DeviceMock } from "@/components/DeviceMock";
import styles from "./download.module.scss";
import { type Language } from "@/lib/i18n/config";

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
  deviceText: string;
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
      subtitle: "기억하고 싶은 하루를 조용히 담는 공간. iPhone과 Android에서 사용 가능합니다.",
      deviceText: "하루를 조용히 남기기",
      availability: "지금 이용 가능. 스토어를 선택하세요.",
      storeLabels: {
        iosLabel: "다운로드",
        iosName: "App Store",
        iosAriaLabel: "App Store에서 다운로드",
        androidLabel: "다운로드",
        androidName: "Google Play",
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
          text: "광고, 추적, 공개 피드 없이 기록은 나에게만 남습니다.",
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
      privacyText: "동기화를 선택하지 않는 한 기록은 기기에만 남습니다.",
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
      subtitle: "覚えておきたい一日を静かに残す場所。iPhone と Android に対応。",
      deviceText: "一日をそっと残す",
      availability: "今すぐ利用可能。ストアを選択してください。",
      storeLabels: {
        iosLabel: "ダウンロード",
        iosName: "App Store",
        iosAriaLabel: "App Store でダウンロード",
        androidLabel: "ダウンロード",
        androidName: "Google Play",
        androidAriaLabel: "Google Play でダウンロード",
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
          text: "広告や追跡、公開フィードはありません。",
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
      privacyText: "同期を選ばない限り、記録は端末に保存されます。",
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
      subtitle: "为想记住的日子留一个安静的空间。支持 iPhone 与 Android。",
      deviceText: "安静地留住一天",
      availability: "现已可用，选择你的应用商店。",
      storeLabels: {
        iosLabel: "下载",
        iosName: "App Store",
        iosAriaLabel: "在 App Store 下载",
        androidLabel: "下载",
        androidName: "Google Play",
        androidAriaLabel: "在 Google Play 下载",
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
          text: "没有广告、没有追踪、没有公开动态。",
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
      privacyText: "除非你选择同步，记录只保存在设备中。",
      supportPrefix: "需要帮助？",
      supportLink: "前往支持页",
      supportSuffix: "。",
    };
  }

  return {
    metaTitle: "Download MomentBook",
    metaDescription: "Get MomentBook for iOS and Android.",
    title: "Download MomentBook",
    subtitle: "A calm place for the days you want to remember. Available for iPhone and Android.",
    deviceText: "Keep the day, quietly",
    availability: "Available now. Choose your store.",
    storeLabels: {
      iosLabel: "Download",
      iosName: "App Store",
      iosAriaLabel: "Download on the App Store",
      androidLabel: "Download",
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
        text: "No ads, no tracking, no public feed.",
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
    privacyText: "Your moments stay on your device unless you choose to sync.",
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

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
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
      {/* Hero Section - Visual First */}
      <section className={styles.hero}>
        <FadeIn>
          <div className={styles.heroVisual}>
            <DeviceMock>
              <span>{content.deviceText}</span>
            </DeviceMock>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <h1 className={styles.heroTitle}>
            {content.title}
          </h1>
        </FadeIn>

        <FadeIn delay={250}>
          <p className={styles.heroSubtitle}>
            {content.subtitle}
          </p>
        </FadeIn>

        <FadeIn delay={350}>
          <div className={styles.downloadButtons}>
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
        </FadeIn>

        <FadeIn delay={450}>
          <p className={styles.availability}>
            {content.availability}
          </p>
        </FadeIn>

        <FadeIn delay={520}>
          <p className={styles.supportNote}>
            {content.supportPrefix}
            <Link href={`/${lang}/support`} className={styles.supportLink}>
              {content.supportLink}
            </Link>
            {content.supportSuffix}
          </p>
        </FadeIn>
      </section>

      {/* What You Get Section */}
      <section className={styles.features}>
        <FadeIn>
          <h2 className={styles.featuresTitle}>{content.featuresTitle}</h2>
        </FadeIn>

        <div className={styles.featureGrid}>
          {content.features.map((feature, index) => (
            <FadeIn key={`${feature.title}-${index}`} delay={(index + 1) * 100}>
              <div className={styles.feature}>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureText}>{feature.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* System Requirements */}
      <section className={styles.requirements}>
        <FadeIn>
          <h2 className={styles.requirementsTitle}>{content.requirementsTitle}</h2>
        </FadeIn>

        <div className={styles.requirementsList}>
          {content.requirements.map((requirement, index) => (
            <FadeIn key={`${requirement.platform}-${index}`} delay={(index + 1) * 100}>
              <div className={styles.requirement}>
                <h3 className={styles.requirementPlatform}>{requirement.platform}</h3>
                <p className={styles.requirementDetails}>
                  {requirement.details.map((detail, detailIndex) => (
                    <span key={`${requirement.platform}-${detailIndex}`}>
                      {detail}
                      {detailIndex < requirement.details.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Privacy Note */}
      <section className={styles.privacy}>
        <FadeIn>
          <p className={styles.privacyText}>
            {content.privacyText}
          </p>
        </FadeIn>
      </section>
    </div>
  );
}
