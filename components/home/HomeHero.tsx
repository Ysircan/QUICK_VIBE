import styles from "./homeHero.module.css";

export default function HomeHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.kicker}>Deploy-first learning</div>

      <h1 className={styles.h1}>
        Quick <span className={styles.dot}>•</span> Vibe Coding
      </h1>

      <p className={styles.sub}>
        A calm, practical site for beginners to ship their first real thing — Yellow Pages, Learn, and Contact.
      </p>

      <div className={styles.ctaRow}>
        <a className={`${styles.btn} ${styles.btnPrimary}`} href="/yellowpages">
          Open Yellow Pages
        </a>
        <a className={styles.btn} href="/learn">
          Start Learning
        </a>
      </div>
    </section>
  );
}
