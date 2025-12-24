"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import neo from "@/components/ui/neo/neo.module.css";
import styles from "./roadmapPanel.module.css";

import { ROADMAP_CONTENT } from "./roadmapContent";
import type { RoadmapAction, RoadmapModuleKey, RoadmapSkill } from "./types";

import RoadmapTabs from "./RoadmapTabs";
import RoadmapSkillList from "./RoadmapSkillList";
import RoadmapSkillDetail from "./RoadmapSkillDetail";

type Props = {
  className?: string;
};

export default function RoadmapPanel({ className }: Props) {
  const router = useRouter();
  const content = ROADMAP_CONTENT;

  const initialModule = content.moduleOrder[0] ?? "frontend";
  const [activeModule, setActiveModule] = useState<RoadmapModuleKey>(initialModule);

  const moduleData = content.modules[activeModule];

  const initialSkillKey = moduleData.skills[0]?.key ?? "";
  const [activeSkillKey, setActiveSkillKey] = useState<string>(initialSkillKey);

  // keep skill selection valid when module changes
  const activeSkill: RoadmapSkill | null = useMemo(() => {
    const hit = moduleData.skills.find((s) => s.key === activeSkillKey);
    return hit ?? moduleData.skills[0] ?? null;
  }, [moduleData.skills, activeSkillKey]);

  function changeModule(key: RoadmapModuleKey) {
    setActiveModule(key);
    const nextFirst = content.modules[key].skills[0]?.key ?? "";
    setActiveSkillKey(nextFirst);
  }

  function handleAction(action: RoadmapAction, skill: RoadmapSkill) {
    // data-driven routing
    if (action.href) {
      router.push(action.href);
      return;
    }

    // placeholder actions (no href yet)
    // You can wire these later without changing UI components.
    // eslint-disable-next-line no-alert
    alert(`${action.label} (placeholder)`);
    void skill;
  }

  function handlePrimary() {
    const a = content.header.primaryAction;
    if (!a) return;
    if (a.href) router.push(a.href);
    else alert(`${a.label} (placeholder)`);
  }

  return (
    <section className={[neo.uiPanel, styles.main, className ?? ""].join(" ")}>
      <div>
        <div className={styles.header}>
          <div className={styles.title}>
            <h2>{moduleData.title}</h2>
            <p className={styles.subtitle}>{moduleData.description}</p>

            <RoadmapTabs content={content} active={activeModule} onChange={changeModule} />
          </div>

          <div className={styles.headerRight}>
            {content.header.primaryAction && (
         <button
  type="button"
  className={[neo.uiBtn, styles.actionBtn, styles.actionBtnPrimary].join(" ")}
  onClick={handlePrimary}
>
  {content.header.primaryAction.label}
</button>

            )}
          </div>
        </div>

        <div className={styles.hr} />

        <div className={styles.grid}>
          {/* LEFT */}
          <div className={styles.sub}>
            <div className={styles.sectionLabel}>SKILLS</div>
            <RoadmapSkillList
              skills={moduleData.skills}
              activeKey={activeSkill?.key ?? ""}
              onSelect={setActiveSkillKey}
            />
          </div>

          {/* RIGHT */}
          <div className={styles.sub}>
            {activeSkill ? (
              <RoadmapSkillDetail skill={activeSkill} onAction={handleAction} />
            ) : (
              <div className={styles.tinyMuted}>No skill selected.</div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.tinyMuted}>
          Tip: this panel is a “picker + explainer”. The roadmap cards sit below.
        </div>
        <div className={styles.tinyMuted}>
          Now viewing: {moduleData.title}
          {activeSkill ? ` / ${activeSkill.name}` : ""}
        </div>
      </div>
    </section>
  );
}
