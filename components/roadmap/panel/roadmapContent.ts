// components/roadmap/panel/roadmapContent.ts
import type { RoadmapContent } from "./types";

export const ROADMAP_CONTENT: RoadmapContent = {
  header: {
    title: "ROADMAP",
    subtitle:
      "This is a navigator: pick a skill on the left, see what it does on the right. Deep lessons live in Learn.",
    primaryAction: {
      id: "learn",
      label: "GO LEARN →",
      href: "/learn",
    },
  },

  moduleOrder: ["frontend", "backend", "database", "deploy", "addons"],

  modules: {
    frontend: {
      title: "FRONTEND",
      description:
        "Build what users see: structure, styling, components, interaction.",
      skills: [
        {
          key: "html",
          name: "HTML",
          badge: "PAGE STRUCTURE",
          hint: "Structure / content / forms",
          description: "HTML is page structure. It defines content blocks and forms.",
          bullets: [
            "Write structure: headings, sections, images, layout regions.",
            "Build forms: inputs, buttons, selects, submit.",
            "Provides stable markup for CSS and React to attach to.",
          ],
          actions: [
            { id: "open", label: "OPEN HTML →", href: "/learn/html" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "css",
          name: "CSS",
          badge: "VISUAL STYLE",
          hint: "Layout / spacing / typography",
          description:
            "CSS controls layout and visual style: spacing, typography, responsiveness.",
          bullets: [
            "Layout with Flex/Grid and consistent spacing.",
            "Style UI parts: buttons, cards, navigation, hover states.",
            "Make the UI work well on mobile screens.",
          ],
          actions: [
            { id: "open", label: "OPEN CSS →", href: "/learn/css" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "react",
          name: "React",
          badge: "COMPONENTS",
          hint: "Components / state / interaction",
          description:
            "React builds UI as components and adds interaction through state.",
          bullets: [
            "Compose reusable parts: Navbar, Card, Panel.",
            "Handle interaction: tabs, collapses, modals, loading states.",
            "Render API data safely into the UI.",
          ],
          actions: [
            { id: "open", label: "OPEN REACT →", href: "/learn/react" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "typescript",
          name: "TypeScript",
          badge: "TYPE SAFETY",
          hint: "Types / data shape / stability",
          description:
            "TypeScript adds types so you ship fewer mistakes and refactor safely.",
          bullets: [
            "Define props and data shapes to prevent wrong inputs.",
            "Make API response fields explicit and predictable.",
            "Keep refactors safer as the project grows.",
          ],
          actions: [
            { id: "open", label: "OPEN TS →", href: "/learn/typescript" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "nextjs",
          name: "Next.js",
          badge: "APP STRUCTURE",
          hint: "Routing / layouts / integration",
          description:
            "Next.js provides app structure: routing, layouts, and integration patterns.",
          bullets: [
            "Routing: /home /learn /roadmap.",
            "Layouts: shared shell with page swapping.",
            "Easy integration with APIs and deployment.",
          ],
          actions: [
            { id: "open", label: "OPEN NEXT →", href: "/learn/nextjs" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
      ],
    },

    backend: {
      title: "BACKEND",
      description:
        "Build features: APIs, authentication, permissions, and file handling.",
      skills: [
        {
          key: "api",
          name: "API Design",
          badge: "ENDPOINTS",
          hint: "Routes / requests / responses",
          description:
            "APIs are endpoints the frontend calls to read and write data.",
          bullets: [
            "Provide data: list, detail, search.",
            "CRUD actions: create, update, delete.",
            "Define request/response formats that match the UI.",
          ],
          actions: [
            { id: "open", label: "OPEN API →", href: "/learn/api" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "auth",
          name: "Auth",
          badge: "ACCESS CONTROL",
          hint: "Login / roles / protection",
          description:
            "Auth controls who can use the system and what actions are allowed.",
          bullets: [
            "Login/register with sessions or tokens.",
            "Protect endpoints (no login = no access).",
            "Roles/permissions when needed (user/admin).",
          ],
          actions: [
            { id: "open", label: "OPEN AUTH →", href: "/learn/auth" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "validation",
          name: "Validation",
          badge: "INPUT CHECKS",
          hint: "Prevent bad data",
          description:
            "Validation checks incoming data so the system doesn’t get corrupted.",
          bullets: [
            "Verify required fields and formats.",
            "Return clear errors the UI can show.",
            "Keep the database consistent.",
          ],
          actions: [
            { id: "open", label: "OPEN VALIDATION →", href: "/learn/validation" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "upload",
          name: "File Upload",
          badge: "FILES",
          hint: "Images / docs / audio",
          description:
            "Uploads receive files and store them safely with limits and references.",
          bullets: [
            "Upload covers, documents, audio assets.",
            "Enforce size/type limits to prevent abuse.",
            "Save file URLs and write records into the database.",
          ],
          actions: [
            { id: "open", label: "OPEN UPLOAD →", href: "/learn/upload" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
      ],
    },

    database: {
      title: "DATABASE",
      description: "Store data: schema, relations, and safe schema changes.",
      skills: [
        {
          key: "schema",
          name: "Schema",
          badge: "TABLE DESIGN",
          hint: "Fields / types / constraints",
          description: "Schema defines tables: fields, types, and constraints.",
          bullets: [
            "Model features into tables (User, Course, Order).",
            "Decide required vs optional fields.",
            "Use constraints/defaults to prevent messy data.",
          ],
          actions: [
            { id: "open", label: "OPEN SCHEMA →", href: "/learn/schema" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "relations",
          name: "Relations",
          badge: "LINK DATA",
          hint: "Ownership / one-to-many",
          description:
            "Relations define how tables connect (what belongs to what).",
          bullets: [
            "Structure ownership: user → course → lesson.",
            "Query connected data reliably.",
            "Avoid duplicating the same data in many places.",
          ],
          actions: [
            { id: "open", label: "OPEN RELATIONS →", href: "/learn/relations" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "migrations",
          name: "Migrations",
          badge: "SAFE CHANGES",
          hint: "Evolve schema safely",
          description:
            "Migrations are controlled schema changes that keep environments aligned.",
          bullets: [
            "Add/change fields and create new tables.",
            "Keep local and production in sync.",
            "Avoid surprises caused by schema drift.",
          ],
          actions: [
            { id: "open", label: "OPEN MIGRATIONS →", href: "/learn/migrations" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
      ],
    },

    deploy: {
      title: "DEPLOY",
      description: "Ship it: deployment, environment variables, domain & DNS.",
      skills: [
        {
          key: "deploy",
          name: "Deploy",
          badge: "PUBLISH",
          hint: "Preview / production",
          description:
            "Deployment publishes your site so people can access it online.",
          bullets: [
            "Preview builds on each push.",
            "Production release from main.",
            "Rollback and quick fixes when things break.",
          ],
          actions: [
            { id: "open", label: "OPEN DEPLOY →", href: "/learn/deploy" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "env",
          name: "Env Vars",
          badge: "CONFIG",
          hint: "Secrets / URLs",
          description:
            "Environment variables store config and secrets outside your code.",
          bullets: [
            "Database URLs and API keys.",
            "Separate dev vs production settings.",
            "Reduce production-only failures.",
          ],
          actions: [
            { id: "open", label: "OPEN ENV →", href: "/learn/env" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "domain",
          name: "Domain & DNS",
          badge: "CUSTOM URL",
          hint: "Domain / records",
          description:
            "Domain & DNS let people use your brand URL instead of a platform subdomain.",
          bullets: [
            "Attach a custom domain to your deployment.",
            "Configure DNS records (A/CNAME/subdomains).",
            "Troubleshoot: propagation, caching, wrong records.",
          ],
          actions: [
            { id: "open", label: "OPEN DOMAIN →", href: "/learn/domain" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
      ],
    },

    addons: {
      title: "ADD-ONS",
      description:
        "Optional capabilities that turn a site into something you can operate and monetize.",
      skills: [
        {
          key: "payment",
          name: "Payment",
          badge: "TAKE MONEY",
          hint: "One-time / subscription",
          description:
            "Payments let your site charge users and keep an order record.",
          bullets: [
            "One-time payment for courses, services, templates.",
            "Subscriptions (monthly/yearly).",
            "Webhooks for success/fail/refund events.",
          ],
          actions: [
            { id: "open", label: "OPEN PAYMENT →", href: "/learn/payment" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "email",
          name: "Email",
          badge: "NOTIFICATIONS",
          hint: "Verify / reset / receipts",
          description:
            "Email is used for verification, password reset, receipts, and notifications.",
          bullets: [
            "Sign-up verification and password reset.",
            "Order receipts and status updates.",
            "System alerts and basic ops messages.",
          ],
          actions: [
            { id: "open", label: "OPEN EMAIL →", href: "/learn/email" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "analytics",
          name: "Analytics",
          badge: "MEASURE",
          hint: "Traffic / conversion",
          description: "Analytics tells you what users do and what converts.",
          bullets: [
            "Traffic sources and page clicks.",
            "Funnels: visit → sign up → purchase.",
            "Use data to improve copy and pages.",
          ],
          actions: [
            { id: "open", label: "OPEN ANALYTICS →", href: "/learn/analytics" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
        {
          key: "admin",
          name: "Admin",
          badge: "MANAGE",
          hint: "Content / users / orders",
          description:
            "Admin tools let you manage content, users, and orders.",
          bullets: [
            "Manage content: posts, lessons, resources.",
            "Manage users: roles, bans, profiles.",
            "Manage orders: status, refunds, reconciliation.",
          ],
          actions: [
            { id: "open", label: "OPEN ADMIN →", href: "/learn/admin" },
            { id: "related", label: "RELATED CARDS" },
          ],
        },
      ],
    },
  },
};
