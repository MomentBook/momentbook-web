"use client";

import { useSyncExternalStore } from "react";
import type { Language } from "@/lib/i18n/config";

type LocalizedJourneyPeriodProps = {
  lang: Language;
  startedAt?: number;
  endedAt?: number;
  unknownLabel: string;
  className?: string;
};

const noopSubscribe = () => () => {};

function formatLocalJourneyPeriod(
  lang: Language,
  startedAt?: number,
  endedAt?: number,
): string | null {
  if (typeof startedAt !== "number" || !Number.isFinite(startedAt)) {
    return null;
  }

  const startDate = new Date(startedAt);
  if (Number.isNaN(startDate.getTime())) {
    return null;
  }

  const dateFormatter = new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeFormatter = new Intl.DateTimeFormat(lang, {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateTimeFormatter = new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  if (typeof endedAt !== "number" || !Number.isFinite(endedAt)) {
    return dateTimeFormatter.format(startDate);
  }

  const endDate = new Date(endedAt);
  if (Number.isNaN(endDate.getTime())) {
    return dateTimeFormatter.format(startDate);
  }

  const isSameDay =
    startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate();

  if (isSameDay) {
    return `${dateFormatter.format(startDate)} ${timeFormatter.format(startDate)} ~ ${timeFormatter.format(endDate)}`;
  }

  return `${dateTimeFormatter.format(startDate)} ~ ${dateTimeFormatter.format(endDate)}`;
}

export function LocalizedJourneyPeriod({
  lang,
  startedAt,
  endedAt,
  unknownLabel,
  className,
}: LocalizedJourneyPeriodProps) {
  const text = useSyncExternalStore(
    noopSubscribe,
    () => formatLocalJourneyPeriod(lang, startedAt, endedAt),
    () => null,
  );

  return <span className={className}>{text ?? unknownLabel}</span>;
}
