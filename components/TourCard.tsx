'use client';
import Link from 'next/link';
import styles from './TourCard.module.css';

type Tour = {
  slug: string;
  title: string;
  category: string;
  region: string;
  duration: string;
  groupSize: string;
  price: number;
  rating: number;
  reviews: number;
  badge?: string;
  image: string;
  description: string;
};

export default function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link href={`/tours/${tour.slug}`} className={styles.card}>
      <div className={styles.imageWrap}>
        <img src={tour.image} alt={tour.title} className={styles.image} loading="lazy" />
        {tour.badge && <span className="modern-caps" style={{ position: 'absolute', top: '20px', left: '20px', color: '#fff' }}>{tour.badge}</span>}
      </div>

      <div className={styles.body}>
        <div className="modern-caps" style={{ fontSize: '0.65rem', color: 'var(--gold)', marginBottom: '12px' }}>
          {tour.region} &bull; {tour.duration}
        </div>
        
        <h3 className={styles.title}>{tour.title}</h3>
        
        <p className={styles.description}>
          {tour.description}
        </p>

        <div className={styles.footer}>
          <span className="modern-caps" style={{ fontSize: '0.7rem', color: 'var(--charcoal)' }}>
            Fully Inclusive &ndash; From ${tour.price.toLocaleString()}
          </span>
        </div>
      </div>
    </Link>
  );
}
