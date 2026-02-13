export type PaginationEntry =
  | {
      type: "page";
      page: number;
    }
  | {
      type: "ellipsis";
      key: string;
    };

type BuildPaginationEntriesOptions = {
  includeSinglePage?: boolean;
  siblingCount?: number;
  edgeWindow?: number;
};

export function parsePositiveIntegerPage(
  value: string | string[] | undefined,
): number {
  const raw = Array.isArray(value) ? value[0] : value;
  const parsed = Number(raw);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

export function buildPaginationEntries(
  currentPage: number,
  totalPages: number,
  options?: BuildPaginationEntriesOptions,
): PaginationEntry[] {
  const includeSinglePage = options?.includeSinglePage ?? true;
  const siblingCount = Math.max(0, options?.siblingCount ?? 1);
  const edgeWindow = Math.max(1, options?.edgeWindow ?? 4);

  if (totalPages <= 1) {
    return includeSinglePage ? [{ type: "page", page: 1 }] : [];
  }

  const pages = new Set<number>([1, totalPages]);

  for (let page = currentPage - siblingCount; page <= currentPage + siblingCount; page += 1) {
    if (page > 1 && page < totalPages) {
      pages.add(page);
    }
  }

  if (currentPage <= edgeWindow) {
    for (let page = 2; page <= Math.min(totalPages - 1, edgeWindow + 1); page += 1) {
      pages.add(page);
    }
  }

  if (currentPage >= totalPages - edgeWindow + 1) {
    for (let page = Math.max(2, totalPages - edgeWindow); page <= totalPages - 1; page += 1) {
      pages.add(page);
    }
  }

  const sortedPages = [...pages].sort((a, b) => a - b);
  const entries: PaginationEntry[] = [];

  sortedPages.forEach((page, index) => {
    const previousPage = sortedPages[index - 1];

    if (index > 0 && previousPage && page - previousPage > 1) {
      entries.push({
        type: "ellipsis",
        key: `${previousPage}-${page}`,
      });
    }

    entries.push({
      type: "page",
      page,
    });
  });

  return entries;
}
