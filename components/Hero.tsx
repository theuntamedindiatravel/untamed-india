'use client';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import styles from './Hero.module.css';

export default function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.65]);

  return (
    <section className={styles.hero} ref={heroRef}>
      <motion.div 
        className={styles.bgStack}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div 
          className={styles.bgSlide} 
          style={{ backgroundImage: `url(/hero-tiger.jpg)` }}
        />
      </motion.div>

      <motion.div className={styles.overlay} style={{ opacity: overlayOpacity }} />

      <motion.div className={styles.cinematicLayer} style={{ y: bgY, scale: bgScale }} aria-hidden="true" />

      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.kicker}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          Luxury journeys with purpose
        </motion.div>

        <motion.h1
          className={styles.headline}
          initial={{ y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          The Untamed India
        </motion.h1>

        <motion.p 
          className={styles.subtext}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          Not just a journey through India, a quiet, meaningful contribution to the places, people, and landscapes you touch.
        </motion.p>

        <motion.div 
          className={styles.actions}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.85 }}
        >
          <Link href="#discover" className={styles.discoverBtn}>
            discover
          </Link>
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
