'use client';
import { stats } from '@/lib/data';
import styles from './About.module.css';
import Link from 'next/link';
import { Leaf, Users, Star, Shield, Camera, Heart } from 'lucide-react';
import OurGuidesSection from '@/components/OurGuidesSection';

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
      <section className={styles.section} style={{ backgroundColor: 'var(--cream-dark)' }}>
        <div className="container">
          <div className={styles.content}>
            <h2>The story behind the journey</h2>
            <div className={styles.storyBlocks}>
              <div className={styles.storyBlock}>
                <div className={styles.storyText}>
                  <p>
                    It began in Rajasthan — a land of striking contrasts, where golden deserts stretch endlessly under vast skies, where
                    ancient forts rise like guardians of time, and where life has learned to thrive against all odds. Here, water is not
                    just a resource but a treasure, carefully preserved and deeply respected. Wildlife moves silently at the fringes of
                    human settlement — leopards slipping through rocky hills, antelopes grazing in the distance — while villages pulse
                    with a quiet, enduring spirit. In these landscapes, communities have lived for generations in close harmony with
                    nature, shaping a way of life rooted in resilience, balance, and tradition. It is here, in this raw and poetic
                    setting, that the story of Untamed India truly began.
                  </p>
                </div>
                <div className={styles.storyMedia}>
                  <div className={styles.storyImage}>
                    <img
                      src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=85"
                      alt="A wide desert landscape at sunrise with dunes glowing in soft golden light"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles.caption}>A wide desert landscape at sunrise with dunes glowing in soft golden light.</div>
                </div>
              </div>

              <div className={styles.storyBlock}>
                <div className={styles.storyText}>
                  <p>
                    What started years ago was simple in intention yet refined in execution — to design beautiful, seamless journeys
                    across India for discerning international travelers. Every itinerary was crafted with precision, every experience
                    carefully curated to reveal not just destinations, but emotions. Palaces, wildlife reserves, sacred cities, and
                    hidden rural corners were woven together to create journeys that felt personal, authentic, and unforgettable. Over
                    time, however, something deeper revealed itself. Through countless interactions, shared stories, and lived
                    experiences, a powerful understanding emerged — travel is never just movement. It is presence. It is exchange. And
                    when guided with intention, it becomes a force capable of shaping the very places it touches.
                  </p>
                </div>
                <div className={styles.storyMedia}>
                  <div className={styles.storyImage}>
                    <img
                      src="https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?auto=format&fit=crop&w=1400&q=85"
                      alt="A luxury heritage palace in Rajasthan with guests experiencing royal hospitality"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles.caption}>A luxury heritage palace in Rajasthan with guests experiencing royal hospitality.</div>
                </div>
              </div>

              <div className={styles.storyBlock}>
                <div className={styles.storyText}>
                  <p>
                    With this realization came a quiet shift in purpose. The question was no longer just how to create extraordinary
                    journeys, but how those journeys could leave a meaningful imprint. Rajasthan, with its delicate ecosystems and
                    deeply rooted communities, became both inspiration and responsibility. The same villages that welcomed travelers
                    with warmth were also navigating modern challenges. The same landscapes that inspired awe required protection and
                    care. It became clear that travel, when done thoughtfully, could go beyond admiration — it could contribute,
                    sustain, and uplift.
                  </p>
                </div>
                <div className={styles.storyMedia}>
                  <div className={styles.storyImage}>
                    <img
                      src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1400&q=85"
                      alt="A village elder sharing stories with travelers under a tree in a rural setting"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles.caption}>A village elder sharing stories with travelers under a tree in a rural setting.</div>
                </div>
              </div>

              <div className={styles.storyBlock}>
                <div className={styles.storyText}>
                  <p>
                    Untamed India is the embodiment of that evolution — a legacy built on years of expertise, now reimagined with a
                    deeper vision. It is not a departure from luxury, but a refinement of it. Here, luxury is not only found in
                    exquisite stays or flawless service, but in authenticity, connection, and purpose. Each journey is designed to
                    create a balance — offering travelers unparalleled experiences while ensuring that local communities, traditions,
                    and ecosystems are respected and supported. Whether it is engaging with artisans preserving centuries-old crafts,
                    witnessing wildlife in its natural habitat, or simply sharing a moment in a rural village, every experience is
                    intended to be meaningful, both for the traveler and for the land.
                  </p>
                </div>
                <div className={styles.storyMedia}>
                  <div className={styles.storyImage}>
                    <img
                      src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=85"
                      alt="An artisan weaving traditional Rajasthani textiles with intricate detail"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles.caption}>An artisan weaving traditional Rajasthani textiles with intricate detail.</div>
                </div>
              </div>

              <div className={styles.storyBlock}>
                <div className={styles.storyText}>
                  <p>
                    At its heart lies a quiet yet powerful belief — that the places we love should grow stronger with every visit. That
                    travel should not take away, but give back. That even the smallest gesture, when multiplied across journeys, can
                    create lasting change. A single traveler’s contribution may seem modest, but together, they become part of
                    something far greater — supporting livelihoods, preserving heritage, and protecting the fragile beauty of these
                    landscapes for generations to come.
                  </p>
                </div>
                <div className={styles.storyMedia}>
                  <div className={styles.storyImage}>
                    <img
                      src="https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&w=1400&q=85"
                      alt="Children smiling and playing in a village supported by tourism initiatives"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles.caption}>Children smiling and playing in a village supported by tourism initiatives.</div>
                </div>
              </div>

              <div className={styles.storyBlock}>
                <div className={styles.storyText}>
                  <p>
                    Untamed India is not just a name, nor simply a travel company. It is a philosophy — a way of seeing and experiencing
                    the world with awareness and respect. It is an invitation to explore India not only with curiosity, but with
                    intention. To go beyond the surface, to connect with its people, its stories, and its soul. And in doing so, to
                    become part of a journey that extends far beyond travel itself — one that nurtures, preserves, and endures.
                  </p>
                </div>
                <div className={styles.storyMedia}>
                  <div className={styles.storyImage}>
                    <img
                      src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=85"
                      alt="A traveler sharing a quiet moment with a local family over tea in a traditional home"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div className={styles.caption}>A traveler sharing a quiet moment with a local family over tea in a traditional home.</div>
                </div>
              </div>
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

      <OurGuidesSection />

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
                With every booking, we dedicate <strong>5%</strong> to the education of underprivileged children in India — supporting the next
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
