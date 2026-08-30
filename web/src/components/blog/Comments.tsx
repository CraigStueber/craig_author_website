"use client";

import { FormEvent, useEffect, useState } from "react";

import { getComments, submitComment } from "@/lib/api";

import type { PublicComment } from "@/types/comment";

import styles from "./Comments.module.css";

interface CommentsProps {
  slug: string;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function Comments({ slug }: CommentsProps) {
  const [comments, setComments] = useState<PublicComment[]>([]);

  const [commentsStatus, setCommentsStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [body, setBody] = useState("");

  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function loadComments() {
      try {
        const result = await getComments(slug);

        if (!active) {
          return;
        }

        setComments(result);
        setCommentsStatus("ready");
      } catch {
        if (!active) {
          return;
        }

        setCommentsStatus("error");
      }
    }

    loadComments();

    return () => {
      active = false;
    };
  }, [slug]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSubmitStatus("submitting");
    setMessage("");

    try {
      const response = await submitComment(slug, {
        name,
        email,
        body,
      });

      setSubmitStatus("success");
      setMessage(response.message);

      setName("");
      setEmail("");
      setBody("");
    } catch (error) {
      setSubmitStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to submit your comment.",
      );
    }
  }

  const topLevelComments = comments.filter(
    (comment) => comment.parent_id === null,
  );

  function repliesFor(commentId: string) {
    return comments.filter((comment) => comment.parent_id === commentId);
  }

  return (
    <section className={styles.comments} aria-labelledby="comments-heading">
      <div className={styles.inner}>
        <div className={styles.heading}>
          <p className={styles.eyebrow}>The Conversation</p>

          <h2 id="comments-heading">
            {commentsStatus === "ready"
              ? `${topLevelComments.length} ${
                  topLevelComments.length === 1 ? "Comment" : "Comments"
                }`
              : "Comments"}
          </h2>
        </div>

        {commentsStatus === "loading" && (
          <p className={styles.loading}>Loading comments...</p>
        )}

        {commentsStatus === "error" && (
          <p className={styles.loading}>
            Comments could not be loaded right now.
          </p>
        )}

        {commentsStatus === "ready" && topLevelComments.length === 0 && (
          <div className={styles.noComments}>
            <p>No comments yet. Be the first to join the conversation.</p>
          </div>
        )}

        {topLevelComments.length > 0 && (
          <div className={styles.commentList}>
            {topLevelComments.map((comment) => {
              const replies = repliesFor(comment.id);

              return (
                <article key={comment.id} className={styles.commentThread}>
                  <CommentItem comment={comment} />

                  {replies.length > 0 && (
                    <div className={styles.replies}>
                      {replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} />
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}

        <div className={styles.formSection}>
          <div className={styles.formHeading}>
            <p className={styles.eyebrow}>Join the Conversation</p>

            <h2>Leave a comment.</h2>

            <p>
              I read every comment. Comments are reviewed before appearing
              publicly.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
              <div className={styles.field}>
                <label htmlFor="comment-name">Name</label>

                <input
                  id="comment-name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                  maxLength={120}
                  required
                  disabled={submitStatus === "submitting"}
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="comment-email">Email</label>

                <input
                  id="comment-email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  required
                  disabled={submitStatus === "submitting"}
                />

                <p className={styles.help}>
                  Your email will never be displayed publicly.
                </p>
              </div>
            </div>

            <div className={styles.field}>
              <label htmlFor="comment-body">Comment</label>

              <textarea
                id="comment-body"
                value={body}
                onChange={(event) => setBody(event.target.value)}
                rows={7}
                maxLength={5000}
                required
                disabled={submitStatus === "submitting"}
              />

              <p className={styles.characterCount}>
                {body.length.toLocaleString()}
                /5,000
              </p>
            </div>

            <div className={styles.actions}>
              <button type="submit" disabled={submitStatus === "submitting"}>
                {submitStatus === "submitting" ? "Posting..." : "Post Comment"}
              </button>

              {message && (
                <p
                  className={
                    submitStatus === "error" ? styles.error : styles.success
                  }
                  role="status"
                >
                  {message}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

interface CommentItemProps {
  comment: PublicComment;
}

function CommentItem({ comment }: CommentItemProps) {
  return (
    <div className={comment.is_author ? styles.authorComment : styles.comment}>
      <header className={styles.commentHeader}>
        <div>
          <span className={styles.commentName}>
            {comment.is_author ? "Craig A. Stueber" : comment.name}
          </span>

          {comment.is_author && (
            <span className={styles.authorBadge}>Author</span>
          )}
        </div>

        <time dateTime={comment.created_at}>
          {formatDate(comment.created_at)}
        </time>
      </header>

      <p className={styles.commentBody}>{comment.body}</p>
    </div>
  );
}
