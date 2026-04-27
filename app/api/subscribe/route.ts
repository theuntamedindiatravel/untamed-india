export const runtime = 'nodejs';

type SubscribePayload = {
  email: string;
  source?: string;
  pagePath?: string;
};

function requiredEnv(name: string) {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : null;
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  let payload: SubscribePayload;
  try {
    payload = (await req.json()) as SubscribePayload;
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const email = payload.email?.trim();
  if (!email || !isValidEmail(email)) {
    return Response.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const resendApiKey = requiredEnv('RESEND_API_KEY');
  if (!resendApiKey) {
    return Response.json({ error: 'Email service is not configured.' }, { status: 500 });
  }

  const opsEmailTo = requiredEnv('OPS_EMAIL_TO') || 'theuntamedindia.travel@gmail.com';
  const opsEmailFrom = requiredEnv('OPS_EMAIL_FROM') || 'Untamed India <onboarding@resend.dev>';

  const subject = `Newsletter signup — ${email}`;

  const text = [
    'UNTAMED INDIA — NEWSLETTER SIGNUP',
    '',
    `Email: ${email}`,
    payload.pagePath ? `Page: ${payload.pagePath}` : null,
    payload.source ? `Source: ${payload.source}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  const html = `
    <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif; line-height:1.6; color:#0E1814;">
      <div style="letter-spacing:.12em; text-transform:uppercase; font-weight:800; font-size:12px; color:#5a4822;">
        Untamed India — Newsletter Signup
      </div>
      <div style="margin-top:10px; border-top:1px solid rgba(14,24,20,.12); padding-top:12px;">
        <div style="margin:0 0 6px;"><strong>Email</strong>: ${escapeHtml(email)}</div>
        ${payload.pagePath ? `<div style="margin:0 0 6px;"><strong>Page</strong>: ${escapeHtml(String(payload.pagePath))}</div>` : ''}
        ${payload.source ? `<div style="margin:0 0 6px;"><strong>Source</strong>: ${escapeHtml(String(payload.source))}</div>` : ''}
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
    console.error('[subscribe] resend error', error);
    return Response.json({ error: 'We received your email, but delivery failed. Please try again.' }, { status: 502 });
  }

  return Response.json({ ok: true }, { status: 200 });
}

function escapeHtml(input: string) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

