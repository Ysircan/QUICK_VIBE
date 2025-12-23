import React from "react";
import styles from "./backgroundShell.module.css";

export default function BackgroundShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.root}>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
