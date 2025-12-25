"use client";

import { useEffect, useMemo, useState } from "react";
import styles from "./learnShell.module.css";

import { INDEX, LESSONS, CATEGORY_COPY, byIdMap, uniq, type Copy, type IndexModel } from "./data/learnData";
import LearnIndex from "./left/LearnIndex";
import LessonList from "./left/LessonList";
import RightCategoryHead from "./right/RightCategoryHead";
import RightWorkspace from "./right/RightWorkspace";

export default function LearnShell() {
  // ===== index selection state (only) =====
  const [mainKey, setMainKey] = useState<IndexModel["key"]>("tech");
  const [catKey, setCatKey] = useState<string>("fe");
  const [subKey, setSubKey] = useState<string>("html");
  const [projectKey, setProjectKey] = useState<string>("mini");

  // ===== derived active nodes =====
  const tech = INDEX.find((x) => x.key === "tech") as Extract<IndexModel, { key: "tech" }>;
  const proj = INDEX.find((x) => x.key === "project") as Extract<IndexModel, { key: "project" }>;

  const activeCat = tech.cats.find((c) => c.key === catKey) || tech.cats[0];
  const activeSub = activeCat.subs.find((s) => s.key === subKey) || activeCat.subs[0];
  const activeProject = proj.cats.find((p) => p.key === projectKey) || proj.cats[0];

  // ===== visible lessons derived from index leaf (no extra state sync) =====
  const allIds = useMemo(() => LESSONS.map((l) => l.id), []);
  const visibleIds = useMemo(() => {
    const raw = mainKey === "project" ? (activeProject.lessonIds || []) : (activeSub.lessonIds || []);
    return uniq(raw).filter((id) => allIds.includes(id));
  }, [mainKey, activeProject.lessonIds, activeSub.lessonIds, allIds]);

  const [currentId, setCurrentId] = useState<string>(() => visibleIds[0] ?? "");

  useEffect(() => {
    if (!visibleIds.length) {
      setCurrentId("");
      return;
    }
    if (!currentId || !visibleIds.includes(currentId)) setCurrentId(visibleIds[0]);
  }, [visibleIds, currentId]);

  const visibleLessons = useMemo(() => {
    const map = byIdMap(LESSONS);
    return visibleIds.map((id) => map.get(id)).filter(Boolean) as typeof LESSONS;
  }, [visibleIds]);

  // ===== right-top mapping-driven copy =====
  const leafKey = useMemo(() => {
    return mainKey === "project" ? `project.${projectKey}` : `tech.${catKey}.${subKey}`;
  }, [mainKey, projectKey, catKey, subKey]);

  const rightTopCopy = useMemo<Copy>(() => {
    const hit = CATEGORY_COPY[leafKey];
    if (hit) return hit;

    // fallback: never blank
    if (mainKey === "project") {
      return {
        title: `${activeProject.label} · Project Track`,
        outcome: "This track is a placeholder for now. Add copy in CATEGORY_COPY when ready.",
      };
    }
    return {
      title: `${activeSub.label} · ${activeCat.label}`,
      outcome: "This section follows the Index selection (not the lesson list). Add copy in CATEGORY_COPY when ready.",
    };
  }, [leafKey, mainKey, activeProject.label, activeSub.label, activeCat.label]);

  // ===== index handlers (keep selection valid) =====
  function selectMain(k: "tech" | "project") {
    setMainKey(k);
    // keep keys, rely on derived fallbacks above
  }

  function selectCat(k: string) {
    setCatKey(k);
    const nextCat = tech.cats.find((c) => c.key === k) || tech.cats[0];
    const firstHas = nextCat.subs.find((s) => (s.lessonIds || []).length) || nextCat.subs[0];
    setSubKey(firstHas?.key || nextCat.subs[0]?.key || "html");
  }

  function selectSub(k: string) {
    setSubKey(k);
  }

  function selectProject(k: string) {
    setProjectKey(k);
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.shell}>
        <div className={styles.grid}>
          {/* LEFT */}
          <aside className={styles.left}>
            <div className={styles.leftHead}>
              <div className={styles.leftTitle}>INDEX + LESSONS</div>
            </div>

            <LearnIndex
              index={INDEX}
              mainKey={mainKey}
              catKey={catKey}
              subKey={subKey}
              projectKey={projectKey}
              activeCat={activeCat}
              activeSub={activeSub}
              activeProject={activeProject}
              onSelectMain={selectMain}
              onSelectCat={selectCat}
              onSelectSub={selectSub}
              onSelectProject={selectProject}
            />

            <LessonList lessons={visibleLessons as any} currentId={currentId} onSelect={setCurrentId} />
          </aside>

          {/* RIGHT */}
          <section className={styles.right}>
            <RightCategoryHead title={rightTopCopy.title} outcome={rightTopCopy.outcome} />
            <RightWorkspace />
          </section>
        </div>
      </div>
    </div>
  );
}
