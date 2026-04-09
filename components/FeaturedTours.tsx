'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import TourCard from '@/components/TourCard';
import { tours } from '@/lib/data';
import styles from './FeaturedTours.module.css';

export default function FeaturedTours() {
  const featured = tours.filter((t) => t.featured);
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="section-label">Featured Journeys</span>
            <h2 className={styles.title}>India's Most Extraordinary Tours</h2>
            <p className={styles.subtitle}>
              Curated by our expert naturalists and cultural guides — each journey is designed to reveal India's deepest wonders.
            </p>
          </div>
          <Link href="/tours" className="btn btn-ghost">
            View All Tours <ArrowRight size={14} />
          </Link>
        </div>
        <div className={styles.grid}>
          {featured.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>
      </div>
    </section>
  );
}
