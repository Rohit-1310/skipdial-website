'use client'

import type { ReactNode } from 'react'

import { LayoutGroup } from 'framer-motion'
import React, { createContext, useContext, useState } from 'react'

type OrbContextValue = {
  heroOrbVisible: boolean
  setHeroOrbVisible: (v: boolean) => void
}

const OrbContext = createContext<OrbContextValue>({
  heroOrbVisible: false,
  setHeroOrbVisible: () => {},
})

export const useOrb = () => useContext(OrbContext)

/**
 * Coordinates the shared-layout morph: the hero Voice Orb hands off to the
 * mini orb inside the sticky header CTA once the hero scrolls away.
 */
export function OrbProvider({ children }: { children: ReactNode }) {
  const [heroOrbVisible, setHeroOrbVisible] = useState(false)

  return (
    <OrbContext.Provider value={{ heroOrbVisible, setHeroOrbVisible }}>
      <LayoutGroup>{children}</LayoutGroup>
    </OrbContext.Provider>
  )
}
