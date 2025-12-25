"use client";

import { useEffect, useMemo, useState } from "react";
import neo from "@/components/ui/neo/neo.module.css";
import styles from "./learnShell.module.css";

type Lesson = {
  id: string;
  title: string;
  time: string;
  outcome: string;
};

type ProgressMap = Record<string, { done?: boolean }>;

type TechSub = { key: string; label: string; lessonIds: string[] };
type TechCat = { key: string; label: string; subs: TechSub[] };
type ProjectLeaf = { key: string; label: string; lessonIds: string[] };

type IndexModel =
  | { key: "tech"; label: string; cats: TechCat[] }
  | { key: "project"; label: string; cats: ProjectLeaf[] };

const LESSONS: Lesson[] = [
  {
    id: "html-layout",
    title: "HTML · Layout Control",
    time: "15m",
    outcome: "Control the page skeleton (sections/order/button placement).",
  },
  {
    id: "css-style",
    title: "CSS · Neo Style System",
    time: "12m",
    outcome: "Control theme color / pills / hard shadows with consistent classes.",
  },
  {
    id: "react-move",
    title: "React · Safe Migration",
    time: "18m",
    outcome: "Move big HTML into React by shells → components → logic.",
  },
];

const INDEX: IndexModel[] = [
  {
    key: "tech",
    label: "TECH STACK",
    cats: [
      {
        key: "fe",
        label: "FRONTEND",
        subs: [
          { key: "html", label: "HTML", lessonIds: ["html-layout"] },
          { key: "css", label: "CSS", lessonIds: ["css-style"] },
        ],
      },
      { key: "be", label: "BACKEND", subs: [{ key: "api", label: "API", lessonIds: [] }] },
      { key: "db", label: "DATABASE", subs: [{ key: "schema", label: "SCHEMA", lessonIds: [] }] },
      { key: "deploy", label: "DEPLOY", subs: [{ key: "vercel", label: "VERCEL", lessonIds: [] }] },
      { key: "extra", label: "EXTRAS", subs: [{ key: "git", label: "GIT", lessonIds: [] }] },
    ],
  },
  {
    key: "project",
    label: "PROJECTS",
    cats: [
      { key: "mini", label: "MINI LANDING", lessonIds: ["html-layout", "css-style"] },
      { key: "migrate", label: "MIGRATE TO REACT", lessonIds: ["react-move"] },
    ],
  },
];

function byIdMap(list: Lesson[]) {
  return new Map(list.map((l) => [l.id, l] as const));
}
function uniq(arr: string[]) {
  return Array.from(new Set(arr));
}

