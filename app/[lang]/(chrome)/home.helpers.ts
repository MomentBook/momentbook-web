import type { Language } from "@/lib/i18n/config";
import type { PublishedJourneyListItemApi } from "@/lib/published-journey";
import { asRecord, readText, resolveMaxCount } from "@/lib/view-helpers";

export type HomeFeaturedCopy = {
  featuredEyebrow: string;
  featuredTitle: string;
  featuredLead: string;
  featuredArchiveCta: string;
  photoCountLabel: string;
  untitledJourney: string;
  unknownUser: string;
  emptyJourneys: string;
};

export type HomeFeaturedJourney = {
  publicId: string;
  href: string;
  title: string;
  description: string | null;
  authorName: string;
  photoCount: number;
  publishedAt: string | null;
  coverUrl: string | null;
};

function resolveJourneyMetadata(journey: PublishedJourneyListItemApi) {
  const metadata = asRecord(journey.metadata);

  return {
    title: readText(metadata?.title),
    description: readText(metadata?.description),
    thumbnailUri: readText(metadata?.thumbnailUri),
  };
}

export function buildHomeFeaturedJourneys(
  lang: Language,
  journeys: PublishedJourneyListItemApi[],
  userMap: Map<string, { name?: string | null } | null>,
  copy: Pick<HomeFeaturedCopy, "unknownUser" | "untitledJourney">,
): HomeFeaturedJourney[] {
  return journeys.map((journey) => {
    const meta = resolveJourneyMetadata(journey);
    const authorName = readText(userMap.get(journey.userId)?.name) ?? copy.unknownUser;
    const photoCount = resolveMaxCount(journey.photoCount, journey.imageCount);
    const publishedAt = readText(journey.publishedAt) ?? readText(journey.createdAt);

    return {
      publicId: journey.publicId,
      href: `/${lang}/journeys/${journey.publicId}`,
      title: readText(journey.title) ?? meta.title ?? copy.untitledJourney,
      description: readText(journey.description) ?? meta.description ?? null,
      authorName,
      photoCount,
      publishedAt,
      coverUrl: readText(journey.thumbnailUrl) ?? meta.thumbnailUri ?? null,
    };
  });
}
