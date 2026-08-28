import Link from "next/link";

import styles from "./BookCard.module.css";

interface BookCardProps {
  title: string;
  subtitle?: string;
  status: string;
  description: string;
  href: string;
  featured?: boolean;
}

export default function BookCard({
  title,
  subtitle,
  status,
  description,
  href,
  featured = false,
}: BookCardProps) {
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <div className={styles.meta}>
        <p className={styles.status}>{status}</p>

        {featured && <span className={styles.featuredLabel}>Forthcoming</span>}
      </div>

      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        <p className={styles.description}>{description}</p>

        <Link href={href} className={styles.link}>
          Explore the book
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </article>
  );
}
