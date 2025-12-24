// components/roadmap/background/RoadmapMiniCard.tsx

import styles from "./roadmapBackground.module.css";

import type { RoadmapItem, WashKey } from "./roadmap.data";
import { CAP_LABEL, TAG_ACCENT } from "./roadmap.theme";
import { SUB_COPY, TAG_LABEL, TITLE_COPY } from "./roadmap.copy.en";

export default function RoadmapMiniCard({
  item,
  wash,
}: {
  item: RoadmapItem;
  wash: WashKey;
}) {
  const cap = CAP_LABEL[item.capKey];
  const title = TITLE_COPY[item.titleKey];
  const sub = SUB_COPY[item.subKey];

  return (
    <article className={`${styles.mini} ${styles[wash] ?? ""}`}>
      <div className={styles.cap}>
        <span className={styles.dot} />
        {cap}
      </div>

      <div className={styles.title}>{title}</div>
      <div className={styles.sub}>{sub}</div>

      <div className={styles.tags}>
        {item.tags.map((tag) => (
          <span
            key={tag}
            className={styles.tag}
            style={{ ["--accent" as any]: TAG_ACCENT[tag] }}
          >
            {TAG_LABEL[tag]}
          </span>
        ))}
      </div>
    </article>
  );
}
