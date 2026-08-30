"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  createAdminCommentReply,
  getAdminComments,
  updateAdminCommentStatus,
} from "@/lib/api";

import type { AdminComment, CommentStatus } from "@/types/adminComment";

import styles from "./AdminComments.module.css";

type Filter = "all" | CommentStatus;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export default function AdminComments() {
  const router = useRouter();

  const [comments, setComments] = useState<AdminComment[]>([]);

  const [filter, setFilter] = useState<Filter>("pending");

  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const [error, setError] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  const [replyBody, setReplyBody] = useState("");

  const [postingReply, setPostingReply] = useState(false);
  useEffect(() => {
    let active = true;

    async function loadComments() {
      try {
        const result = await getAdminComments();

        if (!active) {
          return;
        }

        if (!result) {
          router.replace("/admin/login");
          return;
        }

        setComments(result);
        setStatus("ready");
      } catch {
        if (!active) {
          return;
        }

        setError("Unable to load comments.");

        setStatus("error");
      }
    }

    loadComments();

    return () => {
      active = false;
    };
  }, [router]);

  const readerComments = useMemo(
    () =>
      comments.filter(
        (comment) => comment.parent_id === null && !comment.is_author,
      ),
    [comments],
  );

  const counts = useMemo(() => {
    return {
      all: readerComments.length,

      pending: readerComments.filter((comment) => comment.status === "pending")
        .length,

      approved: readerComments.filter(
        (comment) => comment.status === "approved",
      ).length,

      rejected: readerComments.filter(
        (comment) => comment.status === "rejected",
      ).length,

      spam: readerComments.filter((comment) => comment.status === "spam")
        .length,
    };
  }, [readerComments]);

  const visibleComments =
    filter === "all"
      ? readerComments
      : readerComments.filter((comment) => comment.status === filter);
  function repliesFor(commentId: string) {
    return comments.filter(
      (comment) => comment.parent_id === commentId && comment.is_author,
    );
  }

  async function submitReply(commentId: string) {
    if (!replyBody.trim()) {
      return;
    }

    setPostingReply(true);
    setError("");

    try {
      const reply = await createAdminCommentReply(commentId, replyBody);

      if (!reply) {
        router.replace("/admin/login");

        return;
      }

      setComments((current) => [...current, reply]);

      setReplyBody("");
      setReplyingTo(null);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to post reply.",
      );
    } finally {
      setPostingReply(false);
    }
  }

  async function changeStatus(commentId: string, newStatus: CommentStatus) {
    setUpdatingId(commentId);
    setError("");

    try {
      const updated = await updateAdminCommentStatus(commentId, newStatus);

      if (!updated) {
        router.replace("/admin/login");
        return;
      }

      setComments((current) =>
        current.map((comment) =>
          comment.id === updated.id ? updated : comment,
        ),
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to update comment.",
      );
    } finally {
      setUpdatingId(null);
    }
  }

  if (status === "loading") {
    return <p className={styles.state}>Loading comments...</p>;
  }

  if (status === "error") {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div>
      <div className={styles.filters}>
        {(["pending", "approved", "rejected", "spam", "all"] as Filter[]).map(
          (value) => (
            <button
              key={value}
              type="button"
              className={filter === value ? styles.activeFilter : styles.filter}
              onClick={() => setFilter(value)}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}

              <span>{counts[value]}</span>
            </button>
          ),
        )}
      </div>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      {visibleComments.length === 0 ? (
        <div className={styles.empty}>
          <h2>No {filter === "all" ? "" : filter} comments.</h2>

          {filter === "pending" && <p>You&apos;re all caught up.</p>}
        </div>
      ) : (
        <div className={styles.list}>
          {visibleComments.map((comment) => (
            <article key={comment.id} className={styles.comment}>
              <header className={styles.commentHeader}>
                <div>
                  <div className={styles.authorLine}>
                    <h2>{comment.name}</h2>

                    <span className={styles[comment.status]}>
                      {comment.status}
                    </span>
                  </div>

                  {comment.email && (
                    <a
                      href={`mailto:${comment.email}`}
                      className={styles.email}
                    >
                      {comment.email}
                    </a>
                  )}
                </div>

                <time dateTime={comment.created_at}>
                  {formatDate(comment.created_at)}
                </time>
              </header>

              <div className={styles.post}>
                On{" "}
                <Link href={`/blog/${comment.post_slug}`} target="_blank">
                  {comment.post_title}
                </Link>
              </div>

              <p className={styles.body}>{comment.body}</p>

              {comment.moderation_flags.length > 0 && (
                <div className={styles.flags}>
                  {comment.moderation_flags.map((flag) => (
                    <span key={flag}>{flag}</span>
                  ))}
                </div>
              )}

              <footer className={styles.actions}>
                {comment.status !== "approved" && (
                  <button
                    type="button"
                    className={styles.approve}
                    disabled={updatingId === comment.id}
                    onClick={() => changeStatus(comment.id, "approved")}
                  >
                    Approve
                  </button>
                )}

                {comment.status !== "rejected" && (
                  <button
                    type="button"
                    className={styles.secondary}
                    disabled={updatingId === comment.id}
                    onClick={() => changeStatus(comment.id, "rejected")}
                  >
                    Reject
                  </button>
                )}

                {comment.status !== "spam" && (
                  <button
                    type="button"
                    className={styles.spam}
                    disabled={updatingId === comment.id}
                    onClick={() => changeStatus(comment.id, "spam")}
                  >
                    Spam
                  </button>
                )}

                {comment.status !== "pending" && (
                  <button
                    type="button"
                    className={styles.secondary}
                    disabled={updatingId === comment.id}
                    onClick={() => changeStatus(comment.id, "pending")}
                  >
                    Return to Pending
                  </button>
                )}
                {comment.status === "approved" && (
                  <button
                    type="button"
                    className={styles.reply}
                    disabled={updatingId === comment.id || postingReply}
                    onClick={() => {
                      if (replyingTo === comment.id) {
                        setReplyingTo(null);
                        setReplyBody("");
                      } else {
                        setReplyingTo(comment.id);
                        setReplyBody("");
                      }
                    }}
                  >
                    {replyingTo === comment.id ? "Cancel Reply" : "Reply"}
                  </button>
                )}
              </footer>
              {replyingTo === comment.id && (
                <div className={styles.replyEditor}>
                  <label htmlFor={`reply-${comment.id}`}>
                    Reply as Craig A. Stueber
                  </label>

                  <textarea
                    id={`reply-${comment.id}`}
                    value={replyBody}
                    onChange={(event) => setReplyBody(event.target.value)}
                    rows={5}
                    maxLength={5000}
                    autoFocus
                    placeholder="Write your reply..."
                    disabled={postingReply}
                  />

                  <div className={styles.replyEditorFooter}>
                    <span>
                      {replyBody.length.toLocaleString()}
                      /5,000
                    </span>

                    <button
                      type="button"
                      onClick={() => submitReply(comment.id)}
                      disabled={postingReply || !replyBody.trim()}
                    >
                      {postingReply ? "Posting..." : "Post Reply"}
                    </button>
                  </div>
                </div>
              )}
              {repliesFor(comment.id).length > 0 && (
                <div className={styles.authorReplies}>
                  {repliesFor(comment.id).map((reply) => (
                    <div key={reply.id} className={styles.authorReply}>
                      <div className={styles.authorReplyHeader}>
                        <div>
                          <strong>Craig A. Stueber</strong>

                          <span>Author</span>
                        </div>

                        <time dateTime={reply.created_at}>
                          {formatDate(reply.created_at)}
                        </time>
                      </div>

                      <p>{reply.body}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
