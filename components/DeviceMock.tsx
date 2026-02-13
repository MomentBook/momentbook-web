"use client";

import { ReactNode } from "react";
import styles from "./DeviceMock.module.scss";

interface DeviceMockProps {
  children?: ReactNode;
  type?: "phone" | "tablet";
  className?: string;
  screenClassName?: string;
}

export function DeviceMock({
  children,
  type = "phone",
  className = "",
  screenClassName = "",
}: DeviceMockProps) {
  const isPhone = type === "phone";

  return (
    <div className={`${styles.device} ${styles[type]} ${className}`}>
      <div className={styles.body}>
        <div className={`${styles.screen} ${screenClassName}`}>{children}</div>
        <div className={styles.reflection} aria-hidden />
        {isPhone ? (
          <>
            <span className={`${styles.sideButton} ${styles.volumeUp}`} aria-hidden />
            <span className={`${styles.sideButton} ${styles.volumeDown}`} aria-hidden />
            <span className={`${styles.sideButton} ${styles.powerButton}`} aria-hidden />
            <div className={styles.cameraIsland} aria-hidden />
            <div className={styles.homeIndicator} aria-hidden />
          </>
        ) : null}
      </div>
    </div>
  );
}
