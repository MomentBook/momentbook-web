import "server-only";

import { getAdminPublishedJourneysPage } from "@/lib/admin/api";
import {
  normalizeLocalDateTimeContext,
  type LocalDateTimeContext,
} from "@/lib/local-time-context";
import type {
  AdminPublishedJourneyItemDto,
  PublishedJourneyReviewDto,
} from "@/src/apis/client";

export const ADMIN_REVIEW_PAGE_SIZE = 20;
const ADMIN_REVIEW_API_PAGE_LIMIT = 50;

export type AdminReviewStatus = PublishedJourneyReviewDto["status"];
export type AdminReviewQueueStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "all";

export type AdminReviewState = {
  status: AdminReviewStatus;
  approved: boolean;
};

export type AdminReviewSummary = {
  pendingCount: number;
  approvedCount: number;
  rejectedCount: number;
};

export type AdminReviewQueueItem = {
  publicId: string;
  journeyId: string;
  userId: string;
  title: string | null;
  description: string | null;
  thumbnailUrl: string | null;
  photoCount: number;
  createdAt: string;
  publishedAt: string | null;
  published: boolean;
  visibility: "public" | "hidden";
  review: AdminReviewState;
  startedAt: number;
  endedAt: number | null;
  startedAtLocal: LocalDateTimeContext | null;
  endedAtLocal: LocalDateTimeContext | null;
  recapStage: "NONE" | "FINALIZED";
};

export type AdminReviewQueueData = {
  summary: AdminReviewSummary;
  items: AdminReviewQueueItem[];
  total: number;
  page: number;
  pages: number;
  limit: number;
  status: AdminReviewQueueStatus;
};

export type AdminReviewDetail = {
  journey: AdminReviewQueueItem;
  review: AdminReviewState;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function readText(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function normalizeJourneyMetadata(
  value: AdminPublishedJourneyItemDto["metadata"],
): {
  title: string | null;
  description: string | null;
  thumbnailUri: string | null;
} {
  if (!isRecord(value)) {
    return {
      title: null,
      description: null,
      thumbnailUri: null,
    };
  }

  return {
    title: readText(value.title),
    description: readText(value.description),
    thumbnailUri: readText(value.thumbnailUri),
  };
}

function normalizeAdminReviewItem(
  item: AdminPublishedJourneyItemDto,
): AdminReviewQueueItem {
  const metadata = normalizeJourneyMetadata(item.metadata);

  return {
    publicId: item.publicId,
    journeyId: item.journeyId,
    userId: item.userId,
    title: metadata.title,
    description: metadata.description,
    thumbnailUrl: item.thumbnailUrl ?? metadata.thumbnailUri,
    photoCount: item.photoCount,
    createdAt: item.createdAt,
    publishedAt: item.publishedAt ?? null,
    published: item.published,
    visibility: item.visibility,
    review: {
      status: item.review.status,
      approved: item.review.approved,
    },
    startedAt: item.startedAt,
    endedAt: item.endedAt ?? null,
    startedAtLocal: normalizeLocalDateTimeContext(item.startedAtLocal),
    endedAtLocal: normalizeLocalDateTimeContext(item.endedAtLocal ?? null),
    recapStage: item.recapStage,
  };
}

function matchesQueueStatus(
  item: AdminReviewQueueItem,
  status: AdminReviewQueueStatus,
): boolean {
  if (status === "all") {
    return true;
  }

  if (status === "approved") {
    return item.review.status === "APPROVED";
  }

  if (status === "rejected") {
    return item.review.status === "REJECTED";
  }

  return item.review.status === "PENDING";
}

async function readAllAdminReviewItems(
  accessToken: string,
): Promise<AdminReviewQueueItem[]> {
  const seenPublicIds = new Set<string>();
  const items: AdminReviewQueueItem[] = [];

  let page = 1;
  let totalPages = 1;

  do {
    const response = await getAdminPublishedJourneysPage({
      accessToken,
      page,
      limit: ADMIN_REVIEW_API_PAGE_LIMIT,
    });

    totalPages = Math.max(1, response.pages);

    for (const journey of response.journeys) {
      const normalized = normalizeAdminReviewItem(journey);

      if (seenPublicIds.has(normalized.publicId)) {
        continue;
      }

      seenPublicIds.add(normalized.publicId);
      items.push(normalized);
    }

    page += 1;
  } while (page <= totalPages);

  return items;
}

function buildSummary(items: AdminReviewQueueItem[]): AdminReviewSummary {
  return {
    pendingCount: items.filter((item) => item.review.status === "PENDING").length,
    approvedCount: items.filter((item) => item.review.status === "APPROVED").length,
    rejectedCount: items.filter((item) => item.review.status === "REJECTED").length,
  };
}

function buildQueue(options: {
  allItems: AdminReviewQueueItem[];
  page: number;
  limit: number;
  status: AdminReviewQueueStatus;
}): AdminReviewQueueData {
  const filteredItems = options.allItems.filter((item) =>
    matchesQueueStatus(item, options.status),
  );
  const total = filteredItems.length;
  const pages = Math.max(1, Math.ceil(total / options.limit));
  const page = Math.min(Math.max(1, options.page), pages);
  const startIndex = (page - 1) * options.limit;

  return {
    summary: buildSummary(options.allItems),
    items: filteredItems.slice(startIndex, startIndex + options.limit),
    total,
    page,
    pages,
    limit: options.limit,
    status: options.status,
  };
}

function buildDetail(
  items: AdminReviewQueueItem[],
  publicId: string | null | undefined,
): AdminReviewDetail | null {
  if (!publicId) {
    return null;
  }

  const journey = items.find((item) => item.publicId === publicId) ?? null;

  if (!journey) {
    return null;
  }

  return {
    journey,
    review: journey.review,
  };
}

export async function loadAdminReviewWorkspaceData(options: {
  accessToken: string;
  page: number;
  status: AdminReviewQueueStatus;
  limit?: number;
  publicId?: string | null;
}): Promise<{
  queue: AdminReviewQueueData;
  detail: AdminReviewDetail | null;
}> {
  const limit = Math.max(1, options.limit ?? ADMIN_REVIEW_PAGE_SIZE);
  const allItems = await readAllAdminReviewItems(options.accessToken);

  return {
    queue: buildQueue({
      allItems,
      page: options.page,
      limit,
      status: options.status,
    }),
    detail: buildDetail(allItems, options.publicId),
  };
}
