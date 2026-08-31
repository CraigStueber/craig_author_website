import NewsletterForm from "@/components/forms/NewsletterForm";
import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export default function NewsletterPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Container>
          <div className={styles.heroInner}>
            <p className={styles.eyebrow}>The Newsletter</p>

            <h1>Thoughts on AI, society, and where this is all going.</h1>

            <p className={styles.intro}>
              A thoughtful email about the current state of artificial
              intelligence, how it is changing everyday life, and what I think
              is worth paying attention to.
            </p>

            <p className={styles.promise}>
              No politics. No agenda. Just my thoughts.
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.signup}>
        <Container>
          <div className={styles.signupInner}>
            <NewsletterForm
              variant="dark"
              eyebrow="Join the newsletter"
              heading="Get the next essay in your inbox."
              description="Thoughtful writing about AI and society, sent when I have something worth sharing."
              buttonLabel="Join the Newsletter"
              note="No spam. No more than one email a week."
            />
          </div>
        </Container>
      </section>
      <section className={styles.details}>
        <Container>
          <div className={styles.detailsHeader}>
            <p className={styles.eyebrow}>What I&apos;ll send</p>

            <h2>A few things worth thinking about.</h2>
          </div>

          <div className={styles.detailsGrid}>
            <article className={styles.detail}>
              <span className={styles.number}>01</span>

              <h3>AI and society</h3>

              <p>
                I&apos;ll write thoughtful essays about where AI is right now,
                where it may be heading, and what these systems mean for the
                people who increasingly live and work alongside them.
              </p>

              <p>
                This is not a political newsletter, and I&apos;m not trying to
                sell you an ideology. These are simply my observations,
                questions, and conclusions as someone who spends a lot of time
                thinking about this technology.
              </p>
            </article>

            <article className={styles.detail}>
              <span className={styles.number}>02</span>

              <h3>And a little about the books</h3>

              <p>
                I&apos;ll occasionally sneak in updates about my upcoming books,
                what I&apos;m researching, ideas I&apos;m wrestling with, and
                what is happening behind the scenes as they make their way
                toward publication.
              </p>

              <p>
                The essays come first. The book updates are the bonus material.
              </p>
            </article>
          </div>
        </Container>
      </section>

      <section className={styles.signupAlternate}>
        <Container>
          <div className={styles.signupInner}>
            <NewsletterForm
              eyebrow="Interested?"
              heading="Join me for the next one."
              description="Essays on AI and society, with occasional updates from the books I am writing along the way."
              buttonLabel="Send Me the Next One"
              note="You will receive a confirmation email first."
            />
          </div>
        </Container>
      </section>

      <section className={styles.cadence}>
        <Container>
          <div className={styles.cadenceInner}>
            <p className={styles.eyebrow}>My promise</p>

            <h2>No more than one email a week.</h2>

            <p>
              Your inbox has enough in it already. I&apos;ll only send something
              when I believe I have something worth saying, and I will never
              send more than one newsletter in a week.
            </p>
          </div>
        </Container>
      </section>

      <section className={styles.finalSignup}>
        <Container>
          <div className={styles.signupInner}>
            <NewsletterForm
              eyebrow="Stay in the conversation"
              heading="If that sounds interesting, I'd be glad to have you."
              description="Thoughtful essays, occasional book updates, and nothing filling your inbox just for the sake of sending something."
              buttonLabel="Count Me In"
              note="No politics. No agenda. No more than one email a week."
            />
          </div>
        </Container>
      </section>
    </main>
  );
}
