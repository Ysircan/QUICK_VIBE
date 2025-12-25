"use client";

import neo from "@/components/ui/neo/neo.module.css";
import styles from "../learnShell.module.css";
import type { IndexModel, TechCat, TechSub, ProjectLeaf } from "../data/learnData";

type Props = {
  index: IndexModel[];
  mainKey: "tech" | "project";
  catKey: string;
  subKey: string;
  projectKey: string;

  activeCat: TechCat;
  activeSub: TechSub;
  activeProject: ProjectLeaf;

  onSelectMain: (k: "tech" | "project") => void;
  onSelectCat: (catKey: string) => void;
  onSelectSub: (subKey: string) => void;
  onSelectProject: (projectKey: string) => void;
};

export default function LearnIndex({
  index,
  mainKey,
  catKey,
  subKey,
  projectKey,
  activeCat,
  onSelectMain,
  onSelectCat,
  onSelectSub,
  onSelectProject,
}: Props) {
  const tech = index.find((x) => x.key === "tech") as Extract<IndexModel, { key: "tech" }>;
  const proj = index.find((x) => x.key === "project") as Extract<IndexModel, { key: "project" }>;

  function pillClass(selected: boolean) {
    return `${neo.uiPill} ${selected ? "" : styles.pillGhost}`;
  }

  return (
    <div className={styles.indexBox}>
      <div className={styles.indexMain}>
        <button
          type="button"
          className={pillClass(mainKey === "tech")}
          aria-pressed={mainKey === "tech"}
          onClick={() => onSelectMain("tech")}
        >
          <span className={`${neo.uiDot} ${mainKey === "tech" ? neo.on : ""}`} />
          TECH STACK
        </button>

        <button
          type="button"
          className={pillClass(mainKey === "project")}
          aria-pressed={mainKey === "project"}
          onClick={() => onSelectMain("project")}
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
                  onClick={() => onSelectProject(p.key)}
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
                  onClick={() => onSelectCat(c.key)}
                >
                  <span className={`${neo.uiDot} ${selected ? neo.on : ""}`} />
                  {c.label}
                </button>
              );
            })}

            <div className={styles.indexSubLabel}>{`${activeCat.label} — TOPICS`}</div>
            {activeCat.subs.map((s) => {
              const selected = s.key === subKey;
              const disabled = !(s.lessonIds && s.lessonIds.length);
              return (
                <button
                  key={s.key}
                  type="button"
                  className={pillClass(selected)}
                  aria-pressed={selected}
                  disabled={disabled}
                  onClick={() => onSelectSub(s.key)}
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
  );
}
