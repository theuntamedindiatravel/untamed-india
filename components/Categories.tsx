'use client';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories } from '@/lib/data';
import styles from './Categories.module.css';

export default function CategoriesSection() {
  return (
    <section className={styles.section} id="destinations">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Explore India</span>
          <h2 className={styles.title}>Journey By Experience</h2>
          <p className={styles.subtitle}>
            Eight distinct ways to discover India — from dense jungles and high Himalayan passes to ancient palaces and sacred ghats.
          </p>
        </div>

        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/destinations/${cat.id}`}
              className={styles.card}
              style={{ '--accent': cat.color } as React.CSSProperties}
            >
              <div className={styles.imageWrap}>
                <img src={cat.image} alt={cat.title} className={styles.image} loading="lazy" />
                <div className={styles.overlay} />
              </div>
              <div className={styles.content}>
                <span className={styles.icon}>{cat.icon}</span>
                <div className={styles.count}>{cat.count} tours</div>
                <h3 className={styles.cardTitle}>{cat.title}</h3>
                <p className={styles.cardDesc}>{cat.description}</p>
                <span className={styles.cta}>
                  Explore <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
