'use client';

import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';
import styles from './EditorialSection.module.css';
import Reveal from '@/components/motion/Reveal';
import Stagger from '@/components/motion/Stagger';

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.95', 'end 0.15'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [26, -22]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);

  return (
    <section className={styles.section} ref={sectionRef}>
      <div className={`container ${styles.inner} ${reverse ? styles.reverse : ''}`}>
        <div className={styles.copy}>
          <Stagger>
            <Reveal>
              <div className={styles.eyebrow}>{eyebrow}</div>
            </Reveal>
            <Reveal>
              <h2 className={styles.title}>{title}</h2>
            </Reveal>
            <Reveal>
              <p className={styles.body}>{body}</p>
            </Reveal>
            <Reveal>
              <div className={styles.ctaRow}>
                <Link href={ctaHref} className={styles.cta}>
                  {ctaLabel}
                </Link>
              </div>
            </Reveal>
          </Stagger>
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
                <motion.img
                  src={imageSrc}
                  alt=""
                  loading="lazy"
                  className={styles.image}
                  style={{ y: imageY, scale: imageScale }}
                  initial={{ opacity: 0, filter: 'blur(12px)' }}
                  whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 1.25, ease: [0.2, 0, 0, 1] }}
                />
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
              <motion.img
                src={imageSrc}
                alt={imageAlt}
                loading="lazy"
                className={styles.image}
                style={{ y: imageY, scale: imageScale }}
                initial={{ opacity: 0, filter: 'blur(12px)' }}
                whileInView={{ opacity: 1, filter: 'blur(0px)' }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 1.25, ease: [0.2, 0, 0, 1] }}
              />
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
