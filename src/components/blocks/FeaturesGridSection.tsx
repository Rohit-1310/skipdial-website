'use client'

import React from 'react'

import type { FeaturesGridBlock } from '../../payload-types'

import { StrokeIcon } from '../icons'
import { Reveal, RevealItem } from '../Reveal'
import { BodyText } from '../typography'

export function FeaturesGridSection({ block }: { block: FeaturesGridBlock }) {
  const tiles = block.tiles ?? []
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
      <Reveal staggerChildren className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {tiles.map((tile, i) => (
          <RevealItem key={tile.id ?? i} className="card p-6">
            <span className="card-icon inline-grid h-12 w-12 place-items-center rounded-xl bg-accent-soft text-accent">
              <StrokeIcon name={tile.icon} />
            </span>
            <h3 className="h-card mt-5">{tile.title}</h3>
            {tile.body && <p className="mt-2 text-sm leading-relaxed text-body">{tile.body}</p>}
          </RevealItem>
        ))}
      </Reveal>
    </div>
  )
}
