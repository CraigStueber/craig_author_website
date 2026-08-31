"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { deleteAdminMessage, getAdminMessages } from "@/lib/api";

import type { AdminMessage } from "@/types/adminMessage";

import styles from "./AdminMessages.module.css";

export default function AdminMessages() {
  const router = useRouter();

  const [messages, setMessages] = useState<AdminMessage[]>([]);

  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    async function loadMessages() {
      try {
        const result = await getAdminMessages();

        if (!active) {
          return;
        }

        if (!result) {
          router.replace("/admin/login");
          return;
        }

        setMessages(result);
        setStatus("ready");
      } catch (error) {
        if (!active) {
          return;
        }

        setError(
          error instanceof Error ? error.message : "Unable to load messages.",
        );

        setStatus("error");
      }
    }

    loadMessages();

    return () => {
      active = false;
    };
  }, [router]);

  function formatDate(value: string) {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(new Date(value));
  }

  async function handleDelete(messageId: string) {
    const confirmed = window.confirm("Delete this message permanently?");

    if (!confirmed) {
      return;
    }

    setDeletingId(messageId);
    setError("");

    try {
      const result = await deleteAdminMessage(messageId);

      if (result === null) {
        router.replace("/admin/login");
        return;
      }

      setMessages((current) =>
        current.filter((message) => message.id !== messageId),
      );
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Unable to delete message.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  if (status === "loading") {
    return <p className={styles.state}>Loading messages...</p>;
  }

  if (status === "error") {
    return (
      <p className={styles.error} role="alert">
        {error}
      </p>
    );
  }

  if (messages.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No contact messages yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}

      <div className={styles.list}>
        {messages.map((message) => (
          <article key={message.id} className={styles.message}>
            <div className={styles.header}>
              <div>
                <h2>{message.name}</h2>

                <a href={`mailto:${message.email}`} className={styles.email}>
                  {message.email}
                </a>
              </div>

              <time dateTime={message.created_at} className={styles.date}>
                {formatDate(message.created_at)}
              </time>
            </div>

            <div className={styles.subject}>
              <span>Reason</span>
              <strong>{message.subject}</strong>
            </div>

            <div className={styles.body}>{message.message}</div>

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.deleteButton}
                disabled={deletingId === message.id}
                onClick={() => handleDelete(message.id)}
              >
                {deletingId === message.id ? "Deleting..." : "Delete"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
