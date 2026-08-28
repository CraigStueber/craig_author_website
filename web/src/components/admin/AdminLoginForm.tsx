"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { adminLogin } from "@/lib/api";

import styles from "./AdminLoginForm.module.css";

export default function AdminLoginForm() {
  const router = useRouter();

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus("loading");
    setError("");

    try {
      await adminLogin(username, password);

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setStatus("error");

      setError(error instanceof Error ? error.message : "Unable to log in.");
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label htmlFor="admin-username">Username</label>

        <input
          id="admin-username"
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          autoComplete="username"
          required
          disabled={status === "loading"}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="admin-password">Password</label>

        <input
          id="admin-password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="current-password"
          required
          disabled={status === "loading"}
        />
      </div>

      <button
        type="submit"
        className={styles.button}
        disabled={status === "loading"}
      >
        {status === "loading" ? "Signing in..." : "Sign In"}
      </button>

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
