"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./ScrollActivatedVideo.module.scss";

type ScrollActivatedVideoProps = {
  className?: string;
  src?: string | null;
  poster?: string;
  title: string;
  replayLabel: string;
  showReplayButton?: boolean;
  fallback: ReactNode;
  onPlaybackStart?: () => void;
  onPlaybackEnd?: () => void;
};

export function ScrollActivatedVideo({
  className,
  src,
  poster,
  title,
  replayLabel,
  showReplayButton = true,
  fallback,
  onPlaybackStart,
  onPlaybackEnd,
}: ScrollActivatedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const shouldRenderVideo = Boolean(src) && !hasError && !prefersReducedMotion;

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => {
      mediaQuery.removeEventListener("change", updatePreference);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !shouldRenderVideo) {
      return;
    }

    const startPlayback = async () => {
      if (!video.paused || hasEnded) {
        return;
      }

      try {
        await video.play();
        onPlaybackStart?.();
      } catch {
        // Ignore autoplay failures and keep fallback controls hidden.
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry) {
          return;
        }

        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          void startPlayback();
          return;
        }

        video.pause();
      },
      { threshold: [0, 0.25, 0.55, 0.8] },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [hasEnded, onPlaybackStart, shouldRenderVideo]);

  const handleReplay = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.currentTime = 0;
    setHasEnded(false);

    try {
      await video.play();
      onPlaybackStart?.();
    } catch {
      // Ignore autoplay failures triggered by browser policies.
    }
  };

  if (!shouldRenderVideo) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div className={`${styles.root} ${className ?? ""}`}>
      <video
        ref={videoRef}
        className={styles.video}
        aria-label={title}
        autoPlay
        muted
        playsInline
        preload="metadata"
        controls={false}
        poster={poster}
        onError={() => setHasError(true)}
        onEnded={() => {
          setHasEnded(true);
          onPlaybackEnd?.();
        }}
      >
        <source src={src ?? undefined} type="video/mp4" />
      </video>
      {showReplayButton ? (
        <button
          type="button"
          className={`${styles.replayButton} ${hasEnded ? styles.replayButtonVisible : ""}`}
          onClick={() => {
            void handleReplay();
          }}
        >
          {replayLabel}
        </button>
      ) : null}
    </div>
  );
}
