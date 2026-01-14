import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./user.module.scss";
import { type Language, languageList } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
  publicUsers,
  getPublicUser,
  getUserJourneys,
} from "@/lib/public-content";

export const revalidate = 3600;

const userLabels: Record<Language, { journeys: string; places: string; photos: string }> = {
  en: {
    journeys: "Journeys",
    places: "places",
    photos: "photos",
  },
  ko: {
    journeys: "여정",
    places: "곳",
    photos: "장",
  },
  ja: {
    journeys: "旅",
    places: "か所",
    photos: "枚",
  },
  zh: {
    journeys: "行程",
    places: "个地点",
    photos: "张照片",
  },
};

export async function generateStaticParams() {
  return languageList.flatMap((lang) =>
    publicUsers.map((user) => ({
      lang,
      userId: user.userId,
    }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; userId: string }>;
}): Promise<Metadata> {
  const { lang, userId } = await params as { lang: Language; userId: string };
  const user = getPublicUser(userId);

  if (!user) {
    return {
      title: "User not found",
    };
  }

  const path = `/users/${userId}`;
  const url = buildOpenGraphUrl(lang, path);

  return {
    title: `${user.displayName} · MomentBook`,
    description: user.bio,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: `${user.displayName} · MomentBook`,
      description: user.bio,
      type: "profile",
      url,
      images: [
        {
          url: user.avatarUrl,
          width: 800,
          height: 800,
          alt: user.displayName,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: `${user.displayName} · MomentBook`,
      description: user.bio,
      images: [user.avatarUrl],
    },
  };
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ lang: string; userId: string }>;
}) {
  const { lang, userId } = await params as { lang: Language; userId: string };
  const user = getPublicUser(userId);

  if (!user) {
    notFound();
  }

  const journeys = getUserJourneys(user.userId);
  const labels = userLabels[lang] ?? userLabels.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, `/users/${user.userId}`), siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${user.displayName} · MomentBook`,
    url: pageUrl,
    mainEntity: {
      "@type": "Person",
      name: user.displayName,
      identifier: user.userId,
      description: user.bio,
      image: user.avatarUrl,
      url: pageUrl,
    },
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <header className={styles.header}>
        <div className={styles.avatarFrame}>
          <Image
            src={user.avatarUrl}
            alt={user.displayName}
            fill
            sizes="120px"
            className={styles.avatar}
          />
        </div>
        <div>
          <p className={styles.name}>{user.displayName}</p>
          <p className={styles.handle}>{user.handle}</p>
          <p className={styles.bio}>{user.bio}</p>
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{labels.journeys}</h2>
        <div className={styles.journeyGrid}>
          {journeys.map((journey) => (
            <Link
              key={journey.journeyId}
              href={`/${lang}/journeys/${journey.journeyId}`}
              className={styles.journeyCard}
            >
              <div className={styles.journeyHeader}>
                <p className={styles.journeyTitle}>{journey.title}</p>
                <p className={styles.journeyMeta}>
                  {journey.recapDraft.inputSummary.totalStayPoints} {labels.places} · {journey.recapDraft.inputSummary.totalPhotos} {labels.photos}
                </p>
              </div>
              <p className={styles.journeyDescription}>{journey.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
