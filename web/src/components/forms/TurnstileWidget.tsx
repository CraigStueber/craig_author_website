"use client";

import { useEffect, useRef } from "react";

interface TurnstileWidgetProps {
  action: string;
  onVerify: (token: string) => void;
  onExpire?: () => void;
  resetKey?: number;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          action?: string;
          theme?: "light" | "dark" | "auto";
          size?: "normal" | "compact" | "flexible";
          appearance?: "always" | "execute" | "interaction-only";
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "error-callback"?: (errorCode: string) => void;
        },
      ) => string;

      reset: (widgetId?: string) => void;

      remove: (widgetId: string) => void;
    };
  }
}

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const SCRIPT_URL =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

let scriptPromise: Promise<void> | null = null;

function loadTurnstile(): Promise<void> {
  if (window.turnstile) {
    return Promise.resolve();
  }

  if (scriptPromise) {
    return scriptPromise;
  }

  scriptPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_URL}"]`,
    );

    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(), { once: true });

      existingScript.addEventListener(
        "error",
        () => reject(new Error("Unable to load Turnstile.")),
        { once: true },
      );

      return;
    }

    const script = document.createElement("script");

    script.src = SCRIPT_URL;
    script.async = true;
    script.defer = true;

    script.onload = () => resolve();

    script.onerror = () => reject(new Error("Unable to load Turnstile."));

    document.head.appendChild(script);
  });

  return scriptPromise;
}

export default function TurnstileWidget({
  action,
  onVerify,
  onExpire,
  resetKey = 0,
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const widgetIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function initialize() {
      if (!SITE_KEY || !containerRef.current) {
        return;
      }

      try {
        await loadTurnstile();

        if (
          cancelled ||
          !containerRef.current ||
          !window.turnstile ||
          widgetIdRef.current
        ) {
          return;
        }

        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: SITE_KEY,
          action,
          theme: "auto",
          size: "flexible",
          appearance: "interaction-only",

          callback: (token) => {
            onVerify(token);
          },

          "expired-callback": () => {
            onVerify("");
            onExpire?.();
          },

          "error-callback": () => {
            onVerify("");
          },
        });
      } catch (error) {
        console.error("Turnstile failed to initialize.", error);

        onVerify("");
      }
    }

    initialize();

    return () => {
      cancelled = true;

      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);

        widgetIdRef.current = null;
      }
    };
  }, [action, onExpire, onVerify]);

  useEffect(() => {
    if (widgetIdRef.current && window.turnstile) {
      window.turnstile.reset(widgetIdRef.current);

      onVerify("");
    }
  }, [resetKey, onVerify]);

  if (!SITE_KEY) {
    return <p>Security verification is not configured.</p>;
  }

  return <div ref={containerRef} />;
}
