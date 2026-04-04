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
      page: number;
      total: number;
      hasMore: boolean;
    }
  | {
      status: "error";
    };

export async function loadMoreJourneysAction(input: {
  lang: Language;
  page: number;
  limit?: number;
}): Promise<LoadMoreJourneysActionResult> {
  const labels = getJourneyPageLabels(input.lang);
  const response = await fetchPublishedJourneys({
    page: input.page,
    limit: input.limit ?? JOURNEYS_BATCH_SIZE,
    sort: "discovery",
    lang: input.lang,
  }).catch((error) => {
    console.warn("[journeys] Failed to load the next discovery page", error);
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
    page: response.page ?? input.page,
    total: response.total,
    hasMore: response.hasMore,
  };
}
