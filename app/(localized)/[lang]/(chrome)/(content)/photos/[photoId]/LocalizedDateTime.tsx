"use client";

import { useSyncExternalStore } from "react";
import type { Language } from "@/lib/i18n/config";
import {
    formatLocalDateTimeContextValue,
    isExplicitUnknownLocalDateTimeContext,
    type LocalDateTimeContext,
} from "@/lib/local-time-context";

type LocalizedDateTimeProps = {
    lang: Language;
    timestamp?: number;
    localContext?: LocalDateTimeContext | null;
    className?: string;
};

const noopSubscribe = () => () => {};

function formatAbsoluteDateTime(lang: Language, timestamp: number): string | null {
    try {
        const formatter = new Intl.DateTimeFormat(lang, {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
        return formatter.format(new Date(timestamp));
    } catch {
        return null;
    }
}

function formatAbsoluteDate(lang: Language, timestamp: number): string | null {
    try {
        const formatter = new Intl.DateTimeFormat(lang, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return formatter.format(new Date(timestamp));
    } catch {
        return null;
    }
}

function formatLocalDateTime(
    lang: Language,
    timestamp: number | undefined,
    localContext: LocalDateTimeContext | null | undefined,
): string | null {
    const localDateTime = formatLocalDateTimeContextValue(lang, localContext, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    if (localDateTime) {
        return localDateTime;
    }

    if (typeof timestamp !== "number" || !Number.isFinite(timestamp)) {
        return null;
    }

    if (isExplicitUnknownLocalDateTimeContext(localContext)) {
        return formatAbsoluteDate(lang, timestamp);
    }

    return formatAbsoluteDateTime(lang, timestamp);
}

export function LocalizedDateTime({
    lang,
    timestamp,
    localContext,
    className,
}: LocalizedDateTimeProps) {
    const value = useSyncExternalStore(
        noopSubscribe,
        () => formatLocalDateTime(lang, timestamp, localContext),
        () => null,
    );

    if (!value) {
        return null;
    }

    return <span className={className}>{value}</span>;
}
