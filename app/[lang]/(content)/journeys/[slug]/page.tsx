import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getJourney, journeys } from "@/lib/content";
import styles from "@/styles/common.module.scss";
import contentStyles from "../../content.module.scss";

export const revalidate = 86400;

export async function generateStaticParams() {
  return journeys.map((journey) => ({
    slug: journey.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journey = getJourney(slug);

  if (!journey) {
    return {
      title: "Not Found",
    };
  }

  return {
    title: journey.title,
    description: journey.description,
    openGraph: {
      title: journey.title,
      description: journey.description,
      type: "article",
    },
  };
}

export default async function JourneyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const journey = getJourney(slug);

  if (!journey) {
    notFound();
  }

  return (
    <div className={styles.container}>
      <article className={styles.content}>
        <Link href="/" className={contentStyles.backLink}>← Back</Link>

        <header className={contentStyles.header}>
          <h1 className={styles.title}>{journey.title}</h1>
          <p className={styles.subtitle}>{journey.description}</p>
        </header>

        <div className={contentStyles.prose}>
          {journey.content.split('\n\n').map((paragraph, index) => (
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
