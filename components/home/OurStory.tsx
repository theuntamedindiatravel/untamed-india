'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './OurStory.module.css';
import { HOME_STORY } from '@/lib/home';
import { revealTitles, useGsap } from '@/lib/useGsap';

export default function OurStory() {
  const ref = useRef<HTMLElement>(null);
  useGsap(ref, (g) => revealTitles(g, ref.current));

  return (
    <section ref={ref} className={styles.section} data-home-story>
      <Image src={HOME_STORY.image} alt="" fill sizes="100vw" className={styles.backdrop} />
      <div className={styles.wash} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <h2 className="section-title">{HOME_STORY.title}</h2>
        <p className={styles.body}>{HOME_STORY.body}</p>
        <Link href={HOME_STORY.href} className={styles.more}>
          Read more
        </Link>
      </div>
    </section>
  );
}
