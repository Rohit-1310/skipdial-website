import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

export const pagePath = (slug?: string | null): string =>
  !slug || slug === 'home' ? '/' : `/${slug}`

/** Publishing in the admin updates the live site in seconds — no redeploy. */
export const revalidatePage: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) return doc
  try {
    if (doc._status === 'published') {
      revalidatePath(pagePath(doc.slug))
      revalidateTag('sitemap', 'max')
    }
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePath(pagePath(previousDoc.slug))
    }
    if (previousDoc?.slug && previousDoc.slug !== doc.slug) {
      revalidatePath(pagePath(previousDoc.slug))
    }
  } catch {
    // Not running inside Next (e.g. seed script) — nothing to revalidate.
  }
  return doc
}

export const revalidatePageDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc
  try {
    revalidatePath(pagePath(doc?.slug))
    revalidateTag('sitemap', 'max')
  } catch {
    /* outside Next */
  }
  return doc
}

export const revalidatePost: CollectionAfterChangeHook = ({ doc, previousDoc, req }) => {
  if (req.context?.disableRevalidate) return doc
  try {
    if (doc._status === 'published') {
      revalidatePath(`/blog/${doc.slug}`)
      revalidatePath('/blog')
      revalidateTag('sitemap', 'max')
    }
    if (previousDoc?._status === 'published' && doc._status !== 'published') {
      revalidatePath(`/blog/${previousDoc.slug}`)
      revalidatePath('/blog')
    }
  } catch {
    /* outside Next */
  }
  return doc
}

export const revalidatePostDelete: CollectionAfterDeleteHook = ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc
  try {
    revalidatePath(`/blog/${doc?.slug}`)
    revalidatePath('/blog')
  } catch {
    /* outside Next */
  }
  return doc
}

/** Header/Footer/settings render on every route — revalidate the whole layout. */
export const revalidateGlobal: GlobalAfterChangeHook = ({ doc, req }) => {
  if (req.context?.disableRevalidate) return doc
  try {
    revalidatePath('/', 'layout')
  } catch {
    /* outside Next */
  }
  return doc
}
