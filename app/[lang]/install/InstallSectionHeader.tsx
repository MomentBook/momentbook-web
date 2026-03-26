import type { ReactNode } from "react";
import styles from "./install.module.scss";

type InstallSectionHeaderProps = {
  eyebrow: string;
  title: string;
  lead: string;
  children?: ReactNode;
};

export function InstallSectionHeader({
  eyebrow,
  title,
  lead,
  children,
}: InstallSectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <p className={styles.sectionEyebrow}>{eyebrow}</p>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <p className={styles.sectionLead}>{lead}</p>
      {children}
    </div>
  );
}
