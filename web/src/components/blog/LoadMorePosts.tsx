"use client";

import { useState } from "react";

import PostList from "@/components/blog/PostList";
import { getPublishedPosts } from "@/lib/api";

import type { PostSummary } from "@/types/blog";

import styles from "./LoadMorePosts.module.css";

const PAGE_SIZE = 3;

interface LoadMorePostsProps {
  initialPosts: PostSummary[];
  initialHasMore: boolean;
  initialOffset: number;
}

export default function LoadMorePosts({
  initialPosts,
  initialHasMore,
  initialOffset,
}: LoadMorePostsProps) {
  const [posts, setPosts] = useState(initialPosts);

  const [offset, setOffset] = useState(initialOffset);

  const [hasMore, setHasMore] = useState(initialHasMore);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleLoadMore() {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await getPublishedPosts({
        limit: PAGE_SIZE + 1,
        offset,
      });

      const nextPosts = result.slice(0, PAGE_SIZE);

      setPosts((current) => [...current, ...nextPosts]);

      setOffset((current) => current + nextPosts.length);

      setHasMore(result.length > PAGE_SIZE);
    } catch {
      setError("Unable to load more writing. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <PostList posts={posts} />

      {hasMore && (
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.button}
            onClick={handleLoadMore}
            disabled={loading}
          >
            {loading ? "Loading..." : "Load More Writing"}
          </button>
        </div>
      )}

      {error && (
        <p className={styles.error} role="status">
          {error}
        </p>
      )}
    </>
  );
}
