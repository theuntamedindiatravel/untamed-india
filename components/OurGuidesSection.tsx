'use client';

import { useCallback, useMemo, useState } from 'react';
import styles from './OurGuidesSection.module.css';
import { GUIDES, type Guide } from '@/lib/guides';
import GuideModal from '@/components/GuideModal';

export default function OurGuidesSection() {
  const guides = useMemo(() => GUIDES, []);
  const [active, setActive] = useState<Guide | null>(null);

  const openGuide = useCallback((g: Guide) => setActive(g), []);
  const closeGuide = useCallback(() => setActive(null), []);

  return (
    <section className={styles.section} id="guides" aria-label="Our Guides">
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Our Guides</span>
          <h2 className={styles.title}>Our Guides</h2>
          <p className={styles.subtitle}>The people who bring each journey to life</p>
          <p className={styles.intro}>
            Each journey with Untamed India is led by carefully selected guides — chosen not only for their knowledge, but for their
            ability to create meaningful, personal experiences.
          </p>
        </div>

        {/* Desktop / tablet grid */}
        <div className={styles.grid} role="list" aria-label="Guide profiles">
          {guides.map((g) => (
            <div key={g.id} className={styles.card} role="listitem">
              <button type="button" className={styles.cardButton} onClick={() => openGuide(g)} aria-label={`Open ${g.name} profile`}>
                <div className={styles.photoWrap}>
                  <img className={styles.photo} src={g.photo} alt={`${g.name} portrait`} loading="lazy" />
                </div>
                <div className={styles.body}>
                  <div className={styles.name}>{g.name}</div>
                  <div className={styles.line}>
                    <span className={styles.muted}>Languages</span>
                    <span>{g.languages.join(', ')}</span>
                  </div>
                  <div className={styles.line}>
                    <span className={styles.muted}>Region</span>
                    <span>{g.region}</span>
                  </div>
                  <div className={styles.descriptor}>{g.descriptor}</div>
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Mobile swipe row */}
        <div className={styles.row} role="list" aria-label="Guide profiles (swipe)">
          {guides.map((g) => (
            <div key={`${g.id}-mobile`} className={styles.card} role="listitem">
              <button type="button" className={styles.cardButton} onClick={() => openGuide(g)} aria-label={`Open ${g.name} profile`}>
                <div className={styles.photoWrap}>
                  <img className={styles.photo} src={g.photo} alt={`${g.name} portrait`} loading="lazy" />
                </div>
                <div className={styles.body}>
                  <div className={styles.name}>{g.name}</div>
                  <div className={styles.line}>
                    <span className={styles.muted}>Languages</span>
                    <span>{g.languages.join(', ')}</span>
                  </div>
                  <div className={styles.line}>
                    <span className={styles.muted}>Region</span>
                    <span>{g.region}</span>
                  </div>
                  <div className={styles.descriptor}>{g.descriptor}</div>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <GuideModal open={!!active} guide={active} onClose={closeGuide} />
    </section>
  );
}

