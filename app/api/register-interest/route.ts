export const runtime = 'nodejs';

type RegisterInterestPayload = {
  name: string;
  email: string;
  phone?: string;
  timing?: string;
  interests?: string;
  annualSpend: string;
  subscribe?: boolean;
  source?: string;
  pagePath?: string;
};

function requiredEnv(name: string) {
  const v = process.env[name];
  return v && v.trim() ? v.trim() : null;
}

export async function POST(req: Request) {
  let payload: RegisterInterestPayload;
  try {
    payload = (await req.json()) as RegisterInterestPayload;
  } catch {
    return Response.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const annualSpend = payload.annualSpend?.trim();

  if (!name || !email || !annualSpend) {
    return Response.json({ error: 'Missing required fields.' }, { status: 400 });
  }

  // If you set RESEND_API_KEY + OPS_EMAIL_TO, we’ll email the ops team.
  // Otherwise we still accept the request (so the UI works) and log the query.
  const resendApiKey = requiredEnv('RESEND_API_KEY');
  const opsEmailTo = requiredEnv('OPS_EMAIL_TO') || 'theuntamedindia.travel@gmail.com';
  const opsEmailFrom = requiredEnv('OPS_EMAIL_FROM') || 'Untamed India <no-reply@untamedindia.vercel.app>';

  const lines = [
    'UNTAMED INDIA — REGISTER INTEREST',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    payload.phone?.trim() ? `Phone: ${payload.phone.trim()}` : null,
    payload.timing?.trim() ? `When: ${payload.timing.trim()}` : null,
    payload.annualSpend ? `Annual travel spend: ${payload.annualSpend}` : null,
    typeof payload.subscribe === 'boolean' ? `Subscribe: ${payload.subscribe ? 'Yes' : 'No'}` : null,
    payload.source ? `Source: ${payload.source}` : null,
    payload.pagePath ? `Page: ${payload.pagePath}` : null,
    payload.interests?.trim() ? `` : null,
    payload.interests?.trim() ? `Interests / notes:` : null,
    payload.interests?.trim() ? payload.interests.trim() : null,
  ].filter(Boolean);

  const text = lines.join('\n');

  const html = `
    <div style="font-family: Inter, system-ui, -apple-system, Segoe UI, Arial, sans-serif; line-height:1.6; color:#0E1814;">
      <div style="letter-spacing:.12em; text-transform:uppercase; font-weight:800; font-size:12px; color:#5a4822;">
        Untamed India — Register Interest
      </div>
      <div style="margin-top:10px; border-top:1px solid rgba(14,24,20,.12); padding-top:12px;">
        <div style="margin:0 0 6px;"><strong>Name</strong>: ${escapeHtml(name)}</div>
        <div style="margin:0 0 6px;"><strong>Email</strong>: ${escapeHtml(email)}</div>
        ${payload.phone?.trim() ? `<div style="margin:0 0 6px;"><strong>Phone</strong>: ${escapeHtml(payload.phone.trim())}</div>` : ''}
        ${payload.timing?.trim() ? `<div style="margin:0 0 6px;"><strong>When</strong>: ${escapeHtml(payload.timing.trim())}</div>` : ''}
        <div style="margin:0 0 6px;"><strong>Annual travel spend</strong>: ${escapeHtml(String(payload.annualSpend))}</div>
        ${
          typeof payload.subscribe === 'boolean'
            ? `<div style="margin:0 0 6px;"><strong>Subscribe</strong>: ${payload.subscribe ? 'Yes' : 'No'}</div>`
            : ''
        }
        ${payload.source ? `<div style="margin:0 0 6px;"><strong>Source</strong>: ${escapeHtml(String(payload.source))}</div>` : ''}
        ${payload.pagePath ? `<div style="margin:0 0 6px;"><strong>Page</strong>: ${escapeHtml(String(payload.pagePath))}</div>` : ''}
      </div>
      ${
        payload.interests?.trim()
          ? `<div style="margin-top:14px;">
              <div style="font-weight:800; margin-bottom:6px;">Interests / notes</div>
              <div style="white-space:pre-wrap; background:rgba(198,165,92,.10); border:1px solid rgba(198,165,92,.18); padding:12px 14px; border-radius:12px;">
                ${escapeHtml(payload.interests.trim())}
              </div>
            </div>`
          : ''
      }
    </div>
  `;

  console.log('[register-interest]', {
    name,
    email,
    annualSpend,
    subscribe: payload.subscribe,
    source: payload.source,
    pagePath: payload.pagePath,
  });

  if (resendApiKey) {
    const { Resend } = await import('resend');
    const resend = new Resend(resendApiKey);

    const subject = `Register interest — ${name} (${annualSpend})`;
    const { error } = await resend.emails.send({
      from: opsEmailFrom,
      to: opsEmailTo,
      subject,
      text,
      html,
      replyTo: email,
    });

    if (error) {
      console.error('[register-interest] resend error', error);
      return Response.json({ error: 'We received your details, but email delivery failed. Please try again.' }, { status: 502 });
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

