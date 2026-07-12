'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useRef, useState } from 'react'

import { EASE } from '../lib/motion'
import { useOrb } from './OrbContext'
import { VoiceOrb } from './VoiceOrb'

export type NavLink = {
  label: string
  href?: string | null
  children?: { label: string; href: string }[] | null
}

type HeaderProps = {
  brandName: string
  logoUrl?: string | null
  links: NavLink[]
  ctaLabel: string
  ctaHref: string
  secondaryLabel?: string | null
  secondaryHref?: string | null
  contact: { phone?: string | null; email?: string | null; address?: string | null }
}

export function Header(props: HeaderProps) {
  const { brandName, logoUrl, links, ctaLabel, ctaHref, secondaryLabel, secondaryHref, contact } =
    props
  const pathname = usePathname()
  const reduced = useReducedMotion()
  const { heroOrbVisible } = useOrb()

  const [scrolled, setScrolled] = useState(false)
  const [dropdown, setDropdown] = useState<number | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const sheetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close menus on navigation
  useEffect(() => {
    setMenuOpen(false)
    setDropdown(null)
  }, [pathname])

  // Mobile sheet: scroll lock + focus trap + escape
  useEffect(() => {
    if (!menuOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const sheet = sheetRef.current
    const focusables = () =>
      sheet?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []
    focusables()[0]?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
      if (e.key === 'Tab') {
        const els = Array.from(focusables())
        if (els.length === 0) return
        const first = els[0]
        const last = els[els.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const isActive = useCallback(
    (link: NavLink) => {
      if (link.href && pathname === link.href) return true
      return Boolean(link.children?.some((c) => pathname === c.href))
    },
    [pathname],
  )

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ${
        scrolled
          ? 'border-b border-line bg-white/85 backdrop-blur-md'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="container-site flex h-16 items-center justify-between gap-6 md:h-[72px]">
        <Link href="/" aria-label={`${brandName} — home`} className="flex-shrink-0">
          {logoUrl ? (
            <Image src={logoUrl} alt={brandName} width={132} height={36} priority className="h-8 w-auto md:h-9" />
          ) : (
            <span className="h-card text-xl">{brandName}</span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {links.map((link, i) => {
              const active = isActive(link)
              const hasChildren = Boolean(link.children?.length)
              return (
                <li
                  key={i}
                  className="relative"
                  onMouseEnter={() => hasChildren && setDropdown(i)}
                  onMouseLeave={() => hasChildren && setDropdown(null)}
                >
                  {hasChildren ? (
                    <button
                      type="button"
                      aria-expanded={dropdown === i}
                      onClick={() => setDropdown(dropdown === i ? null : i)}
                      className={`relative flex cursor-pointer items-center gap-1.5 rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
                        active ? 'text-ink' : 'text-ink-2 hover:text-ink'
                      }`}
                    >
                      {link.label}
                      <svg
                        width="9"
                        height="6"
                        viewBox="0 0 9 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                        style={{
                          transform: dropdown === i ? 'rotate(180deg)' : undefined,
                          transition: 'transform .15s ease',
                        }}
                      >
                        <path d="M1 1l3.5 3.5L8 1" />
                      </svg>
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent"
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={link.href || '/'}
                      className={`relative block rounded-full px-3.5 py-2 text-[0.9375rem] font-medium transition-colors ${
                        active ? 'text-ink' : 'text-ink-2 hover:text-ink'
                      }`}
                    >
                      {link.label}
                      {active && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-accent"
                        />
                      )}
                    </Link>
                  )}

                  <AnimatePresence>
                    {hasChildren && dropdown === i && (
                      <motion.ul
                        initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, transition: { duration: 0.12 } }}
                        transition={{ duration: 0.2, ease: EASE }}
                        className="absolute left-0 top-full w-72 rounded-2xl border border-line bg-white p-2 shadow-[0_16px_48px_-16px_rgba(22,24,29,0.18)]"
                      >
                        {link.children!.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className={`block rounded-xl px-4 py-2.5 text-[0.9375rem] font-medium transition-colors hover:bg-bg-soft hover:text-ink ${
                                pathname === child.href ? 'text-accent' : 'text-ink-2'
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          {secondaryLabel && secondaryHref && (
            <Link
              href={secondaryHref}
              className="px-2 text-[0.9375rem] font-medium text-ink-2 transition-colors hover:text-ink"
            >
              {secondaryLabel}
            </Link>
          )}
          <Link href={ctaHref} className="btn btn-primary">
            {/* The Voice Orb follows you down the page: morphs in from the hero */}
            {!heroOrbVisible && <VoiceOrb size={16} layoutId="voice-orb" />}
            {ctaLabel}
            <span className="sheen" aria-hidden="true" />
          </Link>
        </div>

        {/* Mobile trigger */}
        <button
          type="button"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
          className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line lg:hidden"
        >
          <svg width="18" height="12" viewBox="0 0 18 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
            <path d="M1 1h16M1 6h16M1 11h16" />
          </svg>
        </button>
      </div>

      {/* Mobile sheet */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-40 bg-ink/25 backdrop-blur-[2px] lg:hidden"
              aria-hidden="true"
            />
            <motion.div
              ref={sheetRef}
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              initial={reduced ? { opacity: 0 } : { x: '100%' }}
              animate={reduced ? { opacity: 1 } : { x: 0 }}
              exit={reduced ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: 0.32, ease: EASE }}
              className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col overflow-y-auto border-l border-line bg-white p-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <span className="mono-label text-ink-2">Menu</span>
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="grid h-10 w-10 cursor-pointer place-items-center rounded-full border border-line"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" />
                  </svg>
                </button>
              </div>

              <motion.nav
                aria-label="Mobile"
                className="mt-8"
                initial="hidden"
                animate="visible"
                variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
              >
                <ul className="space-y-1">
                  {links.map((link, i) => (
                    <motion.li
                      key={i}
                      variants={{
                        hidden: reduced ? { opacity: 0 } : { opacity: 0, x: 16 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: EASE } },
                      }}
                    >
                      {link.href ? (
                        <Link
                          href={link.href}
                          className="block rounded-xl px-3 py-2.5 font-display text-lg font-semibold"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <span className="block px-3 py-2.5 font-display text-lg font-semibold">
                          {link.label}
                        </span>
                      )}
                      {link.children && link.children.length > 0 && (
                        <ul className="mb-2 ml-3 border-l border-line pl-3">
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                className="block rounded-lg px-2 py-2 text-[0.9375rem] text-ink-2"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>

              <div className="mt-6">
                <Link href={ctaHref} className="btn btn-primary w-full justify-center">
                  {ctaLabel}
                </Link>
              </div>

              {/* Contact block (mirrors the live site's mobile menu) */}
              <div className="mt-auto space-y-1.5 pt-10 text-sm text-ink-2">
                {contact.phone && (
                  <p>
                    <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="hover:text-ink">
                      {contact.phone}
                    </a>
                  </p>
                )}
                {contact.email && (
                  <p>
                    <a href={`mailto:${contact.email}`} className="hover:text-ink">
                      {contact.email}
                    </a>
                  </p>
                )}
                {contact.address && <p className="whitespace-pre-line">{contact.address}</p>}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
