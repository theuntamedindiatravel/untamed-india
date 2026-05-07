'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import TourCard from '@/components/TourCard';
import { tours } from '@/lib/data';
import styles from './FeaturedTours.module.css';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';

export default function FeaturedTours() {
  const featured = tours.filter((t) => t.featured);
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <Stagger>
            <div>
              <Reveal>
                <span className="section-label">Featured Journeys</span>
              </Reveal>
              <Reveal>
                <h2 className={styles.title}>India's Most Extraordinary Tours</h2>
              </Reveal>
              <Reveal>
                <p className={styles.subtitle}>
                  Curated by our expert naturalists and cultural guides — each journey is designed to reveal India's deepest wonders.
                </p>
              </Reveal>
            </div>
          </Stagger>
          <Reveal delay={0.15}>
            <Link href="/tours" className="btn btn-ghost">
              View All Tours <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>
        <div className={styles.grid}>
          {featured.map((tour) => (
            <Reveal key={tour.slug} y={18}>
              <TourCard tour={tour} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
