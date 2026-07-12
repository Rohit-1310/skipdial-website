'use client'

import React from 'react'

import type { SchedulerEmbedBlock } from '../../payload-types'

import { Reveal } from '../Reveal'

/** Reserved-height scheduling embed — no layout shift when it loads. */
export function SchedulerEmbedSection({ block }: { block: SchedulerEmbedBlock }) {
  return (
    <div className="container-site">
      <div className="mx-auto max-w-3xl">
        {block.heading && (
          <Reveal className="mb-8">
            <h2 className="h-section">{block.heading}</h2>
          </Reveal>
        )}
        <Reveal>
          {block.embedUrl ? (
            <iframe
              src={block.embedUrl}
              title={block.heading || 'Schedule a time'}
              className="h-[700px] w-full rounded-card border border-line"
              loading="lazy"
            />
          ) : (
            <div className="grid h-[700px] w-full place-items-center rounded-card border border-dashed border-line bg-bg-soft">
              <div className="text-center">
                <p className="mono-label text-ink-2">SCHEDULING EMBED — TODO</p>
                <p className="mt-3 max-w-xs text-sm text-body">
                  {block.note ||
                    'Paste the booking widget URL in the CMS (Scheduler Embed block) to activate this calendar.'}
                </p>
              </div>
            </div>
          )}
        </Reveal>
      </div>
    </div>
  )
}
