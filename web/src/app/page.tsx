import AboutPreview from "@/components/home/AboutPreview";
import FeaturedBook from "@/components/home/FeaturedBook";
import Hero from "@/components/home/Hero";
import NewsletterSignup from "@/components/home/NewsletterSignup";
import UpcomingBook from "@/components/home/UpcomingBook";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedBook />
      <UpcomingBook />
      <NewsletterSignup />
      <AboutPreview />
    </main>
  );
}
