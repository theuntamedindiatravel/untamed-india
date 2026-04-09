'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';
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
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${mobileOpen ? styles.mobileActive : ''}`}>
      <div className={`container ${styles.inner}`}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoPrimary}>
            <span className={styles.logoThe}>THE</span> UNTAMED
          </span>
          <span className={styles.logoSecondary}>INDIA</span>
        </Link>

        {/* Desktop Nav */}
        <nav className={styles.desktopNav}>
          <div className={styles.navItem} ref={megaRef} onMouseEnter={() => setMegaOpen(true)} onMouseLeave={() => setMegaOpen(false)}>
            <button className={styles.navLink}>
              Destinations <ChevronDown size={12} className={megaOpen ? styles.chevronOpen : ''} />
            </button>
            {megaOpen && (
              <div className={styles.mega}>
                <div className={styles.megaGrid}>
                  {destinations.map((d) => (
                    <Link key={d.href} href={d.href} className={styles.megaItem}>
                      {d.label}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          <Link href="/tours" className={styles.navLink}>Journeys</Link>
          <Link href="/about" className={styles.navLink}>Expertise</Link>
          <Link href="/contact" className={styles.navLink}>Concierge</Link>
        </nav>

        {/* CTA */}
        <div className={styles.actions}>
          <Link href="/?register=1#register" className={styles.primaryCta}>
            Register Interest
          </Link>
          <button className={styles.mobileToggle} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
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
