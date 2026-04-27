'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Camera, Globe, Play, Send } from 'lucide-react';
import styles from './Footer.module.css';

const links = {
  destinations: [
    { label: 'Wildlife Safaris', href: '/destinations/wildlife' },
    { label: 'Cultural Journeys', href: '/destinations/cultural' },
    { label: 'Himalayan Adventures', href: '/destinations/himalayan' },
    { label: 'Coastal Escapes', href: '/destinations/coastal' },
    { label: 'Spiritual Pilgrimages', href: '/destinations/spiritual' },
    { label: 'Heritage & History', href: '/destinations/heritage' },
  ],
  company: [
    { label: 'Our Story', href: '/about' },
    { label: 'All Tours', href: '/tours' },
    { label: 'Expert Guides', href: '/about#guides' },
    { label: 'Conservation', href: '/about#conservation' },
    { label: 'Photo Expeditions', href: '/destinations/wildlife' },
    { label: 'Contact Us', href: '/contact' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    return Boolean(email.trim()) && !submitting;
  }, [email, submitting]);

  return (
    <footer className={styles.footer}>
      <div className={styles.topBand} />

      <div className={`container ${styles.main}`}>
        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.tuiMark} aria-hidden="true">TUI</span>
            <span className={styles.logoText}>The Untamed <span>India</span></span>
          </div>
          <p className={styles.tagline}>
            A 30-year legacy of travel design — reimagined as conscious luxury across India’s wild, cultural, and desert landscapes.
          </p>
          <div className={styles.contact}>
            <a href="tel:+919929867924" className={styles.contactItem}>
              <Phone size={14} /> +91 9929867924
            </a>
            <a href="mailto:Theuntamedindia.travel@gmail.com" className={styles.contactItem}>
              <Mail size={14} /> Theuntamedindia.travel@gmail.com
            </a>
            <span className={styles.contactItem}>
              <MapPin size={14} /> New Delhi, India
            </span>
          </div>
          <div className={styles.social}>
            <a href="#" aria-label="Instagram" className={styles.socialLink}><Camera size={18} /></a>
            <a href="#" aria-label="Facebook" className={styles.socialLink}><Globe size={18} /></a>
            <a href="#" aria-label="YouTube" className={styles.socialLink}><Play size={18} /></a>
            <a href="#" aria-label="Twitter" className={styles.socialLink}><Send size={18} /></a>
          </div>
        </div>

        {/* Links */}
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Destinations</h4>
          <ul className={styles.linkList}>
            {links.destinations.map((l) => (
              <li key={l.href}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
            ))}
          </ul>
        </div>
        <div className={styles.linksCol}>
          <h4 className={styles.colTitle}>Company</h4>
          <ul className={styles.linkList}>
            {links.company.map((l) => (
              <li key={l.href}><Link href={l.href} className={styles.link}>{l.label}</Link></li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className={styles.newsletter}>
          <h4 className={styles.colTitle}>Stay Inspired</h4>
          <p className={styles.newsletterText}>Get expert travel stories, hidden gems, and exclusive offers from the heart of India.</p>
          <form
            className={styles.form}
            onSubmit={async (e) => {
              e.preventDefault();
              if (!canSubmit) return;
              setSubmitting(true);
              setStatus('idle');
              setError(null);
              try {
                const res = await fetch('/api/subscribe', {
                  method: 'POST',
                  headers: { 'content-type': 'application/json' },
                  body: JSON.stringify({
                    email,
                    source: 'footer-newsletter',
                    pagePath: typeof window !== 'undefined' ? window.location.pathname : undefined,
                  }),
                });
                if (!res.ok) {
                  const data = (await res.json().catch(() => null)) as { error?: string } | null;
                  throw new Error(data?.error || 'Could not subscribe. Please try again.');
                }
                setStatus('success');
                setEmail('');
              } catch (err) {
                setStatus('error');
                setError(err instanceof Error ? err.message : 'Could not subscribe. Please try again.');
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <input
              type="email"
              placeholder="Your email address"
              className={styles.input}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <button type="submit" className={styles.submitBtn} disabled={!canSubmit} aria-disabled={!canSubmit}>
              {submitting ? 'Subscribing…' : 'Subscribe'}
            </button>
          </form>
          <p className={styles.fine}>
            {status === 'success'
              ? 'Subscribed. Thank you — we’ll share inspiration occasionally.'
              : status === 'error'
                ? error || 'Could not subscribe. Please try again.'
                : 'No spam. Unsubscribe anytime.'}
          </p>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <div className={styles.bottomInner}>
            <p>© {new Date().getFullYear()} Untamed India. All rights reserved.</p>
            <div className={styles.bottomLinks}>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
