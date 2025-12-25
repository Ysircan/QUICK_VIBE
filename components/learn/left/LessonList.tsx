"use client";

import neo from "@/components/ui/neo/neo.module.css";
import styles from "../learnShell.module.css";
import type { Lesson } from "../data/learnData";

type Props = {
  lessons: Lesson[];
  currentId: string;
  onSelect: (id: string) => void;
};

export default function LessonList({ lessons, currentId, onSelect }: Props) {
  return (
    <div className={styles.lessonList}>
      {lessons.length === 0 ? (
        <div className={styles.emptyCard}>
          <div className={styles.emptyTitle}>NO LESSONS YET</div>
          <div className={styles.emptySub}>This topic is a placeholder. Content will land here later.</div>
        </div>
      ) : (
        lessons.map((l) => {
          const active = l.id === currentId;
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
              <span className={neo.uiDot} />
              <div className={styles.lessonMeta}>
                <div className={styles.lessonName}>{l.title}</div>
                <div className={styles.lessonSub}>{l.outcome}</div>
              </div>
              <div className={styles.lessonTag}>{l.time}</div>
            </div>
          );
        })
      )}
    </div>
  );
}
