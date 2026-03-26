import { PaginationNav } from "@/components/PaginationNav";
import { JourneyPreviewCard } from "@/components/JourneyPreviewCard";
import { LocalizedDate, LocalizedDateTimeRange } from "@/components/LocalizedTime";
import type { PaginationEntry } from "@/lib/pagination";
import type { Language } from "@/lib/i18n/config";
import type { JourneyCardViewModel } from "./journeys.helpers";
import { buildJourneyPageHref } from "./journeys.helpers";
import type { JourneyPageLabels } from "./journeys-page.helpers";
import styles from "./journeys.module.scss";

type JourneysListContentProps = {
  lang: Language;
  labels: JourneyPageLabels;
  cards: JourneyCardViewModel[];
  safeCurrentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  paginationEntries: PaginationEntry[];
};

export function JourneysListContent({
  lang,
  labels,
  cards,
  safeCurrentPage,
  hasPreviousPage,
  hasNextPage,
  paginationEntries,
}: JourneysListContentProps) {
  return (
    <>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.backdropOrbPrimary} />
        <span className={styles.backdropOrbSecondary} />
        <span className={styles.backdropLine} />
      </div>

      <header className={styles.hero}>
        <h1 className={styles.title}>
          {labels.title}
          {safeCurrentPage > 1 ? (
            <span className={styles.pageBadge}>
              {labels.pageLabel.replace("{page}", String(safeCurrentPage))}
            </span>
          ) : null}
        </h1>
        <p className={styles.subtitle}>{labels.subtitle}</p>
      </header>

      {cards.length === 0 ? (
        <div className={styles.emptyState}>{labels.empty}</div>
      ) : (
        <>
          <div className={styles.contentShell}>
            <div className={styles.grid}>
              {cards.map((card) => (
                <JourneyPreviewCard
                  key={card.publicId}
                  href={`/${lang}/journeys/${card.publicId}`}
                  variant="glimmer"
                  title={card.title}
                  description={card.description}
                  coverUrl={card.coverUrl}
                  topMeta={(
                    <>
                      {labels.publishedLabel} ·{" "}
                      <LocalizedDate
                        lang={lang}
                        timestamp={card.publishedAt}
                        fallback={labels.unknownDateLabel}
                      />
                    </>
                  )}
                  metaItems={[
                    { label: labels.photosLabel, value: card.imageCount },
                    {
                      label: labels.periodLabel,
                      value: (
                        <LocalizedDateTimeRange
                          lang={lang}
                          start={card.periodRange.start}
                          end={card.periodRange.end}
                          fallback={labels.unknownDateLabel}
                        />
                      ),
                    },
                  ]}
                  authorText={`${labels.byLabel} ${card.authorName}`}
                />
              ))}
            </div>
          </div>

          <PaginationNav
            ariaLabel="Journey list pagination"
            currentPage={safeCurrentPage}
            entries={paginationEntries}
            hasPreviousPage={hasPreviousPage}
            hasNextPage={hasNextPage}
            previousLabel={labels.previousPage}
            nextLabel={labels.nextPage}
            buildHref={(targetPage) => buildJourneyPageHref(lang, targetPage)}
            classNames={{
              nav: styles.pagination,
              button: styles.pageButton,
              buttonDisabled: styles.pageButtonDisabled,
              numbers: styles.pageNumbers,
              ellipsis: styles.pageEllipsis,
              current: styles.pageNumberCurrent,
              page: styles.pageNumber,
            }}
          />
        </>
      )}
    </>
  );
}
