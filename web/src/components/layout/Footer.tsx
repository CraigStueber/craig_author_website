import Link from "next/link";

import Container from "@/components/ui/Container";

import styles from "./Footer.module.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <Container className={styles.inner}>
        <div>
          <p className={styles.name}>Craig A. Stueber</p>

          <p className={styles.description}>
            Author, engineer, and researcher exploring technology, artificial
            intelligence, and human agency.
          </p>
        </div>

        <div className={styles.links}>
          <Link href="/books">Books</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/newsletter">Newsletter</Link>
        </div>

        <p className={styles.copyright}>© {year} Craig A. Stueber</p>
      </Container>
    </footer>
  );
}
