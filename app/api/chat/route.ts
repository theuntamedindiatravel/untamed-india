export const runtime = 'nodejs';

type ChatPayload = {
  name: string;
  email: string;
  message: string;
  intent?: string | null;
  pagePath?: string;
  source?: string;
};

function requiredEnv(name: string) {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : null;
}

export async function POST(req: Request) {
  let payload: ChatPayload;
  try {
    payload = (await req.json()) as ChatPayload;
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const message = payload.message?.trim();

  if (!name || !email || !message) {
    return Response.json({ error: 'Please provide name, email, and a message.' }, { status: 400 });
  }

  const resendApiKey = requiredEnv('RESEND_API_KEY');
  const opsEmailTo = requiredEnv('OPS_EMAIL_TO') || 'theuntamedindia.travel@gmail.com';
  const opsEmailFrom = requiredEnv('OPS_EMAIL_FROM') || 'Untamed India <no-reply@untamedindia.vercel.app>';

  const text = [
    'UNTAMED INDIA — CHAT ENQUIRY',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    payload.intent ? `Intent: ${payload.intent}` : null,
    payload.pagePath ? `Page: ${payload.pagePath}` : null,
    payload.source ? `Source: ${payload.source}` : null,
    '',
    'Message:',
    message,
  ].filter(Boolean).join('\n');

  const html = `
    <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif; line-height:1.6; color:#0E1814;">
      <div style="letter-spacing:.12em; text-transform:uppercase; font-weight:800; font-size:12px; color:#5a4822;">
        Untamed India — Chat Enquiry
      </div>
      <div style="margin-top:10px; border-top:1px solid rgba(14,24,20,.12); padding-top:12px;">
        <div style="margin:0 0 6px;"><strong>Name</strong>: ${escapeHtml(name)}</div>
        <div style="margin:0 0 6px;"><strong>Email</strong>: ${escapeHtml(email)}</div>
        ${payload.intent ? `<div style="margin:0 0 6px;"><strong>Intent</strong>: ${escapeHtml(String(payload.intent))}</div>` : ''}
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

  console.log('[chat]', { name, email, intent: payload.intent, pagePath: payload.pagePath, source: payload.source });

  if (resendApiKey) {
    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);

    const subject = `Chat enquiry — ${name}${payload.intent ? ` — ${payload.intent}` : ''}`;
    const { error } = await resend.emails.send({
      from: opsEmailFrom,
      to: opsEmailTo,
      subject,
      text,
      html,
      replyTo: email,
    });

    if (error) {
      console.error('[chat] resend error', error);
      return Response.json({ error: 'We received your message, but email delivery failed. Please try again.' }, { status: 502 });
    }
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

