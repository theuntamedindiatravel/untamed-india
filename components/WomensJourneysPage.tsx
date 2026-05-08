'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import Reveal from '@/components/motion/Reveal';
import HoverLetters from '@/components/motion/HoverLetters';
import { getWhatsAppLink } from '@/lib/whatsapp';
import {
  WOMENS_JOURNEYS_EDITORIAL_IMAGE,
  WOMENS_JOURNEYS_EMPOWER,
  WOMENS_JOURNEYS_FINAL_BG,
  WOMENS_JOURNEYS_HERO_FALLBACK,
  WOMENS_JOURNEYS_HERO_VIDEO,
  WOMENS_JOURNEYS_LEADERS,
  WOMENS_JOURNEYS_SIGNATURE,
  WOMENS_JOURNEYS_STATS,
  WOMENS_JOURNEYS_UNIQUE,
} from '@/lib/womensJourneys';

import styles from './WomensJourneysPage.module.css';

const HERO_SLIDE_MS = 5200;

function StatCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    if (reduce) {
      setN(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 2200;
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      setN(Math.floor(p * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, value, reduce]);

  return (
    <span ref={ref} className={styles.statValue}>
      {n}
      {suffix}
    </span>
  );
}

export default function WomensJourneysPage() {
  const lineRef = useRef<HTMLDivElement>(null);
  const lineInView = useInView(lineRef, { once: true, amount: 0.3 });
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [heroMode, setHeroMode] = useState<'tryVideo' | 'video' | 'slides'>('tryVideo');
  const [slide, setSlide] = useState(0);
  const [leaderIndex, setLeaderIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const titleId = useId();

  const leaders = WOMENS_JOURNEYS_LEADERS;
  const lastLeader = Math.max(0, leaders.length - 1);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;

    const fail = () => setHeroMode('slides');
    const ok = () => setHeroMode('video');
    v.addEventListener('error', fail);
    v.addEventListener('canplay', ok, { once: true });
    void v.play().catch(fail);

    return () => {
      v.removeEventListener('error', fail);
      v.removeEventListener('canplay', ok);
    };
  }, []);

  useEffect(() => {
    if (heroMode !== 'slides') return;
    const id = window.setInterval(() => {
      setSlide((s) => (s + 1) % WOMENS_JOURNEYS_HERO_FALLBACK.length);
    }, HERO_SLIDE_MS);
    return () => window.clearInterval(id);
  }, [heroMode]);

  const goLeader = useCallback(
    (dir: -1 | 1) => {
      setLeaderIndex((i) => Math.min(lastLeader, Math.max(0, i + dir)));
    },
    [lastLeader]
  );

  const finVisible = reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 };
  const finEnter = { opacity: 1, y: 0 };

  return (
    <div className={styles.page}>
      <section className={styles.hero} aria-labelledby={titleId}>
        <div className={styles.heroMedia} aria-hidden="true">
          {(heroMode === 'tryVideo' || heroMode === 'video') && (
            <video
              ref={videoRef}
              className={styles.heroVideo}
              autoPlay
              muted
              playsInline
              loop
              preload="metadata"
              poster={WOMENS_JOURNEYS_HERO_FALLBACK[0]?.src}
              aria-label="Cinematic preview of women-led travel across India"
            >
              <source src={WOMENS_JOURNEYS_HERO_VIDEO.webm} type="video/webm" />
              <source src={WOMENS_JOURNEYS_HERO_VIDEO.mp4} type="video/mp4" />
            </video>
          )}

          {heroMode === 'slides' && (
            <div className={styles.heroSlides}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide}
                  className={styles.heroSlide}
                  style={{
                    backgroundImage: `url(${WOMENS_JOURNEYS_HERO_FALLBACK[slide]?.src})`,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.2, 0, 0, 1] }}
                />
              </AnimatePresence>
            </div>
          )}
        </div>

        <div className={styles.heroVignette} />
        <div className={styles.heroGrain} />

        <div className={`container ${styles.heroInner}`}>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 32, filter: 'blur(12px)' }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1.1, ease: [0.2, 0, 0, 1], delay: 0.12 }}
          >
            <p className={styles.heroEyebrow} id={titleId}>
              Women&rsquo;s Journeys
            </p>
            <h1 className={styles.heroTitle}>
              <HoverLetters
                text="Travel India, Led by Women"
                hoverColor="#E6D3A3"
                glowColor="rgba(230, 211, 163, 0.4)"
              />
            </h1>
            <div className={styles.heroDivider} />
            <p className={styles.heroLead}>
              A fully women-led luxury journey through India&rsquo;s Golden Triangle — designed for comfort, connection, safety, and
              empowerment.
            </p>
            <Link href="#editorial" className={styles.heroCta}>
              Discover Her India
            </Link>

            {heroMode === 'slides' && (
              <div className={styles.heroDots} role="tablist" aria-label="Hero scene">
                {WOMENS_JOURNEYS_HERO_FALLBACK.map((item, i) => (
                  <button
                    key={item.src}
                    type="button"
                    className={`${styles.heroDot} ${i === slide ? styles.heroDotActive : ''}`}
                    aria-label={`Scene ${i + 1}`}
                    aria-current={i === slide}
                    onClick={() => setSlide(i)}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <section id="editorial" className={styles.editorial} aria-label="A journey designed for women">
        <div className={`container ${styles.editorialGrid}`}>
          <Reveal y={20}>
            <figure className={styles.editorialFigure}>
              <img
                className={styles.editorialImage}
                src={WOMENS_JOURNEYS_EDITORIAL_IMAGE.src}
                alt={WOMENS_JOURNEYS_EDITORIAL_IMAGE.alt}
                loading="lazy"
              />
              <span className={styles.editorialFrame} aria-hidden="true" />
            </figure>
          </Reveal>
          <div className={styles.editorialTextBlock}>
            <Reveal y={18}>
              <p className={styles.sectionKicker}>The golden triangle, reimagined</p>
            </Reveal>
            <Reveal y={20} delay={0.05}>
              <h2 className={styles.editorialTitle}>A Journey Designed for Women</h2>
            </Reveal>
            <Reveal y={16} delay={0.1}>
              <p className={styles.editorialBody}>
                A thoughtfully curated women-only luxury travel experience where every detail is hosted by women. From your arrival
                to your final farewell, travel with confidence while connecting deeply with India through female-led perspectives.
              </p>
            </Reveal>
            <div ref={lineRef} className={styles.lineWrap} aria-hidden="true">
              <motion.div
                className={styles.lineDraw}
                initial={{ scaleX: 0 }}
                animate={lineInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: reduceMotion ? 0 : 1.1, ease: [0.2, 0, 0, 1] }}
              />
            </div>
          </div>
        </div>
      </section>

      <section id="unique" className={styles.unique} aria-label="What makes this journey unique">
        <div className="container">
          <div className={styles.uniqueHead}>
            <Reveal y={16}>
              <h2 className={styles.uniqueTitle}>What Makes This Journey Unique</h2>
            </Reveal>
            <Reveal y={14} delay={0.06}>
              <p className={styles.uniqueSubtitle}>
                Luxury travel, women empowerment, cultural immersion, trust, and quiet exclusivity — held in one unbroken thread.
              </p>
            </Reveal>
          </div>
          <div className={styles.uniqueGrid} role="list">
            {WOMENS_JOURNEYS_UNIQUE.map((card, i) => (
              <Reveal key={card.title} y={22} delay={0.05 * i}>
                <article className={styles.uniqueCard} role="listitem">
                  <h3 className={styles.uniqueCardTitle}>{card.title}</h3>
                  <p className={styles.uniqueCardBody}>{card.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="signature" className={styles.signature} aria-label="Signature experiences">
        <div className="container">
          <div className={styles.signatureHead}>
            <Reveal y={16}>
              <h2 className={styles.signatureTitle}>Signature Experiences</h2>
            </Reveal>
            <Reveal y={14} delay={0.06}>
              <p className={styles.signatureLead}>
                A concise catalogue of inclusions — paced for discovery, comfort, and female-led hosting throughout the circuit.
              </p>
            </Reveal>
          </div>
          <div className={styles.signatureGrid} role="list">
            {WOMENS_JOURNEYS_SIGNATURE.map((item, index) => (
              <Reveal key={item.title} y={18} delay={0.04 * (index % 4)}>
                <article className={styles.sigCard} role="listitem">
                  <span className={styles.sigIndex} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className={styles.sigTitle}>{item.title}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="leaders" className={styles.leaders} aria-label="Meet our women leaders">
        <div className={`container ${styles.leadersInner}`}>
          <div className={styles.leadersHead}>
            <Reveal y={16}>
              <h2 className={styles.leadersTitle}>Meet Our Women Leaders</h2>
            </Reveal>
            <Reveal y={14} delay={0.06}>
              <p className={styles.leadersLead}>Female tour leaders and specialists devoted to your pace, privacy, and poise.</p>
            </Reveal>
          </div>

          <div className={styles.carousel}>
            <div className={styles.carouselViewport}>
              <div
                className={styles.carouselTrack}
                style={{ transform: `translateX(-${leaderIndex * 100}%)` }}
                role="list"
              >
                {leaders.map((L) => (
                  <article key={L.id} className={styles.leaderCard} role="listitem">
                    <img className={styles.leaderPortrait} src={L.portrait} alt={`Portrait of ${L.name}`} loading="lazy" />
                    <div>
                      <h3 className={styles.leaderName}>{L.name}</h3>
                      <p className={styles.leaderSpec}>{L.specialization}</p>
                      <p className={styles.leaderDesc}>{L.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
            {leaders.length > 1 && (
              <div className={styles.carouselNav}>
                <button
                  type="button"
                  className={styles.carouselBtn}
                  aria-label="Previous profile"
                  onClick={() => goLeader(-1)}
                  disabled={leaderIndex === 0}
                >
                  <ChevronLeft size={20} strokeWidth={1.5} />
                </button>
                <div className={styles.carouselDots}>
                  {leaders.map((L, i) => (
                    <button
                      key={L.id}
                      type="button"
                      className={`${styles.carouselDot} ${i === leaderIndex ? styles.carouselDotActive : ''}`}
                      aria-label={`Show ${L.name}`}
                      aria-current={i === leaderIndex}
                      onClick={() => setLeaderIndex(i)}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  className={styles.carouselBtn}
                  aria-label="Next profile"
                  onClick={() => goLeader(1)}
                  disabled={leaderIndex === lastLeader}
                >
                  <ChevronRight size={20} strokeWidth={1.5} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className={styles.empower} id="empower" aria-label="Travel that empowers">
        <div className={`container ${styles.empowerInner}`}>
          <Reveal y={16}>
            <h2 className={styles.empowerTitle}>Travel That Empowers</h2>
          </Reveal>
          <Reveal y={14} delay={0.05}>
            <p className={styles.empowerText}>
              {WOMENS_JOURNEYS_EMPOWER}
            </p>
          </Reveal>
          <div className={styles.statGrid} role="list">
            {WOMENS_JOURNEYS_STATS.map((s) => (
              <div key={s.label} className={styles.stat} role="listitem">
                <StatCounter value={s.value} suffix={s.suffix} />
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finale} id="plan" aria-label="Plan your journey">
        <div
          className={styles.finaleBg}
          style={{ backgroundImage: `url(${WOMENS_JOURNEYS_FINAL_BG})` }}
          role="presentation"
        />
        <div className={styles.finaleMask} />
        <div className={styles.finaleGrain} aria-hidden="true" />

        <div className={`container ${styles.finaleInner}`}>
          <motion.h2
            className={styles.finaleTitle}
            initial={finVisible}
            whileInView={finEnter}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.2, 0, 0, 1] }}
          >
            Discover India Through the Strength, Grace, and Stories of Women
          </motion.h2>
          <motion.div
            initial={finVisible}
            whileInView={finEnter}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease: [0.2, 0, 0, 1], delay: reduceMotion ? 0 : 0.1 }}
          >
            <a className={styles.finaleCta} href={getWhatsAppLink("Hi! I'd like to plan a Women's Journey (Golden Triangle).")}>
              Plan Your Women&rsquo;s Journey
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
