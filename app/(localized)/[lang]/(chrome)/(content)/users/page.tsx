import type { Metadata } from "next";
import { type Language } from "@/lib/i18n/config";
import { buildAlternates, buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { fetchPublicUsers } from "@/lib/public-users";
import {
  buildPublisherOrganizationJsonLd,
  buildStructuredDataUrl,
  resolveStructuredDataSiteUrl,
  serializeJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import {
  buildNoIndexFollowRobots,
  buildLocalizedAppScreenshotImage,
  buildOpenGraphBase,
  buildPublicRobots,
} from "@/lib/seo/public-metadata";
import {
  buildCountLabel,
  filterUsersByQuery,
  readSearchQuery,
} from "./users.helpers";
import { UsersDirectoryContent } from "./UsersDirectoryContent";
import {
  buildUserListDescription,
  getUserListLabels,
} from "./users-page.helpers";
import styles from "./users.module.scss";

export const revalidate = 14400;

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const { q } = await searchParams as { q?: string | string[] };
  const labels = getUserListLabels(lang);
  const query = readSearchQuery(q);
  const path = "/users";
  const shouldNoIndexSearchResults = query.length > 0;
  const description = buildUserListDescription(labels, query);
  const socialImages = [buildLocalizedAppScreenshotImage(lang, labels.title)];

  return {
    title: labels.title,
    description,
    applicationName: "MomentBook",
    creator: "MomentBook",
    publisher: "MomentBook",
    robots: shouldNoIndexSearchResults
      ? buildNoIndexFollowRobots()
      : buildPublicRobots(),
    alternates: buildAlternates(lang, path),
    openGraph: {
      ...buildOpenGraphBase(lang, path),
      type: "website",
      title: labels.title,
      description,
      images: socialImages,
    },
    twitter: {
      card: "summary_large_image",
      title: labels.title,
      description,
      images: socialImages.map((image) => image.url),
    },
  };
}

export default async function UsersPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { lang } = await params as { lang: Language };
  const { q } = await searchParams as { q?: string | string[] };
  const labels = getUserListLabels(lang);

  const response = await fetchPublicUsers({ limit: 100, sort: "recent" });
  const allUsers = response?.data?.users ?? [];

  const query = readSearchQuery(q);
  const isFiltering = query.length > 0;
  const filteredUsers = await filterUsersByQuery(allUsers, query, lang);
  const countText = buildCountLabel(labels.countLabel, filteredUsers.length);
  const siteUrl = resolveStructuredDataSiteUrl();
  const pageUrl = buildStructuredDataUrl(buildOpenGraphUrl(lang, "/users"), siteUrl);
  const shouldExposeStructuredData = !isFiltering;
  const description = buildUserListDescription(labels, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: labels.title,
    description,
    url: pageUrl,
    publisher: buildPublisherOrganizationJsonLd(siteUrl),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: filteredUsers.length,
      itemListElement: filteredUsers.map((result, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: buildStructuredDataUrl(
          buildOpenGraphUrl(lang, `/users/${result.user.userId}`),
          siteUrl,
        ),
        name: result.user.name,
      })),
    },
  };

  const breadcrumbJsonLd = buildPageBreadcrumbJsonLd(lang, [
    { name: labels.title, path: `/${lang}/users` },
  ], siteUrl);

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      {shouldExposeStructuredData ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
      ) : null}
      <UsersDirectoryContent
        lang={lang}
        labels={labels}
        filteredUsers={filteredUsers}
        countText={countText}
        isFiltering={isFiltering}
      />
    </div>
  );
}
