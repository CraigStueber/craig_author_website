import Container from "@/components/ui/Container";

import styles from "./loading.module.css";

export default function BlogPostLoading() {
  return (
    <main>
      <article>
        <header className={styles.hero}>
          <Container>
            <div className={styles.heroInner}>
              <div className={styles.backLink} />

              <div className={styles.tags}>
                <span />
                <span />
              </div>

              <div className={styles.title}>
                <span />
                <span />
              </div>

              <div className={styles.excerpt}>
                <span />
                <span />
              </div>

              <div className={styles.meta} />
            </div>
          </Container>
        </header>

        <section className={styles.imageSection}>
          <Container>
            <div className={styles.image} />
          </Container>
        </section>

        <section className={styles.article}>
          <Container>
            <div className={styles.articleBody}>
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </Container>
        </section>
      </article>
    </main>
  );
}
