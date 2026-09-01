import Container from "@/components/ui/Container";

import styles from "./loading.module.css";

export default function BlogLoading() {
  return (
    <main>
      <section className={styles.hero}>
        <Container>
          <p className={styles.eyebrow}>Writing</p>

          <div className={styles.heading} />

          <div className={styles.intro}>
            <span />
            <span />
            <span />
          </div>
        </Container>
      </section>

      <section className={styles.content}>
        <Container>
          <p className={styles.eyebrow}>Latest Essay</p>

          <div className={styles.card}>
            <div className={styles.image} />

            <div className={styles.cardCopy}>
              <div className={styles.lineShort} />
              <div className={styles.lineLong} />
              <div className={styles.lineMedium} />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
