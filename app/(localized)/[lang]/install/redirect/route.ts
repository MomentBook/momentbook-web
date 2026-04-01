import { NextRequest, NextResponse } from "next/server";
import { isValidLanguage, type Language } from "@/lib/i18n/config";
import {
  detectLandingPlatform,
  normalizeCampaignParams,
  type CampaignSearchParams,
} from "@/lib/install-campaign";
import { HOME_SECTION_IDS, buildHomeSectionHref } from "@/lib/marketing/home-sections";
import { buildStoreLink } from "@/lib/mobile-app";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang: rawLang } = await params;
  if (!isValidLanguage(rawLang)) {
    return new Response("Not Found", { status: 404 });
  }

  const lang: Language = rawLang;
  const rawSearchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries(),
  ) as CampaignSearchParams;
  const campaign = normalizeCampaignParams(rawSearchParams, lang);
  const platform = detectLandingPlatform(request.headers.get("user-agent") ?? "");
  const destination = platform === "desktop"
    ? new URL(buildHomeSectionHref(lang, HOME_SECTION_IDS.download), request.url).toString()
    : buildStoreLink(platform, lang, campaign);

  return NextResponse.redirect(destination);
}
