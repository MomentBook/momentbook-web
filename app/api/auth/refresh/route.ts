// src/app/api/auth/refresh/route.ts
import { NextResponse } from "next/server";
import { cookies, headers } from "next/headers";
import { version } from "@/package.json";

const REFRESH_COOKIE_NAME = "refresh_token";

function getEnv(name: string, fallback = "") {
    const v = process.env[name];
    return v === undefined || v === null || v === "" ? fallback : v;
}

/**
 * httpOnly refresh token cookie options
 * - prod: Secure=true
 * - sameSite는 기본 Lax 권장 (OAuth redirect 등에도 비교적 안전)
 */
function buildRefreshCookieOptions(maxAgeSeconds?: number) {
    const isProd = getEnv("NEXT_PUBLIC_APP_ENV") === "production";
    return {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax" as const,
        path: "/",
        ...(typeof maxAgeSeconds === "number" ? { maxAge: maxAgeSeconds } : {}),
    };
}

export async function POST() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(REFRESH_COOKIE_NAME)?.value;

    // refreshToken이 없으면 401로 처리
    if (!refreshToken) {
        return NextResponse.json(
            { status: "fail", message: "No refresh token" },
            { status: 401 },
        );
    }

    const API_BASE_URL = getEnv("NEXT_PUBLIC_API_BASE_URL"); // 서버에서도 접근 가능
    if (!API_BASE_URL) {
        return NextResponse.json(
            { status: "fail", message: "API base url is not configured" },
            { status: 500 },
        );
    }

    const APP_ENV = getEnv("NEXT_PUBLIC_APP_ENV");
    const APP_IS_LOCAL = getEnv("NEXT_PUBLIC_APP_IS_LOCAL", "false");

    try {
        // 업스트림 refresh 호출
        const upstreamRes = await fetch(`${API_BASE_URL}/v2/auth/refresh`, {
            method: "POST",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "App-Env": APP_ENV,
                "App-Is-Local": APP_IS_LOCAL,
                "App-Version": version,
                // 필요하면 원 요청 언어를 그대로 전달
                "Accept-Language":
                    (await headers()).get("accept-language") ?? "",
            },
            body: JSON.stringify({ refreshToken }),
        });

        const json = await upstreamRes.json().catch(() => null);

        // 실패(401/403 등)면 refresh 쿠키 제거
        if (!upstreamRes.ok) {
            const res = NextResponse.json(
                json ?? { status: "fail", message: "Token refresh failed" },
                { status: upstreamRes.status },
            );

            if (upstreamRes.status === 401 || upstreamRes.status === 403) {
                res.cookies.set(REFRESH_COOKIE_NAME, "", {
                    ...buildRefreshCookieOptions(),
                    maxAge: 0,
                });
            }

            return res;
        }

        /**
         * 기대 응답 형태:
         * { status: "success", data: { accessToken, refreshToken, expiresIn, ... }, message }
         */
        const newAccessToken: string | undefined = json?.data?.accessToken;
        const newRefreshToken: string | undefined = json?.data?.refreshToken;

        const res = NextResponse.json(json, { status: 200 });

        // 서버가 refreshToken을 재발급해주면 쿠키 갱신
        if (newRefreshToken) {
            // expiresIn은 accessToken용일 가능성이 높아서 refresh maxAge는 고정값/서버 정책을 따르는 편이 안전
            // 여기선 30일(예시)로 둠. 너희 서버 정책에 맞춰 조정해.
            const refreshMaxAgeSeconds = 60 * 60 * 24 * 30;
            res.cookies.set(
                REFRESH_COOKIE_NAME,
                newRefreshToken,
                buildRefreshCookieOptions(refreshMaxAgeSeconds),
            );
        }

        // accessToken은 클라이언트가 받아서 메모리에만 저장하도록
        if (!newAccessToken) {
            // accessToken이 없다면 클라이언트가 처리가 애매하니 경고용 응답(원하면 fail 처리로 바꿔도 됨)
            // 그래도 upstream json은 그대로 반환
        }

        return res;
    } catch (e) {
        return NextResponse.json(
            { status: "fail", message: "Refresh request error" },
            { status: 500 },
        );
    }
}
