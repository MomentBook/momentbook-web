import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDay, days } from "@/lib/content";
import styles from "@/styles/common.module.scss";
import contentStyles from "../../content.module.scss";

export const revalidate = 86400;

export async function generateStaticParams() {
  return days.map((day) => ({
    date: day.date,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ date: string }>;
}): Promise<Metadata> {
  const { date } = await params;
  const day = getDay(date);

  if (!day) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: day.title,
    description: day.description,
    openGraph: {
      title: day.title,
      description: day.description,
      type: "article",
    },
  };
}

export default async function DayPage({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const day = getDay(date);

  if (!day) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <article className={styles.content}>
        <Link href="/" className={contentStyles.backLink}>← Back</Link>

        <header className={contentStyles.header}>
          <h1 className={styles.title}>{day.title}</h1>
          <p className={styles.subtitle}>{day.description}</p>
        </header>

        <div className={contentStyles.prose}>
          {day.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <aside className={styles.callout}>
          <p>
            If this resonates, MomentBook might be for you.
          </p>
          <Link href="/download" className={contentStyles.downloadButton}>
            Download the app
          </Link>
        </aside>
      </article>
    </div>
  );
}
