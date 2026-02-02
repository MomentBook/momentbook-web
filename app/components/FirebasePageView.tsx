"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { logEvent } from "firebase/analytics";
import { getFirebaseAnalytics } from "@/lib/firebase/analytics";

export default function FirebasePageView() {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        const run = async () => {
            if (process.env.NODE_ENV !== "production") return;

            const analytics = await getFirebaseAnalytics();
            if (!analytics) return;

            const qs = searchParams?.toString();
            const page_location = `${window.location.origin}${pathname}${qs ? `?${qs}` : ""}`;

            // GA4 권장 이벤트: page_view
            logEvent(analytics, "page_view", { page_location });
        };

        void run();
    }, [pathname, searchParams]);

    return null;
}
