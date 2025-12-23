"use client";

import React, { useMemo, useState } from "react";
import styles from "./navbar.module.css";

export type NavKey = "home" | "yellowpages" | "learn" | "contact";

export default function Navbar({
  active = "home",
  stageMax = 1280,
}: {
  active?: NavKey;
  stageMax?: number;
}) {
  const [open, setOpen] = useState(false);

  const links = useMemo(
    () => [
      { key: "home" as const, label: "Home", href: "/" },
      { key: "yellowpages" as const, label: "Yellow Pages", href: "/yellowpages" },
      { key: "learn" as const, label: "Learn", href: "/learn" },
      { key: "contact" as const, label: "Contact", href: "/contact" },
    ],
    []
  );

  return (
    <>
      <header className={styles.navBar}>
        <div className={styles.stage} style={{ maxWidth: stageMax }}>
          <div className={styles.row}>
            {/* LEFT: no wrapper pill, just logo + text */}
            <a className={styles.brand} href="/" aria-label="Quick Home">
              <img className={styles.brandIcon} src="/logo.jpg" alt="Quick logo" />
              <span className={styles.brandMeta}>
                <span className={styles.brandTitle}>Quick</span>
                <span className={styles.brandTagline}>Deploy-first learning</span>
              </span>
            </a>

            {/* RIGHT: desktop links */}
            <nav className={styles.right} aria-label="Primary">
              <div className={styles.desktopLinks}>
                {links.map((l) => (
                  <a
                    key={l.key}
                    className={`${styles.navBtn} ${active === l.key ? styles.navBtnActive : ""}`}
                    href={l.href}
                  >
                    {l.label}
                  </a>
                ))}
              </div>

              {/* language (desktop) */}
              <div className={styles.langToggle} aria-label="Language">
                <button className={`${styles.langSeg} ${styles.langSegActive}`} type="button">
                  EN
                </button>
                <button className={styles.langSeg} type="button">
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
              {links.map((l) => (
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

            <div className={styles.drawerLang}>
              <span className={styles.drawerHint}>Language</span>
              <div className={styles.langToggle} aria-label="Language">
                <button className={`${styles.langSeg} ${styles.langSegActive}`} type="button">
                  EN
                </button>
                <button className={styles.langSeg} type="button">
                  中文
                </button>
              </div>
            </div>
          </div>

          {/* click outside to close */}
          <button className={styles.overlayClicker} aria-label="Close overlay" onClick={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
