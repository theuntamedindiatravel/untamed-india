'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Car, Crown, Headphones, Languages, Plane, Sparkles } from 'lucide-react';

import Reveal from '@/components/motion/Reveal';
import {
  HERO_SLIDESHOW_IMAGES,
  LUXURY_HOTEL_FILTERS,
  LUXURY_HOTELS,
  type LuxuryHotelFilter,
} from '@/lib/luxuryHotels';

import styles from './LuxuryHotelsPage.module.css';

const REGION_SORT = [
  'Rajasthan',
  'Delhi',
  'Agra',
  'Wildlife',
  'Himalayas',
  'Himalayas / Wellness',
  'South India',
];

const WHY_ITEMS = [
  {
    icon: Crown,
    title: 'Curated luxury partnerships',
    body: 'Relationships forged over years — not mass-market allocations.',
  },
  {
    icon: Languages,
    title: 'French-speaking expert assistance',
    body: 'Dedicated support for guests who prefer French — alongside fluent English coverage.',
  },
  {
    icon: Sparkles,
    title: 'Personalised itinerary design',
    body: 'Routing, pacing, and reveals tailored to how you like to travel.',
  },
  {
    icon: Plane,
    title: 'VIP arrival experiences',
    body: 'Warm welcomes, calm transfers, and seamless first impressions.',
  },
  {
    icon: Car,
    title: 'Private transfers',
    body: 'Chauffeured comfort between cities, airstrips, and wilderness.',
  },
  {
    icon: Headphones,
    title: '24/7 travel concierge',
    body: 'One composed point of contact — before, during, and after your journey.',
  },
];

