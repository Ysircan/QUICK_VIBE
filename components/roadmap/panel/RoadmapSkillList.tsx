"use client";

import neo from "@/components/ui/neo/neo.module.css";
import styles from "./roadmapPanel.module.css";
import type { RoadmapSkill } from "./types";

type Props = {
  skills: RoadmapSkill[];
  activeKey: string;
  onSelect: (skillKey: string) => void;
};

export default function RoadmapSkillList({ skills, activeKey, onSelect }: Props) {
  return (
    <div className={styles.skillList}>
      {skills.map((s) => {
        const isActive = s.key === activeKey;

        return (
          <button
            key={s.key}
            type="button"
            onClick={() => onSelect(s.key)}
            className={[
              styles.skillRow,
              isActive ? styles.skillRowActive : "",
            ].join(" ")}
            aria-pressed={isActive}
          >
            <div className={styles.skillLeft}>
              <span className={neo.uiDot} aria-hidden="true" />
              <div className={styles.skillMeta}>
                <div className={styles.skillName}>{s.name}</div>
                <div className={styles.skillHint}>{s.hint}</div>
              </div>
            </div>

            <div className={styles.chev} aria-hidden="true">
              ›
            </div>
          </button>
        );
      })}
    </div>
  );
}
