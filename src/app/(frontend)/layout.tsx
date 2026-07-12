import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { Bricolage_Grotesque, IBM_Plex_Mono, Inter } from 'next/font/google'
import Script from 'next/script'
import React from 'react'

import { Footer } from '../../components/Footer'
import { Header } from '../../components/Header'
import { OrbProvider } from '../../components/OrbContext'
import { getNavigation, getSiteSettings, mediaUrl } from '../../lib/cms'

import './globals.css'

const display = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-bricolage',
  display: 'swap',
})

const body = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const ogImage = mediaUrl(settings.defaultSeo?.ogImage)
  return {
    metadataBase: new URL(serverUrl),
    title: settings.defaultSeo?.title || settings.brandName,
    description: settings.defaultSeo?.description || undefined,
    openGraph: {
      siteName: settings.brandName,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
    twitter: { card: 'summary_large_image' },
  }
}

export default async function FrontendLayout({ children }: { children: ReactNode }) {
  const [settings, nav] = await Promise.all([getSiteSettings(), getNavigation()])

  const contact = {
    phone: settings.phone,
    email: settings.email,
    address: settings.address,
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: settings.brandName,
    url: serverUrl,
    logo: mediaUrl(settings.logo) ? `${serverUrl}${mediaUrl(settings.logo)}` : undefined,
    telephone: settings.phone || undefined,
    email: settings.email || undefined,
    address: settings.address
      ? { '@type': 'PostalAddress', streetAddress: settings.address.replace(/\n/g, ', ') }
      : undefined,
    sameAs: (settings.socials ?? []).map((s) => s.url),
  }

  const analyticsId = process.env.NEXT_PUBLIC_ANALYTICS_ID

  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <OrbProvider>
          <Header
            brandName={settings.brandName}
            logoUrl={mediaUrl(settings.logo)}
            links={(nav.header?.links ?? []).map((l) => ({
              label: l.label,
              href: l.href,
              children: (l.children ?? []).map((c) => ({ label: c.label, href: c.href })),
            }))}
            ctaLabel={nav.header?.ctaLabel || 'Free Demo'}
            ctaHref={nav.header?.ctaHref || '/request-a-free-demo'}
            secondaryLabel={nav.header?.secondaryLabel}
            secondaryHref={nav.header?.secondaryHref}
            contact={contact}
          />
          <main id="main">{children}</main>
          <Footer
            brandName={settings.brandName}
            logoWhiteUrl={mediaUrl(settings.logoWhite)}
            tagline={settings.tagline}
            linksLabel={nav.footer?.linksLabel || 'Links'}
            links={(nav.footer?.links ?? []).map((l) => ({ label: l.label, href: l.href }))}
            contactLabel={nav.footer?.contactLabel || 'Contact Us'}
            contact={contact}
            socials={(settings.socials ?? []).map((s) => ({ platform: s.platform, url: s.url }))}
            legalStrip={settings.legalStrip}
            poweredBy={settings.poweredBy}
          />
        </OrbProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {analyticsId && (
          // TODO: swap src for your analytics provider's snippet
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${analyticsId}`}
          />
        )}
      </body>
    </html>
  )
}
