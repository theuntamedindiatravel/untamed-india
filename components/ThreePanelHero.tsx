'use client';
import styles from './ThreePanelHero.module.css';

const panels = [
  {
    src: 'https://images.unsplash.com/photo-1709620220232-12ecd7ca33a8?auto=format&fit=crop&w=1800&q=85',
    alt: 'Camel silhouette in the Rajasthan desert at sunset',
    storyId: 'panel-camel' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1703092289078-ff03b771237c?auto=format&fit=crop&w=1800&q=85',
    alt: 'Lake palace on Lake Pichola, Udaipur',
    storyId: 'panel-udaipur' as const,
  },
  {
    src: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=1800&q=85',
    alt: 'Elephant walking in the wild',
    storyId: 'panel-elephant' as const,
  },
];

type ThreePanelHeroProps = {
  onOpenStory: (storyId: string) => void;
};

export default function ThreePanelHero({ onOpenStory }: ThreePanelHeroProps) {
  return (
    <section className={styles.hero} aria-label="Three panel hero">
      <div className={styles.panels}>
        {panels.map((p) => (
          <button
            key={p.src}
            type="button"
            className={styles.panel}
            aria-label={`${p.alt}. Open story.`}
            onClick={() => onOpenStory(p.storyId)}
          >
            <div className={styles.image} style={{ backgroundImage: `url(${p.src})` }} />
            <div className={styles.panelOverlay} />
          </button>
        ))}
      </div>

      <div className={styles.globalOverlay} />

      <div className={styles.copy}>
        <h1 className={styles.heading}>Private | Luxury | Travel</h1>
        <p className={styles.subheading}>Designed exclusively for you</p>
        <p className={styles.hint}>Tap a panel to read the story behind the scene</p>
      </div>
    </section>
  );
}
