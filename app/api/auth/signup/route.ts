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

  const { name, email, password } = body as {
    name?: string;
    email?: string;
    password?: string;
  };

  if (!name?.trim() || !email?.trim() || !password) {
    return NextResponse.json(
      { ok: false, error: 'Please fill in all fields' },
      { status: 400 },
    );
  }

  const response = NextResponse.json({ ok: true });

  response.cookies.set(SESSION_COOKIE_NAME, `mock_${globalThis.crypto?.randomUUID?.() ?? Date.now().toString(36)}`,
    {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      // keep as a session cookie by default
    },
  );

  return response;
}
