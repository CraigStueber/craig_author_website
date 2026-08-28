import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import Container from "@/components/ui/Container";
import { getPublishedPost, getPublishedPosts } from "@/lib/api";

import styles from "./page.module.css";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
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

/*
 * Cloudflare static export needs to know every dynamic
 * blog route when the site builds.
 *
 * When we publish a post later, the CMS will trigger
 * a new Cloudflare build, and that build will generate
 * the new article page.
 */
export async function generateStaticParams() {
  const posts = await getPublishedPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPublishedPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const title = post.seo_title || post.title;

  const description = post.seo_description || post.excerpt || undefined;

  return {
    title,
    description,

    openGraph: {
      title,
      description,
      type: "article",

      publishedTime: post.published_at ?? undefined,

      modifiedTime: post.updated_at ?? undefined,

      images: post.hero_image_url
        ? [
            {
              url: post.hero_image_url,
              alt: post.hero_image_alt ?? post.title,
            },
          ]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  const post = await getPublishedPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <main>
      <article>
        <header className={styles.hero}>
          <Container>
            <div className={styles.heroInner}>
              <Link href="/blog" className={styles.backLink}>
                ← All Writing
              </Link>

              {post.tags.length > 0 && (
                <div className={styles.tags}>
                  {post.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}

              <h1>{post.title}</h1>

              {post.excerpt && <p className={styles.excerpt}>{post.excerpt}</p>}

              <div className={styles.meta}>
                <span>Craig A. Stueber</span>

                {post.published_at && (
                  <>
                    <span className={styles.dot} aria-hidden="true">
                      ·
                    </span>

                    <time dateTime={post.published_at}>
                      {formatDate(post.published_at)}
                    </time>
                  </>
                )}
              </div>
            </div>
          </Container>
        </header>

        {post.hero_image_url && (
          <section className={styles.heroImageSection}>
            <Container>
              <figure className={styles.heroFigure}>
                <img
                  src={post.hero_image_url}
                  alt={post.hero_image_alt ?? post.title}
                  className={styles.heroImage}
                />
              </figure>
            </Container>
          </section>
        )}

        <section className={styles.article}>
          <Container>
            <div className={styles.articleGrid}>
              <div className={styles.articleBody}>
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {post.content}
                </ReactMarkdown>

                {post.original_medium_url && (
                  <div className={styles.originalNote}>
                    <p>This essay was originally published on Medium.</p>

                    <a
                      href={post.original_medium_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View the original publication
                      <span aria-hidden="true"> →</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </Container>
        </section>

        <footer className={styles.articleFooter}>
          <Container>
            <div className={styles.footerInner}>
              <p className={styles.footerEyebrow}>More Writing</p>

              <h2>Continue the conversation.</h2>

              <p>
                Read more essays on artificial intelligence, technology, and
                human agency.
              </p>

              <Link href="/blog" className={styles.blogLink}>
                Back to the blog
                <span aria-hidden="true"> →</span>
              </Link>
            </div>
          </Container>
        </footer>
      </article>
    </main>
  );
}
