const LOCAL_SITE_URL = "http://localhost:3100";

function parseBooleanEnv(value: string | undefined): boolean {
  if (!value) {
    return false;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === "true" || normalized === "1" || normalized === "yes";
}

function parseSiteUrl(value: string | undefined): URL | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = new URL(value.trim());

    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function normalizeSiteUrl(url: URL): string {
  const normalized = url.toString();
  return normalized.endsWith("/") ? normalized.slice(0, -1) : normalized;
}

function canUseLocalSiteUrlFallback(): boolean {
  if (process.env.NODE_ENV !== "production") {
    return true;
  }

  return parseBooleanEnv(process.env.NEXT_PUBLIC_APP_IS_LOCAL);
}

export function resolveSiteUrl(): string {
  const configuredSiteUrl = parseSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

  if (configuredSiteUrl) {
    return normalizeSiteUrl(configuredSiteUrl);
  }

  if (canUseLocalSiteUrlFallback()) {
    return LOCAL_SITE_URL;
  }

  throw new Error(
    "NEXT_PUBLIC_SITE_URL must be configured as an absolute http(s) URL in production.",
  );
}

export function resolveSiteUrlObject(): URL {
  return new URL(resolveSiteUrl());
}
