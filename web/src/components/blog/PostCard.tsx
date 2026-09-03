import Link from "next/link";

import type { PostSummary } from "@/types/blog";

import styles from "./PostCard.module.css";

interface PostCardProps {
  post: PostSummary;
}

function formatDate(value: string | null) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className={styles.card}>
      <Link
        href={`/blog/${post.slug}`}
        className={styles.imageLink}
        aria-label={`Read ${post.title}`}
      >
        {post.hero_image_url ? (
          <img
            src={post.hero_image_url}
            alt={post.hero_image_alt ?? ""}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className={styles.imagePlaceholder}>
            <span>Craig A. Stueber</span>
          </div>
        )}
      </Link>

      <div className={styles.content}>
        <div className={styles.meta}>
          {post.published_at && (
            <time dateTime={post.published_at}>
              {formatDate(post.published_at)}
            </time>
          )}

          {post.tags.length > 0 && (
            <span className={styles.separator} aria-hidden="true">
              ·
            </span>
          )}

          {post.tags.length > 0 && (
            <div className={styles.tags}>
              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
        </div>

        <h2>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h2>

        {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}

        <Link href={`/blog/${post.slug}`} className={styles.readMore}>
          Read the essay
          <span aria-hidden="true"> →</span>
        </Link>
      </div>
    </article>
  );
}
