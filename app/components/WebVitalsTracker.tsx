"use client";

import { useCallback, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useReportWebVitals } from "next/web-vitals";
import { trackAnalyticsEvent } from "@/lib/analytics/gtag";
import { getPublicPageContext, PUBLIC_WEB_EVENTS } from "@/lib/analytics/public-web";

type WebVitalsMetric = Parameters<Parameters<typeof useReportWebVitals>[0]>[0];

function roundMetricValue(metricName: WebVitalsMetric["name"], value: number) {
  return Number(value.toFixed(metricName === "CLS" ? 4 : 2));
}

export default function WebVitalsTracker() {
  const pathname = usePathname() ?? "/";
  const pageContextRef = useRef(getPublicPageContext(pathname));

  useEffect(() => {
    pageContextRef.current = getPublicPageContext(pathname);
  }, [pathname]);

  const reportMetric = useCallback((metric: WebVitalsMetric) => {
    const pageContext = pageContextRef.current;

    trackAnalyticsEvent(PUBLIC_WEB_EVENTS.webVitals, {
      route_lang: pageContext.routeLanguage,
      page_surface: pageContext.pageSurface,
      page_path: pageContext.pathname,
      page_location: window.location.href,
      metric_name: metric.name,
      metric_id: metric.id,
      metric_value: roundMetricValue(metric.name, metric.value),
      metric_delta: roundMetricValue(metric.name, metric.delta),
      metric_rating: metric.rating,
    });
  }, []);

  useReportWebVitals(reportMetric);

  return null;
}
