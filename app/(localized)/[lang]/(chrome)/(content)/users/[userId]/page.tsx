import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import styles from "./user.module.scss";
import { languageList, type Language, toLocaleTag } from "@/lib/i18n/config";
import {
  buildOpenGraphUrl,
  buildPaginatedAlternates,
} from "@/lib/i18n/metadata";
import {
  buildOpenGraphBase,
  buildPublicKeywords,
  buildPublicRobots,
  buildStructuredDataKeywordValue,
} from "@/lib/seo/public-metadata";
import { buildSocialImageMetadata } from "@/lib/seo/social-image";
import {
  buildPublisherOrganizationJsonLd,
  buildStructuredDataUrl,
  resolveStructuredDataSiteUrl,
  serializeJsonLd,
} from "@/lib/seo/json-ld";
import { buildPageBreadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { getUserListLabels } from "../users-page.helpers";
import {
  fetchPublicUsers,
  fetchPublicUser,
  fetchUserJourneys,
} from "@/lib/public-users";
import {
  buildPaginationEntries,
  parsePositiveIntegerPage,
} from "@/lib/pagination";
import { readText } from "@/lib/view-helpers";
import { UserProfileContent } from "./UserProfileContent";
import {
  buildUserMetadataDescription,
  buildUserMetadataTitle,
  buildUserPageStatusText,
  buildUserProfileDescription,
  buildUserProfilePageHref,
  buildUserSharedCountText,
  getUserPageLabels,
  JOURNEYS_PER_PAGE,
  userNotFoundTitleByLanguage,
} from "./user-page.helpers";

export const revalidate = 14400;

export async function generateStaticParams() {
  const response = await fetchPublicUsers({ limit: 1000, sort: "recent" });
  const users = response?.data?.users ?? [];

  return languageList.flatMap((lang) =>
    users.map((user) => ({
      lang,
      userId: user.userId,
    })),
  );
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; userId: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}): Promise<Metadata> {
  const { lang, userId } = (await params) as { lang: Language; userId: string };
  const { page } = (await searchParams) as { page?: string | string[] };
  const currentPage = parsePositiveIntegerPage(page);
  const user = await fetchPublicUser(userId);

  if (!user) {
    return {
      title: userNotFoundTitleByLanguage[lang],
    };
  }

  const path = `/users/${userId}`;
  const openGraphPath =
    currentPage > 1 ? `${path}?page=${currentPage}` : path;
  const title = buildUserMetadataTitle(lang, user.name, currentPage);
  const description = buildUserMetadataDescription(lang, user, currentPage);
  const socialImages = buildSocialImageMetadata(
    {
      kind: "user",
      lang,
      userId: user.userId,
      page: currentPage,
    },
    title,
  );

  const labels = getUserPageLabels(lang);
  const keywords = buildPublicKeywords({
    lang,
    kind: "user",
    title: user.name,
    authorName: user.name,
    extra: [labels.profileEyebrow, labels.journeys],
  });

  return {
    title,
    description,
    keywords,
    applicationName: "MomentBook",
    authors: [
      {
        name: user.name,
        url: `/${lang}/users/${user.userId}`,
      },
    ],
    creator: "MomentBook",
    publisher: "MomentBook",
    robots: buildPublicRobots(),
    alternates: buildPaginatedAlternates(lang, path, currentPage),
    openGraph: {
      ...buildOpenGraphBase(lang, openGraphPath),
      title,
      description,
      type: "profile",
      username: user.userId,
      images: socialImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImages.map((image) => image.url),
    },
  };
}

export default async function UserPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string; userId: string }>;
  searchParams: Promise<{ page?: string | string[] }>;
}) {
  const { lang, userId } = (await params) as { lang: Language; userId: string };
  const { page } = (await searchParams) as { page?: string | string[] };
  const currentPage = parsePositiveIntegerPage(page);
  const user = await fetchPublicUser(userId);

  if (!user) {
    notFound();
  }

  const journeysResponse = await fetchUserJourneys(userId, {
    page: currentPage,
    limit: JOURNEYS_PER_PAGE,
    sort: "recent",
    lang,
  });
  const journeys = journeysResponse?.data?.journeys ?? [];
  const totalJourneys =
    journeysResponse?.data?.total ?? user.publishedJourneyCount ?? journeys.length;
  const totalPagesFromApi = journeysResponse?.data?.pages;
  const totalPages =
    typeof totalPagesFromApi === "number" && totalPagesFromApi > 0
      ? totalPagesFromApi
      : Math.max(1, Math.ceil(totalJourneys / JOURNEYS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  if (currentPage !== safeCurrentPage) {
    redirect(buildUserProfilePageHref(lang, userId, safeCurrentPage));
  }

  const hasPreviousPage = safeCurrentPage > 1;
  const hasNextPage = safeCurrentPage < totalPages;
  const labels = getUserPageLabels(lang);
  const sharedCountText = buildUserSharedCountText(labels, user.publishedJourneyCount);
  const pageStatusText = buildUserPageStatusText(labels, safeCurrentPage, totalPages);
  const paginationEntries = buildPaginationEntries(safeCurrentPage, totalPages, {
    includeSinglePage: false,
  });
  const profileImageUrl = readText(user.picture);

  const siteUrl = resolveStructuredDataSiteUrl();
  const profilePath = buildOpenGraphUrl(lang, `/users/${user.userId}`);
  const pagePath =
    safeCurrentPage > 1
      ? `${profilePath}?page=${safeCurrentPage}`
      : profilePath;
  const profileUrl = buildStructuredDataUrl(profilePath, siteUrl);
  const pageUrl = buildStructuredDataUrl(pagePath, siteUrl);
  const description = buildUserProfileDescription(lang, user);
  const pageDescription = buildUserMetadataDescription(lang, user, safeCurrentPage);
  const keywords = buildPublicKeywords({
    lang,
    kind: "user",
    title: user.name,
    authorName: user.name,
    extra: [labels.profileEyebrow, labels.journeys],
  });
  const keywordValue = buildStructuredDataKeywordValue(keywords);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: buildUserMetadataTitle(lang, user.name, safeCurrentPage),
    description: pageDescription,
    url: pageUrl,
    inLanguage: toLocaleTag(lang),
    ...(keywordValue ? { keywords: keywordValue } : {}),
    publisher: buildPublisherOrganizationJsonLd(siteUrl),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    mainEntity: {
      "@type": "Person",
      name: user.name,
      identifier: user.userId,
      description,
      ...(user.publishedJourneyCount > 0
        ? {
            agentInteractionStatistic: {
              "@type": "InteractionCounter",
              interactionType: "https://schema.org/WriteAction",
              userInteractionCount: user.publishedJourneyCount,
            },
          }
        : {}),
      ...(profileImageUrl ? { image: profileImageUrl } : {}),
      url: profileUrl,
    },
  };

  const userListLabels = getUserListLabels(lang);
  const breadcrumbJsonLd = buildPageBreadcrumbJsonLd(lang, [
    { name: userListLabels.title, path: `/${lang}/users` },
    { name: user.name, path: `/${lang}/users/${user.userId}` },
  ], siteUrl);

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <UserProfileContent
        lang={lang}
        user={user}
        labels={labels}
        journeys={journeys}
        profileImageUrl={profileImageUrl}
        sharedCountText={sharedCountText}
        pageStatusText={pageStatusText}
        paginationEntries={paginationEntries}
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        safeCurrentPage={safeCurrentPage}
        totalPages={totalPages}
      />
    </div>
  );
}
