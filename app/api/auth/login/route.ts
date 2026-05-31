import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

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

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 401 },
    );
  }

  return NextResponse.json({ ok: true, rememberMe: Boolean(rememberMe) });
}
