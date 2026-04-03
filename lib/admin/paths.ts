export const ADMIN_ROOT_PATH = "/admin";
export const ADMIN_LOGIN_PATH = "/admin/login";
export const ADMIN_REVIEWS_PATH = "/admin/reviews";
export const ADMIN_DEFAULT_WORKSPACE_TAB = "overview";

export type AdminWorkspaceTab = "overview" | "reviews";

function buildUrl(path: string): URL {
  return new URL(path, "https://momentbook.admin.local");
}

export function sanitizeAdminPath(
  value: string | null | undefined,
): string | null {
  if (!value) {
    return null;
  }

  try {
    const url = buildUrl(value);
    if (!url.pathname.startsWith(ADMIN_ROOT_PATH)) {
      return null;
    }

    return `${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

export function buildAdminLoginHref(options?: {
  next?: string | null;
  error?: string | null;
  loggedOut?: boolean;
}): string {
  const url = buildUrl(ADMIN_LOGIN_PATH);
  const next = sanitizeAdminPath(options?.next);

  if (next && next !== ADMIN_ROOT_PATH) {
    url.searchParams.set("next", next);
  }

  if (options?.error) {
    url.searchParams.set("error", options.error);
  }

  if (options?.loggedOut) {
    url.searchParams.set("loggedOut", "1");
  }

  return `${url.pathname}${url.search}`;
}

export function withAdminQuery(
  path: string,
  entries: Record<string, string | null | undefined>,
): string {
  const url = buildUrl(path);

  for (const [key, value] of Object.entries(entries)) {
    if (!value) {
      url.searchParams.delete(key);
      continue;
    }

    url.searchParams.set(key, value);
  }

  return `${url.pathname}${url.search}`;
}

export function parseAdminWorkspaceTab(
  value: string | null | undefined,
): AdminWorkspaceTab {
  if (value === "reviews" || value === "live") {
    return "reviews";
  }

  if (value === "overview") {
    return value;
  }

  return ADMIN_DEFAULT_WORKSPACE_TAB;
}

export function buildAdminWorkspaceHref(
  tab: AdminWorkspaceTab,
  entries?: Record<string, string | null | undefined>,
): string {
  return withAdminQuery(ADMIN_ROOT_PATH, {
    ...entries,
    tab: tab === ADMIN_DEFAULT_WORKSPACE_TAB ? null : tab,
  });
}

export function buildAdminReviewDetailHref(
  publicId: string,
  entries?: Record<string, string | null | undefined>,
): string {
  return withAdminQuery(
    `${ADMIN_REVIEWS_PATH}/${encodeURIComponent(publicId)}`,
    entries ?? {},
  );
}
