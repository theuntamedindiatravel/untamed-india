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

  const itinerary = (tour as unknown as { itinerary?: { day: string; title: string; body: string }[] }).itinerary ?? [];

  const themeClass =
    tour.category === 'photography'
      ? styles.themePhotography
      : tour.category === 'spiritual'
        ? styles.themeSpiritual
        : styles.themeSafari;

  return (
    <div className={`${styles.page} ${themeClass}`}>
      {/* Hero */}
      <section 
        className={styles.hero} 
        style={{ backgroundImage: `url(${tour.image})` }}
      >
        <div className={styles.heroOverlay} />
        <div className="container">
          <div className={styles.heroContent}>
            <Link href="/tours" className={`btn btn-outline ${styles.heroBack}`}>
              <ArrowLeft size={16} /> Back to All Tours
            </Link>
            <div className={styles.heroTextPanel}>
              {tour.badge && <span className={styles.badge}>{tour.badge}</span>}
              <h1 className={styles.title}>{tour.title}</h1>
              <div className={styles.region}>
                <MapPin size={20} aria-hidden /> {tour.region}
              </div>
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

              <h2 className={styles.sectionTitle}>Itinerary</h2>
              {itinerary.length > 0 ? (
                <div className={styles.itineraryGrid}>
                  {itinerary.map((item) => (
                    <div key={`${item.day}-${item.title}`} className={styles.itineraryCard}>
                      <div className={styles.itineraryDay}>{item.day}</div>
                      <div className={styles.itineraryTitle}>{item.title}</div>
                      <div className={styles.itineraryBody}>{item.body}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className={styles.description}>
                  Detailed itineraries are available on request. Share your dates and preferences and we’ll tailor the journey.
                </p>
              )}
            </section>
          </div>

          {/* Right Column / Sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.bookCard}>
              <div className={styles.priceHeader}>
                <span className={styles.priceTitle}>Expedition Cost</span>
                <div className={styles.priceLarge}>
                  ${tour.price.toLocaleString()} <span className={styles.pricePer}>/ person</span>
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

              <Link href="/contact" className={`btn btn-primary ${styles.bookCta}`}>
                Check Availability
              </Link>
              <p className={styles.bookNote}>Secure your spot with a flexible deposit.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
