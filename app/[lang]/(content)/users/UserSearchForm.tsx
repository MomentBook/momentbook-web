"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition, useEffect, useState } from "react";
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
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    setQuery(searchParams.get("q") || "");
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const q = formData.get("q") as string;

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
    setQuery(value);

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
        type="search"
        name="q"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        aria-label={placeholder}
        className={styles.searchInput}
      />
    </form>
  );
}
