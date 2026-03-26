import Image from "next/image";
import type { Language } from "@/lib/i18n/config";
import type { MobilePlatform } from "@/lib/mobile-app";

type StoreBadgeLinkProps = {
  lang: Language;
  platform: MobilePlatform;
  href: string;
  className?: string;
  imageClassName?: string;
  onClick?: () => void;
  openInNewTab?: boolean;
};

const storeBadgeLabelByLanguage: Record<Language, { ios: string; android: string }> = {
  en: {
    ios: "Download on the App Store",
    android: "Get it on Google Play",
  },
  ko: {
    ios: "App Store에서 다운로드",
    android: "Google Play에서 받기",
  },
  ja: {
    ios: "App Store でダウンロード",
    android: "Google Play で入手",
  },
  zh: {
    ios: "在 App Store 下载",
    android: "在 Google Play 获取",
  },
  es: {
    ios: "Descargar en App Store",
    android: "Conseguir en Google Play",
  },
  pt: {
    ios: "Baixar na App Store",
    android: "Baixar no Google Play",
  },
  fr: {
    ios: "Télécharger sur l'App Store",
    android: "Télécharger sur Google Play",
  },
  th: {
    ios: "ดาวน์โหลดบน App Store",
    android: "รับบน Google Play",
  },
  vi: {
    ios: "Tải trên App Store",
    android: "Tải trên Google Play",
  },
};

export function StoreBadgeLink({
  lang,
  platform,
  href,
  className,
  imageClassName,
  onClick,
  openInNewTab = false,
}: StoreBadgeLinkProps) {
  const isIos = platform === "ios";
  const src = isIos
    ? "/images/download/app-store-button.webp"
    : "/images/download/google-play-button.webp";
  const alt = isIos
    ? storeBadgeLabelByLanguage[lang].ios
    : storeBadgeLabelByLanguage[lang].android;

  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      aria-label={alt}
      {...(openInNewTab
        ? {
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
    >
      <Image
        src={src}
        alt={alt}
        width={isIos ? 635 : 636}
        height={200}
        className={imageClassName}
      />
    </a>
  );
}
