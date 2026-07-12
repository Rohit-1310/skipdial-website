import type { Metadata } from 'next'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { Post } from '../../../payload-types'

import { getPageBySlug, getPosts, mediaAlt, mediaUrl } from '../../../lib/cms'
import { RenderBlocks } from '../../../components/RenderBlocks'

function formatDate(date?: string | null) {
  if (!date) return null
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function PostCard({ post }: { post: Post }) {
  const cover = mediaUrl(post.cover)
  const sized =
    post.cover && typeof post.cover === 'object' ? post.cover.sizes?.card?.url || cover : cover

  return (
    <Link href={`/blog/${post.slug}`} className="card group block overflow-hidden">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-bg-soft">
        {sized ? (
          <Image
            src={sized}
            alt={mediaAlt(post.cover)}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="grid h-full place-items-center font-mono text-xs text-ink-2">
            SKIPDIAL / BLOG
          </div>
        )}
      </div>
      <div className="p-6">
        {(post.tags ?? []).length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {(post.tags ?? []).slice(0, 3).map((t, i) => (
              <span
                key={t.id ?? i}
                className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[0.6875rem] uppercase tracking-wider text-ink-2"
              >
                {t.tag}
              </span>
            ))}
          </div>
        )}
        <h2 className="h-card transition-colors group-hover:text-accent">{post.title}</h2>
        {post.excerpt && <p className="mt-2 text-sm leading-relaxed text-body">{post.excerpt}</p>}
        <p className="mt-4 font-mono text-xs text-ink-2">{formatDate(post.publishedAt)}</p>
      </div>
    </Link>
  )
}

export default async function BlogPage() {
  const [page, posts] = await Promise.all([getPageBySlug('blog'), getPosts()])

  return (
    <>
      {page && <RenderBlocks page={page} />}
      <div className="container-site pb-16 md:pb-[120px]">
        {posts.length === 0 ? (
          <div className="grid min-h-[30vh] place-items-center rounded-card border border-dashed border-line">
            <p className="mono-label text-ink-2">Articles coming soon.</p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('blog')
  return {
    title: page?.meta?.title || 'Blog | SkipDial',
    description: page?.meta?.description || undefined,
    alternates: { canonical: '/blog' },
  }
}
