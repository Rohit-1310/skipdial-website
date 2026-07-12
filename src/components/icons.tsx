import React from 'react'

/** Stroke-style icon set — accent-colored, 1.5px strokes. */
const paths: Record<string, React.ReactNode> = {
  phone: (
    <path d="M5 4.5C5 3.7 5.7 3 6.5 3h1.8c.7 0 1.3.5 1.5 1.2l.7 2.6c.1.6-.1 1.2-.6 1.5l-1.3 1a12.5 12.5 0 005.1 5.1l1-1.3c.3-.5.9-.7 1.5-.6l2.6.7c.7.2 1.2.8 1.2 1.5v1.8c0 .8-.7 1.5-1.5 1.5C10.6 18 6 13.4 5 6.5v-2z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  chat: (
    <path d="M4 7a3 3 0 013-3h10a3 3 0 013 3v6a3 3 0 01-3 3H9.5L5.6 19.2A1 1 0 014 18.4V7z" />
  ),
  chart: (
    <>
      <path d="M4 4v15a1 1 0 001 1h15" />
      <path d="M8 15v-4M12 15V8M16 15v-6" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M3.5 12h17M12 3.5c2.5 2.3 3.8 5.2 3.8 8.5s-1.3 6.2-3.8 8.5c-2.5-2.3-3.8-5.2-3.8-8.5s1.3-6.2 3.8-8.5z" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v5M15 3v5" />
      <path d="M6.5 8h11v3a5.5 5.5 0 01-11 0V8z" />
      <path d="M12 16.5V21" />
    </>
  ),
  scale: (
    <>
      <path d="M4 20h16" />
      <path d="M6 16l3-9M18 16l-3-9" />
      <path d="M4 16h4M16 16h4M9 7h6" />
      <circle cx="12" cy="5.5" r="1.5" />
    </>
  ),
  calendar: (
    <>
      <rect x="4" y="5.5" width="16" height="14" rx="2.5" />
      <path d="M4 10h16M8.5 3.5v3M15.5 3.5v3M9 14l2 2 4-4" />
    </>
  ),
  route: (
    <>
      <circle cx="6" cy="18" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <path d="M8.2 18H15a3 3 0 000-6H9a3 3 0 010-6h6.8" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3.5l7 2.6v5.4c0 4.3-3 7.6-7 9-4-1.4-7-4.7-7-9V6.1l7-2.6z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  bolt: <path d="M13 3L5.5 13.5H11L10 21l7.5-10.5H12L13 3z" />,
  note: (
    <>
      <path d="M6 4h9l4 4v12a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1z" />
      <path d="M14.5 4v4.5H19M9 13h6M9 16.5h4" />
    </>
  ),
}

export function StrokeIcon({ name, size = 26 }: { name?: string | null; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name ?? 'phone'] ?? paths.phone}
    </svg>
  )
}
