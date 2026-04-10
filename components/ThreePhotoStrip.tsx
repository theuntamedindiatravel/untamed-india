'use client';
import styles from './ThreePhotoStrip.module.css';

const tiles = [
  {
    src: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=85',
    title: 'Agra',
    subtitle: 'Taj Mahal',
    storyId: 'strip-taj' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1756777943255-1c8d816ae576?auto=format&fit=crop&w=1600&q=85',
    title: 'Wildlife',
    subtitle: 'Cheetah',
    storyId: 'strip-cheetah' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1751267681489-4a2e271813e7?auto=format&fit=crop&w=1600&q=85',
    title: 'Himalayas',
    subtitle: 'Snow Leopard',
    storyId: 'strip-snow' as const,
  },
];

type ThreePhotoStripProps = {
  onOpenStory: (storyId: string) => void;
};

export default function ThreePhotoStrip({ onOpenStory }: ThreePhotoStripProps) {
  return (
    <section className={styles.section} aria-label="Featured images">
      <div className="container">
        <p className={styles.intro}>Tap a photograph to learn why the species and places behind it matter.</p>
        <div className={styles.grid}>
          {tiles.map((t) => (
            <button
              key={t.title}
              type="button"
              className={styles.card}
              onClick={() => onOpenStory(t.storyId)}
              aria-label={`Read more about ${t.subtitle} in ${t.title}`}
            >
              <div className={styles.image} style={{ backgroundImage: `url(${t.src})` }} />
              <div className={styles.overlay} />
              <div className={styles.text}>
                <div className={styles.kicker}>{t.title}</div>
                <div className={styles.title}>{t.subtitle}</div>
                <div className={styles.storyCue}>Story</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
