"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./user.module.scss";

type UserAvatarProps = {
  name: string;
  picture: string | null;
};

const FALLBACK_AVATAR_SRC = "/images/placeholders/profile-avatar-fallback.svg";

export function UserAvatar({ name, picture }: UserAvatarProps) {
  const [isImageError, setIsImageError] = useState(false);
  const hasCustomAvatar = Boolean(picture) && !isImageError;

  return (
    <div className={styles.avatarFrame}>
      {hasCustomAvatar ? (
        <Image
          src={picture as string}
          alt={name}
          fill
          sizes="120px"
          className={styles.avatar}
          onError={() => setIsImageError(true)}
        />
      ) : (
        <div className={styles.avatarFallback}>
          <Image
            src={FALLBACK_AVATAR_SRC}
            alt=""
            aria-hidden="true"
            fill
            sizes="120px"
            className={styles.avatarFallbackImage}
          />
        </div>
      )}
    </div>
  );
}
