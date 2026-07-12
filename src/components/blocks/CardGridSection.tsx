'use client'

import Link from 'next/link'
import React from 'react'

import type { CardGridBlock } from '../../payload-types'

import { MagneticButton } from '../MagneticButton'
import { Reveal, RevealItem } from '../Reveal'
import { BodyText } from '../typography'

export function CardGridSection({ block }: { block: CardGridBlock }) {
  const cards = block.cards ?? []
  const cols = block.small
    ? 'sm:grid-cols-2 lg:grid-cols-4'
    : cards.length >= 5
      ? 'sm:grid-cols-2 lg:grid-cols-3'
      : 'sm:grid-cols-2'

  return (
    <div className="container-site">
      {(block.heading || block.intro) && (
        <Reveal className="max-w-2xl">
          {block.heading && <h2 className="h-section">{block.heading}</h2>}
          {block.intro && (
            <div className="mt-4 space-y-3 text-body">
              <BodyText text={block.intro} />
            </div>
          )}
        </Reveal>
      )}

      <Reveal staggerChildren className={`mt-12 grid gap-5 ${cols}`}>
        {cards.map((card, i) => (
          <RevealItem
            key={card.id ?? i}
            className={`card ${block.small ? 'p-5' : 'p-6'}`}
          >
            {block.numbered && (
              <p className="mb-4 font-mono text-xs font-medium text-accent" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </p>
            )}
            <h3 className={block.small ? 'h-card text-base' : 'h-card'}>{card.title}</h3>
            {card.body && (
              <div className="mt-2 space-y-2 text-sm leading-relaxed text-body">
                <BodyText text={card.body} />
              </div>
            )}
          </RevealItem>
        ))}
      </Reveal>

      {block.closing && (
        <Reveal className="mt-8 max-w-2xl">
          <div className="space-y-3 text-body">
            <BodyText text={block.closing} />
          </div>
        </Reveal>
      )}

      {((block.cta?.label && block.cta.href) || (block.link?.label && block.link.href)) && (
        <Reveal className="mt-10 flex flex-wrap items-center gap-6">
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
        </Reveal>
      )}
    </div>
  )
}
