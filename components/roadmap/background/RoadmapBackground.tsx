// components/roadmap/background/RoadmapBackground.tsx
"use client";

import styles from "./roadmapBackground.module.css";
import RoadmapRail from "./RoadmapRail";

export default function RoadmapBackground({
  topOffset = 92,
  children,
}: {
  topOffset?: number;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={styles.bg}
      style={{ ["--roadmap-top" as any]: `${topOffset}px` }}
    >
      {/* ✅ background only */}
      <div className={styles.bgGrid} aria-hidden="true">
        <RoadmapRail colIndex={0} direction="up" />
        <RoadmapRail colIndex={1} direction="down" />
        <RoadmapRail colIndex={2} direction="up" />
        <RoadmapRail colIndex={3} direction="down" />
      </div>

      {/* ✅ content layer */}
      <div className={styles.stage}>{children}</div>
    </div>
  );
}
