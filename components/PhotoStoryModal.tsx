'use client';

import { useEffect, useId } from 'react';
import type { PhotoStory } from '@/lib/homePhotoStories';
import styles from './PhotoStoryModal.module.css';

type PhotoStoryModalProps = {
  open: boolean;
  story: PhotoStory | null;
  onClose: () => void;
};

export default function PhotoStoryModal({ open, story, onClose }: PhotoStoryModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open || !story) return null;

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close story">
          ×
        </button>

        <div className={styles.kicker}>Why this moment matters</div>
        <h2 className={styles.title} id={titleId}>
          {story.title}
        </h2>
        {story.subtitle && <p className={styles.subtitle}>{story.subtitle}</p>}
        <p className={styles.status}>{story.statusLabel}</p>

        <div className={styles.body}>
          {story.paragraphs.map((p, i) => (
            <p key={i} className={styles.para}>
              {p}
            </p>
          ))}
        </div>

        <div className={styles.why}>
          <div className={styles.whyLabel}>Why it matters for travellers</div>
          <p className={styles.whyText}>{story.whyItMatters}</p>
        </div>
      </div>
    </div>
  );
}
