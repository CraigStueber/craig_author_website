import type { Metadata } from "next";
import Link from "next/link";

import AdminComments from "@/components/admin/AdminComments";
import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Comments",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminCommentsPage() {
  return (
    <main className={styles.page}>
      <Container>
        <header className={styles.header}>
          <Link href="/admin" className={styles.back}>
            ← Admin
          </Link>

          <p className={styles.eyebrow}>Moderation</p>

          <h1>Comments</h1>

          <p>Review and moderate comments submitted to the blog.</p>
        </header>

        <AdminComments />
      </Container>
    </main>
  );
}
