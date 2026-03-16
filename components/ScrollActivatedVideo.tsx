"use client";

import {
  CSSProperties,
  ChangeEvent,
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import styles from "./ScrollActivatedVideo.module.scss";

type ScrollActivatedVideoProps = {
  className?: string;
  src?: string | null;
  poster?: string;
  title: string;
  replayLabel: string;
  playWithSoundLabel?: string;
  playLabel?: string;
  pauseLabel?: string;
  muteLabel?: string;
  unmuteLabel?: string;
  volumeLabel?: string;
  seekLabel?: string;
  fullscreenLabel?: string;
  exitFullscreenLabel?: string;
  allowReplayFromControls?: boolean;
  autoplay?: boolean;
  showReplayButton?: boolean;
  showCenterPlayOverlay?: boolean;
  showSoundToggle?: boolean;
  fallback: ReactNode;
  onPlaybackStart?: () => void;
  onPlaybackEnd?: () => void;
};

export type ScrollActivatedVideoHandle = {
  play: (options?: { forceUnmute?: boolean }) => Promise<void>;
  replay: (options?: { forceUnmute?: boolean }) => Promise<void>;
};

type FullscreenDocument = Document & {
  webkitFullscreenElement?: Element | null;
  webkitExitFullscreen?: () => Promise<void> | void;
};

type FullscreenCapableElement = HTMLElement & {
  webkitRequestFullscreen?: () => Promise<void> | void;
};

type IOSFullscreenVideo = HTMLVideoElement & {
  webkitEnterFullscreen?: () => void;
  webkitExitFullscreen?: () => void;
  webkitDisplayingFullscreen?: boolean;
};

const DEFAULT_VOLUME = 0.5;
const SEEK_STEP_SECONDS = 0.1;
const HOVER_IDLE_TIMEOUT_MS = 1200;

function clampVolume(value: number) {
  return Math.min(1, Math.max(0, value));
}

function formatDuration(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) {
    return "0:00";
  }

  const wholeSeconds = Math.floor(seconds);
  const hours = Math.floor(wholeSeconds / 3600);
  const minutes = Math.floor((wholeSeconds % 3600) / 60);
  const remainingSeconds = wholeSeconds % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

function resolveVideoDuration(video: HTMLVideoElement) {
  const metadataDuration = video.duration;

  if (Number.isFinite(metadataDuration) && metadataDuration > 0) {
    return metadataDuration;
  }

  if (video.seekable.length > 0) {
    const seekableEnd = video.seekable.end(video.seekable.length - 1);

    if (Number.isFinite(seekableEnd) && seekableEnd > 0) {
      return seekableEnd;
    }
  }

  return 0;
}

function blurActiveElement() {
  if (typeof document === "undefined") {
    return;
  }

  const activeElement = document.activeElement;

  if (activeElement instanceof HTMLElement) {
    activeElement.blur();
  }
}

export const ScrollActivatedVideo = forwardRef<
  ScrollActivatedVideoHandle,
  ScrollActivatedVideoProps
>(function ScrollActivatedVideo(
  {
    className,
    src,
    poster,
    title,
    replayLabel,
    playWithSoundLabel = "Play with sound",
    playLabel = "Play",
    pauseLabel = "Pause",
    muteLabel = "Mute",
    unmuteLabel = "Unmute",
    volumeLabel = "Volume",
    seekLabel = "Seek video",
    fullscreenLabel = "Full screen",
    exitFullscreenLabel = "Exit full screen",
    allowReplayFromControls = true,
    autoplay = true,
    showReplayButton = true,
    showCenterPlayOverlay = true,
    showSoundToggle = true,
    fallback,
    onPlaybackStart,
    onPlaybackEnd,
  },
  ref,
) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverIdleTimerRef = useRef<number | null>(null);
  const [hasError, setHasError] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [lastNonZeroVolume, setLastNonZeroVolume] = useState(DEFAULT_VOLUME);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPointerInside, setIsPointerInside] = useState(false);
  const [isPointerActive, setIsPointerActive] = useState(false);
  const [requiresUserPlay, setRequiresUserPlay] = useState(!autoplay);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const shouldRenderVideo = Boolean(src) && !hasError;
  const safeDuration = Number.isFinite(duration) && duration > 0 ? duration : 0;
  const safeCurrentTime = Math.min(currentTime, safeDuration || currentTime);
  const seekPercent = safeDuration > 0 ? (safeCurrentTime / safeDuration) * 100 : 0;
  const timeline = `${formatDuration(safeCurrentTime)} / ${formatDuration(safeDuration)}`;
  const showCenterPlayButton =
    showCenterPlayOverlay &&
    (requiresUserPlay || (!isPlaying && !hasEnded) || (hasEnded && !showReplayButton));
  const showControls = !hasEnded && (!isPlaying || isPointerActive);
  const isVideoInteractionLocked = hasEnded && !allowReplayFromControls;
  const shouldHideCursor = isPointerInside && !isPointerActive && isPlaying && !hasEnded;
  const centerButtonLabel = hasEnded ? replayLabel : playLabel;
  const centerButtonAriaLabel = hasEnded
    ? replayLabel
    : requiresUserPlay
      ? playWithSoundLabel
      : playLabel;

  const syncTimelineState = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setCurrentTime(video.currentTime);
    const resolvedDuration = resolveVideoDuration(video);

    if (resolvedDuration > 0) {
      setDuration(resolvedDuration);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverIdleTimerRef.current !== null) {
        window.clearTimeout(hoverIdleTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updatePreference = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };

    updatePreference();
    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);

      return () => {
        mediaQuery.removeEventListener("change", updatePreference);
      };
    }

    mediaQuery.addListener(updatePreference);

    return () => {
      mediaQuery.removeListener(updatePreference);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !shouldRenderVideo) {
      return;
    }

    video.volume = volume;
    video.muted = isMuted;
  }, [isMuted, shouldRenderVideo, volume]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !shouldRenderVideo || !autoplay || prefersReducedMotion) {
      return;
    }

    const startPlayback = async () => {
      if (!video.paused || hasEnded) {
        return;
      }

      try {
        await video.play();
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
  }, [autoplay, hasEnded, prefersReducedMotion, shouldRenderVideo]);

  useEffect(() => {
    if (typeof document === "undefined") {
      return;
    }

    const fullscreenDoc = document as FullscreenDocument;
    const video = videoRef.current as IOSFullscreenVideo | null;

    const syncFullscreenState = () => {
      const fullscreenElement =
        fullscreenDoc.fullscreenElement ??
        fullscreenDoc.webkitFullscreenElement ??
        null;
      const rootElement = rootRef.current;
      const videoElement = videoRef.current;

      setIsFullscreen(
        Boolean(
          fullscreenElement &&
            (fullscreenElement === rootElement || fullscreenElement === videoElement),
        ),
      );
    };
    const onIOSFullscreenStart = () => {
      setIsFullscreen(true);
    };
    const onIOSFullscreenEnd = () => {
      setIsFullscreen(false);
    };

    syncFullscreenState();

    document.addEventListener("fullscreenchange", syncFullscreenState);
    document.addEventListener("webkitfullscreenchange", syncFullscreenState);
    video?.addEventListener("webkitbeginfullscreen", onIOSFullscreenStart as EventListener);
    video?.addEventListener("webkitendfullscreen", onIOSFullscreenEnd as EventListener);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
      document.removeEventListener("webkitfullscreenchange", syncFullscreenState);
      video?.removeEventListener(
        "webkitbeginfullscreen",
        onIOSFullscreenStart as EventListener,
      );
      video?.removeEventListener("webkitendfullscreen", onIOSFullscreenEnd as EventListener);
    };
  }, []);

  const playVideo = async (options?: {
    restart?: boolean;
    forceUnmute?: boolean;
  }) => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (options?.restart) {
      video.currentTime = 0;
      setCurrentTime(0);
      setHasEnded(false);
    }

    if (options?.forceUnmute) {
      const targetVolume =
        volume > 0
          ? volume
          : lastNonZeroVolume > 0
            ? lastNonZeroVolume
            : DEFAULT_VOLUME;
      video.volume = targetVolume;
      video.muted = false;
      setVolume(targetVolume);
      setIsMuted(false);
    }

    setRequiresUserPlay(false);

    try {
      await video.play();
    } catch {
      // If the browser blocks audible playback, retry muted so the video still starts.
      video.muted = true;
      setIsMuted(true);

      try {
        await video.play();
      } catch {
        setRequiresUserPlay(true);
      }
    }
  };

  const handleVideoToggle = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused || video.ended) {
      const shouldRestart = video.ended || hasEnded;

      if (shouldRestart && !allowReplayFromControls) {
        return;
      }

      await playVideo({
        restart: shouldRestart,
        forceUnmute: requiresUserPlay,
      });
      return;
    }

    video.pause();
  };

  const handleReplay = async () => {
    if (!allowReplayFromControls) {
      return;
    }

    await playVideo({ restart: true });
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const nextVolume = clampVolume(Number(event.target.value));
    const mutedByVolume = nextVolume <= 0;

    setVolume(nextVolume);
    setIsMuted(mutedByVolume);

    if (nextVolume > 0) {
      setLastNonZeroVolume(nextVolume);
    }

    if (!video) {
      return;
    }

    video.volume = nextVolume;
    video.muted = mutedByVolume;
  };

  const handleMuteToggle = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (isMuted || volume <= 0) {
      const restoredVolume =
        volume > 0
          ? volume
          : lastNonZeroVolume > 0
            ? lastNonZeroVolume
            : DEFAULT_VOLUME;

      video.muted = false;
      video.volume = restoredVolume;
      setIsMuted(false);
      setVolume(restoredVolume);
      setLastNonZeroVolume(restoredVolume);
      return;
    }

    video.muted = true;
    setIsMuted(true);
  };

  const handleSeekChange = (event: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;

    if (!video || safeDuration <= 0) {
      return;
    }

    const nextTime = Math.min(
      safeDuration,
      Math.max(0, Number(event.target.value)),
    );

    video.currentTime = nextTime;
    setCurrentTime(nextTime);

    if (hasEnded && nextTime < safeDuration) {
      setHasEnded(false);
    }
  };

  const clearHoverIdleTimer = () => {
    if (hoverIdleTimerRef.current === null) {
      return;
    }

    window.clearTimeout(hoverIdleTimerRef.current);
    hoverIdleTimerRef.current = null;
  };

  const activatePointerHover = () => {
    if (typeof window === "undefined") {
      return;
    }

    setIsPointerActive(true);
    clearHoverIdleTimer();
    hoverIdleTimerRef.current = window.setTimeout(() => {
      setIsPointerActive(false);
    }, HOVER_IDLE_TIMEOUT_MS);
  };

  const exitFullscreenIfNeeded = async () => {
    if (typeof document === "undefined") {
      return;
    }

    const fullscreenDoc = document as FullscreenDocument;
    const fullscreenElement =
      fullscreenDoc.fullscreenElement ??
      fullscreenDoc.webkitFullscreenElement ??
      null;

    if (fullscreenElement) {
      if (fullscreenDoc.exitFullscreen) {
        await fullscreenDoc.exitFullscreen();
        return;
      }

      if (fullscreenDoc.webkitExitFullscreen) {
        await fullscreenDoc.webkitExitFullscreen();
      }
      return;
    }

    const video = videoRef.current as IOSFullscreenVideo | null;

    if (video?.webkitDisplayingFullscreen) {
      video.webkitExitFullscreen?.();
    }
  };

  const handleFullscreenToggle = async () => {
    if (typeof document === "undefined") {
      return;
    }

    const fullscreenDoc = document as FullscreenDocument;
    const fullscreenElement =
      fullscreenDoc.fullscreenElement ??
      fullscreenDoc.webkitFullscreenElement ??
      null;

    try {
      if (fullscreenElement) {
        await exitFullscreenIfNeeded();
        blurActiveElement();
        return;
      }

      const fullscreenTarget = rootRef.current as FullscreenCapableElement | null;

      if (fullscreenTarget?.requestFullscreen) {
        await fullscreenTarget.requestFullscreen();
        blurActiveElement();
        return;
      }

      if (fullscreenTarget?.webkitRequestFullscreen) {
        await fullscreenTarget.webkitRequestFullscreen();
        blurActiveElement();
        return;
      }

      const video = videoRef.current as IOSFullscreenVideo | null;
      video?.webkitEnterFullscreen?.();
      blurActiveElement();
    } catch {
      // Fullscreen may be blocked by browser policy.
    }
  };

  const handleUserPlayWithSound = async () => {
    await playVideo({ forceUnmute: true });
  };

  useImperativeHandle(
    ref,
    () => ({
      play: async (options) => {
        await playVideo({
          forceUnmute: options?.forceUnmute ?? false,
        });
      },
      replay: async (options) => {
        await playVideo({
          restart: true,
          forceUnmute: options?.forceUnmute ?? false,
        });
      },
    }),
  );

  if (!shouldRenderVideo) {
    return <div className={className}>{fallback}</div>;
  }

  return (
    <div
      ref={rootRef}
      className={`${styles.root} ${shouldHideCursor ? styles.cursorHidden : ""} ${className ?? ""}`}
      onMouseEnter={() => {
        setIsPointerInside(true);
        activatePointerHover();
      }}
      onMouseMove={() => {
        activatePointerHover();
      }}
      onMouseLeave={() => {
        setIsPointerInside(false);
        setIsPointerActive(false);
        clearHoverIdleTimer();
      }}
      onTouchStart={() => {
        activatePointerHover();
      }}
      onTouchMove={() => {
        activatePointerHover();
      }}
      onTouchEnd={() => {
        if (isPlaying) {
          activatePointerHover();
        }
      }}
      onTouchCancel={() => {
        if (isPlaying) {
          activatePointerHover();
        }
      }}
    >
      <video
        ref={videoRef}
        className={`${styles.video} ${!isVideoInteractionLocked ? styles.videoInteractive : ""}`}
        aria-label={title}
        tabIndex={isVideoInteractionLocked ? -1 : 0}
        autoPlay={autoplay}
        muted={isMuted}
        playsInline
        preload="metadata"
        controls={false}
        poster={poster}
        onError={() => setHasError(true)}
        onLoadedMetadata={() => {
          syncTimelineState();
        }}
        onLoadedData={() => {
          syncTimelineState();
        }}
        onCanPlay={() => {
          syncTimelineState();
        }}
        onDurationChange={() => {
          syncTimelineState();
        }}
        onProgress={() => {
          syncTimelineState();
        }}
        onTimeUpdate={() => {
          syncTimelineState();
        }}
        onEnded={() => {
          const video = videoRef.current;
          const resolvedDuration = video ? resolveVideoDuration(video) : 0;

          setIsPlaying(false);
          setHasEnded(true);
          if (resolvedDuration > 0) {
            setDuration(resolvedDuration);
            setCurrentTime(resolvedDuration);
          } else {
            setCurrentTime(video?.duration ?? currentTime);
          }
          void exitFullscreenIfNeeded();
          onPlaybackEnd?.();
        }}
        onPlay={() => {
          setIsPlaying(true);
          setHasEnded(false);
          onPlaybackStart?.();
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        onClick={() => {
          if (isVideoInteractionLocked) {
            return;
          }

          activatePointerHover();
          void handleVideoToggle();
        }}
        onKeyDown={(event) => {
          if (isVideoInteractionLocked) {
            return;
          }

          if (event.key !== " " && event.key !== "Enter") {
            return;
          }

          event.preventDefault();
          void handleVideoToggle();
        }}
      >
        <source src={src ?? undefined} type="video/mp4" />
      </video>
      {showCenterPlayButton ? (
        <>
          <div className={styles.startOverlay} aria-hidden="true" />
          <button
            type="button"
            className={styles.playWithSoundButton}
            aria-label={centerButtonAriaLabel}
            onClick={() => {
              if (hasEnded) {
                void playVideo({ restart: true });
                return;
              }

              if (requiresUserPlay) {
                void handleUserPlayWithSound();
                return;
              }

              void handleVideoToggle();
            }}
          >
            <span aria-hidden="true" className={styles.playIconWrap}>
              <svg viewBox="0 0 24 24" className={styles.playIcon}>
                <path d="M8 5v14l11-7z" fill="currentColor" />
              </svg>
            </span>
            <span className={styles.playButtonLabel}>{centerButtonLabel}</span>
          </button>
        </>
      ) : null}

      {!hasEnded ? (
        <div className={`${styles.controls} ${showControls ? styles.controlsVisible : ""}`}>
          <div className={styles.seekRow}>
            <input
              type="range"
              min={0}
              max={safeDuration > 0 ? safeDuration : 0}
              step={SEEK_STEP_SECONDS}
              value={safeDuration > 0 ? safeCurrentTime : 0}
              onChange={handleSeekChange}
              className={styles.seekSlider}
              aria-label={seekLabel}
              disabled={safeDuration <= 0}
              style={
                {
                  "--seek-percent": `${Math.round(seekPercent)}%`,
                } as CSSProperties
              }
            />
          </div>
          <div className={styles.controlRow}>
            <div className={styles.leftControls}>
              <button
                type="button"
                className={styles.controlButton}
                aria-label={isPlaying ? pauseLabel : playLabel}
                onClick={() => {
                  void handleVideoToggle();
                }}
              >
                {isPlaying ? (
                  <svg className={styles.controlIcon} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 6h3v12H8zM13 6h3v12h-3z" fill="currentColor" />
                  </svg>
                ) : (
                  <svg className={styles.controlIcon} viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                )}
              </button>

              {showSoundToggle ? (
                <>
                  <button
                    type="button"
                    className={styles.controlButton}
                    aria-label={isMuted ? unmuteLabel : muteLabel}
                    onClick={handleMuteToggle}
                  >
                    {isMuted || volume <= 0 ? (
                      <svg className={styles.controlIcon} viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M14 5.23v2.06A3.001 3.001 0 0 1 17 10h2c0-2.64-1.67-4.9-4-5.77zM4.27 3 3 4.27 7.73 9H5v6h4l5 5v-6.73l4.73 4.73L20 16.73 4.27 3zM14 10.27l-2-2V12l2 2v-3.73z"
                          fill="currentColor"
                        />
                      </svg>
                    ) : (
                      <svg className={styles.controlIcon} viewBox="0 0 24 24" aria-hidden="true">
                        <path
                          d="M5 9v6h4l5 5V4L9 9H5zm11.5 3c0-1.77-1-3.29-2.5-4.03v8.05A4.48 4.48 0 0 0 16.5 12zm0-7v2.06A7 7 0 0 1 20 12a7 7 0 0 1-3.5 6v2.06A9 9 0 0 0 22 12a9 9 0 0 0-5.5-7z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                  </button>
                  <label className={styles.volumeControl}>
                    <input
                      type="range"
                      min={0}
                      max={1}
                      step={0.05}
                      value={volume}
                      onChange={handleVolumeChange}
                      className={styles.volumeSlider}
                      aria-label={volumeLabel}
                      style={
                        {
                          "--volume-percent": `${Math.round(volume * 100)}%`,
                        } as CSSProperties
                      }
                    />
                  </label>
                </>
              ) : null}

              <span className={styles.timeText}>{timeline}</span>
            </div>
            <div className={styles.rightControls}>
              <button
                type="button"
                className={styles.controlButton}
                aria-label={isFullscreen ? exitFullscreenLabel : fullscreenLabel}
                onClick={() => {
                  void handleFullscreenToggle();
                }}
              >
                {isFullscreen ? (
                  <svg className={styles.controlIcon} viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M6 16h2v2h2v2H6v-4zm10 2h2v-2h2v4h-4v-2zM6 4h4v2H8v2H6V4zm12 0h2v4h-2V6h-2V4h4z"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg className={styles.controlIcon} viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M7 14H5v5h5v-2H7v-3zm0-4h2V7h3V5H5v5zm10 7h-3v2h5v-5h-2v3zm0-12h-3v2h3v3h2V5h-2z"
                      fill="currentColor"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
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
});
