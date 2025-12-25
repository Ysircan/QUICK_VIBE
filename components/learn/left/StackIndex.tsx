"use client";

import { useMemo, useState } from "react";
import neo from "@/components/ui/neo/neo.module.css";
import styles from "./stackIndex.module.css";

type TechSub = { key: string; label: string; lessonIds: string[] };
type TechCat = { key: string; label: string; subs: TechSub[] };
type ProjectLeaf = { key: string; label: string; lessonIds: string[] };

type IndexModel =
  | { key: "tech"; label: string; cats: TechCat[] }
  | { key: "project"; label: string; cats: ProjectLeaf[] };

export default function StackIndex() {
  const INDEX: IndexModel[] = useMemo(
    () => [
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
              { key: "js", label: "JS", lessonIds: [] },
              { key: "react", label: "REACT", lessonIds: [] },
            ],
          },
          {
            key: "be",
            label: "BACKEND",
            subs: [
              { key: "api", label: "API", lessonIds: [] },
              { key: "auth", label: "AUTH", lessonIds: [] },
            ],
          },
          {
            key: "db",
            label: "DATABASE",
            subs: [
              { key: "schema", label: "SCHEMA", lessonIds: [] },
              { key: "prisma", label: "PRISMA", lessonIds: [] },
            ],
          },
          {
            key: "deploy",
            label: "DEPLOY",
            subs: [
              { key: "vercel", label: "VERCEL", lessonIds: [] },
              { key: "env", label: "ENV", lessonIds: [] },
            ],
          },
          {
            key: "extra",
            label: "EXTRAS",
            subs: [
              { key: "git", label: "GIT", lessonIds: [] },
              { key: "debug", label: "DEBUG", lessonIds: [] },
            ],
          },
        ],
      },
      {
        key: "project",
        label: "PROJECTS",
        cats: [
          { key: "static", label: "STATIC SITE", lessonIds: ["html-layout", "css-style"] },
          { key: "agent", label: "AI AGENT", lessonIds: ["html-layout", "css-style"] },
          { key: "pay", label: "PAYMENTS", lessonIds: ["html-layout", "css-style"] },
        ],
      },
    ],
    []
  );

  const [mainKey, setMainKey] = useState<IndexModel["key"]>("tech");
  const [catKey, setCatKey] = useState<string>("fe");
  const [subKey, setSubKey] = useState<string>("html");
  const [projectKey, setProjectKey] = useState<string>("static");

  const main = INDEX.find((x) => x.key === mainKey);

  function pillClass(selected: boolean) {
    return `${neo.uiPill} ${selected ? "" : styles.pillGhost}`;
  }

  return (
    <div className={styles.indexBox} id="stackIndex">
      {/* Main row: TECH STACK / PROJECTS */}
      <div className={styles.indexMain} id="stackMain">
        <button
          type="button"
          className={pillClass(mainKey === "tech")}
          aria-pressed={mainKey === "tech"}
          onClick={() => setMainKey("tech")}
        >
          <span className={`${neo.uiDot} ${mainKey === "tech" ? neo.on : ""}`} />
          TECH STACK
        </button>

        <button
          type="button"
          className={pillClass(mainKey === "project")}
          aria-pressed={mainKey === "project"}
          onClick={() => setMainKey("project")}
        >
          <span className={`${neo.uiDot} ${mainKey === "project" ? neo.on : ""}`} />
          PROJECTS
        </button>
      </div>

      {/* Sub rows */}
      <div className={styles.indexSub} id="stackSub">
        {main?.key === "project" ? (
          <>
            <div className={styles.indexSubLabel}>PROJECT TRACKS</div>

            {main.cats.map((p) => {
              const selected = p.key === projectKey;
              const disabled = !(p.lessonIds && p.lessonIds.length);
              return (
                <button
                  key={p.key}
                  type="button"
                  className={pillClass(selected)}
                  aria-pressed={selected}
                  disabled={disabled}
                  onClick={() => setProjectKey(p.key)}
                >
                  <span className={`${neo.uiDot} ${selected ? neo.on : ""}`} />
                  {p.label}
                </button>
              );
            })}
          </>
        ) : main?.key === "tech" ? (
          <>
            <div className={styles.indexSubLabel}>CATEGORIES</div>

            {main.cats.map((c) => {
              const selected = c.key === catKey;
              return (
                <button
                  key={c.key}
                  type="button"
                  className={pillClass(selected)}
                  aria-pressed={selected}
                  onClick={() => {
                    setCatKey(c.key);
                    const firstHas =
                      (c.subs || []).find((s) => (s.lessonIds || []).length) || (c.subs || [])[0];
                    if (firstHas?.key) setSubKey(firstHas.key);
                  }}
                >
                  <span className={`${neo.uiDot} ${selected ? neo.on : ""}`} />
                  {c.label}
                </button>
              );
            })}

            {(() => {
              const cat = main.cats.find((c) => c.key === catKey) || main.cats[0];
              return (
                <>
                  <div className={styles.indexSubLabel}>{`${cat.label} — TOPICS`}</div>

                  {(cat.subs || []).map((s) => {
                    const selected = s.key === subKey;
                    const disabled = !(s.lessonIds && s.lessonIds.length);
                    return (
                      <button
                        key={s.key}
                        type="button"
                        className={pillClass(selected)}
                        aria-pressed={selected}
                        disabled={disabled}
                        onClick={() => setSubKey(s.key)}
                      >
                        <span className={`${neo.uiDot} ${selected ? neo.on : ""}`} />
                        {s.label}
                      </button>
                    );
                  })}
                </>
              );
            })()}
          </>
        ) : null}
      </div>
    </div>
  );
}
