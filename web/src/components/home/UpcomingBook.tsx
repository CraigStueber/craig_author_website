import Link from "next/link";

import Container from "@/components/ui/Container";

import styles from "./UpcomingBook.module.css";

export default function UpcomingBook() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.meta}>
            <p className={styles.eyebrow}>Currently Writing</p>

            <p className={styles.date}>Aiming for 2028</p>
          </div>

          <div className={styles.content}>
            <h2 className={styles.title}>The Automated Patient</h2>

            <p className={styles.lead}>
              What happens to care when the technology works?
            </p>

            <p className={styles.description}>
              <em>The Automated Patient</em> examines what happens as artificial
              intelligence moves deeper into medicine: measuring symptoms,
              documenting encounters, reading scans, offering emotional support,
              and influencing consequential decisions.
            </p>

            <p className={styles.description}>
              The question is not simply whether these systems are accurate or
              useful. It is what happens to judgment, responsibility, presence,
              and the relationship between patient and clinician when more of
              care can happen without either of them fully participating.
            </p>

            <Link href="/books/the-automated-patient" className={styles.link}>
              Learn about the project
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
