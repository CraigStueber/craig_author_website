"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import PostEditor from "@/components/admin/PostEditor";
import Container from "@/components/ui/Container";
import { getAdminPost } from "@/lib/api";

import type { AdminPostDetail } from "@/types/blog";

import styles from "./page.module.css";

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [post, setPost] = useState<AdminPostDetail | null>(null);

  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPost() {
      try {
        const result = await getAdminPost(params.id);

        if (!active) {
          return;
        }

        if (!result) {
          router.replace("/admin/login");
          return;
        }

        setPost(result);
        setStatus("ready");
      } catch (error) {
        if (!active) {
          return;
        }

        setError(
          error instanceof Error ? error.message : "Unable to load post.",
        );

        setStatus("error");
      }
    }

    loadPost();

    return () => {
      active = false;
    };
  }, [params.id, router]);

  if (status === "loading") {
    return (
      <main className={styles.page}>
        <Container>
          <p className={styles.state}>Loading post...</p>
        </Container>
      </main>
    );
  }

  if (status === "error" || !post) {
    return (
      <main className={styles.page}>
        <Container>
          <Link href="/admin/posts" className={styles.back}>
            ← Posts
          </Link>

          <p className={styles.error}>{error || "Post not found."}</p>
        </Container>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <Container>
        <header className={styles.header}>
          <Link href="/admin/posts" className={styles.back}>
            ← Posts
          </Link>

          <p className={styles.eyebrow}>Blog</p>

          <h1>Edit Post</h1>

          <p>Update the article, metadata, image, or publication status.</p>
        </header>

        <PostEditor post={post} />
      </Container>
    </main>
  );
}
