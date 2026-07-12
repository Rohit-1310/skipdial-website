'use client'

import type { ReactNode } from 'react'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import Link from 'next/link'
import React, { useRef } from 'react'

type MagneticButtonProps = {
  href: string
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'on-dark'
  className?: string
}

const MAX_PULL = 24

/**
 * Primary CTA: subtly translates toward the cursor within a 24px radius
 * (fine pointers only), sheen sweep on hover, tap scale 0.98.
 */
export function MagneticButton({ href, children, variant = 'primary', className }: MagneticButtonProps) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 18 })
  const sy = useSpring(y, { stiffness: 220, damping: 18 })

  const onPointerMove = (e: React.PointerEvent) => {
    if (reduced || e.pointerType !== 'mouse' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    x.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * 0.25)))
    y.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * 0.25)))
  }

  const onPointerLeave = () => {
    x.set(0)
    y.set(0)
  }

  const variantClass =
    variant === 'primary' ? 'btn-primary' : variant === 'on-dark' ? 'btn-on-dark' : 'btn-secondary'

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      whileTap={reduced ? undefined : { scale: 0.98 }}
    >
      <Link href={href} className={`btn ${variantClass} ${className ?? ''}`}>
        {children}
        {variant === 'primary' && <span className="sheen" aria-hidden="true" />}
      </Link>
    </motion.div>
  )
}
