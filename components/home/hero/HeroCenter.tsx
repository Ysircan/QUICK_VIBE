"use client";

import React from "react";
import styles from "../homeHero.module.css";

export default function HeroCenter({
  isFlipped,
  onFlip,
}: {
  isFlipped: boolean;
  onFlip: () => void;
}) {
  return (
    <div className={styles.center}>
      <div className={styles.centerShell}>
        <div className={styles.pillRow}>
          <span className={styles.cap}>VIBE CODING</span>
          <span className={styles.capGhost}>DEPLOY-FIRST</span>

          <button type="button" className={styles.flipBtn} onClick={onFlip}>
            Flip
          </button>
        </div>

        <div className={styles.flipWrap}>
          <div className={`${styles.flipInner} ${isFlipped ? styles.isFlipped : ""}`}>
            {/* Front */}
            <div className={`${styles.face} ${styles.front}`}>
              <h1 className={styles.h1}>Vibe coding starts here.</h1>
              <p className={styles.sub}>
                Ship a demo fast. Learn <b>Frontend</b> · <b>Backend</b> · <b>Deploy</b> · <b>Database</b>.
              </p>

              <div className={styles.ctaRow}>
                <a className={`${styles.btn} ${styles.btnPrimary}`} href="/start">
                  Start with a Demo
                </a>
                <a className={styles.btn} href="/learn">
                  Browse Roadmap
                </a>
              </div>

              <div className={styles.microRow}>
                <span className={styles.micro}>No fluff</span>
                <span className={styles.micro}>Practical</span>
                <span className={styles.micro}>Ship weekly</span>
              </div>
            </div>

            {/* Back */}
            <div className={`${styles.face} ${styles.back}`}>
              <div className={styles.backTop}>
                <div className={styles.backTitle}>What you’ll be able to ship</div>
                <div className={styles.backHint}>flip anytime</div>
              </div>

              <div className={styles.backGrid}>
                <div className={styles.backBlock}>
                  <div className={styles.backCap}>FRONTEND</div>
                  <div className={styles.backLine}>Landing · UI states · Upload flow</div>
                </div>
                <div className={styles.backBlock}>
                  <div className={styles.backCap}>BACKEND</div>
                  <div className={styles.backLine}>REST routes · Auth guard · Webhooks</div>
                </div>
                <div className={styles.backBlock}>
                  <div className={styles.backCap}>DATABASE</div>
                  <div className={styles.backLine}>Schema · Migrations · Index basics</div>
                </div>
                <div className={styles.backBlock}>
                  <div className={styles.backCap}>DEPLOY</div>
                  <div className={styles.backLine}>Env · Preview → Prod · Monitoring</div>
                </div>
              </div>

              <div className={styles.backFooter}>
                <span className={styles.micro}>Copy patterns</span>
                <span className={styles.micro}>Deploy first</span>
                <span className={styles.micro}>Iterate fast</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
