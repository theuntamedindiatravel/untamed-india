'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Pause, Play } from 'lucide-react';
import styles from './VideoGallery.module.css';

// Wide (16:9) cuts of the Five Ways Pexels clips; see public/videos/five-ways-wide.
const DIR = '/videos/five-ways-wide';
const FILMS = [
  { id: 'witness', verb: 'Witness', caption: 'A Bengal tiger on a forest road in India.' },
  { id: 'create', verb: 'Create', caption: 'Hand block printing, one careful press at a time.' },
  { id: 'listen', verb: 'Listen', caption: 'Temple bells on a bridge in the Indian Himalayas.' },
  { id: 'savour', verb: 'Savour', caption: 'Cardamom, star anise and the spices of an Indian kitchen.' },
  { id: 'breathe', verb: 'Breathe', caption: 'Cloud shadows drifting over the high Himalaya.' },
] as const;

type VideoGalleryProps = {
  onOpenStory: (storyId: string) => void;
};

export default function VideoGallery({ onOpenStory }: VideoGalleryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [playing, setPlaying] = useState(false);
  const film = FILMS[active];

  // Only play while the gallery is on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio >= 0.4), { threshold: [0, 0.4] });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (visible && !reduce && !userPaused) {
      video.muted = true;
      video.play().catch(() => {
        // Autoplay refused or the file failed: the poster stays.
      });
    } else {
      video.pause();
    }
  }, [visible, active, userPaused]);

  // Looping motion needs a pause control (WCAG 2.2.2); under reduced motion this is how the film starts.
  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      setUserPaused(true);
      video.pause();
    } else {
      setUserPaused(false);
      video.muted = true;
      video.play().catch(() => {});
    }
  };

  return (
    <section ref={sectionRef} className={styles.section} data-home-videos>
      <div className="container">
        <header className={styles.header}>
          <h2 className={styles.title}>Little films</h2>
          <p className={styles.subtitle}>Five moments from the road.</p>
        </header>

        <div className={styles.grid}>
          <div className={styles.main}>
            <video
              ref={videoRef}
              key={film.id}
              data-main
              className={styles.video}
              src={`${DIR}/${film.id}.mp4`}
              poster={`${DIR}/${film.id}.webp`}
              muted
              loop
              playsInline
              preload="metadata"
              aria-label={film.caption}
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />
            <button type="button" className={styles.playback} onClick={togglePlayback} aria-label={playing ? 'Pause film' : 'Play film'}>
              {playing ? <Pause size={16} strokeWidth={1.5} /> : <Play size={16} strokeWidth={1.5} />}
            </button>
            <div className={styles.caption}>
              <span className={styles.verb}>{film.verb}</span>
              <span className={styles.line}>{film.caption}</span>
              <button type="button" className={styles.story} onClick={() => onOpenStory(`feel-${film.id}`)}>
                Read the story
              </button>
            </div>
          </div>

          <div className={styles.thumbs} data-thumbs>
            {FILMS.map((f, i) =>
              i === active ? null : (
                <button key={f.id} type="button" className={styles.thumb} onClick={() => { setPlaying(false); setActive(i); }}>
                  <Image src={`${DIR}/${f.id}.webp`} alt="" fill sizes="(max-width: 900px) 45vw, 22vw" className={styles.thumbImage} />
                  <span className={styles.thumbLabel}>
                    <Play size={14} strokeWidth={1.5} aria-hidden="true" />
                    {f.verb}
                  </span>
                </button>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
