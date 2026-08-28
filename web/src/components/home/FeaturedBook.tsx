import Link from "next/link";

import Container from "@/components/ui/Container";

import styles from "./FeaturedBook.module.css";

export default function FeaturedBook() {
  return (
    <section className={styles.section}>
      <Container>
        <div className={styles.header}>
          <p className={styles.eyebrow}>The Book</p>

          <h2 className={styles.heading}>
            What happens when human participation becomes optional?
          </h2>
        </div>

        <div className={styles.content}>
          <div className={styles.introduction}>
            <p className={styles.lead}>
              The danger is not that our systems fail. It is that they work so
              well without us.
            </p>

            <p>
              <em>The Comfortable Apocalypse</em> examines a quieter
              technological future: one in which life continues to become
              faster, easier, and more responsive while human judgment gradually
              becomes less necessary to the systems shaping it.
            </p>

            <p>
              This is not an argument against artificial intelligence,
              automation, or convenience. It asks a different question: when
              technology removes a burden, what does it leave behind in the
              person who once carried it?
            </p>

            <p>
              Through technology, history, psychology, work, relationships,
              education, and everyday life, the book explores how we can
              preserve agency, competence, judgment, and meaningful
              participation without rejecting the tools that genuinely make life
              better.
            </p>

            <Link href="/books/comfortable-apocalypse" className={styles.link}>
              Explore The Comfortable Apocalypse
              <span aria-hidden="true"> →</span>
            </Link>
          </div>

          <div className={styles.parts}>
            <article className={styles.part}>
              <div className={styles.partNumber}>I</div>

              <div>
                <p className={styles.partLabel}>The Drift</p>

                <h3>How dependency begins</h3>

                <p>
                  Efficiency and convenience begin as tools for removing
                  legitimate burdens. Gradually, they can also change what we
                  expect of ourselves and what our systems expect from us.
                </p>
              </div>
            </article>

            <article className={styles.part}>
              <div className={styles.partNumber}>II</div>

              <div>
                <p className={styles.partLabel}>The Depth</p>

                <h3>What we surrender</h3>

                <p>
                  As systems anticipate, recommend, create, and decide, the
                  boundary between assistance and substitution becomes harder to
                  see. Judgment, initiative, authorship, and even relationships
                  enter the exchange.
                </p>
              </div>
            </article>

            <article className={styles.part}>
              <div className={styles.partNumber}>III</div>

              <div>
                <p className={styles.partLabel}>The Return</p>

                <h3>Remaining part of the future</h3>

                <p>
                  The answer is not technological retreat. It is learning how to
                  build and use powerful systems while preserving the human
                  authority to understand, question, choose, and participate.
                </p>
              </div>
            </article>
          </div>
        </div>
      </Container>
    </section>
  );
}
