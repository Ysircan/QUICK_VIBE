// components/home/grid/tiles/FlashcardsTile.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./flashcardsTile.module.css";
import { useLocale } from "@/components/site/LocaleProvider";
import { t } from "@/components/site/i18n";

type Phase = "idle" | "typing" | "running";

const DECK = [
  { en: "code", zh: "代码" },
  { en: "frontend", zh: "前端" },
  { en: "backend", zh: "后端" },
  { en: "database", zh: "数据库" },
  { en: "deployment", zh: "部署" },
];

export default function FlashcardsTile() {
  const { locale } = useLocale();
  const codeLines = useMemo(
    () => [
      `const deck = ["code","frontend","backend","database","deployment"];`,
      `const pair = lookup(deck);`,
      `autoFlip(pair, { every: 1200 });`,
    ],
    []
  );

  const [phase, setPhase] = useState<Phase>("idle");
  const [locked, setLocked] = useState(false);
  const [revealed, setRevealed] = useState(0);

  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState(12);

  const timersRef = useRef<number[]>([]);
  const flipTimerRef = useRef<number | null>(null);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
    if (flipTimerRef.current) {
      window.clearInterval(flipTimerRef.current);
      flipTimerRef.current = null;
    }
  };

  useEffect(() => () => clearAllTimers(), []);

  useEffect(() => {
    clearAllTimers();

    if (phase === "typing") {
      setRevealed(0);
      setIdx(0);
      setFlipped(false);
      setKnown(12);

      codeLines.forEach((_, i) => {
        const t = window.setTimeout(() => {
          setRevealed((prev) => Math.max(prev, i + 1));
        }, 420 * (i + 1));
        timersRef.current.push(t);
      });

      const done = window.setTimeout(() => setPhase("running"), 420 * (codeLines.length + 1));
      timersRef.current.push(done);
    }

    if (phase === "running") {
      flipTimerRef.current = window.setInterval(() => {
        setFlipped((f) => {
          const next = !f;

          if (next === false) {
            setIdx((p) => (p + 1) % DECK.length);
            setKnown((k) => Math.min(99, k + (Math.random() > 0.7 ? 1 : 0)));
          }
          return next;
        });
      }, 1200);

      const unlock = window.setTimeout(() => setLocked(false), 2600);
      timersRef.current.push(unlock);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const onSend = () => {
    if (locked) return;
    setLocked(true);
    setPhase("typing");
  };

  const cur = DECK[idx];

  return (
    <div className={styles.tileWrap}>
      <article className={`${styles.tile} ${styles.uiPanel}`} data-state={phase}>
        <header className={styles.tileHeader}>
          <div className={styles.left}>
            <span className={styles.uiPill}>
              <span className={styles.uiDot} />
              {t(locale, "grid_demo_02")}
            </span>

            <span className={styles.capBtn}>{t(locale, "grid_flashcards")}</span>

            <span className={styles.uiPill}>
              <span className={styles.uiDot} />
              {t(locale, "grid_english")}
            </span>
          </div>
        </header>

        <div className={styles.body}>
          <section className={`${styles.panel} ${styles.codePanel}`}>
            <div className={styles.panelTop}>
              <span>{t(locale, "grid_code")}</span>
              <span className={styles.meta}>{t(locale, "grid_minimal")}</span>
            </div>

            <div className={styles.codeArea}>
              {codeLines.slice(0, revealed).map((line, i) => (
                <div key={i} className={styles.codeLine}>
                  {line}
                </div>
              ))}
            </div>
          </section>

          <section className={`${styles.panel} ${styles.resultPanel}`}>
            <div className={styles.panelTop}>
              <span>{t(locale, "grid_result")}</span>
              <span className={styles.meta}>{t(locale, "grid_auto_flip")}</span>
            </div>

            <div className={styles.resultCanvas}>
              <div className={styles.flashWrap}>
                <div className={styles.cardBoard}>
                  <div className={styles.miniCard} data-flipped={flipped}>
                    <div className={styles.face}>
                      <div className={styles.bigZh}>{cur.zh}</div>
                      <div className={styles.sub}>{t(locale, "grid_meaning")}</div>
                    </div>
                    <div className={styles.back}>
                      <div className={styles.bigEn}>{cur.en}</div>
                      <div className={styles.sub}>{t(locale, "grid_spell")}</div>
                    </div>
                  </div>

                  <div className={styles.miniRow}>
                    <span className={styles.miniPill}>{t(locale, "grid_interval")}</span>
                    <span className={styles.miniPill}>{t(locale, "grid_auto")}</span>
                  </div>
                </div>

                <div className={styles.kpiStack}>
                  <div className={styles.kpiBox}>
                    <div className={styles.k}>{t(locale, "grid_word")}</div>
                    <div className={styles.vMono}>{cur.en}</div>
                    <div className={styles.bar}>
                      <i />
                    </div>
                  </div>

                  <div className={styles.kpiBox}>
                    <div className={styles.k}>{t(locale, "grid_known")}</div>
                    <div className={styles.v}>{String(known).padStart(2, "0")}%</div>
                    <div className={styles.bar}>
                      <i />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className={styles.promptRow}>
            <span className={styles.promptLabel}>{t(locale, "grid_vibe")}</span>
            <div className={styles.promptText}>{t(locale, "grid_flash_prompt")}</div>
            <button className={styles.sendBtn} onClick={onSend} disabled={locked} type="button">
              <span>{t(locale, "grid_send")}</span>
              <span className={styles.uiDot} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
