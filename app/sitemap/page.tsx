import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Sitemap | NatIndia',
  description: 'Sitemap for NatIndia pages.',
};

const links = [
  { href: '/', label: 'Home', note: 'Editorial landing + membership' },
  { href: '/tours', label: 'Journeys', note: 'All tours' },
  { href: '/about', label: 'Expertise', note: 'About NatIndia' },
  { href: '/contact', label: 'Concierge', note: 'Contact + enquiry form' },
  { href: '/privacy', label: 'Privacy Policy', note: 'Template legal copy' },
  { href: '/terms', label: 'Terms of Service', note: 'Template legal copy' },
];

export default function SitemapPage() {
  return (
    <div className={styles.shell}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Index</div>
          <h1 className={styles.title}>Sitemap</h1>
          <p className={styles.lead}>A quick index of the main pages on this site.</p>
        </header>

        <div className={styles.card}>
          <div className={styles.content}>
            <div className={styles.links}>
              {links.map((l) => (
                <div key={l.href} className={styles.linkRow}>
                  <Link href={l.href}>{l.label}</Link>
                  <span>{l.note}</span>
                </div>
              ))}
              <div className={styles.linkRow}>
                <span>Destinations</span>
                <span>
                  Example: <Link href="/destinations/wildlife">/destinations/wildlife</Link> (dynamic)
                </span>
              </div>
              <div className={styles.linkRow}>
                <span>Tour details</span>
                <span>
                  Example: <Link href="/tours/the-grand-tiger-expedition">/tours/[slug]</Link> (dynamic)
                </span>
              </div>
            </div>

            <p style={{ marginTop: 18 }}>
              Looking for something specific? Try the <Link href="/tours">Journeys</Link> page or contact our{' '}
              <Link href="/contact">concierge</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

