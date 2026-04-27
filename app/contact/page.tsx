'use client';
import { useMemo, useState } from 'react';
import { MapPin, Phone, Mail, Camera, Globe, Play, Send } from 'lucide-react';
import styles from './Contact.module.css';
import { getWhatsAppLink, getWhatsAppNumberE164Digits } from '@/lib/whatsapp';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(() => {
    if (!name.trim()) return false;
    if (!email.trim()) return false;
    if (!message.trim()) return false;
    return !submitting;
  }, [name, email, message, submitting]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitting(true);
    setStatus('idle');
    setError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          destination,
          message,
          pagePath: typeof window !== 'undefined' ? window.location.pathname : undefined,
          source: 'contact-page',
        }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || 'Could not send your message. Please try again.');
      }

      setStatus('success');
      setName('');
      setEmail('');
      setDestination('');
      setMessage('');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Could not send your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.section}>
      <div className="container">
        <div className={styles.grid}>
          {/* Form */}
          <div className={styles.formCol}>
            <h1 className={styles.title}>Plan Your Dream Journey</h1>
            <div className={styles.formCard}>
              <form onSubmit={handleSubmit}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className={styles.input}
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    className={styles.input}
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Destination of Interest</label>
                  <select className={styles.input} value={destination} onChange={(e) => setDestination(e.target.value)}>
                    <option>Select a destination</option>
                    <option>Ranthambore & Wildlife</option>
                    <option>Rajasthan Cultural</option>
                    <option>Himalayan Expedition</option>
                    <option>Kerala Backwaters</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Message / Details</label>
                  <textarea
                    placeholder="Tell us about your travel plans..."
                    className={styles.textarea}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>
                {status === 'error' && (
                  <p style={{ marginTop: 10, color: 'rgba(160, 20, 20, 0.9)', lineHeight: 1.5 }}>
                    {error || 'Could not send your message. Please try again.'}
                  </p>
                )}
                {status === 'success' && (
                  <p style={{ marginTop: 10, color: 'rgba(14, 24, 20, 0.75)', lineHeight: 1.5 }}>
                    Thank you — we’ve received your message. A travel designer will reach out shortly.
                  </p>
                )}

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', marginTop: '10px' }}
                  disabled={!canSubmit}
                  aria-disabled={!canSubmit}
                >
                  {submitting ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>

          {/* Info */}
          <div className={styles.infoCol}>
            <div style={{ marginTop: '50px' }}>
              <h2>Connect With Us</h2>
              <p style={{ color: '#666', marginBottom: '40px' }}>
                Whether you're ready to book or just starting to imagine your journey across India, 
                our team of destination specialists is here to guide you.
              </p>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 22 }}>
                <a
                  className="btn btn-primary"
                  href={getWhatsAppLink('Hi! I’d like to plan a journey with Untamed India.')}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp Concierge
                </a>
                <a className="btn btn-outline" href={`/` + `?register=1#register`}>
                  Register interest
                </a>
              </div>

              <div className={styles.contactInfo}>
                <div className={styles.infoItem}>
                  <div className={styles.iconWrap}><MapPin size={20} /></div>
                  <div>
                    <strong>New Delhi Office</strong><br />
                    B-12, Green Park Main, New Delhi, 110016
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.iconWrap}><Phone size={20} /></div>
                  <div>
                    <strong>Direct Line</strong><br />
                    +{getWhatsAppNumberE164Digits()}
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.iconWrap}><Mail size={20} /></div>
                  <div>
                    <strong>General Inquiries</strong><br />
                    concierge@untamedindia.com
                  </div>
                </div>
              </div>

              <h3>Follow Our Journeys</h3>
              <div className={styles.socials}>
                <a href="#" className={styles.socialLink} aria-label="Instagram"><Camera size={18} /></a>
                <a href="#" className={styles.socialLink} aria-label="Facebook"><Globe size={18} /></a>
                <a href="#" className={styles.socialLink} aria-label="YouTube"><Play size={18} /></a>
                <a href="#" className={styles.socialLink} aria-label="Twitter"><Send size={18} /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
