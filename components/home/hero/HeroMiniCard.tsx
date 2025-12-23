"use client";

import React from "react";
import styles from "../homeHero.module.css";
import type { HeroMiniItem } from "../HomeHero";

export default function HeroMiniCard({ item }: { item: HeroMiniItem }) {
  const wash = item.washClass ? (styles as any)[item.washClass] : "";

  return (
    <div className={`${styles.mini} ${wash}`}>
      <div className={styles.miniTop}>
        <span className={styles.miniCap}>{item.cap}</span>
      </div>

      <h4 className={styles.miniTitle}>{item.title}</h4>
      <p className={styles.miniSub}>{item.sub}</p>

      <div className={styles.tagRow}>
        {item.tags.map((t, i) => (
          <span key={`${t.label}-${i}`} className={styles.tag}>
            <span
              className={styles.dot}
              style={{ ["--accent" as any]: t.accent ?? "var(--yellow)" }}
              aria-hidden="true"
            />
            {t.label}
          </span>
        ))}
      </div>
    </div>
  );
}
