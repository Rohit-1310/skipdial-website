/* Seed script — fully populates the site on first boot.
 * Run with: npm run seed        (add SEED_FORCE=true to wipe & reseed)
 */
import 'dotenv/config'

import config from '@payload-config'
import path from 'path'
import { getPayload } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { homePage, howItWorksPage, inboundPage, outboundPage } from './pages-core'
import {
  homeServicesPage,
  industriesPage,
  professionalOfficesPage,
  realEstatePage,
} from './pages-industries'
import {
  blogIndexPage,
  integrationsPage,
  privacyPolicyPage,
  requestDemoPage,
} from './pages-misc'
import { starterPosts } from './posts'

const dirname = path.dirname(fileURLToPath(import.meta.url))
const asset = (file: string) => path.resolve(dirname, 'assets', file)

const ADMIN_EMAIL = 'admin@skipdial.ai'
const ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD || 'skipdial-admin-2026'

const context = { disableRevalidate: true }

/** Generate a simple on-brand PNG (OG image / blog covers) via sharp. */
async function generateImage(file: string, headline: string, sub: string, warm = false) {
  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="orb" cx="0.38" cy="0.32" r="1">
      <stop offset="0" stop-color="#9d9dff"/>
      <stop offset="0.55" stop-color="#5b5bf0"/>
      <stop offset="1" stop-color="${warm ? '#ff8a3d' : '#4444c8'}"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="#ffffff"/>
  <line x1="0" y1="80" x2="1200" y2="80" stroke="#ecedf1" stroke-width="2"/>
  <line x1="0" y1="550" x2="1200" y2="550" stroke="#ecedf1" stroke-width="2"/>
  <circle cx="990" cy="315" r="150" fill="url(#orb)"/>
  <circle cx="990" cy="315" r="185" fill="none" stroke="#5b5bf0" stroke-opacity="0.18" stroke-width="3"/>
  <text x="90" y="300" font-family="Arial, sans-serif" font-size="64" font-weight="bold" fill="#16181d">${headline}</text>
  <text x="90" y="370" font-family="Arial, sans-serif" font-size="30" fill="#5a6072">${sub}</text>
  <text x="90" y="500" font-family="Courier New, monospace" font-size="22" letter-spacing="4" fill="#5b5bf0">● SKIPDIAL.AI</text>
</svg>`
  const out = asset(file)
  await sharp(Buffer.from(svg)).png().toFile(out)
  return out
}

async function run() {
  const payload = await getPayload({ config })

  const { totalDocs: existingPages } = await payload.count({ collection: 'pages' })
  if (existingPages > 0 && process.env.SEED_FORCE !== 'true') {
    payload.logger.info('Seed skipped — pages already exist. Set SEED_FORCE=true to wipe & reseed.')
    process.exit(0)
  }

  payload.logger.info('Seeding SkipDial content…')

  // Wipe content collections (order matters for relations)
  for (const collection of ['pages', 'posts', 'formSubmissions', 'media'] as const) {
    await payload.delete({ collection, where: { id: { exists: true } }, context })
  }

  // ---------- Admin user ----------
  const { totalDocs: existingAdmins } = await payload.count({
    collection: 'users',
    where: { email: { equals: ADMIN_EMAIL } },
  })
  if (existingAdmins === 0) {
    await payload.create({
      collection: 'users',
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD, name: 'SkipDial Admin', role: 'admin' },
    })
    payload.logger.info(`Created admin user ${ADMIN_EMAIL}`)
  }

  // ---------- Media ----------
  const ogPath = await generateImage('og-image.png', 'AI Call Agents', 'Inbound and outbound calls, answered 24/7')
  const cover1Path = await generateImage('cover-ai-answers.png', 'When AI answers', 'The first sixty seconds of an AI-handled call', true)
  const cover2Path = await generateImage('cover-front-desk.png', '5 warning signs', 'How front desks quietly lose customers')

  const [logo, logoWhite, audio, ogImage, cover1, cover2] = await Promise.all([
    payload.create({
      collection: 'media',
      data: { alt: 'SkipDial logo' },
      filePath: asset('skipdial-logo-color.svg'),
      context,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'SkipDial logo (white)' },
      filePath: asset('skipdial-logo-white.png'),
      context,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'Recording of a real inbound real-estate call handled by the SkipDial AI agent' },
      filePath: asset('real-estate-call-recording.wav'),
      context,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'SkipDial — AI call agents for inbound and outbound calls' },
      filePath: ogPath,
      context,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'Illustration: what happens when an AI answers your business line' },
      filePath: cover1Path,
      context,
    }),
    payload.create({
      collection: 'media',
      data: { alt: 'Illustration: five signs your front desk is losing you customers' },
      filePath: cover2Path,
      context,
    }),
  ])

  const audioId = audio.id

  // ---------- Pages ----------
  const pages = [
    homePage(audioId),
    inboundPage(audioId),
    outboundPage(audioId),
    howItWorksPage(audioId),
    industriesPage(),
    homeServicesPage(audioId),
    realEstatePage(audioId),
    professionalOfficesPage(audioId),
    integrationsPage(audioId),
    requestDemoPage(),
    blogIndexPage(),
    privacyPolicyPage(),
  ]

  for (const page of pages) {
    await payload.create({
      collection: 'pages',
      context,
      data: {
        title: page.title,
        slug: page.slug,
        layout: page.layout,
        _status: 'published',
        meta: { title: page.meta.title, description: page.meta.description, image: ogImage.id },
      },
    })
    payload.logger.info(`  page: /${page.slug === 'home' ? '' : page.slug}`)
  }

  // ---------- Posts ----------
  for (const post of starterPosts({ first: cover1.id, second: cover2.id })) {
    await payload.create({
      collection: 'posts',
      context,
      data: {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        author: post.author,
        publishedAt: post.publishedAt,
        cover: post.cover,
        tags: post.tags,
        content: post.content,
        _status: 'published',
        meta: { title: `${post.title} | SkipDial`, description: post.excerpt, image: ogImage.id },
      },
    })
    payload.logger.info(`  post: /blog/${post.slug}`)
  }

  // ---------- Globals ----------
  await payload.updateGlobal({
    slug: 'siteSettings',
    context,
    data: {
      brandName: 'SkipDial',
      tagline:
        'AI call agents that answer inbound and outbound calls 24/7 — capturing leads, booking appointments, and syncing every conversation to your CRM.',
      logo: logo.id,
      logoWhite: logoWhite.id,
      phone: '(480) 868-1102',
      email: 'info@skipdial.ai',
      address: '1801 E. Camelback Rd, Suite 201\nPhoenix, AZ 85016',
      socials: [
        // TODO: confirm the real social profile URLs
        { platform: 'facebook', url: 'https://www.facebook.com/' },
        { platform: 'instagram', url: 'https://www.instagram.com/' },
        { platform: 'linkedin', url: 'https://www.linkedin.com/' },
      ],
      defaultSeo: {
        title: 'AI Call Agents for Inbound and Outbound Calls | SkipDial',
        description:
          'SkipDial uses AI call agents to handle inbound and outbound calls 24/7, qualify leads, book appointments, and sync call data directly to your CRM.',
        ogImage: ogImage.id,
      },
      legalStrip: '© 2026 All Rights Reserved | SkipDial.ai',
      poweredBy: 'Powered by REV77 Digital Marketing',
      notFound: {
        title: 'This line went dead.',
        body: 'The page you dialed does not exist — but the agent is still on duty everywhere else.',
        ctaLabel: 'Back to the homepage',
      },
    },
  })

  await payload.updateGlobal({
    slug: 'navigation',
    context,
    data: {
      header: {
        links: [
          { label: 'Inbound', href: '/inbound-calling' },
          { label: 'Outbound', href: '/outbound-calling' },
          { label: 'How It Works', href: '/how-it-works' },
          {
            label: 'Industries',
            href: '/industries',
            children: [
              { label: 'Home Services', href: '/industries/home-services' },
              {
                label: 'Real Estate & Property Management',
                href: '/industries/real-estate-property-management',
              },
              { label: 'Professional & Services Offices', href: '/industries/professional-offices' },
            ],
          },
          { label: 'Integrations', href: '/integrations' },
          { label: 'Blog', href: '/blog' },
        ],
        ctaLabel: 'Free Demo',
        ctaHref: '/request-a-free-demo',
        secondaryLabel: 'Contact us',
        // Fixed: the live site's "Contact us" button linked back to the homepage
        secondaryHref: '/request-a-free-demo',
      },
      footer: {
        linksLabel: 'Links',
        links: [
          { label: 'Inbound', href: '/inbound-calling' },
          { label: 'Outbound', href: '/outbound-calling' },
          { label: 'How It Works', href: '/how-it-works' },
          { label: 'Industries', href: '/industries' },
          { label: 'Integrations', href: '/integrations' },
          { label: 'Blog', href: '/blog' },
          { label: 'Request a Free Demo', href: '/request-a-free-demo' },
        ],
        contactLabel: 'Contact Us',
      },
    },
  })

  payload.logger.info('Seed complete.')
  payload.logger.info(`Admin login → /admin  ·  ${ADMIN_EMAIL} / ${ADMIN_PASSWORD}`)
  process.exit(0)
}

run().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
