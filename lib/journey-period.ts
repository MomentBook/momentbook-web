import { toLocaleTag, type Language } from "@/lib/i18n/config";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

export function readTimestamp(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const trimmed = value.trim();

    if (trimmed.length === 0) {
      return null;
    }

    const numeric = Number(trimmed);
    if (Number.isFinite(numeric)) {
      return numeric;
    }

    const parsed = Date.parse(trimmed);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

function isTimestampKey(key: string): boolean {
  return /(time|date|taken|captured|timestamp|start|end)/i.test(key);
}

function collectTimestampCandidates(value: unknown, depth = 0): number[] {
  if (depth > 2) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.flatMap((item) => collectTimestampCandidates(item, depth + 1));
  }

  if (!isRecord(value)) {
    return [];
  }

  const values: number[] = [];

  for (const [key, field] of Object.entries(value)) {
    if (isTimestampKey(key)) {
      const timestamp = readTimestamp(field);
      if (timestamp !== null) {
        values.push(timestamp);
      }
    }

    if (Array.isArray(field) || isRecord(field)) {
      values.push(...collectTimestampCandidates(field, depth + 1));
    }
  }

  return values;
}

export function resolveJourneyPeriodRange(options: {
  startedAt?: unknown;
  endedAt?: unknown;
  photoSources?: unknown[];
}): { start: number | null; end: number | null } {
  const photoCandidates = (options.photoSources ?? [])
    .flatMap((source) => collectTimestampCandidates(source))
    .filter((value) => Number.isFinite(value))
    .sort((a, b) => a - b);

  if (photoCandidates.length > 0) {
    const start = photoCandidates[0] ?? null;
    const end = photoCandidates[photoCandidates.length - 1] ?? start;
    return { start, end };
  }

  const start = readTimestamp(options.startedAt);
  const end = readTimestamp(options.endedAt) ?? start;

  if (start === null && end === null) {
    return { start: null, end: null };
  }

  if (start !== null && end !== null && end < start) {
    return { start: end, end: start };
  }

  return {
    start: start ?? end,
    end: end ?? start,
  };
}

export function formatJourneyPeriodRange(
  lang: Language,
  range: { start: number | null; end: number | null },
  fallback: string,
): string {
  if (range.start === null && range.end === null) {
    return fallback;
  }

  const formatter = new Intl.DateTimeFormat(toLocaleTag(lang), {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const start = range.start ?? range.end;
  const end = range.end ?? range.start;

  if (start === null || end === null) {
    return fallback;
  }

  return `${formatter.format(start)} ~ ${formatter.format(end)}`;
}
