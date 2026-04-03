import { readTimestamp, resolveJourneyPeriodRange } from "@/lib/journey-period";
import type { LocalDateTimeContext } from "@/lib/local-time-context";
import type { PublishedJourneyListItemApi } from "@/lib/published-journey";
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

export async function buildJourneyCards(
  journeys: PublishedJourneyListItemApi[],
  labels: JourneyCardLabels,
): Promise<JourneyCardViewModel[]> {
  const uniqueUserIds = [...new Set(journeys.map((journey) => journey.userId).filter(Boolean))];
  const users = await Promise.all(
    uniqueUserIds.map(async (userId) => [userId, await fetchPublicUser(userId)] as const),
  );
  const userMap = new Map(users);

  return journeys.map((journey) => {
    const meta = resolveJourneyMetadata(journey);
    const author = userMap.get(journey.userId);
    const publishedAt = readTimestamp(journey.publishedAt) ?? readTimestamp(journey.createdAt);
    const coverUrl = resolveJourneyListCoverUrl(journey);
    const periodRange = resolveJourneyPeriodRange({
      startedAt: journey.startedAt,
      endedAt: journey.endedAt,
      photoSources: [journey.metadata],
    });

    return {
      publicId: journey.publicId,
      title: readText(journey.title) ?? meta.title ?? labels.untitledJourney,
      description: readText(journey.description) ?? meta.description ?? null,
      imageCount: resolveMaxCount(
        journey.photoCount,
        journey.imageCount,
      ),
      coverUrl,
      authorName: readText(author?.name) ?? labels.unknownUserLabel,
      publishedAt,
      periodRange,
      periodStartLocal: journey.startedAtLocal ?? null,
      periodEndLocal: journey.endedAtLocal ?? null,
    };
  });
}
