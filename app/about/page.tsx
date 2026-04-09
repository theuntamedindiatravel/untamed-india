'use client';
import { stats } from '@/lib/data';
import styles from './About.module.css';
import Link from 'next/link';
import { Leaf, Users, Star, Shield, Camera, Heart } from 'lucide-react';

const reasons = [
  {
    icon: <Heart size={32} />,
    title: 'Luxury with a conscience',
    desc: 'Untamed India is built on a 30-year legacy of travel design — reimagined so that every journey leaves something behind.',
  },
  {
    icon: <Users size={32} />,
    title: 'A quieter kind of access',
    desc: 'Local guides, artisans, families, and field partners shape the experience — and benefit from it, not just witness it.',
  },
  {
    icon: <Leaf size={32} />,
    title: 'Designed to endure',
    desc: 'From fragile forests to desert water heritage, we support hands-on projects that protect what makes India extraordinary.',
  },
];

export default function AboutPage() {
  return (
    <div className={styles.about}>
      {/* Hero */}
      <section className={styles.hero}>
        <div className="container">
          <span className="section-label">A legacy reimagined</span>
          <h1 className={styles.title}>Untamed India</h1>
          <p className={styles.lead}>
            Travel with us is not just a journey — it is a meaningful contribution to India.
          </p>
        </div>
      </section>

      {/* Story */}
      <section className={styles.section} style={{ backgroundColor: '#fff' }}>
        <div className="container">
          <div className={styles.grid}>
            <div className={styles.content}>
              <h2>The story behind the journey</h2>
              <p>
                It began in Rajasthan — in landscapes where water is precious, where wildlife moves quietly at the edge of villages,
                and where communities live in close conversation with the land.
              </p>
              <p>
                For years, the work was simple: design beautiful journeys across India, with the care and precision that discerning
                international travelers expect. Over time, a deeper understanding emerged — travel is powerful. In the right hands,
                it can create far more than memories.
              </p>
              <p>
                Untamed India is that legacy, reimagined. A modern expression of decades of expertise — shaped by a quieter ambition:
                that the places we love should grow stronger with every journey, and that even a small contribution from each traveler
                can become something lasting.
              </p>
            </div>
            <div className={styles.imgWrap}>
              <img 
                src="https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&q=80" 
                alt="Bengal Tiger" 
                style={{ width: '100%', borderRadius: '20px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} 
              />
            </div>
          </div>

          <div className={styles.statsGrid}>
            {stats.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Us / Difference */}
      <section className={styles.section} style={{ backgroundColor: '#fafafa' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem' }}>A philosophy of responsible luxury</h2>
            <p style={{ color: '#666' }}>
              Refined, intimate, and quietly impactful — created for travelers who want beauty with meaning.
            </p>
          </div>
          
          <div className={styles.reasonsGrid}>
            {reasons.map((r) => (
              <div key={r.title} className={styles.reasonCard}>
                <div style={{ marginBottom: '20px', color: '#15803D' }}>{r.icon}</div>
                <h3 style={{ marginBottom: '15px' }}>{r.title}</h3>
                <p style={{ color: '#555', lineHeight: '1.6' }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Purpose */}
      <section className={styles.section} id="conservation" style={{ backgroundColor: 'var(--cream)' }}>
        <div className="container">
          <div className={styles.impactHeader}>
            <span className="section-label">Travel with purpose</span>
            <h2 className={styles.impactTitle}>Leave India richer than you found it.</h2>
            <p className={styles.impactSubtitle}>
              The most meaningful journeys don’t announce themselves. They unfold slowly — in the hush of a forest at dawn, in the cool
              shadow of sandstone, in the warmth of a family welcome. And they give something back, quietly, every time.
            </p>
          </div>

          <div className={styles.impactGrid}>
            <div className={styles.impactCard}>
              <h3>Education, carried forward</h3>
              <p style={{ color: 'var(--charcoal-soft)', lineHeight: 1.9 }}>
                With every booking, we dedicate <strong>2%</strong> to the education of underprivileged children in India — supporting the next
                generation with practical access to learning, dignity, and choice.
              </p>
            </div>

            <div className={styles.impactCard}>
              <h3>Forests, replanted with intention</h3>
              <p style={{ color: 'var(--charcoal-soft)', lineHeight: 1.9 }}>
                We plant trees and contribute to reforestation in fragile ecosystems — not as a gesture, but as a commitment to the landscapes
                that make India feel infinite.
              </p>
            </div>

            <div className={styles.impactCard}>
              <h3>Water heritage, restored</h3>
              <p style={{ color: 'var(--charcoal-soft)', lineHeight: 1.9 }}>
                In desert regions, we help restore ancient stepwells and water systems — reviving heritage architecture while strengthening water
                conservation where it matters most.
              </p>
            </div>

            <div className={styles.impactCard}>
              <h3>Communities, empowered</h3>
              <p style={{ color: 'var(--charcoal-soft)', lineHeight: 1.9 }}>
                We create employment and support local guides, artisans, and families, so tourism becomes a shared success — felt at home, not only
                in the itinerary.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '34px' }}>
            <p style={{ color: 'rgba(26,26,26,0.7)', marginBottom: '16px' }}>
              Quiet impact. Visible beauty. A traveler’s presence that matters.
            </p>
            <Link href="/?register=1#register" className="btn btn-outline">
              Travel with purpose
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={styles.section} style={{ textAlign: 'center' }}>
        <div className="container">
          <h2>Ready to Begin Your Journey?</h2>
          <p style={{ marginBottom: '40px', color: '#666' }}>Connect with our specialists for a personalized consultation.</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <Link href="/tours" className="btn btn-primary">Check All Tours</Link>
            <Link href="/contact" className="btn btn-outline">Contact Us</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
