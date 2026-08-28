import type { Metadata } from "next";
import Link from "next/link";

import AdminLoginForm from "@/components/admin/AdminLoginForm";
import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLoginPage() {
  return (
    <main className={styles.page}>
      <Container>
        <div className={styles.panel}>
          <Link href="/" className={styles.back}>
            ← Craig A. Stueber
          </Link>

          <p className={styles.eyebrow}>Administration</p>

          <h1>Sign in.</h1>

          <p className={styles.intro}>Author website administration.</p>

          <AdminLoginForm />
        </div>
      </Container>
    </main>
  );
}
