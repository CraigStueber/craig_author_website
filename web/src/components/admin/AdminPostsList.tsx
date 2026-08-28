"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { getAdminPosts } from "@/lib/api";

import type { AdminPostSummary } from "@/types/blog";

import styles from "./AdminPostsList.module.css";

function formatDate(value: string | null) {
  if (!value) {
    return "Not published";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default function AdminPostsList() {
  const router = useRouter();

  const [posts, setPosts] = useState<AdminPostSummary[]>([]);

  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPosts() {
      try {
        const result = await getAdminPosts();

        if (!active) {
          return;
        }

        if (!result) {
          router.replace("/admin/login");
          return;
        }

        setPosts(result);
        setStatus("ready");
      } catch (error) {
        if (!active) {
          return;
        }

        setError(
          error instanceof Error ? error.message : "Unable to load posts.",
        );

        setStatus("error");
      }
    }

    loadPosts();

    return () => {
      active = false;
    };
  }, [router]);

  if (status === "loading") {
    return <div className={styles.state}>Loading posts...</div>;
  }

  if (status === "error") {
    return <div className={styles.error}>{error}</div>;
  }

  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>No posts yet.</h2>

        <p>
          Create your first essay and save it as a draft until you&apos;re ready
          to publish.
        </p>

        <Link href="/admin/posts/new" className={styles.primaryAction}>
          Create First Post
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.list}>
      {posts.map((post) => (
        <article key={post.id} className={styles.post}>
          <div className={styles.image}>
            {post.hero_image_url ? (
              <img src={post.hero_image_url} alt={post.hero_image_alt ?? ""} />
            ) : (
              <div className={styles.imagePlaceholder}>No image</div>
            )}
          </div>

          <div className={styles.content}>
            <div className={styles.topline}>
              <span
                className={
                  post.status === "published" ? styles.published : styles.draft
                }
              >
                {post.status}
              </span>

              <span className={styles.updated}>
                Updated {formatDate(post.updated_at)}
              </span>
            </div>

            <h2>{post.title}</h2>

            <p className={styles.slug}>/blog/{post.slug}</p>

            {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}

            <div className={styles.bottom}>
              <div className={styles.metadata}>
                <span>Published: {formatDate(post.published_at)}</span>

                {post.tags.length > 0 && <span>{post.tags.join(" · ")}</span>}
              </div>

              <div className={styles.actions}>
                {post.status === "published" && (
                  <Link
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    className={styles.secondaryAction}
                  >
                    View
                  </Link>
                )}

                <Link
                  href={`/admin/posts/${post.id}`}
                  className={styles.editAction}
                >
                  Edit
                  <span aria-hidden="true"> →</span>
                </Link>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
