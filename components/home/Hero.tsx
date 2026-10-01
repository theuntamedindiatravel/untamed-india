'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './Hero.module.css';
import { HERO } from '@/lib/home';
import { useGsap } from '@/lib/useGsap';
import { setHeroInView } from '@/lib/heroStore';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Tell the navbar whether the hero is still under it (rootMargin trims the 72px bar off the top).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setHeroInView(entry.isIntersecting), { rootMargin: '-72px 0px 0px 0px' });
    io.observe(el);
    return () => {
      io.disconnect();
      setHeroInView(false);
    };
  }, []);

  // First impression: the script line is written in from left to right, then the subtitle settles.
  useGsap(ref, (g) => {
    g.fromTo('h1', { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.8, ease: 'power2.inOut', delay: 0.2 });
    g.from('p', { y: 16, opacity: 0, duration: 1, ease: 'power3.out', delay: 1.1 });
  });

  return (
    <section ref={ref} className={styles.hero} data-home-hero>
      <Image src={HERO.image} alt={HERO.alt} fill preload sizes="100vw" className={styles.image} />
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.content}>
        <h1 className={styles.script}>{HERO.script}</h1>
        <p className={styles.subtitle}>{HERO.subtitle}</p>
      </div>
    </section>
  );
}
