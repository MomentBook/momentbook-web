"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./Reveal.module.scss";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  className?: string;
};

const DEFAULT_DURATION_MS = 720;
const DEFAULT_DISTANCE_PX = 8;
const DEFAULT_THRESHOLD = 0.14;

function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Reveal({
  children,
  delay = 0,
  duration = DEFAULT_DURATION_MS,
  distance = DEFAULT_DISTANCE_PX,
  threshold = DEFAULT_THRESHOLD,
  className = "",
}: RevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const safeDelay = Number.isFinite(delay) ? Math.max(0, delay) : 0;
  const safeDuration = Number.isFinite(duration)
    ? clampNumber(duration, 280, 1100)
    : DEFAULT_DURATION_MS;
  const safeDistance = Number.isFinite(distance)
    ? clampNumber(distance, 0, 16)
    : DEFAULT_DISTANCE_PX;
  const safeThreshold = Number.isFinite(threshold)
    ? clampNumber(threshold, 0, 1)
    : DEFAULT_THRESHOLD;

  useEffect(() => {
    const rootNode = rootRef.current;

    if (!rootNode || typeof window === "undefined") {
      return;
    }

    if (isVisible) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const revealImmediately = () => {
      setIsVisible(true);
    };

    if (mediaQuery.matches || typeof IntersectionObserver === "undefined") {
      revealImmediately();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting) {
          return;
        }

        revealImmediately();
        observer.disconnect();
      },
      {
        threshold: safeThreshold,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(rootNode);

    const handlePreferenceChange = () => {
      if (mediaQuery.matches) {
        revealImmediately();
        observer.disconnect();
      }
    };

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", handlePreferenceChange);
    } else {
      mediaQuery.addListener(handlePreferenceChange);
    }

    return () => {
      observer.disconnect();
      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", handlePreferenceChange);
      } else {
        mediaQuery.removeListener(handlePreferenceChange);
      }
    };
  }, [isVisible, safeThreshold]);

  const style = {
    "--reveal-delay": `${safeDelay}ms`,
    "--reveal-duration": `${safeDuration}ms`,
    "--reveal-distance": `${safeDistance}px`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={[styles.root, className].filter(Boolean).join(" ")}
      data-reveal-state={isVisible ? "visible" : "hidden"}
      style={style}
    >
      {children}
    </div>
  );
}
