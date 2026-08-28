"use client";

import { FormEvent, useState } from "react";

import { subscribeToNewsletter } from "@/lib/api";

import styles from "./NewsletterForm.module.css";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!email.trim()) {
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await subscribeToNewsletter(email);

      setStatus("success");
      setMessage(response.message);
      setEmail("");
    } catch (error) {
      setStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to subscribe. Please try again.",
      );
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.fields}>
        <label htmlFor="newsletter-email" className={styles.srOnly}>
          Email address
        </label>

        <input
          id="newsletter-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          autoComplete="email"
          required
          disabled={status === "loading"}
          className={styles.input}
        />

        <button
          type="submit"
          disabled={status === "loading"}
          className={styles.button}
        >
          {status === "loading" ? "Joining..." : "Join the Newsletter"}
        </button>
      </div>

      {message && (
        <p
          className={status === "error" ? styles.error : styles.message}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
