import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '../legal.module.css';

export const metadata: Metadata = {
  title: 'Privacy Policy | NatIndia',
  description: 'Privacy policy for NatIndia.',
};

export default function PrivacyPage() {
  return (
    <div className={styles.shell}>
      <div className="container">
        <header className={styles.header}>
          <div className={styles.eyebrow}>Privacy</div>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.lead}>
            A clear outline of how we handle information when you browse, enquire, or register your interest.
          </p>
        </header>

        <div className={styles.card}>
          <div className={styles.content}>
            <p>
              This is a template policy page. Replace this text with your final legal copy before going live.
            </p>

            <h2>What we collect</h2>
            <ul>
              <li>Contact details you submit (e.g. name, email).</li>
              <li>Travel preferences you share in enquiry forms.</li>
              <li>Basic analytics to improve performance and content.</li>
            </ul>

            <h2>How we use it</h2>
            <ul>
              <li>To respond to enquiries and design travel proposals.</li>
              <li>To send editorial updates if you opt in.</li>
              <li>To operate and secure the website.</li>
            </ul>

            <h2>Your choices</h2>
            <p>
              You can request access, correction, or deletion of your data by contacting us via{' '}
              <Link href="/contact">the concierge page</Link>.
            </p>

            <div className={styles.links}>
              <div className={styles.linkRow}>
                <Link href="/terms">Terms of Service</Link>
                <span>How the site may be used</span>
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

