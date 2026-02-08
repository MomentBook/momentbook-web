"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import styles from "./ReportJourneyButton.module.scss";
import { api } from "@/src/apis/instance.client";
import type { CreateReportDto } from "@/src/apis/client";
import type { Language } from "@/lib/i18n/config";

type ReportReason = CreateReportDto["reason"];
type FeedbackType = "success" | "error" | "info";
type AuthStatus = "unknown" | "member" | "guest" | "unauthenticated";

type ReportJourneyButtonProps = {
  publicId: string;
  lang: Language;
  ownerUserId?: string | null;
  variant?: "detail" | "card" | "quiet";
  wrapperClassName?: string;
  triggerClassName?: string;
  feedbackClassName?: string;
};

type ReportLabels = {
  reportButton: string;
  modalTitle: string;
  reasonLabel: string;
  descriptionLabel: string;
  descriptionPlaceholder: string;
  cancelButton: string;
  submitButton: string;
  submittingButton: string;
  closeButton: string;
  loadingAuth: string;
  otherDescriptionRequired: string;
  success: string;
  duplicate: string;
  forbidden: string;
  ownPost: string;
  badRequest: string;
  notFound: string;
  unknownError: string;
  reasonLabels: Record<ReportReason, string>;
};

const reportLabels: Partial<Record<Language, ReportLabels>> & {
  en: ReportLabels;
  ko: ReportLabels;
} = {
  en: {
    reportButton: "Report",
    modalTitle: "Report this post",
    reasonLabel: "Reason",
    descriptionLabel: "Details",
    descriptionPlaceholder: "Please describe the issue.",
    cancelButton: "Cancel",
    submitButton: "Submit report",
    submittingButton: "Submitting...",
    closeButton: "Close",
    loadingAuth: "Checking account...",
    otherDescriptionRequired: "Please provide details for 'Other'.",
    success: "Report submitted successfully.",
    duplicate: "You have already reported this post.",
    forbidden:
      "You do not have permission to report or exceeded daily report limit.",
    ownPost: "You cannot report your own post.",
    badRequest: "Invalid input. Please review the report reason.",
    notFound: "Post not found.",
    unknownError: "Failed to submit report. Please try again.",
    reasonLabels: {
      spam: "Spam",
      abuse: "Abuse",
      hate: "Hate",
      sexual: "Sexual content",
      inappropriate: "Inappropriate",
      other: "Other",
    },
  },
  ko: {
    reportButton: "신고",
    modalTitle: "게시글 신고",
    reasonLabel: "신고 사유",
    descriptionLabel: "상세 설명",
    descriptionPlaceholder: "문제가 되는 내용을 입력해 주세요.",
    cancelButton: "취소",
    submitButton: "신고 접수",
    submittingButton: "접수 중...",
    closeButton: "닫기",
    loadingAuth: "로그인 상태 확인 중...",
    otherDescriptionRequired:
      "기타 사유를 선택한 경우 상세 설명을 입력해 주세요.",
    success: "신고가 접수되었습니다",
    duplicate: "이미 신고한 게시글입니다",
    forbidden: "신고 권한이 없거나 일일 신고 횟수를 초과했습니다",
    ownPost: "자신의 게시글은 신고할 수 없습니다",
    badRequest: "입력값이 올바르지 않습니다. 다시 확인해 주세요.",
    notFound: "게시글을 찾을 수 없습니다",
    unknownError: "신고 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    reasonLabels: {
      spam: "스팸",
      abuse: "욕설/괴롭힘",
      hate: "혐오 표현",
      sexual: "성적 콘텐츠",
      inappropriate: "부적절한 콘텐츠",
      other: "기타",
    },
  },
};

const reasonOrder: ReportReason[] = [
  "spam",
  "abuse",
  "hate",
  "sexual",
  "inappropriate",
  "other",
];

const reportIntentFlag = "report";
const reportIntentTarget = "reportTarget";

