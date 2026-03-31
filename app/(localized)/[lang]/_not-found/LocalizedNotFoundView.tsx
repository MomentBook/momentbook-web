"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getPublicPageSurface, readRouteLanguageFromPathname } from "@/lib/analytics/public-web";
import { defaultLanguage } from "@/lib/i18n/config";
import { getNotFoundCopy } from "./not-found.copy";
import styles from "./not-found.module.scss";

type NotFoundVariant = "chrome" | "standalone";
type ActionId = "home" | "journeys" | "users";
type LinkTarget = ActionId | "support";

type LocalizedNotFoundViewProps = {
  variant: NotFoundVariant;
};

function buildLocalizedHref(lang: string, action: LinkTarget): string {
  switch (action) {
    case "journeys":
      return `/${lang}/journeys`;
    case "users":
      return `/${lang}/users`;
    case "support":
      return `/${lang}/support`;
    case "home":
    default:
      return `/${lang}`;
  }
}

function resolvePrimaryActions(surface: ReturnType<typeof getPublicPageSurface>): ActionId[] {
  if (surface === "user_detail" || surface === "users") {
    return ["users", "home"];
  }

  return ["journeys", "home"];
}

export function LocalizedNotFoundView({
  variant,
}: LocalizedNotFoundViewProps) {
  const pathname = usePathname() ?? "/";
  const router = useRouter();
  const routeLanguage = readRouteLanguageFromPathname(pathname) ?? defaultLanguage;
  const copy = getNotFoundCopy(routeLanguage);
  const surface = getPublicPageSurface(pathname);
  const primaryActions = resolvePrimaryActions(surface);

  const className = variant === "chrome"
    ? `${styles.page} ${styles.pageChrome}`
    : `${styles.page} ${styles.pageStandalone}`;

  return (
    <div className={className}>
      <section className={styles.heroSection}>
        <div className={styles.heroCard}>
          <p className={styles.eyebrow}>{copy.eyebrow}</p>
          <h1 className={styles.title}>{copy.title}</h1>
          <p className={styles.lead}>{copy.lead}</p>

          <div className={styles.primaryActions}>
            {primaryActions.map((action) => (
              <Link
                key={action}
                href={buildLocalizedHref(routeLanguage, action)}
                className={action === primaryActions[0] ? styles.primaryButton : styles.secondaryButton}
              >
                {action === "journeys"
                  ? copy.primaryJourneys
                  : action === "users"
                    ? copy.primaryUsers
                    : copy.primaryHome}
              </Link>
            ))}
          </div>

          <div className={styles.secondaryActions}>
            <button
              type="button"
              className={styles.textAction}
              onClick={() => {
                if (typeof window !== "undefined" && window.history.length > 1) {
                  router.back();
                  return;
                }

                router.push(`/${routeLanguage}`);
              }}
            >
              {copy.secondaryBack}
            </button>
            <Link href={`/${routeLanguage}/support`} className={styles.textAction}>
              {copy.secondarySupport}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
