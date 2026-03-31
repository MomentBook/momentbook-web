"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type ReactNode } from "react";
import { trackAnalyticsEvent, type AnalyticsParams } from "@/lib/analytics/gtag";
import { getPublicPageContext } from "@/lib/analytics/public-web";
import { type Language } from "@/lib/i18n/config";

type AnalyticsLinkProps = {
  href: string;
  lang: Language;
  analyticsEvent: string;
  analyticsParams?: AnalyticsParams;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
  title?: string;
  target?: string;
  rel?: string;
  prefetch?: boolean;
};

function isExternalHref(href: string) {
  return (
    href.startsWith("http://")
    || href.startsWith("https://")
    || href.startsWith("mailto:")
  );
}

export function AnalyticsLink({
  href,
  lang,
  analyticsEvent,
  analyticsParams,
  className,
  children,
  ariaLabel,
  title,
  target,
  rel,
  prefetch,
}: AnalyticsLinkProps) {
  const pathname = usePathname() ?? "/";
  const pageContext = getPublicPageContext(pathname);

  const handleClick = () => {
    trackAnalyticsEvent(analyticsEvent, {
      route_lang: lang,
      page_surface: pageContext.pageSurface,
      page_location: window.location.href,
      ...analyticsParams,
    });
  };

  if (isExternalHref(href)) {
    return (
      <a
        href={href}
        className={className}
        onClick={handleClick}
        aria-label={ariaLabel}
        title={title}
        target={target}
        rel={rel}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
      title={title}
      target={target}
      rel={rel}
      prefetch={prefetch}
    >
      {children}
    </Link>
  );
}
