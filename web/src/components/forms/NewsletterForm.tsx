"use client";

import { FormEvent, useId, useState } from "react";

import { subscribeToNewsletter } from "@/lib/api";

import styles from "./NewsletterForm.module.css";

interface NewsletterFormProps {
  eyebrow?: string;
  heading?: string;
  description?: string;
  buttonLabel?: string;
  note?: string;
  variant?: "light" | "dark";
}

export default function NewsletterForm({
  eyebrow,
  heading,
  description,
  buttonLabel = "Join the Newsletter",
  note,
  variant = "light",
}: NewsletterFormProps) {
  const emailId = useId();

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
    <div
      className={`${styles.wrapper} ${
        variant === "dark" ? styles.dark : styles.light
      }`}
    >
      <div className={styles.copy}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}

        {heading && <h2 className={styles.heading}>{heading}</h2>}

        {description && <p className={styles.description}>{description}</p>}
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.fields}>
          <label htmlFor={emailId} className={styles.srOnly}>
            Email address
          </label>

          <input
            id={emailId}
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
            {status === "loading" ? "Joining..." : buttonLabel}
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

        {note && !message && <p className={styles.note}>{note}</p>}
      </form>
    </div>
  );
}
