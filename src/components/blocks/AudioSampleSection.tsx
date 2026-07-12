'use client'

import React from 'react'

import type { AudioSampleBlock } from '../../payload-types'

import { AudioPlayer } from '../AudioPlayer'
import { MagneticButton } from '../MagneticButton'
import { Reveal } from '../Reveal'
import { BodyText } from '../typography'

type AudioSampleSectionProps = {
  block: AudioSampleBlock
  audioUrl?: string | null
  audioAlt?: string
}

export function AudioSampleSection({ block, audioUrl, audioAlt }: AudioSampleSectionProps) {
  return (
    <div className="container-site">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <h2 className="h-section">{block.heading}</h2>
          {block.body && (
            <div className="mt-4 space-y-3 text-body">
              <BodyText text={block.body} />
            </div>
          )}
        </Reveal>

        <Reveal className="mt-10 text-left">
          {block.label && <p className="mono-label mb-3 text-ink-2">{block.label}</p>}
          {audioUrl ? (
            <AudioPlayer src={audioUrl} title={audioAlt || block.heading} />
          ) : (
            <div className="card grid h-[88px] place-items-center font-mono text-xs text-ink-2">
              {/* TODO: upload the call recording in the CMS */}
              AUDIO SAMPLE — COMING SOON
            </div>
          )}
          {block.caption && (
            <p className="mt-3 text-center font-mono text-xs text-ink-2">{block.caption}</p>
          )}
        </Reveal>

        {block.cta?.label && block.cta.href && (
          <Reveal className="mt-9">
            <MagneticButton href={block.cta.href}>{block.cta.label}</MagneticButton>
          </Reveal>
        )}
      </div>
    </div>
  )
}
