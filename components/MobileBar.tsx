'use client';
import Link from 'next/link';
import { Compass, MessageCircle, Phone } from 'lucide-react';
import styles from './MobileBar.module.css';
import { useChatOpen } from '@/lib/chatStore';

// Phones only (CSS): fixed bottom bar with the three things people reach for most.
export default function MobileBar() {
  const [chatOpen, setChatOpen] = useChatOpen();
  return (
    <nav className={styles.bar} data-mobile-bar aria-label="Quick actions">
      <Link href="/tours" className={styles.item}>
        <Compass size={18} strokeWidth={1.5} aria-hidden="true" />
        <span>Journeys</span>
      </Link>
      <button type="button" className={styles.item} onClick={() => setChatOpen(!chatOpen)} aria-expanded={chatOpen}>
        <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
        <span>Chat</span>
      </button>
      <Link href="/contact" className={styles.item}>
        <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
        <span>Contact</span>
      </Link>
    </nav>
  );
}
