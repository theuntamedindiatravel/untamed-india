'use client';
import { stats } from '@/lib/data';
import styles from './StatsBar.module.css';

export default function StatsBar() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.item}>
              <span className={styles.value}>{stat.value}</span>
              <span className={styles.label}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