export default function LearnShell() {
  const allIds = useMemo(() => LESSONS.map((l) => l.id), []);

  // ===== progress =====
  const [progress] = useState<ProgressMap>({});

  // ===== index selection (default: TECH / FRONTEND / HTML) =====
  const [mainKey, setMainKey] = useState<IndexModel["key"]>("tech");
  const [catKey, setCatKey] = useState<string>("fe");
  const [subKey, setSubKey] = useState<string>("html");
  const [projectKey, setProjectKey] = useState<string>("mini");

  const tech = INDEX.find((x) => x.key === "tech") as Extract<IndexModel, { key: "tech" }>;
  const proj = INDEX.find((x) => x.key === "project") as Extract<IndexModel, { key: "project" }>;

  const activeCat = tech.cats.find((c) => c.key === catKey) || tech.cats[0];
  const activeSub = activeCat.subs.find((s) => s.key === subKey) || activeCat.subs[0];
  const activeProject = proj.cats.find((p) => p.key === projectKey) || proj.cats[0];

  // ===== view state (THIS is what drives the lesson list) =====
  // ✅ Fix #1: default view should NOT be all lessons — it should follow default index leaf
  const [visibleIds, setVisibleIds] = useState<string[]>(() =>
    activeSub?.lessonIds?.length ? uniq(activeSub.lessonIds) : []
  );
  const [currentId, setCurrentId] = useState<string>(() => (activeSub.lessonIds?.[0] ?? ""));

  // ✅ applyView: DO NOT fallback to allIds when empty
  function applyView(ids: string[]) {
    const cleaned = uniq(ids || []).filter((id) => allIds.includes(id));
    setVisibleIds(cleaned); // empty = show nothing (not "all" / not "html")
    // current auto-fix below
  }

  // ✅ Fix #2: whenever visibleIds changes, ensure currentId is valid
  useEffect(() => {
    if (!visibleIds.length) {
      setCurrentId("");
      return;
    }
    if (!currentId || !visibleIds.includes(currentId)) {
      setCurrentId(visibleIds[0]);
    }
  }, [visibleIds, currentId]);

  // counts only in current view
  const doneCount = useMemo(() => {
    const set = new Set(visibleIds);
    return Object.entries(progress).reduce((acc, [id, v]) => (set.has(id) && v?.done ? acc + 1 : acc), 0);
  }, [progress, visibleIds]);

  const visibleLessons = useMemo(() => {
    const map = byIdMap(LESSONS);
    return visibleIds.map((id) => map.get(id)).filter(Boolean) as Lesson[];
  }, [visibleIds]);

  // pills
  function pillClass(selected: boolean) {
    return `${neo.uiPill} ${selected ? "" : styles.pillGhost}`;
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.shell}>
        <div className={styles.grid}>
          {/* LEFT */}
          <aside className={styles.left}>
            <div className={styles.leftHead}>
              <div className={styles.leftTitle}>VIBE CODING</div>
            
            </div>

            {/* INDEX */}
            <div className={styles.indexBox}>
              <div className={styles.indexMain}>
                <button
                  type="button"
                  className={pillClass(mainKey === "tech")}
                  aria-pressed={mainKey === "tech"}
                  onClick={() => {
                    setMainKey("tech");
                    // ✅ switching main should also update the view immediately
                    const cat = tech.cats.find((c) => c.key === catKey) || tech.cats[0];
                    const sub = cat.subs.find((s) => s.key === subKey) || cat.subs[0];
                    applyView(sub?.lessonIds || []);
                  }}
                >
                  <span className={`${neo.uiDot} ${mainKey === "tech" ? neo.on : ""}`} />
                  TECH STACK
                </button>

                <button
                  type="button"
                  className={pillClass(mainKey === "project")}
                  aria-pressed={mainKey === "project"}
                  onClick={() => {
                    setMainKey("project");
                    const p = proj.cats.find((x) => x.key === projectKey) || proj.cats[0];
                    applyView(p?.lessonIds || []);
                  }}
                >
                  <span className={`${neo.uiDot} ${mainKey === "project" ? neo.on : ""}`} />
                  PROJECTS
                </button>
              </div>

              <div className={styles.indexSub}>
                {mainKey === "project" ? (
                  <>
                    <div className={styles.indexSubLabel}>PROJECT TRACKS</div>
                    {proj.cats.map((p) => {
                      const selected = p.key === projectKey;
                      const disabled = !(p.lessonIds && p.lessonIds.length);
                      return (
                        <button
                          key={p.key}
                          type="button"
                          className={pillClass(selected)}
                          aria-pressed={selected}
                          disabled={disabled}
                          onClick={() => {
                            setProjectKey(p.key);
                            applyView(p.lessonIds);
                          }}
                        >
                          <span className={`${neo.uiDot} ${selected ? neo.on : ""}`} />
                          {p.label}
                        </button>
                      );
                    })}
                  </>
                ) : (
                  <>
                    <div className={styles.indexSubLabel}>CATEGORIES</div>
                    {tech.cats.map((c) => {
                      const selected = c.key === catKey;
                      return (
                        <button
                          key={c.key}
                          type="button"
                          className={pillClass(selected)}
                          aria-pressed={selected}
                          onClick={() => {
                            setCatKey(c.key);
                            // ✅ category click should also switch view to its first topic (prefer having lessons)
                            const firstHas =
                              (c.subs || []).find((s) => (s.lessonIds || []).length) || (c.subs || [])[0];
                            if (firstHas?.key) setSubKey(firstHas.key);
                            applyView(firstHas?.lessonIds || []);
                          }}
                        >
                          <span className={`${neo.uiDot} ${selected ? neo.on : ""}`} />
                          {c.label}
                        </button>
                      );
                    })}

                    <div className={styles.indexSubLabel}>{`${activeCat.label} — TOPICS`}</div>
                    {(activeCat.subs || []).map((s) => {
                      const selected = s.key === subKey;
                      const disabled = !(s.lessonIds && s.lessonIds.length);
                      return (
                        <button
                          key={s.key}
                          type="button"
                          className={pillClass(selected)}
                          aria-pressed={selected}
                          disabled={disabled}
                          onClick={() => {
                            setSubKey(s.key);
                            applyView(s.lessonIds);
                          }}
                        >
                          <span className={`${neo.uiDot} ${selected ? neo.on : ""}`} />
                          {s.label}
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            </div>

            {/* LESSON LIST */}
            <div className={styles.lessonList}>
              {visibleLessons.map((l) => {
                const active = l.id === currentId;
                const done = !!progress[l.id]?.done;

                return (
                  <div
                    key={l.id}
                    className={`${styles.lessonCard} ${active ? styles.active : ""}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => setCurrentId(l.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") setCurrentId(l.id);
                    }}
                  >
                    <span className={`${neo.uiDot} ${done ? neo.on : ""}`} />

                    <div className={styles.lessonMeta}>
                      <div className={styles.lessonName}>{l.title}</div>
                      <div className={styles.lessonSub}>{l.outcome}</div>
                    </div>

                    <div className={styles.lessonTag}>{l.time}</div>
                  </div>
                );
              })}
            </div>
          </aside>

          {/* RIGHT (still placeholder) */}
          <section className={styles.right}>
            <div className={styles.topExplain}>
              <div className={styles.topExplainMain}>
                <div className={styles.topExplainTitle}>Category Explain (placeholder)</div>
                <div className={styles.topExplainSub}>This will follow the Index selection.</div>
              </div>
              <button className={neo.uiPill} type="button">
                <span className={neo.uiDot} />
                META
              </button>
            </div>

            <div className={styles.workspace}>
              <div className={styles.tabs}>
                <button className={neo.uiPill} type="button" aria-pressed="true">
                  <span className={`${neo.uiDot} ${neo.on}`} />
                  EXPLAIN
                </button>
                <button className={neo.uiPill} type="button" aria-pressed="false">
                  <span className={neo.uiDot} />
                  DEMO
                </button>
                <button className={neo.uiPill} type="button" aria-pressed="false">
                  <span className={neo.uiDot} />
                  PROMPT LAB
                </button>
              </div>

              <div className={styles.workspaceBody}>
                <div className={styles.panel}>
                  <div className={styles.panelTitle}>Tab Body (placeholder)</div>
                  <div className={styles.panelBody}>Later this area will switch between Explain / Demo / Prompt Lab.</div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
