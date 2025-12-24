// components/roadmap/panel/roadmapContent.ts
import type { Locale } from "@/components/site/LocaleProvider";
import { t } from "@/components/site/i18n";
import type { RoadmapContent } from "./types";

export function getRoadmapContent(locale: Locale): RoadmapContent {
  const openLabel = (name: string) =>
    `${t(locale, "roadmap_action_open")} ${name} ${t(locale, "roadmap_action_arrow")}`.trim();
  const relatedLabel = t(locale, "roadmap_action_related");

  const htmlName = t(locale, "roadmap_skill_html_name");
  const cssName = t(locale, "roadmap_skill_css_name");
  const reactName = t(locale, "roadmap_skill_react_name");
  const tsName = t(locale, "roadmap_skill_typescript_name");
  const nextName = t(locale, "roadmap_skill_nextjs_name");

  const apiName = t(locale, "roadmap_skill_api_name");
  const authName = t(locale, "roadmap_skill_auth_name");
  const validationName = t(locale, "roadmap_skill_validation_name");
  const uploadName = t(locale, "roadmap_skill_upload_name");

  const schemaName = t(locale, "roadmap_skill_schema_name");
  const relationsName = t(locale, "roadmap_skill_relations_name");
  const migrationsName = t(locale, "roadmap_skill_migrations_name");

  const deployName = t(locale, "roadmap_skill_deploy_name");
  const envName = t(locale, "roadmap_skill_env_name");
  const domainName = t(locale, "roadmap_skill_domain_name");

  const paymentName = t(locale, "roadmap_skill_payment_name");
  const emailName = t(locale, "roadmap_skill_email_name");
  const analyticsName = t(locale, "roadmap_skill_analytics_name");
  const adminName = t(locale, "roadmap_skill_admin_name");

  return {
    header: {
      title: t(locale, "roadmap_header_title"),
      subtitle: t(locale, "roadmap_header_subtitle"),
      primaryAction: {
        id: "learn",
        label: t(locale, "roadmap_header_primary_action"),
        href: "/learn",
      },
    },

    moduleOrder: ["frontend", "backend", "database", "deploy", "addons"],

    modules: {
      frontend: {
        title: t(locale, "roadmap_module_frontend_title"),
        description: t(locale, "roadmap_module_frontend_desc"),
        skills: [
          {
            key: "html",
            name: htmlName,
            badge: t(locale, "roadmap_skill_html_badge"),
            hint: t(locale, "roadmap_skill_html_hint"),
            description: t(locale, "roadmap_skill_html_desc"),
            bullets: [
              t(locale, "roadmap_skill_html_bullet1"),
              t(locale, "roadmap_skill_html_bullet2"),
              t(locale, "roadmap_skill_html_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(htmlName), href: "/learn/html" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "css",
            name: cssName,
            badge: t(locale, "roadmap_skill_css_badge"),
            hint: t(locale, "roadmap_skill_css_hint"),
            description: t(locale, "roadmap_skill_css_desc"),
            bullets: [
              t(locale, "roadmap_skill_css_bullet1"),
              t(locale, "roadmap_skill_css_bullet2"),
              t(locale, "roadmap_skill_css_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(cssName), href: "/learn/css" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "react",
            name: reactName,
            badge: t(locale, "roadmap_skill_react_badge"),
            hint: t(locale, "roadmap_skill_react_hint"),
            description: t(locale, "roadmap_skill_react_desc"),
            bullets: [
              t(locale, "roadmap_skill_react_bullet1"),
              t(locale, "roadmap_skill_react_bullet2"),
              t(locale, "roadmap_skill_react_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(reactName), href: "/learn/react" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "typescript",
            name: tsName,
            badge: t(locale, "roadmap_skill_typescript_badge"),
            hint: t(locale, "roadmap_skill_typescript_hint"),
            description: t(locale, "roadmap_skill_typescript_desc"),
            bullets: [
              t(locale, "roadmap_skill_typescript_bullet1"),
              t(locale, "roadmap_skill_typescript_bullet2"),
              t(locale, "roadmap_skill_typescript_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(tsName), href: "/learn/typescript" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "nextjs",
            name: nextName,
            badge: t(locale, "roadmap_skill_nextjs_badge"),
            hint: t(locale, "roadmap_skill_nextjs_hint"),
            description: t(locale, "roadmap_skill_nextjs_desc"),
            bullets: [
              t(locale, "roadmap_skill_nextjs_bullet1"),
              t(locale, "roadmap_skill_nextjs_bullet2"),
              t(locale, "roadmap_skill_nextjs_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(nextName), href: "/learn/nextjs" },
              { id: "related", label: relatedLabel },
            ],
          },
        ],
      },

      backend: {
        title: t(locale, "roadmap_module_backend_title"),
        description: t(locale, "roadmap_module_backend_desc"),
        skills: [
          {
            key: "api",
            name: apiName,
            badge: t(locale, "roadmap_skill_api_badge"),
            hint: t(locale, "roadmap_skill_api_hint"),
            description: t(locale, "roadmap_skill_api_desc"),
            bullets: [
              t(locale, "roadmap_skill_api_bullet1"),
              t(locale, "roadmap_skill_api_bullet2"),
              t(locale, "roadmap_skill_api_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(apiName), href: "/learn/api" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "auth",
            name: authName,
            badge: t(locale, "roadmap_skill_auth_badge"),
            hint: t(locale, "roadmap_skill_auth_hint"),
            description: t(locale, "roadmap_skill_auth_desc"),
            bullets: [
              t(locale, "roadmap_skill_auth_bullet1"),
              t(locale, "roadmap_skill_auth_bullet2"),
              t(locale, "roadmap_skill_auth_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(authName), href: "/learn/auth" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "validation",
            name: validationName,
            badge: t(locale, "roadmap_skill_validation_badge"),
            hint: t(locale, "roadmap_skill_validation_hint"),
            description: t(locale, "roadmap_skill_validation_desc"),
            bullets: [
              t(locale, "roadmap_skill_validation_bullet1"),
              t(locale, "roadmap_skill_validation_bullet2"),
              t(locale, "roadmap_skill_validation_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(validationName), href: "/learn/validation" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "upload",
            name: uploadName,
            badge: t(locale, "roadmap_skill_upload_badge"),
            hint: t(locale, "roadmap_skill_upload_hint"),
            description: t(locale, "roadmap_skill_upload_desc"),
            bullets: [
              t(locale, "roadmap_skill_upload_bullet1"),
              t(locale, "roadmap_skill_upload_bullet2"),
              t(locale, "roadmap_skill_upload_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(uploadName), href: "/learn/upload" },
              { id: "related", label: relatedLabel },
            ],
          },
        ],
      },

      database: {
        title: t(locale, "roadmap_module_database_title"),
        description: t(locale, "roadmap_module_database_desc"),
        skills: [
          {
            key: "schema",
            name: schemaName,
            badge: t(locale, "roadmap_skill_schema_badge"),
            hint: t(locale, "roadmap_skill_schema_hint"),
            description: t(locale, "roadmap_skill_schema_desc"),
            bullets: [
              t(locale, "roadmap_skill_schema_bullet1"),
              t(locale, "roadmap_skill_schema_bullet2"),
              t(locale, "roadmap_skill_schema_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(schemaName), href: "/learn/schema" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "relations",
            name: relationsName,
            badge: t(locale, "roadmap_skill_relations_badge"),
            hint: t(locale, "roadmap_skill_relations_hint"),
            description: t(locale, "roadmap_skill_relations_desc"),
            bullets: [
              t(locale, "roadmap_skill_relations_bullet1"),
              t(locale, "roadmap_skill_relations_bullet2"),
              t(locale, "roadmap_skill_relations_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(relationsName), href: "/learn/relations" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "migrations",
            name: migrationsName,
            badge: t(locale, "roadmap_skill_migrations_badge"),
            hint: t(locale, "roadmap_skill_migrations_hint"),
            description: t(locale, "roadmap_skill_migrations_desc"),
            bullets: [
              t(locale, "roadmap_skill_migrations_bullet1"),
              t(locale, "roadmap_skill_migrations_bullet2"),
              t(locale, "roadmap_skill_migrations_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(migrationsName), href: "/learn/migrations" },
              { id: "related", label: relatedLabel },
            ],
          },
        ],
      },

      deploy: {
        title: t(locale, "roadmap_module_deploy_title"),
        description: t(locale, "roadmap_module_deploy_desc"),
        skills: [
          {
            key: "deploy",
            name: deployName,
            badge: t(locale, "roadmap_skill_deploy_badge"),
            hint: t(locale, "roadmap_skill_deploy_hint"),
            description: t(locale, "roadmap_skill_deploy_desc"),
            bullets: [
              t(locale, "roadmap_skill_deploy_bullet1"),
              t(locale, "roadmap_skill_deploy_bullet2"),
              t(locale, "roadmap_skill_deploy_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(deployName), href: "/learn/deploy" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "env",
            name: envName,
            badge: t(locale, "roadmap_skill_env_badge"),
            hint: t(locale, "roadmap_skill_env_hint"),
            description: t(locale, "roadmap_skill_env_desc"),
            bullets: [
              t(locale, "roadmap_skill_env_bullet1"),
              t(locale, "roadmap_skill_env_bullet2"),
              t(locale, "roadmap_skill_env_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(envName), href: "/learn/env" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "domain",
            name: domainName,
            badge: t(locale, "roadmap_skill_domain_badge"),
            hint: t(locale, "roadmap_skill_domain_hint"),
            description: t(locale, "roadmap_skill_domain_desc"),
            bullets: [
              t(locale, "roadmap_skill_domain_bullet1"),
              t(locale, "roadmap_skill_domain_bullet2"),
              t(locale, "roadmap_skill_domain_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(domainName), href: "/learn/domain" },
              { id: "related", label: relatedLabel },
            ],
          },
        ],
      },

      addons: {
        title: t(locale, "roadmap_module_addons_title"),
        description: t(locale, "roadmap_module_addons_desc"),
        skills: [
          {
            key: "payment",
            name: paymentName,
            badge: t(locale, "roadmap_skill_payment_badge"),
            hint: t(locale, "roadmap_skill_payment_hint"),
            description: t(locale, "roadmap_skill_payment_desc"),
            bullets: [
              t(locale, "roadmap_skill_payment_bullet1"),
              t(locale, "roadmap_skill_payment_bullet2"),
              t(locale, "roadmap_skill_payment_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(paymentName), href: "/learn/payment" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "email",
            name: emailName,
            badge: t(locale, "roadmap_skill_email_badge"),
            hint: t(locale, "roadmap_skill_email_hint"),
            description: t(locale, "roadmap_skill_email_desc"),
            bullets: [
              t(locale, "roadmap_skill_email_bullet1"),
              t(locale, "roadmap_skill_email_bullet2"),
              t(locale, "roadmap_skill_email_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(emailName), href: "/learn/email" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "analytics",
            name: analyticsName,
            badge: t(locale, "roadmap_skill_analytics_badge"),
            hint: t(locale, "roadmap_skill_analytics_hint"),
            description: t(locale, "roadmap_skill_analytics_desc"),
            bullets: [
              t(locale, "roadmap_skill_analytics_bullet1"),
              t(locale, "roadmap_skill_analytics_bullet2"),
              t(locale, "roadmap_skill_analytics_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(analyticsName), href: "/learn/analytics" },
              { id: "related", label: relatedLabel },
            ],
          },
          {
            key: "admin",
            name: adminName,
            badge: t(locale, "roadmap_skill_admin_badge"),
            hint: t(locale, "roadmap_skill_admin_hint"),
            description: t(locale, "roadmap_skill_admin_desc"),
            bullets: [
              t(locale, "roadmap_skill_admin_bullet1"),
              t(locale, "roadmap_skill_admin_bullet2"),
              t(locale, "roadmap_skill_admin_bullet3"),
            ],
            actions: [
              { id: "open", label: openLabel(adminName), href: "/learn/admin" },
              { id: "related", label: relatedLabel },
            ],
          },
        ],
      },
    },
  };
}
