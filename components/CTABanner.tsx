'use client';
import Link from 'next/link';
import { ArrowRight, Phone } from 'lucide-react';
import styles from './CTABanner.module.css';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';

export default function CTABanner() {
  return (
    <section className={styles.section}>
      <div className={styles.bg} />
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.text}>
            <Stagger>
              <Reveal>
                <span className={styles.eyebrow}>Ready to Explore India?</span>
              </Reveal>
              <Reveal>
                <h2 className={styles.title}>Your Extraordinary Journey Awaits</h2>
              </Reveal>
              <Reveal>
                <p className={styles.subtitle}>
                  Speak with our India travel experts to design a journey that fits your passions, timeline, and sense of adventure.
                </p>
              </Reveal>
            </Stagger>
          </div>
          <div className={styles.actions}>
            <Reveal y={14} delay={0.1}>
              <Link href="/tours" className={`btn btn-primary ${styles.btnLarge}`}>
                Browse All Tours <ArrowRight size={16} />
              </Link>
            </Reveal>
            <Reveal y={14} delay={0.18}>
              <Link href="/contact" className={`btn btn-outline ${styles.btnLarge}`}>
                <Phone size={16} /> Talk to an Expert
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
