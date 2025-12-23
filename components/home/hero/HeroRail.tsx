"use client";

import React from "react";
import styles from "../homeHero.module.css";
import HeroMiniCard from "./HeroMiniCard";
import type { HeroMiniItem } from "../HomeHero";

export default function HeroRail({
  side,
  direction,
  items,
}: {
  side: "left" | "right";
  direction: "up" | "down";
  items: HeroMiniItem[];
}) {
  const laneClass = `${styles.laneInner} ${direction === "up" ? styles.up : styles.down}`;

  // 关键：render 两遍，配合 CSS translateY(-50%) 无缝循环
  const loopItems = [...items, ...items];

  return (
    <aside className={styles.rail} aria-label={`${side} rail`}>
      <div className={styles.lane}>
        <div className={laneClass}>
          {loopItems.map((it, idx) => (
            <HeroMiniCard key={`${it.title}-${idx}`} item={it} />
          ))}
        </div>
      </div>

      <div className={styles.railFade} aria-hidden="true" />
    </aside>
  );
}
