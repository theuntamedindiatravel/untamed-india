'use client';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import styles from './BackToTop.module.css';
import { useChatOpen } from '@/lib/chatStore';

// Appears once #top-sentinel (rendered by AppShell one screen down) has scrolled above the viewport.
export default function BackToTop() {
  const [pastFirstScreen, setPastFirstScreen] = useState(false);
  const [chatOpen] = useChatOpen();
  // Hidden while the chat panel is open: it would sit on top of the panel's corner.
  const show = pastFirstScreen && !chatOpen;

  useEffect(() => {
    const sentinel = document.getElementById('top-sentinel');
    if (!sentinel) return;
    const io = new IntersectionObserver(([entry]) => {
      setPastFirstScreen(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(sentinel);
    return () => io.disconnect();
  }, []);

  return (
    <button
      type="button"
      className={styles.button}
      data-show={show || undefined}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={() => {
        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      }}
    >
      <ArrowUp size={18} strokeWidth={1.5} />
    </button>
  );
}
