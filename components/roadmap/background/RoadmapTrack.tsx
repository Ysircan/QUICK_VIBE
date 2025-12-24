// components/roadmap/background/RoadmapTrack.tsx

import RoadmapMiniCard from "./RoadmapMiniCard";
import type { RoadmapItem, WashKey } from "./roadmap.data";
import { WASH_KEYS } from "./roadmap.data";

export default function RoadmapTrack({ items }: { items: RoadmapItem[] }) {
  return (
    <>
      {items.map((item, i) => {
        const wash = WASH_KEYS[i % WASH_KEYS.length] as WashKey;
        return (
          <RoadmapMiniCard
            key={`${item.titleKey}-${i}`}
            item={item}
            wash={wash}
          />
        );
      })}
    </>
  );
}
