"use client";

import type { CSSProperties, ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import styles from "./Reveal.module.scss";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  scale?: number;
  className?: string;
};

const DEFAULT_DURATION_MS = 560;
const DEFAULT_DISTANCE_PX = 10;
const DEFAULT_SCALE = 0.996;
const REVEAL_THRESHOLD = 0.18;
const INITIAL_REVEAL_VIEWPORT_RATIO = 0.88;

function clampNumber(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function Reveal({
  children,
  delay = 0,
  duration = DEFAULT_DURATION_MS,
  distance = DEFAULT_DISTANCE_PX,
  scale = DEFAULT_SCALE,
  className = "",
}: RevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  const safeDelay = Number.isFinite(delay) ? Math.max(0, delay) : 0;
  const safeDuration = Number.isFinite(duration)
    ? clampNumber(duration, 220, 900)
    : DEFAULT_DURATION_MS;
  const safeDistance = Number.isFinite(distance)
    ? clampNumber(distance, 0, 20)
    : DEFAULT_DISTANCE_PX;
  const safeScale = Number.isFinite(scale)
    ? clampNumber(scale, 0.985, 1)
    : DEFAULT_SCALE;

  useLayoutEffect(() => {
    const node = rootRef.current;

    if (!node || typeof window === "undefined") {
      return;
    }

    const playReveal = () => {
      node.setAttribute("data-reveal-played", "true");
    };

    if (node.getAttribute("data-reveal-played") === "true") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches || typeof IntersectionObserver === "undefined") {
      return;
    }

    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const rect = node.getBoundingClientRect();
    const initialTriggerLine =
      viewportHeight * INITIAL_REVEAL_VIEWPORT_RATIO;

    if (rect.top <= initialTriggerLine && rect.bottom >= 0) {
      playReveal();
      return;
    }

    let frameId: number | null = null;
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry?.isIntersecting) {
          return;
        }

        frameId = window.requestAnimationFrame(() => {
          playReveal();
        });
        observer.disconnect();
      },
      {
        threshold: REVEAL_THRESHOLD,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();

      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  const style = {
    "--reveal-delay": `${safeDelay}ms`,
    "--reveal-duration": `${safeDuration}ms`,
    "--reveal-distance": `${safeDistance}px`,
    "--reveal-scale": `${safeScale}`,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className={[styles.root, className].filter(Boolean).join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
