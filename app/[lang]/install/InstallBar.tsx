import type { InstallLandingContent } from "@/lib/install-landing";
import styles from "./install.module.scss";

type InstallBarProps = {
  content: InstallLandingContent;
  show: boolean;
  useOpenInAppLabel: boolean;
  onAction: () => void;
  onDismiss: () => void;
};

export function InstallBar({
  content,
  show,
  useOpenInAppLabel,
  onAction,
  onDismiss,
}: InstallBarProps) {
  if (!show) {
    return null;
  }

  return (
    <div className={styles.installBar} role="region" aria-label={content.installBarLead}>
      <div className={styles.installBarContent}>
        <div className={styles.installBarCopy}>
          <strong>{content.installBarLead}</strong>
          <span>{content.sample.heroLabel}</span>
        </div>
        <button type="button" className={styles.installBarButton} onClick={onAction}>
          {useOpenInAppLabel ? content.openInAppLabel : content.installBarAction}
        </button>
        <button
          type="button"
          className={styles.installBarDismiss}
          onClick={onDismiss}
          aria-label={content.dismissLabel}
        >
          {content.dismissLabel}
        </button>
      </div>
    </div>
  );
}
