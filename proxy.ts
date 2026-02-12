import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLanguage,
  detectLanguageFromAcceptLanguage,
  isValidLanguage,
  languageList,
} from "@/lib/i18n/config";

function nextWithPathnameHeader(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/tutorials") ||
    pathname.includes(".")
  ) {
    return nextWithPathnameHeader(request);
  }

  // Check if pathname already has a language prefix
  const hasLanguagePrefix = languageList.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`),
  );

  if (hasLanguagePrefix) {
    return nextWithPathnameHeader(request);
  }

  // Determine the user's preferred language
  let preferredLanguage = defaultLanguage;

  // 1. Check cookie first
  const cookieLang = request.cookies.get("preferredLanguage")?.value;
  if (cookieLang && isValidLanguage(cookieLang)) {
    preferredLanguage = cookieLang;
  } else {
    // 2. Fallback to Accept-Language header
    preferredLanguage = detectLanguageFromAcceptLanguage(
      request.headers.get("accept-language"),
    );
  }

  // Redirect to the language-prefixed URL
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLanguage}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public/tutorials (static HTML tutorial archives)
     */
    "/((?!_next/static|_next/image|favicon.ico|tutorials(?:/|$)|.*\\..*|api).*)",
  ],
};
