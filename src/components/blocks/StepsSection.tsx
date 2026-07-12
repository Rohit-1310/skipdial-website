'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'

import type { StepsBlock } from '../../payload-types'

import { EASE, viewportOnce } from '../../lib/motion'
import { MagneticButton } from '../MagneticButton'
import { Reveal, RevealItem } from '../Reveal'
import { BodyText, Eyebrow, renderEmphasis } from '../typography'

type Step = NonNullable<StepsBlock['steps']>[number]

function ListGroups({ groups }: { groups?: Step['groups'] }) {
  if (!groups || groups.length === 0) return null
  return (
    <div className="space-y-5">
      {groups.map((group, gi) => (
        <div key={group.id ?? gi}>
          {group.label && <p className="font-medium text-ink">{renderEmphasis(group.label)}</p>}
          <ul className={`space-y-2 ${group.label ? 'mt-3' : ''}`}>
            {(group.items ?? []).map((item, ii) => (
              <li key={item.id ?? ii} className="flex items-start gap-2.5 text-[0.9375rem] text-body">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mt-1.5 flex-shrink-0"
                  aria-hidden="true"
                >
                  <path d="M2.5 8.5l3.5 3.5 7.5-8" />
                </svg>
                {item.text}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** The connector line draws itself as the section scrolls into view. */
function ConnectorLine({ vertical }: { vertical?: boolean }) {
  const reduced = useReducedMotion()
  if (reduced) return null
  return (
    <svg
      className={
        vertical
          ? 'absolute left-[19px] top-2 hidden h-[calc(100%-1rem)] w-0.5 md:block'
          : 'absolute left-0 right-0 top-5 hidden h-0.5 w-full lg:block'
      }
      aria-hidden="true"
      preserveAspectRatio="none"
      viewBox="0 0 100 100"
    >
      <motion.line
        x1={vertical ? 50 : 0}
        y1={vertical ? 0 : 50}
        x2={vertical ? 50 : 100}
        y2={vertical ? 100 : 50}
        stroke="var(--color-accent)"
        strokeOpacity="0.35"
        strokeWidth={vertical ? 100 : 100}
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 1.4, ease: EASE }}
      />
    </svg>
  )
}

export function StepsSection({ block }: { block: StepsBlock }) {
  const steps = block.steps ?? []
  const isRows = block.layout === 'rows'

  return (
    <div className="container-site">
      <Reveal className="max-w-2xl">
        {block.eyebrow && (
          <div className="mb-5">
            <Eyebrow>{block.eyebrow}</Eyebrow>
          </div>
        )}
        <h2 className="h-section">{block.heading}</h2>
        {block.intro && (
          <div className="mt-4 space-y-3 text-body">
            <BodyText text={block.intro} />
          </div>
        )}
      </Reveal>

      {isRows ? (
        <div className="relative mt-14">
          <ConnectorLine vertical />
          <div className="space-y-14 md:space-y-20">
            {steps.map((step, i) => (
              <Reveal
                key={step.id ?? i}
                className="relative grid gap-6 md:grid-cols-[40px_1fr] md:gap-8"
              >
                <div className="relative z-10 grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-white font-mono text-sm font-medium text-accent">
                  {i + 1}
                </div>
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
                  <div>
                    <h3 className="font-display text-2xl font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    {step.body && (
                      <div className="mt-3 space-y-3 text-body">
                        <BodyText text={step.body} />
                      </div>
                    )}
                    {step.link?.label && step.link.href && (
                      <p className="mt-4">
                        <Link
                          href={step.link.href}
                          className="font-medium text-accent underline-offset-4 hover:underline"
                        >
                          {step.link.label} →
                        </Link>
                      </p>
                    )}
                  </div>
                  <div className="space-y-5">
                    <ListGroups groups={step.groups} />
                    {step.closing && (
                      <div className="border-l-2 border-accent/30 pl-4 text-[0.9375rem] italic text-body">
                        <BodyText text={step.closing} />
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      ) : (
        <div className="relative mt-14">
          <ConnectorLine />
          <Reveal
            staggerChildren
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {steps.map((step, i) => (
              <RevealItem key={step.id ?? i} className="relative">
                <div className="relative z-10 mb-5 grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-white font-mono text-sm font-medium text-accent">
                  {i + 1}
                </div>
                <h3 className="h-card">{step.title}</h3>
                {step.body && (
                  <div className="mt-2 text-sm leading-relaxed text-body">
                    <BodyText text={step.body} />
                  </div>
                )}
              </RevealItem>
            ))}
          </Reveal>
        </div>
      )}

      {block.cta?.label && block.cta.href && (
        <Reveal className="mt-12">
          <MagneticButton href={block.cta.href}>{block.cta.label}</MagneticButton>
        </Reveal>
      )}
    </div>
  )
}
