import { NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'interviewai_session';

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: 'Invalid request body' },
      { status: 400 },
    );
  }

  const { email, password, rememberMe } = body as {
    email?: string;
    password?: string;
    rememberMe?: boolean;
  };

  if (!email?.trim() || !password) {
    return NextResponse.json(
      { ok: false, error: 'Please fill in all fields' },
      { status: 400 },
    );
  }

  const response = NextResponse.json({ ok: true });

  const cookieOptions: Parameters<typeof response.cookies.set>[2] = {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
  };

  if (rememberMe) {
    cookieOptions.maxAge = 60 * 60 * 24 * 30; // 30 days
  }

  const sessionValue = `mock_${globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36)}`;
  response.cookies.set(SESSION_COOKIE_NAME, sessionValue, cookieOptions);

  return response;
}
