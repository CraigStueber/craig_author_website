import Link from "next/link";

import { NAV_ITEMS } from "@/lib/constants";

import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav} aria-label="Main navigation">
      {NAV_ITEMS.map((item) => (
        <Link key={item.href} href={item.href} className={styles.link}>
          {item.label}
        </Link>
      ))}

      <Link href="/newsletter" className={styles.newsletter}>
        Newsletter
      </Link>
    </nav>
  );
}
