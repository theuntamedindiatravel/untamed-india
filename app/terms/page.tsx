import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Terms of Service | NatIndia',
  description: 'Terms of service for NatIndia.',
};

export default function TermsPage() {
  return (
    <div className={styles.shell}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Terms</div>
          <h1 className={styles.title}>Terms of Service</h1>
          <p className={styles.lead}>
            Simple terms for using this website and requesting travel design services.
          </p>
        </header>

        <div className={styles.card}>
          <div className={styles.content}>
            <p>
              This is a template terms page. Replace this text with your final legal copy before going live.
            </p>

            <h2>Use of the website</h2>
            <p>
              You agree not to misuse the site, interfere with its operation, or attempt to access restricted areas.
            </p>

            <h2>Enquiries and proposals</h2>
            <p>
              Any itineraries, pricing, or availability shared by NatIndia are indicative until confirmed in writing.
            </p>

            <h2>Intellectual property</h2>
            <p>
              Content on this site (text, visuals, branding) may not be copied or redistributed without permission.
            </p>

            <h2>Contact</h2>
            <p>
              For questions, reach us via <Link href="/contact">Contact Concierge</Link>.
            </p>

            <div className={styles.links}>
              <div className={styles.linkRow}>
                <Link href="/privacy">Privacy Policy</Link>
                <span>How we handle information</span>
              </div>
              <div className={styles.linkRow}>
                <Link href="/sitemap">Sitemap</Link>
                <span>All main pages</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

