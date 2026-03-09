"use client";

import styles from "./DownloadQrCard.module.scss";

type DownloadQrCardProps = {
  title: string;
  description: string;
  svgMarkup: string;
  className?: string;
};

export function DownloadQrCard({
  title,
  description,
  svgMarkup,
  className,
}: DownloadQrCardProps) {
  return (
    <section className={`${styles.card} ${className ?? ""}`.trim()}>
      <div className={styles.copy}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.codeFrame} aria-hidden="true">
        <div
          className={styles.code}
          dangerouslySetInnerHTML={{ __html: svgMarkup }}
        />
      </div>
    </section>
  );
}
