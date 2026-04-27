'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './ChatAssistant.module.css';
import { getWhatsAppLink } from '@/lib/whatsapp';

type QuickIntent = 'Plan a trip' | 'Talk to an expert' | 'Ask a question';

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [intent, setIntent] = useState<QuickIntent | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const welcome = useMemo(() => 'Hello, how can we help you plan your journey?', []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  const canSubmit = name.trim() && email.trim() && message.trim() && !submitting;

  async function submit() {
    if (!canSubmit) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          message,
          intent,
          pagePath: typeof window !== 'undefined' ? window.location.pathname : undefined,
          source: 'chat-assistant',
        }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error || 'Could not send your message. Please try again.');
      }

      setSubmitted(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not send your message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.wrap} aria-label="Chat assistant">
      {open && (
        <div className={styles.panel} role="dialog" aria-modal="true" aria-label="Chat assistant">
          <div className={styles.header}>
            <div className={styles.title}>Concierge</div>
            <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Close chat">
              ×
            </button>
          </div>

          <div className={styles.body}>
            {!submitted ? (
              <>
                <div className={styles.welcome}>{welcome}</div>

                <div className={styles.quick} aria-label="Quick options">
                  {(['Plan a trip', 'Talk to an expert', 'Ask a question'] as const).map((label) => (
                    <button
                      key={label}
                      type="button"
                      className={styles.quickBtn}
                      onClick={() => {
                        setIntent(label);
                        if (!message.trim()) setMessage(label === 'Ask a question' ? 'I have a question about…' : 'I’d like help planning…');
                      }}
                      aria-pressed={intent === label}
                    >
                      {label}
                    </button>
                  ))}
                </div>

                <div className={styles.form}>
                  <div>
                    <div className={styles.fieldLabel}>Name</div>
                    <input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
                  </div>
                  <div>
                    <div className={styles.fieldLabel}>Email</div>
                    <input
                      className={styles.input}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <div className={styles.fieldLabel}>Message</div>
                    <textarea className={styles.textarea} value={message} onChange={(e) => setMessage(e.target.value)} />
                  </div>

                  {error && <div className={styles.error}>{error}</div>}

                  <div className={styles.actions}>
                    <button
                      type="button"
                      className={`btn btn-primary ${styles.mini}`}
                      onClick={submit}
                      disabled={!canSubmit}
                      aria-disabled={!canSubmit}
                    >
                      {submitting ? 'Sending…' : 'Send'}
                    </button>

                    <a className={`btn btn-outline ${styles.mini}`} href={getWhatsAppLink('Hi! I’d like to speak to an Untamed India expert.')}>
                      WhatsApp
                    </a>
                  </div>

                  <div className={styles.note}>We’ll reply by email, or you can message us on WhatsApp.</div>
                </div>
              </>
            ) : (
              <>
                <div className={styles.welcome}>Thank you — we’ve received your message.</div>
                <div className={styles.note}>A travel designer will get back to you shortly.</div>
                <div className={styles.actions} style={{ marginTop: 12 }}>
                  <button type="button" className={`btn btn-primary ${styles.mini}`} onClick={() => setOpen(false)}>
                    Close
                  </button>
                  <a className={`btn btn-outline ${styles.mini}`} href={getWhatsAppLink('Hi! Following up on my enquiry—can we chat?')}>
                    WhatsApp
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <button
        type="button"
        className={styles.fab}
        onClick={() => {
          setOpen((v) => !v);
          if (!open) {
            setError(null);
            setSubmitted(false);
          }
        }}
        aria-label={open ? 'Close chat assistant' : 'Open chat assistant'}
      >
        {/* Minimal icon */}
        <span aria-hidden="true" style={{ fontSize: 18, letterSpacing: -1 }}>
          …
        </span>
      </button>
    </div>
  );
}

