import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const redirect = vi.fn((href: string) => {
  throw new Error(`REDIRECT:${href}`);
});

const requireAdminActionSession = vi.fn();
const getStoredAdminSession = vi.fn();
const clearAdminSession = vi.fn();
const logoutAdminFromBackend = vi.fn();
const updatePublishedJourneyReviewStatus = vi.fn();

vi.mock("next/navigation", () => ({
  redirect,
}));

vi.mock("@/lib/admin/session", () => ({
  clearAdminSession,
  requireAdminActionSession,
  getStoredAdminSession,
}));

vi.mock("@/lib/admin/api", () => ({
  AdminAccessDeniedError: class AdminAccessDeniedError extends Error {},
  AdminSessionExpiredError: class AdminSessionExpiredError extends Error {},
  BackendApiError: class BackendApiError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
    }
  },
  logoutAdminFromBackend,
  updatePublishedJourneyReviewStatus,
}));

async function loadActionsModule() {
  return import("@/app/(admin)/admin/actions");
}

afterEach(() => {
  vi.clearAllMocks();
  vi.resetModules();
});

describe("updatePublishedJourneyReviewAction", () => {
  it("redirects to the success banner query after a successful review update", async () => {
    requireAdminActionSession.mockResolvedValue({
      accessToken: "admin-access-token",
    });
    updatePublishedJourneyReviewStatus.mockResolvedValue({
      publicId: "public-123",
      review: {
        status: "APPROVED",
      },
    });

    const { updatePublishedJourneyReviewAction } = await loadActionsModule();
    const formData = new FormData();
    formData.set("returnTo", "/admin/reviews/public-123");
    formData.set("targetPublicId", "public-123");
    formData.set("reviewStatus", "APPROVED");

    await expect(updatePublishedJourneyReviewAction(formData)).rejects.toThrow(
      "REDIRECT:/admin/reviews/public-123?targetPublicId=public-123&mutation=review_updated&reviewStatus=APPROVED",
    );
    expect(updatePublishedJourneyReviewStatus).toHaveBeenCalledWith({
      accessToken: "admin-access-token",
      publicId: "public-123",
      status: "APPROVED",
    });
    expect(clearAdminSession).not.toHaveBeenCalled();
    expect(redirect).toHaveBeenCalledTimes(1);
  });
});
