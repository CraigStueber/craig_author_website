import PostCard from "@/components/blog/PostCard";

import type { PostSummary } from "@/types/blog";

import styles from "./PostList.module.css";

interface PostListProps {
  posts: PostSummary[];
}

export default function PostList({ posts }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className={styles.empty}>
        <p className={styles.emptyLabel}>Writing is on the way.</p>

        <p>
          I&apos;m currently moving my existing essays here and preparing new
          writing for the site.
        </p>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
