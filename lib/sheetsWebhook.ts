type ListRecipientsResponse = {
  ok: true;
  recipients: { row: number; email: string; name?: string; status?: string }[];
};

type ErrorResponse = { ok: false; error: string };
function isListRecipientsResponse(v: unknown): v is ListRecipientsResponse {
  if (!v || typeof v !== 'object') return false;
  const obj = v as { ok?: unknown; recipients?: unknown };
  if (obj.ok !== true) return false;
  return Array.isArray(obj.recipients);
}

async function fetchJsonFromAppsScript(url: string) {
  const res = await fetch(url, { method: 'GET', redirect: 'follow' });
  const text = await res.text();
  let data: unknown = null;
  try {
    data = JSON.parse(text) as unknown;
  } catch {
    data = null;
  }
  return { status: res.status, data };
}

function requiredEnv(name: string) {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : null;
}

function optionalEnv(name: string) {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : null;
}

export function getSheetsWebhookConfig() {
  const url = requiredEnv('GOOGLE_SHEETS_WEBHOOK_URL');
  const secret = optionalEnv('GOOGLE_SHEETS_WEBHOOK_SECRET');
  return { url, secret };
}

export async function listRecipients(limit: number) {
  const { url, secret } = getSheetsWebhookConfig();
  if (!url) throw new Error('GOOGLE_SHEETS_WEBHOOK_URL is not configured.');

  const qs = new URLSearchParams();
  qs.set('action', 'listRecipients');
  qs.set('limit', String(limit));
  if (secret) qs.set('secret', secret);
  const { status, data } = await fetchJsonFromAppsScript(`${url}?${qs.toString()}`);

  if (status < 200 || status >= 300) {
    throw new Error(`Sheets webhook failed (${status}).`);
  }
  const parsed = data as ListRecipientsResponse | ErrorResponse | null;
  if (!parsed || (parsed as ErrorResponse).ok === false || !isListRecipientsResponse(parsed)) {
    throw new Error((parsed as ErrorResponse | null)?.error || 'Sheets webhook returned invalid response.');
  }
  return parsed.recipients;
}

export async function updateRecipientStatus(args: {
  row: number;
  status: 'SENT' | 'FAILED';
  sentAt: string;
  error?: string;
}) {
  const { url, secret } = getSheetsWebhookConfig();
  if (!url) throw new Error('GOOGLE_SHEETS_WEBHOOK_URL is not configured.');

  const qs = new URLSearchParams();
  qs.set('action', 'updateStatus');
  qs.set('row', String(args.row));
  qs.set('status', args.status);
  qs.set('sentAt', args.sentAt);
  if (args.error) qs.set('error', args.error);
  if (secret) qs.set('secret', secret);

  const { status, data } = await fetchJsonFromAppsScript(`${url}?${qs.toString()}`);
  if (status < 200 || status >= 300) throw new Error(`Sheets update failed (${status}).`);

  const parsed = data as { ok?: unknown; error?: unknown } | null;
  if (!parsed || parsed.ok !== true) {
    throw new Error(typeof parsed?.error === 'string' ? parsed.error : 'Sheets update failed.');
  }
  return true;
}

