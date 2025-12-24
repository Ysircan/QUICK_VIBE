"use client";

import styles from "./homeGrid.module.css";
import TetrisTile from "@/components/home/grid/tiles/TetrisTile";
import FlashcardsTile from "@/components/home/grid/tiles/FlashcardsTile";
import SaasDashboardTile from "@/components/home/grid/tiles/SaasDashboardTile"; // ✅ 新增

export default function HomeGrid() {
  return (
    <section id="demos" className={styles.stage}>
      <div className={styles.grid}>
        <TetrisTile />
        <FlashcardsTile />
        <SaasDashboardTile />
      </div>
    </section>
  );
}

