"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.scss";

type HomeMarketingVideoProps = {
  videoSrc: string;
  posterSrc: string;
  ariaLabel: string;
};

export function HomeMarketingVideo({
  videoSrc,
  posterSrc,
  ariaLabel,
}: HomeMarketingVideoProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const syncPreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);

    return () => {
      mediaQuery.removeEventListener("change", syncPreference);
    };
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const node = containerRef.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      className={styles.marketingVisual}
      role="img"
      aria-label={ariaLabel}
    >
      <div className={styles.marketingVisualSurface}>
        <Image
          src={posterSrc}
          alt=""
          fill
          className={styles.marketingVideoPoster}
          sizes="(min-width: 960px) 38rem, 100vw"
        />
        {shouldLoadVideo && !prefersReducedMotion ? (
          <video
            className={styles.marketingVideo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={posterSrc}
            aria-hidden="true"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
        <div className={styles.marketingVideoOverlay} aria-hidden="true" />
      </div>
    </div>
  );
}
