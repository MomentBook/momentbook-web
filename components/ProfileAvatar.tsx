"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./ProfileAvatar.module.scss";

type ProfileAvatarProps = {
  name?: string | null;
  picture?: string | null;
  size?: "header" | "profile";
};

const FALLBACK_AVATAR_SRC = "/images/placeholders/profile-avatar-fallback.svg";

function readText(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function ProfileAvatar({
  name,
  picture,
  size = "profile",
}: ProfileAvatarProps) {
  const [failedPicture, setFailedPicture] = useState<string | null>(null);
  const normalizedPicture = readText(picture);
  const hasCustomAvatar =
    Boolean(normalizedPicture) &&
    failedPicture !== normalizedPicture;

  return (
    <span className={`${styles.root} ${size === "header" ? styles.header : styles.profile}`}>
      {hasCustomAvatar ? (
        <Image
          src={normalizedPicture as string}
          alt={name?.trim() || "Profile avatar"}
          fill
          sizes={size === "header" ? "36px" : "120px"}
          className={styles.image}
          onError={() => setFailedPicture(normalizedPicture)}
        />
      ) : (
        <Image
          src={FALLBACK_AVATAR_SRC}
          alt=""
          aria-hidden="true"
          fill
          sizes={size === "header" ? "36px" : "120px"}
          className={styles.image}
        />
      )}
    </span>
  );
}
