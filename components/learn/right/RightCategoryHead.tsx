"use client";

import styles from "../learnShell.module.css";

type Props = {
  title: string;
  outcome: string;
};

export default function RightCategoryHead({ title, outcome }: Props) {
  return (
    <div className={styles.panelHead}>
      <div>
        <h2 className={styles.panelTitle}>{title}</h2>
        <div className={styles.panelOutcome}>{outcome}</div>
      </div>

      {/* keep container, remove pills */}
      <div className={styles.panelRight} />
    </div>
  );
}
