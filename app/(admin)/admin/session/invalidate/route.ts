import { NextResponse } from "next/server";
import {
  ADMIN_ROOT_PATH,
  buildAdminLoginHref,
  sanitizeAdminPath,
  sanitizeAdminSessionRedirectError,
} from "@/lib/admin/paths";
import { clearAdminSession } from "@/lib/admin/session";

function buildRedirectResponse(request: Request, path: string) {
  return NextResponse.redirect(new URL(path, request.url));
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const nextPath =
    sanitizeAdminPath(requestUrl.searchParams.get("next")) ?? ADMIN_ROOT_PATH;
  const error = sanitizeAdminSessionRedirectError(
    requestUrl.searchParams.get("error"),
  );

  await clearAdminSession();

  return buildRedirectResponse(
    request,
    buildAdminLoginHref({
      next: nextPath,
      error: error ?? "session_expired",
    }),
  );
}
