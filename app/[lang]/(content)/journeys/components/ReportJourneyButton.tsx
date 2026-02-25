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

const reportLabels: Record<Language, ReportLabels> = {
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
  ja: {
    reportButton: "通報",
    modalTitle: "投稿を通報",
    reasonLabel: "通報理由",
    descriptionLabel: "詳細説明",
    descriptionPlaceholder: "問題の内容を入力してください。",
    cancelButton: "キャンセル",
    submitButton: "通報を送信",
    submittingButton: "送信中...",
    closeButton: "閉じる",
    loadingAuth: "ログイン状態を確認中...",
    otherDescriptionRequired: "「その他」を選択した場合は詳細説明を入力してください。",
    success: "通報を受け付けました。",
    duplicate: "この投稿はすでに通報済みです。",
    forbidden: "通報権限がないか、1日の通報上限を超えています。",
    ownPost: "自分の投稿は通報できません。",
    badRequest: "入力値が正しくありません。通報理由を確認してください。",
    notFound: "投稿が見つかりません。",
    unknownError: "通報の送信に失敗しました。しばらくして再試行してください。",
    reasonLabels: {
      spam: "スパム",
      abuse: "暴言/嫌がらせ",
      hate: "ヘイト表現",
      sexual: "性的コンテンツ",
      inappropriate: "不適切なコンテンツ",
      other: "その他",
    },
  },
  zh: {
    reportButton: "举报",
    modalTitle: "举报此帖子",
    reasonLabel: "举报原因",
    descriptionLabel: "详细说明",
    descriptionPlaceholder: "请输入问题内容。",
    cancelButton: "取消",
    submitButton: "提交举报",
    submittingButton: "提交中...",
    closeButton: "关闭",
    loadingAuth: "正在确认登录状态...",
    otherDescriptionRequired: "选择“其他”时，请填写详细说明。",
    success: "举报已提交。",
    duplicate: "你已经举报过此帖子。",
    forbidden: "没有举报权限，或已超过每日举报次数。",
    ownPost: "不能举报自己的帖子。",
    badRequest: "输入值无效，请检查举报原因。",
    notFound: "未找到帖子。",
    unknownError: "举报提交失败，请稍后重试。",
    reasonLabels: {
      spam: "垃圾信息",
      abuse: "辱骂/骚扰",
      hate: "仇恨言论",
      sexual: "色情内容",
      inappropriate: "不当内容",
      other: "其他",
    },
  },
  es: {
    reportButton: "Reportar",
    modalTitle: "Reportar esta publicación",
    reasonLabel: "Motivo",
    descriptionLabel: "Detalle",
    descriptionPlaceholder: "Describe el problema.",
    cancelButton: "Cancelar",
    submitButton: "Enviar reporte",
    submittingButton: "Enviando...",
    closeButton: "Cerrar",
    loadingAuth: "Verificando cuenta...",
    otherDescriptionRequired: "Si eliges \"Otro\", escribe un detalle.",
    success: "El reporte fue enviado.",
    duplicate: "Ya reportaste esta publicación.",
    forbidden: "No tienes permiso para reportar o superaste el límite diario.",
    ownPost: "No puedes reportar tu propia publicación.",
    badRequest: "Entrada inválida. Revisa el motivo del reporte.",
    notFound: "Publicación no encontrada.",
    unknownError: "No se pudo enviar el reporte. Inténtalo de nuevo.",
    reasonLabels: {
      spam: "Spam",
      abuse: "Abuso/hostigamiento",
      hate: "Discurso de odio",
      sexual: "Contenido sexual",
      inappropriate: "Contenido inapropiado",
      other: "Otro",
    },
  },
  pt: {
    reportButton: "Denunciar",
    modalTitle: "Denunciar esta publicação",
    reasonLabel: "Motivo",
    descriptionLabel: "Detalhe",
    descriptionPlaceholder: "Descreva o problema.",
    cancelButton: "Cancelar",
    submitButton: "Enviar denúncia",
    submittingButton: "Enviando...",
    closeButton: "Fechar",
    loadingAuth: "Verificando conta...",
    otherDescriptionRequired: "Ao escolher \"Outro\", informe os detalhes.",
    success: "Denúncia enviada com sucesso.",
    duplicate: "Você já denunciou esta publicação.",
    forbidden: "Sem permissão para denunciar ou limite diário excedido.",
    ownPost: "Você não pode denunciar sua própria publicação.",
    badRequest: "Entrada inválida. Revise o motivo da denúncia.",
    notFound: "Publicação não encontrada.",
    unknownError: "Falha ao enviar denúncia. Tente novamente.",
    reasonLabels: {
      spam: "Spam",
      abuse: "Abuso/assédio",
      hate: "Discurso de ódio",
      sexual: "Conteúdo sexual",
      inappropriate: "Conteúdo inadequado",
      other: "Outro",
    },
  },
  fr: {
    reportButton: "Signaler",
    modalTitle: "Signaler cette publication",
    reasonLabel: "Motif",
    descriptionLabel: "Détail",
    descriptionPlaceholder: "Décrivez le problème.",
    cancelButton: "Annuler",
    submitButton: "Envoyer le signalement",
    submittingButton: "Envoi...",
    closeButton: "Fermer",
    loadingAuth: "Vérification du compte...",
    otherDescriptionRequired: "Si vous choisissez \"Autre\", ajoutez un détail.",
    success: "Signalement envoyé.",
    duplicate: "Vous avez déjà signalé cette publication.",
    forbidden: "Vous n'avez pas l'autorisation ou la limite quotidienne est dépassée.",
    ownPost: "Vous ne pouvez pas signaler votre propre publication.",
    badRequest: "Entrée invalide. Vérifiez le motif du signalement.",
    notFound: "Publication introuvable.",
    unknownError: "Échec de l'envoi du signalement. Réessayez plus tard.",
    reasonLabels: {
      spam: "Spam",
      abuse: "Insultes/harcèlement",
      hate: "Discours de haine",
      sexual: "Contenu sexuel",
      inappropriate: "Contenu inapproprié",
      other: "Autre",
    },
  },
  th: {
    reportButton: "รายงาน",
    modalTitle: "รายงานโพสต์นี้",
    reasonLabel: "เหตุผลในการรายงาน",
    descriptionLabel: "รายละเอียด",
    descriptionPlaceholder: "กรุณาอธิบายปัญหา",
    cancelButton: "ยกเลิก",
    submitButton: "ส่งรายงาน",
    submittingButton: "กำลังส่ง...",
    closeButton: "ปิด",
    loadingAuth: "กำลังตรวจสอบสถานะบัญชี...",
    otherDescriptionRequired: "หากเลือก \"อื่น ๆ\" กรุณากรอกรายละเอียดเพิ่มเติม",
    success: "ส่งรายงานเรียบร้อยแล้ว",
    duplicate: "คุณรายงานโพสต์นี้ไปแล้ว",
    forbidden: "คุณไม่มีสิทธิ์รายงาน หรือเกินจำนวนรายงานต่อวัน",
    ownPost: "ไม่สามารถรายงานโพสต์ของตนเองได้",
    badRequest: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบเหตุผลการรายงาน",
    notFound: "ไม่พบโพสต์",
    unknownError: "ส่งรายงานไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
    reasonLabels: {
      spam: "สแปม",
      abuse: "ด่าทอ/คุกคาม",
      hate: "ถ้อยคำเกลียดชัง",
      sexual: "เนื้อหาทางเพศ",
      inappropriate: "เนื้อหาไม่เหมาะสม",
      other: "อื่น ๆ",
    },
  },
  vi: {
    reportButton: "Báo cáo",
    modalTitle: "Báo cáo bài viết này",
    reasonLabel: "Lý do",
    descriptionLabel: "Chi tiết",
    descriptionPlaceholder: "Vui lòng mô tả vấn đề.",
    cancelButton: "Hủy",
    submitButton: "Gửi báo cáo",
    submittingButton: "Đang gửi...",
    closeButton: "Đóng",
    loadingAuth: "Đang kiểm tra trạng thái đăng nhập...",
    otherDescriptionRequired: "Nếu chọn \"Khác\", vui lòng nhập chi tiết.",
    success: "Đã gửi báo cáo.",
    duplicate: "Bạn đã báo cáo bài viết này rồi.",
    forbidden: "Bạn không có quyền báo cáo hoặc đã vượt quá giới hạn hằng ngày.",
    ownPost: "Bạn không thể báo cáo bài viết của chính mình.",
    badRequest: "Dữ liệu không hợp lệ. Vui lòng kiểm tra lý do báo cáo.",
    notFound: "Không tìm thấy bài viết.",
    unknownError: "Gửi báo cáo thất bại. Vui lòng thử lại sau.",
    reasonLabels: {
      spam: "Spam",
      abuse: "Lăng mạ/quấy rối",
      hate: "Phát ngôn thù ghét",
      sexual: "Nội dung tình dục",
      inappropriate: "Nội dung không phù hợp",
      other: "Khác",
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

function joinClassNames(
  ...classNames: Array<string | null | undefined | false>
): string {
  return classNames.filter(Boolean).join(" ");
}

function getTriggerVariantClass(
  variant: ReportJourneyButtonProps["variant"] = "detail",
): string {
  if (variant === "card") {
    return styles.triggerCard;
  }

  if (variant === "quiet") {
    return styles.triggerQuiet;
  }

  return styles.triggerDetail;
}

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
    <div className={joinClassNames(styles.wrapper, wrapperClassName)}>
      {!hideTrigger && (
        <button
          type="button"
          onClick={verifyAndOpen}
          className={joinClassNames(
            styles.trigger,
            getTriggerVariantClass(variant),
            triggerClassName,
          )}
          disabled={isBusy}
          aria-label={labels.reportButton}
        >
          {labels.reportButton}
        </button>
      )}

      {isCheckingAuth && (
        <p
          className={joinClassNames(
            styles.feedback,
            styles.feedbackInfo,
            feedbackClassName,
          )}
          role="status"
        >
          {labels.loadingAuth}
        </p>
      )}

      {feedback && (
        <p
          className={joinClassNames(
            styles.feedback,
            feedbackClassName,
            feedback.type === "success"
              ? styles.feedbackSuccess
              : feedback.type === "info"
                ? styles.feedbackInfo
                : styles.feedbackError,
          )}
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
          className={joinClassNames(styles.wrapper, props.wrapperClassName)}
        >
          <button
            type="button"
            className={joinClassNames(
              styles.trigger,
              getTriggerVariantClass(props.variant),
              props.triggerClassName,
            )}
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
