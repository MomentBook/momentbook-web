import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { loginAdminAction } from "@/app/(admin)/admin/actions";
import styles from "./login.module.scss";
import { buildNoIndexRobots } from "@/lib/seo/public-metadata";
import {
  ADMIN_REVIEWS_PATH,
  sanitizeAdminPath,
} from "@/lib/admin/paths";
import { getAdminSession } from "@/lib/admin/session";

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
        message: "This account can sign in, but it does not have admin review access.",
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
            Access the internal moderation workspace. Queue cards remain mock
            previews for now, but live review status updates are limited to
            internal admin accounts only.
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

        <form action={loginAdminAction} className={styles.form}>
          <input type="hidden" name="next" value={nextPath} />

          <label className={styles.field}>
            <span className={styles.label}>Email</span>
            <input
              className={styles.input}
              type="email"
              name="email"
              autoComplete="email"
              placeholder="admin@momentbook.app"
              required
            />
          </label>

          <label className={styles.field}>
            <span className={styles.label}>Password</span>
            <input
              className={styles.input}
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="Enter the provisioned admin password"
              required
            />
          </label>

          <button type="submit" className={styles.submitButton}>
            Sign in to review workspace
          </button>
        </form>

        <p className={styles.securityNote}>
          Admin sessions are stored in an encrypted HttpOnly cookie and renew
          against the backend token lifecycle while the refresh token remains valid.
        </p>

        <p className={styles.footer}>
          If you need a new admin account, provision it through the API-side
          admin role workflow before using this screen.
        </p>
      </section>
    </main>
  );
}
