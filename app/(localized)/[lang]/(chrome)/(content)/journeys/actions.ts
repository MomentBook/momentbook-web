"use server";

import type { Language } from "@/lib/i18n/config";
import { fetchPublishedJourneys } from "@/lib/published-journey";
import type { JourneyCardViewModel } from "./journeys.helpers";
import { buildJourneyCards } from "./journeys.helpers";
import {
  getJourneyPageLabels,
  JOURNEYS_BATCH_SIZE,
} from "./journeys-page.helpers";

export type LoadMoreJourneysActionResult =
  | {
      status: "success";
      cards: JourneyCardViewModel[];
      total: number;
      hasMore: boolean;
      nextCursor: string | null;
    }
  | {
      status: "error";
    };

export async function loadMoreJourneysAction(input: {
  lang: Language;
  cursor: string;
  limit?: number;
  excludeMine?: boolean;
  accessToken?: string;
}): Promise<LoadMoreJourneysActionResult> {
  const labels = getJourneyPageLabels(input.lang);
  const response = await fetchPublishedJourneys({
    cursor: input.cursor,
    limit: input.limit ?? JOURNEYS_BATCH_SIZE,
    sort: "recent",
    lang: input.lang,
    excludeMine: input.excludeMine,
    accessToken: input.accessToken,
  }).catch((error) => {
    console.warn("[journeys] Failed to load the next discovery batch", error);
    return null;
  });

  if (!response) {
    return {
      status: "error",
    };
  }

  const cards = await buildJourneyCards(response.journeys, labels);

  return {
    status: "success",
    cards,
    total: response.total,
    hasMore: response.hasMore,
    nextCursor: response.nextCursor,
  };
}
