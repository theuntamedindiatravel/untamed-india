'use client';
import styles from './PhotoGallery.module.css';

const photos = [
  {
    src: 'https://images.unsplash.com/photo-1768331000117-5417bd921244?auto=format&fit=crop&w=1600&q=85',
    alt: 'Royal Bengal tiger portrait',
    label: 'Royal Bengal Tiger',
  },
  {
    src: 'https://images.unsplash.com/photo-1751267681489-4a2e271813e7?auto=format&fit=crop&w=1600&q=85',
    alt: 'Snow leopard in the Himalayas',
    label: 'Snow Leopard',
  },
  {
    src: 'https://images.unsplash.com/photo-1760835251791-1fda687de791?auto=format&fit=crop&w=1600&q=85',
    alt: 'Thiksey Monastery in Ladakh',
    label: 'Ladakh • Thiksey Monastery',
  },
  {
    src: 'https://images.unsplash.com/photo-1760573776062-7d2a7baeb49d?auto=format&fit=crop&w=1600&q=85',
    alt: 'Luxury hotel bedroom with warm lighting',
    label: 'Luxury stays',
  },
  {
    src: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    alt: 'Himalayan valley landscape',
    label: 'Himalayas',
  },
  {
    src: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=85',
    alt: 'Indian palace architecture',
    label: 'Heritage',
  },
];

export default function PhotoGallery() {
  return (
    <section className={styles.section} aria-label="Photo gallery">
      <div className="container">
        <div className={styles.header}>
          <div className={styles.eyebrow}>Gallery</div>
          <h2 className={styles.title}>Moments across India.</h2>
          <p className={styles.subtitle}>
            Wildlife, landscapes, and heritage—curated in a rich golden finish.
          </p>
        </div>

        <div className={styles.grid}>
          {photos.map((p) => (
            <div key={p.src} className={styles.card}>
              <div className={styles.image} style={{ backgroundImage: `url(${p.src})` }} role="img" aria-label={p.alt} />
              <div className={styles.label}>{p.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

