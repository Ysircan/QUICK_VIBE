"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./flashcardsTile.module.css";

type Mode = "flip" | "cloze";
type Feature = "none" | "audio" | "progress";
type OpenMenu = null | "mode" | "feature";

const CARDS = [
  { en: "deadline", cn: "截止日期", ex: "We must meet the deadline this Friday." },
  { en: "stakeholder", cn: "利益相关方", ex: "Stakeholders need weekly updates." },
  { en: "deliverable", cn: "交付物", ex: "The deliverable is a working prototype." },
  { en: "invoice", cn: "发票", ex: "Please send the invoice today." },
  { en: "handover", cn: "交接", ex: "We’ll do a handover next week." },
  { en: "syllabus", cn: "课程大纲", ex: "Check the syllabus before class." },
  { en: "assignment", cn: "作业", ex: "My assignment is due tomorrow." },
  { en: "revise", cn: "复习", ex: "I revise vocabulary every night." },
  { en: "citation", cn: "引用", ex: "Add a citation to support your claim." },
  { en: "itinerary", cn: "行程单", ex: "Here’s my itinerary for Japan." },
];

function wait(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

export default function FlashcardsTile() {
  const [open, setOpen] = useState<OpenMenu>(null);
  const [mode, setMode] = useState<Mode>("flip");
  const [feature, setFeature] = useState<Feature>("none");

  const [idx, setIdx] = useState(0);
  const card = useMemo(() => CARDS[idx % CARDS.length], [idx]);

  const [busy, setBusy] = useState(false);
  const [statusText, setStatusText] = useState<"IDLE" | "RUNNING">("IDLE");
  const [badgeText, setBadgeText] = useState<"READY" | "RUNNING">("READY");

  const [compileText, setCompileText] = useState("");
  const [compileShow, setCompileShow] = useState(false);

  const [flipped, setFlipped] = useState(false);
  const [clozeText, setClozeText] = useState("");
  const [showCloze, setShowCloze] = useState(false);

  const [progressPct, setProgressPct] = useState(0);

  const intentRef = useRef<HTMLDivElement | null>(null);
  const timeoutsRef = useRef<number[]>([]);

  function clearTimers() {
    timeoutsRef.current.forEach((t) => window.clearTimeout(t));
    timeoutsRef.current = [];
  }

  // click outside + esc => close menus
  useEffect(() => {
    function onDown(e: MouseEvent) {
      const el = intentRef.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setOpen(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // keep preview consistent when mode changes (not running)
  useEffect(() => {
    if (busy) return;

    setFlipped(false);
    setBadgeText("READY");
    setStatusText("IDLE");

    if (mode === "cloze") {
      setShowCloze(true);
      const blanked = card.ex.replace(new RegExp(card.en, "i"), "____");
      setClozeText(blanked);
    } else {
      setShowCloze(false);
      setClozeText("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, idx]);

  // progress update
  useEffect(() => {
    if (feature !== "progress") {
      setProgressPct(0);
      return;
    }
    const pct = Math.max(6, Math.min(100, Math.round(((idx + 1) / CARDS.length) * 100)));
    setProgressPct(pct);
  }, [feature, idx]);

  // cleanup on unmount
  useEffect(() => {
    return () => clearTimers();
  }, []);

  function pulseAudioOnce() {
    // purely css-driven; toggle a class briefly
    const el = document.getElementById("card-audio-pulse");
    if (!el) return;
    el.classList.remove(styles.pulseOn);
    // force reflow
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    (el as any).offsetHeight;
    el.classList.add(styles.pulseOn);
    const t = window.setTimeout(() => el.classList.remove(styles.pulseOn), 520);
    timeoutsRef.current.push(t);
  }

  async function showCompile(lines: string[], holdMs = 800) {
    setCompileText(lines.join("\n"));
    setCompileShow(true);
    await wait(holdMs);
    setCompileShow(false);
  }

  async function onNext() {
    if (busy) return;

    clearTimers();
    setBusy(true);
    setStatusText("RUNNING");
    setBadgeText("RUNNING");

    // close menus when run
    setOpen(null);

    await showCompile(
      [`SET MODE ${mode.toUpperCase()}`, `SET FEATURE ${feature.toUpperCase()}`, `NEXT`],
      820
    );

    // advance card
    setIdx((v) => (v + 1) % CARDS.length);

    // start from a clean state
    setFlipped(false);

    if (feature === "audio") pulseAudioOnce();

    // run one-shot animation by mode
    if (mode === "flip") {
      // show front -> flip to back
      const t = window.setTimeout(() => setFlipped(true), 420);
      timeoutsRef.current.push(t);
    } else {
      // CLOZE: blank -> answer
      const nextCard = CARDS[(idx + 1) % CARDS.length];
      const blanked = nextCard.ex.replace(new RegExp(nextCard.en, "i"), "____");
      setShowCloze(true);
      setClozeText(blanked);

      const t = window.setTimeout(() => {
        setClozeText(nextCard.ex);
      }, 620);
      timeoutsRef.current.push(t);
    }

    // stop state after a short window
    const stopT = window.setTimeout(() => {
      setStatusText("IDLE");
      setBadgeText("READY");
      setBusy(false);
    }, 1200);
    timeoutsRef.current.push(stopT);
  }

  function onFlipClick() {
    if (mode !== "flip") return;
    setFlipped((v) => !v);
  }

  const modeLabel = mode === "flip" ? "FLIP" : "CLOZE";
  const featureLabel =
    feature === "none" ? "NONE" : feature === "audio" ? "AUDIO" : "PROGRESS BAR";

  const showAudio = feature === "audio";
  const showProgress = feature === "progress";

  return (
    <section className={styles.card} data-kind="card">
      <div className={styles.cardTop}>
        <div className={styles.titleLeft}>
          <span className={styles.uiPill}>MINI APP / CARD</span>
          <span className={styles.tag}>
            <span className={styles.uiDot} />
            <span className={styles.stateText}>{statusText}</span>
          </span>
        </div>

        <button className={styles.nextBtn} type="button" onClick={onNext} disabled={busy}>
          NEXT ▶
        </button>
      </div>

      <div className={styles.preview}>
        <div className={`${styles.compile} ${compileShow ? styles.show : ""}`}>{compileText}</div>

        <div className={styles.flashStage}>
          <div className={styles.flashTop}>
            <div className={styles.badge}>
              <span className={styles.uiDot} />
              <span className={styles.badgeText}>{badgeText}</span>
            </div>

            <button
              className={styles.audioBtn}
              type="button"
              title="Audio"
              style={{ display: showAudio ? "inline-flex" : "none" }}
              onClick={pulseAudioOnce}
            >
              <span id="card-audio-pulse" className={styles.audioPulse} />
            </button>
          </div>

          <div className={styles.flashBody}>
            {/* FLIP */}
            <div
              className={styles.flipWrap}
              title="Click to flip"
              style={{ display: mode === "flip" ? "block" : "none" }}
              onClick={onFlipClick}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") onFlipClick();
              }}
            >
              <div className={`${styles.flipInner} ${flipped ? styles.flipped : ""}`}>
                <div className={`${styles.face} ${styles.front}`}>
                  <div className={styles.fcLabel}>FRONT</div>
                  <div className={`${styles.fcWord} ${styles.fcFrontWord}`}>{card.en}</div>
                  <div className={`${styles.fcMeta} ${styles.fcFrontMeta}`}>English word</div>
                </div>

                <div className={`${styles.face} ${styles.back}`}>
                  <div className={styles.fcLabel}>BACK</div>
                  <div className={`${styles.fcWord} ${styles.fcBackCN}`}>{card.cn}</div>
                  <div className={`${styles.fcMeta} ${styles.fcBackEx}`}>
                    Example: {card.ex}
                  </div>
                </div>
              </div>
            </div>

            {/* CLOZE */}
            <div className={styles.clozeBox} style={{ display: showCloze ? "block" : "none" }}>
              {clozeText}
            </div>
          </div>

          {/* PROGRESS BAR (replaces SRS) */}
          <div className={styles.progressRow} style={{ display: showProgress ? "flex" : "none" }}>
            <div className={styles.progressWrap}>
              <div className={styles.progressFill} style={{ width: `${progressPct}%` }} />
            </div>
            <div className={styles.progressMeta}>
              {Math.min(idx + 1, CARDS.length)}/{CARDS.length}
            </div>
          </div>
        </div>
      </div>

      {/* capsule dropdowns */}
      <div className={styles.intent} ref={intentRef}>
        <div className={styles.intentLine}>
          I want a{" "}
          <span className={styles.uiPill}>
            <span className={styles.uiDot} />
            CARD APP
          </span>{" "}
          mode{" "}
          <span className={styles.capSelect}>
            <button
              className={styles.capBtn}
              type="button"
              aria-label="mode"
              aria-expanded={open === "mode"}
              onClick={() => setOpen((v) => (v === "mode" ? null : "mode"))}
            >
              <span className={styles.capDot} />
              <span className={styles.capLabel}>{modeLabel}</span>
              <span className={styles.capCaret}>▾</span>
            </button>

            <div className={`${styles.capMenu} ${open === "mode" ? styles.open : ""}`}>
              <button
                className={`${styles.capOption} ${mode === "flip" ? styles.selected : ""}`}
                type="button"
                onClick={() => {
                  setMode("flip");
                  setOpen(null);
                }}
              >
                <span className={styles.left}>
                  <span className={styles.miniDot} />
                  <span>FLIP</span>
                </span>
                <span className={styles.tick}>✓</span>
              </button>

              <button
                className={`${styles.capOption} ${mode === "cloze" ? styles.selected : ""}`}
                type="button"
                onClick={() => {
                  setMode("cloze");
                  setOpen(null);
                }}
              >
                <span className={styles.left}>
                  <span className={styles.miniDot} />
                  <span>CLOZE</span>
                </span>
                <span className={styles.tick}>✓</span>
              </button>
            </div>
          </span>{" "}
          with{" "}
          <span className={styles.capSelect}>
            <button
              className={styles.capBtn}
              type="button"
              aria-label="feature"
              aria-expanded={open === "feature"}
              onClick={() => setOpen((v) => (v === "feature" ? null : "feature"))}
            >
              <span className={styles.capDot} />
              <span className={styles.capLabel}>{featureLabel}</span>
              <span className={styles.capCaret}>▾</span>
            </button>

            <div className={`${styles.capMenu} ${open === "feature" ? styles.open : ""}`}>
              <button
                className={`${styles.capOption} ${feature === "none" ? styles.selected : ""}`}
                type="button"
                onClick={() => {
                  setFeature("none");
                  setOpen(null);
                }}
              >
                <span className={styles.left}>
                  <span className={styles.miniDot} />
                  <span>NONE</span>
                </span>
                <span className={styles.tick}>✓</span>
              </button>

              <button
                className={`${styles.capOption} ${feature === "audio" ? styles.selected : ""}`}
                type="button"
                onClick={() => {
                  setFeature("audio");
                  setOpen(null);
                }}
              >
                <span className={styles.left}>
                  <span className={styles.miniDot} />
                  <span>AUDIO</span>
                </span>
                <span className={styles.tick}>✓</span>
              </button>

              <button
                className={`${styles.capOption} ${feature === "progress" ? styles.selected : ""}`}
                type="button"
                onClick={() => {
                  setFeature("progress");
                  setOpen(null);
                }}
              >
                <span className={styles.left}>
                  <span className={styles.miniDot} />
                  <span>PROGRESS BAR</span>
                </span>
                <span className={styles.tick}>✓</span>
              </button>
            </div>
          </span>
        </div>
      </div>
    </section>
  );
}
