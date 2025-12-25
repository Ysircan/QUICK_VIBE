"use client";

import { useEffect, useMemo, useState } from "react";
import neo from "@/components/ui/neo/neo.module.css";
import styles from "./left.module.css";
import LessonList from "./LessonList";

// ✅ 先用最小数据结构跑通（后面你再把 pasted.txt 里的 LESSONS 全量搬进来）
export type Lesson = {
  id: string;
  title: string;
  outcome: string;
  time: string;
  // 进度（done）我们先放在 progress map 里
};

// ✅ 示例：随便先放几个，后面换成你真实 LESSONS
const LESSONS: Lesson[] = [
  { id: "html-layout", title: "HTML · Layout Control", outcome: "Control page skeleton & sections.", time: "15m" },
  { id: "css-pill", title: "CSS · Neo Pills", outcome: "Build capsule buttons + hard shadow.", time: "12m" },
  { id: "react-shell", title: "React · Shell Migration", outcome: "Move HTML into React safely.", time: "18m" },
];

// ✅ Index -> visibleIds：先写死映射（你后面用真实 index 选择去改）
function computeVisibleIds(activeGroup: "tech" | "project", activeStack: string, activeSub: string) {
  // 你真实逻辑：tech/frontend/css -> 一组 lesson ids
  // 现在先演示：不同选择返回不同列表
  if (activeGroup === "project") return ["react-shell"];
  if (activeStack === "frontend" && activeSub === "html") return ["html-layout"];
  if (activeStack === "frontend" && activeSub === "css") return ["css-pill"];
  return LESSONS.map((l) => l.id);
}

type ProgressMap = Record<string, { done?: boolean }>;

export default function LearnLeft() {
  // ✅ Index state（你现在左边 Index 已经有了：Tech Stack / Integrated Project + Frontend/Backend... + CSS/HTML...）
  const [activeGroup, setActiveGroup] = useState<"tech" | "project">("tech");
  const [activeStack, setActiveStack] = useState<string>("frontend");
  const [activeSub, setActiveSub] = useState<string>("html");

  // ✅ progress（后面你接 localStorage / db，都不影响结构）
  const [progress, setProgress] = useState<ProgressMap>(() => ({}));

  // ✅ visibleIds（由 Index 驱动）
  const visibleIds = useMemo(
    () => computeVisibleIds(activeGroup, activeStack, activeSub),
    [activeGroup, activeStack, activeSub]
  );

  // ✅ current lesson（由课程列表点击决定）
  const [currentId, setCurrentId] = useState<string>(() => visibleIds[0] ?? LESSONS[0]?.id ?? "");

  // ✅ HTML 同款：如果 current 不在 visible 里，就切到 visible 的第一个 :contentReference[oaicite:3]{index=3}
  useEffect(() => {
    if (!visibleIds.includes(currentId)) {
      setCurrentId(visibleIds[0] ?? "");
    }
  }, [visibleIds, currentId]);

  const totalCount = visibleIds.length;

  // ✅ HTML 同款：doneCount 只统计 visibleIds 范围 :contentReference[oaicite:4]{index=4}
  const doneCount = useMemo(() => {
    const set = new Set(visibleIds);
    return Object.entries(progress).reduce((acc, [id, v]) => (set.has(id) && v?.done ? acc + 1 : acc), 0);
  }, [progress, visibleIds]);

  const visibleLessons = useMemo(() => {
    const map = new Map(LESSONS.map((l) => [l.id, l]));
    return visibleIds.map((id) => map.get(id)).filter(Boolean) as Lesson[];
  }, [visibleIds]);

  // ✅ 这里是你“已经有感觉”的 Index UI：你把你现成的 Index 组件贴进来
  // 我只给最小占位：保证能点、能高亮、能驱动 visibleIds
  return (
    <aside className={styles.left}>
      {/* Header row */}
      <div className={styles.leftHead}>
        <div className={styles.leftTitle}>INDEX + LESSONS</div>

        <div className={styles.badge}>
          <span className={neo.uiDot} />
          <span className={styles.badgeText}>
            {doneCount}/{totalCount}
          </span>
        </div>
      </div>

      {/* ===== Index (keep your HTML style here) ===== */}
      <div className={styles.indexBlock}>
        <div className={styles.sectionTitle}>INDEX</div>

        {/* Group */}
        <div className={styles.pillRow}>
          <button
            type="button"
            className={`${neo.uiPill} ${activeGroup === "tech" ? "" : neo.pillGhost}`}
            aria-pressed={activeGroup === "tech"}
            onClick={() => setActiveGroup("tech")}
          >
            <span className={`${neo.uiDot} ${activeGroup === "tech" ? neo.on : ""}`} />
            TECH STACK
          </button>

          <button
            type="button"
            className={`${neo.uiPill} ${activeGroup === "project" ? "" : neo.pillGhost}`}
            aria-pressed={activeGroup === "project"}
            onClick={() => setActiveGroup("project")}
          >
            <span className={`${neo.uiDot} ${activeGroup === "project" ? neo.on : ""}`} />
            INTEGRATED PROJECT
          </button>
        </div>

        {/* Stack */}
        {activeGroup === "tech" && (
          <>
            <div className={styles.pillRow}>
              {["frontend", "backend", "database", "deployment", "extras"].map((k) => (
                <button
                  key={k}
                  type="button"
                  className={`${neo.uiPill} ${activeStack === k ? "" : neo.pillGhost}`}
                  aria-pressed={activeStack === k}
                  onClick={() => setActiveStack(k)}
                >
                  <span className={`${neo.uiDot} ${activeStack === k ? neo.on : ""}`} />
                  {k.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Sub */}
            {activeStack === "frontend" && (
              <div className={styles.pillRow}>
                {["html", "css"].map((k) => (
                  <button
                    key={k}
                    type="button"
                    className={`${neo.uiPill} ${activeSub === k ? "" : neo.pillGhost}`}
                    aria-pressed={activeSub === k}
                    onClick={() => setActiveSub(k)}
                  >
                    <span className={`${neo.uiDot} ${activeSub === k ? neo.on : ""}`} />
                    {k.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* ===== Lessons (STRICT HTML card style) ===== */}
      <div className={styles.listBlock}>
        <div className={styles.sectionTitle}>LESSONS</div>

        <LessonList
          lessons={visibleLessons}
          currentId={currentId}
         
          onSelect={setCurrentId}
        />
      </div>
    </aside>
  );
}
