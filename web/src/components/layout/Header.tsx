import Link from "next/link";

import Container from "@/components/ui/Container";

import Nav from "./Nav";
import MobileNav from "./MobileNav";

import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Container className={styles.inner}>
        <Link
          href="/"
          className={styles.identity}
          aria-label="Craig A. Stueber home"
        >
          Craig A. Stueber
        </Link>

        <Nav />

        <MobileNav />
      </Container>
    </header>
  );
}
