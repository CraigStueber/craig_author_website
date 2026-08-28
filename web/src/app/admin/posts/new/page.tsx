import type { Metadata } from "next";
import Link from "next/link";

import PostEditor from "@/components/admin/PostEditor";
import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "New Post",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NewPostPage() {
  return (
    <main className={styles.page}>
      <Container>
        <header className={styles.header}>
          <Link href="/admin/posts" className={styles.back}>
            ← Posts
          </Link>

          <p className={styles.eyebrow}>Blog</p>

          <h1>New Post</h1>

          <p>Write, preview, and publish a new essay.</p>
        </header>
        S
        <PostEditor />
      </Container>
    </main>
  );
}
