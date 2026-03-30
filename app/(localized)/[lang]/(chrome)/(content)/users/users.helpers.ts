import type { PublicUserApi } from "@/lib/public-users";
import { formatTemplate } from "@/lib/view-helpers";

export function readSearchQuery(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    for (const candidate of value) {
      if (typeof candidate !== "string") {
        continue;
      }

      const trimmed = candidate.trim();
      if (trimmed.length > 0) {
        return trimmed;
      }
    }

    return "";
  }

  if (typeof value !== "string") {
    return "";
  }

  return value.trim();
}

export function filterUsersByQuery(users: PublicUserApi[], query: string): PublicUserApi[] {
  if (query.length === 0) {
    return users;
  }

  const normalizedQuery = query.toLowerCase();

  return users.filter((user) => {
    const searchText = [user.name, user.biography]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();

    return searchText.includes(normalizedQuery);
  });
}

export function buildCountLabel(
  template: string,
  count: number,
): string {
  return formatTemplate(template, { count });
}
