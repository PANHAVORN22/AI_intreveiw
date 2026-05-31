import { NextResponse } from 'next/server';
import { executeCode } from '@/lib/execute/judge0';

export const runtime = 'nodejs';

type ExecuteRequest = {
  code?: string;
  language?: string;
};

export async function POST(request: Request) {
  let body: ExecuteRequest;

  try {
    body = (await request.json()) as ExecuteRequest;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload.' }, { status: 400 });
  }

  const code = body.code?.trim();
  const language = body.language ?? 'javascript';

  try {
    if (!code) {
      return NextResponse.json({ error: 'Code is required.' }, { status: 400 });
    }

    const result = await executeCode({ code, language });
    return NextResponse.json({
      stdout: result.stdout,
      stderr: result.stderr,
      exitCode: result.exitCode,
      executionMs: result.executionMs,
    });
  } catch (error) {
    return NextResponse.json({
      stdout: '',
      stderr: error instanceof Error ? error.message : 'Unknown runtime error.',
      exitCode: 1,
      executionMs: 0,
    });
  }
}
