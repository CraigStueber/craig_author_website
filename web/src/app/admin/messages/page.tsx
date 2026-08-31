import Link from "next/link";

import AdminMessages from "@/components/admin/AdminMessages";
import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export default function AdminMessagesPage() {
  return (
    <main className={styles.page}>
      <Container>
        <header className={styles.header}>
          <Link href="/admin" className={styles.back}>
            ← Admin
          </Link>

          <p className={styles.eyebrow}>Contact</p>

          <h1>Messages</h1>

          <p>View messages submitted through the website contact form.</p>
        </header>

        <AdminMessages />
      </Container>
    </main>
  );
}
