'use client';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import styles from './Hero.module.css';

const HERO_SLIDES = [
  { src: '/hero-tiger.jpg' },
  { src: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=2400&q=88' },
  { src: 'https://images.unsplash.com/photo-1709620220232-12ecd7ca33a8?auto=format&fit=crop&w=2400&q=88' },
  { src: 'https://images.unsplash.com/photo-1703092289078-ff03b771237c?auto=format&fit=crop&w=2400&q=88' },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [slide, setSlide] = useState(0);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.65]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % HERO_SLIDES.length);
    }, 7800);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.bgStack} aria-hidden="true">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide}
            className={styles.bgSlide}
            style={{ backgroundImage: `url(${HERO_SLIDES[slide].src})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.35, ease: [0.2, 0, 0, 1] }}
          />
        </AnimatePresence>
      </div>

      <motion.div className={styles.overlay} style={{ opacity: overlayOpacity }} />

      <motion.div className={styles.cinematicLayer} style={{ y: bgY, scale: bgScale }} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <motion.div
          initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1.15, ease: [0.2, 0, 0, 1], delay: 0.15 }}
        >
          <div className={styles.kicker}>Luxury journeys with purpose</div>

          <h1 className={styles.headline}>The Untamed India</h1>

          <p className={styles.subtext}>
            Not just a journey through India, a quiet, meaningful contribution to the places, people, and landscapes you touch.
          </p>

          <div className={styles.actions}>
            <Link href="#discover" className={styles.discoverBtn}>
              discover
            </Link>
          </div>

          <div className={styles.heroDots}>
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.heroDot} ${i === slide ? styles.heroDotActive : ''}`}
                aria-label={`Show slide ${i + 1}`}
                aria-current={i === slide}
                onClick={() => setSlide(i)}
              />
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.2 }}
      >
        <div className={styles.scrollLine} />
        <span className={styles.scrollLabel}>Scroll to discover</span>
      </motion.div>
    </section>
  );
}
