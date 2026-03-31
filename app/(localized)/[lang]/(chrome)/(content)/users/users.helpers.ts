import type { Language } from "@/lib/i18n/config";
import { matchesHashtagQuery, normalizeHashtags } from "@/lib/hashtags";
import { fetchUserJourneys, type PublicUserApi } from "@/lib/public-users";
import { formatTemplate } from "@/lib/view-helpers";

export type UserDirectorySearchResult = {
  user: PublicUserApi;
  matchedHashtags: string[];
};

const USER_SEARCH_CONCURRENCY = 6;
const USER_SEARCH_JOURNEY_LIMIT = 6;

async function mapWithConcurrency<T, R>(
  items: T[],
  concurrency: number,
  mapper: (item: T, index: number) => Promise<R>,
): Promise<R[]> {
  const results = new Array<R>(items.length);
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < items.length) {
      const index = nextIndex;
      nextIndex += 1;
      results[index] = await mapper(items[index], index);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );

  return results;
}

async function fetchRecentUserHashtags(userId: string, lang: Language): Promise<string[]> {
  const journeysResponse = await fetchUserJourneys(userId, {
    page: 1,
    limit: USER_SEARCH_JOURNEY_LIMIT,
    sort: "recent",
    lang,
  });

  return normalizeHashtags(
    (journeysResponse?.data?.journeys ?? []).flatMap((journey) => journey.hashtags ?? []),
  );
}

export function readSearchQuery(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    for (const candidate of value) {
      if (typeof candidate !== "string") {
        continue;
      }

      const trimmed = candidate.trim();
      if (trimmed.length > 0) {
        return trimmed;
      }
    }

    return "";
  }

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export async function filterUsersByQuery(
  users: PublicUserApi[],
  query: string,
  lang: Language,
): Promise<UserDirectorySearchResult[]> {
  if (query.length === 0) {
    return users.map((user) => ({ user, matchedHashtags: [] }));
  }

  const normalizedQuery = query.toLowerCase();
  const hashtagEntries = await mapWithConcurrency(
    users,
    USER_SEARCH_CONCURRENCY,
    async (user) => ({
      userId: user.userId,
      hashtags: await fetchRecentUserHashtags(user.userId, lang),
    }),
  );
  const hashtagMap = new Map(
    hashtagEntries.map((entry) => [entry.userId, entry.hashtags]),
  );

  return users.flatMap((user) => {
    const searchText = [user.name, user.biography]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    const matchedHashtags = (hashtagMap.get(user.userId) ?? []).filter((hashtag) =>
      matchesHashtagQuery(hashtag, query),
    );

    if (searchText.includes(normalizedQuery) || matchedHashtags.length > 0) {
      return [{ user, matchedHashtags }];
    }

    return [];
  });
}

export function buildCountLabel(
  template: string,
  count: number,
): string {
  return formatTemplate(template, { count });
}
