// components/Accessibility/SkipToMainContent.tsx
'use client';

export function SkipToMainContent() {
  return (
    <a
      href="#main-content"
      className="fixed top-0 left-0 -translate-y-full focus:translate-y-0 z-[10000] bg-cyan-500 text-black px-4 py-2 font-semibold rounded-br-md transition-transform duration-200"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}
