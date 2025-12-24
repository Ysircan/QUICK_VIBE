// components/roadmap/panel/types.ts

export type RoadmapModuleKey =
  | "frontend"
  | "backend"
  | "database"
  | "deploy"
  | "addons";

/**
 * Action is data-driven so the UI never hardcodes buttons.
 * You can add/remove buttons by editing roadmapContent.ts only.
 */
/**
 * Action is data-driven so the UI never hardcodes buttons.
 * You can add/remove buttons by editing roadmapContent.ts only.
 */
export type RoadmapAction = {
  id: string;        // "open" | "related" | "learn" | anything
  label: string;     // button text
  href?: string;     // optional, only when it needs navigation
};


export type RoadmapSkill = {
  key: string;                 // stable id inside a module, e.g. "html"
  name: string;                // display name
  badge: string;               // short label on the right, e.g. "PAGE STRUCTURE"
  hint: string;                // one-liner shown in the list row
  description: string;         // right panel main text
  bullets: string[];           // right panel bullet list
  actions?: RoadmapAction[];   // right panel actions (OPEN / RELATED / etc.)
};

export type RoadmapModule = {
  key: RoadmapModuleKey;
  title: string;               // e.g. "FRONTEND"
  description: string;         // module description under title
  skills: RoadmapSkill[];
};

export type RoadmapContent = {
  header: {
    title: string;             // dynamic: module title (we render from module)
    subtitle: string;          // static: page hint line under title
    primaryAction?: RoadmapAction; // top-right CTA (GO LEARN →)
  };
  modules: Record<RoadmapModuleKey, Omit<RoadmapModule, "key">>;
  moduleOrder: RoadmapModuleKey[];
};
