'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import styles from './PhotographyJourneys.module.css';
import { getWhatsAppLink } from '@/lib/whatsapp';
import { revealTitles, useGsap } from '@/lib/useGsap';
import Viewfinder from '@/components/Viewfinder';
import {
  CUSTOM_EXPEDITIONS,
  PHOTO_DIFFERENCE,
  PHOTO_INTRO,
  PHOTO_JOURNEYS,
  SHORT_EXPERIENCES,
  type PhotoJourney,
} from '@/lib/photographyJourneys';

const enquire = (title: string) => getWhatsAppLink(`Hi! I'd like to know more about the ${title} photography journey.`);
const KEY_SPECIES = 5;

function JourneyCard({ journey, index }: { journey: PhotoJourney; index: number }) {
  const [open, setOpen] = useState(false);
  const [looking, setLooking] = useState(false); // viewfinder up
  const [firing, setFiring] = useState(false); // shutter flash
  const mediaRef = useRef<HTMLDivElement>(null);

  // Without a mouse there is no hover: raise the viewfinder while the photo is well in view instead.
  useEffect(() => {
    const el = mediaRef.current;
    if (!el || window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const io = new IntersectionObserver(([entry]) => setLooking(entry.intersectionRatio >= 0.6), { threshold: [0, 0.6] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!firing) return;
    const t = window.setTimeout(() => setFiring(false), 450);
    return () => window.clearTimeout(t);
  }, [firing]);
  const flagship = index === PHOTO_JOURNEYS.length - 1;
  const detailsId = `${journey.id}-details`;
  const allSpecies = journey.focus.flatMap((g) => g.species);

  return (
    <article
      className={styles.card}
      data-journey
      data-flagship={flagship || undefined}
      onFocus={() => setLooking(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setLooking(false);
      }}
    >
      <div
        ref={mediaRef}
        className={styles.media}
        data-shutter
        data-looking={looking || undefined}
        data-firing={firing || undefined}
        onPointerEnter={(e) => e.pointerType === 'mouse' && setLooking(true)}
        onPointerLeave={(e) => e.pointerType === 'mouse' && setLooking(false)}
      >
        <div className={styles.lens} data-lens>
          <Image src={journey.image} alt={journey.alt} fill sizes={flagship ? '(max-width: 900px) 100vw, 1100px' : '(max-width: 900px) 100vw, 560px'} className={styles.image} />
        </div>
        <Viewfinder active={looking} focus={journey.focusPoint} exposure={journey.exposure} />
        <span className={styles.flash} aria-hidden="true" />
        <span className={styles.number}>{String(index + 1).padStart(2, '0')}</span>
        {flagship && <span className={styles.flag}>Flagship journey</span>}
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{journey.title}</h3>
        <p className={styles.subtitle}>{journey.subtitle}</p>

        <dl className={styles.meta}>
          <div>
            <dt>Duration</dt>
            <dd>{journey.duration}</dd>
          </div>
          <div>
            <dt>Route</dt>
            <dd>{journey.route}</dd>
          </div>
          <div>
            <dt>Best season</dt>
            <dd>{journey.season}</dd>
          </div>
        </dl>

        <ul className={styles.chips} aria-label="Key species">
          {allSpecies.slice(0, KEY_SPECIES).map((s) => (
            <li key={s}>{s}</li>
          ))}
          {allSpecies.length > KEY_SPECIES && <li className={styles.more}>+{allSpecies.length - KEY_SPECIES} more</li>}
        </ul>

        <div className={styles.actions}>
          <button type="button" className={styles.toggle} aria-expanded={open} aria-controls={detailsId} onClick={() => {
              setFiring(true);
              setOpen((v) => !v);
            }}>
            {open ? 'Hide details' : 'View details'}
            <ChevronDown size={16} strokeWidth={1.5} aria-hidden="true" data-open={open || undefined} />
          </button>
          <a className="btn btn-primary" href={enquire(journey.title)} target="_blank" rel="noreferrer">
            Plan this journey
          </a>
        </div>

        <div className={styles.collapse} data-open={open || undefined}>
          <div id={detailsId} className={styles.collapseInner} data-details inert={!open}>
            <div className={styles.details}>
          {journey.intro.map((p) => (
            <p key={p}>{p}</p>
          ))}

          {journey.encounters && (
            <div className={styles.block}>
              <h4>The Four Great Encounters</h4>
              <ul className={styles.encounters}>
                {journey.encounters.map((e) => (
                  <li key={e.place}>
                    <strong>{e.place}</strong>
                    <span>{e.species}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className={styles.block}>
            <h4>Photography focus</h4>
            {journey.focus.map((g) => (
              <div key={g.place ?? 'all'}>
                {g.place && <p className={styles.place}>{g.place}</p>}
                <ul className={styles.columns}>
                  {g.species.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.block}>
            <h4>Highlights</h4>
            <ul className={styles.columns}>
              {journey.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>

          {journey.stay && (
            <p className={styles.fact}>
              <span>Suggested stay</span>
              {journey.stay}
            </p>
          )}
          {journey.idealFor && (
            <p className={styles.fact}>
              <span>Ideal for</span>
              {journey.idealFor}
            </p>
          )}
          {journey.note && (
            <p className={styles.note}>
              <strong>Important note.</strong> {journey.note}
            </p>
          )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function PhotographyJourneys() {
  const ref = useRef<HTMLDivElement>(null);

  useGsap(ref, (g, ScrollTrigger) => {
    const root = ref.current;
    if (!root) return;
    const all = (sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));
    revealTitles(g, root);

    // Journey cards rise in row by row; each photo opens like a shutter, then the lens settles.
    const cards = all('[data-journey]');
    g.set(cards, { opacity: 0, y: 48 });
    ScrollTrigger.batch(cards, {
      start: 'top 88%',
      once: true,
      onEnter: (batch) => {
        g.to(batch, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.14 });
        batch.forEach((card, i) => {
          const shutter = card.querySelector('[data-shutter]');
          const lens = card.querySelector('[data-lens]');
          g.fromTo(shutter, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.25, ease: 'power3.inOut', delay: 0.1 + i * 0.14 });
          g.fromTo(lens, { scale: 1.14 }, { scale: 1, duration: 1.8, ease: 'power2.out', delay: 0.1 + i * 0.14 });
        });
      },
    });

    // Short experiences follow the same rhythm.
    const shorts = all('[data-short]');
    g.set(shorts, { opacity: 0, y: 32 });
    ScrollTrigger.batch(shorts, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) => g.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 }),
    });

    // Combination pills appear one after another, like options being laid out.
    const combos = all('[data-combo]');
    if (combos.length) {
      g.from(combos, {
        opacity: 0,
        scale: 0.86,
        duration: 0.6,
        ease: 'back.out(1.6)',
        stagger: 0.07,
        scrollTrigger: { trigger: combos[0].parentElement, start: 'top 85%', once: true },
      });
    }

    // Each Difference point draws its gold rule, then its words follow.
    all('[data-difference]').forEach((point) => {
      const rule = point.querySelector('[data-rule]');
      const text = point.querySelectorAll('h3, p');
      const tl = g.timeline({ scrollTrigger: { trigger: point, start: 'top 90%', once: true } });
      tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }).from(text, { opacity: 0, y: 14, duration: 0.7, ease: 'power3.out', stagger: 0.08 }, '-=0.35');
    });
  });

  return (
    <div ref={ref} className={styles.wrap} data-photo-journeys>
      <section className={`container ${styles.intro}`}>
        <h2 className="section-title">{PHOTO_INTRO.title}</h2>
        <p className={styles.lede}>{PHOTO_INTRO.subtitle}</p>
        {PHOTO_INTRO.paragraphs.map((p) => (
          <p key={p} className={styles.paragraph}>
            {p}
          </p>
        ))}
      </section>

      <section className="container" aria-label="Photography journeys">
        <div className={styles.grid}>
          {PHOTO_JOURNEYS.map((j, i) => (
            <JourneyCard key={j.id} journey={j} index={i} />
          ))}
        </div>
      </section>

      <section className={`container ${styles.shortSection}`} aria-labelledby="short-experiences">
        <h2 id="short-experiences" className="section-title">
          Optional Short Photography Experiences
        </h2>
        <div className={styles.shortGrid}>
          {SHORT_EXPERIENCES.map((s) => (
            <article key={s.id} className={styles.short} data-short>
              <h3 className={styles.shortTitle}>{s.title}</h3>
              <p className={styles.shortMeta}>
                {s.duration}
                <br />
                {s.route}
              </p>
              {s.intro && <p className={styles.shortIntro}>{s.intro}</p>}
              <ul className={styles.chips} aria-label="Focus">
                {s.focus.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <a className={styles.textLink} href={enquire(s.title)} target="_blank" rel="noreferrer">
                Add to a journey
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.custom} aria-labelledby="custom-expeditions">
        <div className="container">
          <h2 id="custom-expeditions" className={`section-title ${styles.customTitle}`}>
            {CUSTOM_EXPEDITIONS.title}
          </h2>
          <p className={styles.customTagline}>{CUSTOM_EXPEDITIONS.tagline}</p>
          <p className={styles.customIntro}>{CUSTOM_EXPEDITIONS.intro}</p>
          <ul className={styles.combos}>
            {CUSTOM_EXPEDITIONS.combinations.map((c) => (
              <li key={c} data-combo>
                {c}
              </li>
            ))}
          </ul>
          <p className={styles.adjustLabel}>Every itinerary can be adjusted according to:</p>
          <ul className={styles.adjust}>
            {CUSTOM_EXPEDITIONS.adjustable.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <a className={`btn btn-primary ${styles.customCta}`} href={enquire('private custom wildlife')} target="_blank" rel="noreferrer">
            Plan a private expedition
          </a>
        </div>
      </section>

      <section className={`container ${styles.difference}`} aria-labelledby="photo-difference">
        <h2 id="photo-difference" className="section-title">
          {PHOTO_DIFFERENCE.title}
        </h2>
        <div className={styles.points}>
          {PHOTO_DIFFERENCE.points.map((p) => (
            <div key={p.title} className={styles.point} data-difference>
              <span className={styles.rule} data-rule aria-hidden="true" />
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
