import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Craig A. Stueber, author of The Comfortable Apocalypse and The Automated Patient.",
};

export default function AboutPage() {
  return (
    <main>
      <section className={styles.hero}>
        <Container>
          <p className={styles.eyebrow}>About Craig</p>

          <h1 className={styles.heading}>
            I write about what happens to us when technology gets really good at
            doing things for us.
          </h1>

          <p className={styles.introduction}>
            I&apos;m Craig A. Stueber, an author, engineer, and researcher
            interested in artificial intelligence, automation, human judgment,
            and the increasingly complicated relationship between convenience
            and agency.
          </p>
        </Container>
      </section>

      <section className={styles.story}>
        <Container className={styles.storyInner}>
          <div className={styles.sectionHeading}>
            <p className={styles.eyebrow}>Why I Write</p>

            <h2>
              I&apos;m less interested in whether technology can do something
              than in what happens after it can.
            </h2>
          </div>

          <div className={styles.copy}>
            <p className={styles.lead}>
              I came to these questions from inside technology, not from outside
              it.
            </p>

            <p>
              I spend my professional life building software and working with
              increasingly capable artificial intelligence systems. I&apos;m
              fascinated by what these technologies can do, and I&apos;m
              generally optimistic about what they can make possible.
            </p>

            <p>
              But building them also makes certain questions difficult for me to
              ignore.
            </p>

            <p>
              What happens when a tool becomes good enough that using our own
              judgment starts to feel inefficient? What happens when convenience
              stops removing burdens and starts removing participation? If a
              system can create, recommend, interpret, remember, decide, and
              eventually act for us, what exactly do we want to remain ours?
            </p>

            <p>Those questions are the reason I write.</p>
          </div>
        </Container>
      </section>

      <section className={styles.books}>
        <Container>
          <div className={styles.booksHeader}>
            <p className={styles.eyebrow}>The Work</p>

            <h2>
              Different subjects.
              <br />
              The same underlying question.
            </h2>
          </div>

          <div className={styles.bookGrid}>
            <article className={styles.book}>
              <p className={styles.bookStatus}>Forthcoming 2027</p>

              <h3>The Comfortable Apocalypse</h3>

              <p>
                My first book looks at a future that does not arrive through
                technological catastrophe, but through technological success. It
                asks what happens when the systems around us become capable
                enough that human judgment, skill, and participation begin to
                feel optional.
              </p>

              <Link
                href="/books/comfortable-apocalypse"
                className={styles.link}
              >
                Explore the book
                <span aria-hidden="true"> →</span>
              </Link>
            </article>

            <article className={styles.book}>
              <p className={styles.bookStatus}>
                Currently Writing · Aiming for 2028
              </p>

              <h3>The Automated Patient</h3>

              <p>
                My current project takes many of those questions into medicine.
                It examines what happens to judgment, responsibility, presence,
                and the patient-clinician relationship as artificial
                intelligence becomes more capable of participating in care.
              </p>

              <Link href="/books/the-automated-patient" className={styles.link}>
                Explore the project
                <span aria-hidden="true"> →</span>
              </Link>
            </article>
          </div>
        </Container>
      </section>

      <section className={styles.personal}>
        <Container className={styles.personalInner}>
          <div>
            <p className={styles.eyebrow}>Away From the Keyboard</p>

            <h2>
              There is, occasionally, life outside artificial intelligence.
            </h2>
          </div>

          <div className={styles.personalCopy}>
            <p className={styles.lead}>
              I&apos;m the sort of person who can spend all day thinking about
              AI and then happily spend the evening around a table playing board
              games with my wife and friends.
            </p>

            <p>
              Board games are one of my favorite ways to spend time with the
              people I care about, which means our house has accumulated
              considerably more cardboard, tokens, cards, miniatures, and
              rulebooks than any reasonable household probably needs.
            </p>

            <p>
              I&apos;m also deeply obsessed with <em>The Lord of the Rings</em>{" "}
              and Tolkien&apos;s world. &quot;Interested in Tolkien&quot; would
              probably be a significant understatement.
            </p>

            <p>
              History is another longtime fascination, particularly ancient Rome
              and the Viking world. I&apos;m drawn to the way societies build
              institutions, stories, traditions, and systems that eventually
              become larger than the people who created them.
            </p>

            <p>
              Which, now that I think about it, may explain quite a bit about
              the books I write.
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.closing}>
        <Container className={styles.closingInner}>
          <p className={styles.eyebrow}>Keep Exploring</p>

          <h2>
            If these are the kinds of questions you think about too, I&apos;m
            glad you&apos;re here.
          </h2>

          <p>
            You can explore the books, follow new writing on the blog, or get in
            touch directly.
          </p>

          <div className={styles.actions}>
            <Link href="/books" className={styles.primaryAction}>
              Explore the Books
            </Link>

            <Link href="/contact" className={styles.secondaryAction}>
              Contact Me
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
