"use client";

import neo from "@/components/ui/neo/neo.module.css";
import styles from "./roadmapPanel.module.css";
import type { RoadmapModuleKey, RoadmapContent } from "./types";
import { useLocale } from "@/components/site/LocaleProvider";
import { t } from "@/components/site/i18n";

type Props = {
  content: RoadmapContent;
  active: RoadmapModuleKey;
  onChange: (key: RoadmapModuleKey) => void;
};

export default function RoadmapTabs({ content, active, onChange }: Props) {
  const order = content.moduleOrder;
  const { locale } = useLocale();

  return (
    <div className={styles.tabs} role="tablist" aria-label={t(locale, "roadmap_modules_aria")}>
      {order.map((key) => {
        const title = content.modules[key].title;
        const isActive = key === active;

        return (
   <button
  key={key}
  type="button"
  role="tab"
  aria-selected={isActive}
  onClick={() => onChange(key)}
  data-active={isActive ? "true" : "false"}
  className={[
    neo.uiPill,
    styles.tabPill,
    isActive ? styles.tabPillActive : "",
  ].join(" ")}
>
  <span className={neo.uiDot} aria-hidden="true" />
  {title}
</button>

        );
      })}
    </div>
  );
}
