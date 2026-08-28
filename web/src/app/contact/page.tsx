import type { Metadata } from "next";

import ContactForm from "@/components/forms/ContactForm";
import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Craig A. Stueber about books, publishing, media, speaking, professional work, or general inquiries.",
};

export default function ContactPage() {
  return (
    <main>
      <section className={styles.hero}>
        <Container>
          <p className={styles.eyebrow}>Contact</p>

          <h1 className={styles.heading}>Let&apos;s talk.</h1>

          <p className={styles.introduction}>
            Whether you&apos;re reaching out about the books, publishing, media,
            speaking, professional work, or simply something I&apos;ve written,
            I&apos;d be glad to hear from you.
          </p>
        </Container>
      </section>

      <section className={styles.contact}>
        <Container className={styles.inner}>
          <div className={styles.details}>
            <p className={styles.eyebrow}>Send a Message</p>

            <h2>The easiest way to reach me.</h2>

            <p>
              Use the form and your message will come directly into the
              site&apos;s contact system.
            </p>

            <div className={styles.direct}>
              <div>
                <p className={styles.label}>Prefer email?</p>

                <a href="mailto:craigstueber@gmail.com">
                  craigstueber@gmail.com
                </a>
              </div>

              <div>
                <p className={styles.label}>Professional connection?</p>

                <a
                  href="https://www.linkedin.com/in/craigstueber"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>

          <div className={styles.form}>
            <ContactForm />
          </div>
        </Container>
      </section>

      <section className={styles.note}>
        <Container>
          <div className={styles.noteInner}>
            <p className={styles.eyebrow}>A Quick Note</p>

            <h2>Thoughtful messages are always welcome.</h2>

            <p>
              I read what comes through here. If you&apos;re writing about
              something I&apos;ve published, a question raised by one of the
              books, or an idea worth discussing, please feel free to reach out.
            </p>
          </div>
        </Container>
      </section>
    </main>
  );
}
