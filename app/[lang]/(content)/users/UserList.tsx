"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./users.module.scss";
import { type Language } from "@/lib/i18n/config";

type UserCard = {
  userId: string;
  name: string;
  picture?: string;
  biography?: string;
  journeyCount: number;
  searchText: string;
};

type Labels = {
  searchPlaceholder: string;
  countLabel: string;
  empty: string;
  journeysLabel: string;
};

export function UserList({
  lang,
  cards,
  labels,
}: {
  lang: Language;
  cards: UserCard[];
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
            key={card.userId}
            href={`/${lang}/users/${card.userId}`}
            className={styles.card}
          >
            {card.picture && (
              <div className={styles.avatarFrame}>
                <Image
                  src={card.picture}
                  alt={card.name}
                  fill
                  sizes="120px"
                  className={styles.avatar}
                />
              </div>
            )}
            <div className={styles.cardBody}>
              <p className={styles.name}>{card.name}</p>
              {card.biography && <p className={styles.bio}>{card.biography}</p>}
              <p className={styles.meta}>
                {card.journeyCount} {labels.journeysLabel}
              </p>
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
