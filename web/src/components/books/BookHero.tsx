import Link from "next/link";

import Container from "@/components/ui/Container";

import styles from "./BookHero.module.css";

interface BookHeroProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  visualTitle: string[];
  visualSubtitle?: string[];
  coverNote?: string;
  primaryHref?: string;
  primaryLabel?: string;
}

export default function BookHero({
  eyebrow,
  title,
  subtitle,
  description,
  visualTitle,
  visualSubtitle = [],
  coverNote = "Final cover coming soon",
  primaryHref = "/newsletter",
  primaryLabel = "Get Book Updates",
}: BookHeroProps) {
  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>{eyebrow}</p>

          <h1 className={styles.title}>{title}</h1>

          <p className={styles.subtitle}>{subtitle}</p>

          <p className={styles.description}>{description}</p>

          <div className={styles.actions}>
            <Link href={primaryHref} className={styles.primaryAction}>
              {primaryLabel}
            </Link>

            <Link href="/books" className={styles.secondaryAction}>
              All Books
            </Link>
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.glow} aria-hidden="true" />

          <div className={styles.book} aria-hidden="true">
            <div className={styles.bookCover}>
              <p className={styles.bookAuthor}>Craig A. Stueber</p>

              <div className={styles.bookTitle}>
                {visualTitle.map((line, index) => (
                  <span
                    key={line}
                    className={
                      index === visualTitle.length - 1 ? styles.bookAccent : ""
                    }
                  >
                    {line}
                  </span>
                ))}
              </div>

              <div className={styles.bookRule} />

              {visualSubtitle.length > 0 && (
                <p className={styles.bookSubtitle}>
                  {visualSubtitle.map((line, index) => (
                    <span key={line}>
                      {line}
                      {index < visualSubtitle.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              )}
            </div>
          </div>

          <p className={styles.coverNote}>{coverNote}</p>
        </div>
      </Container>
    </section>
  );
}
