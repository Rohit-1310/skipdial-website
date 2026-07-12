'use client'

import React from 'react'

import type { AccordionBlock } from '../../payload-types'

import { Accordion } from '../Accordion'
import { Reveal } from '../Reveal'
import { BodyText } from '../typography'

export function AccordionSection({ block }: { block: AccordionBlock }) {
  const items = (block.items ?? []).map((item) => ({
    id: item.id,
    title: item.title,
    body: item.body,
  }))

  const faqJsonLd = block.faqSchema
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((item) => ({
          '@type': 'Question',
          name: item.title,
          acceptedAnswer: { '@type': 'Answer', text: item.body },
        })),
      }
    : null

  return (
    <div className="container-site">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
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
        <Reveal>
          <Accordion items={items} />
        </Reveal>
      </div>
    </div>
  )
}
