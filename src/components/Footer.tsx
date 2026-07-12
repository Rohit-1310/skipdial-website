import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type FooterProps = {
  brandName: string
  logoWhiteUrl?: string | null
  tagline?: string | null
  linksLabel: string
  links: { label: string; href: string }[]
  contactLabel: string
  contact: { phone?: string | null; email?: string | null; address?: string | null }
  socials: { platform: string; url: string }[]
  legalStrip?: string | null
  poweredBy?: string | null
}

const socialIcons: Record<string, React.ReactNode> = {
  facebook: (
    <path d="M13.5 8.5h-2v-2c0-.6.4-1 1-1h1V3h-2c-1.7 0-3 1.3-3 3v2.5h-2V11h2v7h3v-7h2l.5-2.5z" />
  ),
  instagram: (
    <>
      <rect x="3.5" y="3.5" width="14" height="14" rx="4" fill="none" strokeWidth="1.6" stroke="currentColor" />
      <circle cx="10.5" cy="10.5" r="3.2" fill="none" strokeWidth="1.6" stroke="currentColor" />
      <circle cx="15" cy="6" r="1" />
    </>
  ),
  linkedin: (
    <path d="M5.5 8.5v9h-2.8v-9h2.8zM4.1 7.3a1.6 1.6 0 110-3.2 1.6 1.6 0 010 3.2zM18.2 12.3v5.2h-2.8v-4.8c0-1.2-.4-2-1.5-2-.8 0-1.3.5-1.5 1.1-.1.2-.1.5-.1.8v4.9H9.5v-9h2.8v1.2c.4-.6 1-1.4 2.5-1.4 1.9 0 3.4 1.2 3.4 4z" />
  ),
  x: <path d="M12.6 9.5L18.9 2h-1.5l-5.5 6.5L7.5 2H2.5l6.6 9.8L2.5 20H4l5.8-6.9 4.7 6.9h5l-6.9-10.5z" />,
}

export function Footer(props: FooterProps) {
  const {
    brandName,
    logoWhiteUrl,
    tagline,
    linksLabel,
    links,
    contactLabel,
    contact,
    socials,
    legalStrip,
    poweredBy,
  } = props

  return (
    <footer className="bg-ink text-white">
      <div className="container-site grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:py-20">
        <div>
          {logoWhiteUrl ? (
            <Image src={logoWhiteUrl} alt={brandName} width={150} height={40} className="h-9 w-auto" />
          ) : (
            <p className="font-display text-2xl font-semibold">{brandName}</p>
          )}
          {tagline && <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-white/60">{tagline}</p>}
          {socials.length > 0 && (
            <ul className="mt-7 flex gap-3">
              {socials.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.platform}
                    className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-accent hover:text-white"
                  >
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="currentColor" aria-hidden="true">
                      {socialIcons[s.platform] ?? socialIcons.x}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <nav aria-label="Footer">
          <p className="mono-label text-white/45">{linksLabel}</p>
          <ul className="mt-5 space-y-2.5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[0.9375rem] text-white/75 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mono-label text-white/45">{contactLabel}</p>
          <ul className="mt-5 space-y-2.5 text-[0.9375rem] text-white/75">
            {contact.phone && (
              <li>
                <a href={`tel:${contact.phone.replace(/[^+\d]/g, '')}`} className="transition-colors hover:text-white">
                  {contact.phone}
                </a>
              </li>
            )}
            {contact.email && (
              <li>
                <a href={`mailto:${contact.email}`} className="transition-colors hover:text-white">
                  {contact.email}
                </a>
              </li>
            )}
            {contact.address && <li className="whitespace-pre-line leading-relaxed">{contact.address}</li>}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-site flex flex-col gap-2 py-6 text-[0.8125rem] text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            {legalStrip}
            {legalStrip && ' | '}
            <Link href="/privacy-policy" className="transition-colors hover:text-white">
              Privacy Policy
            </Link>
          </p>
          {poweredBy && <p>{poweredBy}</p>}
        </div>
      </div>
    </footer>
  )
}
