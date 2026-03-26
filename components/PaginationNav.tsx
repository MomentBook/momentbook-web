import Link from "next/link";
import type { PaginationEntry } from "@/lib/pagination";

type PaginationNavClassNames = {
  nav: string;
  button: string;
  buttonDisabled: string;
  numbers: string;
  ellipsis: string;
  current: string;
  page: string;
};

type PaginationNavProps = {
  ariaLabel: string;
  currentPage: number;
  entries: PaginationEntry[];
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  previousLabel: string;
  nextLabel: string;
  buildHref: (page: number) => string;
  classNames: PaginationNavClassNames;
};

export function PaginationNav({
  ariaLabel,
  currentPage,
  entries,
  hasPreviousPage,
  hasNextPage,
  previousLabel,
  nextLabel,
  buildHref,
  classNames,
}: PaginationNavProps) {
  return (
    <nav className={classNames.nav} aria-label={ariaLabel}>
      {hasPreviousPage ? (
        <Link className={classNames.button} href={buildHref(currentPage - 1)}>
          {previousLabel}
        </Link>
      ) : (
        <span className={classNames.buttonDisabled}>{previousLabel}</span>
      )}

      <div className={classNames.numbers}>
        {entries.map((entry) =>
          entry.type === "ellipsis" ? (
            <span
              key={entry.key}
              className={classNames.ellipsis}
              aria-hidden="true"
            >
              ...
            </span>
          ) : entry.page === currentPage ? (
            <span
              key={`page-${entry.page}`}
              className={classNames.current}
              aria-current="page"
            >
              {entry.page}
            </span>
          ) : (
            <Link
              key={`page-${entry.page}`}
              className={classNames.page}
              href={buildHref(entry.page)}
            >
              {entry.page}
            </Link>
          ),
        )}
      </div>

      {hasNextPage ? (
        <Link className={classNames.button} href={buildHref(currentPage + 1)}>
          {nextLabel}
        </Link>
      ) : (
        <span className={classNames.buttonDisabled}>{nextLabel}</span>
      )}
    </nav>
  );
}
