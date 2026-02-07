import Image from "next/image";
import Link from "next/link";
import styles from "./JourneyPreviewCard.module.scss";

type JourneyMetaItem = {
  label: string;
  value: string | number;
};

type JourneyPreviewCardProps = {
  href: string;
  title: string;
  description?: string | null;
  coverUrl?: string | null;
  topMeta?: string | null;
  metaItems: JourneyMetaItem[];
  authorHref?: string;
  authorText?: string;
};

function readText(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

const fallbackCover = "/images/placeholders/journey-cover-fallback.svg";

export function JourneyPreviewCard({
  href,
  title,
  description,
  coverUrl,
  topMeta,
  metaItems,
  authorHref,
  authorText,
}: JourneyPreviewCardProps) {
  const safeDescription = readText(description);
  const safeCover = readText(coverUrl);
  const safeTopMeta = readText(topMeta);
  const safeAuthor = readText(authorText);

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.coverLink}>
        <div className={styles.cover}>
          <Image
            src={safeCover ?? fallbackCover}
            alt={safeCover ? title : ""}
            aria-hidden={safeCover ? undefined : true}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.coverImage}
          />
        </div>
      </Link>

      <div className={styles.body}>
        <div className={styles.mainSection}>
          {safeTopMeta ? <p className={styles.topMeta}>{safeTopMeta}</p> : null}

          <Link href={href} className={styles.titleLink}>
            <h3 className={styles.title}>{title}</h3>
          </Link>

          {safeDescription ? <p className={styles.description}>{safeDescription}</p> : null}
        </div>

        <div className={styles.metaSection}>
          <div className={styles.metaRow}>
            {metaItems.map((item) => (
              <span key={`${item.label}-${item.value}`} className={styles.metaItem}>
                {item.label} · {item.value}
              </span>
            ))}
          </div>

          {authorHref && safeAuthor ? (
            <Link href={authorHref} className={styles.authorLink}>
              {safeAuthor}
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
}
