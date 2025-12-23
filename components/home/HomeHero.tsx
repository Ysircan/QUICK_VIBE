"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./homeHero.module.css";
import HeroRail from "./hero/HeroRail";
import HeroCenter from "./hero/HeroCenter";

export type HeroTag = { label: string; accent?: string };
export type HeroMiniItem = {
  cap: "CORE" | "SHIP" | "PRO";
  title: string;
  sub: string;
  tags: HeroTag[];
  washClass?: string; // wash1..wash4
};

const WASHES = ["wash1", "wash2", "wash3", "wash4"] as const;

function withWashes(items: Omit<HeroMiniItem, "washClass">[]): HeroMiniItem[] {
  return items.map((x, i) => ({ ...x, washClass: WASHES[i % WASHES.length] }));
}

export default function HomeHero() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [paused, setPaused] = useState(false);

  // 自动翻转：不快、不晕（你之前说“有点快”）
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIsFlipped((v) => !v), 9000);
    return () => clearInterval(t);
  }, [paused]);

  const leftItems = useMemo(
    () =>
      withWashes([
        {
          cap: "CORE",
          title: "Auth Session",
          sub: "Login state + guards.",
          tags: [
            { label: "BACKEND", accent: "var(--coral)" },
            { label: "AUTH", accent: "var(--violet)" },
          ],
        },
        {
          cap: "PRO",
          title: "Caching",
          sub: "Faster reads, less cost.",
          tags: [
            { label: "BACKEND", accent: "var(--coral)" },
            { label: "PERF", accent: "var(--amber)" },
          ],
        },
        {
          cap: "SHIP",
          title: "Upload UI",
          sub: "Drag drop + progress + errors.",
          tags: [
            { label: "FRONTEND", accent: "var(--sky)" },
            { label: "FILES", accent: "var(--violet)" },
          ],
        },
        {
          cap: "PRO",
          title: "CRUD Table",
          sub: "List, filters, actions.",
          tags: [
            { label: "FRONTEND", accent: "var(--sky)" },
            { label: "DATA", accent: "var(--teal)" },
          ],
        },
        {
          cap: "CORE",
          title: "REST API",
          sub: "Routes + validation.",
          tags: [
            { label: "BACKEND", accent: "var(--coral)" },
            { label: "API", accent: "var(--amber)" },
          ],
        },
      ]),
    []
  );

  const rightItems = useMemo(
    () =>
      withWashes([
        {
          cap: "PRO",
          title: "Migrations",
          sub: "Safe schema changes.",
          tags: [
            { label: "DATABASE", accent: "var(--teal)" },
            { label: "SCHEMA", accent: "var(--amber)" },
          ],
        },
        {
          cap: "PRO",
          title: "Monitoring",
          sub: "Errors, logs, uptime.",
          tags: [
            { label: "DEPLOY", accent: "var(--sky)" },
            { label: "OPS", accent: "var(--violet)" },
          ],
        },
        {
          cap: "CORE",
          title: "Deploy to Vercel",
          sub: "Preview → prod fast.",
          tags: [
            { label: "DEPLOY", accent: "var(--sky)" },
            { label: "VERCEL", accent: "var(--amber)" },
          ],
        },
        {
          cap: "PRO",
          title: "Env Vars",
          sub: "Secrets, config, staging.",
          tags: [
            { label: "DEPLOY", accent: "var(--sky)" },
            { label: "CONFIG", accent: "var(--teal)" },
          ],
        },
        {
          cap: "SHIP",
          title: "CI Checks",
          sub: "Lint + type + tests gate.",
          tags: [
            { label: "DEPLOY", accent: "var(--sky)" },
            { label: "CI", accent: "var(--coral)" },
          ],
        },
      ]),
    []
  );

  return (
    <section
      className={styles.hero}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-label="Quick Vibe hero"
    >
      <div className={styles.heroGrid}>
        <HeroRail side="left" direction="up" items={leftItems} />

        <HeroCenter
          isFlipped={isFlipped}
          onFlip={() => setIsFlipped((v) => !v)}
        />

        <HeroRail side="right" direction="down" items={rightItems} />
      </div>
    </section>
  );
}
