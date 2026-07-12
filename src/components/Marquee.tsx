import type { ReactNode } from 'react'

import React from 'react'

/**
 * Slow logo drift (>=30s/loop), pauses on hover, duplicated list hidden
 * from assistive tech. Pure CSS animation — collapses to a wrapped static
 * row under reduced motion.
 */
export function Marquee({ children }: { children: ReactNode }) {
  return (
    <div className="marquee">
      <div className="marquee-track">
        <div className="flex items-center gap-14">{children}</div>
        <div className="flex items-center gap-14" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
