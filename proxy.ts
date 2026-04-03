import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLanguage,
  detectLanguageFromAcceptLanguage,
  getPathLanguage,
  resolveSupportedLanguage,
} from "@/lib/i18n/config";
import { PREFERRED_LANGUAGE_COOKIE_NAME } from "@/lib/state/preferences";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.next();
  }

  // Skip proxy for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a language prefix
  if (getPathLanguage(pathname)) {
    return NextResponse.next();
  }

  // Determine the user's preferred language
  let preferredLanguage = defaultLanguage;
  const queryLang = request.nextUrl.searchParams.get("lang");

  // 1. Honor explicit query language for campaign links
  const explicitLanguage = resolveSupportedLanguage(queryLang);
  if (explicitLanguage) {
    preferredLanguage = explicitLanguage;
  } else {
    // 2. Check cookie
    const cookieLang = resolveSupportedLanguage(
      request.cookies.get(PREFERRED_LANGUAGE_COOKIE_NAME)?.value,
    );
    if (cookieLang) {
      preferredLanguage = cookieLang;
    } else {
      // 3. Fallback to Accept-Language header
      preferredLanguage = detectLanguageFromAcceptLanguage(
        request.headers.get("accept-language"),
      );
    }
  }

  // Redirect to the language-prefixed URL
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLanguage}${pathname}`;
  url.searchParams.delete("lang");

  const response = NextResponse.redirect(url);
  response.headers.set("Vary", "Accept-Language, Cookie");

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
  ],
};
