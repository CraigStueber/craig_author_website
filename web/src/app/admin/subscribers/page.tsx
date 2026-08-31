import Link from "next/link";

import AdminSubscribers from "@/components/admin/AdminSubscribers";
import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export default function AdminSubscribersPage() {
  return (
    <main className={styles.page}>
      <Container>
        <header className={styles.header}>
          <Link href="/admin" className={styles.back}>
            ← Admin
          </Link>

          <p className={styles.eyebrow}>Newsletter</p>

          <h1>Subscribers</h1>

          <p>
            View newsletter signups, confirmation status, and unsubscribe
            history.
          </p>
        </header>

        <AdminSubscribers />
      </Container>
    </main>
  );
}
