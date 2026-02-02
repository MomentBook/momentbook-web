"use client";

import { isSupported, getAnalytics, type Analytics } from "firebase/analytics";
import { firebaseApp } from "./client";

let analyticsSingleton: Analytics | null = null;

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
    // 중복 생성 방지
    if (analyticsSingleton) return analyticsSingleton;

    // 브라우저/환경 지원 여부 체크 (SSR/사파리/프리렌더 안전)
    const supported = await isSupported();
    if (!supported) return null;

    analyticsSingleton = getAnalytics(firebaseApp);
    return analyticsSingleton;
}
