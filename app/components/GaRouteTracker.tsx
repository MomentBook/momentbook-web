"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ENV } from "@/src/configs/env.client";

type GtagFunction = (
    command: "event",
    eventName: string,
    params?: Record<string, string | number | boolean>,
) => void;

declare global {
    interface Window {
        gtag?: GtagFunction;
    }
}

const GA_ID = ENV.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID;

export default function GaRouteTracker() {
    const pathname = usePathname();

    useEffect(() => {
        if (!GA_ID || !window.gtag) return;
        window.gtag("event", "page_view", {
            page_location: `${window.location.origin}${pathname}`,
        });
    }, [pathname]);

    return null;
}
