'use client';
import { Leaf, Users, Star, Shield, Camera, Heart } from 'lucide-react';
import styles from './WhyUs.module.css';

const reasons = [
  {
    icon: <Leaf size={28} />,
    title: 'Conservation-First Travel',
    desc: 'Every journey directly supports wildlife and cultural preservation. We give back 5% of revenue to India conservation projects.',
    color: '#15803D',
  },
  {
    icon: <Users size={28} />,
    title: 'Intimate Small Groups',
    desc: 'Maximum 12 guests per tour — ensuring personal naturalist attention, exclusive access, and minimal environmental impact.',
    color: '#D97706',
  },
  {
    icon: <Star size={28} />,
    title: 'World-Class Expert Guides',
    desc: 'Our naturalists and cultural experts average 15+ years in the field. They have deep, life-long relationships with their territories.',
    color: '#E8590C',
  },
  {
    icon: <Shield size={28} />,
    title: 'Meticulous Logistics',
    desc: 'Every detail — from private forest permits to heritage haveli stays — is arranged so you can simply be present and experience India.',
    color: '#7C3AED',
  },
  {
    icon: <Camera size={28} />,
    title: 'Unrivalled Photographic Access',
    desc: 'Early morning jeep safaris, private wildlife hides, and expert photo coaching guarantee memories that last a lifetime.',
    color: '#1E40AF',
  },
  {
    icon: <Heart size={28} />,
    title: 'Transformative Experiences',
    desc: 'Guests return home more connected to India, its wild creatures, its people, and to the planet we share — inspired to protect it.',
    color: '#DC2626',
  },
];

export default function WhyUsSection() {
  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.layout}>
          {/* Left panel */}
          <div className={styles.left}>
            <span className="section-label">Why NatIndia</span>
            <h2 className={styles.title}>The NatIndia Difference</h2>
            <div className="divider" />
            <p className={styles.body}>
              Since 1989, we've spent over three decades perfecting the art of deep, meaningful travel across India. We don't show you India — we let you feel it.
            </p>
            <p className={styles.body}>
              Our partnerships with local communities, forest departments, and cultural custodians open doors that no other tour operator can access.
            </p>
            <div className={styles.trust}>
              <div className={styles.trustItem}>
                <img
                  src="https://images.unsplash.com/photo-1549366021-9f761d040a94?w=300&q=80"
                  alt="India tiger"
                  className={styles.trustImg}
                />
                <img
                  src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=300&q=80"
                  alt="India culture"
                  className={styles.trustImg}
                />
                <img
                  src="https://images.unsplash.com/photo-1564507592333-c60657eea523?w=300&q=80"
                  alt="Taj Mahal"
                  className={styles.trustImg}
                />
              </div>
              <span className={styles.trustBadge}>★ 4.9 / 5 from 12,000+ guests</span>
            </div>
          </div>

          {/* Right grid */}
          <div className={styles.right}>
            {reasons.map((r) => (
              <div key={r.title} className={styles.card}>
                <div className={styles.iconWrap} style={{ '--color': r.color } as React.CSSProperties}>
                  {r.icon}
                </div>
                <div>
                  <h4 className={styles.cardTitle}>{r.title}</h4>
                  <p className={styles.cardDesc}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
