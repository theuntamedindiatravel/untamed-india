'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import Link from 'next/link';
import { X } from 'lucide-react';
import styles from './MakingDifference.module.css';
import { HOME_IMPACT, IMPACT_CREDITS } from '@/lib/home';
import { revealTitles, useGsap } from '@/lib/useGsap';

export default function MakingDifference() {
  const ref = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  // A slow parallax on the photograph gives the section depth as it passes.
  useGsap(ref, (g) => {
    g.fromTo('[data-parallax]', { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: ref.current, start: 'top bottom', end: 'bottom top', scrub: true } });
    revealTitles(g, ref.current);
  });

  // The explanation opens in place, so visitors never leave the homepage to read it.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <section ref={ref} className={styles.section} data-home-impact>
      <div className={styles.media} data-parallax>
        <Image src={HOME_IMPACT.image} alt={HOME_IMPACT.alt} fill sizes="100vw" className={styles.image} />
      </div>
      <div className={styles.shade} aria-hidden="true" />
      <div className={`container ${styles.content}`}>
        <h2 className={`section-title ${styles.title}`}>{HOME_IMPACT.title}</h2>
        <p className={styles.body}>{HOME_IMPACT.body}</p>
        <button ref={triggerRef} type="button" className={styles.more} onClick={() => setOpen(true)} aria-haspopup="dialog">
          How Impact Credits work
        </button>
      </div>

      {/* Rendered at the top of the page so the phone bar and back-to-top button can't sit over it */}
      {open &&
        createPortal(
        <div className={styles.backdrop} onClick={close}>
          <div
            className={styles.panel}
            role="dialog"
            aria-modal="true"
            aria-labelledby="impact-credits-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button ref={closeRef} type="button" className={styles.close} onClick={close} aria-label="Close">
              <X size={20} strokeWidth={1.5} />
            </button>
            <h3 id="impact-credits-title" className={styles.panelTitle}>
              {IMPACT_CREDITS.title}
            </h3>
            <ol className={styles.steps}>
              {IMPACT_CREDITS.points.map((p) => (
                <li key={p.title}>
                  <h4>{p.title}</h4>
                  <p>{p.body}</p>
                </li>
              ))}
            </ol>
            <Link href="/?register=1#register" className="btn btn-primary" onClick={() => setOpen(false)}>
              Plan your journey
            </Link>
          </div>
        </div>,
          document.body,
        )}
    </section>
  );
}
