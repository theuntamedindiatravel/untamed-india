'use client';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './GuestStories.module.css';
import { testimonials } from '@/lib/data';
import { revealTitles, useGsap } from '@/lib/useGsap';

/** Guests' own words, shortened to a glance: cut at the last full sentence that fits, else at a word, never reworded. */
export function excerpt(text: string, maxChars = 240): string {
  if (text.length <= maxChars) return text;
  const head = text.slice(0, maxChars);
  const sentenceEnd = Math.max(head.lastIndexOf('. '), head.lastIndexOf('! '), head.lastIndexOf('? '));
  if (sentenceEnd > maxChars / 2) return `${text.slice(0, sentenceEnd + 1)} …`;
  return `${head.slice(0, head.lastIndexOf(' '))}…`;
}

const pad = (n: number) => String(n).padStart(2, '0');

export default function GuestStories() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const count = testimonials.length;
  const go = (step: number) => setIndex((i) => (i + step + count) % count);
  useGsap(ref, (g) => revealTitles(g, ref.current));

  return (
    <section ref={ref} className={`jaali ${styles.section}`} data-home-guests aria-roledescription="carousel" aria-label="What our guests say">
      <div className="container">
        <h2 className="section-title">What our guests say</h2>

        {/* All quotes share one grid cell, so the block keeps the height of the longest and never jumps */}
        <div className={styles.slides} aria-live="polite">
          {testimonials.map((t, i) => (
            <figure key={t.id} className={styles.slide} data-active={i === index || undefined} aria-hidden={i !== index}>
              <blockquote className={styles.quote}>“{excerpt(t.text)}”</blockquote>
              <figcaption className={styles.caption}>
                <span className={styles.name}>{t.name}</span>
                <span className={styles.meta}>
                  {t.role}, {t.tour}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className={styles.controls}>
          <button type="button" className={styles.arrow} onClick={() => go(-1)} aria-label="Previous guest story">
            <ArrowLeft size={18} strokeWidth={1.5} />
          </button>
          <span className={styles.counter} aria-hidden="true">
            {pad(index + 1)} / {pad(count)}
          </span>
          <button type="button" className={styles.arrow} onClick={() => go(1)} aria-label="Next guest story">
            <ArrowRight size={18} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </section>
  );
}
