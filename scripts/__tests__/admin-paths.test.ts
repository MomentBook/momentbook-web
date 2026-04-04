import { describe, expect, it } from "vitest";
import {
  buildAdminSessionInvalidateHref,
  buildAdminSessionRefreshHref,
} from "@/lib/admin/paths";

describe("admin session paths", () => {
  it("builds a refresh path with a sanitized admin return target", () => {
    expect(
      buildAdminSessionRefreshHref({
        next: "/admin?tab=reviews&page=2",
      }),
    ).toBe("/admin/session/refresh?next=%2Fadmin%3Ftab%3Dreviews%26page%3D2");
  });

  it("drops non-admin refresh targets", () => {
    expect(
      buildAdminSessionRefreshHref({
        next: "https://example.com/phish",
      }),
    ).toBe("/admin/session/refresh");
  });

  it("builds an invalidate path with a whitelisted error code", () => {
    expect(
      buildAdminSessionInvalidateHref({
        next: "/admin/reviews/public-1",
        error: "admin_access_denied",
      }),
    ).toBe(
      "/admin/session/invalidate?next=%2Fadmin%2Freviews%2Fpublic-1&error=admin_access_denied",
    );
  });
});
