import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./user.module.scss";
import { type Language, languageList } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import {
  fetchPublicUsers,
  fetchPublicUser,
  fetchUserJourneys,
} from "@/lib/public-users";

export const revalidate = 3600;

const userLabels: Partial<Record<Language, { journeys: string; photos: string }>> & {
  en: { journeys: string; photos: string };
} = {
  en: {
    journeys: "Journeys",
    photos: "photos",
  },
  ko: {
    journeys: "여정",
    photos: "장",
  },
  ja: {
    journeys: "旅",
    photos: "枚",
  },
  zh: {
    journeys: "行程",
    photos: "张照片",
  },
};

const userDescriptionTemplates: Partial<Record<Language, string>> & { en: string } = {
  en: "Journeys shared by {name} on MomentBook.",
  ko: "{name}님이 MomentBook에서 공유한 여정입니다.",
  ja: "{name}さんが MomentBook で共有した旅です。",
  zh: "{name} 在 MomentBook 分享的行程。",
};

export async function generateStaticParams() {
  const response = await fetchPublicUsers({ limit: 1000, sort: "recent" });
  const users = response?.data?.users ?? [];

  return languageList.flatMap((lang) =>
    users.map((user) => ({
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
  const user = await fetchPublicUser(userId);

  if (!user) {
    return {
      title: "User not found",
    };
  }

  const description =
    user.biography?.trim() ||
    (userDescriptionTemplates[lang] ?? userDescriptionTemplates.en).replace(
      "{name}",
      user.name,
    );

  const path = `/users/${userId}`;
  const url = buildOpenGraphUrl(lang, path);

  return {
    title: `${user.name} · MomentBook`,
    description,
    alternates: buildAlternates(lang, path),
    openGraph: {
      title: `${user.name} · MomentBook`,
      description,
      type: "profile",
      url,
      images: user.picture ? [
        {
          url: user.picture,
          width: 800,
          height: 800,
          alt: user.name,
        },
      ] : [],
    },
    twitter: {
      card: "summary",
      title: `${user.name} · MomentBook`,
      description,
      images: user.picture ? [user.picture] : [],
    },
  };
}

export default async function UserPage({
  params,
}: {
  params: Promise<{ lang: string; userId: string }>;
}) {
  const { lang, userId } = await params as { lang: Language; userId: string };
  const user = await fetchPublicUser(userId);

  if (!user) {
    notFound();
  }

  const journeysResponse = await fetchUserJourneys(userId, { limit: 100 });
  const journeys = journeysResponse?.data?.journeys ?? [];
  const labels = userLabels[lang] ?? userLabels.en;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3100";
  const pageUrl = new URL(buildOpenGraphUrl(lang, `/users/${user.userId}`), siteUrl).toString();
  const description =
    user.biography?.trim() ||
    (userDescriptionTemplates[lang] ?? userDescriptionTemplates.en).replace(
      "{name}",
      user.name,
    );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: `${user.name} · MomentBook`,
    url: pageUrl,
    mainEntity: {
      "@type": "Person",
      name: user.name,
      identifier: user.userId,
      description,
      image: user.picture ?? "",
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
          {user.picture ? (
            <Image
              src={user.picture}
              alt={user.name}
              fill
              sizes="120px"
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarFallback}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div>
          <p className={styles.name}>{user.name}</p>
          {user.biography && <p className={styles.bio}>{user.biography}</p>}
        </div>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>{labels.journeys}</h2>
        <div className={styles.journeyGrid}>
          {journeys.map((journey) => (
            <Link
              key={journey.publicId}
              href={`/${lang}/journeys/${journey.publicId}`}
              className={styles.journeyCard}
            >
              <div className={styles.coverImageFrame}>
                {journey.images?.[0] ? (
                  <Image
                    src={journey.images[0].url}
                    alt={journey.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={styles.coverImage}
                  />
                ) : (
                  <div className={styles.coverFallback}>MomentBook</div>
                )}
              </div>
              <div className={styles.journeyHeader}>
                <p className={styles.journeyTitle}>{journey.title}</p>
                <p className={styles.journeyMeta}>
                  {journey.photoCount} {labels.photos}
                </p>
              </div>
              {journey.description && (
                <p className={styles.journeyDescription}>{journey.description}</p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
