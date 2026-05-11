"use client";

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-main flex items-center justify-center z-50">
      <div className="relative">
        {/* Rotating square - top left */}
        <div className="absolute -top-14 -left-14 w-16 h-16 bg-page-background border-4 border-border shadow-[6px_6px_0px_0px_var(--border)] transform rotate-45 animate-spin-slow" />

        {/* Main loading text */}
        <div className="text-5xl sm:text-6xl font-black bg-white p-8 rotate-2 border-4 border-border shadow-[8px_8px_0px_0px_var(--border)]">
          LOADING
        </div>

        {/* Spinning circle - top right */}
        <div className="absolute -top-6 -right-6 w-14 h-14 bg-foreground border-4 border-border shadow-[4px_4px_0px_0px_var(--border)] rounded-full animate-spin-slow" />

        {/* Pulsing square - bottom left */}
        <div className="absolute -bottom-6 -left-6 w-10 h-10 bg-main border-4 border-border shadow-[4px_4px_0px_0px_var(--border)] rounded-md animate-pulse" />

        {/* Bouncing dots */}
        <div className="flex gap-3 mt-8 justify-center">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className="w-4 h-4 bg-border rounded-full animate-bounce"
              style={{ animationDelay: `${index * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
