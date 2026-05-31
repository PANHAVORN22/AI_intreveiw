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

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name.trim(),
        name: name.trim(),
      },
    },
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 400 },
    );
  }

  return NextResponse.json({
    ok: true,
    userId: data.user?.id ?? null,
    needsConfirmation: !data.session,
  });
}
