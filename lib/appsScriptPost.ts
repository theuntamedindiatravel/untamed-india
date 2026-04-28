type PostResult = {
  status: number;
  headers: Headers;
  bodyText: string;
};

async function postOnce(url: string, body: unknown, redirect: RequestRedirect) {
  const res = await fetch(url, {
    method: 'POST',
    redirect,
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(body),
  });
  const bodyText = await res.text();
  return { status: res.status, headers: res.headers, bodyText } satisfies PostResult;
}

export async function postJsonToAppsScript(url: string, body: unknown): Promise<PostResult> {
  // Apps Script /exec often returns 302 to a googleusercontent URL.
  // Some fetch stacks convert POST->GET on redirect (dropping the body),
  // so we handle redirects manually and re-POST to the Location.
  const first = await postOnce(url, body, 'manual');
  if (first.status >= 300 && first.status < 400) {
    const loc = first.headers.get('location');
    if (loc) {
      return await postOnce(loc, body, 'manual');
    }
  }
  return first;
}

