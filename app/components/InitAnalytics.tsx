"use client";

import { useEffect } from "react";
import { getFirebaseAnalytics } from "@/lib/firebase/analytics";

export default function InitAnalytics() {
    useEffect(() => {
        if (process.env.NODE_ENV !== "production") return;
        void getFirebaseAnalytics(); // 여기서 analytics 초기화됨
    }, []);

    return null;
}
