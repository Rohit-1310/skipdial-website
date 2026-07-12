'use client'

import React from 'react'

import type { LogoMarqueeBlock } from '../../payload-types'

import { Marquee } from '../Marquee'
import { Reveal } from '../Reveal'

export function LogoMarqueeSection({ block }: { block: LogoMarqueeBlock }) {
  const groups = block.groups ?? []
  return (
    <div className="container-site">
      {block.heading && (
        <Reveal className="max-w-2xl">
          <h2 className="h-section">{block.heading}</h2>
        </Reveal>
      )}
      {block.caption && (
        <p className="mono-label mt-4 text-ink-2">{block.caption}</p>
      )}
      <div className="mt-10 space-y-10">
        {groups.map((group, gi) => (
          <Reveal key={group.id ?? gi}>
            {group.label && <p className="mono-label mb-5 text-ink-2">{group.label}</p>}
            {/* TODO: swap text wordmarks for real logo assets once the set is confirmed */}
            <Marquee>
              {(group.names ?? []).map((logo, li) => (
                <span
                  key={logo.id ?? li}
                  className="whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink-2/50 transition-colors hover:text-ink-2"
                >
                  {logo.name}
                </span>
              ))}
            </Marquee>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
