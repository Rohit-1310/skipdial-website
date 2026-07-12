'use client'

import React from 'react'

import type { ChecklistBlock } from '../../payload-types'

import { MagneticButton } from '../MagneticButton'
import { Reveal, RevealItem } from '../Reveal'
import { BodyText } from '../typography'

export function ChecklistSection({ block }: { block: ChecklistBlock }) {
  const items = block.items ?? []
  const hasCopy = Boolean(block.heading || block.body)

  return (
    <div className="container-site">
      <div className={hasCopy ? 'grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]' : ''}>
        {hasCopy && (
          <Reveal>
            {block.heading && <h2 className="h-section">{block.heading}</h2>}
            {block.body && (
              <div className="mt-4 space-y-3 text-body">
                <BodyText text={block.body} />
              </div>
            )}
            {block.cta?.label && block.cta.href && (
              <div className="mt-8">
                <MagneticButton href={block.cta.href}>{block.cta.label}</MagneticButton>
              </div>
            )}
          </Reveal>
        )}

        <Reveal staggerChildren className="flex flex-wrap gap-3" as="ul">
          {items.map((item, i) => (
            <RevealItem
              key={item.id ?? i}
              as="li"
              className="flex items-center gap-2.5 rounded-full border border-line bg-white px-4 py-2.5 text-[0.9375rem] font-medium transition-colors hover:border-accent"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 16 16"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M2.5 8.5l3.5 3.5 7.5-8" />
              </svg>
              {item.text}
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </div>
  )
}
