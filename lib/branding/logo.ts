import appLogoUiAsset from "@/assets/ui/branding/app-logo.webp";

export const APP_LOGO_PATH = "/images/logos/app_logo.png";
export const APP_LOGO_TRANSPARENT_PATH = "/images/logos/app_logo_transparent.png";
export const APP_WORDMARK_PATH = "/wordmark.svg";
export const APP_LOGO_UI_ASSET = appLogoUiAsset;

export function buildAbsoluteAppLogoUrl(siteUrl: string): string {
  return new URL(APP_LOGO_PATH, siteUrl).toString();
}

export function buildAbsoluteAppTransparentLogoUrl(siteUrl: string): string {
  return new URL(APP_LOGO_TRANSPARENT_PATH, siteUrl).toString();
}
