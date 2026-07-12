'use client'

import type { ReactNode } from 'react'

import { motion } from 'framer-motion'
import React from 'react'

/** 0.25s fade between page navigations. */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
      {children}
    </motion.div>
  )
}
