import type { CSSProperties, ReactNode } from "react";
import styles from "./FadeIn.module.scss";

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className = "" }: FadeInProps) {
  const safeDelay = Number.isFinite(delay) ? Math.max(0, delay) : 0;
  const style = {
    "--fade-delay": `${safeDelay}ms`,
  } as CSSProperties;

  return (
    <div className={`${styles.fadeIn} ${className}`} style={style}>
      {children}
    </div>
  );
}
