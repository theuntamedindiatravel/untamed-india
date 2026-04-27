'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

function keyFor(pathname: string, search: string) {
  return `scroll:${pathname}?${search}`;
}

export default function ScrollRestoration() {
  const pathname = usePathname();
  const lastKeyRef = useRef<string | null>(null);
  const isPopRef = useRef(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const prev = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => {
      window.history.scrollRestoration = prev;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const onPopState = () => {
      isPopRef.current = true;
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const search = window.location.search.startsWith('?') ? window.location.search.slice(1) : window.location.search;
    const currentKey = keyFor(pathname, search);

    // Save scroll for previous route key.
    if (lastKeyRef.current) {
      try {
        sessionStorage.setItem(lastKeyRef.current, String(window.scrollY));
      } catch {
        // ignore
      }
    }

    // Restore only on back/forward navigation.
    if (isPopRef.current) {
      isPopRef.current = false;
      let y = 0;
      try {
        const raw = sessionStorage.getItem(currentKey);
        y = raw ? Number(raw) : 0;
      } catch {
        y = 0;
      }

      requestAnimationFrame(() => {
        window.scrollTo({ top: Number.isFinite(y) ? y : 0, left: 0, behavior: 'instant' as ScrollBehavior });
      });
    }

    lastKeyRef.current = currentKey;
  }, [pathname]);

  return null;
}

