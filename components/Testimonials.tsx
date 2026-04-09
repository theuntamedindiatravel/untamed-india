'use client';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/lib/data';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Guest Stories</span>
          <h2 className={styles.title}>Lives Changed by India</h2>
          <p className={styles.subtitle}>Our guests travel to discover — and consistently return transformed.</p>
        </div>

        <div className={styles.grid}>
          {testimonials.map((t) => (
            <div key={t.id} className={styles.card}>
              <Quote size={32} className={styles.quote} />
              <div className={styles.stars}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className={styles.text}>&ldquo;{t.text}&rdquo;</p>
              <div className={styles.footer}>
                <img src={t.avatar} alt={t.name} className={styles.avatar} loading="lazy" />
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role}</div>
                  <div className={styles.tourLabel}>Tour: {t.tour}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
