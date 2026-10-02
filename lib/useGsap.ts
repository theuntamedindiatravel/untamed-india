'use client';
import { useLayoutEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * Runs GSAP setup scoped to `scope` and reverts every tween/ScrollTrigger on unmount.
 * Does nothing when the visitor asks for reduced motion, so content stays in its final, visible state.
 */
export function useGsap(
  scope: RefObject<HTMLElement | null>,
  setup: (g: typeof gsap, st: typeof ScrollTrigger) => void,
  deps: unknown[] = [],
) {
  useLayoutEffect(() => {
    if (!scope.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = gsap.context(() => setup(gsap, ScrollTrigger), scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

/**
 * Section headings rise in word by word as they enter the viewport (once). Call inside a useGsap setup.
 * Only headings inside `scope` are touched, so sections never re-split each other's headings.
 */
export function revealTitles(g: typeof gsap, scope: HTMLElement | null, selector = 'h2') {
  if (!scope) return;
  scope.querySelectorAll<HTMLElement>(selector).forEach((el) => {
    const split = new SplitText(el, { type: 'words' });
    g.from(split.words, {
      y: 24,
      opacity: 0,
      duration: 0.9,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 85%', once: true },
    });
  });
}
