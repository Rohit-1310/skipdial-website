import type { ReactNode } from 'react'

import React from 'react'

/** Render `**bold**` emphasis inside a copy string. */
export function renderEmphasis(text: string): ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g)
  if (parts.length === 1) return text
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-ink">
        {part}
      </strong>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    ),
  )
}

/** Split a textarea body into paragraphs (blank line = new paragraph). */
export function BodyText({ text, className }: { text?: string | null; className?: string }) {
  if (!text) return null
  const paragraphs = text.split(/\n\s*\n/).filter(Boolean)
  return (
    <>
      {paragraphs.map((para, i) => (
        <p key={i} className={className}>
          {renderEmphasis(para.trim())}
        </p>
      ))}
    </>
  )
}

export function Eyebrow({ children, onDark }: { children: ReactNode; onDark?: boolean }) {
  return (
    <p
      className={`mono-label flex items-center gap-2.5 ${onDark ? 'text-white/80' : 'text-ink-2'}`}
    >
      <span className="eyebrow-dot" aria-hidden="true" />
      {children}
    </p>
  )
}
