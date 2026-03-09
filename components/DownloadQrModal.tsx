"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { MomentBookLogo } from "@/components/MomentBookLogo";
import { type Language } from "@/lib/i18n/config";
import { getDownloadCopy } from "@/lib/marketing/download-content";
import { buildAbsoluteInstallLandingUrl, getCanonicalStoreLinks } from "@/lib/mobile-app";
import styles from "./DownloadQrModal.module.scss";

type DownloadQrModalProps = {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
};

type DownloadQrModalLabels = {
  dialogLabel: string;
  close: string;
  scanHint: string;
};

const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const modalLabelsByLanguage: Record<Language, DownloadQrModalLabels> = {
  en: {
    dialogLabel: "Download QR code dialog",
    close: "Close download dialog",
    scanHint: "Scan with your phone camera",
  },
  ko: {
    dialogLabel: "다운로드 QR 코드 대화상자",
    close: "다운로드 대화상자 닫기",
    scanHint: "휴대폰 카메라로 스캔하세요",
  },
  ja: {
    dialogLabel: "ダウンロード QR コードダイアログ",
    close: "ダウンロードダイアログを閉じる",
    scanHint: "スマートフォンのカメラで読み取ってください",
  },
  zh: {
    dialogLabel: "下载二维码对话框",
    close: "关闭下载对话框",
    scanHint: "请用手机相机扫描",
  },
  es: {
    dialogLabel: "Diálogo de código QR de descarga",
    close: "Cerrar diálogo de descarga",
    scanHint: "Escanea con la cámara de tu teléfono",
  },
  pt: {
    dialogLabel: "Diálogo de QR para download",
    close: "Fechar diálogo de download",
    scanHint: "Escaneie com a câmera do seu celular",
  },
  fr: {
    dialogLabel: "Fenêtre de QR de téléchargement",
    close: "Fermer la fenêtre de téléchargement",
    scanHint: "Scannez avec l'appareil photo de votre téléphone",
  },
  th: {
    dialogLabel: "หน้าต่างคิวอาร์โค้ดสำหรับดาวน์โหลด",
    close: "ปิดหน้าต่างดาวน์โหลด",
    scanHint: "สแกนด้วยกล้องโทรศัพท์ของคุณ",
  },
  vi: {
    dialogLabel: "Hộp thoại mã QR tải xuống",
    close: "Đóng hộp thoại tải xuống",
    scanHint: "Quét bằng camera điện thoại của bạn",
  },
};

export function DownloadQrModal({
  lang,
  isOpen,
  onClose,
}: DownloadQrModalProps) {
  const content = getDownloadCopy(lang);
  const storeLinks = getCanonicalStoreLinks(lang);
  const labels = modalLabelsByLanguage[lang] ?? modalLabelsByLanguage.en;
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const [svgMarkup, setSvgMarkup] = useState("");
  const qrInstallUrl = useMemo(
    () => buildAbsoluteInstallLandingUrl(lang, {
      source: "download-cta",
      utmMedium: "desktop_qr",
      variant: "timeline",
    }),
    [lang],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    let cancelled = false;

    void (async () => {
      const QRCode = await import("qrcode");
      const nextSvgMarkup = await QRCode.toString(qrInstallUrl, {
        type: "svg",
        width: 260,
        margin: 1,
        errorCorrectionLevel: "M",
        color: {
          dark: "#17221a",
          light: "#ffffff",
        },
      });

      if (!cancelled) {
        setSvgMarkup(nextSvgMarkup);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isOpen, qrInstallUrl]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior = document.body.style.overscrollBehavior;
    const previousFocused =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "contain";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => element.tabIndex !== -1);

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey) {
        if (activeElement === first || !dialogRef.current.contains(activeElement)) {
          event.preventDefault();
          last?.focus();
        }
        return;
      }

      if (activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscrollBehavior;
      document.removeEventListener("keydown", handleKeyDown);
      if (previousFocused?.isConnected) {
        previousFocused.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div
        ref={dialogRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label={labels.close}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>

        <div className={styles.shell}>
          <div className={styles.header}>
            <MomentBookLogo
              className={styles.logo}
              iconClassName={styles.logoIcon}
              wordmarkClassName={styles.logoWordmark}
              iconSize={28}
              wordmarkWidth={132}
              wordmarkHeight={32}
            />
          </div>

          <div className={styles.body}>
            <div className={styles.copy}>
              <h2 id={titleId} className={styles.title}>
                {content.desktopQrTitle}
              </h2>
              <p id={descriptionId} className={styles.lead}>
                {content.desktopQrLead}
              </p>

              <div className={styles.storeButtons}>
                <a
                  href={storeLinks.ios}
                  className={styles.storeButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.iosName}
                >
                  <Image
                    src="/images/download/app-store-button.webp"
                    alt={content.iosName}
                    width={635}
                    height={200}
                    className={styles.storeBadge}
                  />
                </a>
                <a
                  href={storeLinks.android}
                  className={styles.storeButton}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={content.androidName}
                >
                  <Image
                    src="/images/download/google-play-button.webp"
                    alt={content.androidName}
                    width={636}
                    height={200}
                    className={styles.storeBadge}
                  />
                </a>
              </div>

              <p className={styles.availability}>{content.availability}</p>
            </div>

            <div className={styles.qrStage}>
              <div className={styles.qrSurface} aria-hidden="true">
                {svgMarkup ? (
                  <div
                    className={styles.qrCode}
                    dangerouslySetInnerHTML={{ __html: svgMarkup }}
                  />
                ) : (
                  <div className={styles.qrSkeleton} />
                )}
              </div>
              <p className={styles.qrHint}>{labels.scanHint}</p>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}
