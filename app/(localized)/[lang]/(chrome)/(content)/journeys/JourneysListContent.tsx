"use client";

import { useState } from "react";
import { JourneyPreviewCard } from "@/components/JourneyPreviewCard";
import { LocalizedDate, LocalizedDateTimeRange } from "@/components/LocalizedTime";
import { SectionReveal } from "@/components/SectionReveal";
import type { Language } from "@/lib/i18n/config";
import type { JourneyCardViewModel } from "./journeys.helpers";
import type { JourneyPageLabels } from "./journeys-page.helpers";
import { JOURNEYS_BATCH_SIZE } from "./journeys-page.helpers";
import { loadMoreJourneysAction } from "./actions";
import styles from "./journeys.module.scss";

type JourneysListContentProps = {
  lang: Language;
  labels: JourneyPageLabels;
  initialCards: JourneyCardViewModel[];
  initialPage: number;
  initialTotalJourneys: number;
  initialHasMore: boolean;
};

function mergeJourneyCards(
  currentCards: JourneyCardViewModel[],
  nextCards: JourneyCardViewModel[],
): JourneyCardViewModel[] {
  const seen = new Set(currentCards.map((card) => card.publicId));
  const merged = [...currentCards];

  nextCards.forEach((card) => {
    if (seen.has(card.publicId)) {
      return;
    }

    seen.add(card.publicId);
    merged.push(card);
  });

  return merged;
}

export function JourneysListContent({
  lang,
  labels,
  initialCards,
  initialPage,
  initialTotalJourneys,
  initialHasMore,
}: JourneysListContentProps) {
  const [cards, setCards] = useState(initialCards);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [totalJourneys, setTotalJourneys] = useState(initialTotalJourneys);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loadMoreError, setLoadMoreError] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const canLoadMore = hasMore;
  const countText = labels.countLabel.replace(
    "{count}",
    new Intl.NumberFormat(lang).format(totalJourneys),
  );

  async function handleLoadMore() {
    if (!canLoadMore || isLoadingMore) {
      return;
    }

    setLoadMoreError(null);
    setIsLoadingMore(true);

    try {
      const result = await loadMoreJourneysAction({
        lang,
        page: currentPage + 1,
        limit: JOURNEYS_BATCH_SIZE,
      });

      if (result.status !== "success") {
        setLoadMoreError(labels.loadMoreErrorLabel);
        return;
      }

      setCards((currentCards) => mergeJourneyCards(currentCards, result.cards));
      setCurrentPage(result.page);
      setTotalJourneys((currentTotal) =>
        result.total > 0 ? result.total : currentTotal,
      );
      setHasMore(result.hasMore);
    } catch {
      setLoadMoreError(labels.loadMoreErrorLabel);
    } finally {
      setIsLoadingMore(false);
    }
  }

  return (
    <>
      <div className={styles.backdrop} aria-hidden="true">
        <span className={styles.backdropOrbPrimary} />
        <span className={styles.backdropOrbSecondary} />
        <span className={styles.backdropLine} />
      </div>

      <SectionReveal as="header" className={styles.hero}>
        <h1 className={styles.title}>{labels.title}</h1>
        <p className={styles.subtitle}>{labels.subtitle}</p>
        {totalJourneys > 0 ? (
          <div className={styles.heroChips}>
            <span className={styles.heroChip}>{countText}</span>
          </div>
        ) : null}
      </SectionReveal>

      {cards.length === 0 ? (
        <SectionReveal className={styles.emptyState}>{labels.empty}</SectionReveal>
      ) : (
        <>
          <SectionReveal className={styles.contentShell}>
            <div className={styles.grid}>
              {cards.map((card, index) => (
                <SectionReveal
                  key={card.publicId}
                  variant="item"
                  staggerIndex={index}
                >
                  <JourneyPreviewCard
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
                            startContext={card.periodStartLocal}
                            endContext={card.periodEndLocal}
                            fallback={labels.unknownDateLabel}
                          />
                        ),
                      },
                    ]}
                    authorText={`${labels.byLabel} ${card.authorName}`}
                  />
                </SectionReveal>
              ))}
            </div>
          </SectionReveal>

          {loadMoreError ? (
            <SectionReveal delay={120}>
              <p className={styles.loadMoreError} role="status">
                {loadMoreError}
              </p>
            </SectionReveal>
          ) : null}

          {canLoadMore ? (
            <SectionReveal delay={120} className={styles.feedActions}>
              <button
                type="button"
                className={isLoadingMore
                  ? styles.loadMoreButtonDisabled
                  : styles.loadMoreButton}
                onClick={() => {
                  void handleLoadMore();
                }}
                disabled={isLoadingMore}
              >
                {isLoadingMore ? labels.loadingMoreLabel : labels.loadMoreLabel}
              </button>
            </SectionReveal>
          ) : null}
        </>
      )}
    </>
  );
}
