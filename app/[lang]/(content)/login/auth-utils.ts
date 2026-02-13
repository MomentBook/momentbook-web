export function sanitizeReturnUrl(rawValue: string | null, fallback: string): string {
  if (!rawValue) {
    return fallback;
  }

  const value = rawValue.trim();
  if (!value || value.length > 2048) {
    return fallback;
  }

  // Block control chars to avoid header/path confusion payloads.
  if (/[\u0000-\u001F\u007F]/.test(value)) {
    return fallback;
  }

  // Allow only absolute-path relative URLs, and block protocol-relative tricks.
  if (!value.startsWith("/") || value.startsWith("//") || value.startsWith("/\\")) {
    return fallback;
  }

  try {
    const parsed = new URL(value, "http://localhost");
    if (parsed.origin !== "http://localhost") {
      return fallback;
    }

    const normalized = `${parsed.pathname}${parsed.search}${parsed.hash}`;
    if (normalized.startsWith("/api/")) {
      return fallback;
    }

    return normalized;
  } catch {
    return fallback;
  }
}

export function getApiErrorMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const maybeMessage = (payload as { message?: unknown }).message;
  if (typeof maybeMessage === "string" && maybeMessage.trim().length > 0) {
    return maybeMessage;
  }

  const maybeError = (payload as { error?: unknown }).error;
  if (typeof maybeError === "string" && maybeError.trim().length > 0) {
    return maybeError;
  }

  return null;
}

export function normalizeEmailInput(value: string): string {
  return value.trim().toLowerCase();
}

export async function postJson<TPayload>(url: string, body: TPayload) {
  const response = await fetch(url, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => null);
  return { response, payload };
}
