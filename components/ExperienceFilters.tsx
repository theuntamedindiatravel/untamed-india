'use client';
import { tribes, moods } from '@/lib/data';
import styles from './ExperienceFilters.module.css';

interface ExperienceFiltersProps {
  activeTribe: string | null;
  activeMood: string | null;
  onFilterChange: (type: 'tribe' | 'mood', value: string | null) => void;
}

export default function ExperienceFilters({ activeTribe, activeMood, onFilterChange }: ExperienceFiltersProps) {
  const handleTribeClick = (tribe: string) => {
    const newValue = activeTribe === tribe ? null : tribe;
    onFilterChange('tribe', newValue);
  };

  const handleMoodClick = (mood: string) => {
    const newValue = activeMood === mood ? null : mood;
    onFilterChange('mood', newValue);
  };

  return (
    <div className={styles.filtersWrapper}>
      <div className={styles.filterSection}>
        <div className={styles.filterLabel}>Select Your Tribe</div>
        <div className={styles.filterGroup}>
          {tribes.map((t) => (
            <button
              key={t}
              className={`${styles.filterChip} ${activeTribe === t ? styles.active : ''}`}
              onClick={() => handleTribeClick(t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.filterSection}>
        <div className={styles.filterLabel}>Define Your Mood</div>
        <div className={styles.filterGroup}>
          {moods.map((m) => (
            <button
              key={m}
              className={`${styles.filterChip} ${activeMood === m ? styles.active : ''}`}
              onClick={() => handleMoodClick(m)}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
