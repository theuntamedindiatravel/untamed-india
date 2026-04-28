export const runtime = 'nodejs';

import { listRecipients } from '@/lib/sheetsWebhook';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const limitParam = url.searchParams.get('limit');
  const limit = Math.max(1, Math.min(500, Number(limitParam || '50') || 50));

  try {
    const recipients = await listRecipients(limit);
    return Response.json({ ok: true, recipients }, { status: 200 });
  } catch (e) {
    return Response.json({ ok: false, error: e instanceof Error ? e.message : 'Failed to load recipients.' }, { status: 500 });
  }
}

