import type { Metadata } from "next";

import BookHero from "@/components/books/BookHero";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "The Automated Patient",
  description:
    "The Automated Patient by Craig A. Stueber. A work in progress examining artificial intelligence, medicine, patient experience, clinical judgment, responsibility, and the human relationship at the center of care.",
};

const parts = [
  {
    number: "I",
    title: "The Measured Body",
    description:
      "What happens when pain, symptoms, sleep, movement, mood, and experience are translated into signals that machines can measure? Measurement can reveal more about us while also changing what medicine recognizes as real.",
  },
  {
    number: "II",
    title: "The Automated Clinic",
    description:
      "Artificial intelligence moves from recording and organizing care toward interpreting, recommending, and acting within it. The question becomes where assistance ends and substitution begins.",
  },
  {
    number: "III",
    title: "Care Without Presence",
    description:
      "Systems can respond quickly, patiently, and convincingly. But a response is not necessarily a relationship. What is lost when care becomes available without presence, continuity, or mutual stake?",
  },
  {
    number: "IV",
    title: "Who Is Responsible?",
    description:
      "When judgment is distributed among clinicians, institutions, software, models, and protocols, responsibility can become harder to locate precisely when patients need someone accountable.",
  },
  {
    number: "V",
    title: "Keeping Medicine Human",
    description:
      "The goal is not to reject useful technology. It is to preserve the patient's ability to understand, question, appeal, choose, and remain a participant in care.",
  },
];

const questions = [
  {
    title: "Measurement",
    description:
      "When experience becomes data, what becomes easier to see and what falls outside the frame?",
  },
  {
    title: "Judgment",
    description:
      "If a system can interpret symptoms, scans, records, and risk better than an individual clinician, where should human judgment remain authoritative?",
  },
  {
    title: "Presence",
    description:
      "Can a system provide something that feels like care without anyone actually being present with the person receiving it?",
  },
  {
    title: "Relationship",
    description:
      "What distinguishes a useful response from a relationship built through continuity, recognition, responsibility, and shared history?",
  },
  {
    title: "Responsibility",
    description:
      "Who answers to the patient when a consequential decision emerges from a chain of people, models, policies, and automated systems?",
  },
  {
    title: "Patient Authority",
    description:
      "As medicine becomes more automated, how do patients retain the ability to question, refuse, appeal, and understand decisions made about them?",
  },
];

export default function AutomatedPatientPage() {
  return (
    <main>
      <BookHero
        eyebrow="Currently Writing · Aiming for 2028"
        title="The Automated Patient"
        subtitle="What happens to care when the technology works?"
        description="A book about artificial intelligence in medicine, told from the patient's side of the encounter. The central question is not simply whether increasingly capable systems can diagnose, document, recommend, and respond. It is what happens to care when they can."
        visualTitle={["The Automated", "Patient"]}
        visualSubtitle={[
          "What happens to care",
          "when the technology",
          "works?",
        ]}
      />

      <section className={styles.overview}>
        <Container className={styles.overviewInner}>
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>The Question</p>

            <h2>
              Medicine can become more capable while the patient becomes less
              present within it.
            </h2>
          </div>

          <div className={styles.overviewCopy}>
            <p className={styles.lead}>
              Most discussions about artificial intelligence in healthcare ask
              whether the technology is accurate, efficient, or safe.
            </p>

            <p>
              Those questions matter. But they are not the only questions that
              matter.
            </p>

            <p>
              A system may successfully translate symptoms into data, summarize
              an encounter, identify an abnormality, recommend a course of
              action, or provide support at any hour of the day. Each capability
              can improve care.
            </p>

            <p>
              <em>The Automated Patient</em> asks what happens around those
              successes: to the patient's experience, to clinical judgment, to
              responsibility, and to the relationship that has historically made
              medicine more than the delivery of technically correct answers.
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.relationship}>
        <Container>
          <div className={styles.relationshipInner}>
            <p className={styles.relationshipLabel}>
              Response Is Not Relationship
            </p>

            <blockquote>
              A system can respond to a patient.
              <br />
              That does not mean it can stand in relationship with one.
            </blockquote>

            <p>
              Relationships contain continuity, memory, obligation,
              vulnerability, and mutual stake. As machines become better at
              producing the behaviors associated with care, that distinction
              becomes easier to overlook.
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.journey}>
        <Container>
          <div className={styles.journeyHeader}>
            <p className={styles.eyebrow}>Inside the Book</p>

            <h2>From the measured body to human medicine.</h2>

            <p>
              The book begins with the conversion of experience into data,
              follows automation deeper into the clinical encounter, and ends
              with a practical question: which rights, responsibilities, and
              forms of participation must remain human?
            </p>
          </div>

          <div className={styles.parts}>
            {parts.map((part) => (
              <article key={part.number} className={styles.part}>
                <p className={styles.partNumber}>{part.number}</p>

                <div>
                  <h3>{part.title}</h3>
                  <p>{part.description}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.questions}>
        <Container>
          <div className={styles.questionsHeader}>
            <p className={styles.eyebrow}>Questions the Book Explores</p>

            <h2>
              What should remain human when more of medicine does not
              technically require a human?
            </h2>
          </div>

          <div className={styles.questionGrid}>
            {questions.map((question) => (
              <article key={question.title} className={styles.question}>
                <h3>{question.title}</h3>
                <p>{question.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.closing}>
        <Container className={styles.closingInner}>
          <p className={styles.eyebrow}>Keeping Medicine Human</p>

          <h2>
            Better technology should expand care without making the patient
            incidental to it.
          </h2>

          <div className={styles.closingCopy}>
            <p>
              Artificial intelligence can reduce paperwork, expand access,
              identify patterns, support clinicians, and help patients
              understand their own health. Those benefits deserve to be taken
              seriously.
            </p>

            <p>
              But efficiency is not the only measure of progress. Patients must
              retain meaningful authority within the systems that measure them,
              interpret them, recommend for them, and increasingly act around
              them.
            </p>
          </div>
        </Container>
      </section>

      <NewsletterSignup />
    </main>
  );
}
