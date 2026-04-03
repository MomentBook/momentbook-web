"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import styles from "./login.module.scss";
import { ADMIN_ALLOWED_EMAIL } from "@/lib/admin/config";
import { ENV } from "@/src/configs/env.client";

type DirectLoginSuccessPayload = {
  status?: string;
  data?: {
    user?: {
      _id?: string;
      userId?: string;
      name?: string | null;
      email?: string | null;
    };
    accessToken?: string;
    refreshToken?: string;
  };
  message?: unknown;
};

type SessionBootstrapPayload = {
  status?: string;
  error?: string;
  message?: unknown;
};

function readMessage(value: unknown): string | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  }

  if (Array.isArray(value)) {
    const first = value.find((item) => typeof item === "string");
    return typeof first === "string" ? first : null;
  }

  if (value && typeof value === "object" && "message" in value) {
    return readMessage((value as { message?: unknown }).message);
  }

  return null;
}

function buildLoginEndpoint() {
  return new URL("/v2/auth/email/login", ENV.API_BASE_URL).toString();
}

function resolveDirectLoginError(
  status: number,
  payload: DirectLoginSuccessPayload | null,
) {
  const fallbackMessage =
    status === 401
      ? "Invalid password."
      : status === 403
        ? "This account cannot access admin."
        : "Service unavailable.";

  return readMessage(payload?.message) ?? fallbackMessage;
}

function resolveSessionBootstrapError(
  payload: SessionBootstrapPayload | null,
) {
  switch (payload?.error) {
    case "admin_only":
      return "This account does not have admin access.";
    case "account_not_allowed":
      return `Only ${ADMIN_ALLOWED_EMAIL} can sign in.`;
    case "invalid_tokens":
      return "Invalid token response.";
    case "server_misconfigured":
      return "Server misconfigured.";
    case "session_create_failed":
      return "Could not create session.";
    default:
      return readMessage(payload?.message) ?? "Could not create session.";
  }
}

export function AdminLoginForm({ nextPath }: { nextPath: string }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(event.currentTarget);
    const passwordValue = formData.get("password");
    const password =
      typeof passwordValue === "string" ? passwordValue.trim() : "";

    if (!password) {
      setErrorMessage("Enter password.");
      return;
    }

    setIsSubmitting(true);

    try {
      const loginResponse = await fetch(buildLoginEndpoint(), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "App-Env": String(ENV.APP_ENV ?? ""),
          "App-Is-Local": String(ENV.APP_IS_LOCAL ?? false),
        },
        body: JSON.stringify({
          email: ADMIN_ALLOWED_EMAIL,
          password,
        }),
      });

      const loginPayload = (await loginResponse.json().catch(() => null)) as
        | DirectLoginSuccessPayload
        | null;

      if (!loginResponse.ok) {
        setErrorMessage(resolveDirectLoginError(loginResponse.status, loginPayload));
        return;
      }

      if (
        loginPayload?.status !== "success" ||
        (!loginPayload.data?.user?._id &&
          !loginPayload.data?.user?.userId) ||
        !loginPayload.data.accessToken ||
        !loginPayload.data.refreshToken
      ) {
        setErrorMessage("Incomplete login response.");
        return;
      }

      const sessionResponse = await fetch("/admin/session", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: loginPayload.data.user,
          accessToken: loginPayload.data.accessToken,
          refreshToken: loginPayload.data.refreshToken,
        }),
      });

      const sessionPayload = (await sessionResponse.json().catch(() => null)) as
        | SessionBootstrapPayload
        | null;

      if (!sessionResponse.ok || sessionPayload?.status !== "success") {
        setErrorMessage(resolveSessionBootstrapError(sessionPayload));
        return;
      }

      window.location.assign(nextPath);
    } catch {
      setErrorMessage("Could not reach the API server.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <input type="hidden" name="next" value={nextPath} />

      <label className={styles.field}>
        <span className={styles.label}>Email</span>
        <input
          className={`${styles.input} ${styles.inputLocked}`}
          type="email"
          name="email"
          value={ADMIN_ALLOWED_EMAIL}
          readOnly
          aria-readonly="true"
        />
      </label>

      <label className={styles.field}>
        <span className={styles.label}>Password</span>
        <input
          className={styles.input}
          type="password"
          name="password"
          autoComplete="current-password"
          placeholder="Password"
          required
          disabled={isSubmitting}
        />
      </label>

      {errorMessage ? (
        <p className={`${styles.notice} ${styles.noticeError}`} aria-live="polite">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        className={styles.submitButton}
        disabled={isSubmitting}
      >
        {isSubmitting ? "Signing in..." : "Sign in"}
      </button>
    </form>
  );
}
