'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import React, { useId, useState } from 'react'

import { EASE } from '../lib/motion'
import { BodyText } from './typography'

type AccordionProps = {
  items: { title: string; body: string; id?: string | null }[]
}

/** Keyboard-operable accordion with aria-expanded and animated height. */
export function Accordion({ items }: AccordionProps) {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = useReducedMotion()
  const baseId = useId()

  return (
    <div className="divide-y divide-line rounded-card border border-line bg-bg">
      {items.map((item, i) => {
        const isOpen = open === i
        const headerId = `${baseId}-h-${i}`
        const panelId = `${baseId}-p-${i}`
        return (
          <div key={item.id ?? i}>
            <h3>
              <button
                type="button"
                id={headerId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left sm:px-6"
              >
                <span className="h-card">{item.title}</span>
                <motion.span
                  aria-hidden="true"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: reduced ? 0 : 0.2, ease: EASE }}
                  className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-line text-ink-2"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M6 1v10M1 6h10" />
                  </svg>
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={headerId}
                  initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduced ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden"
                >
                  <div className="space-y-3 px-5 pb-6 text-body sm:px-6">
                    <BodyText text={item.body} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
