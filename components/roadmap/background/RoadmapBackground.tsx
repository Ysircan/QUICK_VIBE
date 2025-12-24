// components/roadmap/background/RoadmapBackground.tsx
"use client";

import styles from "./roadmapBackground.module.css";
import RoadmapRail from "./RoadmapRail";

export default function RoadmapBackground({
  topOffset = 92, // ✅ navbar 高度（不确定就先用 92，后面随时改）
}: {
  topOffset?: number;
}) {
  return (
    <div
      className={styles.bg}
      aria-hidden="true"
      style={{ ["--roadmap-top" as any]: `${topOffset}px` }}
    >
      <div className={styles.bgGrid}>
        <RoadmapRail colIndex={0} direction="up" />
        <RoadmapRail colIndex={1} direction="down" />
        <RoadmapRail colIndex={2} direction="up" />
        <RoadmapRail colIndex={3} direction="down" />
      </div>
    </div>
  );
}
