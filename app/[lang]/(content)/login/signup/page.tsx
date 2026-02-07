"use client";

import { Suspense, useState, type FormEvent } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import styles from "../auth.module.scss";
import {
  getApiErrorMessage,
  normalizeEmailInput,
  postJson,
  sanitizeReturnUrl,
} from "../auth-utils";
import type { Language } from "@/lib/i18n/config";

type SignupLabels = {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  passwordLabel: string;
  passwordConfirmLabel: string;
  codeLabel: string;
  sendCode: string;
  sendingCode: string;
  verifyCode: string;
  verifyingCode: string;
  submit: string;
  submitting: string;
  invalidInput: string;
  passwordMismatch: string;
  verificationRequired: string;
  signupFailed: string;
  codeSentNotice: string;
  codeVerifiedNotice: string;
  loginHint: string;
  loginLink: string;
};

const labelsMap: Partial<Record<Language, SignupLabels>> & {
  en: SignupLabels;
  ko: SignupLabels;
} = {
  en: {
    title: "Create account",
    subtitle: "Use your email and complete verification once.",
    nameLabel: "Name",
    emailLabel: "Email",
    passwordLabel: "Password",
    passwordConfirmLabel: "Confirm password",
    codeLabel: "Verification code",
    sendCode: "Send code",
    sendingCode: "Sending...",
    verifyCode: "Verify code",
    verifyingCode: "Verifying...",
    submit: "Create account",
    submitting: "Creating...",
    invalidInput: "Please fill in all required fields.",
    passwordMismatch: "Passwords do not match.",
    verificationRequired: "Please verify your email first.",
    signupFailed: "Sign-up failed. Please review your information.",
    codeSentNotice: "Verification code was sent.",
    codeVerifiedNotice: "Email verification completed.",
    loginHint: "Already have an account?",
    loginLink: "Sign in",
  },
  ko: {
    title: "회원가입",
    subtitle: "이메일 인증 후 계정을 생성할 수 있습니다.",
    nameLabel: "이름",
    emailLabel: "이메일",
    passwordLabel: "비밀번호",
    passwordConfirmLabel: "비밀번호 확인",
    codeLabel: "인증 코드",
    sendCode: "코드 발송",
    sendingCode: "발송 중...",
    verifyCode: "코드 확인",
    verifyingCode: "확인 중...",
    submit: "계정 만들기",
    submitting: "생성 중...",
    invalidInput: "필수 항목을 입력해 주세요.",
    passwordMismatch: "비밀번호가 일치하지 않습니다.",
    verificationRequired: "먼저 이메일 인증을 완료해 주세요.",
    signupFailed: "회원가입에 실패했습니다. 입력값을 확인해 주세요.",
    codeSentNotice: "인증 코드를 보냈습니다.",
    codeVerifiedNotice: "이메일 인증이 완료되었습니다.",
    loginHint: "이미 계정이 있나요?",
    loginLink: "로그인",
  },
};

