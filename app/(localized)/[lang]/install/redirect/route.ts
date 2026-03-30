import { NextRequest, NextResponse } from "next/server";
import { type Language } from "@/lib/i18n/config";
import {
  detectLandingPlatform,
  normalizeCampaignParams,
  type CampaignSearchParams,
} from "@/lib/install-campaign";
import {
  buildAbsoluteInstallLandingUrl,
  buildStoreLink,
} from "@/lib/mobile-app";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ lang: string }> },
) {
  const { lang } = await params as { lang: Language };
  const rawSearchParams = Object.fromEntries(
    request.nextUrl.searchParams.entries(),
  ) as CampaignSearchParams;
  const campaign = normalizeCampaignParams(rawSearchParams, lang);
  const platform = detectLandingPlatform(request.headers.get("user-agent") ?? "");
  const destination = platform === "desktop"
    ? buildAbsoluteInstallLandingUrl(lang, campaign)
    : buildStoreLink(platform, lang, campaign);

  return NextResponse.redirect(destination);
}
