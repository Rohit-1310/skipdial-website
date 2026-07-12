import type { Metadata } from 'next'

import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import { LivePreviewListener } from '../../../components/LivePreviewListener'
import { RenderBlocks } from '../../../components/RenderBlocks'
import { getAllPageSlugs, getPageBySlug, mediaUrl } from '../../../lib/cms'

type Args = { params: Promise<{ slug: string[] }> }

export async function generateStaticParams() {
  const slugs = await getAllPageSlugs()
  return slugs.filter((s) => s !== 'home').map((slug) => ({ slug: slug.split('/') }))
}

export default async function CatchAllPage({ params }: Args) {
  const { slug: parts } = await params
  const slug = parts.join('/')
  const { isEnabled: draft } = await draftMode()
  const page = await getPageBySlug(slug, draft)
  if (!page) notFound()

  return (
    <>
      {draft && <LivePreviewListener />}
      <RenderBlocks page={page} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug: parts } = await params
  const slug = parts.join('/')
  const page = await getPageBySlug(slug)
  if (!page) return {}
  const ogImage = mediaUrl(page.meta?.image)
  return {
    title: page.meta?.title || page.title,
    description: page.meta?.description || undefined,
    alternates: { canonical: `/${slug}` },
    openGraph: {
      title: page.meta?.title || page.title,
      description: page.meta?.description || undefined,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  }
}
