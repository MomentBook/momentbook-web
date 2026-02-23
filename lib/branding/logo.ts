export const APP_LOGO_PATH = "/images/logos/app_logo.png";
export const APP_WORDMARK_PATH = "/wordmark.svg";

export function buildAbsoluteAppLogoUrl(siteUrl: string): string {
  return new URL(APP_LOGO_PATH, siteUrl).toString();
}
