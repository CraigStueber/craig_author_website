"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

import Container from "@/components/ui/Container";

import styles from "./page.module.css";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const status = searchParams.get("status");

  if (status === "success") {
    return (
      <section className={styles.card}>
        <div className={styles.successMark} aria-hidden="true">
          ✓
        </div>

        <p className={styles.eyebrow}>Newsletter</p>

        <h1>You&apos;re subscribed.</h1>

        <p className={styles.copy}>
          Your email has been confirmed and your subscription is now active.
        </p>

        <p className={styles.note}>
          You&apos;ll receive occasional updates about new essays, books, and
          other writing from Craig A. Stueber.
        </p>

        <Link href="/blog" className={styles.primaryLink}>
          Read the blog
        </Link>
      </section>
    );
  }

  if (status === "invalid") {
    return (
      <section className={styles.card}>
        <p className={styles.eyebrow}>Newsletter</p>

        <h1>Confirmation link unavailable</h1>

        <div className={styles.error} role="alert">
          This confirmation link is invalid or has already been used.
        </div>

        <p className={styles.copy}>
          If you still need to confirm your subscription, sign up again and
          we&apos;ll send you a new confirmation email.
        </p>

        <Link href="/newsletter" className={styles.secondaryLink}>
          Newsletter
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.card}>
      <p className={styles.eyebrow}>Newsletter</p>

      <h1>Confirmation unavailable</h1>

      <p className={styles.copy}>
        This page was opened without a valid confirmation result.
      </p>

      <Link href="/" className={styles.secondaryLink}>
        Return home
      </Link>
    </section>
  );
}

export default function NewsletterConfirmPage() {
  return (
    <main className={styles.page}>
      <Container>
        <Suspense
          fallback={
            <section className={styles.card}>
              <p className={styles.copy}>Loading confirmation...</p>
            </section>
          }
        >
          <ConfirmationContent />
        </Suspense>
      </Container>
    </main>
  );
}
