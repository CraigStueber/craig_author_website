import Link from "next/link";

import Container from "@/components/ui/Container";

import styles from "./AboutPreview.module.css";

export default function AboutPreview() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.inner}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>About Craig</p>

            <h2 className={styles.heading}>
              I write about the systems I also build.
            </h2>
          </div>

          <div className={styles.content}>
            <p className={styles.lead}>
              Craig A. Stueber is an author, software engineer, and researcher
              whose work explores artificial intelligence, automation, and the
              changing role of human judgment.
            </p>

            <p>
              His perspective comes from both sides of the conversation. He
              builds software and AI systems professionally while studying the
              questions those technologies raise about agency, responsibility,
              expertise, and participation.
            </p>

            <p>
              His forthcoming book, <em>The Comfortable Apocalypse</em>,
              examines what happens when technology succeeds so completely that
              human involvement begins to feel unnecessary. His current work
              continues that inquiry into healthcare through{" "}
              <em>The Automated Patient</em>.
            </p>

            <Link href="/about" className={styles.link}>
              More about Craig
              <span aria-hidden="true"> →</span>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
