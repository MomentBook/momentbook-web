import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const supportedLanguages = ["en", "ko", "ja", "zh"];
const defaultLanguage = "en";

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
  const hasLanguagePrefix = supportedLanguages.some((lang) =>
    pathname.startsWith(`/${lang}`)
  );

  if (hasLanguagePrefix) {
    return NextResponse.next();
  }

  // Determine the user's preferred language
  let preferredLanguage = defaultLanguage;

  // 1. Check cookie first
  const cookieLang = request.cookies.get("preferredLanguage")?.value;
  if (cookieLang && supportedLanguages.includes(cookieLang)) {
    preferredLanguage = cookieLang;
  } else {
    // 2. Fallback to Accept-Language header
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage) {
      const browserLang = acceptLanguage
        .split(",")[0]
        .split("-")[0]
        .toLowerCase();
      if (supportedLanguages.includes(browserLang)) {
        preferredLanguage = browserLang;
      }
    }
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
