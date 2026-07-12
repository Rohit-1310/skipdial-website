import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'SkipDial — AI Call Agents',
    short_name: 'SkipDial',
    description:
      'AI voice agents that answer inbound and outbound calls 24/7, qualify leads, book appointments, and sync everything to your CRM.',
    start_url: '/',
    display: 'browser',
    background_color: '#ffffff',
    theme_color: '#5b5bf0',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  }
}
