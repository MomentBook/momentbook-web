import { DownloadQrCard } from "@/components/DownloadQrCard";
import { StoreBadgeLink } from "@/components/StoreBadgeLink";
import type { Language } from "@/lib/i18n/config";
import type { InstallLandingContent } from "@/lib/install-landing";
import type { LandingPlatform } from "@/lib/install-campaign";
import type { MobilePlatform, StoreLinks } from "@/lib/mobile-app";
import { InstallSectionHeader } from "./InstallSectionHeader";
import styles from "./install.module.scss";

type InstallFinalSectionProps = {
  lang: Language;
  content: InstallLandingContent;
  platform: LandingPlatform;
  storeLinks: StoreLinks;
  qrSvgMarkup: string;
  onStoreClick: (platform: MobilePlatform) => void;
};

export function InstallFinalSection({
  lang,
  content,
  platform,
  storeLinks,
  qrSvgMarkup,
  onStoreClick,
}: InstallFinalSectionProps) {
  return (
    <section className={`${styles.section} ${styles.finalSection}`}>
      <InstallSectionHeader
        eyebrow={content.sectionInstallLabel}
        title={content.finalTitle}
        lead={content.finalLead}
      />

      <div className={styles.finalInstallLayout}>
        <div className={styles.finalInstallPrimary}>
          <div className={styles.finalActions}>
            <StoreBadgeLink
              lang={lang}
              platform="ios"
              href={storeLinks.ios}
              className={styles.storeBadgeLink}
              imageClassName={styles.storeBadge}
              onClick={() => onStoreClick("ios")}
            />
            <StoreBadgeLink
              lang={lang}
              platform="android"
              href={storeLinks.android}
              className={styles.storeBadgeLink}
              imageClassName={styles.storeBadge}
              onClick={() => onStoreClick("android")}
            />
          </div>

          <p className={styles.finalNote}>{content.finalDesktopNote}</p>
        </div>

        {platform === "desktop" ? (
          <DownloadQrCard
            className={styles.finalQrPanel}
            title={content.desktopQrTitle}
            description={content.desktopQrLead}
            svgMarkup={qrSvgMarkup}
          />
        ) : null}
      </div>
    </section>
  );
}
