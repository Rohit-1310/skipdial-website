'use client'

import React from 'react'

import type { CtaBandBlock } from '../../payload-types'

import { MagneticButton } from '../MagneticButton'
import { Reveal } from '../Reveal'
import { BodyText } from '../typography'
import { VoiceOrb } from '../VoiceOrb'

export function CtaBandSection({ block }: { block: CtaBandBlock }) {
  if (block.style === 'gradient') {
    // The one full-color section on a page — the orb reappears here.
    return (
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-[28px] px-6 py-16 text-center text-white sm:px-12 md:py-24">
          <div
            className="absolute inset-0 -z-10"
            style={{
              background:
                'radial-gradient(120% 160% at 85% 110%, var(--color-accent-warm) 0%, rgba(255,138,61,0) 42%), radial-gradient(130% 150% at 20% 0%, #7d7df6 0%, var(--color-accent) 55%, #3d3dbd 100%)',
            }}
            aria-hidden="true"
          />
          <div className="pointer-events-none absolute -right-14 -top-14 opacity-80 sm:right-2 sm:top-1/2 sm:-translate-y-1/2" aria-hidden="true">
            <VoiceOrb size={150} />
          </div>
          <div className="relative mx-auto max-w-xl">
            <h2 className="h-section text-white">{block.heading}</h2>
            {block.body && (
              <div className="mt-4 space-y-3 text-white/85">
                <BodyText text={block.body} />
              </div>
            )}
            {block.cta?.label && block.cta.href && (
              <div className="mt-9">
                <MagneticButton href={block.cta.href} variant="on-dark">
                  {block.cta.label}
                </MagneticButton>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    )
  }

  return (
    <div className="container-site">
      <Reveal className="mx-auto max-w-2xl text-center">
        <h2 className="h-section">{block.heading}</h2>
        {block.body && (
          <div className="mt-4 space-y-3 text-body">
            <BodyText text={block.body} />
          </div>
        )}
        {block.cta?.label && block.cta.href && (
          <div className="mt-9">
            <MagneticButton href={block.cta.href}>{block.cta.label}</MagneticButton>
          </div>
        )}
      </Reveal>
    </div>
  )
}
