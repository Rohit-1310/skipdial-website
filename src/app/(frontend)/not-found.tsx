import Link from 'next/link'
import React from 'react'

import { getSiteSettings } from '../../lib/cms'

export default async function NotFound() {
  const settings = await getSiteSettings().catch(() => null)
  const nf = settings?.notFound

  return (
    <div className="container-site grid min-h-[70vh] place-items-center pt-24 text-center">
      <div>
        <p className="mono-label inline-flex items-center gap-2.5 rounded-full border border-line px-4 py-2 text-ink-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent-warm" aria-hidden="true" />
          404 — CALL ENDED
        </p>
        <h1 className="h-display mt-8">{nf?.title || 'This line went dead.'}</h1>
        <p className="mx-auto mt-5 max-w-md text-body">
          {nf?.body ||
            'The page you dialed doesn’t exist — but the agent is still on duty everywhere else.'}
        </p>
        <div className="mt-9">
          <Link href="/" className="btn btn-primary">
            {nf?.ctaLabel || 'Back to the homepage'}
            <span className="sheen" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </div>
  )
}
