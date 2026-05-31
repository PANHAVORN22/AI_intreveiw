import { Card } from '@/components/ui/card'
import { Toaster } from 'sonner'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ai-dark-bg px-4 py-10 text-ai-text-primary">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/2 top-1/4 h-96 w-96 rounded-full bg-ai-violet/20 blur-3xl" />
        <div className="absolute -right-1/2 bottom-1/4 h-96 w-96 rounded-full bg-ai-cyan/20 blur-3xl" />
      </div>
      <div className="relative z-10 w-full max-w-md">
        <Card className="border-ai-border/60 bg-ai-card-bg/70 backdrop-blur">
          {children}
        </Card>
      </div>
      <Toaster position="top-right" richColors theme="dark" />
    </div>
  )
}
