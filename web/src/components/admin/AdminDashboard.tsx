"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { adminLogout, getAdminSession, type AdminSession } from "@/lib/api";

import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
  const router = useRouter();

  const [session, setSession] = useState<AdminSession | null>(null);

  const [status, setStatus] = useState<
    "loading" | "authenticated" | "logging-out"
  >("loading");

  useEffect(() => {
    let active = true;

    async function checkSession() {
      try {
        const currentSession = await getAdminSession();

        if (!active) {
          return;
        }

        if (!currentSession) {
          router.replace("/admin/login");
          return;
        }

        setSession(currentSession);
        setStatus("authenticated");
      } catch {
        router.replace("/admin/login");
      }
    }

    checkSession();

    return () => {
      active = false;
    };
  }, [router]);

  async function handleLogout() {
    setStatus("logging-out");

    try {
      await adminLogout();
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  if (status === "loading" || !session) {
    return (
      <div className={styles.loading}>
        <p>Checking session...</p>
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Administration</p>

          <h1>Website Admin</h1>

          <p className={styles.welcome}>
            Signed in as <strong>{session.username}</strong>
          </p>
        </div>

        <button
          type="button"
          className={styles.logout}
          onClick={handleLogout}
          disabled={status === "logging-out"}
        >
          {status === "logging-out" ? "Signing out..." : "Sign Out"}
        </button>
      </header>

      <div className={styles.grid}>
        <Link href="/admin/posts" className={styles.card}>
          <p className={styles.cardLabel}>Blog</p>

          <h2>Posts</h2>

          <p>Create, edit, publish, and manage blog posts.</p>

          <span>Manage posts →</span>
        </Link>
        <Link href="/admin/comments" className={styles.card}>
          <p className={styles.cardLabel}>Blog</p>

          <h2>Comments</h2>

          <p>Review, approve, reject, and moderate reader comments.</p>

          <span>Moderate comments →</span>
        </Link>
        <Link href="/admin/subscribers" className={styles.card}>
          <p className={styles.cardLabel}>Newsletter</p>

          <h2>Subscribers</h2>

          <p>View newsletter subscribers and subscription status.</p>

          <span>View subscribers →</span>
        </Link>

        <Link href="/admin/messages" className={styles.card}>
          <p className={styles.cardLabel}>Contact</p>

          <h2>Messages</h2>

          <p>Read messages submitted through the contact form.</p>

          <span>View messages →</span>
        </Link>
      </div>
    </div>
  );
}
