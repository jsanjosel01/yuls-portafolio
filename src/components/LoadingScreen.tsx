export default function LoadingScreen() {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: 'var(--bg)' }}
    >
      {/* Tres puntos animados */}
      <div className="flex items-center gap-3">
        <span
          className="h-3 w-3 rounded-full bg-lilac-400 animate-bounce"
          style={{ animationDelay: '0ms', animationDuration: '900ms' }}
        />
        <span
          className="h-3 w-3 rounded-full bg-lilac-500 animate-bounce"
          style={{ animationDelay: '180ms', animationDuration: '900ms' }}
        />
        <span
          className="h-3 w-3 rounded-full bg-lilac-600 animate-bounce"
          style={{ animationDelay: '360ms', animationDuration: '900ms' }}
        />
      </div>
    </div>
  )
}
