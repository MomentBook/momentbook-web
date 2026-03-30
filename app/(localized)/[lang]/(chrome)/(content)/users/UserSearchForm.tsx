"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useTransition } from "react";
import styles from "./users.module.scss";

export function UserSearchForm({
  lang,
  placeholder,
  submitLabel,
}: {
  lang: string;
  placeholder: string;
  submitLabel: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const defaultQuery = searchParams.get("q") || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = inputRef.current?.value ?? "";

    startTransition(() => {
      if (q.trim()) {
        router.push(`/${lang}/users?q=${encodeURIComponent(q.trim())}`);
      } else {
        router.push(`/${lang}/users`);
      }
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.trim() === "") {
      startTransition(() => {
        router.push(`/${lang}/users`);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <div className={styles.searchField}>
        <svg
          className={styles.searchIcon}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0a7 7 0 0 1 14 0Z"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </svg>

        <input
          key={defaultQuery}
          ref={inputRef}
          type="search"
          name="q"
          defaultValue={defaultQuery}
          onChange={handleChange}
          placeholder={placeholder}
          aria-label={placeholder}
          className={styles.searchInput}
          disabled={isPending}
        />
      </div>

      <button
        type="submit"
        className={`${styles.searchButton} ${isPending ? styles.searchButtonPending : ""}`.trim()}
        disabled={isPending}
      >
        {submitLabel}
      </button>
    </form>
  );
}