export default function LuxuryHotelsPage() {
  const [slide, setSlide] = useState(0);
  const [filter, setFilter] = useState<LuxuryHotelFilter>('all');
  const ctaRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  });
  const ctaParallax = useTransform(scrollYProgress, [0, 1], [42, -42]);

  useEffect(() => {
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % HERO_SLIDESHOW_IMAGES.length);
    }, 7800);
    return () => window.clearInterval(id);
  }, []);

  const filteredHotels = useMemo(() => {
    const list = LUXURY_HOTELS.filter((h) => filter === 'all' || h.filters.includes(filter));
    return [...list].sort((a, b) => {
      const ia = REGION_SORT.indexOf(a.regionLabel);
      const ib = REGION_SORT.indexOf(b.regionLabel);
      const da = ia === -1 ? 99 : ia;
      const db = ib === -1 ? 99 : ib;
      if (da !== db) return da - db;
      return a.name.localeCompare(b.name);
    });
  }, [filter]);

  const segments = useMemo(() => {
    const out: { region: string; hotels: typeof filteredHotels }[] = [];
    for (const h of filteredHotels) {
      const last = out[out.length - 1];
      if (!last || last.region !== h.regionLabel) {
        out.push({ region: h.regionLabel, hotels: [h] });
      } else {
        last.hotels.push(h);
      }
    }
    return out;
  }, [filteredHotels]);

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-label="Luxury hotels hero">
        <div className={styles.heroSlides} aria-hidden="true">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              className={styles.heroSlide}
              style={{ backgroundImage: `url(${HERO_SLIDESHOW_IMAGES[slide].src})` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.35, ease: [0.2, 0, 0, 1] }}
            />
          </AnimatePresence>
        </div>
        <div className={styles.heroVignette} />
        <div className={styles.heroGrain} />

        <div className={`container ${styles.heroInner}`}>
          <motion.div
            initial={{ opacity: 0, y: 28, filter: 'blur(12px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.15, ease: [0.2, 0, 0, 1], delay: 0.15 }}
          >
            <p className={styles.heroLabel}>The Finest Stays Across the Indian Subcontinent</p>
            <h1 className={styles.heroTitle}>India&apos;s Most Extraordinary Luxury Stays</h1>
            <div className={styles.heroDivider} />
            <p className={styles.heroLead}>
              Curated residences, palaces and retreats where hospitality becomes an art form.
            </p>
            <Link href="#collection" className={styles.heroCta}>
              Explore Collection
            </Link>

            <div className={styles.heroDots}>
              {HERO_SLIDESHOW_IMAGES.map((item, i) => (
                <button
                  key={item.src}
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
      </section>

      <section className={styles.intro} aria-label="Introduction">
        <div className={styles.introInner}>
          <Reveal y={18}>
            <div className={styles.introRule} />
          </Reveal>
          <Reveal y={22}>
            <p className={styles.introText}>
              Our handpicked collection of luxury hotels across India reflects the highest standards of elegance, heritage,
              privacy and personalised service. From royal palaces in Rajasthan to serene Himalayan wellness retreats, every
              stay is chosen to elevate the journey.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="collection" className={styles.collection} aria-label="Hotel collection">
        <Reveal y={16}>
          <p className={styles.sectionKicker}>Luxury Hotels</p>
        </Reveal>
        <Reveal y={18}>
          <h2 className={styles.sectionTitle}>Residences Worth Crossing the World For</h2>
        </Reveal>
        <Reveal y={18}>
          <p className={styles.sectionSubtitle}>
            An editorial selection — crafted like a private portfolio, not a booking grid.
          </p>
        </Reveal>

        <Reveal y={14}>
          <div className={styles.filterBar} role="tablist" aria-label="Filter hotels">
            {LUXURY_HOTEL_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                className={`${styles.filterBtn} ${filter === f.id ? styles.filterBtnActive : ''}`}
                onClick={() => setFilter(f.id)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {segments.map((seg) => (
          <div key={seg.region} className={styles.regionBlock}>
            <Reveal y={14}>
              <h3 className={styles.regionHeading}>{seg.region}</h3>
            </Reveal>
            <div className={styles.collectionGrid}>
              {seg.hotels.map((hotel) => (
                <Reveal key={hotel.id} y={26}>
                  <article className={styles.hotelCard}>
                    <div className={styles.imageMask}>
                      <img src={hotel.image} alt="" loading="lazy" />
                      <div className={styles.goldWash} aria-hidden />
                    </div>
                    <div className={styles.cardBody}>
                      <h4 className={styles.hotelName}>{hotel.name}</h4>
                      <p className={styles.hotelDest}>{hotel.destination}</p>
                      <p className={styles.hotelDesc}>{hotel.description}</p>

                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Room categories</span>
                        <div className={styles.roomList}>
                          {hotel.roomCategories.map((r) => (
                            <span key={r} className={styles.roomChip}>
                              {r}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className={styles.metaRow}>
                        <span className={styles.metaLabel}>Signature experience</span>
                        <p className={styles.signature}>{hotel.signatureExperience}</p>
                      </div>

                      <div className={styles.cardActions}>
                        <Link
                          href={`/contact?topic=luxury-hotel&hotel=${encodeURIComponent(hotel.name)}`}
                          className={styles.viewBtn}
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        ))}
      </section>

      <section className={styles.why} aria-label="Why book with us">
        <Reveal y={16}>
          <p className={styles.sectionKicker}>Why book with us</p>
        </Reveal>
        <Reveal y={18}>
          <h2 className={styles.sectionTitle}>The Quiet Difference</h2>
        </Reveal>
        <Reveal y={18}>
          <p className={styles.sectionSubtitle}>
            We curate stays the way a gallery curates a collection — with restraint, taste, and intent.
          </p>
        </Reveal>

        <div className={styles.whyGrid}>
          {WHY_ITEMS.map((item, i) => (
            <Reveal key={item.title} y={20} delay={i * 0.06}>
              <div className={styles.whyCard}>
                <div className={styles.whyIcon}>
                  <item.icon size={20} strokeWidth={1.6} />
                </div>
                <h3 className={styles.whyTitle}>{item.title}</h3>
                <p className={styles.whyBody}>{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section ref={ctaRef} className={styles.finalCta} aria-label="Design your journey">
        <motion.div
          className={styles.finalBg}
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1695956353120-54ce5e91632b?auto=format&fit=crop&w=2400&q=88)',
            y: ctaParallax,
          }}
          aria-hidden
        />
        <div className={styles.finalOverlay} />
        <div className={`container ${styles.finalInner}`}>
          <Reveal y={22}>
            <div className={styles.finalRule} />
          </Reveal>
          <Reveal y={24}>
            <h2 className={styles.finalTitle}>Craft Your Bespoke Indian Escape</h2>
          </Reveal>
          <Reveal y={18}>
            <Link href="/contact?topic=bespoke-journey" className={styles.finalBtn}>
              Design My Journey
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
