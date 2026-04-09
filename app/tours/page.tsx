'use client';
import { useState, useMemo } from 'react';
import { tours } from '@/lib/data';
import TourCard from '@/components/TourCard';
import ExperienceFilters from '@/components/ExperienceFilters';
import styles from './Tours.module.css';
import Link from 'next/link';

export default function ToursPage() {
  const [activeTribe, setActiveTribe] = useState<string | null>(null);
  const [activeMood, setActiveMood] = useState<string | null>(null);

  const filteredTours = useMemo(() => {
    return tours.filter((tour) => {
      const tribeMatch = !activeTribe || tour.tribes?.includes(activeTribe);
      const moodMatch = !activeMood || tour.moods?.includes(activeMood);
      return tribeMatch && moodMatch;
    });
  }, [activeTribe, activeMood]);

  return (
    <div className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">All Expeditions</span>
          <h1 className={styles.title}>Find Your Next <br /><em className={styles.italic}>Great Adventure</em></h1>
          <p className={styles.subtitle}>
            From the high Himalayas to the tropical backwaters, explore our curated selection of expert-led journeys across India.
          </p>
        </div>

        <ExperienceFilters 
          onFilterChange={(type, value) => {
            if (type === 'tribe') setActiveTribe(value);
            if (type === 'mood') setActiveMood(value);
          }} 
        />

        <div className={styles.grid}>
          {filteredTours.map((tour) => (
            <TourCard key={tour.slug} tour={tour} />
          ))}
        </div>

        {filteredTours.length === 0 && (
          <div className={styles.noResults}>
            <h3>No trips found for this combination</h3>
            <p>Try adjusting your tribe or mood filters to see more journeys.</p>
            <button 
              className="btn btn-outline" 
              onClick={() => { setActiveTribe(null); setActiveMood(null); }}
              style={{ marginTop: '20px' }}
            >
              Clear All Filters
            </button>
          </div>
        )}

        <div className={styles.footer}>
          <p>Can't find what you're looking for?</p>
          <Link href="/contact" className="btn btn-outline">Consult a Travel Expert</Link>
        </div>
      </div>
    </div>
  );
}
