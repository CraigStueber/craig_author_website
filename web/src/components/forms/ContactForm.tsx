"use client";

import { FormEvent, useState } from "react";

import { sendContactMessage } from "@/lib/api";

import styles from "./ContactForm.module.css";

const CONTACT_REASONS = [
  {
    value: "Book / Publishing",
    label: "Book / Publishing",
  },
  {
    value: "Media / Speaking",
    label: "Media / Speaking",
  },
  {
    value: "Professional",
    label: "Professional",
  },
  {
    value: "General",
    label: "General",
  },
];

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const [responseMessage, setResponseMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setResponseMessage("");

    try {
      const response = await sendContactMessage({
        name,
        email,
        subject,
        message,
      });

      setStatus("success");
      setResponseMessage(response.message);

      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (error) {
      setStatus("error");

      setResponseMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again.",
      );
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="contact-name">Name</label>

          <input
            id="contact-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            required
            disabled={status === "loading"}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="contact-email">Email</label>

          <input
            id="contact-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            disabled={status === "loading"}
          />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-subject">Reason for contacting</label>

        <select
          id="contact-subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          required
          disabled={status === "loading"}
        >
          <option value="" disabled>
            Choose a reason
          </option>

          {CONTACT_REASONS.map((reason) => (
            <option key={reason.value} value={reason.value}>
              {reason.label}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="contact-message">Message</label>

        <textarea
          id="contact-message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          rows={8}
          required
          disabled={status === "loading"}
        />
      </div>

      <div className={styles.footer}>
        <button
          type="submit"
          className={styles.button}
          disabled={status === "loading"}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {responseMessage && (
          <p
            className={status === "error" ? styles.error : styles.message}
            role="status"
          >
            {responseMessage}
          </p>
        )}
      </div>
    </form>
  );
}
