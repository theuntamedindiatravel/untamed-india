'use client';

import { useEffect, useId } from 'react';
import type { Guide } from '@/lib/guides';
import { getWhatsAppLink } from '@/lib/whatsapp';
import styles from './GuideModal.module.css';

type GuideModalProps = {
  open: boolean;
  guide: Guide | null;
  onClose: () => void;
};

export default function GuideModal({ open, guide, onClose }: GuideModalProps) {
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

  if (!open || !guide) return null;

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close guide profile">
          ×
        </button>

        <div className={styles.grid}>
          <div className={styles.photoWrap}>
            <img className={styles.photo} src={guide.photo} alt={`${guide.name} portrait`} loading="lazy" />
          </div>

          <div className={styles.content}>
            <div className={styles.kicker}>Our Guides</div>
            <h3 className={styles.name} id={titleId}>
              {guide.name}
            </h3>

            <div className={styles.meta}>
              <div className={styles.metaRow}>
                <div className={styles.metaLabel}>Languages</div>
                <div className={styles.metaValue}>{guide.languages.join(', ')}</div>
              </div>
              <div className={styles.metaRow}>
                <div className={styles.metaLabel}>Region</div>
                <div className={styles.metaValue}>{guide.region}</div>
              </div>
              <div className={styles.metaRow}>
                <div className={styles.metaLabel}>Experience</div>
                <div className={styles.metaValue}>{guide.experienceYears}+ years</div>
              </div>
            </div>

            <p className={styles.bio}>{guide.bio}</p>

            <div className={styles.actions}>
              <a
                className="btn btn-primary"
                href={getWhatsAppLink(`Hi! I’d like to request ${guide.name} as our guide. Could you share availability?`)}
                target="_blank"
                rel="noreferrer"
              >
                Request this guide
              </a>
              <button type="button" className="btn btn-outline" onClick={onClose}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

