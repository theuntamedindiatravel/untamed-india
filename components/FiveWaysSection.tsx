'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './FiveWaysSection.module.css';

// Footage: free Pexels clips (pexels.com/license — commercial use, no credit required),
// cut into silent 9:16 loops in public/videos/five-ways. Pexels video IDs:
// witness 35437372 · create 34877623 · listen 31310215 · savour 28283517 · breathe 38246027
// Each clip ships as 1080 (wide screens) and 720 (phones), in 10-bit AV1 with an H.264 fallback;
// the browser takes the first <source> whose media query and codec it supports.
const CLIP_DIR = '/videos/five-ways';
const DESKTOP = '(min-width: 900px)';
const WAYS = [
  { clip: 'witness', verb: 'Witness', caption: 'A Bengal tiger on a forest road in India.', storyId: 'feel-witness' },
  { clip: 'create', verb: 'Create', caption: 'Hand block printing, one careful press at a time.', storyId: 'feel-create' },
  { clip: 'listen', verb: 'Listen', caption: 'Temple bells on a bridge in the Indian Himalayas.', storyId: 'feel-listen' },
  { clip: 'savour', verb: 'Savour', caption: 'Cardamom, star anise and the spices of an Indian kitchen.', storyId: 'feel-savour' },
  { clip: 'breathe', verb: 'Breathe', caption: 'Cloud shadows drifting over the high Himalaya.', storyId: 'feel-breathe' },
] as const;

type Way = (typeof WAYS)[number];

type FiveWaysSectionProps = {
  onOpenStory: (storyId: string) => void;
};

export default function FiveWaysSection({ onOpenStory }: FiveWaysSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [stillsOnly, setStillsOnly] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setStillsOnly(window.matchMedia('(prefers-reduced-motion: reduce)').matches || connection?.saveData === true);
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  // Clips only ever play while the section is on screen.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.intersectionRatio >= 0.25;
        setInView(visible);
        if (visible) setRevealed(true);
      },
      { threshold: [0, 0.25] },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  // Without hover (phones), the panel centred in the swipe row is the active one.
  useEffect(() => {
    const row = rowRef.current;
    if (canHover || !row || row.scrollWidth <= row.clientWidth) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.intersectionRatio >= 0.6) setActive((entry.target as HTMLElement).dataset.clip ?? null);
        }
      },
      { root: row, threshold: [0, 0.6] },
    );
    row.querySelectorAll<HTMLElement>('[data-clip]').forEach((panel) => io.observe(panel));
    return () => io.disconnect();
  }, [canHover]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="five-ways-title"
      data-revealed={revealed || undefined}
    >
      <div className={styles.header}>
        <h2 id="five-ways-title" className={styles.eyebrow}>
          Five ways to feel India
        </h2>
        <p className={styles.hint}>
          <span className={styles.hintHover}>Hover to watch · click to read the story</span>
          <span className={styles.hintTouch}>Swipe to explore · tap to read the story</span>
        </p>
      </div>

      <div
        ref={rowRef}
        className={styles.row}
        data-has-active={active ? true : undefined}
        onMouseLeave={() => {
          if (canHover) setActive(null);
        }}
      >
        {WAYS.map((way, i) => (
          <WayPanel
            key={way.clip}
            way={way}
            index={i}
            active={active === way.clip}
            play={inView && !stillsOnly && active === way.clip}
            onActivate={() => setActive(way.clip)}
            onDeactivate={() => {
              if (canHover) setActive((current) => (current === way.clip ? null : current));
            }}
            onHover={() => {
              if (canHover) setActive(way.clip);
            }}
            onOpen={() => onOpenStory(way.storyId)}
          />
        ))}
      </div>
    </section>
  );
}

type WayPanelProps = {
  way: Way;
  index: number;
  active: boolean;
  play: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  onHover: () => void;
  onOpen: () => void;
};

function WayPanel({ way, index, active, play, onActivate, onDeactivate, onHover, onOpen }: WayPanelProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (play) {
      // Browsers only allow unprompted playback when muted; set the property explicitly
      // rather than relying on the attribute surviving hydration.
      video.muted = true;
      video.play().catch(() => {
        // Playback refused (e.g. low-power mode) — the still frame simply stays.
      });
    } else {
      video.pause();
    }
  }, [play]);

  return (
    <button
      type="button"
      className={styles.panel}
      style={{ '--i': index } as React.CSSProperties}
      data-clip={way.clip}
      data-active={active || undefined}
      aria-label={`${way.verb}. ${way.caption} Read the story.`}
      onClick={onOpen}
      onMouseEnter={onHover}
      onFocus={onActivate}
      onBlur={onDeactivate}
    >
      <img
        className={styles.still}
        src={`${CLIP_DIR}/${way.clip}-720.webp`}
        srcSet={`${CLIP_DIR}/${way.clip}-720.webp 720w, ${CLIP_DIR}/${way.clip}-1080.webp 1080w`}
        sizes={`${DESKTOP} 40vw, 78vw`}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <video
        ref={videoRef}
        className={styles.video}
        data-playing={playing || undefined}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
        onPlaying={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        <source media={DESKTOP} src={`${CLIP_DIR}/${way.clip}-1080.av1.mp4`} type='video/mp4; codecs="av01.0.08M.10"' />
        <source media={DESKTOP} src={`${CLIP_DIR}/${way.clip}-1080.mp4`} type='video/mp4; codecs="avc1.640028"' />
        <source src={`${CLIP_DIR}/${way.clip}-720.av1.mp4`} type='video/mp4; codecs="av01.0.05M.10"' />
        <source src={`${CLIP_DIR}/${way.clip}-720.mp4`} type='video/mp4; codecs="avc1.64001F"' />
      </video>
      <span className={styles.shade} aria-hidden="true" />
      <span className={styles.text} aria-hidden="true">
        <span className={styles.index}>{String(index + 1).padStart(2, '0')}</span>
        <span className={styles.verb}>{way.verb}</span>
        <span className={styles.more}>
          <span className={styles.caption}>{way.caption}</span>
          <span className={styles.cue}>Read the story</span>
        </span>
      </span>
    </button>
  );
}
