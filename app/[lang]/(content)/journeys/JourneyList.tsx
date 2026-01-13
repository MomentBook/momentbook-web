"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./journeys.module.scss";
import { type Language } from "@/lib/i18n/config";

type JourneyCard = {
  journeyId: string;
  title: string;
  description: string;
  coverUrl: string;
  coverAlt: string;
  highlights: string[];
  userName: string;
  userHandle: string;
  meta: string;
  searchText: string;
};

type Labels = {
  searchPlaceholder: string;
  countLabel: string;
  empty: string;
  byLabel: string;
};

export function JourneyList({
  lang,
  cards,
  labels,
}: {
  lang: Language;
  cards: JourneyCard[];
  labels: Labels;
}) {
  const [query, setQuery] = useState("");

  const filteredCards = useMemo(() => {
    const keyword = query.trim().toLowerCase();
    if (!keyword) {
      return cards;
    }

    return cards.filter((card) => card.searchText.toLowerCase().includes(keyword));
  }, [cards, query]);

  const countText = labels.countLabel.replace("{count}", String(filteredCards.length));

  return (
    <div className={styles.listSection}>
      <div className={styles.searchRow}>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={labels.searchPlaceholder}
          aria-label={labels.searchPlaceholder}
          className={styles.searchInput}
        />
        <p className={styles.countText}>{countText}</p>
      </div>

      <div className={styles.grid}>
        {filteredCards.map((card) => (
          <Link
            key={card.journeyId}
            href={`/${lang}/journeys/${card.journeyId}`}
            className={styles.card}
          >
            <div className={styles.cover}>
              {card.coverUrl ? (
                <Image
                  src={card.coverUrl}
                  alt={card.coverAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.coverImage}
                />
              ) : (
                <div className={styles.coverFallback}>MomentBook</div>
              )}
            </div>
            <div className={styles.cardBody}>
              <p className={styles.cardTitle}>{card.title}</p>
              <p className={styles.cardDescription}>{card.description}</p>
              <div className={styles.cardMeta}>
                <span>{card.meta}</span>
                {card.userName && (
                  <span>
                    {labels.byLabel} {card.userName}
                  </span>
                )}
              </div>
              {card.highlights.length > 0 && (
                <div className={styles.highlightRow}>
                  {card.highlights.slice(0, 3).map((highlight) => (
                    <span key={highlight} className={styles.highlightTag}>
                      {highlight}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className={styles.emptyState}>{labels.empty}</div>
      )}
    </div>
  );
}
