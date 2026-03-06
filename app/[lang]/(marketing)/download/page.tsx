import type { Metadata } from "next";
import Image from "next/image";
import { FadeIn } from "@/components/FadeIn";
import styles from "./download.module.scss";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { getCanonicalStoreLinks } from "@/lib/mobile-app";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import { buildPublicRobots } from "@/lib/seo/public-metadata";

type DownloadCopy = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  availability: string;
  iosName: string;
  androidName: string;
  softwareRequirements: string;
};

const downloadCopy: Record<Language, DownloadCopy> = {
  en: {
    metaTitle: "Download MomentBook",
    metaDescription:
      "Install MomentBook on iOS and Android, then keep one post-trip flow from batch upload to timeline and map recap.",
    title: "Remember every travel moment now",
    availability: "Available on App Store and Google Play.",
    iosName: "App Store",
    androidName: "Google Play",
    softwareRequirements:
      "iOS 15.1+ (iPhone/iPad arm64); Android 7.0+ (API 24+) with target/compile API 36",
  },
  ko: {
    metaTitle: "MomentBook 다운로드",
    metaDescription:
      "iOS와 Android에서 MomentBook을 설치하고, 여행 후 일괄 업로드부터 타임라인/지도 회상까지 같은 흐름으로 사용하세요.",
    title: "지금, 여행의 순간을 기억하세요",
    availability: "App Store와 Google Play에서 이용할 수 있습니다.",
    iosName: "App Store",
    androidName: "Google Play",
    softwareRequirements:
      "iOS 15.1 이상(iPhone/iPad arm64), Android 7.0 이상(API 24+) 및 target/compile API 36",
  },
  ja: {
    metaTitle: "MomentBook ダウンロード",
    metaDescription:
      "iOS と Android で MomentBook をインストールし、旅行後は一括アップロードからタイムライン/地図回想まで同じ流れで使えます。",
    title: "今、旅の瞬間を記憶に残してください",
    availability: "App Store と Google Play で利用できます。",
    iosName: "App Store",
    androidName: "Google Play",
    softwareRequirements:
      "iOS 15.1以上（iPhone/iPad arm64）、Android 7.0以上（API 24+）および target/compile API 36",
  },
  zh: {
    metaTitle: "下载 MomentBook",
    metaDescription:
      "在 iOS 和 Android 上安装 MomentBook，并在每次旅行后按同一流程完成批量上传、时间线与地图回想。",
    title: "此刻，请记住旅行的每个瞬间",
    availability: "可在 App Store 与 Google Play 使用。",
    iosName: "App Store",
    androidName: "Google Play",
    softwareRequirements:
      "iOS 15.1+（iPhone/iPad arm64）；Android 7.0+（API 24+），target/compile API 36",
  },
  es: {
    metaTitle: "Descargar MomentBook",
    metaDescription:
      "Instala MomentBook en iOS y Android y usa el mismo flujo después del viaje: carga por lotes, línea de tiempo y repaso en mapa.",
    title: "Recuerda ahora cada momento de tu viaje",
    availability: "Disponible en App Store y Google Play.",
    iosName: "App Store",
    androidName: "Google Play",
    softwareRequirements:
      "iOS 15.1+ (iPhone/iPad arm64); Android 7.0+ (API 24+) con target/compile API 36",
  },
  pt: {
    metaTitle: "Baixar MomentBook",
    metaDescription:
      "Instale o MomentBook no iOS e Android e use o mesmo fluxo após a viagem: envio em lote, linha do tempo e revisão no mapa.",
    title: "Lembre agora cada momento da sua viagem",
    availability: "Disponível na App Store e no Google Play.",
    iosName: "App Store",
    androidName: "Google Play",
    softwareRequirements:
      "iOS 15.1+ (iPhone/iPad arm64); Android 7.0+ (API 24+) com target/compile API 36",
  },
  fr: {
    metaTitle: "Télécharger MomentBook",
    metaDescription:
      "Installez MomentBook sur iOS et Android et utilisez le même flux après le voyage : import en lot, timeline et rappel sur carte.",
    title: "Gardez maintenant chaque moment de votre voyage",
    availability: "Disponible sur App Store et Google Play.",
    iosName: "App Store",
    androidName: "Google Play",
    softwareRequirements:
      "iOS 15.1+ (iPhone/iPad arm64) ; Android 7.0+ (API 24+) avec target/compile API 36",
  },
  th: {
    metaTitle: "ดาวน์โหลด MomentBook",
    metaDescription:
      "ติดตั้ง MomentBook บน iOS และ Android แล้วใช้โฟลว์เดิมหลังทริป ตั้งแต่อัปโหลดแบบชุดเดียวจนถึงไทม์ไลน์และการย้อนดูบนแผนที่",
    title: "จดจำทุกช่วงเวลาการเดินทางของคุณตอนนี้",
    availability: "ใช้งานได้บน App Store และ Google Play",
    iosName: "App Store",
    androidName: "Google Play",
    softwareRequirements:
      "iOS 15.1+ (iPhone/iPad arm64), Android 7.0+ (API 24+) และ target/compile API 36",
  },
  vi: {
    metaTitle: "Tải MomentBook",
    metaDescription:
      "Cài MomentBook trên iOS và Android rồi dùng cùng một luồng sau chuyến đi: tải theo lô, timeline và hồi tưởng trên bản đồ.",
    title: "Ghi nhớ ngay từng khoảnh khắc chuyến đi của bạn",
    availability: "Có trên App Store và Google Play.",
    iosName: "App Store",
    androidName: "Google Play",
    softwareRequirements:
      "iOS 15.1+ (iPhone/iPad arm64); Android 7.0+ (API 24+) với target/compile API 36",
  },
};

function getDownloadCopy(lang: Language): DownloadCopy {
  return downloadCopy[lang] ?? downloadCopy.en;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getDownloadCopy(lang);
  const path = "/download";

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    robots: buildPublicRobots(),
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: buildOpenGraphUrl(lang, path),
    },
    twitter: {
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
  const content = getDownloadCopy(lang);
  const storeLinks = getCanonicalStoreLinks(lang);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/download"), siteUrl).toString();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "MomentBook",
    description: content.metaDescription,
    applicationCategory: "LifestyleApplication",
    operatingSystem: "iOS, Android",
    softwareRequirements: content.softwareRequirements,
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
    <main className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <FadeIn>
            <div className={styles.heroCopy}>
              <h1 className={styles.heroTitle}>{content.title}</h1>

              <div className={styles.storeButtons}>
                <a
                  href={storeLinks.ios}
                  className={styles.storeButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.iosName}
                >
                  <Image
                    src="/images/download/app-store-button.webp"
                    alt={content.iosName}
                    width={635}
                    height={200}
                    className={styles.storeBadge}
                  />
                </a>
                <a
                  href={storeLinks.android}
                  className={styles.storeButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.androidName}
                >
                  <Image
                    src="/images/download/google-play-button.webp"
                    alt={content.androidName}
                    width={636}
                    height={200}
                    className={styles.storeBadge}
                  />
                </a>
              </div>

              <p className={styles.availability}>{content.availability}</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
