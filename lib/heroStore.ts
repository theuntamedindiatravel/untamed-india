'use client';
import { useSyncExternalStore } from 'react';

// Whether the homepage hero is under the navbar. The Hero reports it; the Navbar reads it.
// Reporting from the Hero (instead of the Navbar finding the hero in the DOM) keeps this right across
// client-side page transitions, where the hero mounts after the Navbar's route change.
let inView = false;
const listeners = new Set<() => void>();

export function setHeroInView(next: boolean) {
  if (inView === next) return;
  inView = next;
  listeners.forEach((l) => l());
}

export function useHeroInView(): boolean {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => inView,
    () => false,
  );
}
