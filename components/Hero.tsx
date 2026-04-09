'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from './Hero.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <motion.div 
        className={styles.bgStack}
        initial={{ scale: 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <div 
          className={styles.bgSlide} 
          style={{ backgroundImage: `url(https://images.unsplash.com/photo-1519681393784-d120267933ba?w=2200&q=85)` }}
        />
      </motion.div>

      <div className={styles.overlay} />

      <div className={`container ${styles.content}`}>
        <motion.div
          className={styles.kicker}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.25 }}
        >
          The Untamed India
          <span className={styles.kickerDot}>•</span>
          Luxury journeys with purpose
        </motion.div>

        <motion.h1
          className={styles.headline}
          initial={{ y: 26, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
        >
          Travel that <em>Gives Back</em>
        </motion.h1>

        <motion.p 
          className={styles.subtext}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        >
          Not just a journey through India — a quiet, meaningful contribution to the places, people, and landscapes you touch.
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
