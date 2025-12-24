// components/roadmap/background/RoadmapRail.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./roadmapBackground.module.css";

import RoadmapTrack from "./RoadmapTrack";
import { columnItems } from "./roadmap.data";
import type { RoadmapItem } from "./roadmap.data";

type Direction = "up" | "down";

function repeatToHeight({
  base,
  innerHeight,
  buffer,
  estItemHeight,
}: {
  base: RoadmapItem[];
  innerHeight: number;
  buffer: number;
  estItemHeight: number;
}) {
  // 粗估 repeatCount，避免 while 太多次 render
  const need = Math.max(1, Math.ceil((innerHeight + buffer) / estItemHeight));
  return need;
}

export default function RoadmapRail({
  colIndex,
  direction,
}: {
  colIndex: number;
  direction: Direction;
}) {
  const innerRef = useRef<HTMLDivElement | null>(null);

  // repeatCount：half 需要重复几轮 items，才能 >= innerHeight + buffer
  const [repeatCount, setRepeatCount] = useState(2);

  // 这一列的“基础轮”items（带 rotate）
  const baseRound = useMemo(() => columnItems(colIndex), [colIndex]);

  // 动画时长（跟你 HTML 一样：78 + colIndex*6）
  const duration = 800 + colIndex * 80;

  // halfItems: 把 baseRound 重复 repeatCount 次
  const halfItems = useMemo(() => {
    const out: RoadmapItem[] = [];
    for (let i = 0; i < repeatCount; i++) out.push(...baseRound);
    return out;
  }, [baseRound, repeatCount]);

  // fullItems: [HALF][HALF]
  const fullItems = useMemo(() => [...halfItems, ...halfItems], [halfItems]);

  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const buffer = 80;          // 跟你 HTML 一样：给渐隐/安全区冗余
    const estItemHeight = 84;   // 粗估：mini卡高度+gap（不用很准）

    const recalc = () => {
      const h = el.clientHeight || 0;
      const next = repeatToHeight({
        base: baseRound,
        innerHeight: h,
        buffer,
        estItemHeight,
      });

      // 再加一点保险：至少 2 轮起步
      setRepeatCount(Math.max(2, next));
    };

    // DOM ready 后算一次（避免初始 0 高度）
    const raf = requestAnimationFrame(recalc);

    // 尺寸变化重算（响应式/窗口缩放）
    const ro = new ResizeObserver(() => recalc());
    ro.observe(el);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [baseRound]);

  return (
    <aside className={`${styles.rail} ${direction === "down" ? styles.down : styles.up}`}>
      <div className={styles.railInner} ref={innerRef}>
        <div
          className={styles.track}
          style={{
            animationDuration: `${duration}s`,
            // down 方向：首帧放到 -50%，避免加载瞬间看到空段
            transform: direction === "down" ? "translateY(-50%)" : undefined,
          }}
        >
          <RoadmapTrack items={fullItems} />
        </div>
      </div>
    </aside>
  );
}
