'use client'

import React from 'react'

import type { NumberedListBlock } from '../../payload-types'

import { Reveal, RevealItem } from '../Reveal'
import { BodyText } from '../typography'

export function NumberedListSection({ block }: { block: NumberedListBlock }) {
  const items = block.items ?? []
  return (
    <div className="container-site">
      <div className="mx-auto max-w-3xl">
        {(block.heading || block.intro) && (
          <Reveal className="mb-10">
            {block.heading && <h2 className="h-section">{block.heading}</h2>}
            {block.intro && (
              <div className="mt-4 space-y-3 text-body">
                <BodyText text={block.intro} />
              </div>
            )}
          </Reveal>
        )}
        <Reveal staggerChildren as="ul" className="divide-y divide-line rounded-card border border-line">
          {items.map((item, i) => (
            <RevealItem
              key={item.id ?? i}
              as="li"
              className="flex items-center gap-5 px-5 py-4 sm:px-6"
            >
              <span className="font-mono text-sm font-medium text-accent" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="font-medium">{item.text}</span>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </div>
  )
}
