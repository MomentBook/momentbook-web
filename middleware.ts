import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLanguage,
  detectLanguageFromAcceptLanguage,
  isValidLanguage,
  languageList,
} from "@/lib/i18n/config";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a language prefix
  const hasLanguagePrefix = languageList.some(
    (lang) => pathname === `/${lang}` || pathname.startsWith(`/${lang}/`),
  );

  if (hasLanguagePrefix) {
    return NextResponse.next();
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
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)",
  ],
};
