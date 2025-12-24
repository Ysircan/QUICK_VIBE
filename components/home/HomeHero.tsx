"use client";

import React, { useEffect, useMemo, useState } from "react";
import styles from "./homeHero.module.css";
import HeroRail from "./hero/HeroRail";
import HeroCenter from "./hero/HeroCenter";
import { useLocale } from "@/components/site/LocaleProvider";
import { t } from "@/components/site/i18n";

export type HeroTag = { label: string; accent?: string };
export type HeroMiniItem = {
  cap: string;
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
  const { locale } = useLocale();

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
          cap: t(locale, "hero_cap_core"),
          title: t(locale, "hero_title_auth_session"),
          sub: t(locale, "hero_sub_auth_session"),
          tags: [
            { label: t(locale, "tag_backend"), accent: "var(--coral)" },
            { label: t(locale, "tag_auth"), accent: "var(--violet)" },
          ],
        },
        {
          cap: t(locale, "hero_cap_pro"),
          title: t(locale, "hero_title_caching"),
          sub: t(locale, "hero_sub_caching"),
          tags: [
            { label: t(locale, "tag_backend"), accent: "var(--coral)" },
            { label: t(locale, "tag_perf"), accent: "var(--amber)" },
          ],
        },
        {
          cap: t(locale, "hero_cap_ship"),
          title: t(locale, "hero_title_upload_ui"),
          sub: t(locale, "hero_sub_upload_ui"),
          tags: [
            { label: t(locale, "tag_frontend"), accent: "var(--sky)" },
            { label: t(locale, "tag_files"), accent: "var(--violet)" },
          ],
        },
        {
          cap: t(locale, "hero_cap_pro"),
          title: t(locale, "hero_title_crud_table"),
          sub: t(locale, "hero_sub_crud_table"),
          tags: [
            { label: t(locale, "tag_frontend"), accent: "var(--sky)" },
            { label: t(locale, "tag_data"), accent: "var(--teal)" },
          ],
        },
        {
          cap: t(locale, "hero_cap_core"),
          title: t(locale, "hero_title_rest_api"),
          sub: t(locale, "hero_sub_rest_api"),
          tags: [
            { label: t(locale, "tag_backend"), accent: "var(--coral)" },
            { label: t(locale, "tag_api"), accent: "var(--amber)" },
          ],
        },
      ]),
    [locale]
  );

  const rightItems = useMemo(
    () =>
      withWashes([
        {
          cap: t(locale, "hero_cap_pro"),
          title: t(locale, "hero_title_migrations"),
          sub: t(locale, "hero_sub_migrations"),
          tags: [
            { label: t(locale, "tag_database"), accent: "var(--teal)" },
            { label: t(locale, "tag_schema"), accent: "var(--amber)" },
          ],
        },
        {
          cap: t(locale, "hero_cap_pro"),
          title: t(locale, "hero_title_monitoring"),
          sub: t(locale, "hero_sub_monitoring"),
          tags: [
            { label: t(locale, "tag_deploy"), accent: "var(--sky)" },
            { label: t(locale, "tag_ops"), accent: "var(--violet)" },
          ],
        },
        {
          cap: t(locale, "hero_cap_core"),
          title: t(locale, "hero_title_deploy_vercel"),
          sub: t(locale, "hero_sub_deploy_vercel"),
          tags: [
            { label: t(locale, "tag_deploy"), accent: "var(--sky)" },
            { label: t(locale, "tag_vercel"), accent: "var(--amber)" },
          ],
        },
        {
          cap: t(locale, "hero_cap_pro"),
          title: t(locale, "hero_title_env_vars"),
          sub: t(locale, "hero_sub_env_vars"),
          tags: [
            { label: t(locale, "tag_deploy"), accent: "var(--sky)" },
            { label: t(locale, "tag_config"), accent: "var(--teal)" },
          ],
        },
        {
          cap: t(locale, "hero_cap_ship"),
          title: t(locale, "hero_title_ci_checks"),
          sub: t(locale, "hero_sub_ci_checks"),
          tags: [
            { label: t(locale, "tag_deploy"), accent: "var(--sky)" },
            { label: t(locale, "tag_ci"), accent: "var(--coral)" },
          ],
        },
      ]),
    [locale]
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
