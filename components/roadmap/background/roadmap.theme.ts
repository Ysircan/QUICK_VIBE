// components/roadmap/background/roadmap.theme.ts

export type CapKey = "core" | "pro" | "ship";

export type TagKey =
  | "frontend"
  | "backend"
  | "database"
  | "deploy"
  | "auth"
  | "perf"
  | "files"
  | "data"
  | "api"
  | "schema"
  | "ops"
  | "vercel"
  | "config"
  | "ci";

/**
 * Tag accent colors (CSS variables are defined in roadmapBackground.module.css)
 * Keep all color decisions here, so UI can stay dumb.
 */
export const TAG_ACCENT: Record<TagKey, string> = {
  frontend: "var(--sky)",
  backend: "var(--coral)",
  database: "var(--teal)",
  deploy: "var(--sky)",

  auth: "var(--violet)",
  perf: "var(--amber)",
  files: "var(--violet)",
  data: "var(--teal)",
  api: "var(--amber)",
  schema: "var(--amber)",
  ops: "var(--violet)",
  vercel: "var(--amber)",
  config: "var(--teal)",
  ci: "var(--coral)",
};

export const CAP_LABEL: Record<CapKey, string> = {
  core: "CORE",
  pro: "PRO",
  ship: "SHIP",
};
