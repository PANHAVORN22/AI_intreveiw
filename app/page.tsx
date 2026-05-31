import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-ai-dark-bg via-ai-dark-bg to-background text-foreground flex items-center justify-center">
      <div className="max-w-5xl mx-auto p-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-5xl font-extrabold text-ai-text-primary mb-4">InterviewAI — Smarter Technical Hiring</h1>
            <p className="text-lg text-ai-text-muted mb-8">Conduct unbiased, consistent sessions with AI-assisted tooling, live coding, and structured evaluations.</p>

            <div className="flex gap-3">
              <Link href="/register" className="px-6 py-3 rounded-lg bg-ai-violet text-white font-medium hover:bg-ai-violet/90">Get Started</Link>
              <Link href="/login" className="px-6 py-3 rounded-lg border border-ai-border text-ai-text-secondary hover:bg-ai-border/30">Sign In</Link>
            </div>
          </div>

          <div className="bg-ai-card-bg border border-ai-border rounded-xl p-6">
            <h3 className="text-xl font-bold text-ai-text-primary mb-3">Features</h3>
              <ul className="space-y-3 text-ai-text-muted">
              <li>• Live coding sessions with terminal and editor</li>
              <li>• Structured evaluation rubrics and score tracking</li>
              <li>• Candidate profiles and activity feed</li>
              <li>• Role-based access control and audit logs</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
