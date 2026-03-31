export type AnalyticsEventValue = string | number | boolean;

export type AnalyticsParams = Record<string, AnalyticsEventValue | null | undefined>;

type GtagFunction = (
  command: "event",
  eventName: string,
  params?: Record<string, AnalyticsEventValue>,
) => void;

declare global {
  interface Window {
    gtag?: GtagFunction;
  }
}

export function trackAnalyticsEvent(eventName: string, params: AnalyticsParams = {}) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  const sanitizedParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== null),
  ) as Record<string, AnalyticsEventValue>;

  window.gtag("event", eventName, sanitizedParams);
}
