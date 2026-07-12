'use client'

import React from 'react'

import type { PainPointsBlock } from '../../payload-types'

import { Reveal, RevealItem } from '../Reveal'
import { BodyText } from '../typography'

export function PainPointsSection({ block }: { block: PainPointsBlock }) {
  const cards = block.cards ?? []
  return (
    <div className="container-site">
      <Reveal className="max-w-2xl">
        <h2 className="h-section">{block.heading}</h2>
        {block.intro && (
          <div className="mt-4 space-y-3 text-body">
            <BodyText text={block.intro} />
          </div>
        )}
      </Reveal>
      <Reveal
        staggerChildren
        className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {cards.map((card, i) => (
          <RevealItem key={card.id ?? i} className="card flex flex-col gap-14 p-6">
            <p className="font-mono text-xs font-medium text-accent" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </p>
            <div>
              <h3 className="h-card">{card.title}</h3>
              {card.body && (
                <div className="mt-2 text-sm leading-relaxed text-body">
                  <BodyText text={card.body} />
                </div>
              )}
            </div>
          </RevealItem>
        ))}
      </Reveal>
    </div>
  )
}
