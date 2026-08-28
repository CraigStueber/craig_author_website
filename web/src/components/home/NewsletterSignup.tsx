import Container from "@/components/ui/Container";
import NewsletterForm from "@/components/forms/NewsletterForm";

import styles from "./NewsletterSignup.module.css";

export default function NewsletterSignup() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.content}>
            <p className={styles.eyebrow}>Stay Connected</p>

            <h2 className={styles.heading}>Follow the conversation.</h2>

            <p className={styles.description}>
              New essays, book updates, and occasional thoughts on artificial
              intelligence, technology, and human agency.
            </p>
          </div>

          <div className={styles.form}>
            <NewsletterForm />

            <p className={styles.note}>
              No noise. Just new writing and meaningful updates.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
