'use client';
import { useSyncExternalStore } from 'react';

// Open/closed state of the chat panel, shared so the phone bar can open it.
let open = false;
const listeners = new Set<() => void>();

function setChatOpen(next: boolean) {
  if (open === next) return;
  open = next;
  listeners.forEach((l) => l());
}

export function useChatOpen(): [boolean, (v: boolean) => void] {
  const value = useSyncExternalStore(
    (l) => {
      listeners.add(l);
      return () => listeners.delete(l);
    },
    () => open,
    () => false,
  );
  return [value, setChatOpen];
}
