import type { Payload } from 'payload'

import config from '@payload-config'
import { getPayload } from 'payload'

import type { Media, Navigation, Page, Post, SiteSetting } from '../payload-types'

/**
 * All frontend data access goes through this file — components never query
 * Payload directly, so swapping the CMS later stays a one-file change.
 */

export const getPayloadClient = (): Promise<Payload> => getPayload({ config })

export const mediaUrl = (media?: Media | number | null): string | null => {
  if (!media || typeof media === 'number') return null
  return media.url ?? null
}

export const mediaAlt = (media?: Media | number | null): string =>
  !media || typeof media === 'number' ? '' : (media.alt ?? '')

export async function getPageBySlug(slug: string, draft = false): Promise<Page | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    draft,
    depth: 2,
    limit: 1,
    pagination: false,
    overrideAccess: true,
    where: {
      and: [
        { slug: { equals: slug } },
        ...(draft ? [] : [{ _status: { equals: 'published' as const } }]),
      ],
    },
  })
  return result.docs[0] ?? null
}

export async function getAllPageSlugs(): Promise<string[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'pages',
    depth: 0,
    limit: 200,
    pagination: false,
    overrideAccess: true,
    select: { slug: true },
    where: { _status: { equals: 'published' } },
  })
  return result.docs.map((d) => d.slug).filter(Boolean)
}

export async function getPosts(): Promise<Post[]> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 100,
    pagination: false,
    overrideAccess: true,
    sort: '-publishedAt',
    where: { _status: { equals: 'published' } },
  })
  return result.docs
}

export async function getPostBySlug(slug: string, draft = false): Promise<Post | null> {
  const payload = await getPayloadClient()
  const result = await payload.find({
    collection: 'posts',
    draft,
    depth: 1,
    limit: 1,
    pagination: false,
    overrideAccess: true,
    where: {
      and: [
        { slug: { equals: slug } },
        ...(draft ? [] : [{ _status: { equals: 'published' as const } }]),
      ],
    },
  })
  return result.docs[0] ?? null
}

export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const tags = (post.tags ?? []).map((t) => t.tag).filter(Boolean)
  const posts = await getPosts()
  const related = posts.filter(
    (p) => p.id !== post.id && (p.tags ?? []).some((t) => tags.includes(t.tag)),
  )
  const fallback = posts.filter((p) => p.id !== post.id && !related.includes(p))
  return [...related, ...fallback].slice(0, limit)
}

export async function getSiteSettings(): Promise<SiteSetting> {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'siteSettings', depth: 1 })
}

export async function getNavigation(): Promise<Navigation> {
  const payload = await getPayloadClient()
  return payload.findGlobal({ slug: 'navigation', depth: 0 })
}