function SignupContent() {
  const router = useRouter();
  const params = useParams<{ lang: string }>();
  const searchParams = useSearchParams();

  const resolvedLang = (params?.lang as Language) ?? "en";
  const labels = labelsMap[resolvedLang] ?? labelsMap.en;

  const fallbackReturnUrl = `/${resolvedLang}/journeys`;
  const returnUrl = sanitizeReturnUrl(
    searchParams.get("returnUrl"),
    fallbackReturnUrl,
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [code, setCode] = useState("");
  const [verificationToken, setVerificationToken] = useState<string | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [noticeMessage, setNoticeMessage] = useState<string | null>(null);

  const [isSendingCode, setIsSendingCode] = useState(false);
  const [isVerifyingCode, setIsVerifyingCode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clearFeedback = () => {
    setErrorMessage(null);
    setNoticeMessage(null);
  };

  const handleSendCode = async () => {
    if (isSendingCode) {
      return;
    }

    if (!email.trim()) {
      setErrorMessage(labels.invalidInput);
      return;
    }

    const normalizedEmail = normalizeEmailInput(email);

    clearFeedback();
    setVerificationToken(null);
    setIsSendingCode(true);

    try {
      const { response, payload } = await postJson(
        "/api/auth/email/send-verification",
        { email: normalizedEmail },
      );

      if (!response.ok) {
        setErrorMessage(getApiErrorMessage(payload) ?? labels.signupFailed);
        return;
      }

      setNoticeMessage(labels.codeSentNotice);
    } catch {
      setErrorMessage(labels.signupFailed);
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleVerifyCode = async () => {
    if (isVerifyingCode) {
      return;
    }

    if (!email.trim() || !code.trim()) {
      setErrorMessage(labels.invalidInput);
      return;
    }

    const normalizedEmail = normalizeEmailInput(email);

    clearFeedback();
    setIsVerifyingCode(true);

    try {
      const { response, payload } = await postJson("/api/auth/email/verify-code", {
        email: normalizedEmail,
        code: code.trim(),
      });

      if (!response.ok) {
        setErrorMessage(getApiErrorMessage(payload) ?? labels.signupFailed);
        return;
      }

      const token = payload?.data?.verificationToken;
      if (typeof token !== "string" || token.length < 8) {
        setErrorMessage(labels.signupFailed);
        return;
      }

      setVerificationToken(token);
      setNoticeMessage(labels.codeVerifiedNotice);
    } catch {
      setErrorMessage(labels.signupFailed);
    } finally {
      setIsVerifyingCode(false);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !passwordConfirm
    ) {
      setErrorMessage(labels.invalidInput);
      return;
    }

    const normalizedEmail = normalizeEmailInput(email);

    if (password !== passwordConfirm) {
      setErrorMessage(labels.passwordMismatch);
      return;
    }

    if (!verificationToken) {
      setErrorMessage(labels.verificationRequired);
      return;
    }

    clearFeedback();
    setIsSubmitting(true);

    try {
      const { response, payload } = await postJson("/api/auth/email/signup", {
        name: name.trim(),
        email: normalizedEmail,
        password,
        verificationToken,
      });

      if (!response.ok) {
        setErrorMessage(getApiErrorMessage(payload) ?? labels.signupFailed);
        return;
      }

      const signInResult = await signIn("credentials", {
        email: normalizedEmail,
        password,
        callbackUrl: returnUrl,
        redirect: false,
      });

      if (!signInResult || signInResult.error) {
        setErrorMessage(labels.signupFailed);
        return;
      }

      router.replace(returnUrl);
    } catch {
      setErrorMessage(labels.signupFailed);
    } finally {
      setIsSubmitting(false);
    }
  };

  const loginHref = `/${resolvedLang}/login?returnUrl=${encodeURIComponent(returnUrl)}`;

  return (
    <div className={styles.page}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h1 className={styles.title}>{labels.title}</h1>
          <p className={styles.subtitle}>{labels.subtitle}</p>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="signup-name" className={styles.label}>
            {labels.nameLabel}
          </label>
          <input
            id="signup-name"
            className={styles.input}
            type="text"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            disabled={isSubmitting}
            required
          />

          <label htmlFor="signup-email" className={styles.label}>
            {labels.emailLabel}
          </label>
          <div className={styles.inlineRow}>
            <input
              id="signup-email"
              className={styles.input}
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
              required
            />
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleSendCode}
              disabled={isSubmitting || isSendingCode}
            >
              {isSendingCode ? labels.sendingCode : labels.sendCode}
            </button>
          </div>

          <label htmlFor="signup-code" className={styles.label}>
            {labels.codeLabel}
          </label>
          <div className={styles.inlineRow}>
            <input
              id="signup-code"
              className={styles.input}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              disabled={isSubmitting}
              required
            />
            <button
              type="button"
              className={styles.secondaryButton}
              onClick={handleVerifyCode}
              disabled={isSubmitting || isVerifyingCode}
            >
              {isVerifyingCode ? labels.verifyingCode : labels.verifyCode}
            </button>
          </div>

          <label htmlFor="signup-password" className={styles.label}>
            {labels.passwordLabel}
          </label>
          <input
            id="signup-password"
            className={styles.input}
            type="password"
            autoComplete="new-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            disabled={isSubmitting}
            required
          />

          <label htmlFor="signup-password-confirm" className={styles.label}>
            {labels.passwordConfirmLabel}
          </label>
          <input
            id="signup-password-confirm"
            className={styles.input}
            type="password"
            autoComplete="new-password"
            value={passwordConfirm}
            onChange={(event) => setPasswordConfirm(event.target.value)}
            disabled={isSubmitting}
            required
          />

          {errorMessage ? (
            <p role="alert" className={styles.errorMessage}>
              {errorMessage}
            </p>
          ) : null}

          {noticeMessage ? (
            <p role="status" className={styles.noticeMessage}>
              {noticeMessage}
            </p>
          ) : null}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? labels.submitting : labels.submit}
          </button>
        </form>

        <p className={styles.footnote}>
          {labels.loginHint}{" "}
          <Link href={loginHref} className={styles.linkStrong}>
            {labels.loginLink}
          </Link>
        </p>
      </section>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={<div className={styles.page} />}>
      <SignupContent />
    </Suspense>
  );
}
