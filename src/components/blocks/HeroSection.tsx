'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'

import type { HeroBlock } from '../../payload-types'

import { EASE } from '../../lib/motion'
import { MagneticButton } from '../MagneticButton'
import { useOrb } from '../OrbContext'
import { BodyText, Eyebrow } from '../typography'
import { VoiceOrb } from '../VoiceOrb'

type HeroSectionProps = {
  block: HeroBlock
  breadcrumb?: { label: string; href?: string }[]
}

/** H1 words rise line-by-line behind a mask, staggered. */
function MaskedHeading({ text }: { text: string }) {
  const reduced = useReducedMotion()
  const words = text.split(/\s+/)
  if (reduced) {
    return (
      <motion.h1
        className="h-display"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {text}
      </motion.h1>
    )
  }
  return (
    <h1 className="h-display">
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-top">
            <motion.span
              className="inline-block"
              initial={{ y: '115%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.08 + i * 0.045 }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </h1>
  )
}

const chipDot = ['#22c07d', 'var(--color-accent)', 'var(--color-accent-warm)']

export function HeroSection({ block, breadcrumb }: HeroSectionProps) {
  const reduced = useReducedMotion()
  const { setHeroOrbVisible } = useOrb()
  const orbAnchor = useRef<HTMLDivElement>(null)
  const isHome = block.variant === 'home'

  // Hand the orb off to the header CTA once the hero scrolls away
  useEffect(() => {
    if (!isHome) return
    const el = orbAnchor.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setHeroOrbVisible(entry.isIntersecting),
      { threshold: 0.1 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      setHeroOrbVisible(false)
    }
  }, [isHome, setHeroOrbVisible])

  const fade = (delay: number) => ({
    initial: reduced ? { opacity: 0 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: EASE, delay: reduced ? 0 : delay },
  })

  return (
    <div className="container-site pb-16 pt-32 md:pb-24 md:pt-44">
      <div
        className={
          isHome ? 'grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]' : 'max-w-3xl'
        }
      >
        <div>
          {breadcrumb && breadcrumb.length > 0 && (
            <motion.nav aria-label="Breadcrumb" {...fade(0)} className="mb-5">
              <ol className="mono-label flex flex-wrap items-center gap-2 text-ink-2">
                {breadcrumb.map((crumb, i) => (
                  <li key={i} className="flex items-center gap-2">
                    {i > 0 && <span aria-hidden="true">/</span>}
                    {crumb.href ? (
                      <Link href={crumb.href} className="transition-colors hover:text-accent">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span className="text-ink">{crumb.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </motion.nav>
          )}

          {block.eyebrow && (
            <motion.div {...fade(0)} className="mb-6">
              <Eyebrow>{block.eyebrow}</Eyebrow>
            </motion.div>
          )}

          <MaskedHeading text={block.heading} />

          {block.body && (
            <motion.div {...fade(0.35)} className="mt-7 max-w-xl space-y-4 text-lg text-body">
              <BodyText text={block.body} />
            </motion.div>
          )}

          {(block.primaryCta?.label || block.secondaryCta?.label) && (
            <motion.div {...fade(0.45)} className="mt-9 flex flex-wrap items-center gap-4">
              {block.primaryCta?.label && block.primaryCta.href && (
                <MagneticButton href={block.primaryCta.href}>
                  {block.primaryCta.label}
                </MagneticButton>
              )}
              {block.secondaryCta?.label && block.secondaryCta.href && (
                <Link href={block.secondaryCta.href} className="btn btn-secondary">
                  {block.secondaryCta.label}
                  <span aria-hidden="true">→</span>
                </Link>
              )}
            </motion.div>
          )}
        </div>

        {isHome && (
          <div
            ref={orbAnchor}
            className="relative mx-auto hidden h-[340px] w-[340px] place-items-center sm:grid lg:h-[400px] lg:w-[400px]"
          >
            <motion.div
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 16, delay: reduced ? 0 : 0.4 }}
            >
              <VoiceOrb size={230} layoutId="voice-orb" />
            </motion.div>

            {(block.chips ?? []).slice(0, 3).map((chip, i) => {
              const positions = ['left-0 top-8', 'right-0 top-1/2', 'bottom-6 left-8']
              return (
                <motion.div
                  key={chip.id ?? i}
                  className={`absolute ${positions[i % 3]} flex items-center gap-2 rounded-full border border-line bg-white/90 px-3.5 py-2 font-mono text-xs shadow-[0_8px_24px_-12px_rgba(22,24,29,0.25)] backdrop-blur`}
                  initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
                  animate={
                    reduced ? { opacity: 1 } : { opacity: 1, scale: 1, y: [0, i % 2 ? 8 : -8, 0] }
                  }
                  transition={
                    reduced
                      ? { duration: 0.4 }
                      : {
                          opacity: { duration: 0.4, delay: 0.75 + i * 0.15 },
                          scale: {
                            type: 'spring',
                            stiffness: 200,
                            damping: 15,
                            delay: 0.75 + i * 0.15,
                          },
                          y: { duration: 6 + i, repeat: Infinity, ease: 'easeInOut', delay: 1.2 },
                        }
                  }
                >
                  <span
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ background: chipDot[i % 3] }}
                    aria-hidden="true"
                  />
                  {chip.label}
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
