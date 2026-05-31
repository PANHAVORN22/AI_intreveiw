export default function Loading() {
  return (
    <div className="p-8 space-y-6">
      <div className="h-8 w-48 rounded bg-ai-border animate-pulse" />
      <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-6">
        <div className="h-[520px] rounded-lg border border-ai-border bg-ai-card-bg animate-pulse" />
        <div className="h-[520px] rounded-lg border border-ai-border bg-ai-card-bg animate-pulse" />
      </div>
    </div>
  )
}
