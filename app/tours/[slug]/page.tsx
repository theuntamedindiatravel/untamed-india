'use client';
import { useParams, notFound } from 'next/navigation';
import { tours } from '@/lib/data';
import { MapPin, Clock, Users, Star, CheckCircle2, ArrowLeft } from 'lucide-react';
import styles from './TourDetail.module.css';
import Link from 'next/link';

export default function TourDetailPage() {
  const params = useParams();
  const slug = params.slug;

  const tour = tours.find((t) => t.slug === slug);

  if (!tour) {
    notFound();
  }

  return (
    <div className={styles.page}>
      {/* Hero */}
      <section 
        className={styles.hero} 
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <Link href="/tours" className="btn btn-outline" style={{ color: '#fff', borderColor: '#fff', marginBottom: '30px', padding: '8px 16px' }}>
              <ArrowLeft size={16} /> Back to All Tours
            </Link>
            <br />
            {tour.badge && <span className={styles.badge}>{tour.badge}</span>}
            <h1 className={styles.title}>{tour.title}</h1>
            <div className={styles.region}>
              <MapPin size={20} /> {tour.region}
            </div>
          </div>
        </div>
      </section>

      {/* Content Grid */}
      <div className="container">
        <div className={styles.mainGrid}>
          {/* Left Column */}
          <div className={styles.content}>
            <section>
              <h2 className={styles.sectionTitle}>Experience Overview</h2>
              <p className={styles.description}>{tour.description}</p>
              
              <h2 className={styles.sectionTitle}>Journey Highlights</h2>
              <ul className={styles.highlights}>
                {tour.highlights.map((h, i) => (
                  <li key={i} className={styles.highlightItem}>
                    <CheckCircle2 size={18} className={styles.check} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Right Column / Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.bookCard}>
              <div className={styles.priceHeader}>
                <span className={styles.priceTitle}>Expedition Cost</span>
                <div className={styles.priceLarge}>
                  ${tour.price.toLocaleString()} <span className={styles.pricePer} style={{ fontSize: '1rem' }}>/ person</span>
                </div>
              </div>

              <div className={styles.quickFacts}>
                <div className={styles.fact}>
                  <span className={styles.factLabel}><Clock size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Duration</span>
                  <span className={styles.factValue}>{tour.duration}</span>
                </div>
                <div className={styles.fact}>
                  <span className={styles.factLabel}><Users size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Max Group Size</span>
                  <span className={styles.factValue}>{tour.groupSize}</span>
                </div>
                <div className={styles.fact}>
                  <span className={styles.factLabel}><Star size={16} style={{ verticalAlign: 'middle', marginRight: '8px' }} /> Guest Rating</span>
                  <span className={styles.factValue}>{tour.rating} / 5 ({tour.reviews} reviews)</span>
                </div>
              </div>

              <Link href="/contact" className="btn btn-primary" style={{ width: '100%', textAlign: 'center' }}>
                Check Availability
              </Link>
              <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666', marginTop: '15px' }}>
                Secure your spot with a flexible deposit.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
