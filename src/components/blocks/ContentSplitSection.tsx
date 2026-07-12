'use client'

import Link from 'next/link'
import React from 'react'

import type { ContentSplitBlock } from '../../payload-types'

import { MagneticButton } from '../MagneticButton'
import { Reveal, RevealItem } from '../Reveal'
import { BodyText, Eyebrow, renderEmphasis } from '../typography'

export function ContentSplitSection({ block }: { block: ContentSplitBlock }) {
  const groups = block.groups ?? []
  const hasLists = groups.length > 0

  return (
    <div className="container-site">
      <div className={hasLists ? 'grid items-start gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16' : 'max-w-3xl'}>
        <Reveal>
          {block.eyebrow && (
            <div className="mb-5">
              <Eyebrow>{block.eyebrow}</Eyebrow>
            </div>
          )}
          <h2 className="h-section">{block.heading}</h2>
          {block.body && (
            <div className="mt-4 space-y-3 text-body">
              <BodyText text={block.body} />
            </div>
          )}
          {(block.cta?.label || block.link?.label) && (
            <div className="mt-8 flex flex-wrap items-center gap-6">
              {block.cta?.label && block.cta.href && (
                <MagneticButton href={block.cta.href}>{block.cta.label}</MagneticButton>
              )}
              {block.link?.label && block.link.href && (
                <Link
                  href={block.link.href}
                  className="font-medium text-accent underline-offset-4 hover:underline"
                >
                  {block.link.label} →
                </Link>
              )}
            </div>
          )}
        </Reveal>

        {hasLists && (
          <Reveal staggerChildren className="space-y-8">
            {groups.map((group, gi) => (
              <RevealItem key={group.id ?? gi} className="rounded-card border border-line bg-bg-soft/60 p-6">
                {group.label && (
                  <p className="font-medium text-ink">{renderEmphasis(group.label)}</p>
                )}
                <ul className={`space-y-2.5 ${group.label ? 'mt-4' : ''}`}>
                  {(group.items ?? []).map((item, ii) => (
                    <li key={item.id ?? ii} className="flex items-start gap-2.5 text-[0.9375rem] text-body">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="var(--color-accent)"
                        strokeWidth="1.75"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mt-1.5 flex-shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M2.5 8.5l3.5 3.5 7.5-8" />
                      </svg>
                      {item.text}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
            {block.closing && (
              <RevealItem className="border-l-2 border-accent/30 pl-4 text-[0.9375rem] text-body">
                <BodyText text={block.closing} />
              </RevealItem>
            )}
          </Reveal>
        )}
        {!hasLists && block.closing && (
          <Reveal className="mt-6 max-w-3xl border-l-2 border-accent/30 pl-4 text-[0.9375rem] text-body">
            <BodyText text={block.closing} />
          </Reveal>
        )}
      </div>
    </div>
  )
}
