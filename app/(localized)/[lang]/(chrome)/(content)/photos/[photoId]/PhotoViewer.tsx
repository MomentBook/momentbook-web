import Image from "next/image";
import { FullscreenImageDialog } from "@/components/FullscreenImageDialog";
import { shouldBypassImageOptimization } from "@/lib/image-source";
import type { PhotoPageCopy } from "./photo.helpers";
import styles from "./photo.module.scss";

type PhotoViewerProps = {
  photoUrl: string;
  alt: string;
  copy: PhotoPageCopy;
};
export function PhotoViewer({ photoUrl, alt, copy }: PhotoViewerProps) {
  return (
    <FullscreenImageDialog
      src={photoUrl}
      alt={alt}
      triggerAriaLabel={copy.openViewer}
      dialogAriaLabel={copy.viewerDialogLabel}
      closeAriaLabel={copy.closeViewer}
      triggerClassName={styles.viewerTrigger}
      imageSizes="100vw"
      trigger={
        <figure className={styles.mediaFrame}>
          <Image
            src={photoUrl}
            alt={alt}
            fill
            priority
            className={styles.image}
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 92vw, 1120px"
            unoptimized={shouldBypassImageOptimization(photoUrl)}
          />
          <figcaption className={styles.viewerTriggerHint} aria-hidden="true">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 4h5v5" />
              <path d="m14 10 6-6" />
              <path d="M9 20H4v-5" />
              <path d="m10 14-6 6" />
            </svg>
            <span>{copy.openViewerHint}</span>
          </figcaption>
        </figure>
      }
    />
  );
}
