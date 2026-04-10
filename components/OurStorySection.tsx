'use client';
import Link from 'next/link';
import styles from './OurStorySection.module.css';

export default function OurStorySection() {
  return (
    <section className={styles.section} aria-label="Our story and impact credits">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.eyebrow}>Our story</div>
          <h2 className={styles.title}>Luxury travel that leaves a place better.</h2>
          <p className={styles.subtitle}>
            We design journeys with taste, calm, and precision—while respecting the people, culture, and landscapes that make each region extraordinary.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.cardKicker}>Why we exist</div>
            <h3 className={styles.cardTitle}>Passion, not packages.</h3>
            <p className={styles.cardBody}>
              Our passion is curating meaningful luxury—stays and experiences that feel effortless, and memories that feel personal.
              We believe every traveller creates an impact. Our job is to make it a positive one.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardKicker}>Impact Credits</div>
            <h3 className={styles.cardTitle}>5% returned to you—or gifted forward.</h3>
            <p className={styles.cardBody}>
              When your tour finishes, you receive <strong>Impact Credits</strong> equal to <strong>5% of your total tour package</strong>.
              You can use these credits as a discount on a future journey, or choose to sponsor a girl child’s education with the same value.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.cardKicker}>What it changes</div>
            <h3 className={styles.cardTitle}>Travel with a trace of good.</h3>
            <p className={styles.cardBody}>
              The aim is simple: support communities, encourage responsible tourism, and keep the regions we love thriving—for the next traveller,
              and for the people who call these places home.
            </p>
          </div>
        </div>

        <div className={styles.ctaRow}>
          <Link className="btn btn-primary" href="/contact">
            Talk to our concierge
          </Link>
          <Link className="btn btn-outline" href="/?register=1#register">
            Register interest
          </Link>
        </div>
      </div>
    </section>
  );
}

