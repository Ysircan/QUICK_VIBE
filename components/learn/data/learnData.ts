export type Lesson = {
  id: string;
  title: string;
  time: string;
  outcome: string;
};

export type TechSub = { key: string; label: string; lessonIds: string[] };
export type TechCat = { key: string; label: string; subs: TechSub[] };
export type ProjectLeaf = { key: string; label: string; lessonIds: string[] };

export type IndexModel =
  | { key: "tech"; label: string; cats: TechCat[] }
  | { key: "project"; label: string; cats: ProjectLeaf[] };

export type Copy = { title: string; outcome: string };

export const LESSONS: Lesson[] = [
  {
    id: "html-layout",
    title: "HTML · Layout Control",
    time: "15m",
    outcome: "Control the page skeleton (sections/order/button placement).",
  },
  {
    id: "css-style",
    title: "CSS · Neo Style System",
    time: "12m",
    outcome: "Control theme color / pills / hard shadows with consistent classes.",
  },
  {
    id: "react-move",
    title: "React · Safe Migration",
    time: "18m",
    outcome: "Move big HTML into React by shells → components → logic.",
  },
];

export const INDEX: IndexModel[] = [
  {
    key: "tech",
    label: "TECH STACK",
    cats: [
      {
        key: "fe",
        label: "FRONTEND",
        subs: [
          { key: "html", label: "HTML", lessonIds: ["html-layout"] },
          { key: "css", label: "CSS", lessonIds: ["css-style"] },
        ],
      },
      { key: "be", label: "BACKEND", subs: [{ key: "api", label: "API", lessonIds: [] }] },
      { key: "db", label: "DATABASE", subs: [{ key: "schema", label: "SCHEMA", lessonIds: [] }] },
      { key: "deploy", label: "DEPLOY", subs: [{ key: "vercel", label: "VERCEL", lessonIds: [] }] },
      { key: "extra", label: "EXTRAS", subs: [{ key: "git", label: "GIT", lessonIds: [] }] },
    ],
  },
  {
    key: "project",
    label: "PROJECTS",
    cats: [
      { key: "mini", label: "MINI LANDING", lessonIds: ["html-layout", "css-style"] },
      { key: "migrate", label: "MIGRATE TO REACT", lessonIds: ["react-move"] },
    ],
  },
];

// ✅ Right-top copy mapping (Index leaf -> {title,outcome})
// tech leafKey:  tech.<catKey>.<subKey>
// project key:  project.<projectKey>
export const CATEGORY_COPY: Record<string, Copy> = {
  "tech.fe.html": {
    title: "HTML · Layout Control",
    outcome: "You can control: page skeleton / sections / layout order. In other words: make it feel like a product.",
  },
  "tech.fe.css": {
    title: "CSS · Style Console",
    outcome: "You can control: theme color / buttons / shadow hardness. In other words: make it feel like a brand.",
  },
  "project.mini": {
    title: "Mini Landing · Project Track",
    outcome: "A guided build. Pick a lesson below and assemble a clean landing page step by step.",
  },
  "project.migrate": {
    title: "Migrate to React · Project Track",
    outcome: "A guided migration. Move HTML into React by shells → components → logic, without breaking style.",
  },
};

export function uniq<T>(arr: T[]) {
  return Array.from(new Set(arr));
}

export function byIdMap(list: Lesson[]) {
  return new Map(list.map((l) => [l.id, l] as const));
}
