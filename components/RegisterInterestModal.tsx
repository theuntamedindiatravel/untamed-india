'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import styles from './RegisterInterestModal.module.css';

type AnnualSpend =
  | ''
  | '£25k - £50k'
  | '£50k - £75k'
  | '£75k - £100k'
  | '£100k+';

type RegisterInterestModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function RegisterInterestModal({ open, onClose }: RegisterInterestModalProps) {
  const titleId = useId();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [timing, setTiming] = useState('');
  const [interests, setInterests] = useState('');
  const [annualSpend, setAnnualSpend] = useState<AnnualSpend>('');
  const [subscribe, setSubscribe] = useState(true);

  const canSubmit = useMemo(() => {
    if (!name.trim()) return false;
    if (!email.trim()) return false;
    if (!annualSpend) return false;
    return true;
  }, [name, email, annualSpend]);

  useEffect(() => {
    if (!open) return;
    setSubmitted(false);
    setSubmitting(false);
    setError(null);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={styles.backdrop} role="presentation" onMouseDown={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={onClose} aria-label="Close dialog">
          ×
        </button>

        {!submitted ? (
          <>
            <div className={styles.kicker}>Register your interest</div>
            <h2 className={styles.title} id={titleId}>
              Travel designed exclusively for you.
            </h2>
            <p className={styles.subtitle}>
              Unlock a more personal way to travel — one dedicated designer, trusted partners, and seamless execution.
            </p>

            <form
              className={styles.form}
              onSubmit={async (e) => {
                e.preventDefault();
                if (!canSubmit) return;
                setSubmitting(true);
                setError(null);

                try {
                  const res = await fetch('/api/register-interest', {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    body: JSON.stringify({
                      name,
                      email,
                      phone,
                      timing,
                      interests,
                      annualSpend,
                      subscribe,
                      source: 'register-interest-modal',
                      pagePath: typeof window !== 'undefined' ? window.location.pathname : undefined,
                    }),
                  });

                  if (!res.ok) {
                    const data = (await res.json().catch(() => null)) as { error?: string } | null;
                    throw new Error(data?.error || 'Submission failed. Please try again.');
                  }

                  setSubmitted(true);
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              <div className={styles.grid}>
                <label className={styles.field}>
                  <span className={styles.label}>Name</span>
                  <input
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    placeholder="Your name"
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Email</span>
                  <input
                    className={styles.input}
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    placeholder="you@domain.com"
                    required
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>Phone (optional)</span>
                  <input
                    className={styles.input}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    placeholder="+44 7… / +91…"
                    inputMode="tel"
                  />
                </label>

                <label className={styles.field}>
                  <span className={styles.label}>When are you looking to travel? (optional)</span>
                  <input
                    className={styles.input}
                    value={timing}
                    onChange={(e) => setTiming(e.target.value)}
                    placeholder="Month / season, 2026"
                  />
                </label>

                <label className={styles.fieldFull}>
                  <span className={styles.label}>Annual travel spend</span>
                  <select
                    className={styles.select}
                    value={annualSpend}
                    onChange={(e) => setAnnualSpend(e.target.value as AnnualSpend)}
                    required
                  >
                    <option value="">Please select</option>
                    <option value="£25k - £50k">£25k - £50k</option>
                    <option value="£50k - £75k">£50k - £75k</option>
                    <option value="£75k - £100k">£75k - £100k</option>
                    <option value="£100k+">£100k+</option>
                  </select>
                </label>

                <label className={styles.fieldFull}>
                  <span className={styles.label}>What are you interested in? (optional)</span>
                  <textarea
                    className={styles.input}
                    value={interests}
                    onChange={(e) => setInterests(e.target.value)}
                    placeholder="Wildlife, heritage, Himalayas, special occasions, accessibility needs…"
                    style={{ minHeight: 110, resize: 'vertical' }}
                  />
                </label>

                <label className={styles.checkbox}>
                  <input
                    type="checkbox"
                    checked={subscribe}
                    onChange={(e) => setSubscribe(e.target.checked)}
                  />
                  <span>Subscribe to editorial inspiration.</span>
                </label>
              </div>

              {error && (
                <p className={styles.fine} style={{ color: 'rgba(160, 20, 20, 0.9)', marginTop: 10 }}>
                  {error}
                </p>
              )}

              <button className={styles.submit} type="submit" disabled={!canSubmit || submitting}>
                {submitting ? 'Submitting…' : 'Submit'}
              </button>

              <p className={styles.fine}>
                By submitting, you agree we may contact you about your travel needs. {subscribe ? 'You can unsubscribe anytime.' : ''}
              </p>
            </form>
          </>
        ) : (
          <div className={styles.thankYou}>
            <div className={styles.kicker}>Thank you</div>
            <h2 className={styles.title} id={titleId}>
              We’ll be in touch shortly.
            </h2>
            <p className={styles.subtitle}>
              A travel designer will reach out to learn more about your preferences and timing.
            </p>
            <button className={styles.submit} onClick={onClose}>
              Continue exploring
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

