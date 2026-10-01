'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';
import styles from './Navbar.module.css';
import { useHeroInView } from '@/lib/heroStore';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function scrollToGuidesSection() {
  requestAnimationFrame(() => {
    document.getElementById('guides')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

const MENU_LINKS = [
  { label: 'Destinations', href: '/#destinations' },
  { label: 'Journeys', href: '/tours' },
  { label: 'Luxury Hotels', href: '/luxury-hotels' },
  { label: "Women's Journeys", href: '/womens-journeys' },
  { label: 'Our Story', href: '/about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const overHero = useHeroInView();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const path = pathname ?? '';
  const isHome = path === '/';
  const overlayOnHome = isHome && (!!searchParams.get('story') || searchParams.get('register') === '1');

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const goBack = () => {
    try {
      // Dismiss in-page overlays first (stay on the same route).
      if (path === '/about' && searchParams.get('guide')) {
        const next = new URLSearchParams(searchParams.toString());
        next.delete('guide');
        const qs = next.toString();
        router.replace(qs ? `${path}?${qs}` : path, { scroll: false });
        scrollToGuidesSection();
        return;
      }
      if (path === '/' && (searchParams.get('story') || searchParams.get('register') === '1')) {
        const next = new URLSearchParams(searchParams.toString());
        next.delete('story');
        next.delete('register');
        const qs = next.toString();
        router.replace(qs ? `${path}?${qs}` : path, { scroll: false });
        return;
      }
      if (window.history.length > 1) router.back();
      else router.push('/');
    } catch {
      router.push('/');
    }
  };

  const solid = !overHero || overlayOnHome || menuOpen;

  return (
    <header className={styles.navbar} data-nav data-solid={solid || undefined}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          {(!isHome || overlayOnHome) && (
            <button type="button" className={styles.iconButton} onClick={goBack} aria-label="Go back">
              <ArrowLeft size={20} strokeWidth={1.5} />
            </button>
          )}
          <Link href="/" className={styles.brand} aria-label="The Untamed India, home">
            <Image src="/brand/mark-112.png" alt="" width={42} height={42} className={styles.mark} unoptimized />
            <span className={styles.wordmark}>
              <span>The Untamed</span>
              <span>India</span>
            </span>
          </Link>
        </div>

        <nav className={styles.links} aria-label="Primary">
          <Link href="/#destinations" className={styles.link}>Destinations</Link>
          <Link href="/tours" className={`${styles.link} ${path.startsWith('/tours') ? styles.linkActive : ''}`}>Journeys</Link>
        </nav>

        <button
          ref={menuButtonRef}
          type="button"
          className={styles.iconButton}
          onClick={() => setMenuOpen((v) => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span className={styles.burger} data-open={menuOpen || undefined} aria-hidden="true" />
        </button>
      </div>

      {menuOpen && (
        <div className={styles.overlay} data-menu-overlay>
          <nav className={styles.overlayNav} aria-label="Menu">
            {MENU_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={styles.overlayLink} onClick={() => setMenuOpen(false)}>
                {l.label}
              </Link>
            ))}
            <Link href="/?register=1#register" className={styles.overlayCta} onClick={() => setMenuOpen(false)}>
              Plan your journey
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
