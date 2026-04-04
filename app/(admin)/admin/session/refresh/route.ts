import { NextResponse } from "next/server";
import {
  ADMIN_ROOT_PATH,
  buildAdminLoginHref,
  sanitizeAdminPath,
} from "@/lib/admin/paths";
import {
  clearAdminSession,
  getStoredAdminSession,
  refreshAdminSession,
} from "@/lib/admin/session";

function buildRedirectResponse(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, request.url));
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const nextPath =
    sanitizeAdminPath(requestUrl.searchParams.get("next")) ?? ADMIN_ROOT_PATH;
  const session = await getStoredAdminSession();

  if (!session) {
    await clearAdminSession();
    return buildRedirectResponse(
      request,
      buildAdminLoginHref({
        next: nextPath,
        error: "session_expired",
      }),
    );
  }

  const refreshedSession = await refreshAdminSession(session);

  if (!refreshedSession) {
    return buildRedirectResponse(
      request,
      buildAdminLoginHref({
        next: nextPath,
        error: "session_expired",
      }),
    );
  }

  return buildRedirectResponse(request, nextPath);
}
