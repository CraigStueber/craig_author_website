"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { createAdminPost, uploadBlogImage } from "@/lib/api";

import styles from "./PostEditor.module.css";

function makeSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function PostEditor() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);

  const [excerpt, setExcerpt] = useState("");

  const [content, setContent] = useState("");

  const [tags, setTags] = useState("");

  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);

  const [heroImageAlt, setHeroImageAlt] = useState("");

  const [seoTitle, setSeoTitle] = useState("");

  const [seoDescription, setSeoDescription] = useState("");

  const [originalMediumUrl, setOriginalMediumUrl] = useState("");

  const [originalPublishedAt, setOriginalPublishedAt] = useState("");

  const [view, setView] = useState<"write" | "preview">("write");

  const [status, setStatus] = useState<"idle" | "uploading" | "saving">("idle");

  const [error, setError] = useState("");

  function handleTitleChange(value: string) {
    setTitle(value);

    if (!slugTouched) {
      setSlug(makeSlug(value));
    }
  }

  function handleSlugChange(value: string) {
    setSlugTouched(true);
    setSlug(makeSlug(value));
  }

  async function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setError("");
    setStatus("uploading");

    try {
      const url = await uploadBlogImage(file);

      setHeroImageUrl(url);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to upload image.",
      );
    } finally {
      setStatus("idle");
    }
  }

  async function savePost(postStatus: "draft" | "published") {
    setError("");
    setStatus("saving");

    try {
      const result = await createAdminPost({
        title,
        slug,
        excerpt: excerpt || null,
        content,

        status: postStatus,

        hero_image_url: heroImageUrl,

        hero_image_alt: heroImageAlt || null,

        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),

        seo_title: seoTitle || null,

        seo_description: seoDescription || null,

        original_medium_url: originalMediumUrl || null,

        original_published_at: originalPublishedAt
          ? new Date(originalPublishedAt).toISOString()
          : null,
      });

      if (!result) {
        router.replace("/admin/login");
        return;
      }

      router.push("/admin/posts");

      router.refresh();
    } catch (error) {
      setError(error instanceof Error ? error.message : "Unable to save post.");
    } finally {
      setStatus("idle");
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    savePost("draft");
  }

  const busy = status === "uploading" || status === "saving";

  return (
    <form className={styles.editor} onSubmit={handleSubmit}>
      {error && (
        <div className={styles.error} role="alert">
          {error}
        </div>
      )}

      <section className={styles.section}>
        <div className={styles.field}>
          <label htmlFor="post-title">Title</label>

          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(event) => handleTitleChange(event.target.value)}
            placeholder="Essay title"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="post-slug">Slug</label>

          <div className={styles.slugField}>
            <span>/blog/</span>

            <input
              id="post-slug"
              type="text"
              value={slug}
              onChange={(event) => handleSlugChange(event.target.value)}
              placeholder="essay-title"
            />
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="post-excerpt">Excerpt</label>

          <textarea
            id="post-excerpt"
            value={excerpt}
            onChange={(event) => setExcerpt(event.target.value)}
            rows={4}
            placeholder="A short description used on the blog and homepage."
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Hero Image</p>

            <h2>Article image</h2>
          </div>
        </div>

        <div className={styles.imageGrid}>
          <div className={styles.imagePreview}>
            {heroImageUrl ? (
              <img src={heroImageUrl} alt={heroImageAlt || ""} />
            ) : (
              <span>No image selected</span>
            )}
          </div>

          <div>
            <div className={styles.field}>
              <label htmlFor="hero-image">Upload Image</label>

              <input
                id="hero-image"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleImageChange}
                disabled={busy}
              />

              {status === "uploading" && (
                <p className={styles.help}>Uploading image...</p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="hero-alt">Image Alt Text</label>

              <input
                id="hero-alt"
                type="text"
                value={heroImageAlt}
                onChange={(event) => setHeroImageAlt(event.target.value)}
                placeholder="Describe the image for readers who cannot see it."
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.editorHeader}>
          <div>
            <p className={styles.eyebrow}>Article</p>

            <h2>Content</h2>
          </div>

          <div className={styles.tabs}>
            <button
              type="button"
              className={view === "write" ? styles.activeTab : styles.tab}
              onClick={() => setView("write")}
            >
              Write
            </button>

            <button
              type="button"
              className={view === "preview" ? styles.activeTab : styles.tab}
              onClick={() => setView("preview")}
            >
              Preview
            </button>
          </div>
        </div>

        {view === "write" ? (
          <textarea
            className={styles.markdown}
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder={`## Start writing

Write the article in Markdown...`}
          />
        ) : (
          <div className={styles.markdownPreview}>
            {content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            ) : (
              <p className={styles.previewEmpty}>Nothing to preview yet.</p>
            )}
          </div>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.field}>
          <label htmlFor="post-tags">Tags</label>

          <input
            id="post-tags"
            type="text"
            value={tags}
            onChange={(event) => setTags(event.target.value)}
            placeholder="Artificial Intelligence, Human Agency"
          />

          <p className={styles.help}>Separate tags with commas.</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Search & Sharing</p>

            <h2>SEO</h2>
          </div>
        </div>

        <div className={styles.field}>
          <label htmlFor="seo-title">SEO Title</label>

          <input
            id="seo-title"
            type="text"
            value={seoTitle}
            onChange={(event) => setSeoTitle(event.target.value)}
            placeholder="Optional. Defaults to the article title."
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="seo-description">SEO Description</label>

          <textarea
            id="seo-description"
            value={seoDescription}
            onChange={(event) => setSeoDescription(event.target.value)}
            rows={3}
            placeholder="Optional. Defaults to the excerpt."
          />
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>Migration</p>

            <h2>Original publication</h2>
          </div>
        </div>

        <div className={styles.twoColumns}>
          <div className={styles.field}>
            <label htmlFor="medium-url">Original Medium URL</label>

            <input
              id="medium-url"
              type="url"
              value={originalMediumUrl}
              onChange={(event) => setOriginalMediumUrl(event.target.value)}
              placeholder="https://medium.com/..."
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="original-date">Original Published Date</label>

            <input
              id="original-date"
              type="date"
              value={originalPublishedAt}
              onChange={(event) => setOriginalPublishedAt(event.target.value)}
            />
          </div>
        </div>
      </section>

      <footer className={styles.actions}>
        <button
          type="submit"
          className={styles.secondaryButton}
          disabled={busy}
        >
          {status === "saving" ? "Saving..." : "Save Draft"}
        </button>

        <button
          type="button"
          className={styles.publishButton}
          disabled={busy}
          onClick={() => savePost("published")}
        >
          {status === "saving" ? "Saving..." : "Publish"}
        </button>
      </footer>
    </form>
  );
}
