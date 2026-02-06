"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
  variant?: "detail" | "card";
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
  loginRequired: string;
  guestRestricted: string;
  otherDescriptionRequired: string;
  success: string;
  duplicate: string;
  forbidden: string;
  badRequest: string;
  notFound: string;
  unknownError: string;
  loginGuide: string;
  loginCta: string;
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
    loginRequired: "Only logged-in users can report posts.",
    guestRestricted: "Guest accounts cannot report posts. Please log in.",
    otherDescriptionRequired: "Please provide details for 'Other'.",
    success: "Report submitted successfully.",
    duplicate: "You have already reported this post.",
    forbidden: "Guest account or daily report limit exceeded.",
    badRequest: "Invalid input. Please review the report reason.",
    notFound: "Post not found.",
    unknownError: "Failed to submit report. Please try again.",
    loginGuide: "Sign in from the app to report this post.",
    loginCta: "Go to app download",
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
    loginRequired: "로그인 사용자만 신고할 수 있습니다.",
    guestRestricted: "게스트 계정은 신고할 수 없습니다. 로그인해 주세요.",
    otherDescriptionRequired: "기타 사유를 선택한 경우 상세 설명을 입력해 주세요.",
    success: "신고가 접수되었습니다",
    duplicate: "이미 신고한 게시글입니다",
    forbidden: "게스트 계정이거나 일일 신고 횟수를 초과했습니다",
    badRequest: "입력값이 올바르지 않습니다. 다시 확인해 주세요.",
    notFound: "게시글을 찾을 수 없습니다",
    unknownError: "신고 접수에 실패했습니다. 잠시 후 다시 시도해 주세요.",
    loginGuide: "게시글 신고는 앱 로그인 후 이용할 수 있습니다.",
    loginCta: "앱 다운로드/로그인",
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

function getStatusCode(error: unknown): number | null {
  if (!error || typeof error !== "object") {
    return null;
  }

  const maybeStatus = (error as { status?: unknown }).status;
  return typeof maybeStatus === "number" ? maybeStatus : null;
}

export default function ReportJourneyButton({
  publicId,
  lang,
  variant = "detail",
}: ReportJourneyButtonProps) {
  const labels = useMemo(
    () => reportLabels[lang] ?? reportLabels.en,
    [lang],
  );
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason>("spam");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authStatus, setAuthStatus] = useState<AuthStatus>("unknown");
  const [showLoginGuide, setShowLoginGuide] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: FeedbackType;
    message: string;
  } | null>(null);

  const resetForm = () => {
    setReason("spam");
    setDescription("");
  };

  const closeModal = () => {
    if (isSubmitting) {
      return;
    }
    setIsOpen(false);
  };

  const openModal = () => {
    if (isSubmitting) {
      return;
    }
    setShowLoginGuide(false);
    setFeedback(null);
    setIsOpen(true);
  };

  const ensureMember = async () => {
    if (authStatus === "member") {
      return true;
    }

    if (authStatus === "guest") {
      setFeedback({ type: "info", message: labels.guestRestricted });
      setShowLoginGuide(true);
      return false;
    }

    if (authStatus === "unauthenticated") {
      setFeedback({ type: "info", message: labels.loginRequired });
      setShowLoginGuide(true);
      return false;
    }

    try {
      const profile = await api.v2.usersControllerGetMyProfile();
      const isGuest =
        profile.data?.data?.isGuest === true ||
        profile.data?.data?.provider === "anonymous";

      if (isGuest) {
        setAuthStatus("guest");
        setFeedback({ type: "info", message: labels.guestRestricted });
        setShowLoginGuide(true);
        return false;
      }

      setAuthStatus("member");
      return true;
    } catch (error) {
      const statusCode = getStatusCode(error);

      if (statusCode === 401 || statusCode === 403) {
        setAuthStatus("unauthenticated");
        setFeedback({ type: "info", message: labels.loginRequired });
        setShowLoginGuide(true);
        return false;
      }

      setFeedback({ type: "error", message: labels.unknownError });
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (reason === "other" && !description.trim()) {
      setFeedback({ type: "error", message: labels.otherDescriptionRequired });
      return;
    }

    setIsSubmitting(true);
    setShowLoginGuide(false);
    setFeedback(null);

    const canReport = await ensureMember();
    if (!canReport) {
      setIsSubmitting(false);
      return;
    }

    try {
      await api.v2.reportsControllerCreateReport({
        targetType: "published_journey",
        targetId: publicId,
        reason,
        description: reason === "other" ? description.trim() : undefined,
      });

      setFeedback({ type: "success", message: labels.success });
      resetForm();
      setIsOpen(false);
    } catch (error) {
      const statusCode = getStatusCode(error);

      if (statusCode === 409) {
        setFeedback({ type: "error", message: labels.duplicate });
      } else if (statusCode === 403) {
        setFeedback({ type: "error", message: labels.forbidden });
      } else if (statusCode === 400) {
        setFeedback({ type: "error", message: labels.badRequest });
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
    <div className={styles.wrapper}>
      <button
        type="button"
        onClick={openModal}
        className={`${styles.trigger} ${variant === "card" ? styles.triggerCard : styles.triggerDetail}`}
        disabled={isSubmitting}
      >
        {labels.reportButton}
      </button>

      {feedback && (
        <p
          className={`${styles.feedback} ${
            feedback.type === "success"
              ? styles.feedbackSuccess
              : feedback.type === "info"
                ? styles.feedbackInfo
                : styles.feedbackError
          }`}
          role="status"
        >
          {feedback.message}
        </p>
      )}

      {isOpen && (
        <div className={styles.backdrop} onClick={closeModal}>
          <div
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={`report-dialog-title-${publicId}`}
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.dialogHeader}>
              <h3 id={`report-dialog-title-${publicId}`} className={styles.dialogTitle}>
                {labels.modalTitle}
              </h3>
              <button
                type="button"
                onClick={closeModal}
                disabled={isSubmitting}
                className={styles.closeButton}
                aria-label={labels.closeButton}
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
              <fieldset className={styles.reasonFieldset} disabled={isSubmitting}>
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
                  <label htmlFor={`report-description-${publicId}`} className={styles.fieldLabel}>
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
                    disabled={isSubmitting}
                  />
                </div>
              )}

              {showLoginGuide && (
                <p className={styles.loginGuide}>
                  {labels.loginGuide}{" "}
                  <Link href={`/${lang}/download`} className={styles.loginCta}>
                    {labels.loginCta}
                  </Link>
                </p>
              )}

              <div className={styles.actionRow}>
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isSubmitting}
                  className={styles.cancelButton}
                >
                  {labels.cancelButton}
                </button>
                <button type="submit" disabled={isSubmitting} className={styles.submitButton}>
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
