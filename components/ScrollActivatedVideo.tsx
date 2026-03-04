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
  volumeLabel?: string;
  autoplay?: boolean;
  showReplayButton?: boolean;
  showSoundToggle?: boolean;
  fallback: ReactNode;
  onPlaybackStart?: () => void;
  onPlaybackEnd?: () => void;
};

export type ScrollActivatedVideoHandle = {
  replay: (options?: { forceUnmute?: boolean }) => Promise<void>;
};

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
  volumeLabel = "Volume",
  autoplay = true,
  showReplayButton = true,
  showSoundToggle = true,
  fallback,
  onPlaybackStart,
  onPlaybackEnd,
},
ref,
) {
  const DEFAULT_VOLUME = 0.5;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const [lastNonZeroVolume, setLastNonZeroVolume] = useState(DEFAULT_VOLUME);
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

    if (!video || !shouldRenderVideo) {
      return;
    }

    video.volume = volume;
    video.muted = isMuted;
  }, [isMuted, shouldRenderVideo, volume]);

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
  }, [autoplay, hasEnded, shouldRenderVideo]);

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
      setRequiresUserPlay(true);
    }
  };

  const handleVideoToggle = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused || video.ended) {
      await playVideo({
        restart: video.ended || hasEnded,
        forceUnmute: requiresUserPlay,
      });
      return;
    }

    video.pause();
  };

  const handleReplay = async () => {
    await playVideo({ restart: true });
  };

  const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    const nextVolume = Math.min(1, Math.max(0, Number(event.target.value)));
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

  const handleUserPlayWithSound = async () => {
    await playVideo({ forceUnmute: true });
  };

  useImperativeHandle(
    ref,
    () => ({
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
    <div className={`${styles.root} ${className ?? ""}`}>
      <video
        ref={videoRef}
        className={styles.video}
        aria-label={title}
        tabIndex={0}
        autoPlay={autoplay}
        muted={isMuted}
        playsInline
        preload="metadata"
        controls={false}
        poster={poster}
        onError={() => setHasError(true)}
        onEnded={() => {
          setIsPlaying(false);
          setHasEnded(true);
          onPlaybackEnd?.();
        }}
        onPlay={() => {
          setIsPlaying(true);
          onPlaybackStart?.();
        }}
        onPause={() => {
          setIsPlaying(false);
        }}
        onClick={() => {
          void handleVideoToggle();
        }}
        onKeyDown={(event) => {
          if (event.key !== " " && event.key !== "Enter") {
            return;
          }

          event.preventDefault();
          void handleVideoToggle();
        }}
      >
        <source src={src ?? undefined} type="video/mp4" />
      </video>
      {requiresUserPlay || (!isPlaying && !hasEnded) ? (
        <>
          <div className={styles.startOverlay} aria-hidden="true" />
          <button
            type="button"
            className={styles.playWithSoundButton}
            aria-label={playWithSoundLabel}
            onClick={() => {
              if (requiresUserPlay) {
                void handleUserPlayWithSound();
                return;
              }

              void handleVideoToggle();
            }}
          >
            <span aria-hidden="true" className={styles.playIconWrap}>
              <svg viewBox="0 0 18 18" className={styles.playIcon}>
                <path d="M3.2 1.3v15.4L16.8 9 3.2 1.3Z" fill="currentColor" />
              </svg>
            </span>
            <span className={styles.visuallyHidden}>{playWithSoundLabel}</span>
          </button>
        </>
      ) : null}
      {showSoundToggle ? (
        <div className={styles.soundControls}>
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
