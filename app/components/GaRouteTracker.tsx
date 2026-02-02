"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ENV } from "@/src/configs/env.client";

declare global {
    interface Window {
        gtag?: (...args: any[]) => void;
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
