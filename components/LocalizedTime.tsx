"use client";

import { useSyncExternalStore } from "react";
import { toLocaleTag, type Language } from "@/lib/i18n/config";

const noopSubscribe = () => () => {};

type BaseProps = {
  lang: Language;
  className?: string;
};

type LocalizedDateProps = BaseProps & {
  timestamp?: number | null;
  fallback?: string;
};

type LocalizedDateRangeProps = BaseProps & {
  start?: number | null;
  end?: number | null;
  fallback?: string;
};

type LocalizedDateTimeRangeProps = BaseProps & {
  start?: number | null;
  end?: number | null;
  fallback?: string;
};

function normalizeTimestamp(value: number | null | undefined): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  return null;
}

function resolveRange(
  start: number | null | undefined,
  end: number | null | undefined,
) {
  const resolvedStart = normalizeTimestamp(start);
  const resolvedEnd = normalizeTimestamp(end);

  if (resolvedStart === null && resolvedEnd === null) {
    return null;
  }

  const nextStart = resolvedStart ?? resolvedEnd;
  const nextEnd = resolvedEnd ?? resolvedStart;

  if (nextStart === null || nextEnd === null) {
    return null;
  }

  if (nextEnd < nextStart) {
    return { start: nextEnd, end: nextStart };
  }

  return { start: nextStart, end: nextEnd };
}

function formatDate(lang: Language, timestamp: number | null, fallback: string) {
  if (timestamp === null) {
    return fallback;
  }

  try {
    return new Intl.DateTimeFormat(toLocaleTag(lang), {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(timestamp);
  } catch {
    return fallback;
  }
}

function formatDateRange(
  lang: Language,
  start: number | null | undefined,
  end: number | null | undefined,
  fallback: string,
) {
  const range = resolveRange(start, end);
  if (!range) {
    return fallback;
  }

  try {
    const formatter = new Intl.DateTimeFormat(toLocaleTag(lang), {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const startDate = formatter.format(range.start);
    const endDate = formatter.format(range.end);

    if (startDate === endDate) {
      return startDate;
    }

    return `${startDate} - ${endDate}`;
  } catch {
    return fallback;
  }
}

function formatDateTimeRange(
  lang: Language,
  start: number | null | undefined,
  end: number | null | undefined,
  fallback: string,
) {
  const range = resolveRange(start, end);
  if (!range) {
    return fallback;
  }

  try {
    const dateFormatter = new Intl.DateTimeFormat(toLocaleTag(lang), {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const timeFormatter = new Intl.DateTimeFormat(toLocaleTag(lang), {
      hour: "2-digit",
      minute: "2-digit",
    });

    const startDate = dateFormatter.format(range.start);
    const endDate = dateFormatter.format(range.end);
    const startTime = timeFormatter.format(range.start);
    const endTime = timeFormatter.format(range.end);

    if (startDate === endDate) {
      return `${startDate} · ${startTime}-${endTime}`;
    }

    return `${startDate} ${startTime} - ${endDate} ${endTime}`;
  } catch {
    return fallback;
  }
}

export function LocalizedDate({
  lang,
  timestamp,
  className,
  fallback = "",
}: LocalizedDateProps) {
  const normalized = normalizeTimestamp(timestamp);
  const value = useSyncExternalStore(
    noopSubscribe,
    () => formatDate(lang, normalized, fallback),
    () => fallback,
  );

  return <span className={className}>{value}</span>;
}

export function LocalizedDateRange({
  lang,
  start,
  end,
  className,
  fallback = "",
}: LocalizedDateRangeProps) {
  const value = useSyncExternalStore(
    noopSubscribe,
    () => formatDateRange(lang, start, end, fallback),
    () => fallback,
  );

  return <span className={className}>{value}</span>;
}

export function LocalizedDateTimeRange({
  lang,
  start,
  end,
  className,
  fallback = "",
}: LocalizedDateTimeRangeProps) {
  const value = useSyncExternalStore(
    noopSubscribe,
    () => formatDateTimeRange(lang, start, end, fallback),
    () => fallback,
  );

  return <span className={className}>{value}</span>;
}
