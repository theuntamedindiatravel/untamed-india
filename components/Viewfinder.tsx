'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from './Viewfinder.module.css';

export type Exposure = { aperture: string; shutter: string; iso: number; lens: string };
export type FocusPoint = { x: number; y: number }; // centre of the subject, in % of the frame

type ViewfinderProps = {
  active: boolean;
  focus?: FocusPoint;
  exposure: Exposure;
};

const APERTURES = ['f/2.8', 'f/4', 'f/5.6', 'f/8', 'f/11'];
const SHUTTERS = ['1/250s', '1/500s', '1/1000s', '1/2000s', '1/4000s'];
const ISOS = [100, 400, 800, 1600, 3200];
const pick = <T,>(list: T[]) => list[Math.floor(Math.random() * list.length)];

/**
 * A camera viewfinder laid over a photograph: corner brackets close in, the focus box hunts then locks
 * onto the subject, and the exposure readout meters before settling. Purely decorative (aria-hidden,
 * pointer-events: none). With reduced motion it appears already locked, with no hunting.
 */
export default function Viewfinder({ active, focus = { x: 50, y: 45 }, exposure }: ViewfinderProps) {
  const focusRef = useRef<HTMLSpanElement>(null);
  const apertureRef = useRef<HTMLSpanElement>(null);
  const shutterRef = useRef<HTMLSpanElement>(null);
  const isoRef = useRef<HTMLSpanElement>(null);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const box = focusRef.current;
    const settle = () => {
      if (apertureRef.current) apertureRef.current.textContent = exposure.aperture;
      if (shutterRef.current) shutterRef.current.textContent = exposure.shutter;
      if (isoRef.current) isoRef.current.textContent = `ISO ${exposure.iso}`;
    };
    if (!box) return;
    if (!active) {
      setLocked(false);
      gsap.to(box, { opacity: 0, duration: 0.2, overwrite: true });
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      settle();
      setLocked(true);
      return;
    }

    setLocked(false);
    // Metering: the readout flickers through values, then settles on this photograph's exposure.
    const meter = { t: 0 };
    const metering = gsap.to(meter, {
      t: 1,
      duration: 0.7,
      ease: 'none',
      onUpdate: () => {
        if (apertureRef.current) apertureRef.current.textContent = pick(APERTURES);
        if (shutterRef.current) shutterRef.current.textContent = pick(SHUTTERS);
        if (isoRef.current) isoRef.current.textContent = `ISO ${pick(ISOS)}`;
      },
      onComplete: settle,
    });
    // Focus hunt: overshoot, pull back, a small search, then lock.
    const hunt = gsap
      .timeline({ onComplete: () => setLocked(true) })
      .fromTo(box, { scale: 1.45, xPercent: -50, yPercent: -50, x: 0, opacity: 0 }, { scale: 0.86, opacity: 1, duration: 0.35, ease: 'power2.out' })
      .to(box, { scale: 1.08, x: 6, duration: 0.18, ease: 'power1.inOut' })
      .to(box, { scale: 0.96, x: -4, duration: 0.16, ease: 'power1.inOut' })
      .to(box, { scale: 1, x: 0, duration: 0.2, ease: 'power2.out' });

    return () => {
      metering.kill();
      hunt.kill();
    };
  }, [active, exposure]);

  return (
    <div className={styles.vf} data-viewfinder data-active={active || undefined} aria-hidden="true">
      <span className={styles.thirds} />
      <span className={`${styles.corner} ${styles.tl}`} />
      <span className={`${styles.corner} ${styles.tr}`} />
      <span className={`${styles.corner} ${styles.bl}`} />
      <span className={`${styles.corner} ${styles.br}`} />
      <span
        ref={focusRef}
        className={styles.focus}
        data-focus
        data-locked={locked || undefined}
        style={{ left: `${focus.x}%`, top: `${focus.y}%` }}
      />
      <span className={styles.af} data-locked={locked || undefined}>
        <i /> AF-C
      </span>
      <div className={styles.readout} data-readout>
        <span ref={apertureRef}>{exposure.aperture}</span>
        <span ref={shutterRef}>{exposure.shutter}</span>
        <span ref={isoRef}>ISO {exposure.iso}</span>
        <span>{exposure.lens}</span>
      </div>
    </div>
  );
}
