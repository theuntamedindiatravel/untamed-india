import Link from 'next/link';
import styles from './EditorialSection.module.css';

type EditorialSectionProps = {
  eyebrow: string;
  title: string;
  body: string;
  imageSrc: string;
  imageAlt: string;
  ctaLabel?: string;
  ctaHref?: string;
  reverse?: boolean;
};

export default function EditorialSection({
  eyebrow,
  title,
  body,
  imageSrc,
  imageAlt,
  ctaLabel = 'discover',
  ctaHref = '/about',
  reverse = false,
}: EditorialSectionProps) {
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

        <div className={styles.media} aria-hidden="true">
          <div className={styles.imageFrame}>
            <img src={imageSrc} alt={imageAlt} loading="lazy" className={styles.image} />
          </div>
        </div>
      </div>
    </section>
  );
}

