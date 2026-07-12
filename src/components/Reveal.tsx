'use client'

import type { ReactNode } from 'react'

import { motion, useReducedMotion } from 'framer-motion'
import React from 'react'

import { fadeIn, fadeUp, stagger, viewportOnce } from '../lib/motion'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Stagger direct children (each wrapped in <RevealItem>) */
  staggerChildren?: boolean
  delay?: number
  as?: 'div' | 'section' | 'ul' | 'li' | 'span'
}

/** Scroll reveal wrapper — fades up once in view; plain fade under reduced motion. */
export function Reveal({ children, className, staggerChildren, delay, as = 'div' }: RevealProps) {
  const reduced = useReducedMotion()
  const Comp = motion[as]
  const variants = staggerChildren ? stagger : reduced ? fadeIn : fadeUp

  return (
    <Comp
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delayChildren: delay } : undefined}
    >
      {children}
    </Comp>
  )
}

export function RevealItem({
  children,
  className,
  as = 'div',
}: {
  children: ReactNode
  className?: string
  as?: 'div' | 'li' | 'span'
}) {
  const reduced = useReducedMotion()
  const Comp = motion[as]
  return (
    <Comp className={className} variants={reduced ? fadeIn : fadeUp}>
      {children}
    </Comp>
  )
}
