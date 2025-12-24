"use client";

import neo from "@/components/ui/neo/neo.module.css";
import styles from "./roadmapPanel.module.css";
import type { RoadmapAction, RoadmapSkill } from "./types";

type Props = {
  skill: RoadmapSkill;
  onAction: (action: RoadmapAction, skill: RoadmapSkill) => void;
};

function isPrimaryAction(a: RoadmapAction) {
  // Make "open" feel primary by default
  return a.id === "open";
}

export default function RoadmapSkillDetail({ skill, onAction }: Props) {
  const actions = skill.actions ?? [];

  return (
    <div aria-live="polite">
      <div className={styles.detailTop}>
        <div className={styles.detailTitle}>
          <span className={neo.uiDot} aria-hidden="true" />
          <span>{skill.name}</span>
        </div>

        <span className={styles.badge}>{skill.badge}</span>
      </div>

      <div className={styles.detailText}>{skill.description}</div>

      <ul className={styles.detailList}>
        {skill.bullets.map((b, idx) => (
          <li key={idx}>{b}</li>
        ))}
      </ul>

      {actions.length > 0 && (
        <div className={styles.actions}>
          {actions.map((a) => {
            const primary = isPrimaryAction(a);
            return (
             <button
  key={a.id + a.label}
  type="button"
  className={[
    neo.uiBtn,
    styles.actionBtn,
    primary ? styles.actionBtnPrimary : "",
  ].join(" ")}
  onClick={() => onAction(a, skill)}
>
  {a.label}
</button>

            );
          })}
        </div>
      )}
    </div>
  );
}
