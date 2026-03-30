function readText(value: string | null | undefined): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function normalizeHashtag(value: string | null | undefined): string | null {
  const text = readText(value);

  if (!text) {
    return null;
  }

  const normalizedBody = text
    .replace(/^#+/, "")
    .replace(/\s+/g, " ")
    .trim();

  if (!normalizedBody) {
    return null;
  }

  return `#${normalizedBody}`;
}

export function normalizeHashtags(values: Array<string | null | undefined>): string[] {
  const seen = new Set<string>();
  const normalized: string[] = [];

  for (const value of values) {
    const hashtag = normalizeHashtag(value);

    if (!hashtag) {
      continue;
    }

    const key = hashtag.toLocaleLowerCase();
    if (seen.has(key)) {
      continue;
    }

    seen.add(key);
    normalized.push(hashtag);
  }

  return normalized;
}

export function normalizeHashtagSearchToken(value: string | null | undefined): string {
  const hashtag = normalizeHashtag(value);

  if (!hashtag) {
    return "";
  }

  return hashtag.slice(1).toLocaleLowerCase();
}

export function getHashtagSearchValue(value: string): string {
  return normalizeHashtagSearchToken(value);
}

export function matchesHashtagQuery(hashtag: string, query: string): boolean {
  const normalizedHashtag = normalizeHashtagSearchToken(hashtag);
  const normalizedQuery = normalizeHashtagSearchToken(query);

  if (!normalizedHashtag || !normalizedQuery) {
    return false;
  }

  return normalizedHashtag.includes(normalizedQuery);
}
