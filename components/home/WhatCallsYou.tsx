'use client';
import { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './WhatCallsYou.module.css';
import { HOME_INTERESTS } from '@/lib/home';
import { revealTitles, useGsap } from '@/lib/useGsap';

export default function WhatCallsYou() {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useGsap(ref, (g) => revealTitles(g));
  const current = HOME_INTERESTS[active];

  return (
    <section ref={ref} className={`jaali ${styles.section}`} data-home-interests>
      <div className="container">
        <h2 className="section-title">What calls you?</h2>

        <div className={styles.grid}>
          <ul className={styles.list} data-interest-list>
            {HOME_INTERESTS.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={styles.item}
                  aria-pressed={i === active}
                  aria-controls="interest-card"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          <div id="interest-card" className={styles.card} aria-live="polite">
            {/* All photos stay mounted so switching is an instant cross-fade */}
            {HOME_INTERESTS.map((item, i) => (
              <Image
                key={item.id}
                src={item.image}
                alt={i === active ? item.alt : ''}
                fill
                sizes="(max-width: 900px) 100vw, 46vw"
                className={styles.image}
                data-active={i === active || undefined}
              />
            ))}
            <div key={current.id} className={styles.caption}>
              <h3 className={styles.title} data-card-title>
                {current.title}
              </h3>
              <p className={styles.body}>{current.body}</p>
              <Link href={current.href} className={styles.more}>
                View all
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
