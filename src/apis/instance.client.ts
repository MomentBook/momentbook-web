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
 * NextAuth 세션에서 최신 accessToken을 조회해 메모리에 반영한다.
 * - NextAuth JWT callback 내부에서 refresh token 교환이 수행된다.
 * - 클라이언트는 세션 엔드포인트만 호출한다.
 */
async function refreshAccessToken(): Promise<string | null> {
    try {
        const res = await fetch("/api/auth/session", {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) return null;

        const json = await res.json();
        const newAccessToken: string | null =
            json?.accessToken ?? null;

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
        // 세션 조회 및 서버 API 호출에서 쿠키 유지
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
        type RetryableRequestInit = RequestInit & { _retry?: boolean };

        // 무한 재시도 방지
        const retryableInit = (init ?? {}) as RetryableRequestInit;
        const alreadyRetried = retryableInit._retry === true;

        // 쿠키 포함 (same-origin refresh & 기타 케이스 대비)
        const mergedInit: RequestInit = {
            ...retryableInit,
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
                const typedRetryInit: RetryableRequestInit = {
                    ...retryInit,
                    _retry: true,
                };
                response = await fetch(input, typedRetryInit);
            } else {
                // refresh 실패 시 토큰 메모리 제거
                tokenStore.clear();
            }
        }

        return response;
    },
});
