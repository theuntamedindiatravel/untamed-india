export const runtime = 'nodejs';

type ContactPayload = {
  name: string;
  email: string;
  destination?: string;
  message: string;
  pagePath?: string;
  source?: string;
};

function requiredEnv(name: string) {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : null;
}

function optionalEnv(name: string) {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : null;
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();
  const destination = payload.destination?.trim();

  if (!name || !email || !message) {
    return Response.json({ error: 'Please provide name, email, and a message.' }, { status: 400 });
  }

  const resendApiKey = requiredEnv('RESEND_API_KEY');
  if (!resendApiKey) {
    return Response.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  const opsEmailTo = requiredEnv('OPS_EMAIL_TO') || 'theuntamedindia.travel@gmail.com';
  const opsEmailFrom = requiredEnv('OPS_EMAIL_FROM') || 'Untamed India <onboarding@resend.dev>';
  const sheetsWebhookUrl = optionalEnv('GOOGLE_SHEETS_WEBHOOK_URL');
  const sheetsSecret = optionalEnv('GOOGLE_SHEETS_WEBHOOK_SECRET');

  const subject = `Contact enquiry — ${name}${destination ? ` — ${destination}` : ''}`;

  const text = [
    'UNTAMED INDIA — CONTACT ENQUIRY',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    destination ? `Destination: ${destination}` : null,
    payload.pagePath ? `Page: ${payload.pagePath}` : null,
    payload.source ? `Source: ${payload.source}` : null,
    '',
    'Message:',
    message,
  ]
    .filter(Boolean)
    .join('\n');

  const html = `
    <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif; line-height:1.6; color:#0E1814;">
      <div style="letter-spacing:.12em; text-transform:uppercase; font-weight:800; font-size:12px; color:#5a4822;">
        Untamed India — Contact Enquiry
      </div>
      <div style="margin-top:10px; border-top:1px solid rgba(14,24,20,.12); padding-top:12px;">
        <div style="margin:0 0 6px;"><strong>Name</strong>: ${escapeHtml(name)}</div>
        <div style="margin:0 0 6px;"><strong>Email</strong>: ${escapeHtml(email)}</div>
        ${destination ? `<div style="margin:0 0 6px;"><strong>Destination</strong>: ${escapeHtml(destination)}</div>` : ''}
        ${payload.pagePath ? `<div style="margin:0 0 6px;"><strong>Page</strong>: ${escapeHtml(String(payload.pagePath))}</div>` : ''}
        ${payload.source ? `<div style="margin:0 0 6px;"><strong>Source</strong>: ${escapeHtml(String(payload.source))}</div>` : ''}
      </div>
      <div style="margin-top:14px;">
        <div style="font-weight:800; margin-bottom:6px;">Message</div>
        <div style="white-space:pre-wrap; background:rgba(198,165,92,.10); border:1px solid rgba(198,165,92,.18); padding:12px 14px; border-radius:12px;">
          ${escapeHtml(message)}
        </div>
      </div>
    </div>
  `;

  const { Resend } = await import('resend');
  const resend = new Resend(resendApiKey);

  const { error } = await resend.emails.send({
    from: opsEmailFrom,
    to: opsEmailTo,
    subject,
    text,
    html,
    replyTo: email,
  });

  if (error) {
    console.error('[contact] resend error', error);
    return Response.json({ error: 'We received your message, but delivery failed. Please try again.' }, { status: 502 });
  }

  if (sheetsWebhookUrl) {
    try {
      const res = await fetch(sheetsWebhookUrl, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          email,
          source: payload.source,
          pagePath: payload.pagePath,
          createdAt: new Date().toISOString(),
          type: 'contact',
          name,
          destination,
          message,
          secret: sheetsSecret || undefined,
        }),
      });
      if (!res.ok) {
        console.error('[contact] google sheets webhook failed', { status: res.status, statusText: res.statusText });
      }
    } catch (e) {
      console.error('[contact] google sheets webhook error', e);
    }
  }

  return Response.json({ ok: true }, { status: 200 });
}

