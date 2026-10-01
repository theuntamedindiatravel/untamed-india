'use client';
import { useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import styles from './DestinationsCarousel.module.css';
import { HOME_DESTINATIONS } from '@/lib/home';
import { revealTitles, useGsap } from '@/lib/useGsap';

const COUNT = HOME_DESTINATIONS.length;
// Shortest signed distance from the active card: 0 = centre, ±1 = peeking neighbours, beyond that hidden.
const offset = (i: number, active: number) => ((i - active + COUNT + Math.floor(COUNT / 2)) % COUNT) - Math.floor(COUNT / 2);

export default function DestinationsCarousel() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const dragStart = useRef<number | null>(null);
  useGsap(ref, (g) => revealTitles(g));

  const step = (by: number) => setActive((a) => (a + by + COUNT) % COUNT);

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') step(1);
    if (e.key === 'ArrowLeft') step(-1);
  };
  const onPointerDown = (e: PointerEvent) => {
    dragStart.current = e.clientX;
  };
  const onPointerUp = (e: PointerEvent) => {
    if (dragStart.current === null) return;
    const dx = e.clientX - dragStart.current;
    dragStart.current = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  };

  return (
    <section ref={ref} id="destinations" className={styles.section}>
      <h2 className="section-title">Our Destinations</h2>

      <div
        className={styles.stage}
        role="region"
        aria-roledescription="carousel"
        aria-label="Our destinations"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => (dragStart.current = null)}
      >
        {HOME_DESTINATIONS.map((dest, i) => {
          const d = offset(i, active);
          const isActive = d === 0;
          return (
            <div
              key={dest.id}
              className={styles.card}
              style={{ '--d': d } as CSSProperties}
              data-active={isActive || undefined}
              data-near={Math.abs(d) === 1 || undefined}
              aria-hidden={!isActive}
              onClick={isActive ? undefined : () => setActive(i)}
            >
              <Image src={dest.image} alt={dest.alt} fill sizes="(max-width: 768px) 82vw, 56vw" className={styles.image} draggable={false} />
              <div className={styles.caption}>
                <span className={styles.name} data-name>{dest.name}</span>
                <span className={styles.line}>{dest.line}</span>
              </div>
              {isActive && <Link href={dest.href} className={styles.cover} aria-label={`Explore ${dest.name}`} draggable={false} />}
            </div>
          );
        })}

        <button type="button" className={`${styles.arrow} ${styles.prev}`} onClick={() => step(-1)} aria-label="Previous destination">
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>
        <button type="button" className={`${styles.arrow} ${styles.next}`} onClick={() => step(1)} aria-label="Next destination">
          <ArrowRight size={20} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  );
}
