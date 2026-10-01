'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './MakingDifference.module.css';
import { HOME_IMPACT } from '@/lib/home';
import { revealTitles, useGsap } from '@/lib/useGsap';

export default function MakingDifference() {
  const ref = useRef<HTMLElement>(null);

  // A slow parallax on the photograph gives the section depth as it passes.
  useGsap(ref, (g) => {
    g.fromTo('[data-parallax]', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    revealTitles(g);
  });

  return (
    <section ref={ref} className={styles.section} data-home-impact>
      <div className={styles.media} data-parallax>
        <Image src={HOME_IMPACT.image} alt={HOME_IMPACT.alt} fill sizes="100vw" className={styles.image} />
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <div className={`container ${styles.content}`}>
        <h2 className={`section-title ${styles.title}`}>{HOME_IMPACT.title}</h2>
        <p className={styles.body}>{HOME_IMPACT.body}</p>
        <Link href={HOME_IMPACT.href} className={styles.more}>
          How Impact Credits work
        </Link>
      </div>
    </section>
  );
}
