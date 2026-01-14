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
  return (
    <div className={`${styles.device} ${styles[type]} ${className}`}>
      <div className={`${styles.screen} ${screenClassName}`}>{children}</div>
    </div>
  );
}
