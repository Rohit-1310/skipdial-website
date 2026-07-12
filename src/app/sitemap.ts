import type { MetadataRoute } from 'next'

export const dynamic = 'force-static'

import { getAllPageSlugs, getPosts } from '../lib/cms'

const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, posts] = await Promise.all([getAllPageSlugs(), getPosts()])

  const pages = slugs.map((slug) => ({
    url: slug === 'home' ? serverUrl : `${serverUrl}/${slug}`,
    lastModified: new Date(),
    priority: slug === 'home' ? 1 : 0.7,
  }))

  const blog = posts.map((post) => ({
    url: `${serverUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
    priority: 0.5,
  }))

  return [...pages, { url: `${serverUrl}/blog`, lastModified: new Date(), priority: 0.6 }, ...blog]
}
