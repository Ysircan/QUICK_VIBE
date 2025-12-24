"use client";

import styles from "./startLearnBtn.module.css";

export default function StartLearnBtn({
  onClick,
  href,
  label = "START LEARN",
  sub = "now",
}: {
  onClick?: () => void;
  href?: string; // 可选：传 "#demos" / "/learn" 等
  label?: string;
  sub?: string;
}) {
  const inner = (
    <>
      <span className={styles.icon} aria-hidden="true" />
      <span className={styles.text}>
        <b>{label}</b> <span>{sub}</span>
      </span>
    </>
  );

  if (href) {
    return (
      <a className={styles.btn} href={href}>
        {inner}
      </a>
    );
  }

  return (
    <button className={styles.btn} type="button" onClick={onClick}>
      {inner}
    </button>
  );
}
