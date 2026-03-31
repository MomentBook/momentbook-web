"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { getPublicPageSurface, readRouteLanguageFromPathname } from "@/lib/analytics/public-web";
import { defaultLanguage } from "@/lib/i18n/config";
import { getNotFoundCopy } from "./not-found.copy";
import styles from "./not-found.module.scss";

type NotFoundVariant = "chrome" | "standalone";
type ActionId = "home" | "journeys" | "users";
type CardId = "journeys" | "users" | "support";

type LocalizedNotFoundViewProps = {
  variant: NotFoundVariant;
};

function buildLocalizedHref(lang: string, action: ActionId | CardId): string {
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

function resolveHighlightedCard(surface: ReturnType<typeof getPublicPageSurface>): CardId {
  if (surface === "user_detail" || surface === "users") {
    return "users";
  }

  return "journeys";
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
  const highlightedCard = resolveHighlightedCard(surface);

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

          <ul className={styles.reasonList}>
            <li>{copy.reasonTyped}</li>
            <li>{copy.reasonSearch}</li>
            <li>{copy.reasonRecovery}</li>
          </ul>

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
            <Link href={`/${routeLanguage}/faq`} className={styles.textAction}>
              {copy.secondaryFaq}
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.recoverySection} aria-label={copy.reasonRecovery}>
        <div className={styles.cardGrid}>
          <article
            className={`${styles.recoveryCard} ${highlightedCard === "journeys" ? styles.recoveryCardFeatured : ""}`}
          >
            <h2 className={styles.cardTitle}>{copy.cards.journeys.title}</h2>
            <p className={styles.cardDescription}>{copy.cards.journeys.description}</p>
            <Link href={`/${routeLanguage}/journeys`} className={styles.cardLink}>
              {copy.cards.journeys.cta}
            </Link>
          </article>

          <article
            className={`${styles.recoveryCard} ${highlightedCard === "users" ? styles.recoveryCardFeatured : ""}`}
          >
            <h2 className={styles.cardTitle}>{copy.cards.users.title}</h2>
            <p className={styles.cardDescription}>{copy.cards.users.description}</p>
            <Link href={`/${routeLanguage}/users`} className={styles.cardLink}>
              {copy.cards.users.cta}
            </Link>
          </article>

          <article className={styles.recoveryCard}>
            <h2 className={styles.cardTitle}>{copy.cards.support.title}</h2>
            <p className={styles.cardDescription}>{copy.cards.support.description}</p>
            <Link href={`/${routeLanguage}/support`} className={styles.cardLink}>
              {copy.cards.support.cta}
            </Link>
          </article>
        </div>
      </section>
    </div>
  );
}
