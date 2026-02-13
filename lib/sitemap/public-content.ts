import type { PublishedJourneyListItemApi } from "@/lib/published-journey";
import { fetchPublishedJourneys } from "@/lib/published-journey";
import type { PublicUserApi } from "@/lib/public-users";
import { fetchPublicUsers } from "@/lib/public-users";

const DEFAULT_PAGE_LIMIT = 100;
const MAX_API_PAGES = 200;

export async function fetchAllPublicUsersForSitemap(): Promise<PublicUserApi[]> {
  const users: PublicUserApi[] = [];
  const seen = new Set<string>();

  for (let page = 1; page <= MAX_API_PAGES; page += 1) {
    const response = await fetchPublicUsers({
      page,
      limit: DEFAULT_PAGE_LIMIT,
      sort: "recent",
    });
    const data = response?.data;

    if (!data) {
      break;
    }

    for (const user of data.users ?? []) {
      if (!user.userId || seen.has(user.userId)) {
        continue;
      }

      seen.add(user.userId);
      users.push(user);
    }

    const totalPages = Math.max(1, data.pages ?? page);
    if (page >= totalPages) {
      break;
    }
  }

  return users;
}

export async function fetchAllPublishedJourneysForSitemap(): Promise<PublishedJourneyListItemApi[]> {
  const journeys: PublishedJourneyListItemApi[] = [];
  const seen = new Set<string>();

  for (let page = 1; page <= MAX_API_PAGES; page += 1) {
    const response = await fetchPublishedJourneys({
      page,
      limit: DEFAULT_PAGE_LIMIT,
      sort: "recent",
    });

    if (!response) {
      break;
    }

    for (const journey of response.journeys ?? []) {
      if (!journey.publicId || seen.has(journey.publicId)) {
        continue;
      }

      seen.add(journey.publicId);
      journeys.push(journey);
    }

    const totalPages = Math.max(1, response.pages ?? page);
    if (page >= totalPages) {
      break;
    }
  }

  return journeys;
}

export async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const safeConcurrency = Math.max(1, Math.floor(concurrency));
  const results: R[] = new Array(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from(
      { length: Math.min(safeConcurrency, items.length) },
      () => worker(),
    ),
  );

  return results;
}

