import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

function unauthorized(realm: string) {
  return new NextResponse('Authentication required.', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${realm}", charset="UTF-8"`,
    },
  });
}

function timingSafeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let out = 0;
  for (let i = 0; i < a.length; i++) out |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return out === 0;
}

export function middleware(req: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    // If no password is configured, do not allow access.
    return unauthorized('Untamed India Admin');
  }

  const expectedUser = process.env.ADMIN_USERNAME || 'admin';

  const auth = req.headers.get('authorization') || '';
  if (!auth.startsWith('Basic ')) {
    return unauthorized('Untamed India Admin');
  }

  let decoded = '';
  try {
    decoded = atob(auth.slice('Basic '.length));
  } catch {
    return unauthorized('Untamed India Admin');
  }

  const idx = decoded.indexOf(':');
  if (idx < 0) return unauthorized('Untamed India Admin');

  const user = decoded.slice(0, idx);
  const pass = decoded.slice(idx + 1);

  if (!timingSafeEqual(user, expectedUser) || !timingSafeEqual(pass, adminPassword)) {
    return unauthorized('Untamed India Admin');
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};

