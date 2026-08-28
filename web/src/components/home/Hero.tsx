import Link from "next/link";

import Container from "@/components/ui/Container";

import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Forthcoming 2027</p>

          <h1 className={styles.title}>
            <span>The Comfortable</span>
            <span className={styles.accent}>Apocalypse</span>
          </h1>

          <p className={styles.subtitle}>
            When Survival Isn&apos;t the Problem.
            <br />
            Irrelevance Is.
          </p>

          <blockquote className={styles.quote}>
            It does not arrive as catastrophe.
            <br />
            It arrives as convenience.
          </blockquote>

          <div className={styles.actions}>
            <Link
              href="/books/comfortable-apocalypse"
              className={styles.primaryAction}
            >
              Explore the Book
            </Link>

            <Link href="/newsletter" className={styles.secondaryAction}>
              Join the Newsletter
            </Link>
          </div>
        </div>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.glow} />

          <div className={styles.book}>
            <div className={styles.bookCover}>
              <p className={styles.bookAuthor}>Craig A. Stueber</p>

              <div className={styles.bookTitle}>
                <span>The Comfortable</span>
                <span>Apocalypse</span>
              </div>

              <div className={styles.bookRule} />

              <p className={styles.bookSubtitle}>
                When Survival Isn&apos;t
                <br />
                the Problem.
                <br />
                Irrelevance Is.
              </p>
            </div>
          </div>
          <p className={styles.coverNote}>Final cover coming soon</p>
        </div>
      </Container>
    </section>
  );
}
