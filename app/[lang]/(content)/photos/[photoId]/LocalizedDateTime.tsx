"use client";

import { useSyncExternalStore } from "react";
import type { Language } from "@/lib/i18n/config";

type LocalizedDateTimeProps = {
    lang: Language;
    timestamp?: number;
    className?: string;
};

const noopSubscribe = () => () => {};

function formatLocalDateTime(lang: Language, timestamp: number): string | null {
    if (!Number.isFinite(timestamp)) {
        return null;
    }

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

export function LocalizedDateTime({
    lang,
    timestamp,
    className,
}: LocalizedDateTimeProps) {
    const value = useSyncExternalStore(
        noopSubscribe,
        () =>
            typeof timestamp === "number"
                ? formatLocalDateTime(lang, timestamp)
                : null,
        () => null,
    );

    if (!value) {
        return null;
    }

    return <span className={className}>{value}</span>;
}