function getStatusCode(error: unknown): number | null {
  if (!error || typeof error !== "object") {
    return null;
  }

  const maybeStatus = (error as { status?: unknown }).status;
  return typeof maybeStatus === "number" ? maybeStatus : null;
}

function getErrorMessage(error: unknown): string | null {
  if (!error || typeof error !== "object") {
    return null;
  }

  const messageFromRoot = (error as { message?: unknown }).message;
  if (typeof messageFromRoot === "string") {
    return messageFromRoot;
  }

  const messageFromError = (
    error as { error?: { message?: unknown } }
  ).error?.message;
  if (typeof messageFromError === "string") {
    return messageFromError;
  }
  if (Array.isArray(messageFromError) && typeof messageFromError[0] === "string") {
    return messageFromError[0];
  }

  return null;
}

function isOwnPostError(message: string | null): boolean {
  if (!message) {
    return false;
  }

  const normalized = message.toLowerCase();
  return (
    message.includes("자신의 게시글") ||
    normalized.includes("cannot report your own") ||
    normalized.includes("own post")
  );
}

function getFocusableElements(root: HTMLElement): HTMLElement[] {
  const selectors = [
    "button:not([disabled])",
    "[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ];

  return Array.from(
    root.querySelectorAll<HTMLElement>(selectors.join(",")),
  ).filter((element) => !element.hasAttribute("disabled"));
}

function ReportJourneyButtonInner({
  publicId,
  lang,
  ownerUserId,
  variant = "detail",
  wrapperClassName,
  triggerClassName,
  feedbackClassName,
}: ReportJourneyButtonProps) {
  const { data: session } = useSession();
  const labels = useMemo(() => reportLabels[lang] ?? reportLabels.en, [lang]);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const intentHandledRef = useRef(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason>("spam");
  const [description, setDescription] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthStatus>("unknown");
  const [viewerUserId, setViewerUserId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: FeedbackType;
    message: string;
  } | null>(null);

  const isBusy = isCheckingAuth || isSubmitting;
  const sessionUserId = session?.user?.id ?? null;

  const isOwnPostById = useCallback(
    (candidateUserId?: string | null) => {
      if (!ownerUserId || !candidateUserId) {
        return false;
      }
      return ownerUserId === candidateUserId;
    },
    [ownerUserId],
  );

  const hideTrigger = isOwnPostById(sessionUserId) || isOwnPostById(viewerUserId);

  const buildReturnUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(reportIntentFlag, "1");
    params.set(reportIntentTarget, publicId);
    const query = params.toString();
    return `${pathname}${query ? `?${query}` : ""}`;
  }, [pathname, publicId, searchParams]);

  const clearIntentQuery = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(reportIntentFlag);
    params.delete(reportIntentTarget);
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [pathname, router, searchParams]);

  const goToLogin = useCallback(() => {
    const returnUrl = buildReturnUrl();
    router.push(`/${lang}/login?returnUrl=${encodeURIComponent(returnUrl)}`);
  }, [buildReturnUrl, lang, router]);

  const closeModal = useCallback(() => {
    if (isSubmitting) {
      return;
    }
    setIsOpen(false);
  }, [isSubmitting]);

  const resolveAuthStatus = useCallback(
    async (): Promise<{ status: AuthStatus; userId: string | null }> => {
    if (authStatus !== "unknown") {
      return { status: authStatus, userId: viewerUserId };
    }

    try {
      const profileResponse = await api.v2.usersControllerGetMyProfile();
      const user = profileResponse.data?.data;
      const userId = typeof user?._id === "string" ? user._id : null;
      const isGuest = user?.isGuest === true || user?.provider === "anonymous";
      const resolved = isGuest ? "guest" : "member";
      setViewerUserId(userId);
      setAuthStatus(resolved);
      return { status: resolved, userId };
    } catch (error) {
      const statusCode = getStatusCode(error);
      if (statusCode === 401 || statusCode === 403) {
        setViewerUserId(null);
        setAuthStatus("unauthenticated");
        return { status: "unauthenticated", userId: null };
      }

      throw error;
    }
    },
    [authStatus, viewerUserId],
  );

  const verifyAndOpen = useCallback(async () => {
    if (isBusy) {
      return;
    }

    setFeedback(null);
    setIsCheckingAuth(true);
    try {
      const { status, userId } = await resolveAuthStatus();
      const resolvedViewerId = userId ?? sessionUserId;
      if (status === "member" && isOwnPostById(resolvedViewerId)) {
        setFeedback({ type: "error", message: labels.ownPost });
        return;
      }
      if (status === "member") {
        setIsOpen(true);
        return;
      }
      goToLogin();
    } catch {
      setFeedback({ type: "error", message: labels.unknownError });
    } finally {
      setIsCheckingAuth(false);
    }
  }, [
    goToLogin,
    isBusy,
    isOwnPostById,
    labels.ownPost,
    labels.unknownError,
    resolveAuthStatus,
    sessionUserId,
  ]);

  useEffect(() => {
    const shouldOpenFromIntent =
      searchParams.get(reportIntentFlag) === "1" &&
      searchParams.get(reportIntentTarget) === publicId;

    if (!shouldOpenFromIntent || intentHandledRef.current) {
      return;
    }

    intentHandledRef.current = true;

    const openFromIntent = async () => {
      setIsCheckingAuth(true);
      try {
        const { status, userId } = await resolveAuthStatus();
        if (status === "member") {
          if (isOwnPostById(userId ?? sessionUserId)) {
            setFeedback({ type: "error", message: labels.ownPost });
            clearIntentQuery();
            return;
          }
          setIsOpen(true);
          clearIntentQuery();
        }
      } catch {
        setFeedback({ type: "error", message: labels.unknownError });
      } finally {
        setIsCheckingAuth(false);
      }
    };

    void openFromIntent();
  }, [
    clearIntentQuery,
    isOwnPostById,
    labels.unknownError,
    labels.ownPost,
    publicId,
    resolveAuthStatus,
    searchParams,
    sessionUserId,
  ]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const dialog = dialogRef.current;
    if (!dialog) {
      return;
    }

    const focusables = getFocusableElements(dialog);
    (focusables[0] ?? dialog).focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeModal();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const currentFocusables = getFocusableElements(dialog);
      if (currentFocusables.length === 0) {
        event.preventDefault();
        dialog.focus();
        return;
      }

      const first = currentFocusables[0];
      const last = currentFocusables[currentFocusables.length - 1];
      const active = document.activeElement;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [closeModal, isOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isBusy) {
      return;
    }

    if (reason === "other" && !description.trim()) {
      setFeedback({ type: "error", message: labels.otherDescriptionRequired });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      await api.v2.reportsControllerCreateReport({
        targetType: "published_journey",
        targetId: publicId,
        reason,
        description: reason === "other" ? description.trim() : undefined,
      });

      if (typeof window !== "undefined") {
        window.location.reload();
        return;
      }

      setFeedback({ type: "success", message: labels.success });
      setIsOpen(false);
      setReason("spam");
      setDescription("");
    } catch (error) {
      const statusCode = getStatusCode(error);
      if (statusCode === 401) {
        setAuthStatus("unauthenticated");
        goToLogin();
      } else if (statusCode === 409) {
        setFeedback({ type: "error", message: labels.duplicate });
      } else if (statusCode === 403) {
        setFeedback({ type: "error", message: labels.forbidden });
      } else if (statusCode === 400) {
        const errorMessage = getErrorMessage(error);
        if (isOwnPostError(errorMessage)) {
          setFeedback({ type: "error", message: labels.ownPost });
        } else {
          setFeedback({ type: "error", message: labels.badRequest });
        }
      } else if (statusCode === 404) {
        setFeedback({ type: "error", message: labels.notFound });
      } else {
        setFeedback({ type: "error", message: labels.unknownError });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={[styles.wrapper, wrapperClassName].filter(Boolean).join(" ")}>
      {!hideTrigger && (
        <button
          type="button"
          onClick={verifyAndOpen}
          className={[
            styles.trigger,
            variant === "card"
              ? styles.triggerCard
              : variant === "quiet"
                ? styles.triggerQuiet
                : styles.triggerDetail,
            triggerClassName,
          ]
            .filter(Boolean)
            .join(" ")}
          disabled={isBusy}
          aria-label={labels.reportButton}
        >
          {labels.reportButton}
        </button>
      )}

      {isCheckingAuth && (
        <p
          className={[styles.feedback, styles.feedbackInfo, feedbackClassName]
            .filter(Boolean)
            .join(" ")}
          role="status"
        >
          {labels.loadingAuth}
        </p>
      )}

      {feedback && (
        <p
          className={[
            styles.feedback,
            feedbackClassName,
            feedback.type === "success"
              ? styles.feedbackSuccess
              : feedback.type === "info"
                ? styles.feedbackInfo
                : styles.feedbackError,
          ]
            .filter(Boolean)
            .join(" ")}
          role={feedback.type === "error" ? "alert" : "status"}
        >
          {feedback.message}
        </p>
      )}

      {isOpen && (
        <div className={styles.backdrop} onClick={closeModal}>
          <div
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`report-dialog-title-${publicId}`}
            onClick={(event) => event.stopPropagation()}
            tabIndex={-1}
          >
            <div className={styles.dialogHeader}>
              <h3 id={`report-dialog-title-${publicId}`} className={styles.dialogTitle}>
                {labels.modalTitle}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                disabled={isBusy}
                className={styles.closeButton}
                aria-label={labels.closeButton}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <fieldset className={styles.reasonFieldset} disabled={isBusy}>
                <legend className={styles.fieldLabel}>{labels.reasonLabel}</legend>
                {reasonOrder.map((currentReason) => (
                  <label key={currentReason} className={styles.reasonOption}>
                    <input
                      type="radio"
                      name={`report-reason-${publicId}`}
                      value={currentReason}
                      checked={reason === currentReason}
                      onChange={() => setReason(currentReason)}
                    />
                    <span>{labels.reasonLabels[currentReason]}</span>
                  </label>
                ))}
              </fieldset>

              {reason === "other" && (
                <div className={styles.descriptionBlock}>
                  <label
                    htmlFor={`report-description-${publicId}`}
                    className={styles.fieldLabel}
                  >
                    {labels.descriptionLabel}
                  </label>
                  <textarea
                    id={`report-description-${publicId}`}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    className={styles.descriptionInput}
                    placeholder={labels.descriptionPlaceholder}
                    rows={4}
                    maxLength={300}
                    required
                    disabled={isBusy}
                  />
                </div>
              )}

              <div className={styles.actionRow}>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isBusy}
                  className={styles.cancelButton}
                >
                  {labels.cancelButton}
                </button>
                <button type="submit" disabled={isBusy} className={styles.submitButton}>
                  {isSubmitting ? labels.submittingButton : labels.submitButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ReportJourneyButton(props: ReportJourneyButtonProps) {
  const labels = reportLabels[props.lang] ?? reportLabels.en;

  return (
    <Suspense
      fallback={(
        <div
          className={[styles.wrapper, props.wrapperClassName]
            .filter(Boolean)
            .join(" ")}
        >
          <button
            type="button"
            className={[
              styles.trigger,
              props.variant === "card"
                ? styles.triggerCard
                : props.variant === "quiet"
                  ? styles.triggerQuiet
                  : styles.triggerDetail,
              props.triggerClassName,
            ]
              .filter(Boolean)
              .join(" ")}
            disabled
            aria-label={labels.reportButton}
          >
            {labels.reportButton}
          </button>
        </div>
      )}
    >
      <ReportJourneyButtonInner {...props} />
    </Suspense>
  );
}
