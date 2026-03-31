import type { Metadata } from "next";
import { type Language } from "@/lib/i18n/config";
import { buildOpenGraphUrl } from "@/lib/i18n/metadata";
import { getDownloadCopy } from "@/lib/marketing/download-content";
import {
  buildAppleSmartBannerContent,
  getCanonicalStoreLinks,
} from "@/lib/mobile-app";
import { fetchPublishedJourneys } from "@/lib/published-journey";
import { fetchPublicUser } from "@/lib/public-users";
import { serializeJsonLd } from "@/lib/seo/json-ld";
import {
  buildLocalizedAppScreenshotImage,
  buildPublicRobots,
  buildStandardPageMetadata,
} from "@/lib/seo/public-metadata";
import { resolveSiteUrl } from "@/lib/site-url";
import { HashTargetFocus } from "./HashTargetFocus";
import { HomeMarketingStory } from "./HomeMarketingStory";
import {
  HomeDownloadSection,
} from "./HomeDownloadSection";
import { HomeHero } from "./HomeHero";
import { HomeFeaturedJourneys } from "./HomeFeaturedJourneys";
import { buildHomeFeaturedJourneys } from "./home.helpers";
import {
  buildHomeHeroContent,
  getHomeContactType,
  getHomeEditorialCopy,
  getHomeMarketingCopy,
  getHomePageCopy,
} from "./home.copy";
import { buildHomeStructuredData } from "./home.schemas";
import styles from "./page.module.scss";

export async function generateMetadata(
  { params }: { params: Promise<{ lang: string }> },
): Promise<Metadata> {
  const { lang } = await params as { lang: Language };
  const content = getHomePageCopy(lang);

  return buildStandardPageMetadata({
    lang,
    path: "/",
    title: content.metaTitle,
    description: content.metaDescription,
    robots: buildPublicRobots(),
    absoluteTitle: true,
    twitterCard: "summary_large_image",
    socialImages: [
      buildLocalizedAppScreenshotImage(lang, content.metaTitle),
    ],
    other: {
      "apple-itunes-app": buildAppleSmartBannerContent(lang),
    },
  });
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params as { lang: Language };
  const content = getHomePageCopy(lang);
  const editorialContent = getHomeEditorialCopy(lang);
  const marketingContent = getHomeMarketingCopy(lang);
  const downloadContent = getDownloadCopy(lang);
  const latestJourneys = await fetchPublishedJourneys({
    page: 1,
    limit: 3,
    sort: "recent",
    lang,
  });
  const journeyItems = latestJourneys?.journeys ?? [];
  const uniqueUserIds = [...new Set(journeyItems.map((journey) => journey.userId).filter(Boolean))];
  const users = await Promise.all(
    uniqueUserIds.map(async (userId) => [userId, await fetchPublicUser(userId)] as const),
  );
  const featuredJourneys = buildHomeFeaturedJourneys(
    lang,
    journeyItems,
    new Map(users),
    editorialContent,
  );
  const heroContent = buildHomeHeroContent(content, editorialContent);

  const siteUrl = resolveSiteUrl();
  const supportEmail = process.env.NEXT_PUBLIC_SUPPORT_EMAIL?.trim() || "support@momentbook.app";
  const pageUrl = new URL(buildOpenGraphUrl(lang, "/"), siteUrl).toString();
  const storeLinks = getCanonicalStoreLinks(lang);
  const {
    organizationSchema,
    websiteSchema,
    softwareApplicationSchema,
  } = buildHomeStructuredData({
    metaDescription: content.metaDescription,
    pageUrl,
    siteUrl,
    supportEmail,
    softwareRequirements: downloadContent.softwareRequirements,
    storeLinks,
    contactType: getHomeContactType(lang),
  });

  return (
    <div className={styles.page}>
      <HashTargetFocus />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(softwareApplicationSchema) }}
      />

      <HomeHero lang={lang} content={heroContent} />
      <HomeMarketingStory lang={lang} content={marketingContent.marketing} />
      <HomeFeaturedJourneys
        lang={lang}
        content={editorialContent}
        journeys={featuredJourneys}
      />
      <HomeDownloadSection
        lang={lang}
        content={downloadContent}
        narrative={marketingContent.download}
      />
    </div>
  );
}
