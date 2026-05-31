export default function Loading() {
  return (
    <div className="p-8 space-y-6">
      <div className="h-8 w-48 rounded bg-ai-border animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="h-28 rounded-lg border border-ai-border bg-ai-card-bg animate-pulse" />
        <div className="h-28 rounded-lg border border-ai-border bg-ai-card-bg animate-pulse" />
        <div className="h-28 rounded-lg border border-ai-border bg-ai-card-bg animate-pulse" />
        <div className="h-28 rounded-lg border border-ai-border bg-ai-card-bg animate-pulse" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-96 rounded-lg border border-ai-border bg-ai-card-bg animate-pulse" />
        <div className="h-96 rounded-lg border border-ai-border bg-ai-card-bg animate-pulse" />
      </div>
      <div className="h-96 rounded-lg border border-ai-border bg-ai-card-bg animate-pulse" />
    </div>
  )
}
