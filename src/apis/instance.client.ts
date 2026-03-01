// src/apis/instance.client.ts
import { Api } from "./client";
import { ENV } from "../configs/env.client";
import { version } from "../../package.json";

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

    securityWorker: async () => ({}),

    customFetch: async (input, init) =>
        fetch(input, {
            ...init,
            credentials: "include",
        }),
});
