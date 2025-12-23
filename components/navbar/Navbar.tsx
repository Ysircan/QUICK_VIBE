"use client";

import React, { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import { NAV_ITEMS } from "./navItems";
import { useLocale } from "@/components/site/LocaleProvider";

export type NavKey = "home" | "yellowpages" | "learn" | "contact";

function getActiveKey(pathname: string): NavKey {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/yellowpages")) return "yellowpages";
  if (pathname.startsWith("/learn")) return "learn";
  if (pathname.startsWith("/contact")) return "contact";
  return "home";
}

export default function Navbar({ stageMax = 1280 }: { stageMax?: number }) {
  const pathname = usePathname() || "/";
  const active = useMemo(() => getActiveKey(pathname), [pathname]);

  const { locale, setLocale } = useLocale(); // ✅ 语言状态

  const [open, setOpen] = useState(false);

  // 路由切换时自动关抽屉（避免跳页后抽屉还开着）
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 抽屉打开时锁定页面滚动（移动端体验必须）
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
                <span className={styles.brandTitle}>Quick</span>
                <span className={styles.brandTagline}>Deploy-first learning</span>
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
                    {l.label}
                  </a>
                ))}
              </div>

              {/* desktop language */}
              <div className={styles.langToggle} aria-label="Language">
                <button
                  className={`${styles.langSeg} ${locale === "en" ? styles.langSegActive : ""}`}
                  type="button"
                  onClick={() => setLocale("en")}
                >
                  EN
                </button>
                <button
                  className={`${styles.langSeg} ${locale === "zh" ? styles.langSegActive : ""}`}
                  type="button"
                  onClick={() => setLocale("zh")}
                >
                  中文
                </button>
              </div>

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
              <div className={styles.drawerTitle}>Menu</div>
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
                  {l.label}
                </a>
              ))}
            </div>

            {/* drawer language (mobile) */}
            <div className={styles.drawerLang}>
              <span className={styles.drawerHint}>Language</span>
              <div className={styles.langToggle} aria-label="Language">
                <button
                  className={`${styles.langSeg} ${locale === "en" ? styles.langSegActive : ""}`}
                  type="button"
                  onClick={() => setLocale("en")}
                >
                  EN
                </button>
                <button
                  className={`${styles.langSeg} ${locale === "zh" ? styles.langSegActive : ""}`}
                  type="button"
                  onClick={() => setLocale("zh")}
                >
                  中文
                </button>
              </div>
            </div>
          </div>

          <button className={styles.overlayClicker} aria-label="Close overlay" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
