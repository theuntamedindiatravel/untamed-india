'use client';

import { useEffect, useMemo, useState } from 'react';
import styles from './AdminCampaigns.module.css';

type Recipient = { row: number; email: string; name?: string; status?: string };

export default function AdminCampaignsPage() {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [limit, setLimit] = useState(50);
  const [loadingRecipients, setLoadingRecipients] = useState(false);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{ campaignId: string; total: number; sent: number; failed: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSend = useMemo(() => {
    return Boolean(subject.trim()) && Boolean(body.trim()) && !sending;
  }, [subject, body, sending]);

  async function loadRecipients() {
    setLoadingRecipients(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch(`/api/admin/recipients?limit=${encodeURIComponent(String(limit))}`, { method: 'GET' });
      const data = (await res.json()) as { ok: boolean; recipients?: Recipient[]; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'Failed to load recipients.');
      setRecipients(data.recipients || []);
    } catch (e) {
      setRecipients([]);
      setError(e instanceof Error ? e.message : 'Failed to load recipients.');
    } finally {
      setLoadingRecipients(false);
    }
  }

  async function sendCampaign() {
    if (!canSend) return;
    setSending(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/admin/send-campaign', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ subject, body, limit }),
      });
      const data = (await res.json()) as { ok: boolean; campaignId?: string; total?: number; sent?: number; failed?: number; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'Send failed.');
      setResult({
        campaignId: String(data.campaignId || ''),
        total: Number(data.total || 0),
        sent: Number(data.sent || 0),
        failed: Number(data.failed || 0),
      });
      // Refresh recipients view after send.
      await loadRecipients();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Send failed.');
    } finally {
      setSending(false);
    }
  }

  useEffect(() => {
    // Initial load keeps UI minimal.
    loadRecipients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <span className="section-label">Admin</span>
          <h1 className={styles.title}>Campaign Sender</h1>
          <p className={styles.subtitle}>
            Sends one email to recipients from your Google Sheet, then marks each row as <strong>SENT</strong> or <strong>FAILED</strong>.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.grid}>
            <div>
              <div className={styles.label}>Subject</div>
              <input
                className={styles.input}
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject line"
              />
            </div>

            <div>
              <div className={styles.label}>Body</div>
              <textarea
                className={styles.textarea}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Write the message. You can use {{email}} and {{name}}."
              />
            </div>

            <div className={styles.row}>
              <div className={styles.meta}>
                <span>
                  Recipients loaded:{' '}
                  <strong>{loadingRecipients ? '…' : recipients.length}</strong>
                </span>
                <span>
                  Send limit:{' '}
                  <input
                    className={styles.input}
                    style={{ width: 110, padding: '10px 10px' }}
                    type="number"
                    min={1}
                    max={500}
                    value={limit}
                    onChange={(e) => setLimit(Number(e.target.value || 0))}
                  />
                </span>
              </div>

              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-outline" onClick={loadRecipients} disabled={loadingRecipients || sending}>
                  Refresh list
                </button>
                <button type="button" className="btn btn-primary" onClick={sendCampaign} disabled={!canSend}>
                  {sending ? 'Sending…' : 'Send'}
                </button>
              </div>
            </div>

            {error && <div className={styles.error}>{error}</div>}

            {result && (
              <div className={styles.ok}>
                <strong>Sent:</strong> {result.sent} &nbsp;·&nbsp; <strong>Failed:</strong> {result.failed} &nbsp;·&nbsp;{' '}
                <strong>Total:</strong> {result.total}
                <br />
                <span style={{ color: 'rgba(26,26,26,0.55)' }}>Campaign ID: {result.campaignId}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

