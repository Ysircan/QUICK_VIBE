// components/navbar/Navbar.tsx
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { NAV_ITEMS } from "./navItems";
import { useLocale } from "@/components/site/LocaleProvider";
import { t } from "@/components/site/i18n";
import LangGlobe from "./LangGlobe";

export type NavKey = "home" | "roadmap" | "learn" | "contact";

function getActiveKey(pathname: string): NavKey {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/roadmap")) return "roadmap";
  if (pathname.startsWith("/learn")) return "learn";
  if (pathname.startsWith("/contact")) return "contact";
  return "home";
}

function labelKey(k: NavKey) {
  if (k === "home") return "nav_home" as const;
  if (k === "roadmap") return "nav_roadmap" as const;
  if (k === "learn") return "nav_learn" as const;
  return "nav_contact" as const;
}

export default function Navbar({ stageMax = 1280 }: { stageMax?: number }) {
  const pathname = usePathname() || "/";
  const active = useMemo(() => getActiveKey(pathname), [pathname]);

  const { locale } = useLocale();
  const [open, setOpen] = useState(false);

  // 路由切换时自动关抽屉
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 抽屉打开时锁滚动
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <header className={styles.navBar}>
        <div className={styles.stage} style={{ maxWidth: stageMax }}>
          <div className={styles.row}>
            {/* LEFT */}
            <a className={styles.brand} href="/" aria-label="Quick Home">
              <img className={styles.brandIcon} src="/logo.jpg" alt="Quick logo" />
              <span className={styles.brandMeta}>
                <span className={styles.brandTitle}>{t(locale, "brand")}</span>
                <span className={styles.brandTagline}>{t(locale, "nav_tagline")}</span>
              </span>
            </a>

            {/* RIGHT */}
            <nav className={styles.right} aria-label="Primary">
              <div className={styles.desktopLinks}>
                {NAV_ITEMS.map((l) => (
                  <a
                    key={l.key}
                    className={`${styles.navBtn} ${active === l.key ? styles.navBtnActive : ""}`}
                    href={l.href}
                  >
                    {t(locale, labelKey(l.key))}
                  </a>
                ))}
              </div>

              {/* language globe (desktop) */}
              <LangGlobe />

              {/* mobile menu button */}
              <button
                className={styles.menuBtn}
                type="button"
                aria-label="Open menu"
                aria-expanded={open}
                onClick={() => setOpen(true)}
              >
                ☰
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* mobile drawer */}
      {open && (
        <div className={styles.drawerOverlay} role="dialog" aria-modal="true">
          <div className={styles.drawer} style={{ maxWidth: stageMax }}>
            <div className={styles.drawerTop}>
              <div className={styles.drawerTitle}>{t(locale, "nav_menu")}</div>
              <button className={styles.drawerClose} onClick={() => setOpen(false)} aria-label="Close">
                ✕
              </button>
            </div>

            <div className={styles.drawerLinks}>
              {NAV_ITEMS.map((l) => (
                <a
                  key={l.key}
                  className={`${styles.drawerLink} ${active === l.key ? styles.drawerLinkActive : ""}`}
                  href={l.href}
                  onClick={() => setOpen(false)}
                >
                  {t(locale, labelKey(l.key))}
                </a>
              ))}
            </div>

            <div className={styles.drawerLang}>
              <span className={styles.drawerHint}>{t(locale, "nav_language")}</span>
              <LangGlobe compact />
            </div>
          </div>

          <button className={styles.overlayClicker} aria-label="Close overlay" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
