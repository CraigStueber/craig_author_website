import Link from "next/link";

import type { PostSummary } from "@/types/blog";

import styles from "./FeaturedPost.module.css";

interface FeaturedPostProps {
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

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <article className={styles.featuredPost}>
      <Link
        href={`/blog/${post.slug}`}
        className={styles.imageLink}
        aria-label={`Read ${post.title}`}
      >
        {post.hero_image_url ? (
          <img
            src={post.hero_image_url}
            alt={post.hero_image_alt ?? post.title}
            className={styles.image}
            loading="eager"
            fetchPriority="high"
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
            <>
              <span className={styles.separator} aria-hidden="true">
                ·
              </span>

              <div className={styles.tags}>
                {post.tags.slice(0, 3).map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </>
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
