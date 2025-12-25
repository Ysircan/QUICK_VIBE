"use client";

import neo from "@/components/ui/neo/neo.module.css";
import styles from "../learnShell.module.css";

export default function RightWorkspace() {
  return (
    <div className={styles.workspace}>
      <div className={styles.tabs}>
        <button className={neo.uiPill} type="button" aria-pressed="true">
          <span className={`${neo.uiDot} ${neo.on}`} />
          EXPLAIN
        </button>
        <button className={neo.uiPill} type="button" aria-pressed="false">
          <span className={neo.uiDot} />
          DEMO
        </button>
        <button className={neo.uiPill} type="button" aria-pressed="false">
          <span className={neo.uiDot} />
          PROMPT LAB
        </button>
      </div>

      <div className={styles.workspaceBody}>
        <div className={styles.panel}>
          <div className={styles.panelTitle}>Tab Body (placeholder)</div>
          <div className={styles.panelBody}>Later this area will switch between Explain / Demo / Prompt Lab.</div>
        </div>
      </div>
    </div>
  );
}
