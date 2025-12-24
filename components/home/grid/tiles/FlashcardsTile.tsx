// components/home/grid/tiles/FlashcardsTile.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./flashcardsTile.module.css";

type Phase = "idle" | "typing" | "running";

// ✅ 固定 1 对 1，不会乱
const DECK = [
  { en: "code", zh: "代码" },
  { en: "frontend", zh: "前端" },
  { en: "backend", zh: "后端" },
  { en: "database", zh: "数据库" },
  { en: "deployment", zh: "部署" },
];

export default function FlashcardsTile() {
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
      // ✅ 逻辑：一张卡 = 英文/中文翻一次；翻回英文时才切到下一张
      flipTimerRef.current = window.setInterval(() => {
        setFlipped((f) => {
          const next = !f;

          // next === false 表示翻回“英文面”，此时推进到下一张
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
              DEMO 02
            </span>

            <span className={styles.capBtn}>FLASHCARDS</span>

            <span className={styles.uiPill}>
              <span className={styles.uiDot} />
              ENGLISH
            </span>
          </div>
        </header>

        <div className={styles.body}>
          <section className={`${styles.panel} ${styles.codePanel}`}>
            <div className={styles.panelTop}>
              <span>CODE</span>
              <span className={styles.meta}>minimal</span>
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
              <span>RESULT</span>
              <span className={styles.meta}>auto flip</span>
            </div>

            <div className={styles.resultCanvas}>
              <div className={styles.flashWrap}>
                <div className={styles.cardBoard}>
                  <div className={styles.miniCard} data-flipped={flipped}>
                    <div className={styles.face}>
                      {/* ✅ 中文面 */}
                      <div className={styles.bigZh}>{cur.zh}</div>
                      <div className={styles.sub}>meaning</div>
                    </div>
                    <div className={styles.back}>
                      {/* ✅ 英文面 */}
                      <div className={styles.bigEn}>{cur.en}</div>
                      <div className={styles.sub}>spell</div>
                    </div>
                  </div>

                  <div className={styles.miniRow}>
                    <span className={styles.miniPill}>1.2s</span>
                    <span className={styles.miniPill}>AUTO</span>
                  </div>
                </div>

                <div className={styles.kpiStack}>
                  <div className={styles.kpiBox}>
                    <div className={styles.k}>WORD</div>
                    <div className={styles.vMono}>{cur.en}</div>
                    <div className={styles.bar}>
                      <i />
                    </div>
                  </div>

                  <div className={styles.kpiBox}>
                    <div className={styles.k}>KNOWN</div>
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
            <span className={styles.promptLabel}>VIBE</span>
            <div className={styles.promptText}>
              Make a flashcard
            </div>
            <button className={styles.sendBtn} onClick={onSend} disabled={locked} type="button">
              <span>SEND</span>
              <span className={styles.uiDot} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
