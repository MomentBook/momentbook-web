import type { Metadata } from "next";
import { redirect } from "next/navigation";
import styles from "./login.module.scss";
import { buildNoIndexRobots } from "@/lib/seo/public-metadata";
import {
  ADMIN_REVIEWS_PATH,
  sanitizeAdminPath,
} from "@/lib/admin/paths";
import { getAdminSession } from "@/lib/admin/session";
import { ADMIN_ALLOWED_EMAIL } from "@/lib/admin/config";
import { AdminLoginForm } from "./AdminLoginForm";

function readQueryParam(
  value: string | string[] | undefined,
): string | null {
  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value) && value.length > 0) {
    return value[0] ?? null;
  }

  return null;
}

function resolveLoginNotice(
  error: string | null,
  loggedOut: boolean,
): { tone: "default" | "error" | "success"; message: string } | null {
  if (loggedOut) {
    return {
      tone: "success",
      message: "The admin session was closed. Sign in again when you need to review new submissions.",
    };
  }

  switch (error) {
    case "missing_fields":
      return {
        tone: "error",
        message: "Enter both email and password to continue.",
      };
    case "invalid_credentials":
      return {
        tone: "error",
        message: "The email or password was not accepted.",
      };
    case "admin_only":
      return {
        tone: "error",
        message: `Only ${ADMIN_ALLOWED_EMAIL} can access this admin workspace.`,
      };
    case "session_expired":
      return {
        tone: "default",
        message: "The previous admin session expired. Sign in again to continue reviewing submissions.",
      };
    case "service_unavailable":
      return {
        tone: "error",
        message: "The admin service is temporarily unavailable. Try again after the backend is healthy.",
      };
    default:
      return null;
  }
}

export const metadata: Metadata = {
  title: "Admin Sign In",
  robots: buildNoIndexRobots(),
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const session = await getAdminSession();
  const resolvedSearchParams = await searchParams;
  const nextPath =
    sanitizeAdminPath(readQueryParam(resolvedSearchParams.next)) ??
    ADMIN_REVIEWS_PATH;

  if (session) {
    redirect(nextPath);
  }

  const notice = resolveLoginNotice(
    readQueryParam(resolvedSearchParams.error),
    readQueryParam(resolvedSearchParams.loggedOut) === "1",
  );

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.brand}>
          <span className={styles.eyebrow}>Internal Review Workspace</span>
          <div className={styles.logoRow}>
            <span className={styles.logoMark}>M</span>
            <span className={styles.brandName}>MomentBook</span>
          </div>
        </div>

        <div className={styles.heading}>
          <h1 className={styles.title}>Admin sign in</h1>
          <p className={styles.body}>
            Access the internal moderation workspace with the provisioned admin
            account only. The browser sends the login request directly to the
            API server, and this app stores only the encrypted admin session.
          </p>
        </div>

        {notice ? (
          <p
            className={[
              styles.notice,
              notice.tone === "error"
                ? styles.noticeError
                : notice.tone === "success"
                  ? styles.noticeSuccess
                  : "",
            ].join(" ")}
          >
            {notice.message}
          </p>
        ) : null}

        <AdminLoginForm nextPath={nextPath} />

        <p className={styles.securityNote}>
          Admin sessions are stored in an encrypted HttpOnly cookie and continue
          to renew against the backend token lifecycle while the refresh token
          remains valid.
        </p>

        <p className={styles.footer}>
          The admin workspace accepts only <strong>{ADMIN_ALLOWED_EMAIL}</strong>.
        </p>
      </section>
    </main>
  );
}
