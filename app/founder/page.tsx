import type { Metadata } from 'next';
import styles from '../about/About.module.css';

export const metadata: Metadata = {
  title: 'Meet the Founder | Untamed India',
  description:
    'Krishnapal Singh, Founder & Lead Travel Designer at Untamed India — a licensed French-speaking tour guide bringing authentic, immersive journeys across India.',
};

export default function FounderPage() {
  return (
    <div className={styles.about}>
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">Meet the founder</span>
          <h1 className={styles.title}>Krishnapal Singh</h1>
          <p className={styles.lead}>Founder &amp; Lead Travel Designer | Licensed French-Speaking Tour Guide</p>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.founderBlock}>
            <div className={styles.founderPhoto}>
              <img
                src="/founder/krishnapal-singh.jpg"
                alt="Krishnapal Singh, Founder & Lead Travel Designer at Untamed India"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={styles.founderText}>
              <p>Tourism has never been just a profession for me—it has always been my passion and my purpose.</p>

              <p>
                As a licensed French-speaking tour guide in India, I have had the privilege of welcoming travelers from around the
                world and introducing them to the incredible diversity, history, and culture of my country. Over the years, I have
                guided countless guests across North India, creating authentic experiences that go far beyond traditional
                sightseeing.
              </p>

              <p>
                My love for the French language and my deep understanding of international travelers&rsquo; expectations inspired me
                to create The Untamed India. My vision is simple: to offer journeys that are personal, immersive, and unforgettable
                while supporting local communities and promoting responsible tourism.
              </p>

              <p>
                At The Untamed India, I believe every traveler deserves more than a standard itinerary. Whether it is discovering
                hidden villages, meeting local artisans, exploring India&rsquo;s magnificent heritage, or experiencing its vibrant
                traditions, every journey is carefully designed to create meaningful connections with the destination.
              </p>

              <p>
                My goal is to build a travel company that is recognized for authenticity, professionalism, and exceptional service,
                while showcasing the true spirit of India to travelers from across the globe.
              </p>

              <p>
                I look forward to welcoming you to India and helping you discover the country through the eyes of someone who
                proudly calls it home.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
