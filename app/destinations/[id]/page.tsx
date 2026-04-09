'use client';
import { useParams, notFound } from 'next/navigation';
import { tours, categories } from '@/lib/data';
import TourCard from '@/components/TourCard';
import styles from './Destination.module.css';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DestinationPage() {
  const params = useParams();
  const id = params.id;

  const category = categories.find((c) => c.id === id);
  const filteredTours = tours.filter((t) => t.category === id);

  if (!category) {
    notFound();
  }

  return (
    <div className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <Link href="/tours" className="btn btn-outline" style={{ marginBottom: '30px', padding: '8px 16px' }}>
            <ArrowLeft size={16} /> All Destinations
          </Link>
          <br />
          <span className="section-label" style={{ color: category.color }}>{category.icon} {category.title}</span>
          <h1 className={styles.title}>{category.title}</h1>
          <p className={styles.description}>{category.description}</p>
        </div>

        {filteredTours.length > 0 ? (
          <div className={styles.grid}>
            {filteredTours.map((tour) => (
              <TourCard key={tour.slug} tour={tour} />
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              We're currently designing new {category.title} expeditions. 
              Check back soon or explore our other collections.
            </p>
            <br />
            <Link href="/tours" className="btn btn-primary">Browse All Tours</Link>
          </div>
        )}

        {filteredTours.length > 0 && (
          <div style={{ marginTop: '80px', textAlign: 'center' }}>
            <p style={{ color: '#666', marginBottom: '20px' }}>Looking for something bespoke?</p>
            <Link href="/contact" className="btn btn-outline">Our Specialists Can Help</Link>
          </div>
        )}
      </div>
    </div>
  );
}
