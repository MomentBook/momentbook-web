"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import styles from "./login.module.scss";
import { tokenStore } from "@/src/apis/instance.client";
import type { Language } from "@/lib/i18n/config";

type LoginLabels = {
  title: string;
  subtitle: string;
  emailLabel: string;
  passwordLabel: string;
  submitButton: string;
  submittingButton: string;
  backButton: string;
  invalidInput: string;
  loginFailed: string;
};

const loginLabels: Partial<Record<Language, LoginLabels>> & {
  en: LoginLabels;
  ko: LoginLabels;
} = {
  en: {
    title: "Sign in",
    subtitle: "Sign in to continue reporting this post.",
    emailLabel: "Email",
    passwordLabel: "Password",
    submitButton: "Sign in",
    submittingButton: "Signing in...",
    backButton: "Back",
    invalidInput: "Please enter a valid email and password.",
    loginFailed: "Sign-in failed. Please check your credentials.",
  },
  ko: {
    title: "로그인",
    subtitle: "게시글 신고를 계속하려면 로그인해 주세요.",
    emailLabel: "이메일",
    passwordLabel: "비밀번호",
    submitButton: "로그인",
    submittingButton: "로그인 중...",
    backButton: "뒤로",
    invalidInput: "이메일과 비밀번호를 확인해 주세요.",
    loginFailed: "로그인에 실패했습니다. 계정을 다시 확인해 주세요.",
  },
};

function sanitizeReturnUrl(rawValue: string | null, fallback: string): string {
  if (!rawValue) {
    return fallback;
  }

  if (rawValue.startsWith("/") && !rawValue.startsWith("//")) {
    return rawValue;
  }

  return fallback;
}

function getApiErrorMessage(payload: unknown): string | null {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const maybeMessage = (payload as { message?: unknown }).message;
  return typeof maybeMessage === "string" ? maybeMessage : null;
}

function LoginContent() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const resolvedLang = (params?.lang as Language) ?? "en";
  const labels = loginLabels[resolvedLang] ?? loginLabels.en;
  const fallbackReturnUrl = `/${resolvedLang}/journeys`;
  const returnUrl = sanitizeReturnUrl(
    searchParams.get("returnUrl"),
    fallbackReturnUrl,
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    if (!email.trim() || !password) {
      setErrorMessage(labels.invalidInput);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
          password,
        }),
      });

      const payload = await response.json().catch(() => null);
      if (!response.ok) {
        setErrorMessage(getApiErrorMessage(payload) ?? labels.loginFailed);
        return;
      }

      const accessToken =
        payload?.data?.accessToken ??
        payload?.data?.token ??
        payload?.accessToken ??
        null;
      tokenStore.setAccessToken(
        typeof accessToken === "string" ? accessToken : null,
      );

      router.replace(returnUrl);
    } catch {
      setErrorMessage(labels.loginFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>{labels.title}</h1>
        <p className={styles.subtitle}>{labels.subtitle}</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label className={styles.label} htmlFor="login-email">
            {labels.emailLabel}
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isSubmitting}
            required
          />

          <label className={styles.label} htmlFor="login-password">
            {labels.passwordLabel}
          </label>
          <input
            id="login-password"
            type="password"
            autoComplete="current-password"
            className={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isSubmitting}
            required
          />

          {errorMessage && (
            <p className={styles.errorMessage} role="alert">
              {errorMessage}
            </p>
          )}

          <div className={styles.actionRow}>
            <Link href={returnUrl} className={styles.backLink}>
              {labels.backButton}
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? labels.submittingButton : labels.submitButton}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className={styles.page} />}>
      <LoginContent />
    </Suspense>
  );
}
