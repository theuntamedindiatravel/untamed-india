'use client';

import Link from 'next/link';
import styles from './EditorialSection.module.css';

type EditorialSectionProps = {
  eyebrow: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  imageKicker?: string;
  imageTitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  reverse?: boolean;
  storyId?: string;
  onOpenStory?: (storyId: string) => void;
};

export default function EditorialSection({
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt,
  imageKicker,
  imageTitle,
  ctaLabel = 'discover',
  ctaHref = '/about',
  reverse = false,
  storyId,
  onOpenStory,
}: EditorialSectionProps) {
  const interactive = Boolean(storyId && onOpenStory);

  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner} ${reverse ? styles.reverse : ''}`}>
        <div className={styles.copy}>
          <div className={styles.eyebrow}>{eyebrow}</div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.body}>{body}</p>
          <div className={styles.ctaRow}>
            <Link href={ctaHref} className={styles.cta}>
              {ctaLabel}
            </Link>
          </div>
        </div>

        <div className={styles.media}>
          {interactive ? (
            <button
              type="button"
              className={styles.imageFrameButton}
              onClick={() => storyId && onOpenStory?.(storyId)}
              aria-label={`Read more about this image: ${imageAlt}`}
            >
              <div className={styles.imageFrame}>
                <img src={imageSrc} alt="" loading="lazy" className={styles.image} />
                {(imageKicker || imageTitle) && (
                  <div className={styles.imageLabel}>
                    {imageKicker && <div className={styles.imageKicker}>{imageKicker}</div>}
                    {imageTitle && <div className={styles.imageTitle}>{imageTitle}</div>}
                  </div>
                )}
                <div className={styles.tapHint}>Tap to discover the story</div>
              </div>
            </button>
          ) : (
            <div className={styles.imageFrame}>
              <img src={imageSrc} alt={imageAlt} loading="lazy" className={styles.image} />
              {(imageKicker || imageTitle) && (
                <div className={styles.imageLabel}>
                  {imageKicker && <div className={styles.imageKicker}>{imageKicker}</div>}
                  {imageTitle && <div className={styles.imageTitle}>{imageTitle}</div>}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
