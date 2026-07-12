import type { Metadata } from 'next'

import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import { LivePreviewListener } from '../../components/LivePreviewListener'
import { RenderBlocks } from '../../components/RenderBlocks'
import { getPageBySlug, mediaUrl } from '../../lib/cms'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const page = await getPageBySlug('home', draft)
  if (!page) notFound()

  return (
    <>
      {draft && <LivePreviewListener />}
      <RenderBlocks page={page} />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home')
  if (!page) return {}
  const ogImage = mediaUrl(page.meta?.image)
  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description || undefined,
    alternates: { canonical: '/' },
    openGraph: {
      title: page.meta?.title || page.title,
      description: page.meta?.description || undefined,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  }
}
