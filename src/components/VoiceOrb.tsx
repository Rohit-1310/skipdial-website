'use client'

import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'

type VoiceOrbProps = {
  /** Diameter in px */
  size?: number
  /** Framer shared-layout id — only the hero/header pair should pass one */
  layoutId?: string
  className?: string
}

/**
 * The signature element: a soft gradient orb representing the AI agent
 * "speaking". Breathes (scale 1 -> 1.06, 4s) and emits a faint expanding
 * ring every ~4s, like a call being answered. Framer animations run on
 * requestAnimationFrame, so they pause automatically on hidden tabs.
 */
export function VoiceOrb({ size = 220, layoutId, className }: VoiceOrbProps) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      layoutId={layoutId}
      className={className}
      style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}
      aria-hidden="true"
    >
      {/* expanding ring pulse */}
      {!reduced && (
        <motion.span
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: 999,
            border: '2px solid rgba(91,91,240,0.15)',
          }}
          animate={{ scale: [1, 1.7], opacity: [0.9, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 1.8, ease: 'easeOut' }}
        />
      )}
      {/* the orb itself */}
      <motion.span
        className="orb-gradient"
        style={{ position: 'absolute', inset: 0, display: 'block' }}
        animate={reduced ? undefined : { scale: [1, 1.06, 1] }}
        transition={reduced ? undefined : { duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
    </motion.div>
  )
}
