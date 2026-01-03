"use client";

import { ReactNode } from "react";
import styles from "./DeviceMock.module.scss";

interface DeviceMockProps {
  children?: ReactNode;
  type?: "phone" | "tablet";
  className?: string;
}

export function DeviceMock({
  children,
  type = "phone",
  className = "",
}: DeviceMockProps) {
  return (
    <div className={`${styles.device} ${styles[type]} ${className}`}>
      <div className={styles.screen}>{children}</div>
    </div>
  );
}
