// components/Fallbacks/LoadingFallback.tsx
'use client';

export function LoadingFallback() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-slate-950 to-black z-50">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-lg animate-spin" />
          <div className="absolute inset-1 bg-slate-950 rounded-lg" />
        </div>
        <p className="text-sm text-slate-400">Loading...</p>
      </div>
    </div>
  );
}
