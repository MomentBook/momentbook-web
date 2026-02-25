"use client";

import { useEffect, useRef, useState } from "react";

type ScrollActivatedVideoProps = {
  className?: string;
  src?: string | null;
  poster?: string;
  title: string;
  description: string;
  fallback: string;
};

export function ScrollActivatedVideo({
  className,
  src,
  poster,
  title,
  description,
  fallback,
}: ScrollActivatedVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);
  const shouldRenderVideo = Boolean(src) && !hasError;

  useEffect(() => {
    const video = videoRef.current;

    if (!video || !shouldRenderVideo) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (!entry) {
          return;
        }

        if (entry.isIntersecting && entry.intersectionRatio >= 0.55) {
          void video.play().catch(() => {
            // Ignore autoplay failures and keep fallback controls hidden.
          });
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
  }, [shouldRenderVideo]);

  if (!shouldRenderVideo) {
    return (
      <div className={className}>
        <p>{title}</p>
        <p>{description}</p>
        <p>{fallback}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="metadata"
        controls={false}
        poster={poster}
        onError={() => setHasError(true)}
      >
        <source src={src ?? undefined} type="video/mp4" />
      </video>
    </div>
  );
}
