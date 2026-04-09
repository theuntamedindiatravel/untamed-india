'use client';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import styles from './CTABanner.module.css';

export default function CTABanner() {
  return (
    <section className={styles.section}>
      <div className={styles.bg} />
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.text}>
            <span className={styles.eyebrow}>Ready to Explore India?</span>
            <h2 className={styles.title}>Your Extraordinary Journey Awaits</h2>
            <p className={styles.subtitle}>
              Speak with our India travel experts to design a journey that fits your passions, timeline, and sense of adventure.
            </p>
          </div>
          <div className={styles.actions}>
            <Link href="/tours" className={`btn btn-primary ${styles.btnLarge}`}>
              Browse All Tours <ArrowRight size={16} />
            </Link>
            <Link href="/contact" className={`btn btn-outline ${styles.btnLarge}`}>
              <Phone size={16} /> Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
