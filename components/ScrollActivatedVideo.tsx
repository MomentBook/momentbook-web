"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import styles from "./ScrollActivatedVideo.module.scss";

type ScrollActivatedVideoProps = {
  className?: string;
  src?: string | null;
  poster?: string;
  title: string;
  replayLabel: string;
  playWithSoundLabel?: string;
  soundOnLabel?: string;
  soundOffLabel?: string;
  autoplay?: boolean;
  showReplayButton?: boolean;
  showSoundToggle?: boolean;
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
  playWithSoundLabel = "Play with sound",
  soundOnLabel = "Turn sound on",
  soundOffLabel = "Turn sound off",
  autoplay = true,
  showReplayButton = true,
  showSoundToggle = true,
  fallback,
  onPlaybackStart,
  onPlaybackEnd,
}: ScrollActivatedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [requiresUserPlay, setRequiresUserPlay] = useState(!autoplay);
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

    if (!video || !shouldRenderVideo || !autoplay) {
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
        // Browser blocked autoplay with sound; wait for explicit user action.
        setRequiresUserPlay(true);
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
  }, [autoplay, hasEnded, onPlaybackStart, shouldRenderVideo]);

  const handleReplay = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.currentTime = 0;
    setHasEnded(false);
    setRequiresUserPlay(false);

    try {
      await video.play();
      onPlaybackStart?.();
    } catch {
      // Ignore autoplay failures triggered by browser policies.
    }
  };

  const handleSoundToggle = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleUserPlayWithSound = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = false;
    setIsMuted(false);
    setRequiresUserPlay(false);

    try {
      await video.play();
      onPlaybackStart?.();
    } catch {
      // Keep controls visible so user can retry.
      setRequiresUserPlay(true);
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
        autoPlay={autoplay}
        muted={isMuted}
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
      {requiresUserPlay ? (
        <>
          <div className={styles.startOverlay} aria-hidden="true" />
          <button
            type="button"
            className={styles.playWithSoundButton}
            aria-label={playWithSoundLabel}
            onClick={() => {
              void handleUserPlayWithSound();
            }}
          >
            <span aria-hidden="true">
              <svg viewBox="0 0 24 24" className={styles.playIcon}>
                <path d="M8 6v12l10-6z" fill="currentColor" />
              </svg>
            </span>
            <span className={styles.visuallyHidden}>{playWithSoundLabel}</span>
          </button>
        </>
      ) : null}
      {showSoundToggle ? (
        <button
          type="button"
          className={styles.soundButton}
          onClick={handleSoundToggle}
        >
          {isMuted ? soundOnLabel : soundOffLabel}
        </button>
      ) : null}
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
