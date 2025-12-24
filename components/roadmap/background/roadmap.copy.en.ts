// components/roadmap/background/roadmap.copy.en.ts

export type TitleKey =
  | "authSession"
  | "caching"
  | "uploadUI"
  | "crudTable"
  | "restApi"
  | "migrations"
  | "monitoring"
  | "deployVercel"
  | "envVars"
  | "ciChecks";

export type SubKey =
  | "authSessionSub"
  | "cachingSub"
  | "uploadUISub"
  | "crudTableSub"
  | "restApiSub"
  | "migrationsSub"
  | "monitoringSub"
  | "deployVercelSub"
  | "envVarsSub"
  | "ciChecksSub";

export const TITLE_COPY: Record<TitleKey, string> = {
  authSession: "Auth Session",
  caching: "Caching",
  uploadUI: "Upload UI",
  crudTable: "CRUD Table",
  restApi: "REST API",
  migrations: "Migrations",
  monitoring: "Monitoring",
  deployVercel: "Deploy to Vercel",
  envVars: "Env Vars",
  ciChecks: "CI Checks",
};

export const SUB_COPY: Record<SubKey, string> = {
  authSessionSub: "Login state + guards.",
  cachingSub: "Faster reads, less cost.",
  uploadUISub: "Drag drop + progress.",
  crudTableSub: "List, filters, actions.",
  restApiSub: "Routes + validation.",
  migrationsSub: "Safe schema changes.",
  monitoringSub: "Errors, logs, uptime.",
  deployVercelSub: "Preview → prod.",
  envVarsSub: "Secrets, config.",
  ciChecksSub: "Lint + type gate.",
};

/**
 * Tag labels (keep visual color in roadmap.theme.ts)
 */
export type TagLabelKey =
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

export const TAG_LABEL: Record<TagLabelKey, string> = {
  frontend: "FRONTEND",
  backend: "BACKEND",
  database: "DATABASE",
  deploy: "DEPLOY",
  auth: "AUTH",
  perf: "PERF",
  files: "FILES",
  data: "DATA",
  api: "API",
  schema: "SCHEMA",
  ops: "OPS",
  vercel: "VERCEL",
  config: "CONFIG",
  ci: "CI",
};
