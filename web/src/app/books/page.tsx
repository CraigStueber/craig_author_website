import type { Metadata } from "next";

import BookCard from "@/components/books/BookCard";
import Container from "@/components/ui/Container";

import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Books",
  description:
    "Books by Craig A. Stueber, including The Comfortable Apocalypse and The Automated Patient.",
};

export default function BooksPage() {
  return (
    <main>
      <section className={styles.hero}>
        <Container>
          <p className={styles.eyebrow}>Books</p>

          <h1 className={styles.heading}>
            Technology changes what we can do.
            <br />
            These books ask what it changes in us.
          </h1>

          <p className={styles.introduction}>
            Craig A. Stueber writes about artificial intelligence, automation,
            human judgment, and what happens when systems become capable of
            doing more of the work that once required us.
          </p>
        </Container>
      </section>

      <section className={styles.catalog}>
        <Container>
          <BookCard
            title="The Comfortable Apocalypse"
            subtitle="When Survival Isn't the Problem. Irrelevance Is."
            status="Coming 2027"
            description="A book about a future that does not arrive through collapse, but through successful systems that make human participation increasingly optional. The Comfortable Apocalypse examines what convenience, automation, and artificial intelligence can quietly displace, and how we can preserve agency without rejecting progress."
            href="/books/comfortable-apocalypse"
            featured
          />

          <BookCard
            title="The Automated Patient"
            status="Currently Writing · Aiming for 2028"
            description="An exploration of artificial intelligence in healthcare and what happens to judgment, responsibility, presence, and the relationship between patient and clinician when more of care can happen through machines."
            href="/books/the-automated-patient"
          />
        </Container>
      </section>
    </main>
  );
}
