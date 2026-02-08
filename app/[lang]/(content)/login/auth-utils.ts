export function sanitizeReturnUrl(rawValue: string | null, fallback: string): string {
  if (!rawValue) {
    return fallback;
  }

  if (rawValue.startsWith("/") && !rawValue.startsWith("//")) {
    return rawValue;
  }

  return fallback;
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
