import type { Metadata } from "next";

import BookHero from "@/components/books/BookHero";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Comfortable Apocalypse",
  description:
    "The Comfortable Apocalypse by Craig A. Stueber. Forthcoming 2027. A book about artificial intelligence, automation, human agency, and what happens when participation becomes optional.",
};

const parts = [
  {
    number: "I",
    title: "The Drift",
    description:
      "How convenience, efficiency, and automation begin by removing legitimate burdens, then gradually change what systems ask of us and what we expect from ourselves.",
  },
  {
    number: "II",
    title: "The Depth",
    description:
      "What can disappear when systems move from helping us act to anticipating, recommending, creating, and deciding on our behalf.",
  },
  {
    number: "III",
    title: "The Return",
    description:
      "How to preserve judgment, competence, agency, and meaningful participation without rejecting the technologies that genuinely improve human life.",
  },
];

const themes = [
  {
    title: "Agency",
    description:
      "What happens when systems increasingly decide what deserves attention, what choices appear, and which actions happen next?",
  },
  {
    title: "Judgment",
    description:
      "If machines become better at producing answers, recommendations, and decisions, where does human judgment still matter?",
  },
  {
    title: "Competence",
    description:
      "Skills do more than produce outcomes. They shape confidence, independence, and our ability to act when systems fail or disagree.",
  },
  {
    title: "Work",
    description:
      "Automation changes more than employment. It changes what people contribute, what organizations value, and how individuals understand their usefulness.",
  },
  {
    title: "Relationships",
    description:
      "Artificial systems can increasingly imitate attention, understanding, and companionship. The harder question is what happens when simulation becomes easier than reciprocity.",
  },
  {
    title: "Participation",
    description:
      "The central question of the book: what remains of human authority when the systems around us no longer require our involvement?",
  },
];

export default function ComfortableApocalypsePage() {
  return (
    <main>
      <BookHero
        eyebrow="Forthcoming 2027"
        title="The Comfortable Apocalypse"
        subtitle="When Survival Isn't the Problem. Irrelevance Is."
        description="A book about a future in which nothing necessarily collapses. The systems work, the services continue, and life becomes increasingly convenient. What quietly changes is how much of that world still requires us."
        visualTitle={["The Comfortable", "Apocalypse"]}
        visualSubtitle={[
          "When Survival Isn't",
          "the Problem.",
          "Irrelevance Is.",
        ]}
      />

      <section className={styles.overview}>
        <Container className={styles.overviewInner}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>The Argument</p>

            <h2>
              The danger is not that the technology fails.
              <br />
              It is that it works so well without us.
            </h2>
          </div>

          <div className={styles.overviewCopy}>
            <p className={styles.lead}>
              Most warnings about artificial intelligence begin with
              catastrophe. <em>The Comfortable Apocalypse</em> begins somewhere
              quieter.
            </p>

            <p>
              Food still arrives. Payments still clear. Systems answer
              questions, recommend choices, organize schedules, create content,
              and increasingly act on our behalf. Nothing needs to break for
              something important to disappear.
            </p>

            <p>
              As technology becomes more capable, participation itself can
              become optional. Judgment is exercised less often. Skills are
              practiced less often. Decisions arrive already shaped. Convenience
              moves from helping us do things to quietly determining how much
              remains for us to do.
            </p>

            <p>
              The book is not an argument against artificial intelligence,
              automation, or technological progress. It is an argument for
              paying attention to what happens to people after a system
              succeeds.
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.principle}>
        <Container>
          <div className={styles.principleInner}>
            <p className={styles.principleLabel}>The Comfortable Apocalypse</p>

            <blockquote>
              It does not arrive as catastrophe.
              <br />
              It arrives as convenience.
            </blockquote>

            <p>
              The question is not simply what technology can do for us. It is
              what repeated delegation asks us to stop doing for ourselves.
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.journey}>
        <Container>
          <div className={styles.journeyHeader}>
            <p className={styles.eyebrow}>Inside the Book</p>

            <h2>From drift to return.</h2>

            <p>
              The book moves through three stages, beginning with the
              conveniences that make dependence attractive, examining what
              deeper substitution can displace, and ending with the question of
              how to remain meaningfully involved.
            </p>
          </div>

          <div className={styles.parts}>
            {parts.map((part) => (
              <article key={part.number} className={styles.part}>
                <p className={styles.partNumber}>{part.number}</p>

                <h3>{part.title}</h3>

                <p>{part.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.themes}>
        <Container>
          <div className={styles.themesHeader}>
            <p className={styles.eyebrow}>Questions the Book Explores</p>

            <h2>What are we preserving when we preserve a human role?</h2>
          </div>

          <div className={styles.themeGrid}>
            {themes.map((theme) => (
              <article key={theme.title} className={styles.theme}>
                <h3>{theme.title}</h3>
                <p>{theme.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.closing}>
        <Container className={styles.closingInner}>
          <p className={styles.eyebrow}>Not a Rejection of Progress</p>

          <h2>
            The goal is not to make technology less capable.
            <br />
            It is to make sure capability does not require irrelevance.
          </h2>

          <div className={styles.closingCopy}>
            <p>
              There are burdens worth removing. There are tasks machines should
              perform. There are systems that can make life safer, easier, more
              accessible, and more humane.
            </p>

            <p>
              The harder design problem is deciding which forms of human
              participation are more than inefficiencies waiting to be optimized
              away.
            </p>
          </div>
        </Container>
      </section>

      <NewsletterSignup />
    </main>
  );
}
