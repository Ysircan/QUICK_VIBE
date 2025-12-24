// components/roadmap/background/roadmap.data.ts

import type { CapKey, TagKey } from "./roadmap.theme";
import type { TitleKey, SubKey } from "./roadmap.copy.en";

export type RoadmapItem = {
  capKey: CapKey;
  titleKey: TitleKey;
  subKey: SubKey;
  tags: TagKey[];
};

export const LEFT_ITEMS: RoadmapItem[] = [
  { capKey: "core", titleKey: "authSession", subKey: "authSessionSub", tags: ["backend", "auth"] },
  { capKey: "pro", titleKey: "caching", subKey: "cachingSub", tags: ["backend", "perf"] },
  { capKey: "ship", titleKey: "uploadUI", subKey: "uploadUISub", tags: ["frontend", "files"] },
  { capKey: "pro", titleKey: "crudTable", subKey: "crudTableSub", tags: ["frontend", "data"] },
  { capKey: "core", titleKey: "restApi", subKey: "restApiSub", tags: ["backend", "api"] },
];

export const RIGHT_ITEMS: RoadmapItem[] = [
  { capKey: "pro", titleKey: "migrations", subKey: "migrationsSub", tags: ["database", "schema"] },
  { capKey: "pro", titleKey: "monitoring", subKey: "monitoringSub", tags: ["deploy", "ops"] },
  { capKey: "core", titleKey: "deployVercel", subKey: "deployVercelSub", tags: ["deploy", "vercel"] },
  { capKey: "pro", titleKey: "envVars", subKey: "envVarsSub", tags: ["deploy", "config"] },
  { capKey: "ship", titleKey: "ciChecks", subKey: "ciChecksSub", tags: ["deploy", "ci"] },
];

export const WASH_KEYS = ["wash1", "wash2", "wash3", "wash4"] as const;
export type WashKey = (typeof WASH_KEYS)[number];

export function rotate<T>(arr: T[], by: number): T[] {
  const n = arr.length;
  if (!n) return arr;
  const k = ((by % n) + n) % n;
  return arr.slice(k).concat(arr.slice(0, k));
}

export function baseItemsForColumn(colIndex: number): RoadmapItem[] {
  return colIndex % 2 === 0 ? LEFT_ITEMS : RIGHT_ITEMS;
}

export function columnItems(colIndex: number): RoadmapItem[] {
  return rotate(baseItemsForColumn(colIndex), colIndex);
}
