export const runtime = 'nodejs';

import { Resend } from 'resend';
import { listRecipients, updateRecipientStatus } from '@/lib/sheetsWebhook';

type Body = {
  subject: string;
  body: string;
  limit?: number;
};

function requiredEnv(name: string) {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : null;
}

function renderTemplate(input: string, vars: Record<string, string>) {
  return input.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, key) => vars[key] ?? '');
}

export async function POST(req: Request) {
  let payload: Body;
  try {
    payload = (await req.json()) as Body;
  } catch {
    return Response.json({ ok: false, error: 'Invalid JSON body.' }, { status: 400 });
  }

  const subjectRaw = payload.subject?.trim();
  const bodyRaw = payload.body?.trim();
  const limit = Math.max(1, Math.min(500, Number(payload.limit ?? 50) || 50));

  if (!subjectRaw || !bodyRaw) {
    return Response.json({ ok: false, error: 'Subject and body are required.' }, { status: 400 });
  }

  const resendApiKey = requiredEnv('RESEND_API_KEY');
  if (!resendApiKey) {
    return Response.json({ ok: false, error: 'RESEND_API_KEY is not configured.' }, { status: 500 });
  }

  const from = requiredEnv('CAMPAIGN_EMAIL_FROM') || requiredEnv('OPS_EMAIL_FROM') || 'Untamed India <onboarding@resend.dev>';

  const resend = new Resend(resendApiKey);

  const recipients = await listRecipients(limit);
  const now = new Date();
  const campaignId = `cmp_${now.toISOString().replace(/[:.]/g, '-')}`;

  let sent = 0;
  let failed = 0;

  for (const r of recipients) {
    const vars = {
      email: r.email,
      name: r.name || '',
    };

    const subject = renderTemplate(subjectRaw, vars);
    const text = renderTemplate(bodyRaw, vars);

    try {
      const { error } = await resend.emails.send({
        from,
        to: r.email,
        subject,
        text,
        replyTo: requiredEnv('OPS_EMAIL_TO') || 'theuntamedindia.travel@gmail.com',
        headers: {
          'X-Untamed-Campaign': campaignId,
        },
      });

      if (error) throw new Error(error.message || 'Resend send failed.');

      sent++;
      await updateRecipientStatus({
        row: r.row,
        status: 'SENT',
        sentAt: new Date().toISOString(),
      });
    } catch (e) {
      failed++;
      await updateRecipientStatus({
        row: r.row,
        status: 'FAILED',
        sentAt: new Date().toISOString(),
        error: e instanceof Error ? e.message.slice(0, 240) : 'Send failed.',
      });
    }
  }

  return Response.json(
    {
      ok: true,
      campaignId,
      total: recipients.length,
      sent,
      failed,
    },
    { status: 200 },
  );
}

