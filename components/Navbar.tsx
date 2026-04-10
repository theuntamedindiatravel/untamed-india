'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import styles from './Navbar.module.css';

const destinations = [
  { label: 'Wildlife Safaris', href: '/destinations/wildlife' },
  { label: 'Cultural Journeys', href: '/destinations/cultural' },
  { label: 'Himalayan Adventures', href: '/destinations/himalayan' },
  { label: 'Coastal Escapes', href: '/destinations/coastal' },
  { label: 'Spiritual Pilgrimages', href: '/destinations/spiritual' },
  { label: 'Heritage & History', href: '/destinations/heritage' },
  { label: 'Northeast Wilderness', href: '/destinations/northeast' },
  { label: 'Kerala & the South', href: '/destinations/kerala' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const showNav = scrolled || mobileOpen;

  return (
    <header className={`${styles.navbar} ${showNav ? styles.visible : styles.hidden} ${scrolled ? styles.scrolled : ''} ${mobileOpen ? styles.mobileActive : ''}`}>
      <div className={`container ${styles.inner}`}>
        <Link href="/" className={styles.brand} aria-label="Untamed India">
          UNTAMED INDIA
        </Link>

        <button
          className={styles.menuButton}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          <span className={styles.burger} aria-hidden="true" />
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileLabel}>Explore Experiences</div>
          {destinations.map((d) => (
            <Link key={d.href} href={d.href} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
              {d.label}
            </Link>
          ))}
          <div className={styles.mobileDivider} />
          <Link href="/tours" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>All Journeys</Link>
          <Link href="/about" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Our Expertise</Link>
          <Link href="/contact" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>Contact Concierge</Link>
          <div className={styles.mobileDivider} />
          <Link href="/?register=1#register" className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
            Register Interest
          </Link>
        </div>
      )}
    </header>
  );
}
