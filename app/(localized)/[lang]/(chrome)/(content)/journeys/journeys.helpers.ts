import type { Language } from "@/lib/i18n/config";
import { readTimestamp, resolveJourneyPeriodRange } from "@/lib/journey-period";
import type { LocalDateTimeContext } from "@/lib/local-time-context";
import {
  fetchPublishedJourney,
  type PublishedJourneyListItemApi,
} from "@/lib/published-journey";
import { fetchPublicUser } from "@/lib/public-users";
import {
  asRecord,
  readText,
  resolveJourneyListCoverUrl,
  resolveMaxCount,
} from "@/lib/view-helpers";

type JourneyCardLabels = {
  untitledJourney: string;
  unknownUserLabel: string;
};

export type JourneyCardViewModel = {
  publicId: string;
  title: string;
  description: string | null;
  imageCount: number;
  coverUrl: string | null;
  authorName: string;
  publishedAt: number | null;
  periodRange: {
    start: number | null;
    end: number | null;
  };
  periodStartLocal?: LocalDateTimeContext | null;
  periodEndLocal?: LocalDateTimeContext | null;
};

function resolveJourneyMetadata(journey: PublishedJourneyListItemApi) {
  const metadata = asRecord(journey.metadata);

  return {
    title: readText(metadata?.title),
    description: readText(metadata?.description),
  };
}

export function buildJourneyPageHref(lang: Language, page: number): string {
  if (page <= 1) {
    return `/${lang}/journeys`;
  }

  return `/${lang}/journeys?page=${page}`;
}

export async function buildJourneyCards(
  journeys: PublishedJourneyListItemApi[],
  labels: JourneyCardLabels,
  lang: Language,
): Promise<JourneyCardViewModel[]> {
  const uniqueUserIds = [...new Set(journeys.map((journey) => journey.userId).filter(Boolean))];
  const users = await Promise.all(
    uniqueUserIds.map(async (userId) => [userId, await fetchPublicUser(userId)] as const),
  );
  const userMap = new Map(users);
  const journeyDetails = await Promise.all(
    journeys.map(async (journey) => [journey.publicId, await fetchPublishedJourney(journey.publicId, lang)] as const),
  );
  const detailMap = new Map(journeyDetails);

  return journeys.map((journey) => {
    const meta = resolveJourneyMetadata(journey);
    const author = userMap.get(journey.userId);
    const detail = detailMap.get(journey.publicId);
    const publishedAt = readTimestamp(journey.publishedAt) ?? readTimestamp(journey.createdAt);
    const coverUrl = resolveJourneyListCoverUrl(journey);
    const periodRange = resolveJourneyPeriodRange({
      startedAt: detail?.startedAt ?? journey.startedAt,
      endedAt: detail?.endedAt ?? journey.endedAt,
      photoSources: [detail?.images, detail?.clusters, journey.metadata],
    });

    return {
      publicId: journey.publicId,
      title: readText(detail?.title) ?? meta.title ?? labels.untitledJourney,
      description: readText(detail?.description) ?? meta.description ?? null,
      imageCount: resolveMaxCount(
        journey.photoCount,
        detail?.photoCount,
        journey.imageCount,
        Array.isArray(detail?.images) ? detail.images.length : null,
      ),
      coverUrl,
      authorName: readText(author?.name) ?? labels.unknownUserLabel,
      publishedAt,
      periodRange,
      periodStartLocal: detail?.startedAtLocal ?? journey.startedAtLocal ?? null,
      periodEndLocal: detail?.endedAtLocal ?? journey.endedAtLocal ?? null,
    };
  });
}
