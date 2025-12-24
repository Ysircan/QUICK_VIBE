"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./tetrisTile.module.css";

type Phase = "idle" | "typing" | "running";

export default function TetrisTile() {
  const codeLines = useMemo(
    () => [
      `const board = grid(10, 14);`,
      `const piece = spawn("T");`,
      `run(loop(drop(piece), render));`,
    ],
    []
  );

  const [phase, setPhase] = useState<Phase>("idle");
  const [revealed, setRevealed] = useState(0);
  const [score, setScore] = useState(714);
  const [lines, setLines] = useState(3);
  const [locked, setLocked] = useState(false);

  const timersRef = useRef<number[]>([]);
  const kpiTimerRef = useRef<number | null>(null);

  const clearAllTimers = () => {
    timersRef.current.forEach((t) => window.clearTimeout(t));
    timersRef.current = [];
    if (kpiTimerRef.current) {
      window.clearInterval(kpiTimerRef.current);
      kpiTimerRef.current = null;
    }
  };

  useEffect(() => {
    return () => clearAllTimers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    clearAllTimers();

    if (phase === "typing") {
      // reset
      setRevealed(0);
      setScore(714);
      setLines(3);

      // reveal code lines one by one
      codeLines.forEach((_, i) => {
        const t = window.setTimeout(() => {
          setRevealed((prev) => Math.max(prev, i + 1));
        }, 420 * (i + 1));
        timersRef.current.push(t);
      });

      // after last line, start running
      const done = window.setTimeout(() => {
        setPhase("running");
      }, 420 * (codeLines.length + 1));
      timersRef.current.push(done);
    }

    if (phase === "running") {
      kpiTimerRef.current = window.setInterval(() => {
        setScore((s) => (s + Math.floor(Math.random() * 70) + 20) % 9999);
        setLines((l) => (Math.random() > 0.7 ? Math.min(99, l + 1) : l));
      }, 420);

      // unlock button after a short time (so you can re-run)
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

  return (
    <div className={styles.tileWrap}>
      <article
        className={`${styles.tile} ${styles.uiPanel}`}
        data-demo="tetris"
        data-state={phase}
      >
        <header className={styles.tileHeader}>
          <div className={styles.left}>
            <span className={styles.uiPill}>
              <span className={styles.uiDot} />
              DEMO 01
            </span>

            <span className={styles.capBtn}>TETRIS</span>

            <span className={styles.uiPill}>
              <span className={styles.uiDot} />
              GAME
            </span>
          </div>
          {/* type-code-play / running+✓ 全部不渲染 */}
        </header>

        <div className={styles.body}>
          <section className={`${styles.panel} ${styles.codePanel}`}>
            <div className={styles.panelTop}>
              <span>CODE</span>
              <span className={styles.meta}>minimal</span>
            </div>

            <div className={styles.codeArea} aria-label="code">
              {codeLines.slice(0, revealed).map((line, idx) => (
                <div key={idx} className={styles.codeLine}>
                  {line}
                </div>
              ))}
            </div>
          </section>

          <section className={`${styles.panel} ${styles.resultPanel}`}>
            <div className={styles.panelTop}>
              <span>RESULT</span>
              <span className={styles.meta}>preview</span>
            </div>

            <div className={styles.resultCanvas} aria-label="result">
              <div className={styles.tetrisWrap}>
                <div className={styles.tBoard}>
                  <div className={styles.tPiece} />
                </div>

                <div className={styles.kpiStack}>
                  <div className={styles.kpiBox}>
                    <div className={styles.k}>SCORE</div>
                    <div className={styles.v}>
                      {String(score).padStart(4, "0")}
                    </div>
                    <div className={styles.bar}>
                      <i />
                    </div>
                  </div>

                  <div className={styles.kpiBox}>
                    <div className={styles.k}>LINES</div>
                    <div className={styles.v}>
                      {String(lines).padStart(2, "0")}
                    </div>
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
              Build a tiny Tetris game
            
            </div>
            <button
              className={styles.sendBtn}
              onClick={onSend}
              disabled={locked}
              type="button"
            >
              <span>SEND</span>
              <span className={styles.uiDot} />
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
