"use client";

import styles from "./lessonList.module.css";
import neo from "@/components/ui/neo/neo.module.css";
import type { Lesson } from "./lessonsData";

type ProgressMap = Record<string, { done?: boolean }>;

export default function LessonList({
  lessons,
  currentId,
  progress,
  onSelect,
}: {
  lessons: Lesson[];
  currentId: string;
  progress: ProgressMap;
  onSelect: (id: string) => void;
}) {
  return (
    <div>
      {lessons.map((l) => {
        const active = l.id === currentId;
        const done = !!progress[l.id]?.done;

        return (
          <div
            key={l.id}
            className={`${styles.lessonCard} ${active ? styles.active : ""}`}
            role="button"
            tabIndex={0}
            onClick={() => onSelect(l.id)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") onSelect(l.id);
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
  );
}
