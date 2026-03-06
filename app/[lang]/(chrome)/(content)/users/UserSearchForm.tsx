"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef, useTransition } from "react";
import styles from "./users.module.scss";

export function UserSearchForm({
  lang,
  placeholder,
}: {
  lang: string;
  placeholder: string;
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

    // Debounced auto-search (optional)
    if (value.trim() === "") {
      startTransition(() => {
        router.push(`/${lang}/users`);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
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
    </form>
  );
}
