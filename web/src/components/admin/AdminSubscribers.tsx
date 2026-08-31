"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import { getAdminSubscribers } from "@/lib/api";
import type { AdminSubscriber } from "@/types/subscriber";

import styles from "./AdminSubscribers.module.css";

type SubscriberFilter = "all" | "active" | "pending" | "unsubscribed";

export default function AdminSubscribers() {
  const router = useRouter();

  const [subscribers, setSubscribers] = useState<AdminSubscriber[]>([]);

  const [filter, setFilter] = useState<SubscriberFilter>("all");

  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadSubscribers() {
      try {
        const result = await getAdminSubscribers();

        if (!active) {
          return;
        }

        if (!result) {
          router.replace("/admin/login");
          return;
        }

        setSubscribers(result);
        setStatus("ready");
      } catch (error) {
        if (!active) {
          return;
        }

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load subscribers.",
        );

        setStatus("error");
      }
    }

    loadSubscribers();

    return () => {
      active = false;
    };
  }, [router]);

  const counts = useMemo(
    () => ({
      all: subscribers.length,

      active: subscribers.filter((subscriber) => subscriber.status === "active")
        .length,

      pending: subscribers.filter(
        (subscriber) => subscriber.status === "pending",
      ).length,

      unsubscribed: subscribers.filter(
        (subscriber) => subscriber.status === "unsubscribed",
      ).length,
    }),
    [subscribers],
  );

  const filteredSubscribers = useMemo(() => {
    if (filter === "all") {
      return subscribers;
    }

    return subscribers.filter((subscriber) => subscriber.status === filter);
  }, [filter, subscribers]);

  function formatDate(value: string | null) {
    if (!value) {
      return null;
    }

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date(value));
  }

  if (status === "loading") {
    return <p className={styles.state}>Loading subscribers...</p>;
  }

  if (status === "error") {
    return (
      <p className={styles.error} role="alert">
        {error}
      </p>
    );
  }
  function exportActiveSubscribers() {
    const activeSubscribers = subscribers.filter(
      (subscriber) => subscriber.status === "active",
    );

    if (activeSubscribers.length === 0) {
      return;
    }

    const rows = [
      ["email"],
      ...activeSubscribers.map((subscriber) => [subscriber.email]),
    ];

    const csv = rows
      .map((row) =>
        row
          .map((value) => {
            const escaped = value.replace(/"/g, '""');
            return `"${escaped}"`;
          })
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = `newsletter-subscribers-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <div>
          <p className={styles.toolbarTitle}>
            {counts.active} active{" "}
            {counts.active === 1 ? "subscriber" : "subscribers"}
          </p>

          <p className={styles.toolbarNote}>
            Export confirmed subscribers for Kit.
          </p>
        </div>

        <button
          type="button"
          className={styles.exportButton}
          onClick={exportActiveSubscribers}
          disabled={counts.active === 0}
        >
          Export Active CSV
        </button>
      </div>
      <div className={styles.filters}>
        <button
          type="button"
          className={filter === "all" ? styles.activeFilter : styles.filter}
          onClick={() => setFilter("all")}
        >
          All
          <span>{counts.all}</span>
        </button>

        <button
          type="button"
          className={filter === "active" ? styles.activeFilter : styles.filter}
          onClick={() => setFilter("active")}
        >
          Active
          <span>{counts.active}</span>
        </button>

        <button
          type="button"
          className={filter === "pending" ? styles.activeFilter : styles.filter}
          onClick={() => setFilter("pending")}
        >
          Pending
          <span>{counts.pending}</span>
        </button>

        <button
          type="button"
          className={
            filter === "unsubscribed" ? styles.activeFilter : styles.filter
          }
          onClick={() => setFilter("unsubscribed")}
        >
          Unsubscribed
          <span>{counts.unsubscribed}</span>
        </button>
      </div>

      {filteredSubscribers.length === 0 ? (
        <div className={styles.empty}>
          <p>No subscribers in this category.</p>
        </div>
      ) : (
        <div className={styles.list}>
          {filteredSubscribers.map((subscriber) => (
            <article key={subscriber.id} className={styles.subscriber}>
              <div className={styles.primary}>
                <div>
                  <p className={styles.email}>{subscriber.email}</p>

                  <p className={styles.meta}>
                    Signed up {formatDate(subscriber.created_at)}
                    {subscriber.source && <> · {subscriber.source}</>}
                  </p>
                </div>

                <span
                  className={`${styles.status} ${styles[subscriber.status]}`}
                >
                  {subscriber.status}
                </span>
              </div>

              {(subscriber.confirmed_at || subscriber.unsubscribed_at) && (
                <div className={styles.lifecycle}>
                  {subscriber.confirmed_at && (
                    <span>Confirmed {formatDate(subscriber.confirmed_at)}</span>
                  )}

                  {subscriber.unsubscribed_at && (
                    <span>
                      Unsubscribed {formatDate(subscriber.unsubscribed_at)}
                    </span>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
