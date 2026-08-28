import type { Metadata } from "next";

import AdminDashboard from "@/components/admin/AdminDashboard";
import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <main className={styles.page}>
      <Container>
        <AdminDashboard />
      </Container>
    </main>
  );
}
