import type { Metadata } from "next";
import Link from "next/link";

import AdminPostsList from "@/components/admin/AdminPostsList";
import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Manage Posts",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPostsPage() {
  return (
    <main className={styles.page}>
      <Container>
        <header className={styles.header}>
          <div>
            <Link href="/admin" className={styles.back}>
              ← Admin
            </Link>

            <p className={styles.eyebrow}>Blog</p>

            <h1>Posts</h1>

            <p className={styles.intro}>
              Create, edit, and manage writing published on the site.
            </p>
          </div>

          <Link href="/admin/posts/new" className={styles.newPost}>
            New Post
          </Link>
        </header>

        <AdminPostsList />
      </Container>
    </main>
  );
}
