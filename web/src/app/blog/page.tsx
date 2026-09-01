import type { Metadata } from "next";

import FeaturedPost from "@/components/blog/FeaturedPost";
import LoadMorePosts from "@/components/blog/LoadMorePosts";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import Container from "@/components/ui/Container";

import { getPublishedPosts } from "@/lib/api";

import styles from "./page.module.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Essays by Craig A. Stueber on artificial intelligence, technology, human agency, automation, and the systems shaping everyday life.",
};

export default async function BlogPage() {
  const PAGE_SIZE = 3;

  const result = await getPublishedPosts({
    limit: PAGE_SIZE + 1,
    offset: 0,
  });

  const initialPosts = result.slice(0, PAGE_SIZE);

  const hasMore = result.length > PAGE_SIZE;

  const featuredPost = initialPosts[0];

  const remainingPosts = initialPosts.slice(1);

  return (
    <main>
      <section className={styles.hero}>
        <Container>
          <p className={styles.eyebrow}>Writing</p>

          <h1 className={styles.heading}>
            Essays on technology and the people living with it.
          </h1>

          <p className={styles.introduction}>
            Writing about artificial intelligence, automation, human agency,
            judgment, and what happens when increasingly capable systems move
            from helping us act to acting around us.
          </p>
        </Container>
      </section>

      {featuredPost ? (
        <section className={styles.featured}>
          <Container>
            <div className={styles.sectionHeader}>
              <p className={styles.eyebrow}>Latest Essay</p>
            </div>

            <FeaturedPost post={featuredPost} />
          </Container>
        </section>
      ) : (
        <section className={styles.empty}>
          <Container>
            <p className={styles.eyebrow}>Latest Writing</p>

            <h2>Writing is on the way.</h2>

            <p>
              I&apos;m currently moving existing essays here and preparing new
              writing for the site.
            </p>
          </Container>
        </section>
      )}

      {remainingPosts.length > 0 && (
        <section className={styles.posts}>
          <Container>
            <div className={styles.postsHeader}>
              <p className={styles.eyebrow}>All Writing</p>

              <p>
                Essays on artificial intelligence, technology, automation,
                judgment, and human agency.
              </p>
            </div>

            <LoadMorePosts
              initialPosts={remainingPosts}
              initialHasMore={hasMore}
              initialOffset={initialPosts.length}
            />
          </Container>
        </section>
      )}

      <NewsletterSignup />
    </main>
  );
}
