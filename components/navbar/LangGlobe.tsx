// components/navbar/LangGlobe.tsx
"use client";

import styles from "./navbar.module.css";
import { useLocale } from "@/components/site/LocaleProvider";

export default function LangGlobe({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLocale();

  return (
    <button
      type="button"
      className={`${styles.globeBtn} ${compact ? styles.globeBtnCompact : ""}`}
      aria-label="Switch language"
      title="Language"
      onClick={() => setLocale(locale === "en" ? "zh" : "en")}
    >
      <span className={styles.globeIcon} aria-hidden>
        🌐
      </span>
      <span className={styles.globeText}>{locale === "en" ? "EN" : "中文"}</span>
    </button>
  );
}
