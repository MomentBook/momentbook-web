"use client";

import { createPortal } from "react-dom";
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import Image from "next/image";
import type { Language } from "@/lib/i18n/config";
import { LocalizedDateTime } from "./LocalizedDateTime";
import type { PhotoPageCopy } from "./photo.helpers";
import styles from "./photo.module.scss";

const focusableSelector =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

const MIN_SCALE = 1;
const DOUBLE_TAP_SCALE = 2.4;
const MAX_SCALE = 4;
const WHEEL_STEP = 0.18;
const DOUBLE_TAP_DELAY_MS = 280;
const DOUBLE_TAP_DISTANCE_PX = 28;

type Point = {
  x: number;
  y: number;
};

type PointerState = Point & {
  startX: number;
  startY: number;
};

type Size = {
  width: number;
  height: number;
};

type PhotoViewerProps = {
  lang: Language;
  photoUrl: string;
  alt: string;
  copy: PhotoPageCopy;
  title: string;
  journeyTitle: string | null;
  locationName: string | null;
  takenAt?: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getDistance([a, b]: PointerState[]) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

function getContainedSize(natural: Size | null, stage: Size): Size {
  if (
    !natural ||
    natural.width <= 0 ||
    natural.height <= 0 ||
    stage.width <= 0 ||
    stage.height <= 0
  ) {
    return stage;
  }

  const widthRatio = stage.width / natural.width;
  const heightRatio = stage.height / natural.height;
  const ratio = Math.min(widthRatio, heightRatio);

  return {
    width: natural.width * ratio,
    height: natural.height * ratio,
  };
}

function clampOffset(offset: Point, scale: number, baseSize: Size): Point {
  if (scale <= 1) {
    return { x: 0, y: 0 };
  }

  const maxX = Math.max(0, ((baseSize.width * scale) - baseSize.width) / 2);
  const maxY = Math.max(0, ((baseSize.height * scale) - baseSize.height) / 2);

  return {
    x: clamp(offset.x, -maxX, maxX),
    y: clamp(offset.y, -maxY, maxY),
  };
}

export function PhotoViewer({
  lang,
  photoUrl,
  alt,
  copy,
  title,
  journeyTitle,
  locationName,
  takenAt,
}: PhotoViewerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState<Point>({ x: 0, y: 0 });
  const [naturalSize, setNaturalSize] = useState<Size | null>(null);
  const [stageSize, setStageSize] = useState<Size>({ width: 0, height: 0 });
  const [isCoarsePointer, setIsCoarsePointer] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const activePointersRef = useRef<Map<number, PointerState>>(new Map());
  const panSessionRef = useRef<{
    pointerId: number;
    origin: Point;
    startOffset: Point;
  } | null>(null);
  const pinchSessionRef = useRef<{
    startDistance: number;
    startScale: number;
  } | null>(null);
  const lastTouchTapRef = useRef<{
    time: number;
    point: Point;
  } | null>(null);
  const titleId = useId();
  const descriptionId = useId();

  const baseSize = useMemo(
    () => getContainedSize(naturalSize, stageSize),
    [naturalSize, stageSize],
  );
  const clampedOffset = useMemo(
    () => clampOffset(offset, scale, baseSize),
    [baseSize, offset, scale],
  );

  const viewerHint = isCoarsePointer
    ? copy.viewerTouchHint
    : copy.viewerDesktopHint;

  function openViewer() {
    activePointersRef.current.clear();
    panSessionRef.current = null;
    pinchSessionRef.current = null;
    lastTouchTapRef.current = null;
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setIsOpen(true);
  }

  function closeViewer() {
    activePointersRef.current.clear();
    panSessionRef.current = null;
    pinchSessionRef.current = null;
    lastTouchTapRef.current = null;
    setScale(1);
    setOffset({ x: 0, y: 0 });
    setIsOpen(false);
  }

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(pointer: coarse)");
    const syncPointerType = () => setIsCoarsePointer(mediaQuery.matches);

    syncPointerType();
    mediaQuery.addEventListener("change", syncPointerType);

    return () => {
      mediaQuery.removeEventListener("change", syncPointerType);
    };
  }, []);

  useEffect(() => {
    if (!isOpen || !stageRef.current || typeof ResizeObserver === "undefined") {
      return;
    }

    const node = stageRef.current;
    const observer = new ResizeObserver((entries) => {
      const nextEntry = entries[0];
      if (!nextEntry) {
        return;
      }

      setStageSize({
        width: nextEntry.contentRect.width,
        height: nextEntry.contentRect.height,
      });
    });

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const previousOverscrollBehavior = document.body.style.overscrollBehavior;
    const previousTouchAction = document.body.style.touchAction;
    const previousFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const fallbackTrigger = triggerRef.current;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "contain";
    document.body.style.touchAction = "none";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeViewer();
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
      document.body.style.touchAction = previousTouchAction;
      document.removeEventListener("keydown", handleKeyDown);

      if (previousFocused?.isConnected) {
        previousFocused.focus();
      } else if (fallbackTrigger?.isConnected) {
        fallbackTrigger.focus();
      }
    };
  }, [isOpen]);

  const toggleZoom = () => {
    if (scale > 1) {
      setScale(1);
      setOffset({ x: 0, y: 0 });
      return;
    }

    setScale(DOUBLE_TAP_SCALE);
  };

  const startPanFromRemainingPointer = () => {
    const [remainingPointer] = Array.from(activePointersRef.current.entries());

    if (!remainingPointer || scale <= 1) {
      panSessionRef.current = null;
      return;
    }

    const [pointerId, pointer] = remainingPointer;
    panSessionRef.current = {
      pointerId,
      origin: { x: pointer.x, y: pointer.y },
      startOffset: offset,
    };
  };

  const startPinch = () => {
    const pointers = Array.from(activePointersRef.current.values());

    if (pointers.length < 2) {
      pinchSessionRef.current = null;
      return;
    }

    pinchSessionRef.current = {
      startDistance: getDistance([pointers[0], pointers[1]]),
      startScale: scale,
    };
    panSessionRef.current = null;
  };

  const finishPointerSession = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pointerState = activePointersRef.current.get(event.pointerId);

    if (
      pointerState &&
      event.pointerType !== "mouse" &&
      Math.abs(pointerState.x - pointerState.startX) < 10 &&
      Math.abs(pointerState.y - pointerState.startY) < 10
    ) {
      const now = Date.now();
      const lastTap = lastTouchTapRef.current;

      if (
        lastTap &&
        now - lastTap.time <= DOUBLE_TAP_DELAY_MS &&
        Math.hypot(lastTap.point.x - event.clientX, lastTap.point.y - event.clientY) <=
          DOUBLE_TAP_DISTANCE_PX
      ) {
        toggleZoom();
        lastTouchTapRef.current = null;
      } else {
        lastTouchTapRef.current = {
          time: now,
          point: { x: event.clientX, y: event.clientY },
        };
      }
    }

    activePointersRef.current.delete(event.pointerId);

    if (stageRef.current?.hasPointerCapture(event.pointerId)) {
      stageRef.current.releasePointerCapture(event.pointerId);
    }

    if (activePointersRef.current.size >= 2) {
      startPinch();
      return;
    }

    pinchSessionRef.current = null;
    startPanFromRemainingPointer();
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!isOpen) {
      return;
    }

    event.preventDefault();

    activePointersRef.current.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
    });

    stageRef.current?.setPointerCapture(event.pointerId);

    if (activePointersRef.current.size >= 2) {
      startPinch();
      return;
    }

    if (scale > 1) {
      panSessionRef.current = {
        pointerId: event.pointerId,
        origin: { x: event.clientX, y: event.clientY },
        startOffset: offset,
      };
    }
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const currentPointer = activePointersRef.current.get(event.pointerId);

    if (!currentPointer) {
      return;
    }

    currentPointer.x = event.clientX;
    currentPointer.y = event.clientY;

    if (pinchSessionRef.current && activePointersRef.current.size >= 2) {
      const pointers = Array.from(activePointersRef.current.values());
      const distance = getDistance([pointers[0], pointers[1]]);
      const nextScale = clamp(
        pinchSessionRef.current.startScale *
          (distance / Math.max(pinchSessionRef.current.startDistance, 1)),
        MIN_SCALE,
        MAX_SCALE,
      );

      setScale(nextScale);
      setOffset((currentOffset) => clampOffset(currentOffset, nextScale, baseSize));
      return;
    }

    if (!panSessionRef.current || panSessionRef.current.pointerId !== event.pointerId) {
      return;
    }

    const nextOffset = {
      x:
        panSessionRef.current.startOffset.x +
        (event.clientX - panSessionRef.current.origin.x),
      y:
        panSessionRef.current.startOffset.y +
        (event.clientY - panSessionRef.current.origin.y),
    };

    setOffset(clampOffset(nextOffset, scale, baseSize));
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (isCoarsePointer) {
      return;
    }

    event.preventDefault();

    const nextScale = clamp(
      scale + (event.deltaY < 0 ? WHEEL_STEP : -WHEEL_STEP),
      MIN_SCALE,
      MAX_SCALE,
    );

    setScale(nextScale);

    if (nextScale === 1) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    setOffset((currentOffset) => clampOffset(currentOffset, nextScale, baseSize));
  };

  const viewerMeta = [
    journeyTitle,
    locationName,
  ].filter((value): value is string => Boolean(value && value.trim()));

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={styles.viewerTrigger}
        onClick={openViewer}
        aria-label={copy.openViewer}
        aria-haspopup="dialog"
      >
        <figure className={styles.mediaFrame}>
          <Image
            src={photoUrl}
            alt={alt}
            fill
            priority
            className={styles.image}
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 92vw, 1120px"
          />
          <span className={styles.viewerHintChip}>{copy.openViewerHint}</span>
        </figure>
      </button>

      {isOpen && typeof document !== "undefined"
        ? createPortal(
            <div
              className={styles.viewerOverlay}
              onClick={closeViewer}
            >
              <div
                ref={dialogRef}
                className={styles.viewerDialog}
                role="dialog"
                aria-modal="true"
                aria-label={copy.viewerDialogLabel}
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                onClick={(event) => event.stopPropagation()}
              >
                <div className={styles.viewerTopBar}>
                  <div className={styles.viewerHeading}>
                    <p id={titleId} className={styles.viewerTitle}>
                      {title}
                    </p>
                    {viewerMeta.length > 0 ? (
                      <p className={styles.viewerSubtitle}>
                        {viewerMeta.join(" · ")}
                      </p>
                    ) : null}
                  </div>

                  <button
                    ref={closeButtonRef}
                    type="button"
                    className={styles.viewerCloseButton}
                    onClick={closeViewer}
                    aria-label={copy.closeViewer}
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
                </div>

                <div
                  ref={stageRef}
                  className={`${styles.viewerStage} ${scale > 1 ? styles.viewerStageDragging : ""}`}
                  onDoubleClick={toggleZoom}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={finishPointerSession}
                  onPointerCancel={finishPointerSession}
                  onLostPointerCapture={finishPointerSession}
                  onWheel={handleWheel}
                >
                  <div
                    className={styles.viewerImageFrame}
                    style={{
                      width: `${baseSize.width}px`,
                      height: `${baseSize.height}px`,
                      transform: `translate3d(${clampedOffset.x}px, ${clampedOffset.y}px, 0) scale(${scale})`,
                    }}
                  >
                    <Image
                      src={photoUrl}
                      alt={alt}
                      fill
                      priority
                      className={styles.viewerImage}
                      sizes="100vw"
                      onLoad={(event) => {
                        setNaturalSize({
                          width: event.currentTarget.naturalWidth,
                          height: event.currentTarget.naturalHeight,
                        });
                      }}
                    />
                  </div>
                </div>

                <div id={descriptionId} className={styles.viewerBottomBar}>
                  <div className={styles.viewerMeta}>
                    {takenAt ? (
                      <span className={styles.viewerMetaItem}>
                        <LocalizedDateTime lang={lang} timestamp={takenAt} />
                      </span>
                    ) : null}
                    {locationName ? (
                      <span className={styles.viewerMetaItem}>{locationName}</span>
                    ) : null}
                  </div>
                  <p className={styles.viewerInstruction}>{viewerHint}</p>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
