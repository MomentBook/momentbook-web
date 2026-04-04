import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const getAdminPublishedJourneysPage = vi.fn();

vi.mock("@/lib/admin/api", () => ({
  getAdminPublishedJourneysPage,
}));

function createAdminJourney(
  overrides: Record<string, unknown> = {},
) {
  return {
    publicId: "public-1",
    journeyId: "journey-1",
    userId: "user-1",
    startedAt: Date.parse("2026-04-01T00:00:00.000Z"),
    endedAt: Date.parse("2026-04-01T02:00:00.000Z"),
    startedAtLocal: null,
    endedAtLocal: null,
    recapStage: "FINALIZED",
    photoCount: 12,
    imageCount: 12,
    thumbnailUrl: undefined,
    metadata: undefined,
    publishedAt: "2026-04-02T00:00:00.000Z",
    createdAt: "2026-04-01T23:00:00.000Z",
    published: true,
    visibility: "public",
    review: {
      status: "PENDING",
      approved: false,
    },
    ...overrides,
  };
}

function createAdminPage(
  page: number,
  pages: number,
  journeys: Array<Record<string, unknown>>,
) {
  return {
    journeys,
    total: journeys.length,
    page,
    pages,
    limit: 50,
    hasMore: page < pages,
  };
}

async function loadAdminReviewsModule() {
  return import("@/lib/admin/reviews");
}

afterEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe("loadAdminReviewWorkspaceData", () => {
  it("normalizes legacy metadata aliases and keeps detail lookup independent from the active filter", async () => {
    getAdminPublishedJourneysPage
      .mockResolvedValueOnce(
        createAdminPage(1, 2, [
          createAdminJourney({
            publicId: "pending-1",
            thumbnailUrl: "",
            metadata: {
              journeyTitle: "Legacy title",
              summary: "Legacy summary",
              thumbnailUri: "https://images.example.com/legacy.jpg",
            },
          }),
          createAdminJourney({
            publicId: "approved-1",
            journeyId: "journey-2",
            userId: "user-2",
            metadata: {
              title: "Approved title",
              description: "Approved description",
            },
            review: {
              status: "APPROVED",
              approved: true,
            },
          }),
        ]),
      )
      .mockResolvedValueOnce(
        createAdminPage(2, 2, [
          createAdminJourney({
            publicId: "rejected-1",
            journeyId: "journey-3",
            userId: "user-3",
            review: {
              status: "REJECTED",
              approved: false,
            },
          }),
        ]),
      );

    const { loadAdminReviewWorkspaceData } = await loadAdminReviewsModule();
    const result = await loadAdminReviewWorkspaceData({
      accessToken: "admin-token",
      page: 1,
      status: "pending",
      limit: 20,
      publicId: "approved-1",
    });

    expect(getAdminPublishedJourneysPage).toHaveBeenCalledTimes(2);
    expect(result.queue.total).toBe(1);
    expect(result.queue.items).toHaveLength(1);
    expect(result.queue.items[0]).toMatchObject({
      publicId: "pending-1",
      title: "Legacy title",
      description: "Legacy summary",
      thumbnailUrl: "https://images.example.com/legacy.jpg",
    });
    expect(result.detail?.journey.publicId).toBe("approved-1");
    expect(result.detail?.review.status).toBe("APPROVED");
  });

  it("builds summary counts from the full dataset and paginates the filtered queue", async () => {
    getAdminPublishedJourneysPage
      .mockResolvedValueOnce(
        createAdminPage(1, 2, [
          createAdminJourney({
            publicId: "pending-1",
          }),
          createAdminJourney({
            publicId: "approved-1",
            review: {
              status: "APPROVED",
              approved: true,
            },
          }),
        ]),
      )
      .mockResolvedValueOnce(
        createAdminPage(2, 2, [
          createAdminJourney({
            publicId: "approved-2",
            journeyId: "journey-3",
            review: {
              status: "APPROVED",
              approved: true,
            },
          }),
          createAdminJourney({
            publicId: "rejected-1",
            journeyId: "journey-4",
            review: {
              status: "REJECTED",
              approved: false,
            },
          }),
        ]),
      );

    const { loadAdminReviewWorkspaceData } = await loadAdminReviewsModule();
    const result = await loadAdminReviewWorkspaceData({
      accessToken: "admin-token",
      page: 2,
      status: "approved",
      limit: 1,
    });

    expect(result.queue.summary).toEqual({
      pendingCount: 1,
      approvedCount: 2,
      rejectedCount: 1,
    });
    expect(result.queue.total).toBe(2);
    expect(result.queue.pages).toBe(2);
    expect(result.queue.page).toBe(2);
    expect(result.queue.items).toHaveLength(1);
    expect(result.queue.items[0]?.publicId).toBe("approved-2");
  });
});
