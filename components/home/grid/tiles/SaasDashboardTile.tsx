"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./saasDashboardTile.module.css";

type Phase = "idle" | "typing" | "running";

export default function SaasDashboardTile() {
  const codeLines = useMemo(
    () => [
      `const data = fetch("/api/metrics");`,
      `const kpi = summarize(data);`,
      `renderDashboard({ chart, kpi });`,
    ],
    []
  );

  const [phase, setPhase] = useState<Phase>("idle");
  const [locked, setLocked] = useState(false);
  const [revealed, setRevealed] = useState(0);

  const [active, setActive] = useState(287);
  const [mrr, setMrr] = useState(6410);
  const [health, setHealth] = useState(78); // %

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

  useEffect(() => () => clearAllTimers(), []);

  useEffect(() => {
    clearAllTimers();

    if (phase === "typing") {
      setRevealed(0);
      setActive(287);
      setMrr(6410);
      setHealth(78);

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
      kpiTimerRef.current = window.setInterval(() => {
        setActive((v) => {
          const delta = (Math.random() > 0.55 ? 1 : -1) * (Math.floor(Math.random() * 7) + 1);
          return Math.max(120, Math.min(999, v + delta));
        });

        setMrr((v) => {
          const delta = (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 60) + 12);
          return Math.max(1000, Math.min(99999, v + delta));
        });

        setHealth((v) => {
          const delta = (Math.random() > 0.6 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
          return Math.max(40, Math.min(99, v + delta));
        });
      }, 520);

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
      <article className={`${styles.tile} ${styles.uiPanel}`} data-state={phase}>
        <header className={styles.tileHeader}>
          <div className={styles.left}>
            <span className={styles.uiPill}>
              <span className={styles.uiDot} />
              DEMO 03
            </span>

            <span className={styles.capBtn}>DASHBOARD</span>

            <span className={styles.uiPill}>
              <span className={styles.uiDot} />
              SAAS
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
              <span className={styles.meta}>live kpi</span>
            </div>

            <div className={styles.resultCanvas}>
              {/* ✅ 同结构：左 preview（chart） + 右 KPI */}
              <div className={styles.saasWrap}>
                <div className={styles.chartBoard}>
                  <div className={styles.chartTop}>
                    <span className={styles.chartTag}>WEEK</span>
                    <span className={styles.chartTag}>RETENTION</span>
                  </div>

                  <div className={styles.chartArea}>
                    <div className={styles.spark} />
                    <div className={styles.gridHint} />
                  </div>

                  <div className={styles.legend}>
                    <span className={styles.dot} />
                    <span className={styles.legendText}>active trend</span>
                  </div>
                </div>

                <div className={styles.kpiStack}>
                  <div className={styles.kpiBox}>
                    <div className={styles.k}>ACTIVE</div>
                    <div className={styles.v}>{active}</div>
                    <div className={styles.bar}>
                      <i />
                    </div>
                  </div>

                  <div className={styles.kpiBox}>
                    <div className={styles.k}>MRR</div>
                    <div className={styles.vMono}>${mrr.toLocaleString()}</div>
                    <div className={styles.bar}>
                      <i />
                    </div>
                  </div>

                  <div className={styles.kpiBox}>
                    <div className={styles.k}>HEALTH</div>
                    <div className={styles.v}>{health}%</div>
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
              Build a tiny SaaS dashboard: chart + KPIs update after run.
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
