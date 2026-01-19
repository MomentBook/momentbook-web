// src/apis/instance.client.ts
import { Api } from "./client";
import { ENV } from "../configs/env.client";
import { version } from "../../package.json";

/**
 * Web 권장:
 * - refreshToken: httpOnly cookie (JS에서 접근 불가)
 * - accessToken: client memory (필요시 sessionStorage로 대체 가능)
 */

let accessTokenMemory: string | null = null;

export const tokenStore = {
    getAccessToken() {
        return accessTokenMemory;
    },
    setAccessToken(token: string | null) {
        accessTokenMemory = token;
    },
    clear() {
        accessTokenMemory = null;
    },
};

/**
 * Next.js Route Handler를 통해 refresh 수행
 * - refreshToken은 httpOnly cookie로만 존재한다고 가정
 * - 이 함수는 accessToken만 받아서 메모리에 저장
 *
 * Route: POST /api/auth/refresh
 * Response example: { status: "success", data: { accessToken: "..." } }
 */
async function refreshAccessToken(): Promise<string | null> {
    try {
        const res = await fetch("/api/auth/refresh", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) return null;

        const json = await res.json();
        const newAccessToken: string | null =
            json?.data?.accessToken ?? json?.accessToken ?? null;

        if (newAccessToken) {
            tokenStore.setAccessToken(newAccessToken);
            return newAccessToken;
        }

        return null;
    } catch {
        return null;
    }
}

/**
 * Swagger로 생성된 Api 클래스의 싱글톤 인스턴스 (Client-side)
 */
export const api = new Api({
    baseUrl: ENV.API_BASE_URL,
    baseApiParams: {
        // refresh는 /api/auth/refresh에서 쿠키를 쓰므로 include 유지
        credentials: "include",
        headers: {
            "App-Env": String(ENV.APP_ENV ?? ""),
            "App-Is-Local": String(ENV.APP_IS_LOCAL ?? false),
            "App-Version": version,
        },
    },

    securityWorker: async () => {
        const token = tokenStore.getAccessToken();
        if (!token) return {};
        return {
            headers: { Authorization: `Bearer ${token}` },
        };
    },

    customFetch: async (input, init) => {
        // 무한 재시도 방지
        const alreadyRetried = (init as any)?._retry === true;

        // 쿠키 포함 (same-origin refresh & 기타 케이스 대비)
        const mergedInit: RequestInit = {
            ...init,
            credentials: "include",
        };

        let response = await fetch(input, mergedInit);

        if (response.status === 401 && !alreadyRetried) {
            const newToken = await refreshAccessToken();

            if (newToken) {
                const retryInit: RequestInit = {
                    ...mergedInit,
                    headers: {
                        ...(mergedInit.headers || {}),
                        Authorization: `Bearer ${newToken}`,
                    },
                };
                (retryInit as any)._retry = true;
                response = await fetch(input, retryInit);
            } else {
                // refresh 실패 시 토큰 메모리 제거
                tokenStore.clear();
            }
        }

        return response;
    },
});
