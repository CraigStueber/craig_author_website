"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import { NAV_ITEMS } from "@/lib/constants";

import styles from "./MobileNav.module.css";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  return (
    <div className={styles.mobileNav}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        aria-label={isOpen ? "Close navigation" : "Open navigation"}
      >
        <span>Menu</span>

        <span
          className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`}
          aria-hidden="true"
        >
          <span />
          <span />
        </span>
      </button>

      {isOpen && (
        <div id="mobile-navigation" className={styles.dropdown}>
          <nav className={styles.links} aria-label="Mobile navigation">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            ))}

            <Link
              href="/newsletter"
              className={styles.newsletter}
              onClick={closeMenu}
            >
              Newsletter
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
