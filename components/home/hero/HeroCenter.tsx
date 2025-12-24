"use client";

import React from "react";
import styles from "../homeHero.module.css";
import { useLocale } from "@/components/site/LocaleProvider";
import { t } from "@/components/site/i18n";

export default function HeroCenter({
  isFlipped,
  onFlip,
}: {
  isFlipped: boolean;
  onFlip: () => void;
}) {
  const { locale } = useLocale();

  return (
    <div className={styles.center}>
      <div className={styles.centerShell}>
        <div className={styles.pillRow}>
          <span className={styles.cap}>{t(locale, "hero_center_cap_vibe")}</span>
          <span className={styles.capGhost}>{t(locale, "hero_center_cap_deploy")}</span>

          <button type="button" className={styles.flipBtn} onClick={onFlip}>
            {t(locale, "hero_center_flip")}
          </button>
        </div>

        <div className={styles.flipWrap}>
          <div className={`${styles.flipInner} ${isFlipped ? styles.isFlipped : ""}`}>
            {/* Front */}
            <div className={`${styles.face} ${styles.front}`}>
              <h1 className={styles.h1}>{t(locale, "hero_center_title")}</h1>
              <p className={styles.sub}>
                {t(locale, "hero_center_sub_before")}
                <b>{t(locale, "hero_center_sub_frontend")}</b>
                {t(locale, "hero_center_sub_sep")}
                <b>{t(locale, "hero_center_sub_backend")}</b>
                {t(locale, "hero_center_sub_sep")}
                <b>{t(locale, "hero_center_sub_deploy")}</b>
                {t(locale, "hero_center_sub_sep")}
                <b>{t(locale, "hero_center_sub_database")}</b>
                {t(locale, "hero_center_sub_after")}
              </p>

              <div className={styles.ctaRow}>
                <a className={`${styles.btn} ${styles.btnPrimary}`} href="/start">
                  {t(locale, "hero_center_cta_demo")}
                </a>
                <a className={styles.btn} href="/learn">
                  {t(locale, "hero_center_cta_roadmap")}
                </a>
              </div>

              <div className={styles.microRow}>
                <span className={styles.micro}>{t(locale, "hero_center_micro_nofluff")}</span>
                <span className={styles.micro}>{t(locale, "hero_center_micro_practical")}</span>
                <span className={styles.micro}>{t(locale, "hero_center_micro_ship")}</span>
              </div>
            </div>

            {/* Back */}
            <div className={`${styles.face} ${styles.back}`}>
              <div className={styles.backTop}>
                <div className={styles.backTitle}>{t(locale, "hero_center_back_title")}</div>
                <div className={styles.backHint}>{t(locale, "hero_center_back_hint")}</div>
              </div>

              <div className={styles.backGrid}>
                <div className={styles.backBlock}>
                  <div className={styles.backCap}>{t(locale, "hero_center_back_frontend")}</div>
                  <div className={styles.backLine}>{t(locale, "hero_center_back_frontend_line")}</div>
                </div>
                <div className={styles.backBlock}>
                  <div className={styles.backCap}>{t(locale, "hero_center_back_backend")}</div>
                  <div className={styles.backLine}>{t(locale, "hero_center_back_backend_line")}</div>
                </div>
                <div className={styles.backBlock}>
                  <div className={styles.backCap}>{t(locale, "hero_center_back_database")}</div>
                  <div className={styles.backLine}>{t(locale, "hero_center_back_database_line")}</div>
                </div>
                <div className={styles.backBlock}>
                  <div className={styles.backCap}>{t(locale, "hero_center_back_deploy")}</div>
                  <div className={styles.backLine}>{t(locale, "hero_center_back_deploy_line")}</div>
                </div>
              </div>

              <div className={styles.backFooter}>
                <span className={styles.micro}>{t(locale, "hero_center_back_footer_copy")}</span>
                <span className={styles.micro}>{t(locale, "hero_center_back_footer_deploy")}</span>
                <span className={styles.micro}>{t(locale, "hero_center_back_footer_iterate")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
